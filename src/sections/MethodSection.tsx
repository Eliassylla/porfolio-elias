import { motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";

import {
  fadeUpVariants,
  staggerContainer,
} from "@/components/ui/premium-motion-variants";
import { businessInfo } from "@/data/business";

export default function MethodSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-muted/30 px-6 py-24 md:py-32 lg:px-8 dark:bg-[#010102]">
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        <motion.div
          className="lg:sticky lg:top-28 lg:self-start"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={fadeUpVariants}
            className="mb-4 inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground dark:border-white/10 dark:bg-white/[0.04]"
          >
            Méthode
          </motion.div>
          <motion.h2
            variants={fadeUpVariants}
            className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-6xl"
          >
            Un système clair avant la moindre mise en place.
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="mt-6 max-w-xl text-lg leading-8 text-muted-foreground"
          >
            Chaque mission part de vos processus réels, pas d'un outil à vendre.
            L'objectif : construire simple, robuste, puis vous rendre autonome.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {businessInfo.process.map((step) => (
            <motion.article
              key={step.id}
              variants={fadeUpVariants}
              whileHover={{ x: 10, scale: 1.01 }}
              transition={{ duration: 0.35 }}
              className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-colors hover:bg-background dark:border-white/10 dark:bg-[#0f1011] dark:hover:bg-[#141516] md:p-8"
            >
              <div className="flex flex-col gap-6 md:flex-row md:items-start">
                <div className="flex items-center gap-4 md:w-44 md:shrink-0">
                  <div className="flex size-11 items-center justify-center rounded-lg border border-border bg-background text-sm font-semibold text-muted-foreground transition-colors group-hover:text-foreground dark:border-white/10 dark:bg-white/[0.03]">
                    {step.number}
                  </div>
                  <CheckCircle2 className="size-5 text-emerald-500" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground md:text-base">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
