import { SEOHead } from '@/components/seo/SEOHead';
import { ScrollReveal } from '@/components/ui/ScrollReveal';

import { businessInfo } from '@/data/business';
import { ContactForm } from '@/components/forms/ContactForm';
import { Button } from '@/components/ui/button';
import { CalendarDays, Mail, MapPin } from 'lucide-react';
import { useCalEmbed } from '@/hooks/useCalEmbed';

export default function Contact() {
  const cal = useCalEmbed();

  return (
    <>
      <SEOHead
        title={businessInfo.seo.contact.title}
        description={businessInfo.seo.contact.description}
        image={businessInfo.seo.ogImage}
      />

      <div className="min-h-screen pt-24">
        <section className="bg-primary px-6 py-12 text-primary-foreground md:py-16 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Décrivez ce qui vous ralentit
            </h1>
            <p className="mt-4 text-lg opacity-90 leading-relaxed max-w-2xl">
              Envoyez-moi le contexte. Je vous réponds avec les points à cadrer en priorité et une suite simple.
            </p>
          </div>
        </section>

        <section className="bg-background px-6 py-16 lg:px-8">
          <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-[0.85fr_1.15fr]">
            <ScrollReveal>
              <div className="rounded-2xl border border-border bg-card p-6 dark:border-white/10 dark:bg-[#0f1011] md:p-8">
                <h2 className="mb-4 text-2xl font-semibold tracking-tight text-card-foreground">
                  Ce que j’analyse
                </h2>
                <ul className="space-y-4 text-sm leading-6 text-muted-foreground">
                  <li>Les tâches qui reviennent chaque semaine.</li>
                  <li>Les relances, suivis ou validations qui passent entre les mailles.</li>
                  <li>Les endroits où votre équipe perd du temps à recoller l’information.</li>
                </ul>
                <div className="mt-8 space-y-4 border-t border-border pt-6 dark:border-white/10">
                  <Button {...cal} className="h-auto min-h-12 w-full justify-start gap-3 whitespace-normal p-4 text-left">
                    <CalendarDays className="size-5 shrink-0" />
                    Réserver directement un audit
                  </Button>
                  <a
                    href={`mailto:${businessInfo.email}`}
                    className="flex items-center gap-3 rounded-xl bg-secondary p-4 transition-colors hover:bg-secondary/80"
                  >
                    <Mail className="size-5 text-primary dark:text-[#5e6ad2]" />
                    <span className="text-sm font-medium text-foreground">{businessInfo.email}</span>
                  </a>
                  <div className="flex items-center gap-3 rounded-xl bg-secondary p-4">
                    <MapPin className="size-5 text-primary dark:text-[#5e6ad2]" />
                    <span className="text-sm font-medium text-foreground">{businessInfo.location}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm dark:border-white/10 dark:bg-[#0f1011] md:p-8">
                <div className="mb-8">
                  <p className="mb-3 text-sm font-medium text-muted-foreground">
                    Audit opérationnel
                  </p>
                  <h2 className="text-3xl font-semibold tracking-tight text-card-foreground">
                    Envoyer une demande
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Quelques lignes suffisent : le contexte, le problème, et ce que vous aimeriez rendre plus fiable.
                  </p>
                </div>
                <ContactForm />
              </div>
            </ScrollReveal>
          </div>
        </section>
      </div>
    </>
  );
}
