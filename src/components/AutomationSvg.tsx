import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin, MotionPathPlugin);

interface AutomationSvgProps {
  src?: string;
  className?: string;
}

/**
 * Affiche l'illustration automation.svg inline (via fetch) et anime ses éléments avec GSAP :
 * - Apparition stagger des nodes (scale 0 → 1) déclenchée au scroll
 * - Tracé des paths (DrawSVG)
 * - Point lumineux qui voyage en boucle sur les paths (MotionPath)
 */
export function AutomationSvg({
  src = "/automation-2.svg",
  className,
}: AutomationSvgProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [svgMarkup, setSvgMarkup] = useState<string>("");

  // Charge le SVG et injecte un point lumineux <circle id="travel-dot"> juste avant </svg>
  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((res) => res.text())
      .then((text) => {
        if (cancelled) return;
        const withDot = text.replace(
          "</svg>",
          '<circle id="travel-dot" r="0.9" fill="#1d4ed8" opacity="0"/></svg>',
        );
        setSvgMarkup(withDot);
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
      const drawables = root.querySelectorAll<SVGElement>(
        "#path g > path, #path g > line",
      );
      const dot = root.querySelector<SVGCircleElement>("#travel-dot");

      if (nodes.length === 0 || drawables.length === 0 || !dot) return;

      // === États initiaux ===
      gsap.set(nodes, {
        scale: 0,
        autoAlpha: 0,
        transformOrigin: "center center",
      });
      gsap.set(drawables, { drawSVG: 0 });

      // === Timeline d'apparition (déclenchée au scroll) ===
      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      // 1. Sources (webhook) + cerveau (ai-agent)
      intro.to("#node-webhook, #node-ai-agent", {
        scale: 1,
        autoAlpha: 1,
        duration: 0.5,
        stagger: 0.15,
        ease: "back.out(2)",
      });

      // 2. Path webhook → ai-agent se dessine
      intro.to(
        "#path-webhook-to-ai-agent path, #path-webhook-to-ai-agent line",
        {
          drawSVG: "100%",
          duration: 0.5,
          stagger: 0.06,
          ease: "power2.out",
        },
        "-=0.2",
      );

      // 3. Nodes destination apparaissent en stagger
      intro.to(
        "#node-code, #node-memory, #node-notion, #node-perplexity",
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "back.out(2)",
        },
        "+=0.1",
      );

      // 4. Paths sortants se dessinent en parallèle des nodes
      intro.to(
        "#path-ai-agent-to-code path, #path-ai-agent-to-code line, " +
          "#path-ai-agent-to-ai-memory path, #path-ai-agent-to-notion path, " +
          "#path-ai-agent-to-ai-model path",
        {
          drawSVG: "100%",
          duration: 0.55,
          stagger: 0.1,
          ease: "power2.out",
        },
        "<",
      );

      // === Point voyageur en boucle infinie ===
      // Cycle : webhook → ai-agent → [code | memory | notion | perplexity] → restart
      const segments = [
        { path: "#path-webhook-to-ai-agent line", duration: 1.2 },
        { path: "#path-ai-agent-to-code line", duration: 1.0 },
        { path: "#path-webhook-to-ai-agent line", duration: 1.2 },
        { path: "#path-ai-agent-to-ai-memory path", duration: 1.1 },
        { path: "#path-webhook-to-ai-agent line", duration: 1.2 },
        { path: "#path-ai-agent-to-notion path", duration: 1.1 },
        { path: "#path-webhook-to-ai-agent line", duration: 1.2 },
        { path: "#path-ai-agent-to-ai-model path", duration: 1.3 },
      ];

      const journey = gsap.timeline({ repeat: -1, repeatDelay: 0.4 });
      segments.forEach((seg) => {
        journey
          .set(dot, { autoAlpha: 0 })
          .to(dot, { autoAlpha: 1, duration: 0.1 })
          .to(dot, {
            duration: seg.duration,
            ease: "power1.inOut",
            motionPath: {
              path: seg.path,
              align: seg.path,
              alignOrigin: [0.5, 0.5],
            },
          })
          .to(dot, { autoAlpha: 0, duration: 0.15 });
      });

      // Démarre la boucle après l'animation d'intro
      intro.add(journey, "+=0.5");
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
