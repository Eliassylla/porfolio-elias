import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import {
  LayoutGroup,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import {
  VerticalCutReveal,
  type VerticalCutRevealRef,
} from "@/components/ui/vertical-cut-reveal";
import { staggerContainer } from "@/components/ui/premium-motion-variants";
import { businessInfo } from "@/data/business";

gsap.registerPlugin(ScrollTrigger, SplitText);

const serviceImages: Record<string, string> = {
  automatisations: "/images/infographics/automatisations.png",
  "apps-sur-mesure": "/images/infographics/micro-outils.png",
  "agents-ia": "/images/infographics/landing-page.png",
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
  const reduceMotion = useReducedMotion();
  const [hasTriggered, setHasTriggered] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState(serviceItems[0].id);

  const activeService =
    serviceItems.find((service) => service.id === activeServiceId) ??
    serviceItems[0];
  const { scrollYProgress: cardScrollProgress } = useScroll({
    target: cardRef,
    offset: ["start 0.95", "start 0.55"],
  });
  const smoothCardProgress = useSpring(cardScrollProgress, {
    stiffness: 320,
    damping: 34,
    mass: 0.18,
  });
  const cardOpacity = useTransform(
    cardScrollProgress,
    [0, 0.65, 1],
    [0, 0.92, 1],
  );
  const cardY = useTransform(smoothCardProgress, [0, 1], [34, 0]);
  const cardScale = useTransform(smoothCardProgress, [0, 1], [0.97, 1]);
  const imageScale = useTransform(smoothCardProgress, [0, 1], [1.04, 1]);

  useGSAP(() => {
    // Headline — mots révélés au scroll avec SplitText
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

    // Cartes services — entrée en stagger au scroll
    gsap.from(".service-card", {
      opacity: 0,
      y: 40,
      stagger: 0.15,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".services-tabs",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }, { scope: containerRef });

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
    <section ref={containerRef} className="relative overflow-hidden border-b border-border bg-background px-6 py-24 md:py-32 lg:px-8">
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
                  <motion.button
                    id={`what-i-build-tab-${service.id}`}
                    key={service.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls="what-i-build-card"
                    onClick={() => setActiveServiceId(service.id)}
                    whileHover={reduceMotion ? undefined : { y: -1 }}
                    whileTap={reduceMotion ? undefined : { scale: 0.97 }}
                    className="relative overflow-hidden rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.07]"
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
                  </motion.button>
                );
              })}
            </div>
          </LayoutGroup>

          <motion.article
            key={activeService.id}
            ref={cardRef}
            id="what-i-build-card"
            role="tabpanel"
            aria-labelledby={`what-i-build-tab-${activeService.id}`}
            style={
              reduceMotion
                ? undefined
                : { opacity: cardOpacity, y: cardY, scale: cardScale }
            }
            className="service-card mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/5 dark:border-white/10 dark:bg-[#0f1011]"
          >
            <div className="bg-muted p-4 dark:bg-[#010102] md:p-5">
              <motion.div
                style={reduceMotion ? undefined : { scale: imageScale }}
                className="flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl border border-border bg-white p-3 dark:border-white/10 dark:bg-white"
              >
                <img
                  src={activeService.imageSrc}
                  alt={activeService.title}
                  className="h-full w-full object-contain transition duration-700 ease-out hover:scale-[1.02]"
                />
              </motion.div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-3xl font-semibold tracking-tight text-card-foreground">
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
                <motion.button
                  type="button"
                  aria-label={`Voir les détails : ${activeService.title}`}
                  whileHover={reduceMotion ? undefined : { scale: 1.04 }}
                  whileTap={reduceMotion ? undefined : { scale: 0.94 }}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-muted dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.07]"
                >
                  <Plus className="h-5 w-5" aria-hidden="true" />
                </motion.button>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
