---
name: gsap-react
description: Patterns officiels pour utiliser GSAP dans React 18 — useGSAP hook, gsap.context(), cleanup, ScrollTrigger.
source: https://gsap.com/resources/React
scraped: 2026-05-23
topic: gsap-react
---

## Résumé

GSAP s'intègre dans React via le hook `useGSAP()` du package `@gsap/react`, qui est un remplacement direct de `useEffect`/`useLayoutEffect`. Il gère automatiquement le cleanup via `gsap.context()`, ce qui évite les animations orphelines et les fuites mémoire lors du démontage des composants. Sans ce hook, chaque animation GSAP dans React doit être manuellement nettoyée via `ctx.revert()`.

## Points clés

- `useGSAP()` remplace `useEffect`/`useLayoutEffect` — gère le cleanup automatiquement
- Enregistrer le hook : `gsap.registerPlugin(useGSAP)` une seule fois au niveau de l'app
- `scope` : limiter les sélecteurs CSS au sous-arbre d'un ref (`{ scope: containerRef }`)
- `dependencies` : tableau de dépendances comme `useEffect` — relance l'animation si les valeurs changent
- `gsap.context()` est la mécanique sous-jacente — peut s'utiliser directement sans `useGSAP`
- `contextSafe()` : wrapper pour les animations déclenchées dans des event handlers ou des timers
- `useLayoutEffect` est préféré à `useEffect` pour les animations (évite le flash) — `useGSAP` utilise `useIsomorphicLayoutEffect`
- Tout ce qui est créé dans `useGSAP()` (tweens, timelines, ScrollTriggers) est automatiquement tué au unmount

## useGSAP hook

```js
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// Enregistrement — une seule fois, niveau app ou module
gsap.registerPlugin(useGSAP);

// Usage de base — remplace useEffect
const MyComponent = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Les sélecteurs CSS sont scopés à containerRef grâce à { scope }
    gsap.from(".box", { opacity: 0, y: 30, duration: 0.6 });
  }, { scope: containerRef });

  return <div ref={containerRef}><div className="box">Hello</div></div>;
};

// Avec dépendances — re-déclenche si `value` change
useGSAP(() => {
  gsap.to(".element", { x: value * 100 });
}, { scope: ref, dependencies: [value] });

// Accès au contextSafe pour les event handlers
const { contextSafe } = useGSAP({ scope: containerRef });

const handleClick = contextSafe(() => {
  // Cette animation est enregistrée dans le contexte → cleanup auto
  gsap.to(".box", { rotation: 360 });
});
```

## gsap.context()

`gsap.context()` collecte tous les objets GSAP créés dans son callback et permet de les tuer tous en une seule fois via `.revert()`. C'est la base du mécanisme de cleanup dans React.

```js
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

const MyComponent = () => {
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    // Tout ce qui est créé dans ce callback (tweens, ScrollTriggers...)
    // est enregistré dans le contexte
    const ctx = gsap.context(() => {
      gsap.from(".box", { opacity: 0, y: 30 });
      gsap.to(".circle", { rotation: 360, repeat: -1, duration: 2 });
      ScrollTrigger.create({ trigger: ".section", start: "top center" });
    }, containerRef); // scope optionnel pour les sélecteurs CSS

    // cleanup obligatoire — tue toutes les animations du contexte
    return () => ctx.revert();
  }, []);
};

// Ajouter des animations au contexte après la création
const ctx = gsap.context(() => {}, containerRef);

const addAnimation = () => {
  ctx.add(() => {
    gsap.to(".new-element", { x: 100 });
  });
};
```

## Cleanup obligatoire

Sans cleanup, React en Strict Mode (double-render en dev) crée des animations orphelines qui s'accumulent. En prod, les composants unmountés laissent des ScrollTriggers actifs qui causent des bugs.

```js
// MAUVAIS — pas de cleanup
useEffect(() => {
  gsap.to(".box", { x: 100 }); // cette animation n'est jamais tuée
}, []);

// BON — avec useGSAP (cleanup automatique)
useGSAP(() => {
  gsap.to(".box", { x: 100 }); // tué automatiquement au unmount
}, { scope: ref });

// BON — avec useLayoutEffect + ctx.revert() (cleanup manuel)
useLayoutEffect(() => {
  const ctx = gsap.context(() => {
    gsap.to(".box", { x: 100 });
  });
  return () => ctx.revert(); // cleanup au unmount
}, []);
```

