import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { businessInfo } from '@/data/business';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

function ProjectPreview({
  project,
  serviceTitle,
}: {
  project: (typeof businessInfo.projects)[number];
  serviceTitle: string;
}) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.title}
        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
      />
    );
  }

  return (
    <div className="h-full w-full bg-muted p-4 dark:bg-[#0f1011]">
      <div className="flex h-full flex-col rounded-lg border border-border bg-card p-4 dark:border-white/10 dark:bg-[#141516]">
        <div className="flex items-center justify-between border-b border-border pb-3 dark:border-white/10">
          <div className="flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-muted-foreground/30" />
            <span className="size-2 rounded-full bg-muted-foreground/20" />
            <span className="size-2 rounded-full bg-muted-foreground/20" />
          </div>
          <span className="text-[11px] font-medium text-muted-foreground">
            {serviceTitle}
          </span>
        </div>
        <div className="mt-4 space-y-3">
          <div className="h-3 w-8/12 rounded-full bg-foreground/15" />
          <div className="h-2 w-full rounded-full bg-muted-foreground/15" />
          <div className="h-2 w-9/12 rounded-full bg-muted-foreground/15" />
        </div>
        <div className="mt-auto grid grid-cols-3 gap-2">
          {project.tags.slice(0, 3).map((tag) => (
            <div
              key={tag}
              className="h-9 rounded-md border border-border bg-muted/60 dark:border-white/10 dark:bg-white/[0.04]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeServiceId, setActiveServiceId] = useState(
    businessInfo.services[0]?.id ?? '',
  );
  const activeService =
    businessInfo.services.find((service) => service.id === activeServiceId) ??
    businessInfo.services[0];

  const filtered = businessInfo.projects.filter(
    (project) => project.serviceId === activeService?.id,
  );

  const getProjectServiceTitle = (serviceId: string) =>
    businessInfo.services.find((service) => service.id === serviceId)?.title ??
    activeService?.title ??
    'Projet';

  return (
    <>
      <SEOHead
        title="Mes projets — Elias"
        description="Découvrez des cas concrets de systèmes opérationnels, d'automatisations et d'expérimentations IA."
      />

      <div className="min-h-screen bg-background pt-20">
        <section className="px-6 py-8 md:py-10 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-4 grid gap-6 border-b border-border pb-4 md:grid-cols-[0.82fr_1.18fr] md:items-center">
              <div>
                <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                  Mes projets
                </h1>
              </div>
              <div className="md:justify-self-end">
                <div
                  className="flex flex-wrap gap-2.5"
                  role="tablist"
                  aria-label="Filtrer les projets par offre"
                >
                  {businessInfo.services.map((service) => {
                    const isActive = service.id === activeService?.id;

                    return (
                      <button
                        key={service.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        onClick={() => setActiveServiceId(service.id)}
                        className={`min-h-10 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                          isActive
                            ? 'border-primary bg-primary text-primary-foreground shadow-md shadow-primary/10'
                            : 'border-border bg-transparent text-muted-foreground hover:border-primary/40 hover:text-foreground'
                        }`}
                      >
                        {service.title}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-8 text-center md:p-12">
                <h2 className="text-2xl font-semibold tracking-tight text-card-foreground">
                  Aucun cas publié pour cette offre.
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-muted-foreground">
                  Les projets visibles seront ajoutés ici dès qu'un exemple
                  public pourra être partagé.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((project, index) => (
                  <ScrollReveal key={project.id} delay={index * 0.08}>
                    <Link to={`/portfolio/${project.id}`} className="group block h-full">
                      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:border-primary/30 hover:bg-card/95 dark:hover:bg-[#141516]">
                        <div className="relative aspect-[16/9] w-full overflow-hidden border-b border-border bg-muted dark:border-white/10">
                          <ProjectPreview
                            project={project}
                            serviceTitle={getProjectServiceTitle(project.serviceId)}
                          />
                          <div className="absolute bottom-3 left-3">
                            <Badge className="border border-border bg-background/90 px-2.5 py-1 text-xs text-foreground backdrop-blur-sm dark:border-white/10 dark:bg-[#010102]/90">
                              {getProjectServiceTitle(project.serviceId)}
                            </Badge>
                          </div>
                          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="size-8 rounded-md border border-border bg-background/90 backdrop-blur-sm flex items-center justify-center dark:border-white/10 dark:bg-[#010102]/90">
                              <ArrowUpRight className="size-4 text-foreground" />
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-1 flex-col p-6">
                          <h3 className="mb-2 text-base font-semibold text-card-foreground transition-colors group-hover:text-primary line-clamp-2">
                            {project.title}
                          </h3>
                          <p className="mb-4 flex-1 text-sm leading-6 text-muted-foreground line-clamp-2">
                            {project.context}. {project.result}
                          </p>

                          <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
                            {project.tags.slice(0, 3).map((tag) => (
                              <span
                                key={tag}
                                className="rounded-md bg-secondary px-2.5 py-1 text-xs text-muted-foreground"
                              >
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 3 && (
                              <span className="text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-md">
                                +{project.tags.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
