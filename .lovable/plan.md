
## Plan : Refactorisation de Home.tsx en sections

### Objectif
Déplacer les 5 sections inline de `Home.tsx` dans des fichiers dédiés dans `src/sections/`, réduire `Home.tsx` à ~30 lignes de pure composition.

### Fichiers à créer

**`src/sections/HeroSection.tsx`**
- Extrait : lignes 47–129 de Home.tsx
- Contient : motion animations, portrait, quote card, boutons CTA, état des refs (revealRef1, revealRef2, sectionRef, hasTriggered) → non, ces refs appartiennent à WhatIBuildSection
- Imports : motion, heroPortrait, Button, Link, Calendar

**`src/sections/WhatIBuildSection.tsx`**
- Extrait : lignes 131–193 de Home.tsx
- Contient : useRef, useState, useEffect pour IntersectionObserver, VerticalCutReveal, FocusRail avec ses items hardcodés + mapping businessInfo.projects
- Imports : useRef, useState, useEffect, VerticalCutReveal, FocusRail, businessInfo

**`src/sections/FeaturedProjectsSection.tsx`**
- Extrait : lignes 195–222 de Home.tsx
- Contient : mapping businessInfo.projects → items avec logique d'icônes par tags, ScrollReveal, FeatureSection, lien "Voir tous les projets"
- Imports : ScrollReveal, FeatureSection, businessInfo, Users, FileText, BarChart3, Receipt, Button, Link, ArrowRight

**`src/sections/NewsletterSection.tsx`**
- Extrait : lignes 224–250 de Home.tsx
- Contient : formulaire email, ScrollReveal, texte marketing newsletter
- Imports : ScrollReveal, Mail, Button

**`src/sections/CTASection.tsx`**
- Extrait : lignes 252–272 de Home.tsx
- Contient : section CTA finale, ScrollReveal, Button, Link
- Imports : ScrollReveal, Button, Link, ArrowRight

### Home.tsx final (~28 lignes)
```tsx
import { SEOHead } from '@/components/seo/SEOHead';
import HeroSection from '@/sections/HeroSection';
import WhatIBuildSection from '@/sections/WhatIBuildSection';
import FeaturedProjectsSection from '@/sections/FeaturedProjectsSection';
import NewsletterSection from '@/sections/NewsletterSection';
import CTASection from '@/sections/CTASection';

export default function Home() {
  return (
    <>
      <SEOHead ... />
      <div className="min-h-screen">
        <HeroSection />
        <WhatIBuildSection />
        <FeaturedProjectsSection />
        <NewsletterSection />
        <CTASection />
      </div>
    </>
  );
}
```

### Règles strictes
- Zéro changement de design, d'animation ou de contenu
- Le dossier cible est `src/sections/` (cohérent avec la demande), pas `src/components/sections/`
- Les imports dans chaque section sont autonomes (pas de props passées depuis Home)
- `src/components/sections/` existant (ProcessSection, ServicesSection, etc.) n'est pas touché

### Fichiers impactés
| Action | Fichier |
|--------|---------|
| Créer | `src/sections/HeroSection.tsx` |
| Créer | `src/sections/WhatIBuildSection.tsx` |
| Créer | `src/sections/FeaturedProjectsSection.tsx` |
| Créer | `src/sections/NewsletterSection.tsx` |
| Créer | `src/sections/CTASection.tsx` |
| Modifier | `src/pages/Home.tsx` (réduit à ~28 lignes) |
