import { type ElementType, type ReactNode, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

type GsapTextRevealProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  split?: "words" | "lines";
  mask?: "words" | "lines";
  start?: string;
  end?: string;
  scrub?: boolean | number;
  once?: boolean;
  y?: number | string;
  stagger?: number;
  duration?: number;
  blur?: number;
};

export function GsapTextReveal({
  as: Tag = "div",
  children,
  className,
  split = "words",
  mask,
  start = "top 78%",
  end = "top 42%",
  scrub = false,
  once = true,
  y = 18,
  stagger = 0.045,
  duration = 0.7,
  blur = 4,
}: GsapTextRevealProps) {
  const textRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const element = textRef.current;
      if (!element) return;

      const splitText = SplitText.create(element, {
        type: split,
        mask,
        aria: "auto",
      });
      const targets = split === "lines" ? splitText.lines : splitText.words;

      const tween = gsap.from(targets, {
        opacity: 0,
        y,
        filter: blur > 0 ? `blur(${blur}px)` : "blur(0px)",
        stagger,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start,
          end: scrub ? end : undefined,
          scrub,
          once,
        },
      });

      return () => {
        tween.kill();
        splitText.revert();
      };
    },
    { scope: textRef },
  );

  return (
    <Tag ref={textRef} className={className}>
      {children}
    </Tag>
  );
}
