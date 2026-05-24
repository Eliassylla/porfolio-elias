import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import heroPortrait from "@/assets/hero-portrait-real.jpg";

gsap.registerPlugin(ScrollTrigger);

const PHRASE_PART_1 = "Vos opérations méritent mieux. Salut, moi c'est";
const PHRASE_PART_2 = "et je construis les systèmes qui enlèvent les oublis avant qu'ils coûtent.";

const part1Words = PHRASE_PART_1.split(/\s+/);
const part2Words = PHRASE_PART_2.split(/\s+/);

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const isMobile = window.matchMedia("(max-width: 768px)").matches;

      const section = containerRef.current;
      if (!section) return;

      const sticky = section.querySelector<HTMLElement>(".hero-story-sticky");
      const track = section.querySelector<HTMLElement>(".h-phrase-track");
      const phraseWrap = section.querySelector<HTMLElement>(".h-phrase-wrap");
      const scene1 = section.querySelector<HTMLElement>(".scene-1");
      const scrollIndicator = section.querySelector<HTMLElement>(".scroll-indicator");
      const wordEls = section.querySelectorAll<HTMLElement>(".h-word, .h-card-elias");

      // === Branche mobile / reduced-motion : version statique ===
      if (reduce || isMobile) {
        section.style.height = "auto";
        if (sticky) {
          sticky.style.position = "relative";
          sticky.style.height = "auto";
          sticky.style.overflow = "visible";
          sticky.style.minHeight = "100vh";
          sticky.style.padding = "7rem 0 5rem";
        }
        if (phraseWrap) {
          phraseWrap.style.position = "relative";
          phraseWrap.style.inset = "auto";
          phraseWrap.style.marginTop = "4rem";
          phraseWrap.style.overflow = "visible";
        }
        if (track) {
          track.style.flexWrap = "wrap";
          track.style.whiteSpace = "normal";
          track.style.paddingLeft = "0";
          track.style.justifyContent = "center";
        }
        if (scrollIndicator) scrollIndicator.style.display = "none";
        return;
      }

      // === Intro auto scène 1 (pain points) ===
      gsap.set(".pain-line", { opacity: 0, y: 30 });
      gsap.set(".pain-sub", { opacity: 0, y: 20 });
      gsap.set(".scroll-indicator", { opacity: 0, y: 20 });

      const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      introTl
        .to(".pain-line", { opacity: 1, y: 0, stagger: 0.18, duration: 0.7 })
        .to(".pain-sub", { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
        .to(".scroll-indicator", { opacity: 1, y: 0, duration: 0.4 }, "+=0.2");

      // === États initiaux phrase horizontale ===
      if (!track || wordEls.length === 0) return;

      gsap.set(wordEls, { yPercent: -60, opacity: 0 });

      // === Scroll horizontal piloté par scrub (moteur principal) ===
      // Hauteur dynamique de la section parent : aligne la durée de scroll
      // vertical avec la durée de la phrase horizontale, pour que la section
      // suivante (WhatIBuildSection) n'apparaisse qu'à la fin du dernier mot.
      const setSectionHeight = () => {
        if (!track) return;
        section.style.height = `${track.scrollWidth + window.innerHeight}px`;
      };
      setSectionHeight();

      const horizontalScrollTween = gsap.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth + 96),
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-story",
          start: "top top",
          end: () => `+=${track.scrollWidth}`,
          pin: ".hero-story-sticky",
          pinType: "transform",
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefreshInit: setSectionHeight,
        },
      });

      // === Entry de chaque mot/card quand il devient visible dans la track horizontale ===
      wordEls.forEach((word) => {
        gsap.to(word, {
          yPercent: 0,
          opacity: 1,
          duration: 0.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: word,
            containerAnimation: horizontalScrollTween,
            start: "left 85%",
            end: "left 55%",
            toggleActions: "play none none reverse",
          },
        });
      });

      // === Fade-out scène 1 + indicator dès le premier scroll ===
      gsap.to([scene1, scrollIndicator].filter(Boolean), {
        opacity: 0,
        scrollTrigger: {
          trigger: ".hero-story",
          start: "top top",
          end: "top top-=200",
          scrub: true,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="hero-story relative border-b border-border"
    >
      <div className="hero-story-sticky relative h-screen overflow-hidden bg-background">

        {/* Background ambient */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,hsl(var(--muted))_0,transparent_42%)] opacity-70 dark:bg-[radial-gradient(circle_at_top,#18191a_0,transparent_46%)]" />
        <div className="absolute left-1/2 top-24 -z-10 h-64 w-[42rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl dark:bg-[#5e6ad2]/10" />

        {/* SCÈNE 1 — Pain points (intro auto au load, fade-out au premier scroll) */}
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

        {/* PHRASE HORIZONTALE — défile de droite à gauche au scroll */}
        <div className="h-phrase-wrap absolute inset-0 flex items-center overflow-hidden">
          <div className="h-phrase-track flex items-center gap-x-4 whitespace-nowrap will-change-transform pl-[100vw] pr-24">
            {part1Words.map((word, i) => (
              <span
                key={`p1-${i}`}
                className="h-word text-5xl font-semibold tracking-tight text-foreground md:text-7xl lg:text-[5.5rem] lg:leading-[1.05]"
              >
                {word}
              </span>
            ))}

            <div className="h-card-elias mx-2 inline-flex shrink-0 items-stretch overflow-hidden rounded-2xl border border-border bg-card shadow-2xl shadow-foreground/5 dark:border-white/10 dark:bg-[#0f1011]">

              {/* Mini-panel photo (style WhatIBuild image area) */}
              <div className="flex shrink-0 items-center justify-center bg-muted p-3 dark:bg-[#010102]">
                <img
                  src={heroPortrait}
                  alt="Elias"
                  className="h-24 w-20 rounded-xl border border-border object-cover object-[50%_15%] dark:border-white/10 md:h-28 md:w-24 lg:h-32 lg:w-28"
                />
              </div>

              {/* Bloc texte */}
              <div className="flex flex-col justify-center gap-2 px-5 py-4">
                {/* Status badge */}
                <div className="inline-flex items-center gap-1.5 self-start rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-medium text-emerald-600 dark:text-emerald-400 md:text-xs">
                  <span className="size-1.5 rounded-full bg-emerald-500" />
                  Disponible
                </div>

                {/* Nom + séparateur + rôle complet */}
                <div className="flex flex-col gap-2">
                  <p className="text-2xl font-semibold leading-none tracking-tight text-card-foreground md:text-3xl lg:text-4xl">
                    Elias.
                  </p>
                  <div aria-hidden="true" className="h-px w-10 bg-border dark:bg-white/10" />
                  <p className="max-w-[14ch] whitespace-normal text-xs leading-tight text-muted-foreground md:max-w-[16ch] md:text-sm">
                    Consultant en systèmes opérationnels
                  </p>
                </div>
              </div>
            </div>

            {part2Words.map((word, i) => (
              <span
                key={`p2-${i}`}
                className="h-word text-5xl font-semibold tracking-tight text-foreground md:text-7xl lg:text-[5.5rem] lg:leading-[1.05]"
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Scroll indicator (visible scène 1) */}
        <div className="scroll-indicator absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <span>Scroll</span>
          <ChevronDown className="size-4 animate-bounce" />
        </div>

      </div>
    </section>
  );
}
