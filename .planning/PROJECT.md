# Portfolio Antigravity — Elias

## What This Is

Portfolio B2B pour Elias, consultant en automatisations agentiques pour PME. Le site vitrine présente les services, démontre les compétences via des projets concrets (workflows n8n, outils internes Claude Code), et convertit les visiteurs en prospects qualifiés via réservation d'appel (Cal.com) ou formulaire de contact. Un système de newsletter intégré (Supabase + Resend) permet le lead nurturing sur les thématiques Claude Code et automatisation IA.

## Core Value

Un visiteur qualifié doit pouvoir comprendre ce qu'Elias fait, voir des preuves concrètes de compétence, et réserver un appel découverte — en moins de 2 minutes.

## Requirements

### Validated

- ✓ Structure SPA React/TypeScript avec routing — existing
- ✓ Pages Home, Services, Portfolio, Contact — existing
- ✓ Design system shadcn/ui + Tailwind + Framer Motion — existing
- ✓ Sections Hero, WhatIBuild, FeaturedProjects, Newsletter, CTA — existing (visuellement)
- ✓ Supabase client configuré — existing (non connecté)

### Active

- [ ] Formulaire de contact fonctionnel (React Hook Form + Resend via Supabase Edge Function)
- [ ] CTA principal "Réserver un appel" connecté à Cal.com (remplace placeholder `#calendly`)
- [ ] Newsletter signup connecté à Supabase (table `subscribers`) + email de bienvenue via Resend
- [ ] Portfolio avec projets réels documentés (automatisations n8n + outils Claude Code)
- [ ] Page About correcte (remplace contenu photographe "Sarah Mitchell")
- [ ] Contenu business.ts à jour (vrais services, vrais projets, vraie bio)
- [ ] Nettoyage code mort (Index.tsx, projects.ts, photographer.ts, About.tsx legacy)
- [ ] Types TypeScript alignés avec le domaine automation (remplace types photographe)
- [ ] Images projets réelles ou screenshots workflows
- [ ] Dark/light mode polish

### Out of Scope

- Blog / système de contenu CMS — géré dans un autre projet
- Authentification utilisateur — pas nécessaire pour un portfolio
- Dashboard analytics custom — Google Analytics suffit pour ce milestone
- Paiement en ligne — hors scope v1
- Mobile app — web-first

## Context

**Codebase actuelle (brownfield) :**
- Le portfolio a été initié via Lovable (AI code generator) et a divergé vers un template photographe
- 70% de la structure visuelle est en place mais les éléments de conversion sont tous cassés ou placeholders
- Supabase est configuré mais n'a aucune table définie et n'est pas utilisé
- La stack complète est opérationnelle : React 18, TypeScript, Vite, Tailwind CSS 4, shadcn/ui, Framer Motion

**Positionnement marché :**
- Elias se positionne comme "médecin des processus" (diagnostic + traitement), pas vendeur d'outils
- Cible : PME de services qui ont atteint les limites de Zapier / automatisations traditionnelles
- Marché en explosion : 25% des grandes entreprises testent les workflows agentiques en 2026

**Stack décisions :**
- Cal.com pour la prise de rendez-vous (gratuit, open source, Google Meet natif)
- Resend pour les emails transactionnels et newsletters (API simple, excellent deliverability)
- Supabase pour stocker les subscribers newsletter et gérer les soumissions de contact
- Pas de CMS externe — contenu géré via `src/data/business.ts`

## Constraints

- **Tech Stack** : React/TypeScript/Vite — ne pas changer la base
- **Budget** : Tier gratuit Supabase + Cal.com + Resend (jusqu'à 3000 emails/mois gratuits)
- **Déploiement** : SPA statique — toute logique backend via Supabase Edge Functions
- **Langue** : Entièrement en français (le site cible des PME francophones)
- **Niveau** : Elias est débutant — les choix techniques doivent être simples et maintenables

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Cal.com plutôt que Calendly | Gratuit, open source, Google Meet natif, pas de branding forcé | — Pending |
| Resend pour emails | API simple, 3000 emails/mois gratuits, excellent deliverability, SDK officiel | — Pending |
| Supabase Edge Functions pour backend | Évite un serveur séparé, gratuit, cohérent avec la stack Supabase existante | — Pending |
| Formulaire de contact via Resend (remplace Formspree) | Contrôle total, pas de dépendance externe, même stack que newsletter | — Pending |
| Projets documentés avec angle "problème → solution → résultat" | Les clients PME comprennent les résultats, pas la tech | — Pending |

---
*Last updated: 2026-03-09 after initialization*
