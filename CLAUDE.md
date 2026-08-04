# Portfolio Antigravity — Instructions Claude Code

## Ce projet

Portfolio B2B pour Elias, consultant en automatisations agentiques pour solopreneurs, indépendants, petites équipes et PME francophones.
Objectif : permettre à un visiteur de comprendre ce qu’Elias fait, voir des preuves réelles et réserver un appel en moins de 2 minutes.

**Stack :** React 18 + TypeScript + Vite + Tailwind CSS 4 + shadcn/ui + motion ^12.40 + GSAP
**Frontend :** SPA statique déployée sur Vercel
**Backend métier :** Supabase Edge Functions, sans serveur applicatif séparé
**Emails :** Resend (transactionnel + newsletter)
**Prise de RDV :** Cal.com
**Contenu :** `src/data/business.ts` (pas de CMS)
**Langue du site :** français

---

## Règles absolues

- **Ne pas changer la stack** — React/TypeScript/Vite est fixé.
- **Brownfield rule** — toujours remplacer avant de supprimer. Le build TypeScript doit passer à chaque étape.
- **Tier gratuit** — rester compatible avec les offres gratuites de Supabase, Resend et Cal.com.
- **Backend métier = Edge Functions** — formulaires, écritures métier et secrets passent par Supabase Edge Functions ; ne pas ajouter de serveur séparé.
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
├── components/            # composants réutilisables et embed Cal.com
├── hooks/                 # hooks React
├── lib/attribution/       # capture et projection de la provenance
└── integrations/supabase/ # client Supabase généré

specs/                     # contrats de comportement et fixtures exécutables
supabase/config.toml       # configuration locale Supabase
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

- **Cal.com** détient les réservations, leurs statuts, les réponses de qualification et les rappels.
- **Le Portfolio** capture la provenance et mesurera le parcours ; il ne détient aucune réservation.
- **L’OS personnel** lit les données Cal.com via Composio et les redistribue aux départements ; cette redistribution ne se spécifie pas dans ce dépôt.

---

## Décisions techniques clés

| Décision | Pourquoi |
|---|---|
| Cal.com | Gratuit, open source, Google Meet natif |
| Resend | API simple et adaptée aux emails transactionnels |
| Supabase Edge Functions | Backend métier cohérent avec la SPA et les secrets centralisés |
| Contenu dans `business.ts` | Simple et maintenable sans CMS |
| Vercel Workflow SDK | Option future seulement pour des séquences longues et persistantes |

---

## Décisions récentes à conserver

- **Positionnement** : inclure explicitement solopreneurs, indépendants et petites équipes, sans réduire la cible aux PME.
- **Homepage V1** : `FeaturedProjectsSection` et `NewsletterSection` ne sont pas montées tant que les projets réels et la newsletter ne sont pas prêts.
- **Navigation** : l’onglet public s’appelle `Mes projets`, pas `Portfolio`.
- **Architecture email** : `Vercel = frontend statique`, `Supabase Edge Functions = backend métier`, `Resend = email`. Les secrets Resend vont dans Supabase, jamais dans Vercel.
- **Variables Vercel actuelles** : seules `VITE_SUPABASE_URL` et `VITE_SUPABASE_PUBLISHABLE_KEY` sont nécessaires au frontend tant que les Edge Functions ne sont pas branchées.
- **Dark mode** : thème par défaut `light`, `enableSystem={false}` et `@custom-variant dark (&:where(.dark, .dark *));` avec Tailwind 4.
- **Hero GSAP** : conserver un scroll déterministe avec `scrub`, `invalidateOnRefresh` et cleanup `SplitText`.

---

## Vercel Workflow SDK — option future

- Ne pas l’installer pour le tunnel email simple actuel.
- Le réévaluer uniquement pour du nurturing avancé : séquences sur plusieurs jours, retries, observabilité fine ou agents durables.
- Documenter explicitement tout changement d’architecture avant d’ajouter `workflow`, `nitro` ou de modifier `vite.config.ts`.

---

## Supabase — rappels

- `supabase/config.toml` existe ; aucune migration ni Edge Function métier n’est encore présente.
- Créer les tables par migrations, jamais uniquement via le dashboard.
- Activer RLS sur toutes les tables métier.
- Configurer les secrets avec `supabase secrets set`, sans les coder en dur.
- Utiliser le pooler lorsque des connexions PostgreSQL directes sont nécessaires.
