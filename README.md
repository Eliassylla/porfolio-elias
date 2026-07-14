# Portfolio Antigravity — Elias

Portfolio B2B pour Elias, consultant en automatisations agentiques pour solopreneurs, indépendants, petites équipes et PME francophones.

L'objectif du site est simple : permettre à un visiteur de comprendre ce qu'Elias fait, voir des preuves concrètes, puis réserver un appel ou envoyer un message en moins de 2 minutes.

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS 4
- shadcn/ui
- Framer Motion
- GSAP
- Supabase client + Edge Functions prévues
- Resend prévu pour les emails
- Cal.com pour la prise de rendez-vous

Le site est une SPA statique. Toute logique backend doit passer par Supabase Edge Functions, sans serveur séparé.

## Démarrage local

Prérequis : Node.js et npm.

```sh
npm install
npm run dev
```

Le serveur Vite démarre sur :

```txt
http://localhost:8080/
```

Commandes utiles :

```sh
npm run build      # build production
npm run build:dev  # build en mode development
npm run lint       # lint ESLint
npm run preview    # preview du build
```

## Variables d'environnement

Le client Supabase lit ces variables Vite :

```txt
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Les secrets sensibles, comme `RESEND_API_KEY`, ne doivent jamais être exposés côté client ni codés en dur dans le code. Ils devront être configurés via Supabase secrets lorsque les Edge Functions seront implémentées.

## Structure importante

```txt
src/
├── data/
│   ├── business.ts        # source de vérité du contenu métier
├── sections/              # sections de la home
├── pages/                 # pages conservées pour les phases suivantes
├── components/            # composants réutilisables
├── hooks/                 # hooks React
└── integrations/          # clients externes, dont Supabase

supabase/
└── config.toml            # configuration Supabase locale

.planning/                 # roadmap et plans GSD
```

Pour modifier le contenu du site, commencer par `src/data/business.ts` quand c'est possible. Il sert de source principale pour les services, projets, textes business, liens et informations de contact.

## Routes publiques

- `/` : landing V1 composée des sections Hero, WhatIBuild, Méthode, Marquee et CTA.
- `/services`, `/portfolio`, `/portfolio/:id` et `/contact` redirigent temporairement vers l'accueil.

Les pages secondaires restent dans le code pour être réactivées lorsque les projets réels et le formulaire Supabase + Resend seront prêts.

## État actuel

La landing V1 est fonctionnelle et les CTA ouvrent directement l'événement Cal.com configuré dans `src/data/business.ts`.

À surveiller :

- Supabase est configuré, mais les tables métier ne sont pas encore en place.
- Resend et les Edge Functions restent à implémenter.
- Les projets, témoignages et statistiques doivent être validés avant de rendre les pages secondaires publiques.

## Roadmap

La roadmap active est documentée dans `.planning/ROADMAP.md`.

Phases principales :

1. Contenu réel & CTAs Cal.com
2. Copywriting & SEO
3. Infrastructure email avec Supabase Edge Functions + Resend
4. Nettoyage technique, types métier et polish dark/light mode

Le projet utilise GSD pour la planification. Avant une modification fonctionnelle importante, vérifier les plans dans `.planning/`.

## Conventions de contribution

- Garder le contenu visible du site en français.
- Ne pas changer la stack technique sans raison explicite.
- Préférer des solutions simples et maintenables.
- Conserver un build TypeScript valide après les changements.
- Ne pas coder de secrets en dur.
- Utiliser les tokens de design de `src/index.css` pour les couleurs et thèmes.

## Déploiement

Le projet se déploie comme une SPA statique Vite.

Build production :

```sh
npm run build
```

Le dossier généré est :

```txt
dist/
```

Les intégrations backend prévues doivent rester côté Supabase Edge Functions pour conserver une architecture simple et compatible avec le tier gratuit.
