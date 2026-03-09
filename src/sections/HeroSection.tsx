import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import heroPortrait from '@/assets/hero-portrait.jpg';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center bg-background overflow-hidden">
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <div>
            <motion.div
              className="flex items-center gap-2 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Disponible pour nouveaux projets
              </span>
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1] text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Automatisation pour entreprises de services
            </motion.h1>

            <motion.p
              className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Je conçois des systèmes concrets pour supprimer vos tâches répétitives et libérer du temps chaque semaine.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Link to="/contact">
                <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white text-base px-7 py-6 font-semibold rounded-lg gap-2">
                  <Calendar className="size-4" />
                  Réserver un audit (30min)
                </Button>
              </Link>
              <Link to="/portfolio">
                <Button size="lg" variant="outline" className="text-base px-7 py-6 font-semibold rounded-lg border-border text-foreground hover:bg-secondary">
                  Voir mes réalisations
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Right — Portrait + Quote */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Main portrait */}
            <div className="relative">
              <div className="w-72 md:w-80 aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border-4 border-background ring-1 ring-border rotate-2">
                <img
                  src={heroPortrait}
                  alt="Elias — Expert automatisation"
                  className="w-full h-full object-cover grayscale"
                />
              </div>

              {/* Quote card */}
              <div className="absolute -bottom-6 -left-8 md:-left-16 bg-card border border-border rounded-xl p-4 shadow-lg max-w-[200px] -rotate-2">
                <p className="text-xs text-muted-foreground italic leading-relaxed">
                  "L'automatisation n'est pas un luxe, c'est l'infrastructure de votre liberté."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
