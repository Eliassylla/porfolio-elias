---
name: scrollto
description: Plugin GSAP pour animer le scroll vers une position ou un élément cible avec gsap.to().
source: https://gsap.com/docs/v3/Plugins/ScrollToPlugin
scraped: 2026-05-23
topic: gsap-scroll
---

## Résumé

ScrollToPlugin permet d'animer programmatiquement la position de scroll d'une fenêtre ou d'un élément scrollable via la propriété `scrollTo` dans un tween GSAP. Il supporte le scroll horizontal et vertical, le scroll vers des éléments par sélecteur, et des offsets pour compenser par exemple une navigation fixe.

## Points clés

- S'utilise comme propriété dans `gsap.to(window, { scrollTo: ... })` ou `gsap.to(myDiv, { scrollTo: ... })`
- Valeur simple : `scrollTo: 400` → scroll vertical à 400px
- Objet complet : `{ y: "#id", x: 0, offsetY: 80, autoKill: false }`
- `offsetY` / `offsetX` : décalage en pixels depuis la cible (utile pour nav fixe)
- `autoKill: true` (défaut) : annule le tween si l'utilisateur scroll manuellement
- `onAutoKill` : callback déclenché si `autoKill` coupe le tween
- `y: "max"` : scroll jusqu'au maximum de la page
- Gotcha : incompatible avec `scroll-behavior: smooth` en CSS — désactiver ce style
- Gotcha : l'élément cible doit avoir `overflow: scroll` pour scroller son contenu interne

## Exemples

```js
gsap.registerPlugin(ScrollToPlugin);

// Scroll vers une position en pixels
gsap.to(window, { duration: 2, scrollTo: 400 });

// Scroll vers un élément par sélecteur
gsap.to(window, { duration: 1.5, scrollTo: "#section", ease: "power2.out" });

// Avec offset (ex: compenser une navbar de 80px)
gsap.to(window, { duration: 1, scrollTo: { y: "#section", offsetY: 80 } });

// Scroll horizontal et vertical simultanés
gsap.to(myDiv, { duration: 2, scrollTo: { y: 400, x: 200 }, ease: "power2" });

// Aller au maximum de la page
gsap.to(window, { duration: 1, scrollTo: { y: "max" } });

// Sans autoKill (l'animation ne s'interrompt pas si l'utilisateur scroll)
gsap.to(window, { duration: 2, scrollTo: { y: 300, autoKill: false } });
```

## Source

https://gsap.com/docs/v3/Plugins/ScrollToPlugin
