import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[60] h-0.5 w-full origin-left bg-foreground dark:bg-[#5e6ad2]"
      style={{ scaleX }}
    />
  );
}
