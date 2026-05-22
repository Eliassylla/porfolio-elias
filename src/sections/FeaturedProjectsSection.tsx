import { motion } from "motion/react";
import { ArrowRight, BarChart3, FileText, Receipt, Users } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  fadeUpVariants,
  staggerContainer,
} from "@/components/ui/premium-motion-variants";
import { businessInfo } from "@/data/business";

const projectIcons = [Receipt, Users, FileText, BarChart3];

export default function FeaturedProjectsSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-background px-6 py-24 md:py-32 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            variants={fadeUpVariants}
            className="mb-4 inline-flex rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground dark:border-white/10 dark:bg-white/[0.04]"
          >
            Cas concrets
          </motion.div>
          <motion.h2
            variants={fadeUpVariants}
            className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-6xl"
          >
            Projets récents{" "}
            <span className="text-muted-foreground">
              des résultats mesurables pour chaque client.
            </span>
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted-foreground"
          >
            Je pars de situations concrètes : argent à relancer, dossiers à
            suivre, informations à remettre au bon endroit.
          </motion.p>
        </motion.div>

        <motion.div
          className="mx-auto mt-14 max-w-3xl"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div
            variants={fadeUpVariants}
            className="overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm dark:border-white/10 dark:bg-[#0f1011]"
          >
            <div className="mb-4 flex items-center justify-between px-2">
              <p className="text-sm font-medium text-muted-foreground">
                Situations traitées
              </p>
              <div className="flex gap-1.5">
                <span className="size-2 rounded-full bg-muted-foreground/40" />
                <span className="size-2 rounded-full bg-muted-foreground/25" />
                <span className="size-2 rounded-full bg-muted-foreground/15" />
              </div>
            </div>
            <div className="relative h-[410px] overflow-hidden rounded-xl border border-border bg-background dark:border-white/10 dark:bg-[#010102]">
              <motion.div
                className="flex flex-col"
                animate={{ y: ["0%", "-50%"] }}
                transition={{
                  y: {
                    duration: businessInfo.projects.length * 2.6,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                  },
                }}
              >
                {[...businessInfo.projects, ...businessInfo.projects].map(
                  (project, index) => {
                    const Icon = projectIcons[index % projectIcons.length];

                    return (
                      <div
                        key={`${project.id}-${index}`}
                        className="flex items-start justify-between gap-5 border-b border-border px-5 py-5 dark:border-white/10"
                      >
                        <div className="flex items-start gap-4">
                          <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted dark:border-white/10 dark:bg-white/[0.04]">
                            <Icon className="size-4 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">
                              {project.title}
                            </p>
                            <p className="mt-1 text-xs leading-5 text-muted-foreground">
                              {project.result}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="mt-2 size-4 shrink-0 text-muted-foreground" />
                      </div>
                    );
                  },
                )}
              </motion.div>
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-background to-transparent dark:from-[#010102]" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent dark:from-[#010102]" />
            </div>
          </motion.div>

        </motion.div>

        <div className="mt-10 text-center">
          <Link to="/portfolio">
            <Button variant="outline" className="h-11 rounded-lg">
              Voir tous les projets
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
