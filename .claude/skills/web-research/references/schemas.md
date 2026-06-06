# Schemas — sorties web-research pour ce projet

## Contexte

Ce projet n'a pas de wiki. Quand web-research produit de la documentation à conserver,
elle est écrite dans le dossier `references/` du skill concerné.

---

## type: skill-reference

Chemin : `.claude/skills/<nom-du-skill>/references/<slug>.md`

```yaml
---
name: <slug-kebab-case>
description: <une ligne — ce que ce fichier contient>
source: <url ou "CLI inspection">
scraped: YYYY-MM-DD
verified: <version/date testée, ex: "firecrawl-cli 1.19.0"> # optionnel, pour le contenu périssable
topic: <2-3 mots>
---
```

Sections :
- **`## Résumé`** — Ce que couvre ce document et pourquoi c'est utile dans ce projet
- **`## Points clés`** — 5-10 bullets avec les infos actionnables (API, options, comportements)
- **`## Exemples`** — Code snippets prêts à copier
- **`## Pièges`** *(optionnel mais recommandé)* — Erreurs faciles à commettre, confusions, comportements contre-intuitifs. Souvent l'info la plus précieuse.
- **`## Source`** — URL complète

---

## Règles communes

- `slug` → lowercase, tirets, pas d'accents (ex: `splittext-animate-on-scroll`)
- `topic` → correspond au thème du skill parent (ex: `gsap-text`, `gsap-scroll`)
- Un fichier = un sujet précis (pas de fourre-tout)
- Si le contenu dépasse ~150 lignes → split en deux fichiers
