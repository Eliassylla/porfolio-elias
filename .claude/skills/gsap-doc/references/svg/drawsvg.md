---
name: drawsvg
description: Plugin GSAP pour révéler ou cacher progressivement le stroke d'éléments SVG (path, line, rect, etc.).
source: https://gsap.com/docs/v3/Plugins/DrawSVGPlugin
scraped: 2026-05-23
topic: gsap-svg
---

## Résumé

DrawSVGPlugin anime la propriété `stroke-dashoffset` / `stroke-dasharray` des éléments SVG pour révéler ou cacher progressivement leur tracé. Il fonctionne avec `<path>`, `<line>`, `<polyline>`, `<polygon>`, `<rect>` et `<ellipse>`. Il n'affecte que le `stroke`, pas le `fill`.

## Points clés

- S'utilise comme propriété `drawSVG` dans un tween GSAP
- Valeurs : pourcentage (`"100%"`), deux pourcentages pour un segment (`"20% 80%"`), nombre (longueur absolue), ou `"true"`
- Ajouter `"live"` à la valeur pour recalculer à chaque tick (responsive) : `drawSVG: "100% live"`
- `DrawSVGPlugin.getLength(element)` : retourne la longueur du stroke d'un élément SVG
- `DrawSVGPlugin.getPosition(element)` : retourne la position DrawSVG actuelle
- Pattern reveal depuis zéro : `gsap.from("#path", { drawSVG: 0 })`
- Pattern reveal depuis le centre : `gsap.fromTo("#path", { drawSVG: "50% 50%" }, { drawSVG: "0% 100%" })`
- Gotcha : n'affecte que le `stroke`, pas le `fill`
- Gotcha : Firefox peut avoir des problèmes de calcul de longueur — ajouter des anchors ou dépasser légèrement le pourcentage
- Gotcha : bug iOS Safari avec `<rect>` — convertir en `<path>` ou `<polyline>`
- Gotcha : le contenu d'un `<use>` ne peut pas être affecté

## Exemples

```js
gsap.registerPlugin(DrawSVGPlugin);

// Révéler un path de 0 à 100%
gsap.from("#path", { duration: 2, drawSVG: 0 });

// Animer un segment du path
gsap.to("#path", { duration: 1, drawSVG: "20% 80%" });

// Révéler depuis le centre vers les extrémités
gsap.fromTo("#path",
  { drawSVG: "50% 50%" },
  { duration: 1.5, drawSVG: "0% 100%" }
);

// Stagger sur plusieurs éléments SVG
gsap.from(".draw-me", {
  duration: 1,
  stagger: 0.15,
  drawSVG: 0,
  ease: "power2.inOut"
});

// Dans une timeline
const tl = gsap.timeline();
tl.from(".line-1", { duration: 1, drawSVG: 0 })
  .from(".line-2", { duration: 0.8, drawSVG: 0 }, "-=0.3");
```

## Source

https://gsap.com/docs/v3/Plugins/DrawSVGPlugin
