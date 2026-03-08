import { useState } from 'react';
import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { businessInfo } from '@/data/business';
import { Phone, Search, Zap, GraduationCap, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

const stepIcons = [Phone, Search, Zap, GraduationCap];

export default function Services() {
  const [activeStep, setActiveStep] = useState(0);
  const currentStep = businessInfo.process[activeStep];
  const CurrentIcon = stepIcons[activeStep];

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

        {/* Process Steps — Vertical Tabs */}
        <section className="py-24 px-6 lg:px-8 bg-background">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl font-bold text-foreground mb-12">
                Le processus, étape par étape
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="flex flex-col md:flex-row gap-0 md:gap-8">
                {/* Left: Tab buttons */}
                <div className="flex flex-row md:flex-col gap-1 md:w-64 flex-shrink-0 overflow-x-auto md:overflow-visible pb-4 md:pb-0">
                  {businessInfo.process.map((step, index) => (
                    <button
                      key={step.id}
                      onClick={() => setActiveStep(index)}
                      className={cn(
                        'flex items-center gap-3 px-4 py-4 rounded-xl text-left transition-all min-w-[160px] md:min-w-0',
                        activeStep === index
                          ? 'bg-primary text-primary-foreground shadow-lg'
                          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                      )}
                    >
                      <div className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold',
                        activeStep === index
                          ? 'bg-primary-foreground/20 text-primary-foreground'
                          : 'bg-background text-foreground'
                      )}>
                        {step.number}
                      </div>
                      <span className="font-medium text-sm leading-tight">{step.title}</span>
                    </button>
                  ))}
                </div>

                {/* Right: Content panel */}
                <div className="flex-1 bg-card border border-border rounded-xl p-8 md:p-10 min-h-[280px]">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                      <CurrentIcon className="size-7 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground font-medium">Étape {currentStep.number}</p>
                      <h3 className="text-2xl font-bold text-card-foreground">{currentStep.title}</h3>
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {currentStep.description}
                  </p>

                  {/* Progress indicator */}
                  <div className="flex gap-2 mt-8">
                    {businessInfo.process.map((_, i) => (
                      <div
                        key={i}
                        className={cn(
                          'h-1.5 rounded-full transition-all',
                          i === activeStep ? 'bg-primary flex-[3]' : 'bg-border flex-1'
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
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
