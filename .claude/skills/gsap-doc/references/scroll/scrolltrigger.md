---
name: scrolltrigger
description: Plugin GSAP pour déclencher et scrubber des animations au scroll avec pinning, snapping et callbacks.
source: https://gsap.com/docs/v3/Plugins/ScrollTrigger
scraped: 2026-05-23
topic: gsap-scroll
---

## Résumé

ScrollTrigger permet de lier n'importe quelle animation GSAP à la position du scroll. Il supporte le scrubbing (lier la progression d'une animation à la barre de scroll), le pinning (épingler un élément pendant le scroll), le snapping (aligner le scroll sur des points précis) et de nombreux callbacks. Il est infiniment flexible et gère aussi bien les pages verticales qu'horizontales.

## Points clés

- `trigger` : l'élément dont la position détermine le déclenchement. `start` / `end` : positions en string (`"top center"`), nombre ou fonction
- `scrub` : `true` pour lier directement au scroll, nombre en secondes pour ajouter un lissage (ex: `scrub: 1`)
- `pin` : épingle un élément en place pendant que le reste de la page défile. `pinSpacing` contrôle l'ajout de padding
- `snap` : snapping vers des points précis — nombre, tableau, fonction, `"labels"` ou objet de configuration
- `toggleActions` : définit le comportement aux 4 points de toggle : `"onEnter onLeave onEnterBack onLeaveBack"` (valeurs : `"play pause resume reverse restart reset none complete"`)
- `markers` : `true` pour afficher des marqueurs de debug visuels
- `onEnter`, `onLeave`, `onEnterBack`, `onLeaveBack`, `onUpdate`, `onToggle` : callbacks
- `once: true` : kill automatique après le premier passage au end
- `invalidateOnRefresh: true` : vide les valeurs de départ de l'animation à chaque refresh
- `containerAnimation` : pour les triggers dans un conteneur à scroll horizontal — pas de pinning ni snapping dans ce mode, ease `"none"` obligatoire
- Gotcha : toujours `gsap.registerPlugin(ScrollTrigger)` pour éviter le tree-shaking en prod
- Gotcha : éviter `content-visibility: auto` sur les éléments avec ScrollTrigger
- Gotcha : créer les ScrollTriggers dans l'ordre du document (haut vers bas) pour que le pinning fonctionne correctement

## Exemples

```js
// Animation basique déclenchée au scroll
gsap.to(".element", {
  scrollTrigger: ".element",
  x: 200,
  duration: 1
});

// Timeline scrubée avec pin
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".container",
    scrub: 1,
    pin: true,
    start: "top top",
    end: "+=1000"
  }
});
tl.from(".box", { x: 500 }).to(".box", { rotation: 360 });

// ScrollTrigger standalone avec callbacks
ScrollTrigger.create({
  trigger: "#section",
  start: "top center",
  onEnter: () => console.log("entered"),
  onUpdate: self => console.log("progress:", self.progress.toFixed(2))
});

// Responsive avec matchMedia
ScrollTrigger.matchMedia({
  "(min-width: 992px)": function() {
    ScrollTrigger.create({ trigger: "#el", start: "top center" });
  }
});
```

## Source

https://gsap.com/docs/v3/Plugins/ScrollTrigger

## Méthodes statiques

