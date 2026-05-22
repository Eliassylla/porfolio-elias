import { businessInfo } from '@/data/business';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Receipt, Users, ClipboardList, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const iconMap = {
  receipt: Receipt,
  users: Users,
  clipboard: ClipboardList,
};

const detailsMap: Record<string, string[]> = {
  automatisations: [
    'Tâches répétitives cadrées',
    'Relances et rappels mieux suivis',
    'Moins d\'oublis dans les opérations',
    'Passation claire à votre équipe',
  ],
  'apps-sur-mesure': [
    'Tableaux de bord métier',
    'Interfaces adaptées à vos process',
    'Données regroupées au même endroit',
    'Priorités plus faciles à piloter',
  ],
  'agents-ia': [
    'Aide à la préparation de réponses',
    'Traitement de demandes récurrentes',
    'Support aux tâches répétitives',
    'Garde-fous et validation humaine',
  ],
};

export function ServicesSection() {
  return (
    <section id="services" className="py-24 md:py-32 px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">
              Mes services
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Ce que j'automatise pour vous
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Des systèmes concrets qui libèrent votre temps et éliminent les oublis.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <Tabs defaultValue={businessInfo.services[0]?.id} className="w-full">
            <TabsList className="w-full grid grid-cols-3 h-auto p-1 mb-8">
              {businessInfo.services.map((service) => {
                const Icon = iconMap[service.icon];
                return (
                  <TabsTrigger
                    key={service.id}
                    value={service.id}
                    className="flex flex-col gap-1.5 py-3 px-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                  >
                    <Icon className="size-5" />
                    <span className="text-xs md:text-sm font-medium leading-tight">{service.title}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {businessInfo.services.map((service) => (
              <TabsContent key={service.id} value={service.id}>
                <div className="bg-card border border-border rounded-xl p-8 md:p-10">
                  <p className="text-lg text-card-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <ul className="space-y-3">
                    {detailsMap[service.id]?.map((detail, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="size-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </ScrollReveal>
      </div>
    </section>
  );
}
