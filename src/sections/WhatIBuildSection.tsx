import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { LayoutGroup, motion } from "motion/react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import {
  VerticalCutReveal,
  type VerticalCutRevealRef,
} from "@/components/ui/vertical-cut-reveal";
import Lottie from "lottie-react";
import skillsAnimation from "@/video/animation.json";
import agentsAnimation from "@/video/animation-2.json";
import { AutomationSvg } from "@/components/AutomationSvg";
import { businessInfo } from "@/data/business";

gsap.registerPlugin(ScrollTrigger, SplitText);

const serviceImages: Record<string, string> = {
  automatisations: "/automation-2.svg",
  skills: "/images/infographics/skills.png",
  "agents-ia": "/images/infographics/agents-ia.png",
};

const serviceItems = businessInfo.services.map((service) => ({
  ...service,
  imageSrc: serviceImages[service.id],
  href: "/contact",
}));

const headline = "Transformer vos tâches répétitives en outils";

export default function WhatIBuildSection() {
  const revealRef2 = useRef<VerticalCutRevealRef>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const hasMounted = useRef(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState(serviceItems[0].id);

  const activeService =
    serviceItems.find((service) => service.id === activeServiceId) ??
    serviceItems[0];

  useGSAP(
    () => {
      const headlineEl = containerRef.current?.querySelector(".what-headline");
      if (headlineEl) {
        const split = new SplitText(headlineEl, { type: "words" });
        gsap.from(split.words, {
          opacity: 0,
          y: 20,
          filter: "blur(5px)",
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headlineEl,
            start: "top 72%",
            end: "top 38%",
            scrub: 0.8,
          },
        });
      }

      gsap.from(".service-card", {
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".services-tabs",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    },
    { scope: containerRef },
  );

  // Entrance animation when switching tabs (skip first mount — ScrollTrigger handles it)
  useGSAP(
    () => {
      if (!hasMounted.current) {
        hasMounted.current = true;
        return;
      }
      if (!cardRef.current) return;
      gsap.from(cardRef.current, {
        opacity: 0,
        y: 16,
        duration: 0.35,
        ease: "power2.out",
      });
    },
    { dependencies: [activeServiceId] },
  );

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          revealRef2.current?.startAnimation();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [hasTriggered]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden border-b border-border bg-background px-6 py-24 md:py-32 lg:px-8"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-muted/60 to-transparent dark:from-white/[0.03]" />
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center" ref={sectionRef}>
          <div className="mb-4 inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground dark:border-white/10 dark:bg-white/[0.04]">
            Services
          </div>
          <h2 className="what-headline mb-4 text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            {headline}
          </h2>
          <p className="mx-auto max-w-2xl text-lg leading-8 text-muted-foreground">
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
              Automatisations, apps et agents IA pour reprendre la main sur
              votre quotidien.
            </VerticalCutReveal>
          </p>
        </div>

        <div className="services-tabs space-y-8">
          <LayoutGroup>
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
                    className="relative overflow-hidden rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:-translate-y-px hover:border-foreground/40 hover:text-foreground active:scale-[0.97] dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.07]"
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="what-i-build-active-tab"
                        className="absolute inset-0 rounded-full bg-foreground dark:bg-[#5e6ad2]"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                      />
                    ) : null}
                    <span
                      className={
                        isActive
                          ? "relative z-10 text-background dark:text-white"
                          : "relative z-10"
                      }
                    >
                      {service.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <article
            key={activeService.id}
            ref={cardRef}
            id="what-i-build-card"
            role="tabpanel"
            aria-labelledby={`what-i-build-tab-${activeService.id}`}
            className="service-card mx-auto max-w-3xl"
          >
            <div className="relative overflow-hidden rounded-2xl p-8 md:p-12" style={{ background: "#dbeafe" }}>
              {/* Orbs aura — mêmes couleurs, positions tournées par service */}
              {activeService.id === "automatisations" && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-blue-400 opacity-50" style={{ filter: "blur(72px)" }} />
                  <div className="absolute -bottom-8 right-4 h-56 w-56 rounded-full bg-indigo-400 opacity-40" style={{ filter: "blur(64px)" }} />
                  <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300 opacity-35" style={{ filter: "blur(56px)" }} />
                </div>
              )}
              {activeService.id === "skills" && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-indigo-400 opacity-50" style={{ filter: "blur(72px)" }} />
                  <div className="absolute -left-4 bottom-[-2rem] h-56 w-56 rounded-full bg-sky-300 opacity-40" style={{ filter: "blur(64px)" }} />
                  <div className="absolute right-1/3 top-1/3 h-48 w-48 rounded-full bg-blue-400 opacity-35" style={{ filter: "blur(56px)" }} />
                </div>
              )}
              {activeService.id === "agents-ia" && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="absolute left-1/2 -top-12 h-64 w-64 -translate-x-1/2 rounded-full bg-sky-300 opacity-50" style={{ filter: "blur(72px)" }} />
                  <div className="absolute -left-8 -bottom-4 h-56 w-56 rounded-full bg-blue-400 opacity-40" style={{ filter: "blur(64px)" }} />
                  <div className="absolute right-[-1rem] top-1/4 h-48 w-48 rounded-full bg-indigo-400 opacity-35" style={{ filter: "blur(56px)" }} />
                </div>
              )}
              {/* Gabarit identique pour tous — card blanche sur automatisations + skills */}
              <div className={[
                "relative mx-auto flex w-[88%] aspect-[16/9] items-center justify-center rounded-3xl",
                activeService.id === "automatisations"
                  ? "overflow-hidden bg-white/40 p-4 shadow-md backdrop-blur-sm md:p-6"
                  : "",
              ].join(" ")}>
                {activeService.id === "automatisations" && (
                  <AutomationSvg
                    src={activeService.imageSrc}
                    className="h-full w-full [&>svg]:h-full [&>svg]:w-full"
                  />
                )}
                {activeService.id === "skills" && (
                  <Lottie
                    animationData={skillsAnimation}
                    loop={false}
                    className="h-full w-full scale-[1.6]"
                  />
                )}
                {activeService.id === "agents-ia" && (
                  <Lottie
                    animationData={agentsAnimation}
                    loop={false}
                    className="h-full w-full scale-[1.6]"
                  />
                )}
              </div>
            </div>

            <div className="px-2 pt-8 md:px-4 md:pt-10">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-3xl font-semibold tracking-tight text-foreground">
                    {activeService.title}
                  </h3>
                </div>
              </div>

              <p className="mt-6 text-base leading-7 text-muted-foreground">
                {activeService.description}
              </p>

              <div className="mt-8 flex items-center justify-between border-t border-border pt-6 dark:border-white/10">
                <Link
                  to={activeService.href}
                  className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition hover:text-muted-foreground"
                >
                  Décrire ce besoin
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <button
                  type="button"
                  aria-label={`Voir les détails : ${activeService.title}`}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-foreground shadow-sm transition-all hover:scale-[1.04] hover:bg-muted active:scale-[0.94] dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.07]"
                >
                  <Plus className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