- `ScrollTrigger.refresh(safe?)` — recalcule toutes les positions (utile après changement DOM)
- `ScrollTrigger.kill(revert?, resetTo?)` — kill tous les ScrollTriggers (alias : `ScrollTrigger.killAll()`)
- `ScrollTrigger.getAll()` — retourne un tableau de toutes les instances actives
- `ScrollTrigger.getById(id)` — récupère une instance par son id
- `ScrollTrigger.addEventListener(type, callback)` — écoute les events (`"refresh"`, `"refreshInit"`, `"matchMedia"`, `"revert"`, `"scrollStart"`, `"scrollEnd"`)
- `ScrollTrigger.removeEventListener(type, callback)`
- `ScrollTrigger.normalizeScroll(normalize)` — normalise le scroll cross-browser
- `ScrollTrigger.batch(triggers, vars)` — déclenche des animations groupées avec stagger automatique
- `ScrollTrigger.create(vars)` — crée un ScrollTrigger standalone
- `ScrollTrigger.defaults(config)` — définit des valeurs par défaut pour tous les ScrollTriggers
- `ScrollTrigger.config(vars)` — configuration globale (autoRefreshEvents, limitCallbacks, etc.)
- `ScrollTrigger.isInViewport(element, proportion, horizontal)` — vérifie si un élément est dans le viewport
- `ScrollTrigger.isScrolling()` — retourne `true` si le scroll est en cours
- `ScrollTrigger.maxScroll(scroller, horizontal)` — retourne la position de scroll maximale
- `ScrollTrigger.observe(config)` — observe les changements de scroll sur n'importe quel élément
- `ScrollTrigger.saveStyles(targets)` — sauvegarde les styles inline pour restauration
- `ScrollTrigger.scrollerProxy(scroller, vars)` — proxy pour les scrollers custom (ex: Locomotive)
- `ScrollTrigger.sort(func)` — trie les instances par ordre de refresh
- `ScrollTrigger.update()` — force une mise à jour immédiate de toutes les instances
- `ScrollTrigger.matchMedia(vars)` — responsive breakpoints (remplacé par `gsap.matchMedia()` en GSAP 3.11+)

## Propriétés d'instance

- `self.progress` — progression entre 0 et 1
- `self.direction` — direction de scroll : `1` (vers bas) ou `-1` (vers haut)
- `self.isActive` — boolean : dans la zone active ou non
- `self.start` / `self.end` — positions en pixels
- `self.trigger` — l'élément trigger DOM
- `self.scroller` — l'élément scrollable
- `self.animation` — la tween/timeline associée (si définie)
- `self.pin` — l'élément épinglé (si `pin` est défini)
- `self.vars` — les vars de configuration originales

## Méthodes d'instance

- `self.kill(revert?, allowAnimation?)` — détruit l'instance
- `self.disable(revert?, allowAnimation?)` — désactive sans détruire
- `self.enable(reset?)` — réactive
- `self.refresh()` — recalcule les positions de cette instance
- `self.scroll(position?)` — get/set la position de scroll
- `self.getVelocity()` — retourne la vitesse de scroll en px/s
- `self.getTween(snap?)` — retourne la tween de snap associée
- `self.labelToScroll(label)` — convertit un label de timeline en position de scroll
- `self.next()` / `self.previous()` — navigue vers le ScrollTrigger suivant/précédent

## Options avancées

- `scroller` : conteneur de scroll custom (ex: `"#smooth-content"`, un élément DOM, ou `window`)
- `horizontal: true` : scroll horizontal au lieu de vertical
- `fastScrollEnd: true` : déclenche `onLeave`/`onLeaveBack` immédiatement si scroll rapide (vitesse seuil défaut : 2500 px/s). Accepte un nombre pour personnaliser le seuil
- `refreshPriority` : contrôle l'ordre de refresh — valeur haute = rafraîchi en premier. Utile pour séquencer les pins
- `preventOverlaps` : évite que plusieurs animations pinned se chevauchent. `true` pour toutes, ou string pour grouper
- `id` : string pour identifier le trigger — utilisable avec `ScrollTrigger.getById()` et GSDevTools
- `endTrigger` : élément différent du trigger pour définir la fin de la zone active

## ScrollTrigger.batch()

```js
// Animer les éléments au fur et à mesure qu'ils entrent dans la vue
ScrollTrigger.batch(".card", {
  onEnter: batch => gsap.from(batch, { opacity: 0, y: 40, stagger: 0.1 }),
  onLeave: batch => gsap.to(batch, { opacity: 0 }),
  onEnterBack: batch => gsap.to(batch, { opacity: 1 }),
  interval: 0.1,  // délai max entre chaque élément du batch
  start: "top 90%"
});
```

## React / Cleanup

```js
import { useGSAP } from "@gsap/react";

// Pattern recommandé — cleanup automatique via gsap.context()
useGSAP(() => {
  ScrollTrigger.create({
    trigger: containerRef.current,
    start: "top center",
    onEnter: () => { /* ... */ }
  });
}, { scope: containerRef });

// Sans useGSAP — cleanup manuel obligatoire
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    ScrollTrigger.create({ trigger: ref.current, start: "top center" });
  }, containerRef);
  return () => ctx.revert();
}, []);
```
