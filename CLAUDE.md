# Portfolio Antigravity — Instructions Claude Code

## Ce projet

Portfolio B2B pour Elias, consultant en automatisations agentiques pour PME francophones.
Objectif : transformer un template photographe cassé (Lovable) en portfolio qui convertit.
Un visiteur doit comprendre ce qu'Elias fait, voir des preuves, et réserver un appel — en moins de 2 minutes.

**Stack :** React 18 + TypeScript + Vite + Tailwind CSS 4 + shadcn/ui + Framer Motion + GSAP
**Backend :** Supabase Edge Functions uniquement (SPA statique, tier gratuit)
**Emails :** Resend (transactionnel + newsletter)
**Prise de RDV :** Cal.com
**Contenu :** `src/data/business.ts` (pas de CMS)
**Langue du site :** Français (cible PME francophones)

---

## Règles absolues

- **Ne pas changer la stack** — React/TypeScript/Vite, c'est fixé
- **Brownfield rule** — toujours remplacer avant de supprimer. Le build TypeScript doit passer à chaque étape
- **Tier gratuit** — Supabase (60 connexions max), Resend (3000 emails/mois), Cal.com gratuit
- **Backend = Edge Functions uniquement** — pas de serveur séparé, jamais
- **Simple et maintenable** — Elias est débutant. Éviter la sur-ingénierie
- **Contenu en français** — labels, messages d'erreur, emails, copy
- **GSAP : toujours consulter la doc** — avant de modifier toute animation dont le code contient `gsap`, `useGSAP`, `ScrollTrigger`, `SplitText`, `ScrollSmoother` ou tout autre plugin GSAP, lire en premier le(s) fichier(s) pertinent(s) dans `.claude/skills/gsap-doc/references/` (mapping plugin → fichier dans `gsap-doc/SKILL.md`). Les options, gotchas et patterns React y sont documentés et évitent les erreurs récurrentes (`text-balance` qui casse SplitText, double pinning, conflit Motion+GSAP, etc.).

---

## Structure du projet

```
src/
├── data/
│   ├── business.ts        ← SOURCE DE VÉRITÉ du contenu (services, projets, bio, URLs)
│   ├── photographer.ts    ← CODE MORT à supprimer en Phase 4
│   └── projects.ts        ← CODE MORT à supprimer en Phase 4
├── sections/              ← Sections homepage (Hero, WhatIBuild, FeaturedProjects, Newsletter, CTA...)
├── pages/                 ← Pages routées (Home, About, Portfolio, Contact, ProjectDetail)
├── components/            ← Composants réutilisables
├── hooks/                 ← Custom hooks (useContactForm, useNewsletter à créer)
├── types/                 ← Types TypeScript (à migrer domaine automation en Phase 4)
└── integrations/          ← Client Supabase configuré

supabase/
└── config.toml            ← Config Supabase locale (pas encore de tables en prod)
```

**Fichiers à ne pas toucher sans raison :** `vite.config.ts`, `tailwind.config`, `components.json`, `tsconfig.json`

---

## Roadmap active (Milestone v1.0)

| Phase | Objectif | Statut |
|-------|----------|--------|
| **1** | Contenu & CTAs — business.ts réel + Cal.com connecté | En attente |
| **2** | Copywriting & SEO — copy conversion + meta/OG tags | En attente |
| **3** | Infrastructure Email — Edge Functions Supabase + Resend | En attente |
| **4** | Nettoyage & Polish — code mort + types + dark mode | En attente |

**Blockers connus :**
- Phase 3 : Audience ID Resend — créer dans le dashboard Resend avant de coder

**Débloqué :**
- Cal.com : compte créé, URL disponible — demander à Elias avant Phase 2

---


## Workflow de développement

Philosophie : lire le plan → exécuter tâche par tâche → commit atomique → vérifier les critères de succès.

**Avant de coder :** lire `.planning/phases/0X-*/0X-0Y-PLAN.md` pour la phase concernée.
**Pendant :** un commit par tâche complétée (pas de mega-commit en fin de phase).
**Après :** vérifier que chaque critère de succès du ROADMAP est réellement satisfait, pas juste que les tâches sont cochées.

Fichiers de référence : `.planning/ROADMAP.md` (phases + critères), `.planning/phases/` (plans détaillés).

---

## Décisions techniques clés

| Décision | Pourquoi |
|----------|----------|
| Cal.com (pas Calendly) | Gratuit, open source, Google Meet natif, pas de branding forcé |
| Resend (pas SendGrid) | API simple, 3000 emails/mois gratuits, excellent deliverability |
| Edge Functions (pas de serveur) | Cohérent avec Supabase, gratuit, SPA-friendly |
| Formulaire via Resend (pas Formspree) | Contrôle total, même stack que newsletter |
| Contenu dans business.ts (pas de CMS) | Simple, maintenable par Elias lui-même |

---

## Supabase — rappels importants

- Config locale : `supabase/config.toml` existe, `supabase start` pour démarrer localement
- Aucune table en prod pour l'instant — créer via migrations (jamais via dashboard UI)
- Tables à créer en Phase 3 : `contact_submissions`, `subscribers`
- RLS obligatoire sur toutes les tables — utiliser `supabase-postgres-best-practices` pour les policies
- Secrets Edge Functions : `supabase secrets set RESEND_API_KEY=...` (ne jamais hardcoder)
- Connexions tier gratuit : max ~60 directes → utiliser le connection pooler (port 6543)

