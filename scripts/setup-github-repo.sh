#!/usr/bin/env bash
# One-time setup: create abx-git/xbe-site and push main.
# Requires: gh auth login (or GH_TOKEN / GITHUB_TOKEN with repo scope on abx-git)

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

ORG="abx-git"
REPO="xbe-site"
REMOTE="https://github.com/${ORG}/${REPO}.git"

if ! command -v gh >/dev/null 2>&1; then
  echo "Install GitHub CLI: brew install gh" >&2
  exit 1
fi

if ! gh auth status >/dev/null 2>&1; then
  echo "Not logged in. Run: gh auth login" >&2
  echo "Scopes needed: repo (or fine-grained: Contents + Administration on ${ORG}/${REPO})" >&2
  exit 1
fi

if gh repo view "${ORG}/${REPO}" >/dev/null 2>&1; then
  echo "Repository ${ORG}/${REPO} already exists."
else
  echo "Creating ${ORG}/${REPO}…"
  gh repo create "${ORG}/${REPO}" \
    --public \
    --description "X-BE marketing site — Astro static site for www.x-be.de" \
    --source . \
    --remote origin \
    --push
  echo "Repository created and pushed."
  exit 0
fi

git remote remove origin 2>/dev/null || true
git remote add origin "$REMOTE"
git push -u origin main

echo ""
echo "Next steps:"
echo "  1. https://github.com/${ORG}/${REPO}/settings/pages → Source: GitHub Actions"
echo "  2. Custom domain: www.x-be.de"
echo "  3. DNS: CNAME www → ${ORG}.github.io"
echo "  4. Actions → Deploy X-BE Site → Run workflow (if not auto-started)"
echo ""
echo "Details: docs/GITHUB-PAGES-SETUP.md"
