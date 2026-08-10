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
- Supabase client présent ; Edge Functions seulement si une écriture métier est ajoutée
- Resend reporté jusqu'à l'apparition d'un vrai besoin d'email propre au Portfolio
- Cal.com pour les réservations

Le site est une SPA statique déployée sur Vercel. Cal.com est l'unique entrée structurée de la V1 ; un lien email reste disponible comme secours. Si un formulaire métier est ajouté plus tard, ses écritures et secrets devront passer par Supabase Edge Functions, sans serveur applicatif séparé. La mesure du parcours (`page_view`, `cta_click`) relève d’un contrat distinct et pourra être émise côté client vers la destination définie par sa future spec.

## Démarrage local

Prérequis : Node.js et npm.

```sh
npm install
npm run dev
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

Le client Supabase lit :

```text
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Les secrets sensibles ne doivent jamais être exposés côté client ni codés en dur. Si Resend est introduit plus tard, `RESEND_API_KEY` sera configurée comme secret Supabase.

## Structure importante

```text
src/
├── data/business.ts       # source de vérité du contenu métier
├── sections/              # sections de la landing
├── pages/                 # pages React conservées pour les évolutions
├── components/            # composants réutilisables
├── hooks/                 # hooks React
├── lib/attribution/       # capture de provenance testée
└── integrations/supabase/ # client Supabase

specs/                     # contrats de comportement et fixtures
supabase/config.toml       # configuration Supabase locale
TASKS.md                   # file d’attente du développement
```

Pour modifier le contenu public, commencer par `src/data/business.ts`. Pour une tâche de développement, lire son entrée dans `TASKS.md`, puis uniquement la spec qu’elle référence dans `specs/`.

## Frontière des responsabilités

- **Cal.com** est l'entrée structurée et la source de vérité des réservations, statuts, réponses de qualification et rappels.
- **Le Portfolio** ouvre Cal.com, capture la provenance et propose un lien email de secours ; il ne stocke pas les réservations.
- **L’OS personnel** devra récupérer les données Cal.com via Composio, puis exécuter les flows validés avec Trigger.dev. La connexion est expirée et aucun flow n'existe encore.

## Routes publiques

- `/` : landing V1 avec Hero, WhatIBuild, Méthode, Marquee et CTA.
- `/services`, `/portfolio`, `/portfolio/:id` et `/contact` redirigent temporairement vers l’accueil.

Les pages secondaires restent dans le code pour être réactivées lorsque leur contenu réel le justifiera. Un formulaire Supabase + Resend n'est pas requis pour la V1.

## État actuel

- La landing V1 compile et le code local cible `elias-sylla/decouverte`.
- Le bundle Vercel audité le 2026-08-10 cible encore `elias-sylla/30min`, désormais en 404 ; un déploiement est requis avant de déclarer le parcours public fonctionnel.
- La capture de provenance est implémentée et testée, mais son branchement à l’embed Cal.com reste suivi dans `TASKS.md`.
- L'événement Cal.com `Échange découverte` existe, mais les 4 questions de qualification, les 6 champs UTM cachés et les workflows sont absents.
- Supabase est configuré côté client, sans tables métier, migrations ni Edge Functions dans le dépôt.
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

Le projet se déploie comme une SPA Vite statique :

```sh
npm run build
```

Le résultat est généré dans `dist/`. `vercel.json` redirige les routes vers `index.html` pour le routage client.
