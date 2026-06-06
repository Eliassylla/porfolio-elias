# Requirements: Portfolio Antigravity — Elias

**Defined:** 2026-03-10
**Core Value:** Un visiteur qualifié doit pouvoir comprendre ce qu'Elias fait, voir des preuves concrètes de compétence, et réserver un appel découverte — en moins de 2 minutes.

## v1.0 Requirements

### Contenu & CTAs

- [ ] **CONT-01** : URL Cal.com remplace `#calendly` dans `business.ts` — débloque 4 CTAs simultanément (Hero, CTASection, ProjectDetail, Contact)
- [ ] **CONT-02** : `business.ts` complet avec vrais services, vraie bio, vrais projets (titre, description, problème→solution→résultat, URL)
- [ ] **CONT-03** : Screenshots workflows annotés intégrés dans les case studies (Glass Box dans ProjectDetail)

### Copywriting & SEO

- [ ] **COPY-01** : Hero section — headline, tagline et CTA copy réécrits pour conversion B2B PME francophone
- [ ] **COPY-02** : WhatIBuild, CTASection, FeaturedProjects — copy revu avec skills copywriting + marketing-psychology
- [ ] **COPY-03** : Formulaire contact — champs et labels en français, copy qualifiant (secteur, problème principal)
- [ ] **SEO-01** : Meta tags (title, description) de toutes les pages — remplacer contenu photographe par contenu automation
- [ ] **SEO-02** : OG tags pour partage social optimisés LinkedIn (cible décideurs PME)
- [ ] **SEO-03** : Structured data schema.org (LocalBusiness ou Person) pour consultant automation

### Backend Email

- [ ] **EMAIL-01** : Formulaire contact → Supabase Edge Function `send-contact-email` → Resend (notification Elias + confirmation prospect)
- [ ] **EMAIL-02** : Archivage soumissions dans table Supabase `contact_submissions`
- [ ] **EMAIL-03** : Newsletter signup → Supabase table `subscribers` + Resend Contacts API (audienceId) + email de bienvenue via Edge Function `add-subscriber`

### Nettoyage Technique

- [ ] **CLEAN-01** : Suppression fichiers code mort (About.tsx, photographer.ts, projects.ts legacy, Index.tsx)
- [ ] **CLEAN-02** : Types TypeScript remplacés — `ProjectCategory`, `ContactSubmission`, `PhotographerInfo` → types métier automation/consultant
- [ ] **CLEAN-03** : Dark/light mode vérifié et corrigé sur toutes les sections modifiées

## v2 Requirements

*(Déférés après validation des premiers prospects)*

- **CONT-V2-01** : Métriques quantifiées en badge sur chaque projet ("45 min/client économisées")
- **CONT-V2-02** : Cal.com embed inline popup (vs redirect) via `@calcom/embed-react`
- **EMAIL-V2-01** : Email de confirmation personnalisé avec résumé du problème soumis
- **SEO-V2-01** : Analytics de conversion (tracking clics CTA, soumissions formulaire)

## Out of Scope

| Feature | Raison |
|---------|--------|
| Blog / CMS externe | Géré dans un autre projet — newsletter fait office de content marketing |
| Authentification utilisateur | Pas nécessaire pour un portfolio |
| Chat live temps réel | Crée attente d'immédiateté impossible à tenir pour consultant solo |
| Dashboard analytics custom | Google Analytics suffit pour ce stade |
| Paiement en ligne | Hors scope v1 |
| Mobile app | Web-first |
| Formulaire > 5 champs | Réduit le taux de completion de 50%+ en B2B SME |
| Pop-up newsletter exit intent | Nuit à la crédibilité B2B |

## Traceability

*Re-scope 2026-06-05 : colonne Milestone (V1 = livrer la landing qui prend des RDV ; V2 = projets, contact, nurturing).*

| Requirement | Phase | Milestone | Status |
|-------------|-------|-----------|--------|
| COPY-01 (Hero) | Phase 1 | **V1** | Pending |
| COPY-02 (sections landing) | Phase 1 | **V1** | Pending |
| COPY-03 (copy formulaire contact) | Phase 1 | V2 | Pending |
| SEO-01 | Phase 1 | **V1** | Pending |
| SEO-02 | Phase 1 | **V1** | Pending |
| SEO-03 | Phase 1 | **V1** | Pending |
| CONT-01 (Cal.com sur CTAs) | Phase 2 | **V1** | Pending — priorité, lien `cal.com/elias-sylla` |
| CONT-02 (business.ts : services/bio) | Phase 2 | **V1** | Pending (partie projets → V2) |
| CONT-03 (screenshots case studies) | Phase 2 | V2 | Pending |
| EMAIL-01 (Edge Function contact) | Phase 3 | V2 | Pending |
| EMAIL-02 (table contact_submissions) | Phase 3 | V2 | Pending |
| EMAIL-03 (newsletter/nurturing) | Phase 3 | V2 | Pending |
| CLEAN-01 (code mort legacy) | Phase 4 | V2 | Pending (cadran déjà nettoyé) |
| CLEAN-02 (types automation) | Phase 4 | V2 | Pending |
| CLEAN-03 (dark/light mode) | Phase 4 | **V1** | ✓ Fait (corrigé) |

**Coverage:**
- v1.0 requirements: 15 total — mappés à 100%
- **V1 (livrer maintenant)** : COPY-01, COPY-02, SEO-01/02/03, CONT-01, CONT-02 (services/bio), CLEAN-03 ✓ → ~8 items
- **V2 (itérer)** : COPY-03, CONT-02 (projets), CONT-03, EMAIL-01/02/03, CLEAN-01, CLEAN-02

---
*Requirements defined: 2026-03-10*
*Last updated: 2026-06-05 — re-scope V1/V2 (colonne Milestone ajoutée)*
