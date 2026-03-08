import { motion } from 'framer-motion';
import { businessInfo } from '@/data/business';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SEOHead } from '@/components/seo/SEOHead';
import { ArrowRight, Mail, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import heroPortrait from '@/assets/hero-portrait.jpg';

export default function Home() {
  return (
    <>
      <SEOHead
        title="Elias — Automatisations & Solutions IA pour PME de services"
        description="Je construis des automatisations avec Claude Code + n8n pour les petites entreprises de services. Factures, relances, onboarding — tout tourne sans vous."
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center bg-primary text-primary-foreground overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent rounded-full blur-3xl" />
          </div>

          <div className="relative max-w-5xl mx-auto px-6 lg:px-8 py-32">
            <div className="max-w-3xl">
              <motion.div
                className="flex gap-2 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Badge variant="secondary" className="text-xs px-3 py-1">n8n</Badge>
                <Badge variant="secondary" className="text-xs px-3 py-1">Claude Code</Badge>
                <Badge variant="secondary" className="text-xs px-3 py-1">Automatisation</Badge>
              </motion.div>

              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                {businessInfo.tagline}
              </motion.h1>

              <motion.p
                className="mt-8 text-lg md:text-xl leading-relaxed opacity-90"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                Voici des exemples concrets.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Link to="/contact">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-6 font-semibold">
                    {businessInfo.heroCta}
                    <ArrowRight className="ml-2 size-5" />
                  </Button>
                </Link>
                <Link to="/portfolio">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-6 font-semibold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                    Voir mes projets
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Social Proof / Stats */}
        <section className="py-16 px-6 lg:px-8 bg-background border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-3 gap-8">
              {businessInfo.stats.map((stat, index) => (
                <ScrollReveal key={index} delay={index * 0.1}>
                  <div className="text-center">
                    <p className="text-3xl md:text-4xl font-bold text-foreground">{stat.value}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Projects Teasers */}
        <section className="py-24 md:py-32 px-6 lg:px-8 bg-background">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">
                    Cas concrets
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                    Projets récents
                  </h2>
                </div>
                <Link to="/portfolio" className="hidden md:block">
                  <Button variant="ghost" className="text-muted-foreground">
                    Voir tout
                    <ArrowRight className="ml-1 size-4" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>

            <div className="space-y-6">
              {businessInfo.projects.slice(0, 3).map((project, index) => (
                <ScrollReveal key={project.id} delay={index * 0.15}>
                  <Link to={`/portfolio/${project.id}`}>
                    <div className="group bg-card border border-border rounded-xl p-6 md:p-8 hover:shadow-lg transition-all hover:border-primary/20">
                      <div className="flex flex-col md:flex-row md:items-start gap-6">
                        {/* Project placeholder image */}
                        <div className="w-full md:w-48 h-32 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                          <span className="text-muted-foreground text-sm">Capture à venir</span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap gap-2 mb-3">
                            {project.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="text-xl font-semibold text-card-foreground group-hover:text-primary transition-colors mb-2">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-3">{project.context}</p>
                          <p className="text-sm text-foreground/80">
                            <span className="font-medium">Résultat :</span> {project.result}
                          </p>
                        </div>

                        <ArrowRight className="size-5 text-muted-foreground group-hover:text-primary transition-colors hidden md:block mt-2 flex-shrink-0" />
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <div className="mt-8 text-center md:hidden">
              <Link to="/portfolio">
                <Button variant="outline">
                  Voir tous les projets
                  <ArrowRight className="ml-1 size-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Lead Magnet / Newsletter */}
        <section className="py-24 md:py-32 px-6 lg:px-8 bg-secondary">
          <div className="max-w-2xl mx-auto text-center">
            <ScrollReveal>
              <Mail className="size-10 text-primary mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-secondary-foreground">
                Une automatisation décortiquée par mois
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Chaque mois, je décortique un workflow réel : le problème, la solution technique, et comment l'adapter à votre business.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="votre@email.com"
                  className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
                <Button size="lg" className="px-6 font-semibold">
                  S'inscrire
                </Button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                Pas de spam. Désinscription en un clic.
              </p>
            </ScrollReveal>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 md:py-32 px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Si vous voulez la même chose adapté à votre business, on peut en parler.
              </h2>
              <p className="mt-6 text-lg opacity-90 leading-relaxed">
                Un appel de 20 minutes, gratuit et sans engagement.
              </p>
              <div className="mt-10">
                <Link to="/contact">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-6 font-semibold">
                    Réserver mon appel découverte
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
