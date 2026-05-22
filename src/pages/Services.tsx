import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

import { Button } from '@/components/ui/button';
import { businessInfo } from '@/data/business';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RollingTextList } from '@/components/ui/rolling-list';

export default function Services() {
  const processItems = [
    { id: 1, title: 'Audit', category: 'Analyse', src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&auto=format&fit=crop&q=60', alt: 'Audit' },
    { id: 2, title: 'Stratégie', category: 'Planification', src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&auto=format&fit=crop&q=60', alt: 'Stratégie' },
    { id: 3, title: 'Mise en place', category: 'Production', src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&auto=format&fit=crop&q=60', alt: 'Mise en place' },
    { id: 4, title: 'Déploiement', category: 'Lancement', src: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?w=400&auto=format&fit=crop&q=60', alt: 'Déploiement' },
  ];

  return (
    <>
      <SEOHead
        title="Services & Méthode — Elias"
        description="Une méthode simple pour fiabiliser vos relances, vos dossiers et votre suivi client."
      />

      <div className="min-h-screen pt-24">
        {/* Header */}
        <section className="py-12 md:py-16 px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Comment je travaille
            </h1>
            <p className="mt-4 text-lg opacity-90 leading-relaxed max-w-2xl">
              Pas de tarif horaire, pas de devis flou. Des solutions concrètes, livrées clé en main.
            </p>
          </div>
        </section>

        {/* Process Steps — Rolling List */}
        <section className="py-16 px-6 lg:px-8 bg-background">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <RollingTextList
                title="Le processus, étape par étape"
                items={processItems}
              />
            </ScrollReveal>
          </div>
        </section>

        {/* What I deliver */}
        <section className="py-16 px-6 lg:px-8 bg-secondary">
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
                { title: 'Systèmes prêts à utiliser', desc: 'Testés, documentés, pensés pour votre quotidien. Pas de prototype décoratif.' },
                { title: 'Outils internes sur mesure', desc: 'Des interfaces simples pour suivre vos dossiers, vos relances et vos priorités.' },
                { title: 'Documentation complète', desc: 'Chaque système est expliqué pour que votre équipe puisse le comprendre et le maintenir.' },
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
        <section className="py-16 px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-3xl font-bold tracking-tight">Prêt à cadrer ce qui vous ralentit ?</h2>
              <p className="mt-4 text-lg opacity-90">Envoyez votre contexte, je vous réponds avec une première lecture.</p>
              <div className="mt-8">
                <Link to="/contact">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-6 font-semibold">
                    Demander un audit
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
