import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { FileCheck2, GitBranch, Radar, Rocket } from "lucide-react";
import { useTheme } from "next-themes";

gsap.registerPlugin(ScrollTrigger, SplitText);

const methodSteps = [
  {
    id: "audit",
    number: "01",
    title: "Audit & Cartographie",
    description:
      "Je cartographie vos processus actuels, identifie les goulots d'étranglement et les tâches chronophages.",
    Icon: Radar,
  },
  {
    id: "strategie",
    number: "02",
    title: "Stratégie",
    description:
      "Je définis la solution : les étapes à cadrer, les responsabilités, et le gain attendu.",
    Icon: GitBranch,
  },
  {
    id: "build",
    number: "03",
    title: "Mise en place",
    description:
      "Je construis, teste et ajuste vos systèmes jusqu'à ce qu'ils soient fiables au quotidien.",
    Icon: FileCheck2,
  },
  {
    id: "deploy",
    number: "04",
    title: "Déploiement",
    description:
      "Je documente, forme et livre un système clair, utilisable sans dépendre de moi au quotidien.",
    Icon: Rocket,
  },
];

export default function MethodSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const usesLightPanel = mounted && resolvedTheme === "dark";
  const panelClass = usesLightPanel
    ? "border-black/10 bg-[#f5f6f6] text-[#010102] shadow-black/10"
    : "border-white/10 bg-[#010102] text-white shadow-black/20";
  const cardClass = usesLightPanel
    ? "border-white/10 bg-[#141516] text-white shadow-black/20 group-hover:border-white/20 group-hover:shadow-black/30"
    : "border-black/10 bg-white text-[#010102] shadow-black/5 group-hover:border-black/20 group-hover:shadow-black/10";
  const panelMutedTextClass = usesLightPanel ? "text-[#5f6673]" : "text-white/65";
  const cardMutedTextClass = usesLightPanel ? "text-white/65" : "text-[#5f6673]";
  const softPanelClass = usesLightPanel
    ? "border-black/10 bg-black/[0.03]"
    : "border-white/10 bg-white/[0.04]";
  const iconBoxClass = usesLightPanel
    ? "border-white/10 bg-white/[0.05]"
    : "border-black/10 bg-black/[0.04]";

  useGSAP(
    () => {
      const titleEl = containerRef.current?.querySelector(".method-title");
      const subtitleEl = containerRef.current?.querySelector(".method-subtitle");
      const titleSplit = titleEl
        ? SplitText.create(titleEl, {
            type: "lines",
            aria: "auto",
          })
        : null;
      const subtitleSplit = subtitleEl
        ? SplitText.create(subtitleEl, {
            type: "words",
            aria: "auto",
          })
        : null;
      const titleLines = titleSplit?.lines ?? [];
      const subtitleWords = subtitleSplit?.words ?? [];
      const panel = containerRef.current?.querySelector(".method-panel");
      const cards = gsap.utils.toArray<HTMLElement>(".method-card");

      gsap.set(titleLines, {
        opacity: 0,
        y: 28,
        filter: "blur(4px)",
      });
      gsap.set(subtitleWords, {
        opacity: 0,
        y: 14,
        filter: "blur(3px)",
      });
      gsap.set(panel, {
        opacity: 0,
        y: 42,
        scale: 0.985,
        filter: "blur(8px)",
      });
      gsap.set(cards, {
        opacity: 0,
        y: 34,
        filter: "blur(6px)",
      });

      const timeline = gsap.timeline({
        defaults: {
          ease: "none",
        },
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 78%",
          end: "top 18%",
          scrub: 0.8,
          once: false,
          invalidateOnRefresh: true,
        },
      });

      timeline
        .to(
          titleLines,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.08,
            duration: 0.34,
          },
          0,
        )
        .to(
          subtitleWords,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.012,
            duration: 0.22,
          },
          0.22,
        )
        .to(
          panel,
          {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            duration: 0.38,
          },
          0.28,
        )
        .to(
          cards,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            stagger: 0.045,
            duration: 0.22,
          },
          0.58,
        );

      return () => {
        titleSplit?.revert();
        subtitleSplit?.revert();
      };
    },
    { scope: containerRef },
  );

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-background px-6 py-20 md:py-24 lg:px-8 dark:bg-[#010102]"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-64 bg-gradient-to-b from-muted/60 to-transparent dark:from-white/[0.03]" />

      <div className="mx-auto max-w-7xl">
        <div className="method-header mx-auto mb-14 max-w-[790px] text-center md:mb-16">
          <h2 className="method-title text-4xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-[5rem] lg:leading-[0.95]">
            Un système clair avant la moindre mise en place.
          </h2>
          <p className="method-subtitle mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Chaque mission part de vos processus réels, pas d'un outil à vendre.
          </p>
        </div>

        <div
          className={`method-panel relative overflow-hidden rounded-[2rem] border p-4 shadow-2xl md:p-6 lg:p-8 ${panelClass}`}
        >
          <div className="relative">
            <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <div
                  className={`mb-3 inline-flex rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${softPanelClass} ${panelMutedTextClass}`}
                >
                  Processus
                </div>
                <h3 className="text-3xl font-semibold tracking-tight text-current md:text-5xl">
                  4 étapes, zéro zone floue.
                </h3>
              </div>
              <div
                className={`rounded-2xl border p-4 text-sm md:max-w-xs ${softPanelClass} ${panelMutedTextClass}`}
              >
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-current">
                  <span className="size-1.5 rounded-full bg-blue-400" />
                  Objectif
                </div>
                Systèmes fiables, compréhensibles et adoptés dans votre quotidien.
              </div>
            </div>

            <div className="relative">
              <div className="grid gap-5 lg:grid-cols-4">
                {methodSteps.map((step) => {
                  const Icon = step.Icon;

                  return (
                    <article
                      key={step.id}
                      className="method-card group relative"
                    >
                      <div
                        className={`relative flex h-full flex-col overflow-hidden rounded-2xl border p-5 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-xl md:p-6 ${cardClass}`}
                      >
                        <div className="relative">
                          <div className="mb-7">
                            <p className="font-serif text-6xl leading-none tracking-tight text-current/85 md:text-7xl">
                              {step.number}
                            </p>
                          </div>

                          <div className="mb-5 flex items-center gap-3">
                            <div
                              className={`flex size-9 shrink-0 items-center justify-center rounded-xl border ${iconBoxClass}`}
                            >
                              <Icon className="size-4 text-current" />
                            </div>
                            <h4 className="text-xl font-semibold tracking-tight text-current">
                              {step.title}
                            </h4>
                          </div>

                          <p className={`text-sm leading-7 ${cardMutedTextClass}`}>
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
