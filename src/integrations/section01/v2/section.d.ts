import type gsap from "gsap";
import type { ScrollTrigger } from "gsap/ScrollTrigger";

export interface Section01Controller {
  play(): void;
  pause(): void;
  seek(seconds: number): void;
  reset(): void;
  finish(): void;
  setTheme(theme: "light" | "dark"): void;
  destroy(): void;
}

// Contrat local de la livraison JS, conservée sans transformation.
export function mountSection01(
  root: HTMLElement,
  options: { gsap: typeof gsap; ScrollTrigger: typeof ScrollTrigger; mode?: "scroll" | "manual" },
): Section01Controller;
