import { useRef } from "react";
import { ChevronDown, ClipboardCheck } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import { Button } from "@/components/ui/button";
import { EliasCard } from "@/components/ui/elias-card";
import { useCalEmbed } from "@/hooks/useCalEmbed";

gsap.registerPlugin(ScrollTrigger, SplitText);

const PHRASE_PART_1 = "La plupart des indépendants et petites équipes perdent des heures sur des tâches répétitives. Salut, moi c'est";
const PHRASE_PART_2 = "je construis des systèmes qui améliorent vos process métier";

const part1Words = PHRASE_PART_1.split(/\s+/);
const part2Words = PHRASE_PART_2.split(/\s+/);

// Mots à mettre en évidence dans la phrase horizontale (highlight coloré à l'apparition)
// `visiblePart` permet de ne mettre en surbrillance qu'une partie du mot (ex : "mieux" sans le ".")
// `card` permet d'ajouter une card flottante style "Easy/Easing" (vidéo GSAP) au-dessus du mot
type HighlightConfig = {
  color: "green" | "violet";
  visiblePart?: string;
  card?: { label: string; rotate: number; positionClass?: string };
};

const HIGHLIGHTS: Record<string, HighlightConfig> = {
  "heures": {
    color: "green",
    card: { label: "15h/sem", rotate: -6, positionClass: "top-[calc(100%+0.5rem)] left-0 md:top-[calc(100%+0.6rem)]" },
  },
  "systèmes": {
    color: "violet",
    card: { label: "Automatisé", rotate: 5, positionClass: "-top-10 left-[-0.5em] md:-top-12 lg:-top-14" },
  },
};

const HIGHLIGHT_BG_CLASS: Record<"green" | "violet", string> = {
  green: "bg-emerald-500/20",
  violet: "bg-violet-500/20 dark:bg-[#5e6ad2]/35",
};

