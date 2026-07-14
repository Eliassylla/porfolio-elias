import { SEOHead } from '@/components/seo/SEOHead';
import HeroSection from '@/sections/HeroSection';
import WhatIBuildSection from '@/sections/WhatIBuildSection';
import MethodSection from '@/sections/MethodSection';
import MarqueeSection from '@/sections/MarqueeSection';
import CTASection from '@/sections/CTASection';
import { businessInfo } from '@/data/business';

export default function Home() {
  return (
    <>
      <SEOHead
        title={businessInfo.seo.home.title}
        description={businessInfo.seo.home.description}
        image={businessInfo.seo.ogImage}
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
