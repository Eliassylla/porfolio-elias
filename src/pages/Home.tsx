import { SEOHead } from '@/components/seo/SEOHead';
import HeroSection from '@/sections/HeroSection';
import WhatIBuildSection from '@/sections/WhatIBuildSection';
import MethodSection from '@/sections/MethodSection';
import MarqueeSection from '@/sections/MarqueeSection';
import CTASection from '@/sections/CTASection';

export default function Home() {
  return (
    <>
      <SEOHead
        title="Elias — Systèmes opérationnels pour solopreneurs et petites équipes"
        description="Je construis des systèmes simples pour fiabiliser les relances, le suivi client et l'administratif des solopreneurs, indépendants et petites équipes."
      />

      <div className="min-h-screen">
        <HeroSection />
        <WhatIBuildSection />
        <MethodSection />
        <MarqueeSection />
        <CTASection />
      </div>
    </>
  );
}
