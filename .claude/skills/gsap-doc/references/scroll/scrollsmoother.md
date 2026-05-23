---
name: scrollsmoother
description: Plugin GSAP pour ajouter un scroll natif lissé avec effets parallaxe via data-speed et data-lag.
source: https://gsap.com/docs/v3/Plugins/ScrollSmoother
scraped: 2026-05-23
topic: gsap-scroll
---

## Résumé

ScrollSmoother ajoute un effet de smooth scrolling vertical basé sur le scroll natif du navigateur. Contrairement aux librairies classiques, il utilise le scroll natif et applique du CSS transform sur un conteneur wrapper, ce qui préserve les performances. Il s'intègre nativement avec ScrollTrigger et supporte des effets parallaxe déclaratifs via attributs HTML (`data-speed`, `data-lag`).

## Points clés

- Structure HTML obligatoire : `#smooth-wrapper` > `#smooth-content` (les noms par défaut, configurables)
- `smooth` : durée en secondes pour rattraper la position native (défaut `0.8`)
- `smoothTouch` : active le lissage sur tactile (`true` ou une durée en secondes)
- `effects` : active les effets parallaxe via attributs `data-speed` et `data-lag` sur les éléments
- `data-speed="0.5"` : l'élément défile à moitié de la vitesse normale. `data-speed="auto"` : calcul automatique
- `data-lag="0.5"` : l'élément accuse un retard de 0.5s (effet lag/sticky)
- `normalizeScroll` : force le scroll sur le thread JS — utile pour synchronisation mais peut causer des problèmes sur iOS
- `ignoreMobileResize` : empêche `ScrollTrigger.refresh()` lors des redimensionnements verticaux sur mobile
- Les effets `data-speed` et `data-lag` ne doivent pas être imbriqués
- Gotcha : les éléments `position: fixed` doivent être placés **en dehors** du wrapper, sinon ils se fixent au conteneur CSS transformé

## Exemples

```html
<!-- Structure HTML requise -->
<body>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <!-- tout le contenu ici -->
      <div data-speed="0.5">Élément parallaxe lent</div>
      <div data-lag="0.3">Élément avec retard</div>
    </div>
  </div>
</body>
```

```js
// Initialisation
gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const smoother = ScrollSmoother.create({
  smooth: 1,
  effects: true,
  smoothTouch: 0.1
});

// Scroll programmatique vers un élément
smoother.scrollTo(".target", true, "center center");
```

## Source

https://gsap.com/docs/v3/Plugins/ScrollSmoother

## CSS obligatoire

```css
/* REQUIS — sans ce CSS, ScrollSmoother ne fonctionne pas correctement */
body {
  overscroll-behavior: none;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}

#smooth-wrapper {
  overflow: auto;
  height: 100%;
  width: 100%;
}
```

Structure HTML minimale :
```html
<body>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <!-- TOUT le contenu ici -->
    </div>
  </div>
  <!-- les éléments position: fixed vont ICI, en dehors du wrapper -->
</body>
```

## Méthodes d'instance

- `smoother.scrollTo(target, smooth?, position?)` — scroll programmatique. `target` = sélecteur, élément DOM ou valeur en px. `smooth` = boolean pour animer. `position` = string type `"center center"`
- `smoother.scrollTop(value?)` — get/set la position de scroll en pixels (sans lissage)
- `smoother.offset(target, position?)` — retourne l'offset en pixels correspondant à la position d'un élément
- `smoother.paused(value?)` — get/set l'état pausé (`true` = freeze le smooth scroll)
- `smoother.kill()` — détruit l'instance et tous les effets associés
- `smoother.refresh(callScrollTrigger?)` — recalcule tous les effets data-speed/data-lag
- `smoother.effects(targets?, config?)` — applique ou récupère les effets parallaxe (data-speed/data-lag) dynamiquement
- `smoother.getVelocity()` — retourne la vitesse de scroll lissée en px/s
- `smoother.content(element?)` — get/set l'élément `#smooth-content`
- `smoother.wrapper(element?)` — get/set l'élément `#smooth-wrapper`
- `ScrollSmoother.get()` — méthode statique : récupère l'instance ScrollSmoother active

## React / Cleanup

```js
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const App = () => {
  const wrapper = useRef(null);
  const content = useRef(null);

  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      wrapper: wrapper.current,
      content: content.current,
      smooth: 1.5,
      effects: true
    });
    // useGSAP gère le cleanup via ctx.revert() — smoother.kill() appelé automatiquement
  }, { scope: wrapper });

  return (
    <div ref={wrapper} id="smooth-wrapper">
      <div ref={content} id="smooth-content">
        {/* contenu */}
      </div>
    </div>
  );
};
```
