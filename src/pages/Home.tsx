import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { businessInfo } from '@/data/business';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { SEOHead } from '@/components/seo/SEOHead';
import { ArrowRight, Mail, Calendar, Receipt, Users, FileText, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { FocusRail, type FocusRailItem } from '@/components/ui/focus-rail';
import { VerticalCutReveal, type VerticalCutRevealRef } from '@/components/ui/vertical-cut-reveal';
import FeatureSection from '@/components/ui/feature-section';
import heroPortrait from '@/assets/hero-portrait.jpg';

export default function Home() {
  const revealRef1 = useRef<VerticalCutRevealRef>(null);
  const revealRef2 = useRef<VerticalCutRevealRef>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          revealRef1.current?.startAnimation();
          revealRef2.current?.startAnimation();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasTriggered]);

  return (
    <>
      <SEOHead
        title="Elias — Automatisations & Solutions IA pour PME de services"
        description="Je construis des automatisations avec Claude Code + n8n pour les petites entreprises de services. Factures, relances, onboarding — tout tourne sans vous."
      />

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center bg-background overflow-hidden">
          <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-32 w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left — Text */}
              <div>
                <motion.div
                  className="flex items-center gap-2 mb-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Disponible pour nouveaux projets
                  </span>
                </motion.div>

                <motion.h1
                   className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] text-foreground"
                   initial={{ opacity: 0, y: 30 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8, delay: 0.1 }}
                 >
                   Automatisation pour entreprises de services
                 </motion.h1>

                <motion.p
                   className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8, delay: 0.3 }}
                 >
                   Je conçois des systèmes concrets pour supprimer vos tâches répétitives et libérer du temps chaque semaine.
                 </motion.p>

                <motion.div
                  className="mt-10 flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  <Link to="/contact">
                    <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-base px-7 py-6 font-semibold rounded-lg gap-2">
                      <Calendar className="size-4" />
                      Réserver un audit (30min)
                    </Button>
                  </Link>
                  <Link to="/portfolio">
                    <Button size="lg" variant="outline" className="text-base px-7 py-6 font-semibold rounded-lg border-border text-foreground hover:bg-secondary">
                      Voir mes réalisations
                    </Button>
                  </Link>
                </motion.div>
              </div>

              {/* Right — Portrait + Quote */}
              <motion.div
                className="relative flex justify-center lg:justify-end"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {/* Main portrait */}
                <div className="relative">
                  <div className="w-72 md:w-80 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-background ring-1 ring-border rotate-2">
                    <img
                      src={heroPortrait}
                      alt="Elias — Expert automatisation"
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>

                  {/* Quote card */}
                  <div className="absolute -bottom-6 -left-8 md:-left-16 bg-card border border-border rounded-xl p-4 shadow-lg max-w-[200px] -rotate-2">
                    <p className="text-xs text-muted-foreground italic leading-relaxed">
                      "L'automatisation n'est pas un luxe, c'est l'infrastructure de votre liberté."
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* What I Build — FocusRail */}
        <section className="py-24 md:py-32 px-6 lg:px-8 bg-background border-b border-border">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12" ref={sectionRef}>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
                <VerticalCutReveal
                  ref={revealRef1}
                  autoStart={false}
                  splitBy="words"
                  staggerDuration={0.1}
                  transition={{ type: "spring", stiffness: 180, damping: 22 }}
                >
                  Ce que je construis
                </VerticalCutReveal>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl">
                <VerticalCutReveal
                  ref={revealRef2}
                  autoStart={false}
                  splitBy="words"
                  staggerDuration={0.08}
                  transition={{ type: "spring", stiffness: 200, damping: 25, delay: 0.15 }}
                >
                  Je construis des systèmes simples à utiliser, pensés pour les entreprises de services.
                </VerticalCutReveal>
              </p>
            </div>

            <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
              <FocusRail
                className="h-[500px]"
                items={[
                  {
                    id: 'auto-ia',
                    title: 'Automatisations IA',
                    description: "J'identifie vos tâches répétitives et je crée des workflows automatisés pour vous faire gagner du temps chaque semaine.",
                    meta: 'Workflows • n8n • Claude',
                    imageSrc: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop',
                    href: '/contact',
                  },
                  {
                    id: 'micro-saas',
                    title: 'Micro-outils & micro-SaaS',
                    description: 'Je conçois de petits outils sur mesure (tableaux de bord, mini-apps) pour fiabiliser vos processus et centraliser l\'information.',
                    meta: 'Outils • Dashboards',
                    imageSrc: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop',
                    href: '/contact',
                  },
                  ...businessInfo.projects.slice(0, 3).map((project) => ({
                    id: project.id,
                    title: project.title,
                    description: `${project.context}. ${project.result}`,
                    meta: project.tags.join(' • '),
                    imageSrc: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop',
                    href: `/portfolio/${project.id}`,
                  })),
                ]}
                autoPlay
                loop
              />
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
