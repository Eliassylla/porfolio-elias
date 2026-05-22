import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { businessInfo } from '@/data/business';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = businessInfo.projects.find((p) => p.id === id);

  if (!project) return <Navigate to="/portfolio" replace />;

  return (
    <>
      <SEOHead
        title={`${project.title} — Elias Automatisation`}
        description={`${project.context}. ${project.result}`}
      />

      <div className="min-h-screen pt-24">
        {/* Header */}
        <section className="py-16 md:py-24 px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto">
            <Link to="/portfolio" className="inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100 mb-6 transition-opacity">
              <ArrowLeft className="size-4" />
              Retour au portfolio
            </Link>

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs px-3 py-1">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
              {project.title}
            </h1>
            <p className="mt-4 text-lg opacity-80">{project.context}</p>
          </div>
        </section>

        {/* Business context */}
        <section className="py-16 px-6 lg:px-8 bg-background">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <ScrollReveal>
                <div className="bg-secondary rounded-xl p-6">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">Problème</p>
                  <p className="text-foreground leading-relaxed">{project.problem}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="bg-secondary rounded-xl p-6">
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide mb-2">Solution</p>
                  <p className="text-foreground leading-relaxed">{project.solution}</p>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="bg-primary text-primary-foreground rounded-xl p-6">
                  <p className="text-sm font-medium uppercase tracking-wide mb-2 opacity-80">Résultat</p>
                  <p className="text-lg font-semibold leading-relaxed">{project.result}</p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* Technical detail — Glass Box */}
        <section className="py-16 px-6 lg:px-8 bg-secondary">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <Badge variant="secondary" className="mb-4 bg-background text-sm px-4 py-1">La Glass Box</Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-secondary-foreground mb-8">
                Comment ça marche sous le capot
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="bg-card border border-border rounded-xl p-12 mb-8 flex flex-col items-center justify-center min-h-[300px]">
                <div className="w-full max-w-lg h-48 bg-muted rounded-lg flex items-center justify-center mb-4">
                  <span className="text-muted-foreground text-sm">Schéma du système à venir</span>
                </div>
                <p className="text-muted-foreground text-sm text-center max-w-md">
                  Ici, je montrerai le parcours métier, les points de contrôle et les éléments que l'équipe utilise au quotidien.
                </p>
              </div>
            </ScrollReveal>

            {project.demoUrl && (
              <ScrollReveal delay={0.2}>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    <ExternalLink className="size-4" />
                    Voir la démo
                  </Button>
                </a>
              </ScrollReveal>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-3xl font-bold tracking-tight">
                Vous avez ce problème ? On en discute.
              </h2>
              <p className="mt-4 text-lg opacity-90">
                Décrivez votre contexte pour voir comment adapter cette approche à votre activité.
              </p>
              <div className="mt-8">
                <Link to="/contact">
                  <Button size="lg" variant="secondary" className="text-lg px-8 py-6 font-semibold">
                    Décrire mon besoin
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