const CARD_BG_CLASS: Record<"green" | "violet", string> = {
  green: "bg-gradient-to-br from-emerald-400 to-emerald-600 text-white",
  violet: "bg-gradient-to-br from-violet-500 to-purple-600 text-white",
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
        <span className="relative italic font-medium">{targeted}</span>

        {highlight.card && (
          <span
            className={`h-word-card pointer-events-none absolute ${highlight.card.positionClass ?? "-top-10 right-[-0.5em] md:-top-12 lg:-top-14"} inline-block whitespace-nowrap rounded-xl px-3 py-1.5 text-base font-bold shadow-2xl shadow-black/30 md:px-4 md:py-2 md:text-lg lg:text-xl ${CARD_BG_CLASS[highlight.color]}`}
            data-rotate={highlight.card.rotate}
          >
            {highlight.card.label}
          </span>
        )}
      </span>
      {rest}
    </span>
  );
}

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  const cal = useCalEmbed();

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const section = containerRef.current;
      if (!section) return;

      const sticky = section.querySelector<HTMLElement>(".hero-story-sticky");
      const track = section.querySelector<HTMLElement>(".h-phrase-track");
      const phraseWrap = section.querySelector<HTMLElement>(".h-phrase-wrap");
      const scene1 = section.querySelector<HTMLElement>(".scene-1");
      const scrollIndicator = section.querySelector<HTMLElement>(".scroll-indicator");
      const wordEls = section.querySelectorAll<HTMLElement>(".h-word, .h-card-elias");

      // === Fallback "réduire les animations" (accessibilité) : hero empilé statique ===
      // Uniquement si l'utilisateur a activé prefers-reduced-motion. Mobile inclus,
      // tout le monde a l'animation horizontale ; ici on sert une version sans mouvement :
      // scène 1 (titre + CTA) + card Elias, mots géants et cards flottantes masqués.
      if (reduce) {
        section.style.height = "auto";
        if (sticky) {
          sticky.style.position = "relative";
          sticky.style.height = "auto";
          sticky.style.minHeight = "auto";
          sticky.style.overflow = "visible";
          sticky.style.padding = "6rem 0 4rem";
        }
        // scène 1 en flux normal — sinon elle se superpose à la phrase
        if (scene1) {
          scene1.style.position = "relative";
          scene1.style.inset = "auto";
        }
        if (phraseWrap) {
          phraseWrap.style.position = "relative";
          phraseWrap.style.inset = "auto";
          phraseWrap.style.marginTop = "2.5rem";
          phraseWrap.style.overflow = "visible";
        }
        if (track) {
          track.style.flexWrap = "wrap";
          track.style.whiteSpace = "normal";
          track.style.paddingLeft = "0";
          track.style.paddingRight = "0";
          track.style.justifyContent = "center";
        }
        // mots géants + cards flottantes : illisibles / se chevauchent sur mobile
        section
          .querySelectorAll<HTMLElement>(".h-word, .h-word-card")
          .forEach((el) => {
            el.style.display = "none";
          });
        if (scrollIndicator) scrollIndicator.style.display = "none";
        return;
      }

      // === Intro auto scène 1 — SplitText words + fade-up séquentiel ===
      let titleSplit: ReturnType<typeof SplitText.create> | null = null;
      const titleEl = section.querySelector<HTMLElement>(".scene-1-title");
      if (titleEl) {
        titleSplit = SplitText.create(titleEl, { type: "words" });

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

      // Distance horizontale réelle à parcourir = largeur de la track qui dépasse le viewport.
      // END_PAD règle la position finale du dernier mot ("métier") — augmenter = finit plus à gauche.
      const END_PAD = 96;
      const getTravel = () =>
        Math.max(0, track.scrollWidth - window.innerWidth + END_PAD);

      // Hauteur de section = distance horizontale + 1 viewport (hauteur du sticky épinglé).
      // Avec pinSpacing:false, cette hauteur définit exactement la durée du pin : la section
      // suivante suit immédiatement la fin de la phrase (plus d'écran vide).
      const setSectionHeight = () => {
        section.style.height = `${getTravel() + window.innerHeight}px`;
      };
      setSectionHeight();

      const horizontalScrollTween = gsap.to(track, {
        x: () => -getTravel(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getTravel()}`,
          pin: sticky,
          pinSpacing: false,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefreshInit: setSectionHeight,
        },
      });

      // === Entry de chaque mot/card quand il devient visible ===
      wordEls.forEach((word) => {
        gsap.fromTo(word, {
          yPercent: -60,
          opacity: 0,
        }, {
          yPercent: 0,
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: word,
            containerAnimation: horizontalScrollTween,
            start: "left 85%",
            end: "left 55%",
            scrub: 0.25,
            invalidateOnRefresh: true,
          },
        });
      });

      // === Highlights colorés (scaleX du bg) sur les mots ciblés ===
      const highlightBgs = section.querySelectorAll<HTMLElement>(".h-highlight-bg");
      gsap.set(highlightBgs, { scaleX: 0 });
      highlightBgs.forEach((bg) => {
        const parent = bg.closest<HTMLElement>(".h-word-highlight");
        if (!parent) return;
        gsap.fromTo(bg, {
          scaleX: 0,
        }, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: parent,
            containerAnimation: horizontalScrollTween,
            start: "left 80%",
            end: "left 50%",
            scrub: 0.25,
            invalidateOnRefresh: true,
          },
        });
      });

      // === Cards style "Easy/Easing" — pop au-dessus des mots clés ===
      const wordCards = section.querySelectorAll<HTMLElement>(".h-word-card");
      gsap.set(wordCards, { opacity: 0, y: -30, scale: 0.4, rotation: 0 });
      wordCards.forEach((card) => {
        const targetRotate = parseFloat(card.dataset.rotate ?? "0");
        const parent = card.closest<HTMLElement>(".h-word-highlight");
        if (!parent) return;
        gsap.fromTo(card, {
          opacity: 0,
          y: -30,
          scale: 0.4,
          rotation: 0,
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          rotation: targetRotate,
          ease: "none",
          scrollTrigger: {
            trigger: parent,
            containerAnimation: horizontalScrollTween,
            start: "left 75%",
            end: "left 45%",
            scrub: 0.25,
            invalidateOnRefresh: true,
          },
        });
      });

      // === Fade-out scène 1 + indicator dès le premier scroll ===
      // Plage courte et proportionnelle à la largeur d'écran : la scène 1 disparaît AVANT
      // que le premier mot entre, et en reverse elle ne réapparaît qu'une fois la phrase
      // totalement sortie (plus de chevauchement). autoAlpha = opacity + visibility.
      gsap.to([scene1, scrollIndicator].filter(Boolean), {
        autoAlpha: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `top top-=${window.innerWidth * 0.12}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      const refreshHero = () => {
        setSectionHeight();
        ScrollTrigger.refresh(true);
      };
      const refreshWhenVisible = () => {
        if (document.visibilityState === "visible") refreshHero();
      };

      window.addEventListener("focus", refreshHero);
      window.addEventListener("pageshow", refreshHero);
      document.addEventListener("visibilitychange", refreshWhenVisible);
      document.fonts?.ready.then(refreshHero).catch(() => undefined);

      return () => {
        window.removeEventListener("focus", refreshHero);
        window.removeEventListener("pageshow", refreshHero);
        document.removeEventListener("visibilitychange", refreshWhenVisible);
        titleSplit?.revert();
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="hero-story relative"
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
              Relances de factures, rapports du lundi, onboarding client — j'automatise ces tâches une fois. Votre équipe n'y pense plus.
            </p>
            <div className="scene-1-cta mt-8 flex justify-center md:mt-10">
              <Button
                {...cal}
                size="lg"
                className="h-12 rounded-lg px-6 font-semibold shadow-sm dark:bg-[#5e6ad2] dark:text-white dark:hover:bg-[#828fff]"
              >
                <ClipboardCheck className="mr-2 size-4" />
                Demander un audit
              </Button>
            </div>
          </div>
        </div>

        {/* PHRASE HORIZONTALE — défile de droite à gauche au scroll */}
        <div className="h-phrase-wrap absolute inset-0 flex items-center overflow-hidden">
          <div className="h-phrase-track flex items-center gap-x-4 whitespace-nowrap will-change-transform pl-[100vw] pr-24">
            {part1Words.map((word, i) => renderWord(word, `p1-${i}`))}

            <div className="h-card-elias mx-3 inline-flex shrink-0 items-center md:mx-4">
              <EliasCard />
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
