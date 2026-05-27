import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SkillsSvgProps {
  src?: string;
  className?: string;
}

export function SkillsSvg({ src = "/test.svg", className }: SkillsSvgProps) {
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
        console.error(`SkillsSvg: failed to load ${src}`, err);
      });
    return () => { cancelled = true; };
  }, [src]);

  useGSAP(
    () => {
      const root = containerRef.current;
      if (!root || !svgMarkup) return;

      const paths = root.querySelectorAll("path");
      const rects = root.querySelectorAll("rect");
      if (paths.length === 0) return;

      // transformBox: "fill-box" = origine relative à la bounding box de chaque path
      // sans ça, transformOrigin se calcule par rapport au viewport SVG entier → décalage
      gsap.set(paths, {
        opacity: 0,
        scale: 0,
        transformBox: "fill-box",
        transformOrigin: "50% 50%",
      });
      gsap.set(rects, { opacity: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      // 1. Fond apparaît
      tl.to(rects, { opacity: 1, duration: 0.25, ease: "power1.out" });

      // 2. Lettres pop depuis leur propre centre, une par une
      tl.to(
        paths,
        {
          opacity: 1,
          scale: 1,
          stagger: 0.07,
          duration: 0.4,
          ease: "back.out(2.5)",
        },
        "-=0.05",
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
