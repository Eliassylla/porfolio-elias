#!/usr/bin/env bash
# Wrapper firecrawl — garantit que FIRECRAWL_API_KEY est disponible.
# Priorité : 1) var déjà dans l'env  2) ~/.claude/settings.json  3) .env projet
#
# Usage : bash scripts/firecrawl.sh <commande> [args...]
# Ex    : bash scripts/firecrawl.sh scrape "https://gsap.com/docs/v3/" -Q "..."

set -euo pipefail

if [ -z "${FIRECRAWL_API_KEY:-}" ]; then
  # Tenter de lire depuis ~/.claude/settings.json (source préférée, hors repo)
  KEY=$(python3 -c "
import json, sys
try:
    d = json.load(open('$HOME/.claude/settings.json'))
    print(d.get('env', {}).get('FIRECRAWL_API_KEY', ''))
except Exception:
    print('')
" 2>/dev/null)

  if [ -n "$KEY" ]; then
    export FIRECRAWL_API_KEY="$KEY"
  else
    # Fallback : .env du projet courant
    ENV_FILE="$(git rev-parse --show-toplevel 2>/dev/null)/.env"
    if [ -f "$ENV_FILE" ]; then
      KEY=$(grep -m1 '^FIRECRAWL_API_KEY=' "$ENV_FILE" | cut -d'=' -f2-)
      [ -n "$KEY" ] && export FIRECRAWL_API_KEY="$KEY"
    fi
  fi
fi

if [ -z "${FIRECRAWL_API_KEY:-}" ]; then
  echo "❌ FIRECRAWL_API_KEY introuvable (settings.json user, ni .env projet)" >&2
  exit 1
fi

exec firecrawl "$@"
