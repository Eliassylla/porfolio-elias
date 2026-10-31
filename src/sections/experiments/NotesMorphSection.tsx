import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import notesSvg from "@/assets/morph/notes-ouverte.svg?raw";
import promptSvg from "@/assets/morph/chat-barre-saisie.svg?raw";
import { ARRIVE, F, MID, OPEN, OUT, prefixSvgIds } from "@/lib/motion-curves";

gsap.registerPlugin(ScrollTrigger);

// Essai : le morph Notes → barre de chat de la vidéo ChatGPT (Video Animation/productions/chatgpt-video,
// scènes 01 et 02), avec les mêmes SVG, les mêmes formes et les mêmes courbes.
// La section reste fixée le temps d'un écran de scroll. Le scroll choisit la pose (Notes ou Chat),
// chaque passage joue à la vitesse de la vidéo. Les rebonds de la vidéo ne sont pas repris.

const COMPACT = { x: 400, y: 400, width: 280, height: 280, rx: 55, ry: 58 };
const NOTES = { x: 123, y: 151, width: 834, height: 760, rx: 52, ry: 52 };
const PROMPT = { x: 108, y: 400, width: 864, height: 160, rx: 22, ry: 22 };

// « Notes » en #AE7C24 comme dans la vidéo : le jaune du package manque de contraste sur la carte.
const notesMarkup = prefixSvgIds(notesSvg, "mn-")
  .replace(/^[\s\S]*?<\/title>/, "")
  .replace(/<\/svg>\s*$/, "")
  .replace(/fill="#C9912D"/g, 'fill="#AE7C24"');
const promptMarkup = prefixSvgIds(promptSvg, "mp-").replace(/^[\s\S]*?<\/title>/, "").replace(/<\/svg>\s*$/, "");

const SVG_NS = "http://www.w3.org/2000/svg";

// Range un ou plusieurs groupes dans un groupe parent, comme un Null dans After Effects.
function wrap(els: Element[]) {
  const g = document.createElementNS(SVG_NS, "g");
  els[0].parentNode?.insertBefore(g, els[0]);
  els.forEach((el) => g.appendChild(el));
  return g;
}

