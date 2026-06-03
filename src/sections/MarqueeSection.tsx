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
    <section className="overflow-hidden bg-foreground py-8 md:py-10">
      <div className="flex whitespace-nowrap">
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
              className="text-5xl font-semibold tracking-tight text-background md:text-7xl"
            >
              {word}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
