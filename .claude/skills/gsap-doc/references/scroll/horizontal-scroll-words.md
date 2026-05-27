---
name: horizontal-scroll-words
description: Pattern complet — phrase qui défile horizontalement au scroll vertical, mot par mot, avec card inline et ScrollSmoother compatible.
source: Construit pour Portfolio Hero — basé sur ScrollTrigger + containerAnimation officiel
scraped: 2026-05-23
topic: gsap-scroll-pattern
---

## Résumé

Pattern pour transformer un scroll vertical en défilement horizontal d'une phrase, où chaque mot (et éventuellement des éléments inline comme une card) anime son entrée individuellement quand il devient visible dans la zone horizontale. Compatible avec ScrollSmoother. Utilisé dans `src/sections/HeroSection.tsx`.

## Points clés

- **`pin` enfant + `pinType: "transform"`** : pinner un enfant `<div class="sticky-child">` à l'intérieur d'une section parent. `pinType: "transform"` est obligatoire avec ScrollSmoother (pas `"fixed"`).
- **Hauteur dynamique de la section parent** : NE PAS mettre `h-[XXXvh]` arbitraire. Calculer `section.style.height = track.scrollWidth + window.innerHeight` au mount et sur `onRefreshInit`. Sinon la section suivante apparaît trop tôt si la phrase est plus longue que la hauteur arbitraire.
- **`end: () => +=${track.scrollWidth}`** : la durée du scroll vertical doit égaler la largeur de la track horizontale (1px de scroll vertical = 1px de translate X).
- **`ease: "none"` obligatoire** sur la tween qui translate la track horizontalement (sinon scrub bizarre).
- **`containerAnimation`** : chaque mot a son propre ScrollTrigger qui utilise `containerAnimation: horizontalScrollTween`. Le `start: "left 85%"` se calcule dans le repère de la track horizontale, pas du viewport vertical. C'est ce qui synchronise l'entry de chaque mot avec sa position dans le défilement.
- **`invalidateOnRefresh: true`** + recalcul de la hauteur dans `onRefreshInit` pour gérer resize / chargement de fonts.
- **Padding initial `pl-[100vw]`** sur la track pour que le premier mot apparaisse depuis le bord droit du viewport (sinon il est déjà visible au mount).
- **Pas de double pinning** : retirer tout `sticky top-0` Tailwind sur le wrapper sticky. Laisser GSAP seul gérer le pin.
- **Card inline dans la phrase** : un `<div class="inline-flex">` au milieu des `<span>` mots, traité comme un mot pour l'animation d'entry (sélecteur combiné `.h-word, .h-card-elias`).

## Exemples

### Structure JSX minimale

```tsx
<section ref={containerRef} className="hero-story relative border-b border-border">
  <div className="hero-story-sticky relative h-screen overflow-hidden bg-background">

    {/* Scène d'intro éventuelle en absolute inset-0 */}
    <div className="scene-1 absolute inset-0 ..."> ... </div>

    {/* Phrase horizontale */}
    <div className="h-phrase-wrap absolute inset-0 flex items-center overflow-hidden">
      <div className="h-phrase-track flex items-center gap-x-4 whitespace-nowrap will-change-transform pl-[100vw] pr-24">
        {words.map((w, i) => <span key={i} className="h-word ...">{w}</span>)}
        <div className="h-card-elias inline-flex ..."> ... </div>
        {moreWords.map((w, i) => <span key={i} className="h-word ...">{w}</span>)}
      </div>
    </div>

  </div>
</section>
```

### useGSAP — moteur principal

```ts
useGSAP(() => {
  const section = containerRef.current;
  if (!section) return;
  const track = section.querySelector<HTMLElement>(".h-phrase-track");
  const wordEls = section.querySelectorAll<HTMLElement>(".h-word, .h-card-elias");
  if (!track || wordEls.length === 0) return;

  // États initiaux des mots/card : un peu plus haut + invisibles
  gsap.set(wordEls, { yPercent: -60, opacity: 0 });

  // Hauteur dynamique de la section : aligne la durée vertical = longueur horizontal
  const setSectionHeight = () => {
    section.style.height = `${track.scrollWidth + window.innerHeight}px`;
  };
  setSectionHeight();

  // Scroll horizontal piloté par scrub
  const horizontalScrollTween = gsap.to(track, {
    x: () => -(track.scrollWidth - window.innerWidth + 96), // 96 = padding final
    ease: "none",
    scrollTrigger: {
      trigger: ".hero-story",
      start: "top top",
      end: () => `+=${track.scrollWidth}`,
      pin: ".hero-story-sticky",
      pinType: "transform",
      scrub: 1,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onRefreshInit: setSectionHeight,
    },
  });

  // Entry de chaque mot quand il devient visible dans la track horizontale
  wordEls.forEach((word) => {
    gsap.to(word, {
      yPercent: 0,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: word,
        containerAnimation: horizontalScrollTween, // ← clé du pattern
        start: "left 85%",
        end: "left 55%",
        toggleActions: "play none none reverse",
      },
    });
  });
}, { scope: containerRef });
```

### Branche mobile / reduced-motion

```ts
const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const isMobile = window.matchMedia("(max-width: 768px)").matches;
if (reduce || isMobile) {
  section.style.height = "auto";
  if (sticky) {
    sticky.style.position = "relative";
    sticky.style.height = "auto";
    sticky.style.overflow = "visible";
    sticky.style.minHeight = "100vh";
  }
  if (track) {
    track.style.flexWrap = "wrap";
    track.style.whiteSpace = "normal";
    track.style.paddingLeft = "0";
    track.style.justifyContent = "center";
  }
  return;
}
```

## Gotchas rencontrés (et fix)

1. **WhatIBuildSection apparaît trop tôt en bas de la phrase**
   - Cause : `h-[400vh]` arbitraire sur la section parent. Si la phrase nécessite plus que 400vh de scroll, la section suivante remonte avant la fin du dernier mot.
   - Fix : hauteur calculée dynamiquement via `setSectionHeight()` + `onRefreshInit`.

2. **`pin: true` casse l'affichage avec ScrollSmoother + section overflow-hidden**
   - Garder `pin: ".hero-story-sticky"` (pin de l'enfant) + structure parent/enfant explicite.

3. **`text-balance` (Tailwind) ne doit PAS être appliqué aux mots ou titres splittés**
   - Référence : `references/text/splittext.md` ligne 23.

4. **Conflit Motion + GSAP sur le même élément DOM**
   - Ne jamais wrapper un élément animé par GSAP dans un `<motion.div>` avec `whileHover` etc. — les deux écrivent la propriété CSS `transform`.

5. **Cleanup React Strict Mode**
   - `useGSAP({ scope: containerRef })` gère le cleanup via `gsap.context().revert()`. Pas besoin de cleanup manuel pour les ScrollTriggers créés à l'intérieur.

## Source

- Doc officielle ScrollTrigger : https://gsap.com/docs/v3/Plugins/ScrollTrigger (option `containerAnimation`)
- Pattern utilisé sur gsap.com homepage (Animation GSAP Screen.mp4 dans `public/video/`)
- Implémentation : `src/sections/HeroSection.tsx`
