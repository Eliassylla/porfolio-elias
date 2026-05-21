import { useRef, useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

import {
  VerticalCutReveal,
  type VerticalCutRevealRef,
} from "@/components/ui/vertical-cut-reveal";

const serviceItems = [
  {
    id: "automatisations",
    title: "Automatisations",
    description:
      "J'identifie vos tâches répétitives et je crée des workflows automatisés pour vous faire gagner du temps chaque semaine.",
    meta: "Workflows • n8n • Claude",
    imageSrc: "/images/infographics/automatisations.png",
    href: "/contact",
  },
  {
    id: "apps-sur-mesure",
    title: "Apps sur mesure",
    description:
      "Je développe des applications et dashboards personnalisés pour analyser vos données, automatiser votre veille ou piloter votre activité.",
    meta: "Apps • Dashboards • Sur mesure",
    imageSrc: "/images/infographics/micro-outils.png",
    href: "/contact",
  },
  {
    id: "agents-ia",
    title: "Agents IA",
    description:
      "Je construis des agents capables de comprendre, décider et agir — pour qualifier vos leads, répondre à vos clients ou automatiser votre support.",
    meta: "Agents IA • Claude Code • Codex",
    imageSrc: "/images/infographics/landing-page.png",
    href: "/contact",
  },
] as const;

export default function WhatIBuildSection() {
  const revealRef1 = useRef<VerticalCutRevealRef>(null);
  const revealRef2 = useRef<VerticalCutRevealRef>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState(serviceItems[0].id);

  const activeService =
    serviceItems.find((service) => service.id === activeServiceId) ??
    serviceItems[0];

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
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasTriggered]);

  return (
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
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 25,
                delay: 0.15,
              }}
            >
              Je construis des systèmes simples à utiliser, pensés pour les
              entreprises de services.
            </VerticalCutReveal>
          </p>
        </div>

        <div className="space-y-8">
          <div
            className="flex flex-wrap items-center justify-center gap-3"
            role="tablist"
            aria-label="Services"
          >
            {serviceItems.map((service) => {
              const isActive = service.id === activeService.id;

              return (
                <button
                  id={`what-i-build-tab-${service.id}`}
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls="what-i-build-card"
                  onClick={() => setActiveServiceId(service.id)}
                  className={
                    isActive
                      ? "rounded-full border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors"
                      : "rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground"
                  }
                >
                  {service.title}
                </button>
              );
            })}
          </div>

          <motion.article
            id="what-i-build-card"
            role="tabpanel"
            aria-labelledby={`what-i-build-tab-${activeService.id}`}
            className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-border bg-card shadow-lg"
          >
            <div className="aspect-[16/9] overflow-hidden bg-muted">
              <img
                src={activeService.imageSrc}
                alt={activeService.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="relative p-6 md:p-8">
              <p className="mb-3 text-sm font-medium text-muted-foreground">
                {activeService.meta}
              </p>
              <h3 className="pr-14 text-2xl font-semibold tracking-tight text-card-foreground md:text-3xl">
                {activeService.title}
              </h3>

              <button
                type="button"
                aria-label={`Voir les détails : ${activeService.title}`}
                className="absolute bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-muted"
              >
                <Plus className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
