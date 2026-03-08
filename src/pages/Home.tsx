import { motion } from 'framer-motion';
import { businessInfo } from '@/data/business';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SEOHead } from '@/components/seo/SEOHead';
import { Receipt, Users, ClipboardList, ArrowRight, CheckCircle, MessageSquareQuote } from 'lucide-react';
import { Button } from '@/components/ui/button';

const iconMap = {
  receipt: Receipt,
  users: Users,
  clipboard: ClipboardList,
};

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

        {/* Services Section */}
        <section id="services" className="py-24 md:py-32 px-6 lg:px-8 bg-background">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  Ce que j'automatise pour vous
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Des automatisations concrètes qui libèrent votre temps et éliminent les oublis.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {businessInfo.services.map((service, index) => {
                const Icon = iconMap[service.icon];
                return (
                  <ScrollReveal key={service.id} delay={index * 0.15}>
                    <div className="bg-card border border-border rounded-xl p-8 h-full hover:shadow-lg transition-shadow">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-6">
                        <Icon className="size-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-card-foreground mb-3">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.description}
                      </p>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Target Clients Section */}
        <section id="clients" className="py-24 md:py-32 px-6 lg:px-8 bg-secondary">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-secondary-foreground">
                  Vous vous reconnaissez ?
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                  Je travaille avec des PME de services qui veulent arrêter de perdre du temps sur l'administratif.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {businessInfo.targets.map((target, index) => (
                <ScrollReveal key={target.id} delay={index * 0.15}>
                  <div className="bg-card border border-border rounded-xl p-8 h-full">
                    <h3 className="text-xl font-semibold text-card-foreground mb-3">
                      {target.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {target.description}
                    </p>
                    <div className="flex items-start gap-2 bg-destructive/5 rounded-lg p-3">
                      <CheckCircle className="size-5 text-destructive mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-destructive font-medium">{target.pain}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="temoignages" className="py-24 md:py-32 px-6 lg:px-8 bg-background">
          <div className="max-w-6xl mx-auto">
            <ScrollReveal>
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                  Ce qu'en disent mes clients
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">(Témoignages à venir — placeholders)</p>
              </div>
            </ScrollReveal>

            <div className="grid md:grid-cols-3 gap-8">
              {businessInfo.testimonials.map((testimonial, index) => (
                <ScrollReveal key={testimonial.id} delay={index * 0.15}>
                  <div className="bg-card border border-border rounded-xl p-8 h-full flex flex-col">
                    <MessageSquareQuote className="size-8 text-primary/30 mb-4" />
                    <blockquote className="text-card-foreground leading-relaxed flex-1">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="mt-6 pt-4 border-t border-border">
                      <p className="font-semibold text-card-foreground">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

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
