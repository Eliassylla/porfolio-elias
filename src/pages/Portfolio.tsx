import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { businessInfo } from '@/data/business';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const allTags = ['Tous', ...Array.from(new Set(businessInfo.projects.flatMap((p) => p.tags)))];

export default function Portfolio() {
  const [activeTag, setActiveTag] = useState('Tous');

  const filtered = activeTag === 'Tous'
    ? businessInfo.projects
    : businessInfo.projects.filter((p) => p.tags.includes(activeTag));

  return (
    <>
      <SEOHead
        title="Portfolio — Elias Automatisation"
        description="Découvrez mes projets d'automatisation n8n et Claude Code pour PME de services."
      />

      <div className="min-h-screen pt-24">
        <section className="py-16 md:py-24 px-6 lg:px-8 bg-primary text-primary-foreground">
          <div className="max-w-5xl mx-auto">
            <Badge variant="secondary" className="mb-6 text-sm px-4 py-1">Portfolio</Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Cas concrets
            </h1>
            <p className="mt-6 text-lg opacity-90 leading-relaxed max-w-2xl">
              Des automatisations réelles, avec le contexte, le problème et le résultat.
            </p>
          </div>
        </section>

        <section className="py-16 px-6 lg:px-8 bg-background">
          <div className="max-w-5xl mx-auto">
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-12">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeTag === tag
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {filtered.map((project, index) => (
                <ScrollReveal key={project.id} delay={index * 0.1}>
                  <Link to={`/portfolio/${project.id}`}>
                    <div className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all hover:border-primary/20 h-full">
                      <div className="w-full h-48 bg-muted flex items-center justify-center">
                        <span className="text-muted-foreground text-sm">Capture à venir</span>
                      </div>

                      <div className="p-6">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h3 className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors mb-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-3">{project.context}</p>
                        <p className="text-sm font-medium text-foreground">{project.result}</p>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
