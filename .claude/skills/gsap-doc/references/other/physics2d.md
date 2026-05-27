---
name: physics2d
description: Plugin GSAP pour simuler la physique 2D (vélocité, gravité, angle, friction) sur des propriétés x/y.
source: https://gsap.com/docs/v3/Plugins/Physics2DPlugin
scraped: 2026-05-23
topic: gsap-other
---

## Résumé

Physics2DPlugin simule une physique simple en 2D pour animer les coordonnées `x`/`y` d'un objet selon une combinaison de vélocité, angle, gravité, accélération et friction. Idéal pour des effets de particules, projectiles ou rebonds stylisés. La durée et l'easing définis sur le tween sont ignorés pour les propriétés physiques.

## Points clés

- S'utilise via la propriété `physics2D` dans `gsap.to()` ou `gsap.fromTo()`
- `velocity` : vélocité initiale en pixels par seconde (défaut 0)
- `angle` : angle de départ en degrés (défaut 0 = droite)
- `gravity` : accélération vers le bas en pixels par seconde² — raccourci pour `acceleration` + `accelerationAngle: 90`
- `acceleration` : accélération générale en pixels par seconde²
- `accelerationAngle` : direction de l'accélération en degrés
- `friction` : valeur entre 0 et 1 pour simuler la résistance (0 = aucune friction)
- `xProp` / `yProp` : noms des propriétés à animer (défaut `"x"` et `"y"`)
- Gotcha : les equations d'easing définies pour le tween sont **complètement ignorées** pour les propriétés physiques
- Gotcha : pas de détection de collision incluse
- Gotcha : `gravity` et `acceleration` simultanément non supportés
- Gotcha : les paramètres physiques ne sont pas dynamiquement modifiables après le démarrage du tween
- Gotcha : `friction` consomme plus de ressources CPU

## Exemples

```js
gsap.registerPlugin(Physics2DPlugin);

// Projectile simple (ballon lancé)
gsap.to(".ball", {
  physics2D: {
    velocity: 400,
    angle: -60,    // 60° vers le haut
    gravity: 500
  }
});

// Particules avec friction
gsap.to(".particle", {
  physics2D: {
    velocity: gsap.utils.random(100, 300),
    angle: gsap.utils.random(0, 360),
    gravity: 200,
    friction: 0.1
  }
});

// Accélération directionnelle
gsap.to(".el", {
  physics2D: {
    velocity: 200,
    angle: 0,
    acceleration: 150,
    accelerationAngle: 45
  }
});
```

## Source

https://gsap.com/docs/v3/Plugins/Physics2DPlugin
