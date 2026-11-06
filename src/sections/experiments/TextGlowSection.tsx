import { useLayoutEffect, useRef } from "react";
import { useTheme } from "next-themes";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import sectionHtml from "@/integrations/section01/v2/section.html?raw";
import { mountSection01, type Section01Controller } from "@/integrations/section01/v2/section.js";
import "@/integrations/section01/v2/section.css";

gsap.registerPlugin(ScrollTrigger);

// Contenu de confiance épinglé à la livraison Studio 2f347a9. L'objet reste
// identique entre rendus : React ne réécrit pas les enfants gérés par le Studio.
const markup = { __html: sectionHtml };

export default function TextGlowSection() {
  const hostRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<Section01Controller | null>(null);
  const { resolvedTheme } = useTheme();

  useLayoutEffect(() => {
    const root = hostRef.current?.querySelector<HTMLElement>("[data-va-section01]");
    if (!root) return;

    // L'export possède son contexte GSAP et le nettoyage de cette seule instance.
    const animation = mountSection01(root, { gsap, ScrollTrigger });
    animationRef.current = animation;
    animation.setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");

    return () => {
      animation.destroy();
      animationRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    animationRef.current?.setTheme(resolvedTheme === "dark" ? "dark" : "light");
  }, [resolvedTheme]);

  return <div ref={hostRef} dangerouslySetInnerHTML={markup} />;
}
