import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { CheckCircle2, FileCheck2, GitBranch, Radar, Rocket } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const methodSteps = [
  {
    id: "audit",
    number: "01",
    label: "Analyse",
    title: "Audit & Cartographie",
    description:
      "Je cartographie vos processus actuels, identifie les goulots d'étranglement et les tâches chronophages.",
    detailTitle: "Scan opérationnel",
    detail: ["Tâches répétitives", "Pertes de temps", "Points de friction"],
    Icon: Radar,
  },
  {
    id: "strategie",
    number: "02",
    label: "Plan",
    title: "Stratégie",
    description:
      "Je définis la solution : les étapes à cadrer, les responsabilités, et le gain attendu.",
    detailTitle: "Priorisation",
    detail: ["Impact", "Effort", "Risque"],
    Icon: GitBranch,
  },
  {
    id: "build",
    number: "03",
    label: "Build",
    title: "Mise en place",
    description:
      "Je construis, teste et ajuste vos systèmes jusqu'à ce qu'ils soient fiables au quotidien.",
    detailTitle: "Production",
    detail: ["Conception", "Tests", "Ajustements"],
    Icon: FileCheck2,
  },
  {
    id: "deploy",
    number: "04",
    label: "Livraison",
    title: "Déploiement",
    description:
      "Je documente, forme et livre un système clair, utilisable sans dépendre de moi au quotidien.",
    detailTitle: "Handover",
    detail: ["Documentation", "Formation", "Support"],
    Icon: Rocket,
  },
];

export default function MethodSection() {
  const containerRef = useRef<HTMLElement>(null);

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
        .from(".method-eyebrow", {
          opacity: 0,
          y: 18,
          duration: 0.12,
        })
        .from(
          titleSplit?.lines ?? [],
          {
            opacity: 0,
            y: 28,
            filter: "blur(4px)",
            stagger: 0.08,
            duration: 0.34,
          },
          0.04,
        )
        .from(
          subtitleSplit?.words ?? [],
          {
            opacity: 0,
            y: 14,
            filter: "blur(3px)",
            stagger: 0.012,
            duration: 0.22,
          },
          0.22,
        )
        .from(
          ".method-panel",
          {
            opacity: 0,
            y: 42,
            scale: 0.985,
            filter: "blur(8px)",
            duration: 0.38,
          },
          0.28,
        )
        .from(
          ".method-rail-line",
          {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 0.26,
          },
          0.48,
        )
        .from(
          ".method-mobile-line",
          {
            scaleY: 0,
            transformOrigin: "top center",
            duration: 0.26,
          },
          0.48,
        )
        .from(
          ".method-node",
          {
            opacity: 0,
            scale: 0.45,
            stagger: 0.035,
            duration: 0.16,
          },
          0.5,
        )
        .from(
          ".method-card",
          {
            opacity: 0,
            y: 34,
            filter: "blur(6px)",
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
        <div className="method-header mx-auto mb-14 max-w-3xl text-center md:mb-16">
          <div className="method-eyebrow mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-sm dark:border-white/10 dark:bg-white/[0.04]">
            <span className="size-1.5 rounded-full bg-blue-400" />
            Méthode
          </div>
          <h2 className="method-title text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Un système clair avant la moindre mise en place.
          </h2>
          <p className="method-subtitle mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
            Chaque mission part de vos processus réels, pas d'un outil à vendre.
          </p>
        </div>

        <div className="method-panel relative overflow-hidden rounded-[2rem] border border-border bg-card p-4 shadow-2xl shadow-foreground/5 dark:border-white/10 dark:bg-[#0f1011] md:p-6 lg:p-8">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.62),transparent)] opacity-35 dark:bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)]" />
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-blue-400 opacity-20 blur-3xl" />
            <div className="absolute -right-16 top-12 h-72 w-72 rounded-full bg-indigo-400 opacity-15 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300 opacity-10 blur-3xl" />
          </div>

          <div className="relative">
            <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="mb-3 inline-flex rounded-full border border-border bg-background/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground dark:border-white/10 dark:bg-white/[0.03]">
                  Processus
                </div>
                <h3 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
                  4 étapes, zéro zone floue.
                </h3>
              </div>
              <div className="rounded-2xl border border-border bg-background/75 p-4 text-sm text-muted-foreground dark:border-white/10 dark:bg-white/[0.03] md:max-w-xs">
                <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-foreground">
                  <span className="size-1.5 rounded-full bg-blue-400" />
                  Objectif
                </div>
                Systèmes fiables, compréhensibles et adoptés dans votre quotidien.
              </div>
            </div>

            <div className="relative lg:pt-20">
              <div className="method-rail-line absolute left-[12.5%] right-[12.5%] top-9 hidden h-px bg-border dark:bg-white/15 lg:block" />
              <div className="method-mobile-line absolute bottom-4 left-5 top-2 w-px bg-border dark:bg-white/15 lg:hidden" />

              <div className="grid gap-5 lg:grid-cols-4">
                {methodSteps.map((step) => {
                  const Icon = step.Icon;

                  return (
                    <article
                      key={step.id}
                      className="method-card group relative pl-12 lg:pl-0"
                    >
                      <div className="method-node absolute left-0 top-1 z-10 flex size-10 items-center justify-center rounded-full border border-border bg-background shadow-lg shadow-foreground/5 dark:border-white/15 dark:bg-[#151719] lg:left-1/2 lg:top-[-4rem] lg:-translate-x-1/2">
                        <span className="size-2 rounded-full bg-blue-300 ring-4 ring-blue-300/20" />
                      </div>

                      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background/85 p-5 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-foreground/20 group-hover:shadow-xl group-hover:shadow-foreground/5 dark:border-white/10 dark:bg-[#141516] md:p-6">
                        <div className="absolute inset-0 opacity-[0.18] [background-image:radial-gradient(hsl(var(--muted-foreground))_1px,transparent_1px)] [background-size:18px_18px] dark:opacity-[0.08]" />
                        <div className="relative">
                          <div className="mb-7 flex items-start justify-between gap-4">
                            <p className="font-serif text-6xl leading-none tracking-tight text-foreground/85 md:text-7xl">
                              {step.number}
                            </p>
                            <div className="flex items-center gap-1.5 rounded-full border border-border bg-card px-2.5 py-1 text-xs font-medium text-muted-foreground dark:border-white/10 dark:bg-white/[0.04]">
                              <span className="size-1.5 rounded-full bg-blue-300" />
                              {step.label}
                            </div>
                          </div>

                          <div className="mb-5 flex items-center gap-3">
                            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border bg-card dark:border-white/10 dark:bg-white/[0.04]">
                              <Icon className="size-4 text-foreground" />
                            </div>
                            <h4 className="text-xl font-semibold tracking-tight text-foreground">
                              {step.title}
                            </h4>
                          </div>

                          <p className="text-sm leading-7 text-muted-foreground">
                            {step.description}
                          </p>

                          <div className="mt-7 rounded-xl border border-border bg-card/80 p-4 dark:border-white/10 dark:bg-white/[0.03]">
                            <div className="mb-3 flex items-center justify-between gap-3">
                              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                                {step.detailTitle}
                              </p>
                              <span className="h-px flex-1 bg-border dark:bg-white/10" />
                            </div>
                            <div className="space-y-2.5">
                              {step.detail.map((item) => (
                                <div
                                  key={item}
                                  className="flex items-center gap-2 text-xs text-muted-foreground"
                                >
                                  <CheckCircle2 className="size-3.5 text-blue-500 dark:text-blue-300" />
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
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