export default function NotesMorphSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;
      const q = (id: string) => stage.querySelector<SVGGElement>(`#${id}`)!;

      // Les fonds des packages sont remplacés par la forme commune qui morphe.
      ["mn-fond-plan", "mn-fond-carte", "mn-titre-surlignage", "mn-selection-debut", "mn-selection-fin", "mp-fond", "mp-champ"].forEach(
        (id) => q(id)?.remove(),
      );

      const haut = ["mn-haut-retour", "mn-haut-notes", "mn-haut-partage", "mn-haut-menu"].map(q);
      const bas = ["mn-bas-liste", "mn-bas-camera", "mn-bas-dessin", "mn-bas-composer"].map(q);
      const milieu = ["mn-titre", "mn-codex-logo", "mn-codex-texte", "mn-claude-logo", "mn-claude-texte"].map(q);
      const exits = [wrap([milieu[0]]), wrap([milieu[1], milieu[2]]), wrap([milieu[3], milieu[4]])];
      const nullHaut = wrap(haut.map((el) => wrap([el])));
      const nullBas = wrap(bas.map((el) => wrap([el])));
      const nullMilieu = wrap(exits);
      const notesContent = q("mn-content");

      // La question s'écrit lettre par lettre : chaque caractère prend sa place mesurée.
      const question = q("mp-question") as unknown as SVGTextElement;
      const text = question.textContent ?? "";
      const xs = [...text].map((_, i) => question.getStartPositionOfChar(i).x);
      question.textContent = "";
      const chars = [...text].map((c, i) => {
        const t = document.createElementNS(SVG_NS, "tspan");
        t.setAttribute("x", String(xs[i]));
        t.textContent = c;
        question.appendChild(t);
        return t;
      });
      // La flèche d'envoi est un calque à part dans le package : elle suit le bouton rond.
      const controls = [["add-button"], ["search-control"], ["computer-control"], ["model-control"], ["microphone"], ["voice-button", "voice-arrow"]].map(
        (ids) => wrap(ids.map((id) => q(`mp-${id}`))),
      );

      const card = stage.querySelector(".mc-card")!;
      const clip = stage.querySelector(".mc-clip-rect")!;
      const tl = gsap.timeline({ paused: true, defaults: { immediateRender: false } });

      // Ouverture de la carte (scène 01) : la forme compacte s'ouvre en Notes, le contenu suit à l'échelle.
      tl.fromTo([card, clip], { attr: COMPACT }, { attr: NOTES, duration: 18 * F, ease: OPEN }, 0);
      // Entrée : la carte et son contenu grandissent ensemble depuis le centre, 5 images (v2 du studio).
      const surface = wrap([card, stage.querySelector("[clip-path]")!]);
      const entree = { s: 0 };
      tl.fromTo(entree, { s: 0 }, { s: 1, duration: 5 * F, ease: ARRIVE }, 0);
      // Échelle écrite directement dans l'attribut, comme dans la vidéo (origine en haut à gauche du cadre).
      const scale = { p: 0 };
      const applyScale = () => {
        const k = scale.p;
        const sx = 280 / 834 + (1 - 280 / 834) * k;
        const sy = 280 / 760 + (1 - 280 / 760) * k;
        surface.setAttribute("transform", `translate(540 540) scale(${entree.s}) translate(-540 -540)`);
        surface.setAttribute("opacity", String(entree.s));
        const x = (400 - (123 * 280) / 834) * (1 - k);
        const y = (400 - (151 * 280) / 760) * (1 - k);
        notesContent.setAttribute("transform", `translate(${x} ${y}) scale(${sx} ${sy})`);
      };
      applyScale();
      tl.fromTo(scale, { p: 0 }, { p: 1, duration: 18 * F, ease: OPEN }, 0);
      // Suit chaque rendu de la timeline, retour à l'image 0 compris.
      tl.eventCallback("onUpdate", applyScale);
      const M = 27 * F;
      tl.addLabel("notes", M);

      // Morph (scène 01, MORPH_AT) : la carte devient la barre de saisie, le contenu de Notes s'en va.
      tl.fromTo([card, clip], { attr: NOTES }, { attr: PROMPT, duration: 15 * F, ease: MID }, M);
      tl.fromTo(card, { fill: "#fffcf4" }, { fill: "#1e1d1c", duration: 15 * F, ease: MID }, M);
      tl.fromTo(nullHaut, { y: 0 }, { y: -65, duration: 10 * F, ease: OUT }, M);
      tl.fromTo(nullBas, { y: 0 }, { y: 110, duration: 12 * F, ease: OUT }, M);
      tl.fromTo(nullMilieu, { y: 0 }, { y: -180, duration: 15 * F, ease: OUT }, M);
      [...nullHaut.children].forEach((el, i) =>
        tl.fromTo(el, { y: 0, opacity: 1 }, { y: -16, opacity: 0, duration: 6 * F, ease: MID }, M + i * 2 * F),
      );
      [...nullBas.children].forEach((el, i) =>
        tl.fromTo(el, { y: 0, opacity: 1 }, { y: 16, opacity: 0, duration: 6 * F, ease: MID }, M + i * 2 * F),
      );
      exits.forEach((el, i) => tl.fromTo(el, { y: 0 }, { y: -140, duration: 10 * F, ease: OUT }, M + (2 + i * 2) * F));
      tl.fromTo(notesContent, { opacity: 1 }, { opacity: 0, duration: 10 * F, ease: MID }, M + 5 * F);

      // Arrivée du chat (scène 02, CHAT_AT = morph + 9 images) : la question s'écrit, les outils montent.
      const C = M + 9 * F;
      const each = (0.7 - 0.28) / Math.max(1, chars.length - 1);
      chars.forEach((t, i) => {
        const x = Number(t.getAttribute("x"));
        // Une lettre SVG n'a pas d'opacité propre : on passe par l'opacité de son remplissage.
        tl.fromTo(t, { attr: { x: x + 70, "fill-opacity": 0 } }, { attr: { x, "fill-opacity": 1 }, duration: 0.28, ease: "sine.out" }, C + i * each);
      });
      controls.forEach((el, i) =>
        tl.fromTo(el, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 6 * F, ease: ARRIVE }, C + i * 2 * F),
      );
      tl.addLabel("chat", tl.duration());

      // Pose de départ (image 0) : le chat est caché tant que la timeline ne l'a pas fait entrer.
      chars.forEach((t) => t.setAttribute("fill-opacity", "0"));
      gsap.set(controls, { y: 24, opacity: 0 });
      tl.seek(0);

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        tl.seek("chat");
        return;
      }

      // Le scroll choisit la pose ; la timeline joue jusqu'à elle à sa vitesse d'origine.
      let target: string | number = 0;
      let current: gsap.core.Tween | null = null;
      const goTo = (label: string | number) => {
        if (label === target) return;
        target = label;
        current?.kill();
        current = tl.tweenTo(label, { ease: "none" });
      };

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=100%",
        pin: true,
        onUpdate: (self) => goTo(self.progress > 0.4 ? "chat" : "notes"),
        onLeaveBack: () => goTo("notes"),
      });
      ScrollTrigger.create({
        trigger: section,
        start: "top 70%",
        onEnter: () => goTo("notes"),
        onLeaveBack: () => goTo(0),
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-background px-4">
      <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Essai · morph Notes → Chat</p>
      <svg
        ref={stageRef}
        viewBox="90 130 900 800"
        className="h-auto w-full max-w-[44rem]"
        role="img"
        aria-label="Une note Codex et Claude Code se transforme en barre de saisie de chat"
      >
        <defs>
          <clipPath id="mc-clip">
            <rect className="mc-clip-rect" {...COMPACT} />
          </clipPath>
        </defs>
        <rect className="mc-card stroke-black/10 dark:stroke-white/10" strokeWidth={2} fill="#fffcf4" {...COMPACT} />
        <g clipPath="url(#mc-clip)">
          <g id="mn-content" dangerouslySetInnerHTML={{ __html: notesMarkup }} />
          <g id="mp-content" dangerouslySetInnerHTML={{ __html: promptMarkup }} />
        </g>
      </svg>
    </section>
  );
}
