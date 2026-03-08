import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { Phone, Search, Zap } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const steps = [
  {
    number: '01',
    icon: Phone,
    title: 'Appel découverte',
    description: '20 minutes pour comprendre votre quotidien, vos outils et identifier les tâches qui vous coûtent le plus de temps.',
  },
  {
    number: '02',
    icon: Search,
    title: 'Audit & proposition',
    description: 'Je cartographie vos processus et vous présente un plan d\'automatisation clair, avec le ROI estimé.',
  },
  {
    number: '03',
    icon: Zap,
    title: 'Mise en place',
    description: 'Je construis, teste et déploie vos automatisations. Vous êtes opérationnel en quelques jours, pas en mois.',
  },
];

export function ProcessSection() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 bg-secondary">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-1 bg-background">
              Comment ça marche
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-secondary-foreground">
              3 étapes, c'est tout
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-0 md:gap-0 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-px bg-border" />

          {steps.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 0.2}>
              <div className="relative flex flex-col items-center text-center px-6 py-8">
                {/* Step number circle */}
                <div className="relative z-10 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg font-bold mb-6 shadow-lg">
                  {step.number}
                </div>

                <step.icon className="size-6 text-muted-foreground mb-4" />
                
                <h3 className="text-xl font-semibold text-secondary-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-sm">
                  {step.description}
                </p>

                {/* Separator for mobile between steps */}
                {index < steps.length - 1 && (
                  <Separator className="md:hidden mt-8 w-16 mx-auto" />
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
