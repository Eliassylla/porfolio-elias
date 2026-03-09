import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function CTASection() {
  return (
    <section className="py-24 md:py-32 px-6 lg:px-8 bg-primary text-primary-foreground">
      <div className="max-w-3xl mx-auto text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Si vous voulez la même chose adapté à votre business, on peut en parler.
          </h2>
          <p className="mt-6 text-lg opacity-90 leading-relaxed">
            Un appel de 20 minutes, gratuit et sans engagement.
          </p>
          <div className="mt-10">
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 font-semibold">
                Réserver mon appel découverte
                <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
