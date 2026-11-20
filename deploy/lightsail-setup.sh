#!/usr/bin/env bash
# One-time Lightsail Ubuntu setup for agweb (IP-first friendly).
# Usage on server (as root):
#   cd /var/www/agweb
#   sudo bash deploy/lightsail-setup.sh
# With domain later:
#   sudo WWW=1 bash deploy/lightsail-setup.sh example.com you@example.com
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run as root: sudo bash deploy/lightsail-setup.sh [domain] [email]" >&2
  exit 1
fi

DOMAIN="${1:-}"
EMAIL="${2:-}"
SRC="$(cd "$(dirname "$0")/.." && pwd)"
WEB_ROOT="/var/www/agweb"

export DEBIAN_FRONTEND=noninteractive
apt-get update
apt-get install -y nginx certbot python3-certbot-nginx git rsync curl

if ! command -v node >/dev/null 2>&1; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

install -d -m 755 "$WEB_ROOT" /etc/agweb /var/lib/agweb/inquiries /etc/nginx/snippets
chown -R ubuntu:ubuntu "$WEB_ROOT" /var/lib/agweb || chown -R www-data:www-data "$WEB_ROOT" /var/lib/agweb

if [[ "$SRC" != "$WEB_ROOT" ]]; then
  rsync -a --delete \
    --exclude '.git/' \
    --exclude 'node_modules/' \
    --exclude '.next/' \
    "$SRC"/ "$WEB_ROOT"/
fi

cd "$WEB_ROOT"
if [[ ! -d node_modules ]]; then
  npm ci
fi
npm run build

install -m 644 "$WEB_ROOT/deploy/nginx/security-headers.conf" /etc/nginx/snippets/agweb-headers.conf
install -m 644 "$WEB_ROOT/deploy/nginx/agweb.conf" /etc/nginx/sites-available/agweb
ln -sfn /etc/nginx/sites-available/agweb /etc/nginx/sites-enabled/agweb
rm -f /etc/nginx/sites-enabled/default

if [[ ! -f /etc/agweb/mail.env ]]; then
  install -m 600 "$WEB_ROOT/deploy/mail.env.example" /etc/agweb/mail.env
  echo "Created /etc/agweb/mail.env — edit SMTP settings before relying on the form."
fi

install -m 644 "$WEB_ROOT/deploy/agweb-contact.service" /etc/systemd/system/agweb-contact.service
# Ensure www-data can read the built tree and server script
chown -R www-data:www-data /var/lib/agweb
systemctl daemon-reload
systemctl enable --now agweb-contact.service

nginx -t
systemctl enable nginx
systemctl reload nginx

echo "HTTP site should be available on this instance IP."
echo "Web root: $WEB_ROOT/out"

if [[ -n "$DOMAIN" && -n "$EMAIL" ]]; then
  CERT_ARGS=(-d "$DOMAIN")
  if [[ "${WWW:-}" == "1" ]]; then
    CERT_ARGS+=(-d "www.$DOMAIN")
  fi
  echo "Requesting certificate for ${CERT_ARGS[*]}"
  certbot --nginx "${CERT_ARGS[@]}" --non-interactive --agree-tos --email "$EMAIL" --redirect
  systemctl enable --now certbot.timer || true
  echo "HTTPS enabled for $DOMAIN"
else
  echo "Skipping Certbot (no domain/email args). Re-run later with domain email."
fi
