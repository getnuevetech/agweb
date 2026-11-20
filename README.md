# Agboola Olomola — Personal Website

Responsive personal site for IT consulting, systems administration, technology operations, and digital product initiatives.

Design source of truth: `docs/AG_Website_Design_Specification.md`.

## Stack

- Next.js (App Router) + TypeScript + Tailwind CSS
- Static export to `out/`
- Node contact API (`server/contact-server.mjs`) for inquiry / consultation delivery
- AWS Lightsail + nginx + Let’s Encrypt (domain optional; IP-first supported)

## Local development

```bash
npm install
npm run dev
```

In another terminal, run the contact API with local fallback logging:

```bash
npm run contact:dev
```

Optional: set `NEXT_PUBLIC_CONTACT_API_URL=http://127.0.0.1:8787/api/contact` if the form should call the local API during `next dev`.

## Build

```bash
npm run build
```

Static files are written to `out/`.

## Content rules (launch)

- Use only approved emails: `a@agboolaolomola.com`, `ag@richardwinfred.com`
- Consultation CTAs use **Request a Consultation** (request mode)
- Homepage stats are qualitative (no unverified metrics)
- Employment date badges omitted until confirmed
- Testimonials hidden until an authentic quote is approved
- Blog lists only published articles (drafts stay unpublished)
- Newsletter / Stay Updated hidden until a provider is configured
- Only LinkedIn is shown until other social URLs are verified

## Lightsail (IP first)

1. Install packages on Ubuntu 24.04: `nginx certbot python3-certbot-nginx git rsync` (+ Node 20)
2. Create dirs: `/var/www/agweb`, `/etc/agweb`, `/var/lib/agweb/inquiries`
3. Copy this repo to `/var/www/agweb`
4. Run:

```bash
cd /var/www/agweb
sudo bash deploy/lightsail-setup.sh
```

5. Open `http://STATIC_IP/`
6. Edit `/etc/agweb/mail.env` with SMTP credentials before relying on the form
7. When a domain exists:

```bash
sudo WWW=1 bash deploy/lightsail-setup.sh yourdomain.com you@yourdomain.com
```

## Deploy updates from your machine

```bash
./deploy/push.sh ubuntu@STATIC_IP
```

## Routes

`/`, `/about`, `/resume`, `/services`, `/projects`, `/projects/[slug]`, `/blog`, `/blog/[slug]`, `/contact`, `/privacy`, `/terms`, plus branded 404.
