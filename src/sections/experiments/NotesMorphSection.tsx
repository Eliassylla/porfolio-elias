import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import notesClosedSvg from "@/assets/morph/notes-fermee.svg?raw";
import notesSvg from "@/assets/morph/notes-ouverte.svg?raw";
import promptSvg from "@/assets/morph/chat-barre-saisie.svg?raw";
import { ARRIVE, F, MID, OPEN, OUT, bz, prefixSvgIds } from "@/lib/motion-curves";

gsap.registerPlugin(ScrollTrigger);

// Essai : l'ouverture de la vidéo ChatGPT telle quelle (Video Animation/sites/portfolio/Sections/03-projets-reserver,
// v3) : Notes fermée et son icône, l'icône qui part en haut à gauche, la carte qui s'ouvre, les vagues d'entrée et
// leurs rebonds, puis le morph vers la barre de chat. Mêmes SVG, mêmes images, mêmes courbes.
// Note : section d'essai, sans titre visible (le libellé « Essai · ouverture de la vidéo ChatGPT » a été retiré).
// Rythme : l'ouverture part quand le haut de la section arrive à 15 % de l'écran, la carte presque à sa place.
// La section reste ensuite fixée ; la première moitié du scroll fixé garde Notes, la seconde passe en Chat.
// Chaque passage joue à la vitesse de la vidéo, et remonter au-dessus de la section rejoue tout à l'envers jusqu'à
// l'icône.

const COMPACT = { x: 400, y: 400, width: 280, height: 280, rx: 55, ry: 58 };
const NOTES = { x: 123, y: 151, width: 834, height: 760, rx: 52, ry: 52 };
const PROMPT = { x: 108, y: 400, width: 864, height: 160, rx: 22, ry: 22 };
const IN = bz(0.08, 0.85, 0.12, 0.91);
const MORPH_AT = 49.5 * F;
const MORPH_DURATION = 15 * F;
const CHAT_AT = 58.5 * F;

// « Notes » en #AE7C24 comme dans la vidéo : le jaune du package manque de contraste sur la carte.
const notesMarkup = prefixSvgIds(notesSvg, "mn-")
  .replace(/^[\s\S]*?<\/title>/, "")
  .replace(/<\/svg>\s*$/, "")
  .replace(/fill="#C9912D"/g, 'fill="#AE7C24"');
const promptMarkup = prefixSvgIds(promptSvg, "mp-").replace(/^[\s\S]*?<\/title>/, "").replace(/<\/svg>\s*$/, "");
// L'icône de Notes fermée (180 × 200 autour du centre de la scène), en fond sombre comme dans la vidéo.
const iconMarkup = (notesClosedSvg.match(/<g id="icone-notes"[\s\S]*?<\/g>/)?.[0] ?? "")
  .replace('id="icone-notes"', 'id="mi-icone"')
  .replace(/fill="#FFFFFF"/g, 'fill="#252525"');

const SVG_NS = "http://www.w3.org/2000/svg";

// Range un ou plusieurs éléments dans un groupe parent, comme un Null dans After Effects.
function wrap(els: Element[]) {
  const g = document.createElementNS(SVG_NS, "g");
  els[0].parentNode?.insertBefore(g, els[0]);
  els.forEach((el) => g.appendChild(el));
  return g;
}

// Échelle écrite dans l'attribut, autour d'un point de la scène 1080.
const scaleAt = (el: Element, s: number, cx = 540, cy = 540) =>
  el.setAttribute("transform", `translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})`);

// Rebond de la vidéo : oscillation amortie qui suit une entrée, calculée depuis le temps de la timeline.
type Spring = { start: number; amp: number };
const springValue = (s: Spring, t: number) => {
  const u = t - s.start;
  return u > 0 && u < 0.8 ? (s.amp * Math.sin(1.8 * u * 2 * Math.PI)) / Math.exp(5 * u) : 0;
};

