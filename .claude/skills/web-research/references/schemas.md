# Schemas — pages créées par web-research

## type: article

`wiki/contenu/veille/articles/[slug].md`

```yaml
---
type: article
title: "[titre]"
url: https://...
source: [domaine ou auteur]
published: YYYY-MM-DD
scraped: YYYY-MM-DD
topic: [sujet en 2-3 mots]
domain: contenu
last-updated: YYYY-MM-DD
---
```

Sections :
- **`## Résumé`** — 1 paragraphe sur le contenu et pourquoi c'est pertinent
- **`## Points clés`** — 3-5 bullets extraits de l'article
- **`## Lien`** — URL source complète

---

## Règles communes

- `slug` → lowercase, tirets, pas d'accents (ex: `ai-agents-state-2026`)
- `source` → domaine simplifié (ex: `anthropic.com`, `Simon Willison`, `The Verge`)
- `topic` → 2-3 mots décrivant le sujet (ex: `claude-code`, `agents-ia`, `design-systems`)
- Liens internes → format `[[wiki/contenu/veille/...]]`
