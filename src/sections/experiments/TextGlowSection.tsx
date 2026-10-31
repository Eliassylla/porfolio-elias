import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import carteClair from "@/assets/taches/cette-semaine-clair.svg?raw";
import carteSombre from "@/assets/taches/cette-semaine-sombre.svg?raw";
import { ARRIVE, F, bz, prefixSvgIds } from "@/lib/motion-curves";

gsap.registerPlugin(ScrollTrigger);

// Section 01 · Tâches répétitives, v2 du studio (Video Animation/sites/portfolio/Sections/01-textes/versions/v2).
// La phrase joue « Text animation - 1 » (bibliotheque/animations/Animations de texte), puis la carte « Cette semaine »
// arrive en vagues pendant que les derniers mots se posent : 51 images à 30 i/s. Le scroll déclenche, il ne pilote
// pas ; en remontant, tout se rejoue à l'envers. « Je construis des systèmes… » ouvrira la section 02.

const PHRASE = "Vos tâches répétitives vous coûtent des heures.";
const FIN = 51 * F;

// La carte du package (une par thème), cadrée sur elle-même, sans le fond du plan ; id préfixés par thème.
const carte = (svg: string, prefixe: string) =>
  prefixSvgIds(svg, prefixe)
    .replace(/<svg[^>]*>/, '<svg xmlns="http://www.w3.org/2000/svg" viewBox="316 161 1288 758" class="block h-auto w-full">')
    .replace(/<title>[\s\S]*?<\/title>/, "")
    .replace(/<g id="[a-z]+-fond-plan"[\s\S]*?<\/g>/, "");
const CARTES = [
  { prefixe: "tc-", html: carte(carteClair, "tc-"), className: "dark:hidden" },
  { prefixe: "ts-", html: carte(carteSombre, "ts-"), className: "hidden dark:block" },
];
const GROUPES: [string, number, number, number][] = [
  // [groupe, image de départ, distance en unités de la carte, durée en images]
  ["fond-carte", 22, 40, 8],
  ["titre", 26, 24, 6],
  ["date", 28, 24, 6],
  ["compteur", 30, 24, 6],
  ["ligne-relance-facture", 30, 24, 6],
  ["ligne-tri-support", 33, 24, 6],
  ["ligne-maj-crm", 36, 24, 6],
  ["ligne-rapport-semaine", 39, 24, 6],
  ["ligne-posts-reseaux", 42, 24, 6],
  ["ajouter", 45, 24, 6],
];

// Clés du rapport After Effects, en images, interpolation linéaire.
const KEYS = {
  top: { offset1: [0, -98, 30, 100], start2: [3, 0, 20, 100] },
  glow: { offset1: [0, -98, 30, 100], start2: [3, 0, 22, 100], offset3: [5, -98, 35, 100] },
} as const;
const BLUE = [0, 0.3804, 1];
// 350 px pour un texte de 93 px dans l'original : on garde la proportion, quelle que soit la taille d'écran.
const TRAVEL_EM = 350 / 93;

const lin = (f: number, [f0, v0, f1, v1]: readonly number[]) =>
  f <= f0 ? v0 : f >= f1 ? v1 : v0 + ((v1 - v0) * (f - f0)) / (f1 - f0);

// Sélecteur de plage « Ramp Up », Ease High -50 / Ease Low 100.
const RAMP = bz(0.5, 0, 1, 0.75);
function rampUp(i: number, n: number, offset: number) {
  const s = (offset / 100) * n;
  const e = ((100 + offset) / 100) * n;
  return RAMP(Math.min(Math.max((i + 0.5 - s) / (e - s), 0), 1));
}
function square(i: number, n: number, start: number) {
  const s = (start / 100) * n;
  return Math.max(0, Math.min(i + 1, n) - Math.max(i, s));
}

// wiggle(1,300) : bruit lissé déterministe, une oscillation par seconde.
function wiggle(seed: number, t: number) {
  const h = (k: number) => {
    const x = Math.sin(k * 127.1 + seed * 311.7) * 43758.5453;
    return x - Math.floor(x);
  };
  const k = Math.floor(t);
  const u = t - k;
  const s = u * u * (3 - 2 * u);
  return (h(k) * (1 - s) + h(k + 1) * s) * 2 - 1;
}

function parseRgb(color: string) {
  const m = color.match(/[\d.]+/g);
  return m ? m.slice(0, 3).map(Number) : [255, 255, 255];
}

function Line({ text }: { text: string }) {
  const words = text.split(" ");
  const render = (layer: "top" | "glow") =>
    words.map((w, i) => (
      <span key={i}>
        <span className="tg-word inline-block" data-layer={layer}>
          {w}
        </span>
        {i < words.length - 1 ? " " : ""}
      </span>
    ));
  return (
    <p className="tg-line relative text-4xl font-semibold tracking-tight text-foreground md:text-6xl lg:text-7xl lg:leading-[1.08]">
      <span aria-hidden="true" className="tg-glow pointer-events-none absolute inset-0 translate-x-[-2px]">
        {render("glow")}
      </span>
      <span className="tg-top relative dark:mix-blend-plus-lighter">{render("top")}</span>
    </p>
  );
}

