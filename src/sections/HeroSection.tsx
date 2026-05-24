import { useRef } from "react";
import { ChevronDown, ClipboardCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import heroPortrait from "@/assets/hero-portrait-real.jpg";
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger, SplitText);

const PHRASE_PART_1 = "Vos opérations méritent mieux Salut, moi c'est";
const PHRASE_PART_2 = "et je construis les systèmes qui enlèvent les oublis avant qu'ils coûtent.";

const part1Words = PHRASE_PART_1.split(/\s+/);
const part2Words = PHRASE_PART_2.split(/\s+/);

// Mots à mettre en évidence dans la phrase horizontale (highlight coloré à l'apparition)
// `visiblePart` permet de ne mettre en surbrillance qu'une partie du mot (ex : "mieux" sans le ".")
type HighlightConfig = { color: "green" | "violet"; visiblePart?: string };

const HIGHLIGHTS: Record<string, HighlightConfig> = {
  "mieux": { color: "green", visiblePart: "mieux" },
  "systèmes": { color: "violet" },
};

const HIGHLIGHT_BG_CLASS: Record<"green" | "violet", string> = {
  green: "bg-emerald-500/20",
  violet: "bg-primary/25 dark:bg-[#5e6ad2]/35",
};

const WORD_BASE_CLASS =
  "h-word text-5xl font-semibold tracking-tight text-foreground md:text-7xl lg:text-[5.5rem] lg:leading-[1.05]";

function renderWord(word: string, key: string) {
  const highlight = HIGHLIGHTS[word];
  if (!highlight) {
    return (
      <span key={key} className={WORD_BASE_CLASS}>
        {word}
      </span>
    );
  }
  const targeted = highlight.visiblePart ?? word;
  const rest = highlight.visiblePart ? word.slice(highlight.visiblePart.length) : "";
  return (
    <span key={key} className={WORD_BASE_CLASS}>
      <span className="h-word-highlight relative inline-block">
        <span
          aria-hidden="true"
          className={`h-highlight-bg pointer-events-none absolute inset-x-[-0.12em] -inset-y-[0.12em] origin-left rounded-md ${HIGHLIGHT_BG_CLASS[highlight.color]}`}
        />
        <span className="relative">{targeted}</span>
      </span>
      {rest}
    </span>
  );
}

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

      // === Intro auto scène 1 — SplitText words + fade-up séquentiel ===
      const titleEl = section.querySelector<HTMLElement>(".scene-1-title");
      if (titleEl) {
        const titleSplit = SplitText.create(titleEl, { type: "words" });

        gsap.set(titleSplit.words, { opacity: 0, y: 40 });
        gsap.set(".scene-1-sub", { opacity: 0, y: 20 });
        gsap.set(".scene-1-cta", { opacity: 0, y: 20 });
        gsap.set(".scroll-indicator", { opacity: 0, y: 20 });

        const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });
        introTl
          .to(titleSplit.words, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 })
          .to(".scene-1-sub", { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
          .to(".scene-1-cta", { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
          .to(".scroll-indicator", { opacity: 1, y: 0, duration: 0.4 }, "+=0.1");
      }

      // === États initiaux phrase horizontale ===
      if (!track || wordEls.length === 0) return;

      gsap.set(wordEls, { yPercent: -60, opacity: 0 });

      // Hauteur dynamique de la section parent : aligne la durée de scroll
      // vertical avec la durée de la phrase horizontale.
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

      // === Entry de chaque mot/card quand il devient visible ===
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

      // === Highlights colorés (scaleX du bg) sur les mots ciblés ===
      const highlightBgs = section.querySelectorAll<HTMLElement>(".h-highlight-bg");
      gsap.set(highlightBgs, { scaleX: 0 });
      highlightBgs.forEach((bg) => {
        const parent = bg.closest<HTMLElement>(".h-word-highlight");
        if (!parent) return;
        gsap.to(bg, {
          scaleX: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: parent,
            containerAnimation: horizontalScrollTween,
            start: "left 80%",
            end: "left 50%",
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

        {/* SCÈNE 1 — Titre valeur + sous-titre pain compact + CTA */}
        <div className="scene-1 absolute inset-0 flex flex-col items-center justify-center px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="scene-1-title text-5xl font-semibold tracking-tight text-foreground md:text-7xl lg:text-[5.5rem] lg:leading-[1.05]">
              Vos opérations méritent mieux.
            </h1>
            <p className="scene-1-sub mx-auto mt-6 max-w-xl text-base leading-7 text-muted-foreground md:mt-8 md:text-lg">
              Factures oubliées, devis sans suite, infos dispersées. Chaque semaine, votre entreprise perd du temps.
            </p>
            <div className="scene-1-cta mt-8 flex justify-center md:mt-10">
              <Link to="/contact">
                <Button
                  size="lg"
                  className="h-12 rounded-lg px-6 font-semibold shadow-sm dark:bg-[#5e6ad2] dark:text-white dark:hover:bg-[#828fff]"
                >
                  <ClipboardCheck className="mr-2 size-4" />
                  Demander un audit
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* PHRASE HORIZONTALE — défile de droite à gauche au scroll */}
        <div className="h-phrase-wrap absolute inset-0 flex items-center overflow-hidden">
          <div className="h-phrase-track flex items-center gap-x-4 whitespace-nowrap will-change-transform pl-[100vw] pr-24">
            {part1Words.map((word, i) => renderWord(word, `p1-${i}`))}

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

            {part2Words.map((word, i) => renderWord(word, `p2-${i}`))}
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
