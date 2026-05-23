---
name: morphsvg
description: Plugin GSAP pour morphing fluide entre deux formes SVG en animant les données du path.
source: https://gsap.com/docs/v3/Plugins/MorphSVGPlugin
scraped: 2026-05-23
topic: gsap-svg
---

## Résumé

MorphSVGPlugin anime la propriété `d` d'un `<path>` SVG pour le transformer progressivement en une autre forme. Il gère automatiquement l'alignement des points entre deux paths de complexités différentes. Il peut aussi rendre dans un `<canvas>` pour les performances.

## Points clés

- Usage minimal : `gsap.to("#shape", { morphSVG: "#targetShape" })` — sélecteur, élément, ou données path raw
- `shape` : la forme cible (requis quand `morphSVG` est un objet)
- `shapeIndex` : contrôle comment les points du path de départ correspondent au path cible — `"auto"` par défaut, mais peut être lent sur des paths complexes. Utiliser `"log"` pour trouver la valeur idéale à hardcoder
- `curveMode` : force des anchors smooth pour éviter les kinks mid-morph
- `smooth` : ajoute des points d'ancrage pour lisser le morph — attention à ne pas en mettre trop (impact perf)
- `type` : `"linear"` (défaut) ou `"rotational"` — type d'interpolation
- `render` : fonction appelée à chaque update, utile pour canvas
- `MorphSVGPlugin.convertToPath(selector)` : convertit `<circle>`, `<rect>`, etc. en `<path>` morphable
- `precompile` : optimisation pour les morphs très complexes — calculs faits en amont
- Gotcha : `shapeIndex: "auto"` peut être lent au premier render sur paths complexes — hardcoder la valeur numérique
- Gotcha : si le morph est saccadé tout le long, c'est la complexité SVG/rendu navigateur, pas GSAP — simplifier le SVG
- Gotcha : avec `render` sur canvas, utiliser `updateTarget: false` pour ne pas mettre à jour le SVG original

## Exemples

```js
gsap.registerPlugin(MorphSVGPlugin);

// Morph simple
gsap.to("#diamond", { duration: 1, morphSVG: "#star" });

// Morph avec options
gsap.to("#shape", {
  duration: 1.5,
  morphSVG: {
    shape: "#targetShape",
    shapeIndex: 3,   // valeur optimale trouvée via "log"
    type: "rotational"
  }
});

// Convertir un cercle en path avant morphing
MorphSVGPlugin.convertToPath("circle");
gsap.to("circle", { morphSVG: "#star" });

// Timeline avec plusieurs morphs
const tl = gsap.timeline({ repeat: -1 });
tl.to("#morph", { duration: 1, morphSVG: "#shape2" })
  .to("#morph", { duration: 1, morphSVG: "#shape3" })
  .to("#morph", { duration: 1, morphSVG: "#shape1" });
```

## Source

https://gsap.com/docs/v3/Plugins/MorphSVGPlugin
