# Portfolio Antigravity — Elias

Portfolio B2B d’Elias, consultant en automatisations agentiques pour solopreneurs, indépendants, petites équipes et PME francophones.

L’objectif est simple : permettre à un visiteur de comprendre l’offre, voir des preuves réelles et réserver un appel en moins de 2 minutes.

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS 4
- shadcn/ui
- motion ^12.40
- GSAP
- Cloudflare Worker pour servir la SPA et l’API de réservation
- Resend reporté jusqu'à l'apparition d'un vrai besoin d'email propre au Portfolio
- Cal.com pour les réservations

Le site est une SPA statique déployée avec son API dans un Cloudflare Worker. Le Portfolio affiche un parcours de réservation custom ; le Worker lit les créneaux et crée la réservation via l’API publique Cal.com. Cal.com reste propriétaire des réservations et le Portfolio ne devient ni une base de leads ni un CRM. La mesure du parcours (`page_view`, `cta_click`) relève d’un contrat distinct.

## Démarrage local

Prérequis : Node.js et npm.

```sh
npm install
npm run dev
```

Pour tester la SPA et le Worker ensemble :

```bash
npm run dev:worker
```

Le serveur Vite démarre sur `http://localhost:8080/`.

Commandes utiles :

```sh
npm run build      # build de production
npm run build:dev  # build en mode développement
npm run test       # tests Vitest
npm run typecheck  # vérification TypeScript
npm run lint       # lint ESLint
npm run preview    # prévisualisation du build
```

## Variables d’environnement

Le Worker exige un seul secret, `CAL_API_KEY`, pour appeler les endpoints officiels Cal.com. Créez la clé dans **Cal.com → Settings → Developer → API keys**, puis enregistrez-la dans **Cloudflare → Worker → Settings → Variables and Secrets** comme secret chiffré. Elle ne doit jamais porter le préfixe `VITE_`, être placée dans le frontend ou être commitée.

Pour le développement local, utilisez un fichier `.dev.vars` ignoré par Git :

```text
CAL_API_KEY=cal_votre_cle
```

## Structure importante

```text
src/
├── data/business.ts       # source de vérité du contenu métier
├── sections/              # sections de la landing
├── pages/                 # pages React conservées pour les évolutions
├── components/            # composants réutilisables
├── hooks/                 # hooks React
├── lib/attribution/       # capture de provenance testée

worker/                    # API Cloudflare et contrat Cal.com
wrangler.jsonc             # configuration assets + Worker

specs/                     # contrats de comportement et fixtures
TASKS.md                   # file d’attente du développement
```

Pour modifier le contenu public, commencer par `src/data/business.ts`. Pour une tâche de développement, lire son entrée dans `TASKS.md`, puis uniquement la spec qu’elle référence dans `specs/`.

## Frontière des responsabilités

- **Cal.com** est l'entrée structurée et la source de vérité des réservations, statuts, réponses de qualification et rappels.
- **Le Portfolio** affiche le parcours custom, capture la provenance et appelle Cal.com via son Worker ; il ne stocke pas les réservations.
- **L’OS personnel** devra récupérer les données Cal.com via Composio, puis exécuter les flows validés avec Trigger.dev. La connexion est expirée et aucun flow n'existe encore.

## Routes publiques

- `/` : landing V1 avec Hero, WhatIBuild, Méthode, Marquee et CTA.
- `/services`, `/portfolio`, `/portfolio/:id` et `/contact` redirigent temporairement vers l’accueil.

Les pages secondaires restent dans le code pour être réactivées lorsque leur contenu réel le justifiera. Une base métier et Resend ne sont pas requis pour la V1.

## État actuel

- La landing V1 compile et le code local cible `elias-sylla/decouverte`.
- Le déploiement Vercel a été mis en pause le 2026-08-11 pendant la migration Cloudflare.
- Le parcours custom, les quatre questions, le calendrier et le payload d’attribution sont implémentés sur la branche `codex/custom-cal-intake`.
- Le Worker Cloudflare lit les créneaux et prépare la création directe dans Cal.com ; le déploiement et la réservation de validation restent à effectuer.
- Le lien `mailto:` est un secours V1 accepté ; le formulaire séparé et Resend sont reportés.
- Les projets doivent être validés avant de rendre les pages secondaires publiques.

## Développement

`TASKS.md` est la file d’attente de référence. Chaque tâche précise ses dépendances, les fichiers réservés, les critères d’acceptation et la commande de test. Les comportements versionnés et leurs fixtures vivent dans `specs/`.

Conventions :

- garder le contenu visible en français ;
- ne pas changer la stack sans décision explicite ;
- préférer des solutions simples et maintenables ;
- conserver tests, typecheck et build valides ;
- ne jamais coder de secret en dur ;
- utiliser les tokens de `src/index.css` pour les couleurs et thèmes.

## Déploiement

Le projet se déploie comme une SPA Vite et un Worker Cloudflare :

```sh
npm run build
npm run deploy
```

Le résultat frontend est généré dans `dist/`. `wrangler.jsonc` publie ces assets, exécute le Worker pour `/api/*` et renvoie les autres routes vers `index.html` pour le routage client.

Le token proposé par **Workers Builds** dans Cloudflare autorise le déploiement depuis GitHub ; il est distinct de `CAL_API_KEY` et ne doit pas être copié dans le code.
