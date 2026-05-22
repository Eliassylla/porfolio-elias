import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { businessInfo } from "@/data/business";

gsap.registerPlugin(ScrollTrigger);

const steps = businessInfo.process;

export default function MethodSection() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Titre + sous-titre
    gsap.from(".method-header > *", {
      opacity: 0,
      y: 24,
      stagger: 0.12,
      duration: 0.7,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".method-header",
        start: "top 80%",
      },
    });

    // Ligne de connexion qui se dessine de gauche à droite
    gsap.from(".method-line", {
      scaleX: 0,
      transformOrigin: "left center",
      duration: 1.2,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: ".method-steps",
        start: "top 70%",
      },
    });

    // Cartes qui montent en stagger
    gsap.from(".method-card", {
      opacity: 0,
      y: 50,
      stagger: 0.18,
      duration: 0.7,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".method-steps",
        start: "top 72%",
      },
    });

    // Numéros qui "pop" après les cartes
    gsap.from(".method-number", {
      scale: 0.4,
      opacity: 0,
      stagger: 0.18,
      duration: 0.5,
      ease: "back.out(1.7)",
      delay: 0.2,
      scrollTrigger: {
        trigger: ".method-steps",
        start: "top 72%",
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden border-b border-border bg-muted/30 px-6 py-24 md:py-32 lg:px-8 dark:bg-[#010102]"
    >
      <div className="mx-auto max-w-7xl">

        {/* En-tête */}
        <div className="method-header mx-auto mb-20 max-w-2xl text-center">
          <div className="mb-4 inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground dark:border-white/10 dark:bg-white/[0.04]">
            Méthode
          </div>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
            Un système clair avant la moindre mise en place.
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Chaque mission part de vos processus réels, pas d'un outil à vendre.
          </p>
        </div>

        {/* Steps horizontaux */}
        <div className="method-steps relative">

          {/* Ligne de connexion */}
          <div className="method-line absolute top-[2.75rem] left-[calc(1/6*100%)] right-[calc(1/6*100%)] hidden h-px bg-border md:block dark:bg-white/10" />

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.id} className="method-card group relative flex flex-col items-center text-center md:items-start md:text-left">

                {/* Numéro */}
                <div className="method-number relative z-10 mb-6 flex size-11 items-center justify-center rounded-full border border-border bg-background text-sm font-semibold tabular-nums text-muted-foreground shadow-sm transition-colors group-hover:border-foreground/40 group-hover:text-foreground dark:border-white/10 dark:bg-[#0f1011]">
                  {step.number}
                </div>

                {/* Contenu */}
                <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-6 shadow-sm transition-all duration-300 group-hover:border-foreground/20 group-hover:shadow-md dark:border-white/10 dark:bg-[#0f1011]">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
