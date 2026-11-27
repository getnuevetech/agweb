#!/usr/bin/env bash
# Run ON the Lightsail box to sync to the latest prebuilt out/ on main.
# Discards any local edits on the server (required when git pull says
# "commit your changes or stash them before you merge").
# Usage: sudo bash /var/www/agweb/deploy/pull-on-server.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Local changes detected on the server; discarding them to match origin/main."
  git status --short || true
fi

# Prefer hard reset over merge/pull so dirty working trees never block deploy.
git fetch origin main
git checkout -B main origin/main
git reset --hard origin/main
git clean -fd

if [[ ! -f out/index.html ]]; then
  echo "ERROR: out/index.html missing after sync. Main must include the prebuilt bundle." >&2
  exit 1
fi

if [[ ! -f out/images/portrait-resume-v2.jpg ]]; then
  echo "ERROR: portrait-resume-v2.jpg missing. Sync did not pick up the new avatars." >&2
  exit 1
fi

if command -v nginx >/dev/null 2>&1; then
  nginx -t
  systemctl reload nginx
fi

echo "Updated $(pwd) to $(git rev-parse --short HEAD) and reloaded nginx."
echo "Verify: curl -sI http://127.0.0.1/images/portrait-resume-v2.jpg | head -1"
