import { useRef, useState, useEffect } from "react";

import { FocusRail } from "@/components/ui/focus-rail";
import {
  VerticalCutReveal,
  type VerticalCutRevealRef,
} from "@/components/ui/vertical-cut-reveal";

export default function WhatIBuildSection() {
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

        <div className="rounded-2xl overflow-hidden border border-border shadow-lg">
          <FocusRail
            className="h-[500px]"
            items={[
              {
                id: "automatisations",
                title: "Automatisations",
                description:
                  "J'identifie vos tâches répétitives et je crée des workflows automatisés pour vous faire gagner du temps chaque semaine.",
                meta: "Workflows • n8n • Claude",
                imageSrc:
                  "/images/infographics/automatisations.png",
                href: "/contact",
              },
              {
                id: "apps-sur-mesure",
                title: "Apps sur mesure",
                description:
                  "Je développe des applications et dashboards personnalisés pour analyser vos données, automatiser votre veille ou piloter votre activité.",
                meta: "Apps • Dashboards • Sur mesure",
                imageSrc:
                  "/images/infographics/micro-outils.png",
                href: "/contact",
              },
              {
                id: "agents-ia",
                title: "Agents IA",
                description:
                  "Je construis des agents capables de comprendre, décider et agir — pour qualifier vos leads, répondre à vos clients ou automatiser votre support.",
                meta: "Agents IA • Claude Code • Codex",
                imageSrc:
                  "/images/infographics/landing-page.png",
                href: "/contact",
              },
            ]}
            autoPlay
            loop
          />
        </div>
      </div>
    </section>
  );
}
