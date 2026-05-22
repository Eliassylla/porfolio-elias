---
name: web-research
description: >
  Recherche web en temps réel et lecture de pages via Firecrawl CLI.
  Utiliser ce skill dès que l'utilisateur veut des informations récentes ou
  externes : "cherche sur X", "c'est quoi X", "compare X et Y", "quelle est
  la différence entre...", "est-ce que X est mieux que Y en 2025",
  "regarde ce lien", "lis cette page", "qu'est-ce que dit ce site",
  "trouve des infos sur X", "je veux en savoir plus sur X",
  "quelles sont les meilleures pratiques pour X", "recherche X pour moi",
  "vérifie si X est vrai", ou quand l'utilisateur colle une URL.
  Aussi trigger sur /web-research <query|url> et /web-research agent <prompt>.
  Toujours utiliser ce skill plutôt que de répondre de mémoire quand la
  question porte sur des versions, des comparaisons de librairies, des prix,
  de l'actualité tech, ou tout sujet pouvant avoir évolué récemment.
compatibility: Requires firecrawl CLI (npm install -g @mendable/firecrawl-js), FIRECRAWL_API_KEY in .env
context: fork
argument-hint: "<query>, <url>, ou agent <prompt>"
---

# Web Research via Firecrawl

## Step 0 — Détecter le mode

Analyser l'input :
- Commence par `https://` ou `http://` → **mode scrape**
- Commence par `agent ` → **mode agent**
- Sinon → **mode search**

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

---

## Mode Agent

```bash
firecrawl agent "<prompt>" --wait --model spark-1-mini
```

Utiliser `--model spark-1-pro` pour des extractions complexes ou multi-pages.

Ajouter `--urls "<url1>,<url2>"` pour focaliser sur des sources précises.

**Output :** Synthétiser le résultat structuré retourné par l'agent.

---

## Répondre à l'utilisateur

Présenter les résultats de façon claire et directe :
- Mode search : liste des sources avec URL + 1 ligne de contexte
- Mode scrape : synthèse du contenu en bullets + points clés
- Mode agent : résultat structuré tel que retourné

---

## Règles générales

- Ne jamais inventer d'URL — utiliser uniquement les URLs retournées par Firecrawl
- Si la commande échoue (timeout, 404, accès refusé) → signaler et proposer une alternative
- Pour les recherches sensibles au temps → toujours ajouter `--tbs qdr:m` par défaut
