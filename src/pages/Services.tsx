import { useState } from 'react';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { businessInfo } from '@/data/business';
import { Phone, Search, Zap, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  return (
    <>
      <SEOHead
        title="Services & Méthode — Elias Automatisation"
        description="Mon processus en 4 étapes pour automatiser vos tâches répétitives avec n8n et Claude Code."
      />

      <div className="min-h-screen pt-24">
        {/* Header */}
        <section className="py-16 md:py-24 px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto">
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-1">Services & Méthode</Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Comment je travaille
            </h1>
            <p className="mt-6 text-lg opacity-90 leading-relaxed max-w-2xl">
              Pas de tarif horaire, pas de devis flou. Des solutions concrètes, livrées clé en main.
            </p>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-24 px-6 lg:px-8 bg-background">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-foreground mb-12">
                Le processus, étape par étape
              </h2>
            </ScrollReveal>

            <div className="space-y-0">
              {businessInfo.process.map((step, index) => (
                <ScrollReveal key={step.id} delay={index * 0.15}>
                  <div className="relative flex gap-6 pb-12 last:pb-0">
                    {/* Vertical line */}
                    {index < businessInfo.process.length - 1 && (
                      <div className="absolute left-7 top-14 bottom-0 w-px bg-border" />
                    )}
                    
                    {/* Step number */}
                    <div className="relative z-10 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold flex-shrink-0">
                      {step.number}
                    </div>

                    <div className="pt-2">
                      <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* What I deliver */}
        <section className="py-24 px-6 lg:px-8 bg-secondary">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-secondary-foreground mb-4">
                Ce que je livre
              </h2>
              <p className="text-muted-foreground text-lg mb-12">
                Des solutions, pas des heures.
              </p>
            </ScrollReveal>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                { title: 'Workflows n8n opérationnels', desc: 'Testés, documentés, prêts à tourner. Pas de prototype, du production-ready.' },
                { title: 'Scripts Claude Code sur mesure', desc: 'Génération de contenu, analyse de données, automatisation intelligente.' },
                { title: 'Documentation complète', desc: 'Chaque automatisation est documentée pour que votre équipe puisse la comprendre et la maintenir.' },
                { title: 'Formation & support', desc: 'Je vous forme sur vos outils et reste disponible pour les ajustements.' },
              ].map((item, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="bg-card border border-border rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-card-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-3xl font-bold tracking-tight">Prêt à automatiser ?</h2>
              <p className="mt-4 text-lg opacity-90">On commence par un appel de 20 minutes.</p>
              <div className="mt-8">
                <Link to="/contact">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-6 font-semibold">
                    Réserver mon appel
                    <ArrowRight className="ml-2 size-5" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  );
}
