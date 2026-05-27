import { useRef, type ReactNode } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

interface SmoothScrollProps {
  children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current!,
      content: contentRef.current!,
      smooth: 1.4,
      effects: true,
      normalizeScroll: true,
    });

    return () => smoother.kill();
  }, { scope: wrapperRef });

  return (
    <div ref={wrapperRef} id="smooth-wrapper" style={{ overflow: "hidden", position: "fixed", width: "100%", height: "100%", top: 0, left: 0 }}>
      <div ref={contentRef} id="smooth-content">
        {children}
      </div>
    </div>
  );
}
