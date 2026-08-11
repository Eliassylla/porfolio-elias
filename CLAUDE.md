# Portfolio Antigravity — Instructions Claude Code

## Ce projet

Portfolio B2B pour Elias, consultant en automatisations agentiques pour solopreneurs, indépendants, petites équipes et PME francophones.
Objectif : permettre à un visiteur de comprendre ce qu’Elias fait, voir des preuves réelles et réserver un appel en moins de 2 minutes.

**Stack :** React 18 + TypeScript + Vite + Tailwind CSS 4 + shadcn/ui + motion ^12.40 + GSAP
**Déploiement :** SPA statique et API `/api/booking` servies par un même Cloudflare Worker
**Backend métier :** Cloudflare Worker, sans base locale au Portfolio
**Emails V1 :** Cal.com pour les réservations ; Resend est reporté
**Prise de RDV :** Cal.com
**Contenu :** `src/data/business.ts` (pas de CMS)
**Langue du site :** français

---

## Règles absolues

- **Ne pas changer la stack** — React/TypeScript/Vite est fixé.
- **Brownfield rule** — toujours remplacer avant de supprimer. Le build TypeScript doit passer à chaque étape.
- **Tier gratuit** — rester compatible avec les offres gratuites de Cloudflare Workers et Cal.com.
- **Backend métier = Worker** — les appels sensibles ou validés côté serveur passent par `/api/*` dans le Worker Cloudflare qui sert aussi la SPA.
- **Mesure de parcours = contrat distinct** — les événements comme `page_view` et `cta_click` seront définis dans une spec dédiée. Leur collecte peut être émise côté client vers la destination retenue ; ne pas la confondre avec le stockage des réservations ni imposer une Edge Function sans spec.
- **Simple et maintenable** — Elias est débutant. Éviter la sur-ingénierie.
- **Contenu en français** — labels, messages d’erreur, emails et copy.
- **GSAP : toujours consulter la doc** — avant de modifier une animation contenant `gsap`, `useGSAP`, `ScrollTrigger`, `SplitText`, `ScrollSmoother` ou un autre plugin GSAP, lire le ou les fichiers pertinents dans `.claude/skills/gsap-doc/references/` en suivant le mapping de `.claude/skills/gsap-doc/SKILL.md`.

---

## Structure actuelle

```text
src/
├── data/
│   └── business.ts        # source de vérité du contenu métier
├── sections/              # sections de la landing
├── pages/                 # pages React, dont certaines redirigent en V1
├── components/            # composants réutilisables et parcours de réservation custom
├── hooks/                 # hooks React
├── lib/attribution/       # capture et projection de la provenance

worker/                    # API Cloudflare et contrat Cal.com
wrangler.jsonc             # assets SPA, routes API et déploiement Worker

specs/                     # contrats de comportement et fixtures exécutables
TASKS.md                   # file d’attente et état du développement
```

**Fichiers à ne pas toucher sans raison :** `vite.config.ts`, `components.json`, `tsconfig.json`.

---

## Sources de vérité et workflow

- `TASKS.md` décrit la tâche active, ses dépendances, ses fichiers réservés, ses tests et son handoff.
- `specs/` décrit les comportements. Lire uniquement la spec indiquée par la tâche en cours.
- Les fixtures de `specs/fixtures/` font partie du contrat et ne se modifient pas pour faire passer un test.
- `src/data/business.ts` est la source de vérité du contenu public.

Workflow : lire la tâche et sa spec → réserver les fichiers via `statut: in_progress` → exécuter → vérifier les critères → créer un commit atomique → passer la tâche à `done` avec un handoff vérifié.

---

## Frontière des responsabilités

- **Cal.com** est l'entrée structurée de la V1 et détient les réservations, leurs statuts, les réponses de qualification et les rappels.
- **Le Portfolio** affiche le parcours custom, valide les entrées via son Worker et appelle l’API publique Cal.com ; il ne détient ni réservation ni CRM.
- **L’OS personnel** sera responsable de la lecture Cal.com via Composio et de l'orchestration avec Trigger.dev ; aucun flow validé n'existe encore et cette redistribution ne se spécifie pas dans ce dépôt.

---

## Décisions techniques clés

| Décision | Pourquoi |
|---|---|
| Cal.com | Gratuit, open source, Google Meet natif |
| Resend | Option future si un vrai formulaire de contact ou une newsletter justifie des emails propres au Portfolio |
| Cloudflare Worker | Un seul déploiement peu coûteux pour les assets Vite et l’API de réservation |
| Contenu dans `business.ts` | Simple et maintenable sans CMS |

---

## Décisions récentes à conserver

- **Positionnement** : inclure explicitement solopreneurs, indépendants et petites équipes, sans réduire la cible aux PME.
- **Homepage V1** : `FeaturedProjectsSection` et `NewsletterSection` ne sont pas montées tant que les projets réels et la newsletter ne sont pas prêts.
- **Navigation** : l’onglet public s’appelle `Mes projets`, pas `Portfolio`.
- **Entrée V1** : le Portfolio affiche un parcours entièrement custom pour l’événement Cal.com `elias-sylla/decouverte` ; aucun iframe Cal.com n’est monté.
- **Cal.com direct** : le Worker utilise uniquement `GET /v2/slots` et `POST /v2/bookings`, fixe l’événement côté serveur et revérifie le créneau avant création.
- **Secret Cal.com côté Worker** : `CAL_API_KEY` authentifie les deux endpoints officiels et vit uniquement dans les secrets Cloudflare ou `.dev.vars` en local. Le token Workers Builds est distinct et sert uniquement au déploiement depuis GitHub.
- **Vercel et Supabase retirés** : Vercel est en pause pendant la migration ; le client Supabase, les Edge Functions et leurs variables ne font plus partie du runtime.
- **Resend reporté** : ne pas construire de formulaire séparé, de base métier ou d'intégration Resend sans besoin observé. Tout futur secret backend vivra dans les secrets du Worker.
- **Dark mode** : thème par défaut `light`, `enableSystem={false}` et `@custom-variant dark (&:where(.dark, .dark *));` avec Tailwind 4.
- **Hero GSAP** : conserver un scroll déterministe avec `scrub`, `invalidateOnRefresh` et cleanup `SplitText`.

---

## Cloudflare — rappels

- `npm run build` produit `dist/`, puis `wrangler deploy` publie les assets et le Worker.
- Les routes `/api/*` exécutent le Worker avant les assets ; les autres routes retombent sur la SPA.
- Ne jamais committer de token Cloudflare, `.dev.vars` ou secret Wrangler.
- Définir `CAL_API_KEY` comme secret chiffré avant le premier test distant de `/api/booking`.
- Activer d’abord l’URL `workers.dev`, puis le domaine personnalisé après validation desktop/mobile.

---

## Options futures

- Turnstile ou le rate limiting Worker ne s’ajoutent qu’en réponse à un risque d’abus observé.
- Une base de données ne s’introduit que si le Portfolio doit réellement détenir des données métier ; Cal.com reste la source de vérité des réservations.
