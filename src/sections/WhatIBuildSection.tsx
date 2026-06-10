import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { useTheme } from "next-themes";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import Lottie from "lottie-react";
import skillsLight from "@/video/skills.json";
import skillsDark from "@/video/skills-dark.json";
import agentsLight from "@/video/agents.json";
import agentsDark from "@/video/agents-dark.json";
import automationLight from "@/video/automation.json";
import automationDark from "@/video/automation-dark.json";
import { businessInfo } from "@/data/business";
import { useCalEmbed } from "@/hooks/useCalEmbed";

gsap.registerPlugin(ScrollTrigger, SplitText);

const serviceItems = businessInfo.services;

const headline = "Transformer vos tâches répétitives en outils";

export default function WhatIBuildSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const hasMounted = useRef(false);
  const [activeServiceId, setActiveServiceId] = useState(serviceItems[0].id);
  const cal = useCalEmbed();

  // Thème (next-themes). Le cadran s'inverse : panneau sombre en light, clair en dark.
  // mounted évite le flash avant hydratation de next-themes.
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted && resolvedTheme === "dark";

  // Panneau inversé + couleur de contenu/label qui contraste avec le panneau
  const panelStyle = isDark
    ? { background: "#f5f6f6" }
    : { background: "#010102" };

  const activeService =
    serviceItems.find((service) => service.id === activeServiceId) ??
    serviceItems[0];

  // Entrée scrubbée, liée à la position dans le viewport (même patron que
  // MethodSection). Révèle H1 → sous-texte → boutons → cadran en fonction du
  // scroll, et se reverse quand on remonte. `once: false` + invalidateOnRefresh.
  useGSAP(
    () => {
      const headlineEl = containerRef.current?.querySelector(".what-headline");
      const subtextEl = containerRef.current?.querySelector(".what-subtext");
      const headlineSplit = headlineEl
        ? SplitText.create(headlineEl, { type: "words", aria: "auto" })
        : null;
      const subtextSplit = subtextEl
        ? SplitText.create(subtextEl, { type: "words", aria: "auto" })
        : null;
      const headlineWords = headlineSplit?.words ?? [];
      const subtextWords = subtextSplit?.words ?? [];
      const tabs = gsap.utils.toArray<HTMLElement>(".service-tab");
      const card = containerRef.current?.querySelector(".service-card");

      gsap.set(headlineWords, { opacity: 0, y: 20, filter: "blur(5px)" });
      gsap.set(subtextWords, { opacity: 0, y: 14, filter: "blur(3px)" });
      gsap.set(tabs, { opacity: 0, y: 14, scale: 0.96, filter: "blur(2px)" });
      gsap.set(card, { opacity: 0, y: 40, filter: "blur(6px)" });

      const timeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          end: "top 22%",
          scrub: 0.8,
          once: false,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(
          headlineWords,
          { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.05, duration: 0.34 },
          0,
        )
        .to(
          subtextWords,
          { opacity: 1, y: 0, filter: "blur(0px)", stagger: 0.015, duration: 0.22 },
          0.24,
        )
        .to(
          tabs,
          { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", stagger: 0.06, duration: 0.24 },
          0.42,
        )
        .to(
          card,
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.32 },
          0.6,
        );

      return () => {
        headlineSplit?.revert();
        subtextSplit?.revert();
      };
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

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-background px-6 py-12 md:py-10 lg:px-8 lg:py-[15px]"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-muted/60 to-transparent dark:from-white/[0.03]" />
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-[790px] text-center">
          <h2 className="what-headline mb-4 text-4xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-[5rem] lg:leading-[0.95]">
            {headline}
          </h2>
          <p className="what-subtext mx-auto max-w-2xl text-lg leading-8 text-muted-foreground">
            Automatisations, apps et agents IA pour reprendre la main sur votre
            quotidien.
          </p>
        </div>

        <div className="services-tabs space-y-8">
          <div
            className="flex flex-nowrap items-center justify-center gap-2 md:gap-3"
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
                  className={[
                    "service-tab shrink-0 whitespace-nowrap rounded-full border px-3 py-2 text-xs font-medium transition-all active:scale-[0.97] md:px-5 md:py-2.5 md:text-sm",
                    isActive
                      ? "border-transparent bg-foreground text-background"
                      : "border-border bg-card text-muted-foreground hover:-translate-y-px hover:border-foreground/40 hover:text-foreground dark:border-white/10 dark:bg-white/[0.04] dark:hover:bg-white/[0.07]",
                  ].join(" ")}
                >
                  {service.title}
                </button>
              );
            })}
          </div>

          <article
            key={activeService.id}
            ref={cardRef}
            id="what-i-build-card"
            role="tabpanel"
            aria-labelledby={`what-i-build-tab-${activeService.id}`}
            className="service-card mx-auto -mt-4 w-full max-w-3xl overflow-hidden rounded-[15px] md:mt-0"
          >
            {/* Cadran encadré — panneau inversé vs la page (sombre en light, clair en dark),
                contenu animé qui contraste toujours avec le panneau */}
            <div
              className="relative overflow-hidden rounded-2xl shadow-md"
              style={panelStyle}
            >
              <div className="relative mx-auto flex aspect-[16/9] w-full items-center justify-center">
                {activeService.id === "automatisations" && (
                  <Lottie
                    animationData={isDark ? automationDark : automationLight}
                    loop={false}
                    className="h-full w-full"
                  />
                )}
                {activeService.id === "skills" && (
                  <Lottie
                    animationData={isDark ? skillsDark : skillsLight}
                    loop={false}
                    className="h-full w-full"
                  />
                )}
                {activeService.id === "agents-ia" && (
                  <Lottie
                    animationData={isDark ? agentsDark : agentsLight}
                    loop={false}
                    className="h-full w-full"
                  />
                )}
              </div>
            </div>

            <div className="px-2 pt-8 pb-10 md:px-4 md:pt-10 md:pb-0">
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
                <button
                  {...cal}
                  type="button"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition hover:text-muted-foreground"
                >
                  Décrire ce besoin
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
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
