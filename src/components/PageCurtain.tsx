import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function PageCurtain() {
  const curtainRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(curtainRef.current, {
      yPercent: -100,
      duration: 0.9,
      ease: "power3.inOut",
      delay: 0.15,
      onComplete: () => {
        if (curtainRef.current) curtainRef.current.style.display = "none";
      },
    });
  });

  return (
    <div
      ref={curtainRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        background: "hsl(var(--background))",
      }}
    />
  );
}
