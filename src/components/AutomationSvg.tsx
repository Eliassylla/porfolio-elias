import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

interface AutomationSvgProps {
  src?: string;
  className?: string;
  labelColor?: string;
}

// Labels positionnés juste sous l'icône de chaque node
// Top nodes : icônes finissent vers y≈5 (webhook) et y≈7 (ai-agent, code)
// Bottom nodes : icônes finissent vers y≈29-31 dans leurs rects (y=23.21 à y=32.33)
const buildLabels = (fill: string) => `
  <g id="labels" font-size="1.5" fill="${fill}" text-anchor="middle" font-family="system-ui,sans-serif">
    <text id="label-webhook"    x="6.44"  y="9.5">webhook</text>
    <text id="label-ai-agent"   x="33.31" y="9.5">ai-agent</text>
    <text id="label-code"       x="60.18" y="9.5">code</text>
    <text id="label-perplexity" x="16.16" y="31.0">model</text>
    <text id="label-memory"     x="27.44" y="31.0">memory</text>
    <text id="label-notion"     x="38.57" y="31.0">notion</text>
  </g>
`;

export function AutomationSvg({
  src = "/automation-2.svg",
  className,
  labelColor = "#374151",
}: AutomationSvgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgMarkup, setSvgMarkup] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((res) => res.text())
      .then((text) => {
        if (cancelled) return;
        // Ajoute des marges dans le viewBox : corrige le clip des nodes aux bords
        // et réduit légèrement la taille du contenu dans la card blanche
        const markup = text
          .replace('viewBox="0 0 66.63 32.45"', 'viewBox="-4 -3 74.63 38.45"')
          .replace("</svg>", `${buildLabels(labelColor)}</svg>`);
        setSvgMarkup(markup);
      })
      .catch((err) => {
        console.error(`AutomationSvg: failed to load ${src}`, err);
      });
    return () => { cancelled = true; };
  }, [src, labelColor]);

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root || !svgMarkup) return;

      // Nodes dans l'ordre voulu
      const nodeOrder = [
        root.querySelector("#node-webhook"),
        root.querySelector("#node-ai-agent"),
        root.querySelector("#node-perplexity"),
        root.querySelector("#node-memory"),
        root.querySelector("#node-notion"),
        root.querySelector("#node-code"),
      ].filter(Boolean);

      // Labels dans le même ordre
      const labelOrder = [
        root.querySelector("#label-webhook"),
        root.querySelector("#label-ai-agent"),
        root.querySelector("#label-perplexity"),
        root.querySelector("#label-memory"),
        root.querySelector("#label-notion"),
        root.querySelector("#label-code"),
      ].filter(Boolean);

      // Markers ordonnés : webhook → model → memory → notion → code
      const markersOrdered = [
        root.querySelector("#start_point-5"), root.querySelector("#end_point-5"),
        root.querySelector("#start_point-4"), root.querySelector("#end_point-4"),
        root.querySelector("#start_point-2"), root.querySelector("#end_point-2"),
        root.querySelector("#start_point-3"), root.querySelector("#end_point-3"),
        root.querySelector("#start_point"),   root.querySelector("#end_point"),
      ].filter(Boolean);

      // Lignes dans l'ordre prioritaire demandé
      const linesOrdered = [
        root.querySelector("#line-5"), // webhook → ai-agent
        root.querySelector("#line-4"), // ai-agent → model
        root.querySelector("#line-2"), // ai-agent → memory
        root.querySelector("#line-3"), // ai-agent → notion
        root.querySelector("#line"),   // ai-agent → code
      ].filter(Boolean);

      if (nodeOrder.length === 0 || linesOrdered.length === 0) return;

      // États initiaux
      gsap.set(nodeOrder,       { scale: 0, autoAlpha: 0, transformOrigin: "center center" });
      gsap.set(labelOrder,      { autoAlpha: 0 });
      gsap.set(markersOrdered,  { scale: 0, autoAlpha: 0, transformOrigin: "center center" });
      gsap.set(linesOrdered,    { drawSVG: "0%" });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: "top 75%", toggleActions: "play none none none" },
      });

      // 1. Nodes + labels simultanément dans l'ordre
      tl.to(nodeOrder,  { scale: 1, autoAlpha: 1, stagger: 0.1, duration: 0.4, ease: "back.out(2)" });
      tl.to(labelOrder, { autoAlpha: 1, stagger: 0.1, duration: 0.3, ease: "power1.out" }, "<");

      // 2. Markers dans l'ordre
      tl.to(markersOrdered, {
        scale: 1, autoAlpha: 1, stagger: 0.06, duration: 0.3, ease: "back.out(1.5)",
      }, "-=0.1");

      // 3. Lignes une par une, dans l'ordre, lentement
      linesOrdered.forEach((line) => {
        tl.to(line, { drawSVG: "100%", duration: 0.75, ease: "power2.inOut" });
      });
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
