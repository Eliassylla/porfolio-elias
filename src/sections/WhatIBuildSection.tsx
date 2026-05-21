import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import {
  VerticalCutReveal,
  type VerticalCutRevealRef,
} from "@/components/ui/vertical-cut-reveal";
import {
  fadeUpVariants,
  premiumEase,
  staggerContainer,
} from "@/components/ui/premium-motion-variants";

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
    <section className="relative overflow-hidden border-b border-border bg-background px-6 py-24 md:py-32 lg:px-8">
      <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-muted/60 to-transparent dark:from-white/[0.03]" />
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-3xl text-center" ref={sectionRef}>
          <div className="mb-4 inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground dark:border-white/10 dark:bg-white/[0.04]">
            Services
          </div>
          <h2 className="mb-4 text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
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
              Je construis des systèmes simples à utiliser, pensés pour les
              entreprises de services.
            </VerticalCutReveal>
          </p>
        </div>

        <motion.div
          className="space-y-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
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
                      ? "rounded-full border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-colors dark:border-[#5e6ad2] dark:bg-[#5e6ad2] dark:text-white"
                      : "rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-foreground/40 hover:text-foreground dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.07]"
                  }
                >
                  {service.title}
                </button>
              );
            })}
          </div>

          <motion.article
            key={activeService.id}
            id="what-i-build-card"
            role="tabpanel"
            aria-labelledby={`what-i-build-tab-${activeService.id}`}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.45, ease: premiumEase }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="mx-auto grid max-w-5xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/5 dark:border-white/10 dark:bg-[#0f1011] lg:grid-cols-[1.2fr_0.8fr]"
          >
            <div className="bg-muted p-4 dark:bg-black/30 md:p-6">
              <div className="overflow-hidden rounded-xl border border-border bg-background dark:border-white/10 dark:bg-[#010102]">
                <img
                  src={activeService.imageSrc}
                  alt={activeService.title}
                  className="aspect-[16/10] h-full w-full object-cover transition duration-1000 ease-out hover:scale-[1.05]"
                />
              </div>
            </div>

            <div className="relative flex flex-col justify-between p-6 md:p-8">
              <div>
                <p className="mb-4 text-sm font-medium text-muted-foreground">
                  {activeService.meta}
                </p>
                <h3 className="text-3xl font-semibold tracking-tight text-card-foreground md:text-4xl">
                  {activeService.title}
                </h3>
                <p className="mt-5 text-base leading-7 text-muted-foreground">
                  {activeService.description}
                </p>
              </div>

              <div className="mt-10 flex items-center justify-between border-t border-border pt-6 dark:border-white/10">
                <Link
                  to={activeService.href}
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground transition hover:text-muted-foreground"
                >
                  Discuter de ce besoin
                  <ArrowUpRight className="size-4" />
                </Link>
                <button
                  type="button"
                  aria-label={`Voir les détails : ${activeService.title}`}
                  className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-muted dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.07]"
                >
                  <Plus className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </motion.article>
        </motion.div>
      </div>
    </section>
  );
}
