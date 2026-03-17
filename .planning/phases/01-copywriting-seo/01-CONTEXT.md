# Phase 1: Copywriting & SEO - Context

**Gathered:** 2026-03-17
**Status:** Ready for planning

<domain>
## Phase Boundary

Réécrire le copy de toutes les sections du portfolio pour convertir les décideurs PME francophones, et ajouter les meta/OG/structured data pour le référencement et le partage LinkedIn. Cette phase travaille uniquement sur le texte et les balises — elle ne touche pas aux données réelles (Cal.com, screenshots) ni à la structure backend. La phase ne change pas la structure UI existante.

</domain>

<decisions>
## Implementation Decisions

### Positionnement (CRITIQUE)
- Elias est freelance qui accepte ses **premiers clients** — aucun mensonge, aucune fausse prétention
- Le copy doit être honnête sur le fait de débuter, sans pour autant s'excuser ou minimiser les compétences réelles
- Angle retenu : "Expert des outils (n8n, Claude Code), nouveau en consulting" — la technique est réelle, l'expérience client est à construire
- Pas de formulations impliquant des missions passées ou des clients satisfaits qui n'existent pas

### Témoignages — Suppression totale
- La section `testimonials` dans `business.ts` (Marie D., Thomas R., Sophie L.) est **entièrement supprimée**
- Aucun placeholder. Zéro témoignage vaut mieux que des témoignages inventés
- La crédibilité passe par : projets réels démontrables, méthodologie claire, transparence

### Stats — Suppression totale
- Les stats actuelles ("120+ Heures économisées", "15+ Workflows déployés", "100% Clients satisfaits") sont **entièrement supprimées**
- Remplacer par des indicateurs vrais si besoin visuel : outils maîtrisés, types de missions, temps de réponse
- Si pas d'alternative convaincante : supprimer la section stats du HeroSection sans remplacer

### Image de marque
- Ton : partenaire de confiance et accessible — parle le langage du dirigeant PME, pas du développeur
- Pas de jargon technique dans le copy visible (n8n, API, webhook → "automatisation", "connexion entre outils", "système")
- Chaleureux et direct. Phrases courtes. Focus sur les problèmes métier, pas sur la technologie

### Services présentés
- 3 services (structure WhatIBuildSection déjà en place) : Automatisations · Outils internes · Landing Pages
- L'approche est **horizontale** — pas de niche sectorielle pour l'instant
- Cible : PME de services (conseil, formation, cabinets) — mais le copy ne ferme pas d'autres portes

### Offre
- Conversion via appel découverte gratuit — pas de tarif affiché sur le site
- CTA principal : "Réserver un appel découverte" (ou formulation courte similaire)
- Le formulaire de contact est le point d'entrée secondaire (pour ceux qui ne veulent pas appeler)

### Formulation des projets dans le copy
- Le copy des sections (FeaturedProjects, Hero, About) fait référence à des projets réels sans prétendre avoir eu des clients payants
- Formulations à utiliser : "projets construits", "automatisations développées", "exemples concrets"
- Les vrais projets disponibles (pour Phase 2) : 5 workflows n8n + 1 système d'outils internes Claude Code

### Claude's Discretion
- Titre exact de la headline Hero (dans les limites du brief : <10 mots, proposition de valeur claire pour PME)
- Choix exact des formulations pour les descriptions de services (garder dans le ton validé)
- Structure des meta descriptions (format technique SEO)
- Choix du type de structured data schema.org (LocalBusiness vs Person vs ProfessionalService)

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Source de vérité contenu
- `src/data/business.ts` — Source de vérité pour tout le contenu du site. Toute modification du copy passe par ce fichier.

### Sections à modifier
- `src/sections/HeroSection.tsx` — Hero section avec tagline, heroDescription, heroCta, stats. Stats à supprimer.
- `src/sections/WhatIBuildSection.tsx` — 3 services (automatisations, outils internes, landing pages) via FocusRail. Structure à garder, copy à affiner.
- `src/sections/CTASection.tsx` — Section call-to-action principale
- `src/sections/FeaturedProjectsSection.tsx` — Section projets en vedette

### Pages à modifier
- `src/pages/Contact.tsx` — Formulaire de contact : labels et champs en français, questions qualifiantes
- `src/pages/About.tsx` — Page À propos : mentionner encore "Sarah Mitchell" ou photographie — à nettoyer
- `src/pages/Home.tsx` et toutes les autres pages — Meta tags

### SEO / Balises
- `src/components/seo/SEOHead.tsx` — Composant existant pour les meta tags (déjà utilisé dans ProjectDetail)

### Planning
- `.planning/REQUIREMENTS.md` — COPY-01, COPY-02, COPY-03, SEO-01, SEO-02, SEO-03 avec critères de succès
- `.planning/ROADMAP.md` — Phase 1 success criteria détaillés

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- `SEOHead` component (`src/components/seo/SEOHead.tsx`) — déjà utilisé dans ProjectDetail, à appliquer sur toutes les pages
- `business.ts` — structure propre et centralisée, toutes les modifications de copy passent ici
- `WhatIBuildSection` — FocusRail avec 3 services déjà bien structurés, copy à affiner uniquement

### Established Patterns
- Tout le contenu textuel vient de `business.ts` — le planner ne doit pas hardcoder du texte dans les composants
- Les sections lisent depuis `businessInfo` — modifier `business.ts` suffit pour propager les changements

### Integration Points
- Supprimer `testimonials` de `business.ts` + supprimer la section qui les affiche (identifier la section testimonials dans le code)
- Supprimer `stats` de `business.ts` + supprimer l'affichage dans HeroSection
- Ajouter `metaTitle`, `metaDescription`, `ogImage` par page dans `business.ts` ou directement dans les pages via `SEOHead`

</code_context>

<specifics>
## Specific Ideas

- Le projet "Veille Content" (outil interne Claude Code — architecture WAT, pipelines YouTube/Instagram → Notion) est un exemple concret de compétence technique réelle. Le copy peut y faire allusion sans le nommer précisément.
- Les 5 workflows n8n réels (Call-lead, Content-Reverse-Engineering, Relances-Factures-Clients, Screening-Candidatures, Veille-Suggestions-Sujets) seront documentés en Phase 2. Le copy de Phase 1 doit laisser de la place pour ces projets.
- Ton de référence : parler comme quelqu'un qui comprend les problèmes du dirigeant avant de parler d'outils.

</specifics>

<deferred>
## Deferred Ideas

- Cal.com URL et intégration des 4 CTAs — Phase 2 (Contenu & CTAs), quand Elias créera son compte Cal.com
- Screenshots de workflows n8n dans la Glass Box — Phase 2, quand disponibles
- Documentation des vrais projets dans business.ts — Phase 2
- URLs sociales réelles (LinkedIn, YouTube) — Phase 2, quand les comptes sont prêts
- Stats basées sur de vrais résultats clients — après les premiers clients

</deferred>

---

*Phase: 01-copywriting-seo*
*Context gathered: 2026-03-17*