export default function NotesMorphSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const stage = stageRef.current;
      if (!section || !stage) return;
      const q = (id: string) => stage.querySelector<SVGGElement>(`#${id}`)!;

      // Les fonds des packages sont remplacés par la forme commune qui morphe ; l'icône prend la place du retour.
      ["mn-fond-plan", "mn-fond-carte", "mn-titre-surlignage", "mn-selection-debut", "mn-selection-fin", "mn-haut-retour", "mp-fond", "mp-champ"].forEach(
        (id) => q(id)?.remove(),
      );
      // « Notes » se décale comme dans la vidéo (225 au lieu de 213).
      q("mn-haut-notes-texte")?.setAttribute("x", "225");

      const tl = gsap.timeline({ paused: true, defaults: { immediateRender: false } });
      const springs: (Spring & { e: Element; axis: "x" | "y" })[] = [];
      const updaters: ((t: number) => void)[] = [];

      // Entrée de la vidéo : glisse de `distance` et apparaît en `frames` images, puis rebondit.
      const entrance = (el: Element, start: number, axis: "x" | "y", distance: number, frames = 6) => {
        const d = frames * F;
        tl.fromTo(el, { [axis]: distance, autoAlpha: 0 }, { [axis]: 0, autoAlpha: 1, duration: d, ease: ARRIVE }, start);
        springs.push({ e: wrap([...el.childNodes] as Element[]), axis, start: start + d, amp: (-distance / d) * 0.36 * 0.06 });
        gsap.set(el, { [axis]: distance, autoAlpha: 0 });
      };

      // Caméra : léger zoom d'entrée, puis recul pendant le morph.
      const camera = q("mc-camera");
      const cam = { entree: 0.965, recul: 1 };
      tl.fromTo(cam, { entree: 0.965 }, { entree: 1, duration: 1.35, ease: IN }, 0);
      tl.fromTo(cam, { recul: 1 }, { recul: 0.92, duration: 27 * F, ease: MID }, 1.25);
      updaters.push(() => scaleAt(camera, cam.entree * cam.recul));

      // Carte : elle grandit depuis le centre en 5 images, s'ouvre à l'image 9, morphe à MORPH_AT.
      const card = stage.querySelector(".mc-card")!;
      const clip = stage.querySelector(".mc-clip-rect")!;
      const surface = wrap([card]);
      const surf = { s: 0 };
      tl.fromTo(surf, { s: 0 }, { s: 1, duration: 5 * F, ease: ARRIVE }, 0);
      const surfSpring = { start: 5 * F, amp: (1 / (5 * F)) * 0.36 * 0.06 };
      updaters.push((t) => {
        scaleAt(surface, surf.s * (1 + springValue(surfSpring, t)));
        surface.setAttribute("opacity", String(Math.min(1, surf.s)));
      });
      tl.fromTo([card, clip], { attr: COMPACT }, { attr: NOTES, duration: 18 * F, ease: OPEN }, 9 * F);
      tl.fromTo([card, clip], { attr: NOTES }, { attr: PROMPT, duration: MORPH_DURATION, ease: MID }, MORPH_AT);
      tl.fromTo(card, { fill: "#fffcf4" }, { fill: "#1e1d1c", duration: MORPH_DURATION, ease: MID }, MORPH_AT);

      // Contenu de Notes : il passe de la taille de la forme compacte à sa taille réelle, avec l'ouverture.
      const notesContent = q("mn-content");
      const contenu = { p: 0 };
      tl.fromTo(contenu, { p: 0 }, { p: 1, duration: 18 * F, ease: OPEN }, 9 * F);
      updaters.push(() => {
        const k = contenu.p;
        const sx = 280 / 834 + (1 - 280 / 834) * k;
        const sy = 280 / 760 + (1 - 280 / 760) * k;
        const x = (400 - (123 * 280) / 834) * (1 - k);
        const y = (400 - (151 * 280) / 760) * (1 - k);
        notesContent.setAttribute("transform", `translate(${x} ${y}) scale(${sx} ${sy})`);
      });

      // Icône : grandit à l'image 3, part en haut à gauche de 11 à 27 au quart de sa taille, rebondit,
      // puis s'efface avec le haut au morph.
      const icone = q("mi-icone");
      const iconFade = wrap([icone]);
      const iconSize = wrap([iconFade]);
      const iconSettle = wrap([iconSize]);
      const iconExit = wrap([iconSettle]);
      const iconTop = wrap([iconExit]);
      const iconNotes = wrap([iconTop]);
      const ic = { s: 0, size: 1 };
      tl.fromTo(ic, { s: 0 }, { s: 1, duration: 5 * F, ease: ARRIVE }, 3 * F);
      const iconSpring = { start: 8 * F, amp: (1 / (5 * F)) * 0.36 * 0.06 };
      const LOGO_START = 11 * F;
      const LOGO_END = 27 * F;
      const LOGO_EASE = bz(0.55, 0, 0.45, 1);
      tl.fromTo(iconExit, { x: 0, y: 0 }, { x: -356, y: -318, duration: LOGO_END - LOGO_START, ease: LOGO_EASE }, LOGO_START);
      tl.fromTo(ic, { size: 1 }, { size: 0.25, duration: LOGO_END - LOGO_START, ease: LOGO_EASE }, LOGO_START);
      const settle = { start: LOGO_END, amp: (0.36 * 0.06) / (LOGO_END - LOGO_START) };
      updaters.push((t) => {
        scaleAt(icone, ic.s * (1 + springValue(iconSpring, t)));
        icone.setAttribute("opacity", String(Math.min(1, ic.s)));
        scaleAt(iconSize, ic.size);
        const v = springValue(settle, t);
        iconSettle.setAttribute("transform", `translate(${-356 * v} ${-318 * v})`);
      });

      // Haut, bas, milieu : chaque élément dans son Null de sortie, au-dessus de son entrée et de son rebond.
      const haut = ["mn-haut-notes", "mn-haut-partage", "mn-haut-menu"].map(q);
      const bas = ["mn-bas-liste", "mn-bas-camera", "mn-bas-dessin", "mn-bas-composer"].map(q);
      const [titre, codexLogo, codexTexte, claudeLogo, claudeTexte] = ["mn-titre", "mn-codex-logo", "mn-codex-texte", "mn-claude-logo", "mn-claude-texte"].map(q);
      const exits = [wrap([titre]), wrap([codexLogo, codexTexte]), wrap([claudeLogo, claudeTexte])];
      const hautExits = haut.map((el) => wrap([el]));
      const basExits = bas.map((el) => wrap([el]));
      const nullHaut = wrap(hautExits);
      const nullBas = wrap(basExits);
      const nullMilieu = wrap(exits);
      const nullNotes = wrap([nullHaut, nullBas, nullMilieu]);

      // Vague commune : Logo + Liste, Notes + Caméra, Partage + Dessin, Menu + Nouvelle note.
      haut.forEach((el, i) => entrance(el, (24 + i * 3) * F, "y", 40));
      bas.forEach((el, i) => entrance(el, (21 + i * 3) * F, "y", 40));

      // Titre mot par mot : chaque mot glisse de 50 px avec une oscillation amortie et apparaît en 8 images.
      const D = 0.9;
      const TEXT_START = 18 * F;
      tl.fromTo(titre, { autoAlpha: 0 }, { autoAlpha: 1, duration: F, ease: "none" }, TEXT_START);
      gsap.set(titre, { autoAlpha: 0 });
      const titreTexte = q("mn-titre-texte") as unknown as SVGTextElement;
      const phrase = titreTexte.textContent ?? "";
      const debuts: [number, string][] = [];
      phrase.split(" ").reduce((i, mot) => {
        debuts.push([i, mot]);
        return i + mot.length + 1;
      }, 0);
      const xs = debuts.map(([i]) => titreTexte.getStartPositionOfChar(i).x);
      titreTexte.textContent = "";
      const influence = (p: number) => (1.5 * Math.cos(1.8 * p * D * 2 * Math.PI)) / Math.exp(6 * p * D);
      debuts.forEach(([, mot], i) => {
        const t = document.createElementNS(SVG_NS, "tspan");
        // L'espace reste dans le mot : la phrase se relit telle quelle si React reconstruit la section.
        t.textContent = i < debuts.length - 1 ? `${mot} ` : mot;
        t.setAttribute("x", String(xs[i] + 50));
        t.setAttribute("fill-opacity", "0");
        titreTexte.appendChild(t);
        const at = TEXT_START + (i + 1) * 0.05;
        tl.fromTo(t, { attr: { x: xs[i] + 50 } }, { attr: { x: xs[i] }, duration: D, ease: (p: number) => 1 - influence(p) }, at);
        // Une lettre SVG n'a pas d'opacité propre : on passe par l'opacité de son remplissage.
        tl.fromTo(t, { attr: { "fill-opacity": 0 } }, { attr: { "fill-opacity": 1 }, duration: 8 * F, ease: "sine.inOut" }, at);
      });
      [codexLogo, codexTexte, claudeLogo, claudeTexte].forEach((el, i) => entrance(el, 0.95 + i * 0.1, "x", 47, 5));

      // Morph : il démarre avant la fin du contenu, chaque groupe part avec sa propre courbe.
      tl.fromTo([nullNotes, iconNotes], { y: 0 }, { y: -35, duration: 17 * F, ease: MID }, MORPH_AT);
      tl.fromTo([nullHaut, iconTop], { y: 0 }, { y: -65, duration: 10 * F, ease: OUT }, MORPH_AT);
      tl.fromTo(nullBas, { y: 0 }, { y: 110, duration: 12 * F, ease: OUT }, MORPH_AT);
      tl.fromTo(nullMilieu, { y: 0 }, { y: -180, duration: MORPH_DURATION, ease: OUT }, MORPH_AT);
      [iconFade, ...hautExits].forEach((el, i) =>
        tl.fromTo(el, { y: 0, opacity: 1 }, { y: -16, opacity: 0, duration: 6 * F, ease: MID }, MORPH_AT + i * 2 * F),
      );
      basExits.forEach((el, i) => tl.fromTo(el, { y: 0, opacity: 1 }, { y: 16, opacity: 0, duration: 6 * F, ease: MID }, MORPH_AT + i * 2 * F));
      exits.forEach((el, i) => tl.fromTo(el, { y: 0 }, { y: -140, duration: 10 * F, ease: OUT }, MORPH_AT + (2 + i * 2) * F));
      tl.fromTo(notesContent, { autoAlpha: 1 }, { autoAlpha: 0, duration: F, ease: "none" }, MORPH_AT + MORPH_DURATION);

      // Arrivée du chat : la question s'écrit lettre par lettre, les outils montent un par un.
      const question = q("mp-question") as unknown as SVGTextElement;
      const text = question.textContent ?? "";
      const cx = [...text].map((_, i) => question.getStartPositionOfChar(i).x);
      question.textContent = "";
      const chars = [...text].map((c, i) => {
        const t = document.createElementNS(SVG_NS, "tspan");
        t.setAttribute("x", String(cx[i]));
        t.setAttribute("fill-opacity", "0");
        t.textContent = c;
        question.appendChild(t);
        return t;
      });
      const each = (0.7 - 0.28) / Math.max(1, chars.length - 1);
      tl.fromTo(question, { autoAlpha: 0 }, { autoAlpha: 1, duration: F, ease: "none" }, CHAT_AT);
      gsap.set(question, { autoAlpha: 0 });
      chars.forEach((t, i) =>
        tl.fromTo(
          t,
          { attr: { x: cx[i] + 70, "fill-opacity": 0 } },
          { attr: { x: cx[i], "fill-opacity": 1 }, duration: 0.28, ease: "sine.out" },
          CHAT_AT + i * each,
        ),
      );
      // La flèche d'envoi est un calque à part dans le package : elle suit le bouton rond.
      const controls = [["add-button"], ["search-control"], ["computer-control"], ["model-control"], ["microphone"], ["voice-button", "voice-arrow"]].map(
        (ids) => wrap(ids.map((id) => q(`mp-${id}`))),
      );
      controls.forEach((el, i) => entrance(el, CHAT_AT + i * 2 * F, "y", 24));

      tl.addLabel("notes", MORPH_AT);
      tl.addLabel("chat", CHAT_AT + 26 * F);
      tl.set({}, {}, CHAT_AT + 26 * F);

      const render = () => {
        const t = tl.time();
        for (const s of springs) {
          const v = springValue(s, t);
          s.e.setAttribute("transform", s.axis === "x" ? `translate(${v} 0)` : `translate(0 ${v})`);
        }
        for (const f of updaters) f(t);
      };
      // Suit chaque rendu de la timeline, retour à l'image 0 compris.
      tl.eventCallback("onUpdate", render);
      tl.seek(0);
      render();

      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) {
        tl.seek("chat");
        render();
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

      // Ouverture : quand la section est presque en place (à 70 %, elle partait pendant le texte précédent).
      ScrollTrigger.create({
        trigger: section,
        start: "top 15%",
        onEnter: () => goTo("notes"),
        onLeaveBack: () => goTo(0),
      });
      // Section fixée : Notes sur la première moitié du scroll, Chat sur la seconde.
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=120%",
        pin: true,
        onUpdate: (self) => goTo(self.progress > 0.45 ? "chat" : "notes"),
        onLeaveBack: () => goTo("notes"),
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="relative flex h-screen flex-col items-center justify-center overflow-hidden bg-background px-4">
      <svg
        ref={stageRef}
        viewBox="90 130 900 800"
        className="h-auto w-[min(88%,34rem,68vh)]"
        // Note ouverte un peu plus petite : 88 % de la largeur sur téléphone, 34 rem au plus, et jamais plus de 60 % de
        // la hauteur de l'écran (68vh de large pour un cadre de 900 × 800).
        role="img"
        aria-label="L'icône de Notes s'ouvre en une note Codex et Claude Code, qui se transforme en barre de saisie de chat"
      >
        <defs>
          <clipPath id="mc-clip">
            <rect className="mc-clip-rect" {...COMPACT} />
          </clipPath>
        </defs>
        <g id="mc-camera">
          <rect className="mc-card stroke-black/10 dark:stroke-white/10" strokeWidth={2} fill="#fffcf4" {...COMPACT} />
          <g clipPath="url(#mc-clip)">
            <g id="mn-content" dangerouslySetInnerHTML={{ __html: notesMarkup }} />
            <g dangerouslySetInnerHTML={{ __html: iconMarkup }} />
            <g id="mp-content" dangerouslySetInnerHTML={{ __html: promptMarkup }} />
          </g>
        </g>
      </svg>
    </section>
  );
}
