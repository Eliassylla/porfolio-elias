import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NewsletterSection() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 bg-secondary">
      <div className="max-w-2xl mx-auto text-center">
        <ScrollReveal>
          <Mail className="size-10 text-primary mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-secondary-foreground">
            Une automatisation décortiquée par mois
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Chaque mois, je décortique un workflow réel : le problème, la solution technique, et comment l'adapter à votre business.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="votre@email.com"
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
            <Button size="lg" className="px-6 font-semibold">
              S'inscrire
            </Button>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Pas de spam. Désinscription en un clic.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
