# Roadmap: Portfolio Antigravity — Elias

## Overview

Transformer un template photographe cassé (70% visuel, 0% fonctionnel) en portfolio B2B opérationnel pour consultant en automatisations agentiques. La progression suit une logique UX-first : le copy et le visuel d'abord (impact immédiat sur les visiteurs), puis le contenu réel avec Cal.com et screenshots quand ils sont disponibles, ensuite l'infrastructure email (Supabase + Resend), et enfin le nettoyage technique. Un visiteur qualifié doit pouvoir comprendre ce qu'Elias fait, voir des preuves concrètes, et réserver un appel découverte en moins de 2 minutes.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Copywriting & SEO** - Réécrire le copy de conversion et ajouter les meta/OG/structured data
- [ ] **Phase 2: Contenu & CTAs** - Remplir business.ts avec les vrais services/projets/bio et connecter les 4 CTAs Cal.com
- [ ] **Phase 3: Infrastructure Email** - Construire les Edge Functions Supabase + Resend pour le formulaire et la newsletter
- [ ] **Phase 4: Nettoyage & Polish** - Supprimer le code mort, aligner les types TypeScript, corriger le dark/light mode

## Phase Details

### Phase 1: Copywriting & SEO
**Goal**: Le copy de toutes les sections convertit les décideurs PME francophones, et le site est correctement référencé et partageable sur LinkedIn
**Depends on**: Nothing (first phase — works with existing business.ts content)
**Requirements**: COPY-01, COPY-02, COPY-03, SEO-01, SEO-02, SEO-03
**Success Criteria** (what must be TRUE):
  1. Le headline du Hero exprime clairement la proposition de valeur d'Elias pour les PME en moins de 10 mots
  2. Les sections WhatIBuild, CTASection et FeaturedProjects ont un copy orienté résultats, sans jargon technique superflu
  3. Le formulaire de contact affiche des champs et labels en français avec des questions qualifiantes (secteur, problème principal)
  4. Un partage LinkedIn du site affiche un titre, une description et une image OG corrects (pas de contenu photographe)
  5. Les meta tags `<title>` et `<description>` de toutes les pages décrivent le consulting automation, pas la photographie
**Plans**: TBD

Plans:
- [ ] 01-01: Réécrire le copy Hero, WhatIBuild, CTASection, FeaturedProjects
- [ ] 01-02: Franciser et qualifier le formulaire de contact (champs + labels + validation messages)
- [ ] 01-03: Ajouter meta tags, OG tags et structured data schema.org sur toutes les pages

### Phase 2: Contenu & CTAs
**Goal**: Les visiteurs voient un portfolio B2B réel — vrais services, vrais projets, vraie bio — et peuvent réserver un appel en un clic
**Depends on**: Phase 1
**Requirements**: CONT-01, CONT-02, CONT-03
**Success Criteria** (what must be TRUE):
  1. Le bouton "Réserver un appel" dans Hero, CTASection, ProjectDetail et Contact ouvre une vraie page Cal.com (pas un `#calendly` mort)
  2. La page About ne mentionne plus "Sarah Mitchell" ni la photographie — elle décrit Elias consultant en automatisations agentiques
  3. Les services listés sur le site correspondent aux vrais services d'Elias (pas des placeholders)
  4. Chaque case study de projet présente un vrai problème, une vraie solution, et un résultat concret avec un screenshot workflow annoté visible
**Plans**: TBD

Plans:
- [ ] 02-01: Compléter business.ts — URL Cal.com, bio, services, projets réels
- [ ] 02-02: Intégrer les screenshots workflows dans ProjectDetail (Glass Box)

### Phase 3: Infrastructure Email
**Goal**: Les visiteurs peuvent envoyer un message via le formulaire de contact et s'inscrire à la newsletter — Elias reçoit les leads et les abonnés sont archivés dans Supabase et Resend
**Depends on**: Phase 1
**Requirements**: EMAIL-01, EMAIL-02, EMAIL-03
**Success Criteria** (what must be TRUE):
  1. Un visiteur qui soumet le formulaire de contact reçoit un email de confirmation, et Elias reçoit une notification avec les détails du prospect
  2. Chaque soumission de formulaire est archivée dans la table Supabase `contact_submissions` (vérifiable dans le dashboard Supabase)
  3. Un visiteur qui s'inscrit à la newsletter reçoit un email de bienvenue, et son adresse apparaît dans la table Supabase `subscribers` ET dans Resend Contacts (audience newsletter)
**Plans**: TBD

Plans:
- [ ] 03-01: Migration SQL Supabase (tables `contact_submissions` et `subscribers`) + configuration secrets
- [ ] 03-02: Edge Function `send-contact-email` + hook `useContactForm` + câblage ContactForm
- [ ] 03-03: Edge Function `add-subscriber` + hook `useNewsletter` + câblage NewsletterSection

### Phase 4: Nettoyage & Polish
**Goal**: La codebase ne contient plus aucun vestige du template photographe, les types TypeScript reflètent le domaine automation, et le dark/light mode est cohérent sur toutes les sections
**Depends on**: Phase 3
**Requirements**: CLEAN-01, CLEAN-02, CLEAN-03
**Success Criteria** (what must be TRUE):
  1. Les fichiers `About.tsx` (legacy), `photographer.ts`, `projects.ts` (legacy) et `Index.tsx` n'existent plus dans le dépôt, et le build TypeScript passe sans erreur
  2. Les types `ProjectCategory`, `ContactSubmission` et `PhotographerInfo` sont remplacés par des types métier automation — aucune référence à la photographie dans les types
  3. Toutes les sections modifiées lors des phases 1-3 s'affichent correctement en mode sombre et en mode clair sans incohérence de couleur
**Plans**: TBD

Plans:
- [ ] 04-01: Supprimer fichiers code mort (après vérification que tout contenu est migré) + aligner types TypeScript domaine automation
- [ ] 04-02: Audit et correction dark/light mode sur toutes les sections modifiées

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Copywriting & SEO | 0/3 | Not started | - |
| 2. Contenu & CTAs | 0/2 | Not started | - |
| 3. Infrastructure Email | 0/3 | Not started | - |
| 4. Nettoyage & Polish | 0/2 | Not started | - |
