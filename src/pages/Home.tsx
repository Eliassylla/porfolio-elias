import { SEOHead } from '@/components/seo/SEOHead';
import HeroSection from '@/sections/HeroSection';
import WhatIBuildSection from '@/sections/WhatIBuildSection';
import FeaturedProjectsSection from '@/sections/FeaturedProjectsSection';
import MethodSection from '@/sections/MethodSection';
import MarqueeSection from '@/sections/MarqueeSection';
import NewsletterSection from '@/sections/NewsletterSection';
import CTASection from '@/sections/CTASection';
import { ScrollProgress } from '@/components/ui/scroll-progress';

export default function Home() {
  return (
    <>
      <SEOHead
        title="Elias — Systèmes opérationnels pour PME de services"
        description="Je construis des systèmes simples pour fiabiliser les relances, le suivi client et l'administratif des PME de services."
      />

      <div className="min-h-screen">
        <ScrollProgress />
        <HeroSection />
        <WhatIBuildSection />
        <FeaturedProjectsSection />
        <MethodSection />
        <MarqueeSection />
        <NewsletterSection />
        <CTASection />
      </div>
    </>
  );
}
