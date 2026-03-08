import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { businessInfo } from '@/data/business';
import { ArrowUpRight } from 'lucide-react';
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
        {/* Hero */}
        <section className="py-20 md:py-28 px-6 lg:px-8 bg-primary text-primary-foreground text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Mes <span className="text-accent">Projets</span>
            </h1>
            <p className="mt-6 text-lg opacity-80 leading-relaxed max-w-2xl mx-auto">
              Des automatisations concrètes qui font gagner du temps et de l'argent aux PME de services.
            </p>
          </div>
        </section>

        {/* Filters + Grid */}
        <section className="py-16 px-6 lg:px-8 bg-background">
          <div className="max-w-6xl mx-auto">
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-14">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all border ${
                    activeTag === tag
                      ? 'bg-primary text-primary-foreground border-primary shadow-md'
                      : 'bg-transparent text-muted-foreground border-border hover:border-primary/40 hover:text-foreground'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* Projects Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((project, index) => (
                <ScrollReveal key={project.id} delay={index * 0.08}>
                  <Link to={`/portfolio/${project.id}`} className="group block h-full">
                    <div className="bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 h-full flex flex-col">
                      {/* Image / Placeholder */}
                      <div className="relative w-full aspect-[16/10] bg-muted overflow-hidden">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                            <div className="text-center space-y-2">
                              <div className="size-12 mx-auto rounded-xl bg-primary/10 flex items-center justify-center">
                                <svg className="size-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                                </svg>
                              </div>
                              <span className="text-xs text-muted-foreground">Capture à venir</span>
                            </div>
                          </div>
                        )}

                        {/* Category badge overlay */}
                        <div className="absolute bottom-3 left-3">
                          <Badge className="bg-primary/90 text-primary-foreground backdrop-blur-sm text-xs px-3 py-1 border-0">
                            {project.tags[0]}
                          </Badge>
                        </div>

                        {/* Hover arrow */}
                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="size-8 rounded-full bg-primary/80 backdrop-blur-sm flex items-center justify-center">
                            <ArrowUpRight className="size-4 text-primary-foreground" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5 flex flex-col flex-1">
                        <h3 className="text-base font-semibold text-card-foreground group-hover:text-primary transition-colors mb-2 line-clamp-2">
                          {project.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                          {project.context}. {project.result}
                        </p>

                        {/* Tech tags */}
                        <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-md"
                            >
                              {tag}
                            </span>
                          ))}
                          {project.tags.length > 3 && (
                            <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-md">
                              +{project.tags.length - 3} more
                            </span>
                          )}
                        </div>
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
