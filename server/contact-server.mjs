#!/usr/bin/env node
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { createHash } from "node:crypto";
import nodemailer from "nodemailer";

const PORT = Number(process.env.PORT || 8787);
const HOST = process.env.HOST || "127.0.0.1";
const CONTACT_TO = process.env.CONTACT_TO || "a@agboolaolomola.com";
const SMTP_FROM = process.env.SMTP_FROM || process.env.SMTP_USER || CONTACT_TO;
const STORE_DIR = process.env.INQUIRY_STORE || "/var/lib/agweb/inquiries";
const RATE_WINDOW_MS = Number(process.env.RATE_WINDOW_MS || 15 * 60 * 1000);
const RATE_MAX = Number(process.env.RATE_MAX || 8);
const DEV_FALLBACK = process.env.CONTACT_DEV_FALLBACK === "1";

const rateMap = new Map();
const idempotencyCache = new Map();

function loadEnvFile() {
  const candidates = [
    process.env.MAIL_ENV_FILE,
    "/etc/agweb/mail.env",
    path.resolve(process.cwd(), "deploy/mail.env"),
    path.resolve(process.cwd(), ".env.contact"),
  ].filter(Boolean);

  for (const file of candidates) {
    if (!fs.existsSync(file)) continue;
    const text = fs.readFileSync(file, "utf8");
    for (const line of text.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx === -1) continue;
      const key = trimmed.slice(0, idx).trim();
      const value = trimmed.slice(idx + 1).trim();
      if (!(key in process.env)) process.env[key] = value;
    }
    break;
  }
}

loadEnvFile();

function json(res, status, body) {
  const payload = JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(payload),
    "Cache-Control": "no-store",
  });
  res.end(payload);
}

function cors(req, res) {
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Idempotency-Key",
    );
  }
}

function clientIp(req) {
  const forwarded = req.headers["x-forwarded-for"];
  if (typeof forwarded === "string" && forwarded.length) {
    return forwarded.split(",")[0].trim();
  }
  return req.socket.remoteAddress || "unknown";
}

function rateLimit(ip) {
  const now = Date.now();
  const entry = rateMap.get(ip) || { count: 0, start: now };
  if (now - entry.start > RATE_WINDOW_MS) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count += 1;
  rateMap.set(ip, entry);
  return entry.count <= RATE_MAX;
}

function validate(body) {
  const errors = {};
  const name = String(body.name || "").trim();
  const email = String(body.email || "").trim();
  const company = String(body.company || "").trim();
  const phone = String(body.phone || "").trim();
  const topic = String(body.topic || "").trim();
  const message = String(body.message || "").trim();
  const intent = body.intent === "consultation" ? "consultation" : "message";

  if (!name) errors.name = "Enter your name.";
  if (name.length > 100) errors.name = "Name must be 100 characters or fewer.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    errors.email = "Enter a valid email address.";
  }
  if (company.length > 150) errors.company = "Company must be 150 characters or fewer.";
  if (!topic) errors.topic = "Select a topic.";
  if (!message) errors.message = "Tell me how I can help.";
  if (message.length > 5000) errors.message = "Message must be 5,000 characters or fewer.";
  if (!body.contactPermission) {
    errors.contactPermission =
      "Confirm that you agree to be contacted about this inquiry.";
  }

  // Header injection guards
  for (const [key, value] of Object.entries({ name, email, topic, phone, company })) {
    if (/[\r\n]/.test(value)) errors[key] = "Invalid characters in field.";
  }

  return {
    errors,
    data: {
      name,
      email,
      company,
      phone,
      topic,
      message,
      intent,
      projectSlug: String(body.projectSlug || "").trim() || undefined,
      serviceSlug: String(body.serviceSlug || "").trim() || undefined,
      preferredLocalTime: String(body.preferredLocalTime || "").trim() || undefined,
      timeZone: String(body.timeZone || "").trim() || undefined,
      website: String(body.website || "").trim(),
      idempotencyToken: String(body.idempotencyToken || "").trim() || undefined,
    },
  };
}

function ensureStore() {
  try {
    fs.mkdirSync(STORE_DIR, { recursive: true });
    return true;
  } catch {
    return false;
  }
}

function persistInquiry(record) {
  if (!ensureStore()) return null;
  const id = createHash("sha256")
    .update(`${record.email}:${record.idempotencyToken || Date.now()}`)
    .digest("hex")
    .slice(0, 16);
  const file = path.join(STORE_DIR, `${Date.now()}-${id}.json`);
  fs.writeFileSync(file, JSON.stringify(record, null, 2));
  return file;
}

async function sendMail(data) {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    if (DEV_FALLBACK) {
      console.log("[contact] DEV_FALLBACK mail payload", data);
      return { mode: "dev-fallback" };
    }
    throw new Error("SMTP is not configured");
  }

  const transporter = nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "1",
    auth: { user, pass },
  });

  const subject =
    data.intent === "consultation"
      ? `Consultation request: ${data.topic}`
      : `Website inquiry: ${data.topic}`;

  const lines = [
    `Intent: ${data.intent}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || "-"}`,
    `Phone: ${data.phone || "-"}`,
    `Topic: ${data.topic}`,
    `Project: ${data.projectSlug || "-"}`,
    `Preferred time: ${data.preferredLocalTime || "-"}`,
    `Timezone: ${data.timeZone || "-"}`,
    "",
    data.message,
  ];

  await transporter.sendMail({
    from: SMTP_FROM,
    to: CONTACT_TO,
    replyTo: data.email,
    subject,
    text: lines.join("\n"),
  });

  return { mode: "smtp" };
}

async function readBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString("utf8");
  if (!raw) return {};
  return JSON.parse(raw);
}

const server = http.createServer(async (req, res) => {
  cors(req, res);

  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/health") {
    json(res, 200, { ok: true });
    return;
  }

  if (req.method !== "POST" || !req.url?.startsWith("/api/contact")) {
    json(res, 404, { message: "Not found" });
    return;
  }

  const ip = clientIp(req);
  if (!rateLimit(ip)) {
    json(res, 429, { message: "Too many requests. Please wait and try again." });
    return;
  }

  let body;
  try {
    body = await readBody(req);
  } catch {
    json(res, 400, { message: "Invalid JSON body" });
    return;
  }

  const { errors, data } = validate(body);
  if (data.website) {
    // Honeypot filled — pretend success
    json(res, 200, { ok: true });
    return;
  }

  if (Object.keys(errors).length) {
    json(res, 400, { errors, message: "Validation failed" });
    return;
  }

  const idem =
    data.idempotencyToken ||
    String(req.headers["idempotency-key"] || "").trim() ||
    "";

  if (idem && idempotencyCache.has(idem)) {
    json(res, 200, { ok: true, duplicate: true });
    return;
  }

  try {
    const stored = persistInquiry({
      ...data,
      receivedAt: new Date().toISOString(),
      ip,
      idempotencyToken: idem || undefined,
    });
    await sendMail(data);
    if (idem) idempotencyCache.set(idem, Date.now());
    json(res, 200, { ok: true, stored: Boolean(stored) });
  } catch (error) {
    console.error("[contact] delivery failed", error);
    json(res, 502, {
      message: `Your message could not be sent. Please try again or email ${CONTACT_TO}.`,
    });
  }
});

server.listen(PORT, HOST, () => {
  console.log(`[contact] listening on http://${HOST}:${PORT}`);
});
