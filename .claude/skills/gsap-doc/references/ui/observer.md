---
name: observer
description: Plugin GSAP pour détecter les gestes utilisateur (wheel, touch, pointer, scroll) de façon unifiée.
source: https://gsap.com/docs/v3/Plugins/Observer
scraped: 2026-05-23
topic: gsap-ui
---

## Résumé

Observer est un utilitaire qui unifie la détection de gestes utilisateur (molette, touch, pointer, scroll) sur tous les appareils sans avoir à gérer les incompatibilités entre events. Il est idéal pour créer des navigations par sections, des slideshows contrôlés au scroll/swipe, ou tout autre interaction gestuelle complexe.

## Points clés

- `Observer.create(vars)` : crée une instance avec configuration
- `type` : string de types d'events à écouter : `"wheel,touch,scroll,pointer"` (tous par défaut sauf scroll)
- `target` : élément observé (défaut : viewport)
- `tolerance` : pixels minimum à déplacer avant de déclencher les callbacks
- `onUp`, `onDown`, `onLeft`, `onRight` : callbacks directionnels
- `onChange`, `onChangeX`, `onChangeY` : callbacks sur tout changement
- `onDrag`, `onDragStart`, `onDragEnd` : callbacks pour le drag actif
- `onWheel`, `onPress`, `onRelease`, `onMove`, `onHover`, `onHoverEnd` : callbacks spécifiques
- `debounce: true` (défaut) : debounce les events pour la perf — `onPress`, `onRelease`, `onDragStart`, `onDragEnd` ne sont jamais debounced
- `lockAxis: true` : détecte et verrouille l'axe dominant
- `wheelSpeed` : multiplicateur pour la molette. `scrollSpeed` : pour le scroll
- Gotcha : si ScrollTrigger est déjà chargé, Observer est inclus dedans — utiliser `ScrollTrigger.observe()` directement
- Gotcha : `onMove` se déclenche sur tout mouvement pointeur. `onDrag` seulement pendant le press+move
- Gotcha : `kill()` supprime définitivement — `disable()` est réversible via `enable()`

## Exemples

```js
gsap.registerPlugin(Observer);

// Navigation par sections au scroll/swipe
let currentIndex = 0;
const sections = gsap.utils.toArray(".section");

Observer.create({
  type: "wheel,touch",
  tolerance: 10,
  preventDefault: true,
  onDown: () => {
    if (currentIndex > 0) goToSection(--currentIndex);
  },
  onUp: () => {
    if (currentIndex < sections.length - 1) goToSection(++currentIndex);
  }
});

// Suivi de vélocité
Observer.create({
  type: "pointer",
  onMove: (self) => {
    console.log("velocityX:", self.velocityX, "deltaY:", self.deltaY);
  }
});
```

## Source

https://gsap.com/docs/v3/Plugins/Observer
