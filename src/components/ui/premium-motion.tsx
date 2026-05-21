import { motion, useInView } from "framer-motion";
import { type ReactNode, useRef } from "react";

import { fadeUpVariants, premiumEase } from "./premium-motion-variants";

interface PremiumRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function PremiumReveal({
  children,
  className,
  delay = 0,
}: PremiumRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      variants={fadeUpVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={{ duration: 0.8, delay, ease: premiumEase }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
