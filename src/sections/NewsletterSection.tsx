import { useRef } from "react";
import { Mail } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { Button } from "@/components/ui/button";
import { GsapTextReveal } from "@/components/ui/gsap-text-reveal";

gsap.registerPlugin(ScrollTrigger);

export default function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from(".newsletter-card", {
        opacity: 0,
        y: 34,
        scale: 0.98,
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".newsletter-card",
          start: "top 78%",
          once: true,
        },
      });

      gsap.from(".newsletter-icon, .newsletter-form, .newsletter-note", {
        opacity: 0,
        y: 16,
        stagger: 0.1,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".newsletter-card",
          start: "top 76%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-border bg-background px-6 py-24 md:py-32 lg:px-8"
    >
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-muted/60 to-transparent dark:from-white/[0.03]" />
      <div className="mx-auto max-w-4xl">
        <div className="newsletter-card overflow-hidden rounded-2xl border border-border bg-card p-8 text-center shadow-2xl shadow-foreground/5 dark:border-white/10 dark:bg-[#0f1011] md:p-12">
          <div className="newsletter-icon mx-auto mb-6 flex size-12 items-center justify-center rounded-xl border border-border bg-background dark:border-white/10 dark:bg-white/[0.03]">
            <Mail className="size-5 text-muted-foreground" />
          </div>
          <GsapTextReveal
            as="h2"
            className="mx-auto max-w-2xl text-4xl font-semibold tracking-tight text-card-foreground md:text-5xl"
            split="lines"
            mask="lines"
            y="105%"
            stagger={0.09}
            duration={0.75}
            blur={0}
          >
            Une automatisation décortiquée par mois
          </GsapTextReveal>
          <GsapTextReveal
            as="p"
            className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground"
            split="words"
            y={14}
            stagger={0.025}
            blur={3}
          >
            Chaque mois, je décortique un problème métier : le blocage, le
            système mis en place, et comment l'adapter à votre activité.
          </GsapTextReveal>
          <div className="newsletter-form mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="votre@email.com"
              className="h-12 flex-1 rounded-lg border border-border bg-background px-4 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring dark:border-white/10 dark:bg-[#010102]"
            />
            <Button
              size="lg"
              className="h-12 rounded-lg px-6 font-semibold dark:bg-[#5e6ad2] dark:text-white dark:hover:bg-[#828fff]"
            >
              S'inscrire
            </Button>
          </div>
          <p className="newsletter-note mt-4 text-xs text-muted-foreground">
            Pas de spam. Désinscription en un clic.
          </p>
        </div>
      </div>
    </section>
  );
}
