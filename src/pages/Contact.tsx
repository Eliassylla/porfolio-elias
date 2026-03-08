import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Button } from '@/components/ui/button';

import { businessInfo } from '@/data/business';
import { ArrowRight, Mail, MapPin } from 'lucide-react';

export default function Contact() {
  return (
    <>
      <SEOHead
        title="Contact — Elias Automatisation"
        description="Réservez un appel découverte de 20 minutes ou envoyez-moi un message."
      />

      <div className="min-h-screen pt-24">
        <section className="py-12 md:py-16 px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              On en discute ?
            </h1>
            <p className="mt-4 text-lg opacity-90 leading-relaxed max-w-2xl">
              Un appel de 20 minutes, gratuit et sans engagement. On identifie ensemble vos tâches à automatiser.
            </p>
          </div>
        </section>

        <section className="py-16 px-6 lg:px-8 bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Option 1: Calendly */}
              <ScrollReveal>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Réserver un créneau
                  </h2>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    Choisissez un créneau qui vous convient. 20 minutes pour faire le point sur vos besoins.
                  </p>
                  <a href={businessInfo.calendlyUrl} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="text-lg px-8 py-6 font-semibold w-full">
                      Ouvrir Calendly
                      <ArrowRight className="ml-2 size-5" />
                    </Button>
                  </a>
                </div>
              </ScrollReveal>

              {/* Option 2: Direct contact */}
              <ScrollReveal delay={0.15}>
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-4">
                    Me contacter directement
                  </h2>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    Vous préférez un email ? Écrivez-moi, je réponds sous 24h.
                  </p>

                  <div className="space-y-4">
                    <a
                      href={`mailto:${businessInfo.email}`}
                      className="flex items-center gap-3 p-4 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
                    >
                      <Mail className="size-5 text-primary" />
                      <span className="text-foreground font-medium">{businessInfo.email}</span>
                    </a>
                    <div className="flex items-center gap-3 p-4 bg-secondary rounded-xl">
                      <MapPin className="size-5 text-primary" />
                      <span className="text-foreground font-medium">{businessInfo.location}</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
