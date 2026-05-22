import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, ChevronDown, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import heroPortrait from "@/assets/hero-portrait-real.jpg";
import { Button } from "@/components/ui/button";
import { businessInfo } from "@/data/business";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const section = containerRef.current;
    if (!section) return;
    const sticky = section.querySelector<HTMLElement>(".hero-story-sticky");
    const scene1 = section.querySelector<HTMLElement>(".scene-1");
    const scene2 = section.querySelector<HTMLElement>(".scene-2");
    const scene3 = section.querySelector<HTMLElement>(".scene-3");
    const scrollIndicator = section.querySelector<HTMLElement>(".scroll-indicator");

    // === Version statique (mobile + reduced motion) ===
    if (reduce || isMobile) {
      section.style.height = "auto";
      if (sticky) {
        sticky.style.position = "relative";
        sticky.style.height = "auto";
        sticky.style.overflow = "visible";
        sticky.style.minHeight = "100vh";
        sticky.style.padding = "7rem 0 5rem";
      }
      if (scene1) scene1.style.display = "none";
      if (scene2) scene2.style.display = "none";
      if (scene3) {
        scene3.style.position = "relative";
        scene3.style.inset = "auto";
      }
      if (scrollIndicator) scrollIndicator.style.display = "none";
      return;
    }

    // === Version animée desktop ===
    const promiseSplit = SplitText.create(".scene-2-title", { type: "lines", mask: "lines" });
    const nameSplit = SplitText.create(".scene-3-name", { type: "lines", mask: "lines" });

    // États initiaux scène 1 (entrée auto au load)
    gsap.set(".pain-line", { opacity: 0, y: 30 });
    gsap.set(".pain-sub", { opacity: 0, y: 20 });
    gsap.set(".scroll-indicator", { opacity: 0, y: 20 });

    // États initiaux scènes 2 et 3 (révélées au scroll)
    gsap.set(promiseSplit.lines, { yPercent: 100 });
    gsap.set(".scene-2-sub", { opacity: 0, y: 30 });
    gsap.set(".scene-3-portrait", { xPercent: 80, opacity: 0, scale: 0.92 });
    gsap.set(nameSplit.lines, { yPercent: 100 });
    gsap.set([".scene-3-badge", ".scene-3-role", ".scene-3-quote", ".scene-3-ctas"], {
      opacity: 0,
      y: 30,
    });

    // Entrée auto scène 1
    const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });
    introTl
      .to(".pain-line", { opacity: 1, y: 0, stagger: 0.18, duration: 0.7 })
      .to(".pain-sub", { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
      .to(".scroll-indicator", { opacity: 1, y: 0, duration: 0.4 }, "+=0.2");

    // Timeline scrub + pin
    const scrubTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".hero-story",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: ".hero-story-sticky",
        pinType: "transform",
        anticipatePin: 1,
      },
    });

    // Scène 1 → 2
    scrubTl
      .to(".scene-1", { opacity: 0, scale: 0.94, y: -50, duration: 1 })
      .to(promiseSplit.lines, { yPercent: 0, stagger: 0.1, duration: 1, ease: "expo.out" }, "<0.2")
      .to(".scene-2-sub", { opacity: 1, y: 0, duration: 0.8 }, "-=0.5");

    // Scène 2 → 3
    scrubTl
      .to(".scene-2", { opacity: 0, x: -120, duration: 1 }, "+=0.3")
      .to(".scene-3-portrait", { xPercent: 0, opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" }, "<")
      .to(nameSplit.lines, { yPercent: 0, stagger: 0.08, duration: 0.6, ease: "expo.out" }, "-=0.7")
      .to(".scene-3-badge", { opacity: 1, y: 0, duration: 0.5 }, "-=0.4")
      .to(".scene-3-role", { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .to(".scene-3-quote", { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
      .to(".scene-3-ctas", { opacity: 1, y: 0, duration: 0.5 }, "-=0.2");

    // Scroll indicator fade-out dès le premier scroll
    gsap.to(".scroll-indicator", {
      opacity: 0,
      scrollTrigger: {
        trigger: ".hero-story",
        start: "top top",
        end: "top top-=120",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="hero-story relative h-[300vh] border-b border-border"
    >
      <div className="hero-story-sticky sticky top-0 h-screen overflow-hidden bg-background">

        {/* Background ambient */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,hsl(var(--muted))_0,transparent_42%)] opacity-70 dark:bg-[radial-gradient(circle_at_top,#18191a_0,transparent_46%)]" />
        <div className="absolute left-1/2 top-24 -z-10 h-64 w-[42rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl dark:bg-[#5e6ad2]/10" />

        {/* SCÈNE 1 — Pain points */}
        <div className="scene-1 absolute inset-0 flex flex-col items-center justify-center px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <p className="pain-line text-4xl font-semibold tracking-tight text-foreground md:text-7xl lg:text-[5.5rem] lg:leading-[1.05]">
              Factures oubliées.
            </p>
            <p className="pain-line mt-2 text-4xl font-semibold tracking-tight text-foreground/65 md:text-7xl lg:text-[5.5rem] lg:leading-[1.05]">
              Devis sans suite.
            </p>
            <p className="pain-line mt-2 text-4xl font-semibold tracking-tight text-foreground/40 md:text-7xl lg:text-[5.5rem] lg:leading-[1.05]">
              Informations dispersées.
            </p>
            <p className="pain-sub mx-auto mt-10 max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
              Chaque semaine, votre entreprise perd du temps sur des tâches qui devraient être cadrées.
            </p>
          </div>
        </div>

        {/* SCÈNE 2 — Promise */}
        <div className="scene-2 absolute inset-0 flex flex-col items-center justify-center px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="scene-2-title text-balance text-5xl font-semibold tracking-tight text-foreground md:text-7xl lg:text-[5.5rem] lg:leading-[1.02]">
              Vos opérations méritent mieux.
            </h2>
            <p className="scene-2-sub mx-auto mt-8 max-w-2xl text-lg leading-8 text-muted-foreground md:text-xl">
              {businessInfo.tagline}
            </p>
          </div>
        </div>

        {/* SCÈNE 3 — Identity */}
        <div className="scene-3 absolute inset-0 flex items-center px-6 lg:px-8">
          <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_0.85fr]">

            <div className="scene-3-text text-center lg:text-left">
              <div className="scene-3-badge inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                Disponible pour nouveaux diagnostics
              </div>

              <h1 className="scene-3-name mt-6 text-balance text-6xl font-semibold tracking-tight text-foreground md:text-7xl lg:text-[5rem] lg:leading-[0.98]">
                Elias.
              </h1>

              <p className="scene-3-role mt-4 text-lg leading-8 text-muted-foreground md:text-xl">
                Consultant en systèmes opérationnels.
              </p>

              <p className="scene-3-quote mt-6 max-w-md mx-auto lg:mx-0 text-sm leading-6 italic text-muted-foreground">
                "Le bon système enlève les oublis avant d'ajouter de la vitesse."
              </p>

              <div className="scene-3-ctas mt-10 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
                <Link to="/contact" className="w-full max-w-xs sm:w-auto">
                  <Button
                    size="lg"
                    className="h-12 w-full rounded-lg px-4 text-center font-semibold whitespace-normal shadow-sm dark:bg-[#5e6ad2] dark:text-white dark:hover:bg-[#828fff] sm:px-6 sm:whitespace-nowrap"
                  >
                    <ClipboardCheck className="mr-2 size-4" />
                    Demander un audit
                  </Button>
                </Link>
                <Link to="/portfolio" className="w-full max-w-xs sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 w-full rounded-lg border-border bg-background/70 px-4 text-center font-semibold whitespace-normal backdrop-blur hover:bg-muted dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.07] sm:px-6 sm:whitespace-nowrap"
                  >
                    Voir les cas concrets
                    <ArrowRight className="ml-2 size-4" />
                  </Button>
                </Link>
              </div>
            </div>

            <motion.div
              whileHover={{ y: -8 }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="scene-3-portrait relative mx-auto w-full max-w-md lg:max-w-lg"
            >
              <div className="absolute -inset-6 rounded-[2rem] bg-primary/5 blur-2xl dark:bg-[#5e6ad2]/12" />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-2xl shadow-foreground/10 dark:border-white/10 dark:bg-[#0f1011]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                  <img
                    src={heroPortrait}
                    alt="Elias — Consultant opérations"
                    className="h-full w-full object-cover object-[50%_15%] grayscale transition duration-1000 hover:scale-[1.03] hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Scroll indicator (visible scène 1) */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <span>Scroll</span>
          <ChevronDown className="size-4 animate-bounce" />
        </div>

      </div>
    </section>
  );
}
