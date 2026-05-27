---
name: flip
description: Plugin GSAP implémentant la technique FLIP pour animer des changements d'état DOM sans calculs manuels.
source: https://gsap.com/docs/v3/Plugins/Flip
scraped: 2026-05-23
topic: gsap-ui
---

## Résumé

Flip implémente la technique d'animation FLIP (First, Last, Invert, Play) qui permet d'animer des changements de layout DOM complexes (réorganisation de grille, changement de classe, ajout/suppression d'éléments) de façon fluide. Le principe : capturer l'état avant, appliquer les changements DOM, puis animer depuis l'ancien état vers le nouvel état.

## Points clés

- Workflow : `Flip.getState(targets)` → modifications DOM/CSS → `Flip.from(state, vars)`
- `Flip.from(state, vars)` : anime depuis l'état capturé vers l'état actuel — retourne une Timeline GSAP
- `Flip.to(state, vars)` : anime depuis l'état actuel vers un état fourni
- `Flip.getState(targets, vars)` : capture la position/taille/opacité des éléments
- `data-flip-id` : attribut HTML pour corréler des éléments qui changent de DOM entre les deux états
- `absolute: true` : applique `position: absolute` pendant l'animation — nécessaire pour flexbox/grid
- `scale: true` : utilise `scaleX/scaleY` au lieu de `width/height` — plus performant pour les redimensionnements
- `onEnter` / `onLeave` : callbacks pour les éléments qui apparaissent ou disparaissent
- `nested: true` : compense les transforms imbriquées pour éviter les effets cumulés
- `fade: true` : cross-fade au lieu de swap immédiat
- Gotcha : Flip ne supporte pas les transforms 3D
- Gotcha : utiliser `box-sizing: border-box` recommandé
- Gotcha : avec React/Vue/Angular, attendre le re-render avant `Flip.from()` — utiliser `requestAnimationFrame()` ou `Flip.batch()`

## Exemples

```js
gsap.registerPlugin(Flip);

// Pattern de base : capturer → modifier → animer
const state = Flip.getState(".grid-item");
// ... modification DOM (classe CSS, ordre, etc.) ...
Flip.from(state, { duration: 0.6, ease: "power1.inOut", stagger: 0.05 });

// Avec onEnter/onLeave pour éléments ajoutés/supprimés
Flip.from(state, {
  duration: 0.5,
  onEnter: elements => gsap.from(elements, { opacity: 0, scale: 0 }),
  onLeave: elements => gsap.to(elements, { opacity: 0, scale: 0 })
});

// data-flip-id pour corréler des éléments entre deux conteneurs
// <div data-flip-id="card-1" class="card">...</div>
const state = Flip.getState("[data-flip-id]");
// déplacer l'élément dans un autre conteneur
container2.appendChild(card);
Flip.from(state, { duration: 0.8 });
```

## Source

https://gsap.com/docs/v3/Plugins/Flip

## Options avancées de getState()

```js
// Capturer des propriétés CSS supplémentaires en plus de la position/taille
const state = Flip.getState(".items", {
  props: "color,backgroundColor", // propriétés CSS additionnelles à inclure
  simple: true // n'inclure que position/taille (plus rapide — ignore rotation/scale/skew)
});
```

## Options de Flip.from()

- `absolute: true` — position absolute pendant l'animation (nécessaire flex/grid)
- `scale: true` — utilise scaleX/scaleY (plus perfo pour redimensionnement)
- `fade: true` — cross-fade au lieu de déplacement direct
- `nested: true` — compense transforms parents imbriqués
- `prune: true` — ignore les éléments hors écran (perf)
- `simple: true` — animation simplifiée (translate only, ignore rotation/skew)
- `zIndex` — z-index appliqué pendant l'animation
- `targets` — définir explicitement les cibles dans React/frameworks (important quand les éléments sont recréés)

## Flip.batch()

Coordonne plusieurs opérations Flip pour éviter la contamination croisée entre animations simultanées. Indispensable dans React pour synchroniser avec le cycle de render :

```js
// Avec React — pattern useLayoutEffect + Flip.batch()
const batch = Flip.batch();

// 1. Capturer AVANT le changement d'état
batch.getState(".item"); // ou batch.getState(true) pour tous les éléments du batch

// 2. Modifier le DOM / setState React
setReversed(r => !r);

// 3. Dans useLayoutEffect (après le re-render), lancer l'animation
useLayoutEffect(() => {
  batch.run({ duration: 0.5, ease: "power2.inOut" });
}, [reversed]);
```

## React avec useGSAP

```js
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { Flip } from "gsap/Flip";

gsap.registerPlugin(Flip);

const FlipGrid = () => {
  const [reversed, setReversed] = useState(false);
  const containerRef = useRef(null);

  const handleShuffle = () => {
    // Capturer AVANT le changement d'état React
    const state = Flip.getState(".item");
    setReversed(r => !r);
    // Après le re-render React, animer depuis l'ancien état
    // requestAnimationFrame laisse React finaliser le render
    requestAnimationFrame(() => {
      Flip.from(state, {
        targets: containerRef.current.querySelectorAll(".item"), // ref explicite aux nouveaux éléments
        duration: 0.6,
        stagger: 0.05,
        ease: "power1.inOut"
      });
    });
  };

  // useGSAP pour les animations Flip déclenchées à l'init
  useGSAP(() => {
    // Flip animations enregistrées dans le contexte GSAP — cleanup auto
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      {/* items */}
      <button onClick={handleShuffle}>Shuffle</button>
    </div>
  );
};
```

Note : avec `useIsomorphicLayoutEffect`, le pattern `Flip.batch()` est plus robuste que `requestAnimationFrame()` car il garantit l'exécution après le paint du navigateur.
