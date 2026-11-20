#!/usr/bin/env bash
# Build locally and sync to Lightsail.
# Usage: ./deploy/push.sh ubuntu@STATIC_IP
set -euo pipefail

TARGET="${1:-}"
if [[ -z "$TARGET" ]]; then
  echo "Usage: ./deploy/push.sh ubuntu@STATIC_IP" >&2
  exit 1
fi

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"
npm run build

rsync -az --delete \
  --exclude '.git/' \
  --exclude 'node_modules/' \
  --exclude '.next/' \
  --exclude 'deploy/mail.env' \
  --exclude '.env.contact' \
  "$ROOT"/ "$TARGET:/var/www/agweb/"

ssh "$TARGET" 'bash -s' <<'REMOTE'
set -euo pipefail
cd /var/www/agweb
if [[ ! -d node_modules ]]; then npm ci --omit=dev; fi
# contact server needs nodemailer in production
npm ci --omit=dev
sudo cp deploy/nginx/agweb.conf /etc/nginx/sites-available/agweb
sudo cp deploy/nginx/security-headers.conf /etc/nginx/snippets/agweb-headers.conf
sudo cp deploy/agweb-contact.service /etc/systemd/system/agweb-contact.service
sudo systemctl daemon-reload
sudo systemctl restart agweb-contact.service
sudo nginx -t
sudo systemctl reload nginx
REMOTE

echo "Deployed to $TARGET"
