---
name: draggable
description: Plugin GSAP pour rendre des éléments DOM draggables avec bounds, snap, inertie et callbacks.
source: https://gsap.com/docs/v3/Plugins/Draggable
scraped: 2026-05-23
topic: gsap-ui
---

## Résumé

Draggable permet de rendre n'importe quel élément DOM draggable par l'utilisateur, avec support du touch, de la rotation, des limites de déplacement, du snapping et de l'inertie (via InertiaPlugin). Il normalise les événements entre souris, touch et pointer pour une compatibilité universelle.

## Points clés

- `Draggable.create(target, vars)` : méthode statique pour créer une ou plusieurs instances
- `type` : `"x,y"` (défaut), `"x"`, `"y"`, `"left,top"`, `"rotation"` — définit l'axe de déplacement
- `bounds` : élément, sélecteur, ou objet `{top, left, width, height}` / `{minRotation, maxRotation}`
- `inertia: true` : active le momentum après release (nécessite InertiaPlugin)
- `snap` : snapping **après** release — tableau, fonction ou objet
- `liveSnap` : snapping **pendant** le drag — tableau, fonction ou objet
- `lockAxis: true` : verrouille l'axe selon la direction initiale du drag
- `autoScroll` : active le scroll automatique dans des conteneurs scrollables
- `onDrag`, `onDragStart`, `onDragEnd`, `onPress`, `onRelease` : callbacks principaux
- `Draggable.get(target)` : récupère l'instance Draggable d'un élément
- `Draggable.hitTest(el1, el2)` : vérifie le chevauchement entre deux éléments
- Gotcha : l'inertie (momentum/flick) nécessite InertiaPlugin
- Gotcha : `type: "top,left"` nécessite `position: relative` ou `absolute` sur l'élément
- Gotcha : `this` dans les callbacks = instance Draggable. Utiliser `callbackScope` pour changer le contexte

## Exemples

```js
gsap.registerPlugin(Draggable, InertiaPlugin);

// Drag basique
Draggable.create(".card");

// Drag contraint avec inertie et snapping
Draggable.create(".slider", {
  type: "x",
  bounds: "#container",
  inertia: true,
  snap: [0, 100, 200, 300]
});

// Rotation draggable avec limites
Draggable.create(".knob", {
  type: "rotation",
  bounds: { minRotation: 0, maxRotation: 270 },
  onDrag: function() {
    console.log("rotation:", this.rotation);
  }
});

// Hit testing (drag & drop)
Draggable.create(".draggable", {
  onDragEnd: function() {
    if (Draggable.hitTest(this.target, ".dropzone")) {
      console.log("dropped in zone!");
    }
  }
});
```

## Source

https://gsap.com/docs/v3/Plugins/Draggable