## ScrollTrigger dans React

```js
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Section = () => {
  const ref = useRef(null);

  useGSAP(() => {
    // ScrollTrigger créé dans useGSAP → tué automatiquement au unmount
    gsap.from(ref.current, {
      opacity: 0,
      y: 50,
      scrollTrigger: {
        trigger: ref.current,
        start: "top 80%",
        end: "top 30%",
        scrub: true
      }
    });

    // ScrollTrigger standalone aussi géré
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top center",
      onEnter: () => console.log("entered")
    });
  }, { scope: ref });

  return <section ref={ref}>{/* contenu */}</section>;
};

// Avec ScrollSmoother — ScrollTrigger doit être refreshé après mount
useGSAP(() => {
  const smoother = ScrollSmoother.create({ smooth: 1, effects: true });
  // ScrollTrigger.refresh() appelé automatiquement par ScrollSmoother
}, { scope: wrapperRef });
```

## Erreurs courantes

1. **Animations dans des event handlers non wrappées** — les tweens créés dans des onClick, setTimeout, etc. après l'exécution initiale de `useGSAP()` ne sont pas automatiquement nettoyés. Solution : utiliser `contextSafe()`.

   ```js
   const { contextSafe } = useGSAP({ scope: ref });
   // MAUVAIS
   const handleClick = () => gsap.to(".box", { x: 100 }); // pas dans le contexte
   // BON
   const handleClick = contextSafe(() => gsap.to(".box", { x: 100 })); // dans le contexte
   ```

2. **Sélecteurs CSS globaux sans scope** — `gsap.to(".box")` sans `{ scope }` cible tous les `.box` dans le DOM entier, pas seulement ceux du composant.

3. **useEffect au lieu de useLayoutEffect** — crée un flash visible avant l'animation. `useGSAP` utilise `useIsomorphicLayoutEffect` pour éviter ce problème.

4. **Pas de `gsap.registerPlugin()`** — le tree-shaking de bundlers comme Vite supprime les plugins non enregistrés en production.

5. **Flip/ScrollTrigger avec React state** — capturer l'état Flip AVANT `setState`, puis appeler `Flip.from()` dans `useLayoutEffect` ou via `requestAnimationFrame` après le re-render.

6. **ScrollTrigger qui ne se nettoie pas** — même si l'animation est dans `useGSAP()`, les ScrollTriggers créés via `gsap.to(..., { scrollTrigger: {} })` sont inclus dans le contexte et nettoyés automatiquement. Mais les ScrollTriggers créés à l'extérieur ne le sont pas.

7. **Strict Mode React double-render** — React en dev monte et démonte les composants deux fois. Sans cleanup, les animations se dupliquent. `useGSAP` gère ce cas automatiquement.

## Exemples

```js
// Exemple 1 — Animation d'entrée scopée avec stagger
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

const CardList = ({ cards }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".card", {
      opacity: 0,
      y: 40,
      stagger: 0.1,
      duration: 0.6,
      ease: "power2.out"
    });
  }, { scope: containerRef, dependencies: [cards] });

  return (
    <div ref={containerRef}>
      {cards.map(c => <div key={c.id} className="card">{c.title}</div>)}
    </div>
  );
};
```

```js
// Exemple 2 — Timeline avec ScrollTrigger
const HeroSection = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: 1
      }
    });

    tl.from(".hero-title", { opacity: 0, y: 60, duration: 1 })
      .from(".hero-subtitle", { opacity: 0, y: 40, duration: 0.8 }, "-=0.4")
      .from(".hero-cta", { opacity: 0, scale: 0.8, duration: 0.6 }, "-=0.4");
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef}>
      <h1 className="hero-title">Titre</h1>
      <p className="hero-subtitle">Sous-titre</p>
      <button className="hero-cta">CTA</button>
    </section>
  );
};
```

```js
// Exemple 3 — Animation déclenchée par interaction (contextSafe)
const InteractiveCard = () => {
  const cardRef = useRef(null);
  const { contextSafe } = useGSAP({ scope: cardRef });

  const handleHover = contextSafe((isEntering) => {
    gsap.to(".card-inner", {
      scale: isEntering ? 1.05 : 1,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => handleHover(true)}
      onMouseLeave={() => handleHover(false)}
    >
      <div className="card-inner">{/* contenu */}</div>
    </div>
  );
};
```

## Source

https://gsap.com/resources/React
