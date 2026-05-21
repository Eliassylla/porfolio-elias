# Portfolio Antigravity — Elias

Portfolio B2B pour Elias, consultant en automatisations agentiques pour PME francophones.

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
- Cal.com prévu pour la prise de rendez-vous

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
│   ├── photographer.ts    # legacy, à nettoyer plus tard
│   └── projects.ts        # legacy, à nettoyer plus tard
├── sections/              # sections de la home
├── pages/                 # pages routées
├── components/            # composants réutilisables
├── hooks/                 # hooks React
├── types/                 # types partagés
└── integrations/          # clients externes, dont Supabase

supabase/
└── config.toml            # configuration Supabase locale

.planning/                 # roadmap et plans GSD
tailwind-plus/             # composants Tailwind de référence
```

Pour modifier le contenu du site, commencer par `src/data/business.ts` quand c'est possible. Il sert de source principale pour les services, projets, textes business, liens et informations de contact.

## Pages principales

- `/` : homepage composée des sections Hero, WhatIBuild, FeaturedProjects, Newsletter et CTA.
- `/services` : présentation de la méthode et des offres.
- `/portfolio` : liste des projets.
- `/portfolio/:id` : détail d'un projet.
- `/contact` : page de contact et réservation d'appel.

## État actuel

Le projet vient d'un template Lovable et contient encore des traces legacy. La structure React fonctionne, mais certaines intégrations sont encore placeholders.

À surveiller :

- `businessInfo.calendlyUrl` vaut encore `#calendly`.
- Cal.com doit remplacer les anciens placeholders Calendly.
- Supabase est configuré, mais les tables métier ne sont pas encore en place.
- Resend et les Edge Functions restent à implémenter.
- Certains fichiers legacy photographe existent encore et seront nettoyés dans une phase dédiée.

## Roadmap

La roadmap active est documentée dans `.planning/ROADMAP.md`.

Phases principales :

1. Copywriting & SEO
2. Contenu réel & CTAs Cal.com
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
- Ne pas supprimer `tailwind-plus/` sauf demande explicite : ce dossier sert de référence UI.

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
