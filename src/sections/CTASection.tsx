import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { PremiumReveal } from "@/components/ui/premium-motion";

export default function CTASection() {
  return (
    <section className="bg-background px-6 py-24 md:py-32 lg:px-8">
      <PremiumReveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-2xl border border-border bg-foreground p-8 text-center text-background shadow-2xl shadow-foreground/10 dark:border-white/10 dark:bg-[#0f1011] dark:text-white md:p-14">
          <div className="absolute left-1/2 top-0 h-56 w-[36rem] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-background/10 blur-3xl dark:bg-[#5e6ad2]/15" />
          <div className="relative">
            <div className="mb-5 inline-flex rounded-full border border-background/15 px-3 py-1 text-xs font-medium text-background/70 dark:border-white/10 dark:text-white/60">
              Prochaine étape
            </div>
            <h2 className="mx-auto max-w-3xl text-balance text-4xl font-semibold tracking-tight md:text-6xl">
              Si vous voulez la même chose adapté à votre business, on peut en
              parler.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-background/75 dark:text-white/65">
              Un appel de 20 minutes, gratuit et sans engagement.
            </p>
            <div className="mt-10">
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="secondary"
                  className="h-auto min-h-12 rounded-lg px-5 py-3 text-center font-semibold whitespace-normal dark:bg-white dark:text-black dark:hover:bg-white/90 sm:whitespace-nowrap"
                >
                  Réserver mon appel découverte
                  <ArrowRight className="ml-2 size-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </PremiumReveal>
    </section>
  );
}