export default function TextGlowSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const blobs = gsap.utils.toArray<HTMLElement>(".tg-blob", section);

      // Fond : deux halos bleus qui ne restent jamais immobiles (wiggle 1 fois/s, 300 px sur 1920 de large).
      if (!reduce) {
        const tick = () => {
          const t = gsap.ticker.time;
          const amp = (300 / 1920) * section.clientWidth;
          blobs.forEach((b, i) => {
            gsap.set(b, { x: wiggle(i + 1, t) * amp, y: wiggle(i + 11, t) * amp });
          });
        };
        const watcher = ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (self.isActive ? gsap.ticker.add(tick) : gsap.ticker.remove(tick)),
        });
        // Coupé quand la section est hors écran : rien ne tourne pour rien sur téléphone.
        if (watcher.isActive) gsap.ticker.add(tick);
      }

      const block = section.querySelector<HTMLElement>(".tg-block");
      const line = block?.querySelector<HTMLElement>(".tg-line");
      if (!block || !line) return;
      const layers = {
        top: gsap.utils.toArray<HTMLElement>('.tg-word[data-layer="top"]', line),
        glow: gsap.utils.toArray<HTMLElement>('.tg-word[data-layer="glow"]', line),
      };
      const n = layers.top.length;
      let finalRgb = [255, 255, 255];

      const renderPhrase = (time: number, done = false) => {
        const f = time / F;
        (["top", "glow"] as const).forEach((id) => {
          const k = KEYS[id];
          const o1 = lin(f, k.offset1);
          const s2 = lin(f, k.start2);
          const o3 = "offset3" in k ? lin(f, k.offset3) : null;
          layers[id].forEach((w, i) => {
            const a1 = rampUp(i, n, o1); // position x +350 et opacité 0
            const a2 = Math.min(square(i, n, s2), 1); // couleur bleue
            const a3 = o3 === null ? 0 : 1 - rampUp(i, n, o3); // la copie lumineuse s'éteint mot par mot
            w.style.transform = a1 ? `translateX(${TRAVEL_EM * a1}em)` : "";
            w.style.opacity = String((1 - a1) * (1 - a3));
            // À la fin, la couleur revient au thème : un changement clair/sombre après coup reste juste.
            w.style.color = done ? "" : `rgb(${BLUE.map((b, j) => Math.round(finalRgb[j] + (255 * b - finalRgb[j]) * a2))})`;
          });
        });
      };

      if (reduce) {
        renderPhrase(2, true);
        return;
      }

      const tl = gsap.timeline({ paused: true, defaults: { immediateRender: false } });
      // Carte : chaque groupe monte et apparaît (ARRIVE), puis rebondit comme les entrées de la vidéo ChatGPT.
      // Les deux cartes (clair, sombre) jouent ensemble ; une seule est affichée.
      const springs: { e: SVGGElement; start: number; amp: number }[] = [];
      CARTES.forEach(({ prefixe }) =>
        GROUPES.forEach(([id, image, distance, images]) => {
          const el = block.querySelector<SVGGElement>(`#${prefixe}${id}`);
          if (!el) return;
          const d = images * F;
          const inner = document.createElementNS("http://www.w3.org/2000/svg", "g");
          while (el.firstChild) inner.appendChild(el.firstChild);
          el.appendChild(inner);
          tl.fromTo(el, { y: distance, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: d, ease: ARRIVE }, image * F);
          springs.push({ e: inner, start: image * F + d, amp: (-distance / d) * 0.36 * 0.06 });
          gsap.set(el, { y: distance, autoAlpha: 0 });
        }),
      );
      tl.set({}, {}, FIN);

      const render = (done = false) => {
        const t = tl.time();
        // Dernière clé de la phrase à l'image 35 : au-delà, elle reste posée pendant que la carte arrive.
        renderPhrase(Math.min(t, 36 * F), done);
        springs.forEach((s) => {
          const u = t - s.start;
          const v = u > 0 && u < 0.8 ? (s.amp * Math.sin(1.8 * u * 2 * Math.PI)) / Math.exp(5 * u) : 0;
          s.e.setAttribute("transform", `translate(0 ${v})`);
        });
      };
      tl.eventCallback("onUpdate", () => render());
      tl.eventCallback("onComplete", () => render(true));
      tl.eventCallback("onReverseComplete", () => render());
      render();

      // Le bloc (phrase et carte) joue quand son milieu passe à 60 % de l'écran : la carte est alors à l'écran,
      // sur ordinateur comme sur téléphone.
      ScrollTrigger.create({
        trigger: block,
        start: "center 60%",
        onEnter: () => {
          finalRgb = parseRgb(getComputedStyle(line).color);
          tl.play();
        },
        onLeaveBack: () => {
          finalRgb = parseRgb(getComputedStyle(line).color);
          tl.reverse();
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="text-glow relative overflow-hidden bg-background py-28 md:py-44">
      {/* Halos : dégradés radiaux plutôt qu'un flou de 380 px, même rendu et beaucoup moins coûteux sur téléphone. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_82%,transparent)] dark:opacity-100">
        <div className="tg-blob absolute left-1/2 top-[88%] aspect-square w-[85vw] min-w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(21,99,255,0.55)_0%,rgba(21,99,255,0.22)_38%,transparent_70%)]" />
        <div className="tg-blob absolute left-1/4 top-[-8%] aspect-square w-[85vw] min-w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(21,99,255,0.55)_0%,rgba(21,99,255,0.22)_38%,transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 text-center lg:px-8">
        <div className="tg-block flex flex-col items-center gap-10 md:gap-14">
          <Line text={PHRASE} />
          <div className="w-full max-w-[860px]" role="img" aria-label="Cette semaine : cinq tâches répétitives, 5 h perdues">
            {CARTES.map(({ prefixe, html, className }) => (
              <div key={prefixe} className={className} aria-hidden="true" dangerouslySetInnerHTML={{ __html: html }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
