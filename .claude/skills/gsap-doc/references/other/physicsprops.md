---
name: physicsprops
description: Plugin GSAP pour animer n'importe quelle propriété avec vélocité et accélération sans valeur finale fixe.
source: https://gsap.com/docs/v3/Plugins/PhysicsPropsPlugin
scraped: 2026-05-23
topic: gsap-other
---

## Résumé

PhysicsPropsPlugin est similaire à Physics2DPlugin mais applique la physique à n'importe quelle propriété numérique (pas seulement x/y). Utile quand on veut qu'une propriété évolue selon une vélocité et une accélération sans valeur finale prédéfinie — la physique détermine elle-même où l'animation s'arrête.

## Points clés

- S'utilise via la propriété `physicsProps` dans un tween GSAP
- `velocity` : vélocité initiale en unités par seconde (défaut 0)
- `acceleration` : accélération en unités par seconde² (défaut 0)
- `friction` : valeur entre 0 et 1 — 0 = aucune friction, 0.08 = légère, 1 = blocage total (défaut 0)
- Pas de valeur finale fixe : la physique détermine quand le mouvement s'arrête
- Les equations d'easing définies pour le tween sont **ignorées** pour les propriétés physiques
- Les tweens basés sur la physique sont réversibles : les mettre dans une timeline et appeler `reverse()` pour retracer les mouvements
- Gotcha : `friction` n'est pas scientifiquement précis — expérimenter avec de très petites valeurs (ex: `0.02`)
- Gotcha : `friction` consomme plus de ressources CPU
- Gotcha : les paramètres physiques ne sont pas modifiables dynamiquement après démarrage

## Exemples

```js
gsap.registerPlugin(PhysicsPropsPlugin);

// Rotation avec vélocité décroissante
gsap.to(".spinner", {
  physicsProps: {
    rotation: { velocity: 720, friction: 0.04 }
  }
});

// Plusieurs propriétés physiques simultanées
gsap.to(".el", {
  physicsProps: {
    x: { velocity: 300, acceleration: -50 },
    opacity: { velocity: -0.5, friction: 0.1 }
  }
});

// Timeline réversible avec physique
const tl = gsap.timeline();
tl.to(".ball", {
  physicsProps: {
    y: { velocity: 500, acceleration: 200, friction: 0.02 }
  }
});
// tl.reverse() retrace exactement le même mouvement à rebours
```

## Source

https://gsap.com/docs/v3/Plugins/PhysicsPropsPlugin
