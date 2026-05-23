---
name: motionpath
description: Plugin GSAP pour animer un élément le long d'un chemin SVG ou d'un tableau de coordonnées.
source: https://gsap.com/docs/v3/Plugins/MotionPathPlugin
scraped: 2026-05-23
topic: gsap-svg
---

## Résumé

MotionPathPlugin anime n'importe quel objet DOM ou SVG le long d'un chemin défini par un `<path>` SVG, des données path brutes, ou un tableau de coordonnées. Il supporte la rotation automatique selon la direction du chemin, l'alignement sur un SVG parent, et la définition de points de départ/fin.

## Points clés

- S'utilise via `motionPath` dans un tween : `gsap.to(el, { motionPath: { path: "#svgPath" } })`
- `path` (requis) : sélecteur SVG, données path string, ou tableau d'objets `{x, y}`
- `align` : aligne l'élément sur le path en gérant les transforms imbriquées — sélecteur, élément ou `"self"`
- `alignOrigin` : point sur l'élément aligné avec le path — ex: `[0.5, 0.5]` pour le centre
- `autoRotate` : `true` pour tourner selon la direction, ou un nombre en degrés de décalage
- `start` / `end` : position de départ/fin sur le path (0–1)
- `curviness` : courbure d'un path tracé à travers des points (défaut 1)
- `fromCurrent: true` (défaut) : l'animation part de la position actuelle de l'élément — mettre `false` pour partir directement du premier point
- `relative: true` : interprète les valeurs du tableau comme relatives au point précédent
- `type: "cubic"` : si le tableau contient des points de contrôle bezier cubiques
- Gotcha : l'alignement n'est **pas responsive** — gérer les resize manuellement et recréer le tween
- Gotcha : `autoRotate` nécessite `transformOrigin` correctement défini pour une rotation depuis le centre
- Gotcha : tableau de points sans `type: "cubic"` → la courbe passe **à travers** les points (pas dessus)

## Exemples

```js
gsap.registerPlugin(MotionPathPlugin);

// Animation le long d'un path SVG avec rotation auto
gsap.to("#rocket", {
  duration: 3,
  motionPath: {
    path: "#flightPath",
    align: "#flightPath",
    alignOrigin: [0.5, 0.5],
    autoRotate: true
  }
});

// Animation à travers des coordonnées
gsap.to(".dot", {
  duration: 2,
  motionPath: {
    path: [{ x: 0, y: 0 }, { x: 100, y: -80 }, { x: 200, y: 0 }],
    curviness: 1.5
  }
});

// Segment partiel d'un path (50% à 100%)
gsap.to("#el", {
  motionPath: { path: "#myPath", start: 0.5, end: 1 }
});
```

## Source

https://gsap.com/docs/v3/Plugins/MotionPathPlugin
