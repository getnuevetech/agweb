#!/usr/bin/env bash
# Run ON the Lightsail box to pull the latest prebuilt out/ from main.
# Usage: sudo bash deploy/pull-on-server.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

git fetch origin main
git reset --hard origin/main

if [[ ! -f out/index.html ]]; then
  echo "ERROR: out/index.html missing after pull. Main must include the prebuilt bundle." >&2
  exit 1
fi

if command -v nginx >/dev/null 2>&1; then
  nginx -t
  systemctl reload nginx
fi

echo "Updated $(pwd) to $(git rev-parse --short HEAD) and reloaded nginx."
