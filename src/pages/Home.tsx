import { motion } from 'framer-motion';
import { businessInfo } from '@/data/business';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SEOHead } from '@/components/seo/SEOHead';
import { ArrowRight, Phone, Search, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ServicesSection } from '@/components/sections/ServicesSection';
import { TargetsSection } from '@/components/sections/TargetsSection';
import { TestimonialsSection } from '@/components/sections/TestimonialsSection';
import { ProcessSection } from '@/components/sections/ProcessSection';

export default function Home() {
  return (
    <>
      <SEOHead
        title="Elias — Automatisation n8n pour PME de services"
        description="Automatisez vos factures, relances clients et onboarding. Spécialiste n8n pour cabinets de conseil, organismes de formation et services professionnels."
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-5xl mx-auto px-6 lg:px-8 py-32 text-center">
            <motion.p
              className="text-sm font-medium tracking-widest uppercase mb-6 opacity-80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Spécialiste automatisation n8n
            </motion.p>

            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {businessInfo.tagline}
            </motion.h1>

            <motion.p
              className="mt-8 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {businessInfo.heroDescription}
            </motion.p>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <a href="#contact">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-6 font-semibold">
                  {businessInfo.heroCta}
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </a>
            </motion.div>
          </div>
        </section>

        <ServicesSection />
        <ProcessSection />
        <TargetsSection />
        <TestimonialsSection />

        {/* CTA / Contact Section */}
        <section id="contact" className="py-24 md:py-32 px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Prêt à automatiser votre quotidien ?
              </h2>
              <p className="mt-6 text-lg opacity-90 leading-relaxed">
                Un appel de 20 minutes, gratuit et sans engagement. On identifie ensemble les tâches qui vous font perdre le plus de temps, et je vous montre ce qu'on peut automatiser.
              </p>
              <div className="mt-10">
                <a
                  href={businessInfo.calendlyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-6 font-semibold">
                    Réserver mon appel découverte
                    <ArrowRight className="ml-2 size-5" />
                  </Button>
                </a>
              </div>
              <p className="mt-6 text-sm opacity-70">
                Ou écrivez-moi directement : {businessInfo.email}
              </p>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  );
}
