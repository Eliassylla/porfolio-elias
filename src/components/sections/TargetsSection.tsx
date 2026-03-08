import { businessInfo } from '@/data/business';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';

export function TargetsSection() {
  return (
    <section id="clients" className="py-24 md:py-32 px-6 lg:px-8 bg-background">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">
              Clients cibles
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Vous vous reconnaissez ?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Je travaille avec des PME de services qui veulent arrêter de perdre du temps sur l'administratif.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <Accordion type="single" collapsible defaultValue="conseil" className="w-full">
            {businessInfo.targets.map((target) => (
              <AccordionItem key={target.id} value={target.id} className="border border-border rounded-xl mb-3 px-2 data-[state=open]:bg-card">
                <AccordionTrigger className="text-lg font-semibold text-foreground hover:no-underline py-5 px-4">
                  {target.title}
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {target.description}
                  </p>
                  <div className="flex items-start gap-3 bg-destructive/5 rounded-lg p-4">
                    <AlertTriangle className="size-5 text-destructive mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-destructive font-medium">{target.pain}</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>
      </div>
    </section>
  );
}
