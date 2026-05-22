---
name: web-research
description: >
  Recherche web et extraction de contenu via Firecrawl CLI.
  Trigger sur: "/web-research <query>" pour chercher sur le web,
  "/web-research <url>" pour scraper une page spécifique,
  "/web-research agent <prompt>" pour extraction structurée complexe.
  Aussi trigger quand l'utilisateur dit "cherche sur X", "lis cette page",
  "trouve des infos sur X", "scrape cette URL", "recherche web sur X",
  "qu'est-ce que dit ce site", "firecrawl X".
  Ajoute --ingest ou "enregistre dans le wiki" pour sauvegarder en article.
compatibility: Requires firecrawl CLI (npm install -g @mendable/firecrawl-js), FIRECRAWL_API_KEY in .env
context: fork
argument-hint: "<query>, <url>, ou agent <prompt>"
effort: medium
---

# Web Research via Firecrawl

## Step 0 — Détecter le mode

Analyser l'input :
- Commence par `https://` ou `http://` → **mode scrape**
- Commence par `agent ` → **mode agent**
- Sinon → **mode search**

Détecter aussi si l'utilisateur veut ingérer dans le wiki :
- Contient `--ingest`, "enregistre", "ajoute au wiki", "sauvegarde" → **flag ingest = true**

---

## Mode Search

```bash
firecrawl search "<query>" --limit 10
```

**Options selon le contexte :**
| Besoin | Flag |
|---|---|
| Repos GitHub uniquement | `--categories github` |
| Papers / recherche | `--categories research` |
| Résultats récents (semaine) | `--tbs qdr:w` |
| Résultats récents (mois) | `--tbs qdr:m` |
| Scraper les résultats en plus | `--scrape` |
| Actualités | `--sources news` |

**Output :** Lire les résultats et synthétiser les 3-5 sources les plus pertinentes avec URL + résumé 1 ligne.

Si flag ingest → passer au Step 3 pour chaque URL retenue.

---

## Mode Scrape

```bash
firecrawl scrape "<url>" --only-main-content
```

**Options selon le contexte :**
| Besoin | Flag |
|---|---|
| Poser une question sur le contenu | `-Q "<question>"` |
| Extraire en JSON structuré | `--schema '<json>'` |
| Résumé rapide | `--format summary` |
| Récupérer les liens | `--format links` |

**Output :** Lire le contenu et synthétiser les points clés pour répondre à la demande de l'utilisateur.

Si flag ingest → passer au Step 3.

---

## Mode Agent

```bash
firecrawl agent "<prompt>" --wait --model spark-1-mini
```

Utiliser `--model spark-1-pro` pour des extractions complexes ou multi-pages.

Ajouter `--urls "<url1>,<url2>"` pour focaliser sur des sources précises.

**Output :** Synthétiser le résultat structuré retourné par l'agent.

Si flag ingest → passer au Step 3.

---

## Step 1 — Répondre à l'utilisateur

Présenter les résultats de façon claire et directe :
- Mode search : liste des sources avec URL + 1 ligne de contexte
- Mode scrape : synthèse du contenu en bullets + points clés
- Mode agent : résultat structuré tel que retourné

Si l'utilisateur n'a pas demandé d'ingest → **s'arrêter ici.**

---

## Step 2 — Ingest dans le wiki (si flag ingest)

Lire `references/schemas.md` pour le format exact.

Créer `wiki/contenu/veille/articles/[slug].md` avec le schema article.

Règles pour le slug :
- Lowercase, tirets, pas d'accents
- Ex : `ai-agents-state-2026`, `remotion-video-rendering`, `firecrawl-use-cases`

Mettre à jour `wiki/contenu/veille/index-veille.md` si la section articles existe.

---

## Règles générales

- Ne jamais inventer d'URL — utiliser uniquement les URLs retournées par Firecrawl
- Si la commande échoue (timeout, 404, accès refusé) → signaler et proposer une alternative
- Pour les recherches sensibles au temps → toujours ajouter `--tbs qdr:m` par défaut
