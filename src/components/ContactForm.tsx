"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { contactTopics, site } from "@/content/site";
import { Button } from "./Button";
import { IconCheck, IconHome, IconSend } from "./Icons";
import { cx } from "@/lib/utils";

type Intent = "message" | "consultation";

type ContactFormProps = {
  initialIntent?: Intent;
  initialTopic?: string;
  projectContext?: string;
};

type FieldErrors = Partial<Record<string, string>>;

function validate(values: Record<string, string>, intent: Intent): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim()) errors.name = "Enter your name.";
  if (values.name.trim().length > 100) errors.name = "Name must be 100 characters or fewer.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) || values.email.length > 254) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.topic) errors.topic = "Select a topic.";
  if (!values.message.trim()) errors.message = "Tell me how I can help.";
  if (values.message.trim().length > 5000) {
    errors.message = "Message must be 5,000 characters or fewer.";
  }
  if (values.company.length > 150) errors.company = "Company must be 150 characters or fewer.";
  if (values.contactPermission !== "yes") {
    errors.contactPermission = "Confirm that you agree to be contacted about this inquiry.";
  }
  if (intent === "consultation" && values.preferredDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(`${values.preferredDate}T00:00:00`);
    if (Number.isNaN(selected.getTime()) || selected < today) {
      errors.preferredDate = "Choose today or a future date.";
    }
  }
  return errors;
}

