import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PremiumReveal } from "@/components/ui/premium-motion";

export default function NewsletterSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background px-6 py-24 md:py-32 lg:px-8">
      <div className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-muted/60 to-transparent dark:from-white/[0.03]" />
      <PremiumReveal className="mx-auto max-w-4xl">
        <div className="overflow-hidden rounded-2xl border border-border bg-card p-8 text-center shadow-2xl shadow-foreground/5 dark:border-white/10 dark:bg-[#0f1011] md:p-12">
          <div className="mx-auto mb-6 flex size-12 items-center justify-center rounded-xl border border-border bg-background dark:border-white/10 dark:bg-white/[0.03]">
            <Mail className="size-5 text-muted-foreground" />
          </div>
          <h2 className="mx-auto max-w-2xl text-balance text-4xl font-semibold tracking-tight text-card-foreground md:text-5xl">
            Une automatisation décortiquée par mois
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Chaque mois, je décortique un workflow réel : le problème, la
            solution technique, et comment l'adapter à votre business.
          </p>
          <div className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row">
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
          <p className="mt-4 text-xs text-muted-foreground">
            Pas de spam. Désinscription en un clic.
          </p>
        </div>
      </PremiumReveal>
    </section>
  );
}
