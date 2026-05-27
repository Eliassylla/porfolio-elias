---
name: inertia
description: Plugin GSAP pour animer des propriétés avec vélocité et résistance, idéal pour le momentum post-drag.
source: https://gsap.com/docs/v3/Plugins/InertiaPlugin
scraped: 2026-05-23
topic: gsap-ui
---

## Résumé

InertiaPlugin permet d'animer des propriétés avec une vélocité initiale qui décélère naturellement (comme un objet lancé). Il est typiquement utilisé avec Draggable pour créer des effets de momentum post-drag (flick). Il peut aussi tracker automatiquement la vélocité de propriétés pendant un drag pour une transition fluide.

## Points clés

- S'utilise dans `gsap.to()` via la propriété `inertia: { x: 500, y: -300 }`
- `velocity` : vélocité initiale en unités par seconde — ou `"auto"` si tracking actif
- `min` / `max` : limites de la valeur finale
- `end` : valeur finale précise (Number), valeurs de snap (Array), ou fonction personnalisée
- `resistance` : résistance par seconde (contrôle la durée de décélération)
- `linkedProps` : propriétés liées pour les fonctions `end` multi-axe (ex: `"x,y"`)
- `InertiaPlugin.track(target, props)` : démarre le tracking de vélocité automatique
- `InertiaPlugin.untrack(target, props)` : arrête le tracking
- `InertiaPlugin.getVelocity(target, property)` : récupère la vélocité actuelle d'une propriété
- `InertiaPlugin.isTracking(target, property)` : vérifie si une propriété est trackée
- Gotcha : démarrer le tracking **au moins 0.5 seconde** avant d'en avoir besoin — le tracker a besoin de temps pour mesurer la vitesse
- Gotcha : avec `track()`, on peut omettre `velocity` dans la config `inertia`

## Exemples

```js
gsap.registerPlugin(InertiaPlugin);

// Inertie simple
gsap.to(".ball", {
  inertia: { x: 500, y: -300 }
});

// Avec limites et snapping
gsap.to(".el", {
  inertia: {
    x: { velocity: 800, end: [0, 200, 400, 600], min: 0, max: 600 }
  }
});

// Tracking automatique (usage typique avec Draggable)
InertiaPlugin.track(".handle", "x,y");

// ... après un drag ...
gsap.to(".handle", {
  inertia: { x: { end: 0 }, y: { end: 0 } }
  // velocity automatiquement récupérée du tracker
});
```

## Source

https://gsap.com/docs/v3/Plugins/InertiaPlugin