function createIdempotencyToken() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function ContactForm({
  initialIntent = "message",
  initialTopic = "",
  projectContext = "",
}: ContactFormProps) {
  const [intent, setIntent] = useState<Intent>(initialIntent);
  const [values, setValues] = useState({
    name: "",
    email: "",
    company: "",
    topic: initialTopic,
    phone: "",
    message: "",
    preferredDate: "",
    preferredTime: "",
    timeZone:
      typeof Intl !== "undefined"
        ? Intl.DateTimeFormat().resolvedOptions().timeZone || "America/Chicago"
        : "America/Chicago",
    contactPermission: "",
    projectContext,
    website: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [idempotencyToken] = useState(createIdempotencyToken);

  const apiUrl = useMemo(
    () => process.env.NEXT_PUBLIC_CONTACT_API_URL || "/api/contact",
    [],
  );

  function update(field: string, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values, intent);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const first = Object.keys(nextErrors)[0];
      document.getElementById(`field-${first}`)?.focus();
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Idempotency-Key": idempotencyToken,
        },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim() || undefined,
          phone: values.phone.trim() || undefined,
          topic: values.topic,
          message: values.message.trim(),
          contactPermission: true,
          intent,
          projectSlug: values.projectContext || undefined,
          preferredLocalTime:
            intent === "consultation" && (values.preferredDate || values.preferredTime)
              ? `${values.preferredDate} ${values.preferredTime}`.trim()
              : undefined,
          timeZone: intent === "consultation" ? values.timeZone : undefined,
          website: values.website,
          idempotencyToken,
        }),
      });

      if (response.status === 429) {
        setStatus("error");
        setErrorMessage("Too many requests. Please wait a moment and try again.");
        return;
      }

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { errors?: FieldErrors; message?: string }
          | null;
        if (data?.errors) setErrors(data.errors);
        setStatus("error");
        setErrorMessage(
          data?.message ||
            `Your message could not be sent. Please try again or email ${site.emails.primary}.`,
        );
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage(
        `Your message could not be sent. Please try again or email ${site.emails.primary}.`,
      );
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-line bg-white p-8 shadow-card" role="status">
        <IconCheck className="mb-4 h-12 w-12 text-gold" />
        <h2 className="font-display text-2xl font-semibold text-ink">
          {intent === "consultation"
            ? "Your consultation request has been received."
            : "Your message has been received."}
        </h2>
        <p className="mt-3 text-ink-muted">
          {intent === "consultation"
            ? "The time is not confirmed yet. I’ll contact you to agree the details."
            : "Thank you for getting in touch. I’ll review your inquiry and respond using the contact details you provided."}
        </p>
        <div className="mt-6">
          <Button href="/" variant="secondary" icon={<IconHome className="h-4 w-4" />}>
            Return Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="rounded-xl border border-line bg-white p-6 shadow-card md:p-8"
    >
      <div
        role="tablist"
        aria-label="Inquiry type"
        className="mb-6 grid grid-cols-2 gap-2 rounded-lg bg-surface-cool p-1"
      >
        {(["message", "consultation"] as Intent[]).map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={intent === tab}
            className={cx(
              "min-h-11 rounded-md px-3 text-sm font-semibold capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-base",
              intent === tab ? "bg-white text-navy-base shadow-sm" : "text-ink-muted",
            )}
            onClick={() => setIntent(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {Object.keys(errors).length > 0 ? (
        <div
          className="mb-5 rounded-lg border border-danger/30 bg-danger/5 p-4 text-sm text-danger"
          role="alert"
        >
          <p className="font-semibold">Please correct the highlighted fields.</p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            {Object.entries(errors).map(([field, message]) => (
              <li key={field}>
                <a href={`#field-${field}`} className="underline">
                  {message}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {status === "error" ? (
        <div className="mb-5 rounded-lg border border-danger/30 bg-danger/5 p-4 text-sm text-danger" role="alert">
          {errorMessage}
        </div>
      ) : null}

      {values.projectContext ? (
        <div className="mb-5 rounded-lg border border-line bg-surface-cool px-4 py-3 text-sm text-ink">
          <div className="flex items-center justify-between gap-3">
            <p>
              <span className="font-semibold">Project context:</span> {values.projectContext}
            </p>
            <button
              type="button"
              className="text-navy-base underline"
              onClick={() => update("projectContext", "")}
            >
              Clear
            </button>
          </div>
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <Field
          id="field-name"
          label="Full name"
          required
          error={errors.name}
        >
          <input
            id="field-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputClass(errors.name)}
          />
        </Field>
        <Field id="field-email" label="Email" required error={errors.email}>
          <input
            id="field-email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass(errors.email)}
          />
        </Field>
        <Field id="field-company" label="Company" error={errors.company}>
          <input
            id="field-company"
            name="company"
            autoComplete="organization"
            value={values.company}
            onChange={(e) => update("company", e.target.value)}
            className={inputClass(errors.company)}
          />
        </Field>
        <Field id="field-phone" label="Phone" error={errors.phone}>
          <input
            id="field-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass(errors.phone)}
          />
        </Field>
        <Field id="field-topic" label="Topic" required error={errors.topic} className="md:col-span-2">
          <select
            id="field-topic"
            name="topic"
            value={values.topic}
            onChange={(e) => update("topic", e.target.value)}
            className={inputClass(errors.topic)}
          >
            <option value="">Select a topic</option>
            {contactTopics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </Field>
        <Field
          id="field-message"
          label="Message"
          required
          error={errors.message}
          className="md:col-span-2"
          help="Describe the challenge, your current setup, and what you would like to achieve."
        >
          <textarea
            id="field-message"
            name="message"
            rows={5}
            value={values.message}
            onChange={(e) => update("message", e.target.value)}
            className={inputClass(errors.message)}
          />
        </Field>
      </div>

      {intent === "consultation" ? (
        <div className="mt-5 grid gap-5 md:grid-cols-3">
          <p className="md:col-span-3 text-sm text-ink-muted">
            Your requested time will be confirmed by email. Preferred date and time are optional.
          </p>
          <Field id="field-preferredDate" label="Preferred date" error={errors.preferredDate}>
            <input
              id="field-preferredDate"
              type="date"
              value={values.preferredDate}
              onChange={(e) => update("preferredDate", e.target.value)}
              className={inputClass(errors.preferredDate)}
            />
          </Field>
          <Field id="field-preferredTime" label="Preferred time" error={errors.preferredTime}>
            <select
              id="field-preferredTime"
              value={values.preferredTime}
              onChange={(e) => update("preferredTime", e.target.value)}
              className={inputClass(errors.preferredTime)}
            >
              <option value="">Select a time</option>
              {["09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"].map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </Field>
          <Field id="field-timeZone" label="Timezone" error={errors.timeZone}>
            <select
              id="field-timeZone"
              value={values.timeZone}
              onChange={(e) => update("timeZone", e.target.value)}
              className={inputClass(errors.timeZone)}
            >
              <option value="America/Chicago">America/Chicago</option>
              <option value="America/New_York">America/New_York</option>
              <option value="America/Denver">America/Denver</option>
              <option value="America/Los_Angeles">America/Los_Angeles</option>
              <option value="UTC">UTC</option>
            </select>
          </Field>
        </div>
      ) : null}

      <div className="mt-5">
        <label className="flex items-start gap-3 text-sm text-ink" htmlFor="field-contactPermission">
          <input
            id="field-contactPermission"
            type="checkbox"
            className="mt-1 h-4 w-4 rounded border-line"
            checked={values.contactPermission === "yes"}
            onChange={(e) => update("contactPermission", e.target.checked ? "yes" : "")}
          />
          <span>
            I agree to be contacted about this inquiry.{" "}
            <Link href="/privacy/" className="text-navy-base underline">
              Privacy Policy
            </Link>
          </span>
        </label>
        {errors.contactPermission ? (
          <p className="mt-2 text-sm text-danger">{errors.contactPermission}</p>
        ) : null}
      </div>

      <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="field-website">Website</label>
        <input
          id="field-website"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      <div className="mt-6">
        <Button
          type="submit"
          disabled={status === "submitting"}
          icon={<IconSend className="h-4 w-4" />}
          className="w-full sm:w-auto"
        >
          {status === "submitting"
            ? "Sending…"
            : intent === "consultation"
              ? "Send Consultation Request"
              : "Send Message"}
        </Button>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  help,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  help?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-ink">
        {label}
        {required ? <span className="text-danger"> *</span> : null}
      </label>
      {children}
      {help ? <p className="mt-2 text-xs text-ink-muted">{help}</p> : null}
      {error ? (
        <p className="mt-2 text-sm text-danger" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function inputClass(error?: string) {
  return cx(
    "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-ink shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-base",
    error ? "border-danger" : "border-line",
  );
}
