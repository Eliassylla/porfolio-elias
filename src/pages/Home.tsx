import { SEOHead } from '@/components/seo/SEOHead';
import HeroSection from '@/sections/HeroSection';
import WhatIBuildSection from '@/sections/WhatIBuildSection';
import FeaturedProjectsSection from '@/sections/FeaturedProjectsSection';
import NewsletterSection from '@/sections/NewsletterSection';
import CTASection from '@/sections/CTASection';

export default function Home() {
  return (
    <>
      <SEOHead
        title="Elias — Automatisations & Solutions IA pour PME de services"
        description="Je construis des automatisations avec Claude Code + n8n pour les petites entreprises de services. Factures, relances, onboarding — tout tourne sans vous."
      />

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
