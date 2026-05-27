---
name: gsdevtools
description: Outil de développement GSAP pour inspecter, scrubber et débugger les animations via une UI visuelle.
source: https://gsap.com/docs/v3/Plugins/GSDevTools
scraped: 2026-05-23
topic: gsap-other
---

## Résumé

GSDevTools est un outil de développement qui affiche une interface visuelle dans le navigateur pour inspecter et contrôler les animations GSAP : scrubber de timeline, contrôle de vitesse (timeScale), boucle, marqueurs in/out, et liste de toutes les animations. Outil de dev uniquement — ne pas inclure en production.

## Points clés

- `GSDevTools.create()` : crée l'interface avec la timeline globale par défaut
- `animation` : animation ou timeline spécifique à inspecter (string ID ou instance)
- `globalSync: true` : synchronise avec la root timeline
- `minimal: true` : affiche seulement scrubber, play/pause et timeScale
- `keyboard: true` (défaut) : raccourcis clavier activés
- `loop` : état initial de la boucle
- `paused` : état initial pausé
- `inTime` / `outTime` : marqueurs de début/fin pour la lecture (temps, label ou ID d'animation)
- `timeScale` : timeScale initial
- `persist: true` (défaut) : garde les paramètres entre refreshes
- `visibility: "auto"` : cache les contrôles quand la souris s'éloigne
- Assigner des `id` aux animations pour les retrouver dans le menu de sélection
- Gotcha : **ne fonctionne pas** avec les animations pilotées par ScrollTrigger
- Gotcha : une timeline globale qui dure 1000 secondes indique probablement une animation en `repeat: -1` (GSDevTools plafonne à 1000s)
- Gotcha : un seul GSDevTools peut écouter les raccourcis clavier à la fois

## Exemples

```js
gsap.registerPlugin(GSDevTools);

// Usage minimal
GSDevTools.create();

// Inspecter une timeline spécifique
const tl = gsap.timeline({ id: "hero-animation" });
tl.from(".title", { opacity: 0, y: 50 })
  .from(".subtitle", { opacity: 0, y: 30 }, "-=0.3");

GSDevTools.create({ animation: tl });

// Avec ID pour navigation rapide
const tl = gsap.timeline();
tl.to(".orange", { duration: 1, x: 700, id: "move-orange" });
tl.to(".grey", { duration: 1, x: 700, id: "move-grey" });
GSDevTools.create({ loop: true, timeScale: 0.5 });

// Obtenir et kill une instance
GSDevTools.create({ id: "main" });
// Plus tard...
GSDevTools.getById("main").kill();
```

## Source

https://gsap.com/docs/v3/Plugins/GSDevTools
