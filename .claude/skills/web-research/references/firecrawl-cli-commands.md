---
name: firecrawl-cli-commands
description: Capacités complètes du CLI firecrawl-cli — toutes les commandes, flags clés et nouveautés
source: CLI inspection (firecrawl --help)
scraped: 2026-06-04
verified: firecrawl-cli 1.19.0
topic: firecrawl-cli
---

## Résumé

Référence des commandes du CLI `firecrawl-cli` (binaire `firecrawl`). Sert à choisir la bonne commande et les bons flags pour la skill `web-research`. Met en avant les commandes ajoutées après la rédaction initiale du SKILL.md : `crawl`, `monitor`, `interact`, `--status`, `doctor`, et les nouveaux flags de `scrape`.

Toujours exécuter via le wrapper qui charge la clé : `bash .claude/skills/web-research/scripts/firecrawl.sh <cmd> [args]`.

## Points clés

- **Maj / diagnostic** : `npm install -g firecrawl-cli@latest` · `firecrawl --status` (auth, concurrence, crédits) · `firecrawl doctor`.
- **`search`** — découverte d'URLs. `--limit` (max 100), `--tbs qdr:h|d|w|m|y` (récence), `--sources web,news,images`, `--categories github,research,pdf`, `--location`/`--country` (géo), `--scrape --scrape-formats summary` (scrape inline). `search-feedback <searchId>` rembourse 1 crédit.
- **`scrape`** — extraction d'une/plusieurs URLs (concurrentes, sauvées dans `.firecrawl/`) :
  - `-Q "<question>"` → réponse ciblée, ~100x moins de tokens que le markdown complet.
  - `-f/--format` (combinables par virgules) : `markdown, summary, links, images, attributes, branding, screenshot, json, changeTracking, html, rawHtml`. Un seul format → contenu brut ; plusieurs → JSON.
  - Nouveaux : `--country`/`--languages`, `--redact-pii`, `--actions`/`--actions-file` (clic/scroll/saisie), `--profile <nom>` (session persistante), `--max-age <ms>` (cache), `--screenshot`/`--full-page-screenshot`, `--proxy auto|basic`, `--timing`, `--lockdown` (zéro rétention).
- **`map`** — liste *toutes* les URLs d'un site (rapide, repérer avant un scrape ciblé).
- **`crawl`** — parcourt ET scrape un site. `--limit`, `--max-depth`, `--include-paths`/`--exclude-paths`, `--crawl-entire-domain`, `--allow-subdomains`, `--max-concurrency`, `--scrape-options <json>`, `--wait`/`--progress`, `--webhook`. (≠ `map` qui ne fait que lister.)
- **`agent`** — recherche autonome multi-sources. `--model spark-1-mini` (défaut, ~60% moins cher) vs `spark-1-pro` (analyse complexe). `--urls`, `--schema`/`--schema-file`, `--max-credits`, `--wait` (indispensable pour récupérer le résultat), `--webhook`.
- **`monitor`** — veille planifiée + détection de changement + alerte email. Sous-cmd : `create`, `list`, `get`, `update`, `delete`, `run`, `checks`, `check`.
- **`interact`** — session navigateur live sur le dernier scrape (ou `-s <id>`). Prompts IA ("Click the pricing tab") ou code `-c` via `--node` (Playwright, défaut) / `--python` / `--bash`. `interact stop` ferme la session.
- **`parse`** — fichiers locaux (PDF, DOCX, DOC, ODT, RTF, XLSX, XLS, HTML, ≤50 Mo) → markdown/JSON. Mêmes `-Q`, `--format`, `--schema`.
- **Règle tokens** : `-Q` ou `--format summary` par défaut ; `--format markdown` seulement si le contenu intégral est nécessaire. Sujets sensibles au temps → `--tbs qdr:m`.

## Exemples

```bash
W=".claude/skills/web-research/scripts/firecrawl.sh"   # wrapper (auth auto)

bash $W --status                                        # auth + crédits

# Search → résumé inline, récent (1 mois)
bash $W search "resend email sequences 2026" --limit 5 --tbs qdr:m --scrape --scrape-formats summary

# Scrape ciblé : question + métadonnées
bash $W scrape "https://resend.com/docs" -Q "y a-t-il des séquences d'emails ?" --format attributes

# Crawl d'une doc (20 pages, sous-dossier /docs)
bash $W crawl "https://exemple.com" --include-paths "/docs" --limit 20 --wait --progress

# Agent multi-sources (toujours --wait)
bash $W agent "compare Cal.com et Calendly pour un consultant solo en 2026" --wait --model spark-1-pro

# Veille : alerte sur changement d'un changelog
bash $W monitor create --name "Resend changelog" --goal "Notifier les nouveautés" \
  --schedule "every 1 day" --page "https://resend.com/changelog" --email <email>

# Interaction live (onglet pricing en JS)
bash $W scrape "https://exemple.com/pricing"
bash $W interact "Clique sur l'onglet Annuel puis donne le prix du plan Pro"
bash $W interact stop
```

## Pièges

- **Mauvais paquet npm** : le binaire `firecrawl` vient de **`firecrawl-cli`**. `@mendable/firecrawl-js` (alias `firecrawl` sur npm, version 4.x) est le **SDK JavaScript**, un autre produit — l'installer ne donne pas le CLI.
- **`agent` sans `--wait`** rend juste un job ID, pas le résultat. Toujours `--wait` (ou re-checker avec `--status <jobId>`).
- **`map` ≠ `crawl`** : `map` liste les URLs (aucun contenu), `crawl` télécharge le contenu. Ne pas faire `map` puis croire qu'on a le texte.
- **Coût `--format markdown`** : charge toute la page → cher en tokens. Préférer `-Q` ou `summary` sauf besoin réel du texte intégral.
- **`interact`** dépend d'un scrape préalable (l'id est mémorisé) ; penser à `interact stop` pour libérer la session navigateur.

## Source

Inspection locale : `firecrawl --help` et `firecrawl <cmd> --help`, paquet npm `firecrawl-cli` (latest 1.19.0 au 2026-06-04).
