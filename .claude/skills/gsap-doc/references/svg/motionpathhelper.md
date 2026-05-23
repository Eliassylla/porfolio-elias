---
name: motionpathhelper
description: Outil GSAP pour éditer interactivement un motion path dans le navigateur par drag d'anchors.
source: https://gsap.com/docs/v3/Plugins/MotionPathHelper
scraped: 2026-05-23
topic: gsap-svg
---

## Résumé

MotionPathHelper est un outil de développement (pas un plugin de production) qui permet d'éditer visuellement un motion path directement dans le navigateur. On peut déplacer des anchors, ajouter/supprimer des points, et copier le path data résultant pour l'utiliser dans son code. Il nécessite MotionPathPlugin.

## Points clés

- `MotionPathHelper.create(tween | element | selector)` : crée l'interface d'édition
- Peut recevoir un tween existant ou un sélecteur avec config : `MotionPathHelper.create("#id", { path: "#path" })`
- `MotionPathHelper.editPath(path, config)` : édite un path SVG existant sans tween
- `kill()` : supprime l'interface d'édition
- Config options : `path`, `pathColor`, `pathWidth`, `pathOpacity`, `selected`, `start`, `end`, `duration`, `ease`
- Raccourcis clavier d'édition :
  - ALT+Click : ajouter un point
  - ALT+Click sur anchor : toggle smooth/corner
  - ALT+Drag depuis corner : créer une poignée
  - SHIFT+Click : sélection multiple
  - DELETE : supprimer l'anchor sélectionné
  - CTRL+Z : annuler
- Gotcha : outil de dev uniquement — ne pas inclure en production
- Gotcha : nécessite MotionPathPlugin chargé et enregistré

## Exemples

```js
gsap.registerPlugin(MotionPathPlugin, MotionPathHelper);

// Depuis un tween existant
const tween = gsap.to("#rocket", {
  motionPath: {
    path: "#flightPath",
    align: "#flightPath",
    alignOrigin: [0.5, 0.5]
  }
});
MotionPathHelper.create(tween);

// Depuis un sélecteur avec config
MotionPathHelper.create("#rocket", {
  path: "#flightPath",
  pathWidth: 3,
  pathColor: "#ff6600",
  selected: true,
  duration: 4,
  ease: "power2.inOut"
});

// Éditer un path SVG directement
MotionPathHelper.editPath("#myPath", { selected: true });
```

## Source

https://gsap.com/docs/v3/Plugins/MotionPathHelper
