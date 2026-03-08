import { businessInfo } from '@/data/business';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { Badge } from '@/components/ui/badge';
import { MessageSquareQuote } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export function TestimonialsSection() {
  return (
    <section id="temoignages" className="py-24 md:py-32 px-6 lg:px-8 bg-secondary">
      <div className="max-w-4xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-1 bg-background">
              Témoignages
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-secondary-foreground">
              Ce qu'en disent mes clients
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="px-12">
            <Carousel opts={{ align: 'start', loop: true }} className="w-full">
              <CarouselContent>
                {businessInfo.testimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/2">
                    <div className="bg-card border border-border rounded-xl p-8 h-full flex flex-col">
                      <MessageSquareQuote className="size-8 text-primary/30 mb-4" />
                      <blockquote className="text-card-foreground leading-relaxed flex-1 italic">
                        "{testimonial.quote}"
                      </blockquote>
                      <div className="mt-6 pt-4 border-t border-border flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                          {testimonial.author.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-card-foreground">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
