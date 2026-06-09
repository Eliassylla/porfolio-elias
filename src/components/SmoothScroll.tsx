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

  // ScrollSmoother dégrade le scroll tactile (normalizeScroll = bug iOS connu) :
  // on l'active uniquement sur desktop. Sur mobile, on garde le scroll natif,
  // déjà fluide — d'où le rendu en Fragment sans le wrapper fixed/overflow-hidden.
  const enableSmooth =
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 769px)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useGSAP(() => {
    if (!enableSmooth) return;
    const smoother = ScrollSmoother.create({
      wrapper: wrapperRef.current!,
      content: contentRef.current!,
      smooth: 1.4,
      effects: true,
      normalizeScroll: false,
    });

    const refreshFrame = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh(true);
    });

    return () => {
      window.cancelAnimationFrame(refreshFrame);
      smoother.kill();
    };
  }, { scope: wrapperRef, dependencies: [enableSmooth] });

  if (!enableSmooth) {
    return <>{children}</>;
  }

  return (
    <div ref={wrapperRef} id="smooth-wrapper" style={{ overflow: "hidden", position: "fixed", width: "100%", height: "100%", top: 0, left: 0 }}>
      <div ref={contentRef} id="smooth-content">
        {children}
      </div>
    </div>
  );
}
