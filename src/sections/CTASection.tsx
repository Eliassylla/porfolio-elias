import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Button } from "@/components/ui/button";
import { GsapTextReveal } from "@/components/ui/gsap-text-reveal";
import { useCalEmbed } from "@/hooks/useCalEmbed";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const cal = useCalEmbed();

  useGSAP(
    () => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".cta-panel",
          start: "top 78%",
          once: true,
        },
      });

      timeline
        .from(".cta-panel", {
          opacity: 0,
          y: 34,
          scale: 0.98,
          duration: 0.75,
          ease: "power3.out",
        })
        .from(
          ".cta-action",
          {
            opacity: 0,
            y: 16,
            duration: 0.55,
            ease: "power2.out",
          },
          "-=0.35",
        );
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="bg-background px-6 py-20 md:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-6xl">
        <div className="cta-panel relative overflow-hidden rounded-2xl border border-border bg-foreground p-8 text-center text-background shadow-2xl shadow-foreground/10 dark:border-white/10 dark:bg-[#0f1011] dark:text-white md:p-14">
          <div className="absolute left-1/2 top-0 h-56 w-[36rem] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/10 blur-3xl dark:bg-[#5e6ad2]/15" />
          <div className="relative">
            <GsapTextReveal
              as="h2"
              className="mx-auto max-w-[790px] text-4xl font-semibold tracking-tight md:text-6xl lg:text-[5rem] lg:leading-[0.95]"
              split="lines"
              mask="lines"
              y="105%"
              stagger={0.09}
              duration={0.8}
              blur={0}
            >
              Si votre équipe compense les mêmes oublis chaque semaine, il est
              temps de cadrer le système.
            </GsapTextReveal>
            <GsapTextReveal
              as="p"
              className="mx-auto mt-6 max-w-xl text-lg leading-8 text-background/75 dark:text-white/65"
              split="words"
              y={14}
              stagger={0.025}
              blur={2}
            >
              Décrivez le blocage. Je vous réponds avec une première lecture
              claire.
            </GsapTextReveal>
            <div className="cta-action mt-10">
              <Button
                {...cal}
                size="lg"
                variant="secondary"
                className="h-auto min-h-12 rounded-lg px-5 py-3 text-center font-semibold whitespace-normal dark:bg-white dark:text-black dark:hover:bg-white/90 sm:whitespace-nowrap"
              >
                Décrire mon besoin
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
