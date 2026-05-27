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
compatibility: Requires firecrawl CLI (npm install -g @mendable/firecrawl-js). Auth : FIRECRAWL_API_KEY chargée automatiquement via scripts/firecrawl.sh (lit ~/.claude/settings.json, puis .env projet en fallback).
context: fork
argument-hint: "<query>, <url>, ou agent <prompt>"
---

# Web Research via Firecrawl

## Authentification

Toutes les commandes passent par `scripts/firecrawl.sh` qui charge `FIRECRAWL_API_KEY` automatiquement :
```bash
bash scripts/firecrawl.sh <commande> [args...]
```
Le script lit la clé depuis `~/.claude/settings.json` en priorité — fonctionne même en contexte fork isolé. Fallback sur `.env` du projet si absente.

---

## Étape 0 — Choisir le bon mode

```
Je connais déjà les URLs ?
├── Oui → Mode Scrape (1 URL) ou Mode Batch (plusieurs URLs)
└── Non
    ├── Sujet simple, URL unique probable → Mode Search → puis Scrape
    ├── Explorer toutes les pages d'un site → Mode Map → puis Batch Scrape
    ├── Recherche autonome multi-sources complexe → Mode Agent
    └── Fichier local (PDF, DOCX, XLSX) → Mode Parse
```

---

## Mode Search

**Quand :** sujet inconnu, URLs à découvrir, veille, comparaisons.

```bash
firecrawl search "<query>" --limit 10
```

**Options selon le contexte :**
| Besoin | Flag |
|---|---|
| Papers / recherche académique | `--categories research` |
| Résultats récents (semaine) | `--tbs qdr:w` |
| Résultats récents (mois) | `--tbs qdr:m` |
| Actualités | `--sources news` |
| Scraper les résultats directement | `--scrape --scrape-formats markdown` |
| Scraper avec résumé rapide | `--scrape --scrape-formats summary` |

**Pattern combiné search → scrape en une commande :**
```bash
firecrawl search "<query>" --limit 5 --scrape --scrape-formats summary --only-main-content
```
Retourne les URLs + le contenu résumé de chaque résultat en un seul appel.

**Output :** Identifier les 3-5 sources les plus pertinentes avec URL + résumé 1 ligne.

---

## Mode Scrape

**Quand :** URL connue, extraction précise d'une page.

```bash
firecrawl scrape "<url>" --only-main-content
```

**Formats et quand les utiliser :**
| Format | Commande | Quand l'utiliser |
|---|---|---|
| Question ciblée | `-Q "<question>"` | Réponse précise, extrait les passages pertinents, 100x moins de tokens |
| Résumé rapide | `--format summary` | Page inconnue, vérifier si ça vaut la peine de creuser |
| Contenu complet | `--format markdown` | Besoin du contenu intégral (référence, documentation longue) |
| Métadonnées de page | `--format attributes` | title, og:image, lang, auteur, dates |
| Profil visuel | `--format branding` | Couleurs, polices, logo, mode sombre/clair d'un site |
| Liens de la page | `--format links` | Découvrir les sous-pages, navigation |
| JSON structuré | `--schema '<json>'` | Extraire des données selon un schéma précis |
| Hors-réseau (cache) | `--lockdown` | Zéro retention, résultats depuis l'index Firecrawl uniquement |

**Combiner plusieurs formats :**
```bash
# Résumé + liens en un appel
firecrawl scrape "<url>" --only-main-content --format summary,links

# Question + métadonnées
firecrawl scrape "<url>" -Q "quelles sont les options de configuration ?" --format attributes
```
Quand plusieurs formats sont demandés → output en JSON contenant tous les résultats.

**Pipeline search → scrape (workflow standard documentation) :**
```bash
# 1. Chercher les pages pertinentes
firecrawl search "gsap splittext animate on scroll" --limit 8

# 2. Scraper les 2-3 meilleures URLs avec question ciblée
firecrawl scrape "https://gsap.com/docs/v3/..." --only-main-content -Q "how to animate words on scroll with stagger"
```

---

## Mode Map

**Quand :** explorer la structure complète d'un site (ex: toute une doc).

```bash
firecrawl map "<url-racine>"
```

Retourne la liste de toutes les URLs du site. Combiner avec scrape en batch :
```bash
# Découvrir toutes les pages de la doc
firecrawl map "https://gsap.com/docs/v3/Plugins/SplitText"

# Puis scraper chaque URL utile
firecrawl scrape "<url1>" "<url2>" "<url3>" --only-main-content -Q "<question>"
```
Plusieurs URLs en argument → scraped en parallèle, résultats sauvegardés dans `.firecrawl/`.

---

## Mode Agent

**Quand :** recherche autonome multi-pages, pas besoin de spécifier les URLs, sujets complexes.

```bash
# Tâches simples, extraction directe, sites bien structurés
firecrawl agent "<prompt>" --wait --model spark-1-mini

# Recherche complexe, multi-sources, raisonnement nécessaire
firecrawl agent "<prompt>" --wait --model spark-1-pro
```

**Spark-1-mini vs Spark-1-pro :**
| | spark-1-mini | spark-1-pro |
|---|---|---|
| Coût | 60% moins cher | Plus élevé |
| Usage | Extraction simple, sites structurés, volume | Analyse complexe, multi-sources, ambiguïté |
| Ex. | Prix, contacts, données tabulaires | Veille concurrentielle, synthèse croisée |

Focaliser sur des sources précises :
```bash
firecrawl agent "résume les différences entre SplitText v2 et v3" --wait --model spark-1-mini --urls "https://gsap.com/docs/...,https://gsap.com/blog/..."
```

---

## Mode Parse (fichiers locaux)

**Quand :** PDF, DOCX, XLSX, HTML local — jusqu'à 50 Mo.

```bash
firecrawl parse "<chemin/fichier>" --only-main-content
```

**Options selon le contexte :**
| Besoin | Flag |
|---|---|
| Question sur le contenu | `-Q "<question>"` |
| Résumé | `--format summary` |
| Liens extraits | `--format links` |
| JSON structuré | `--json --pretty -o output.json` |

---

## Répondre à l'utilisateur

- **Mode search** : liste des sources avec URL + 1 ligne de contexte
- **Mode scrape** : synthèse en bullets + points clés actionnables
- **Mode agent** : résultat structuré tel que retourné
- **Pour une référence à conserver** : écrire dans `.claude/skills/<skill>/references/<slug>.md` selon le schéma de `references/schemas.md`

---

## Règles générales

- Ne jamais inventer d'URL — utiliser uniquement les URLs retournées par Firecrawl
- Si la commande échoue (timeout, 404, accès refusé) → signaler et proposer une alternative
- Pour les recherches sensibles au temps → toujours ajouter `--tbs qdr:m` par défaut
- Préférer `--scrape --scrape-formats summary` sur search pour filtrer rapidement avant de creuser
- Utiliser `-Q` pour les questions précises sur du contenu connu — évite de charger 200 lignes inutiles
- Utiliser `--format markdown` seulement quand le contenu complet est vraiment nécessaire
