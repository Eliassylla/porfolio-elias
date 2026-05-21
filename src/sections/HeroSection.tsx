import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

import heroPortrait from "@/assets/hero-portrait-real.jpg";
import { Button } from "@/components/ui/button";
import {
  fadeUpVariants,
  premiumEase,
  staggerContainer,
} from "@/components/ui/premium-motion-variants";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden border-b border-border bg-background px-6 py-28 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,hsl(var(--muted))_0,transparent_42%)] opacity-70 dark:bg-[radial-gradient(circle_at_top,#18191a_0,transparent_46%)]" />
      <div className="absolute left-1/2 top-24 -z-10 h-64 w-[42rem] max-w-[90vw] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl dark:bg-[#5e6ad2]/10" />

      <motion.div
        className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[0.95fr_0.85fr]"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center lg:text-left">
          <motion.div
            variants={fadeUpVariants}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/[0.04]"
          >
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Disponible pour nouveaux projets
          </motion.div>

          <motion.h1
            variants={fadeUpVariants}
            className="mx-auto max-w-3xl text-balance text-5xl font-semibold tracking-tight text-foreground md:text-7xl lg:mx-0 lg:text-[5rem] lg:leading-[0.98]"
          >
            Automatisation pour entreprises de services
          </motion.h1>

          <motion.p
            variants={fadeUpVariants}
            className="mx-auto mt-7 max-w-2xl text-pretty text-base leading-8 text-muted-foreground md:text-xl lg:mx-0"
          >
            Je conçois des systèmes concrets pour supprimer vos tâches
            répétitives et libérer du temps chaque semaine.
          </motion.p>

          <motion.div
            variants={fadeUpVariants}
            className="mt-10 flex flex-col items-center gap-3 sm:flex-row lg:items-start"
          >
            <Link to="/contact" className="w-full max-w-xs sm:w-auto">
              <Button
                size="lg"
                className="h-12 w-full rounded-lg px-4 text-center font-semibold whitespace-normal shadow-sm dark:bg-[#5e6ad2] dark:text-white dark:hover:bg-[#828fff] sm:px-6 sm:whitespace-nowrap"
              >
                <Calendar className="mr-2 size-4" />
                Réserver un audit (30min)
              </Button>
            </Link>
            <Link to="/portfolio" className="w-full max-w-xs sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full rounded-lg border-border bg-background/70 px-4 text-center font-semibold whitespace-normal backdrop-blur hover:bg-muted dark:border-white/10 dark:bg-white/[0.03] dark:hover:bg-white/[0.07] sm:px-6 sm:whitespace-nowrap"
              >
                Voir mes réalisations
                <ArrowRight className="ml-2 size-4" />
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          variants={fadeUpVariants}
          whileHover={{ y: -8, rotate: 0 }}
          transition={{ duration: 0.6, ease: premiumEase }}
          className="relative mx-auto w-full max-w-md lg:max-w-lg"
        >
          <div className="absolute -inset-6 rounded-[2rem] bg-primary/5 blur-2xl dark:bg-[#5e6ad2]/12" />
          <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-2xl shadow-foreground/10 dark:border-white/10 dark:bg-[#0f1011]">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted">
              <img
                src={heroPortrait}
                alt="Elias — Expert automatisation"
                className="h-full w-full object-cover object-[50%_15%] grayscale transition duration-1000 hover:scale-[1.03] hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>
          </div>

          <motion.div
            variants={fadeUpVariants}
            className="absolute -bottom-6 left-4 right-4 rounded-xl border border-border bg-card/95 p-4 shadow-lg backdrop-blur dark:border-white/10 dark:bg-[#0f1011]/95 sm:left-auto sm:right-auto sm:w-64"
          >
            <p className="text-sm leading-6 text-muted-foreground">
              "L'automatisation n'est pas un luxe, c'est l'infrastructure de
              votre liberté."
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
