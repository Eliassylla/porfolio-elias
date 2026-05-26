import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

interface AutomationSvgProps {
  src?: string;
  className?: string;
}

export function AutomationSvg({
  src = "/automation-2.svg",
  className,
}: AutomationSvgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgMarkup, setSvgMarkup] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((res) => res.text())
      .then((text) => {
        if (cancelled) return;
        setSvgMarkup(text);
      })
      .catch((err) => {
        console.error(`AutomationSvg: failed to load ${src}`, err);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root || !svgMarkup) return;

      const nodes = root.querySelectorAll<SVGGElement>("#nodes > g");
      const lines = root.querySelectorAll<SVGElement>(
        "#line, #line-2, #line-3, #line-4, #line-5",
      );

      if (nodes.length === 0 || lines.length === 0) return;

      // États initiaux — tout caché
      gsap.set(nodes, { scale: 0, autoAlpha: 0, transformOrigin: "center center" });
      gsap.set(lines, { drawSVG: 0 });

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // 1. Webhook + ai-agent apparaissent
      intro.to("#node-webhook, #node-ai-agent", {
        scale: 1,
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: "back.out(2)",
      });

      // 2. Ligne webhook → ai-agent se dessine
      intro.to("#line-5", { drawSVG: "100%", duration: 0.5, ease: "power2.out" }, "-=0.2");

      // 3. Nodes destination apparaissent
      intro.to(
        "#node-code, #node-memory, #node-notion, #node-perplexity",
        { scale: 1, autoAlpha: 1, duration: 0.4, stagger: 0.1, ease: "back.out(2)" },
        "+=0.1",
      );

      // 4. Lignes sortantes se dessinent
      intro.to(
        "#line, #line-2, #line-3, #line-4",
        { drawSVG: "100%", duration: 0.55, stagger: 0.1, ease: "power2.out" },
        "<",
      );
    },
    { scope: containerRef, dependencies: [svgMarkup] },
  );

  return (
    <div
      ref={containerRef}
      className={className}
      dangerouslySetInnerHTML={{ __html: svgMarkup }}
    />
  );
}
