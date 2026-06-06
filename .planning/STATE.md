---
gsd_state_version: 1.0
milestone: v1.0
milestone_name: milestone
status: in_progress
stopped_at: V1 cadré — prêt à implémenter la landing + Cal.com
last_updated: "2026-06-05T00:00:00.000Z"
last_activity: "2026-06-05 — Re-scope V1/V2 : V1 = livrer une landing minimale qui prend des RDV via Cal.com ; projets, contact et nurturing reportés en V2"
progress:
  total_phases: 4
  completed_phases: 0
  total_plans: 0
  completed_plans: 0
  percent: 0
---

# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-06-05)

**Core value:** Un visiteur qualifié doit pouvoir comprendre ce qu'Elias fait, voir des preuves concrètes de compétence, et réserver un appel découverte — en moins de 2 minutes.
**Current focus:** **V1** — livrer une landing minimale qui prend des RDV via Cal.com.

## Stratégie V1 / V2 (re-scope 2026-06-05)

- **V1 (livrer maintenant)** : landing seule qui convertit en RDV. Cal.com branché sur les CTAs, navbar réduite (projets + contact cachés), copy/SEO essentiels. Aucune dépendance backend.
- **V1.5 (après mise en ligne)** : section « Systèmes types » (option A — section dédiée juste APRÈS WhatIBuild) montrant des exemples concrets de systèmes. Contenu TBD (réutiliser les exemples de `business.ts`). À ne pas confondre avec la page « Mes projets » (V2, vraies preuves).
- **V2 (itérer)** : page projets (DB Supabase), formulaire contact (Edge Function), lead nurturing (Resend Automations + webhook Cal.com).

Voir `ROADMAP.md` pour le détail des phases annotées V1/V2, et `research/rdv-email-nurturing-2026.md` pour l'architecture email/nurturing.

## Current Position

Focus: **V1 — landing + Cal.com**
Status: cadré, prêt à implémenter (branche dédiée `feat/v1-landing-cal`)
Last activity: 2026-06-05 — re-scope V1/V2

### Fondations déjà en place (hors suivi GSD)

- Refonte complète de la homepage : Hero (GSAP), section Services (cadran Lottie adaptatif au thème), Méthode, Marquee, CTA.
- FeaturedProjects et Newsletter **retirées** de la landing (réintroduites en V2 si besoin).
- Dark/light mode corrigé + correctifs mobile.
- Nettoyage template photographe : « Sarah Mitchell » et page About supprimées.
- Cadran « automatisations » migré SVG → Lottie + nettoyage du code mort associé.

## Accumulated Context

### Decisions

Décisions complètes dans PROJECT.md (table Key Decisions). Récentes :

- [2026-06-05]: **Stratégie V1-first** — livrer une landing minimale qui prend des RDV avant de construire projets/contact/nurturing.
- [2026-06-05]: **Lien Cal.com obtenu** : `cal.com/elias-sylla` → débloque les CTAs de prise de RDV.
- [2026-06-05]: **Lead nurturing via Resend Automations** (dispo sur le compte) + webhook Cal.com gratuit → **pas** de Vercel Workflow SDK (sur-ingénierie à ce stade).
- [2026-06-06]: **Offre = trio Automatisations / Skills / Agents IA** (PAS de "Landing pages" comme service — recherche 2026 : le web/landing est un autre métier qui dilue le positionnement opérationnel). Les projets du workspace = preuves de compétence, pas le catalogue.
- [2026-06-06]: **Trio conservé tel quel** — Automatisations / Skills / Agents IA, **sans renommage** des labels (Skills = terme connu ; Agents IA = gardé). Seuls les **visuels Lottie** sont à refaire : Automatisations + Agents IA (l'illustration Agents IA montrera différents agents IA).

### Blockers/Concerns

- **À vérifier (V2)** : le tier exact de « Resend Automations » en gratuit (à confirmer dans le dashboard Resend avant de bâtir le nurturing dessus).
- **À vérifier (V2)** : domaine email vérifié dans Resend (anti-spam).

## Session Continuity

Last session: 2026-06-05
Stopped at: V1 cadré — prêt à implémenter
Resume: créer la branche `feat/v1-landing-cal` (navbar réduite + Cal.com sur Hero/CTA + désactivation routes /services /portfolio /contact)
