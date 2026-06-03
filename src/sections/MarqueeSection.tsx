import { motion } from "motion/react";

const words = [
  "Automatiser",
  "Clarifier",
  "Déléguer",
  "Mesurer",
  "Fiabiliser",
  "Simplifier",
];

export default function MarqueeSection() {
  const items = [...words, ...words, ...words];

  return (
    <section className="overflow-hidden bg-background py-8 md:py-10 dark:bg-[#010102]">
      <div className="group flex whitespace-nowrap">
        <motion.div
          className="flex min-w-max items-center gap-8 pr-8"
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {items.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="text-5xl font-semibold tracking-tight text-transparent [-webkit-text-stroke:1px_hsl(var(--muted-foreground)/0.32)] transition-colors duration-500 group-hover:text-foreground md:text-7xl dark:[-webkit-text-stroke:1px_rgba(247,248,248,0.2)]"
            >
              {word}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
