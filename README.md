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
- Supabase client et Edge Functions prévues pour le backend métier
- Resend prévu pour les emails
- Cal.com pour les réservations

Le site est une SPA statique déployée sur Vercel. Les formulaires, écritures métier et secrets doivent passer par Supabase Edge Functions, sans serveur applicatif séparé. La mesure du parcours (`page_view`, `cta_click`) relève d’un contrat distinct et pourra être émise côté client vers la destination définie par sa future spec.

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

Les secrets sensibles, comme `RESEND_API_KEY`, ne doivent jamais être exposés côté client ni codés en dur. Ils seront configurés comme secrets Supabase lorsque les Edge Functions seront implémentées.

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

- **Cal.com** est la source de vérité des réservations, statuts, réponses de qualification et rappels.
- **Le Portfolio** capture la provenance et mesurera le parcours ; il ne stocke pas les réservations.
- **L’OS personnel** récupère les données Cal.com via Composio et les redistribue aux départements.

## Routes publiques

- `/` : landing V1 avec Hero, WhatIBuild, Méthode, Marquee et CTA.
- `/services`, `/portfolio`, `/portfolio/:id` et `/contact` redirigent temporairement vers l’accueil.

Les pages secondaires restent dans le code pour être réactivées lorsque les projets réels et le formulaire Supabase + Resend seront prêts.

## État actuel

- La landing V1 est fonctionnelle.
- Les CTA ouvrent l’événement Cal.com défini dans `src/data/business.ts`.
- La capture de provenance est implémentée et testée, mais son branchement à l’embed Cal.com reste suivi dans `TASKS.md`.
- Supabase est configuré côté client, sans tables métier, migrations ni Edge Functions dans le dépôt.
- Le formulaire de contact repose encore sur `mailto:` ; Resend reste à intégrer.
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
