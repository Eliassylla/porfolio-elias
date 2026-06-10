---
name: timeline
description: Séquençage GSAP — gsap.timeline(), position parameter, labels, defaults, nesting et contrôle de lecture.
source: https://gsap.com/docs/v3/GSAP/Timeline
scraped: 2026-06-10
topic: gsap-core
---

## Résumé

Une `gsap.timeline()` est un conteneur qui orchestre plusieurs tweens dans le temps. Par défaut, chaque tween ajouté est **mis à la suite** du précédent (séquence). Le *position parameter* permet de placer un tween à un moment précis, en relatif, ou sur un label — pour des chorégraphies en parallèle ou en chevauchement. À préférer dès qu'on enchaîne plus de deux animations (au lieu de jongler avec des `delay`).

## Points clés

- Création : `const tl = gsap.timeline();` puis `tl.to(...).to(...)` — les tweens s'**append** automatiquement
- `defaults` : vars héritées par tous les tweens enfants (`gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } })`)
- `paused: true` : crée la timeline en pause — démarrer avec `.play()`
- `repeat` / `yoyo` : s'appliquent à toute la timeline (pas à un seul tween)
- Callbacks : `onStart`, `onUpdate`, `onComplete` au niveau timeline
- Labels : `addLabel(name, position)` pour des points de repère nommés et lisibles
- Nesting : une timeline peut en contenir une autre via `master.add(child, position)`
- Gotcha : la « duration » d'une timeline est déterminée par ses enfants — ce n'est PAS une option du constructeur
- Gotcha : ne JAMAIS mettre un ScrollTrigger sur un tween enfant d'une timeline. Le ScrollTrigger va sur la timeline (ou le tween top-level) uniquement

## Position parameter

Troisième argument de `.to()/.from()` (ou propriété `position` dans les vars) :

| Valeur | Effet |
|--------|-------|
| `0`, `1.5` | Position **absolue** en secondes |
| `"+=0.5"` | 0.5 s **après** la fin de la timeline |
| `"-=0.2"` | 0.2 s **avant** la fin (chevauchement) |
| `"<"` | Démarre en même temps que le tween précédent |
| `">"` | Démarre à la fin du tween précédent (défaut) |
| `"<0.2"` | 0.2 s après le DÉBUT du tween précédent |
| `"label"` | Sur le label ; `"label+=0.3"` 0.3 s après |

```js
tl.to(".a", { x: 100 }, 0)          // à 0 s
  .to(".b", { y: 50 }, "+=0.5")     // 0.5 s après la fin de .a
  .to(".c", { opacity: 0 }, "<")    // en même temps que .b
  .to(".d", { scale: 2 }, "<0.2");  // 0.2 s après le début de .b/.c
```

## Exemples

```js
// Séquence simple avec defaults partagés
const tl = gsap.timeline({ defaults: { duration: 0.5, ease: "power2.out" } });
tl.to(".a", { x: 100 })
  .to(".b", { y: 50 })
  .to(".c", { opacity: 0, duration: 0.3 }); // override ponctuel

// Labels pour un séquençage lisible
tl.addLabel("intro", 0)
  .to(".hero", { opacity: 1 }, "intro")
  .addLabel("outro", "+=0.5")
  .to(".hero", { opacity: 0 }, "outro");
tl.play("outro"); // démarre depuis le label

// Nesting : composer des sous-timelines
const master = gsap.timeline();
const child = gsap.timeline();
child.to(".a", { x: 100 }).to(".b", { y: 50 });
master.add(child, 0).to(".c", { opacity: 0 }, "+=0.2");
```

## Contrôle de lecture

- `tl.play()` / `tl.pause()` / `tl.resume()`
- `tl.reverse()` — joue à l'envers
- `tl.restart()` — repart du début
- `tl.time(2)` — saute à 2 s ; `tl.progress(0.5)` — saute à 50 %
- `tl.timeScale(2)` — accélère ×2 (0.5 = ralenti)
- `tl.kill()` — détruit la timeline et ses enfants

## React / Cleanup

```js
import { useGSAP } from "@gsap/react";

// useGSAP revert automatiquement la timeline au unmount
useGSAP(() => {
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  tl.from(".title", { y: 30, opacity: 0 })
    .from(".subtitle", { y: 20, opacity: 0 }, "-=0.3")
    .from(".cta", { scale: 0.9, opacity: 0 }, "-=0.2");
}, { scope: containerRef });
```

## Bonnes pratiques

- ✅ Préférer une timeline + position parameter plutôt qu'enchaîner des `delay`
- ✅ Passer `defaults` au constructeur quand les enfants partagent duration/ease
- ✅ Utiliser des labels (`addLabel`) pour les séquences longues — plus maintenable
- ✅ ScrollTrigger uniquement sur la timeline top-level, jamais sur un tween imbriqué

## Source

https://gsap.com/docs/v3/GSAP/Timeline
