import { useRef } from "react";
import { motion } from "motion/react";
import { ArrowRight, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

import heroPortrait from "@/assets/hero-portrait-real.jpg";
import { Button } from "@/components/ui/button";
import { premiumEase } from "@/components/ui/premium-motion-variants";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const AFTER_CURTAIN = 1.05; // synced with curtain duration (0.15 delay + 0.9s)
    const TITLE_TEXT = "Des opérations plus fiables, sans recruter une équipe en plus";

    // Cacher le titre avant l'animation
    gsap.set(".hero-title", { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "power2.out" }, delay: AFTER_CURTAIN });

    tl.from(".hero-badge", { opacity: 0, y: 20, duration: 0.4 })
      // Titre visible + ScrambleText simultanément
      .to(".hero-title", { opacity: 1, duration: 0 })
      .to(".hero-title", {
        duration: 1.6,
        scrambleText: {
          text: TITLE_TEXT,
          chars: "upperAndLowerCase",
          speed: 0.45,
          delimiter: " ",
        },
      }, "<")
      .from(".hero-paragraph", { opacity: 0, y: 20, duration: 0.5 }, "-=0.7")
      .from(".hero-ctas",      { opacity: 0, y: 20, duration: 0.4 }, "-=0.3")
      .from(".hero-portrait",  { opacity: 0, scale: 0.95, duration: 0.7 }, "-=0.4")
      .from(".hero-quote",     { opacity: 0, y: 15, duration: 0.4 }, "-=0.2");

    // Parallax portrait au scroll
    gsap.to(".hero-portrait", {
      y: -50,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // Fade-out texte hero en scrollant
    gsap.to([".hero-badge", ".hero-paragraph", ".hero-ctas"], {
      opacity: 0,
      y: -30,
      stagger: 0.05,
      ease: "power1.in",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center top",
        end: "bottom top",
        scrub: 1,
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen items-center overflow-hidden border-b border-border bg-background px-6 py-28 lg:px-8"
    >
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,hsl(var(--muted))_0,transparent_42%)] opacity-70 dark:bg-[radial-gradient(circle_at_top,#18191a_0,transparent_46%)]" />
      <div className="absolute left-1/2 top-24 -z-10 h-64 w-[42rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl dark:bg-[#5e6ad2]/10" />

      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_0.85fr]">
        <div className="text-center lg:text-left">
          <div className="hero-badge mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.04]">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Disponible pour nouveaux diagnostics
          </div>

          <h1 className="hero-title mx-auto max-w-3xl text-balance text-5xl font-semibold tracking-tight text-foreground md:text-7xl lg:mx-0 lg:text-[5rem] lg:leading-[0.98]">
            Des opérations plus fiables, sans recruter une équipe en plus
          </h1>

          <p className="hero-paragraph mx-auto mt-7 max-w-2xl text-pretty text-base leading-8 text-muted-foreground md:text-xl lg:mx-0">
            Je transforme vos relances, suivis et routines administratives en
            systèmes simples que votre équipe peut utiliser sans friction.
          </p>

          <div className="hero-ctas mt-10 flex flex-col items-center gap-3 sm:flex-row lg:items-start">
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
          transition={{ duration: 0.6, ease: premiumEase }}
          className="hero-portrait relative mx-auto w-full max-w-md lg:max-w-lg"
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

          <div className="hero-quote absolute -bottom-6 left-4 right-4 rounded-xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur dark:border-white/10 dark:bg-[#0f1011]/95 sm:left-auto sm:right-auto sm:w-64">
            <p className="text-sm leading-6 text-muted-foreground">
              "Le bon système enlève les oublis avant d'ajouter de la
              vitesse."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
