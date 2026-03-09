import { ScrollReveal } from '@/components/ui/ScrollReveal';
import FeatureSection from '@/components/ui/feature-section';
import { businessInfo } from '@/data/business';
import { Users, FileText, BarChart3, Receipt, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function FeaturedProjectsSection() {
  return (
    <section className="py-16 md:py-24 px-6 lg:px-8 bg-background">
      <ScrollReveal>
        <FeatureSection
          badge="Cas concrets"
          heading="Projets récents"
          headingHighlight="des résultats mesurables pour chaque client."
          description="Je conçois des automatisations qui libèrent du temps et fiabilisent vos processus. Voici quelques exemples concrets."
          badges={['n8n', 'Claude Code', 'Notion', 'CRM']}
          items={businessInfo.projects.map((project) => ({
            title: project.title,
            subtitle: project.result,
            icon: project.tags.includes('CRM') ? <Users className="size-4 text-muted-foreground" /> :
                  project.tags.includes('Notion') ? <FileText className="size-4 text-muted-foreground" /> :
                  project.id === 'reporting-hebdo' ? <BarChart3 className="size-4 text-muted-foreground" /> :
                  <Receipt className="size-4 text-muted-foreground" />,
          }))}
        />
      </ScrollReveal>
      <div className="mt-8 text-center">
        <Link to="/portfolio">
          <Button variant="outline">
            Voir tous les projets
            <ArrowRight className="ml-1 size-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
