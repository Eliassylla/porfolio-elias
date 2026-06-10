---
name: utils
description: Helpers gsap.utils — clamp, mapRange, normalize, interpolate, random, snap, wrap, toArray, selector, pipe.
source: https://gsap.com/docs/v3/HelperFunctions
scraped: 2026-06-10
topic: gsap-core
---

## Résumé

`gsap.utils` regroupe des helpers purs (maths, tableaux, parsing d'unités, mapping de valeurs). **Aucun `registerPlugin` requis.** Utilisables dans les vars d'un tween (valeurs fonction), dans les callbacks ScrollTrigger/Observer, ou dans n'importe quel JS qui pilote GSAP.

## La forme « fonction » (omettre la valeur)

La plupart des utils prennent la valeur à transformer en **dernier argument**. Si on l'**omet**, l'util retourne une **fonction** réutilisable. Idéal pour appliquer la même config à plein de valeurs (mousemove, callback de tween).

```js
gsap.utils.clamp(0, 100, 150); // 100 (valeur immédiate)

const c = gsap.utils.clamp(0, 100); // fonction réutilisable
c(150); // 100
c(-10); // 0
```

> **Exception : `random()`** — passer `true` en dernier argument pour la forme fonction (ne pas omettre la valeur).

## Clamp & ranges

| Util | Rôle |
|------|------|
| `clamp(min, max, val?)` | Borne `val` entre min et max |
| `mapRange(inMin, inMax, outMin, outMax, val?)` | Remappe d'un intervalle vers un autre |
| `normalize(min, max, val?)` | Ramène `val` sur 0–1 |
| `interpolate(start, end, progress?)` | Interpole (nombres, couleurs, objets) à `progress` 0–1 |

```js
gsap.utils.mapRange(0, 100, 0, 500, 50);   // 250
gsap.utils.mapRange(0, 1, 0, 360, 0.5);     // 180 (progress → degrés)
gsap.utils.normalize(0, 100, 50);           // 0.5
gsap.utils.interpolate("#ff0000", "#0000ff", 0.5); // couleur médiane

// Cas typique : scroll progress → rotation
const toDeg = gsap.utils.mapRange(0, 1, 0, 360);
ScrollTrigger.create({
  onUpdate: (self) => gsap.set(".dial", { rotation: toDeg(self.progress) }),
});
```

## Random & snap

```js
gsap.utils.random(-100, 100);        // ex: 42.7
gsap.utils.random(0, 500, 5);        // snappé au multiple de 5 le plus proche
gsap.utils.random(["red", "blue"]);  // un élément au hasard

// Forme fonction : passer true en DERNIER argument
const rnd = gsap.utils.random(-200, 500, 10, true);
rnd(); rnd(); // nouvelle valeur à chaque appel

gsap.utils.snap(10, 23);              // 20
gsap.utils.snap([0, 100, 200], 150);  // 100 ou 200 (le plus proche)
gsap.utils.shuffle([1, 2, 3, 4]);     // ordre aléatoire (nouveau tableau)
```

**Forme string dans les vars d'un tween** (GSAP évalue par cible) :

```js
gsap.to(".box", { x: "random(-100, 100, 5)", duration: 1 });
gsap.to(".item", { backgroundColor: "random([red, blue, green])" });
gsap.to(".x", { x: 200, snap: { x: 20 } });
```

## Wrap (valeurs cycliques)

```js
gsap.utils.wrap(0, 360, 370);     // 10  (boucle infinie)
gsap.utils.wrap(0, 360, -10);     // 350
gsap.utils.wrapYoyo(0, 100, 150); // 50  (rebondit aux bornes)
```

## Tableaux & scope

| Util | Rôle |
|------|------|
| `toArray(val, scope?)` | Convertit sélecteur/NodeList/élément en vrai tableau |
| `selector(scope)` | Retourne un sélecteur **scopé** à un élément ou ref |
| `pipe(...fns)` | Compose : `pipe(f1, f2)(v)` = `f2(f1(v))` |

```js
gsap.utils.toArray(".item");            // [el, el, ...]

// selector scopé — n'attrape que les descendants du conteneur (React-friendly)
const q = gsap.utils.selector(containerRef);
gsap.to(q(".circle"), { x: 100 });

// pipe : normalize → snap
const fn = gsap.utils.pipe(
  (v) => gsap.utils.normalize(0, 100, v),
  (v) => gsap.utils.snap(0.1, v),
);
fn(50);
```

## Unités & couleurs

```js
gsap.utils.getUnit("100px");          // "px"
gsap.utils.unitize(100, "px");        // "100px"
gsap.utils.splitColor("red");         // [255, 0, 0]
gsap.utils.splitColor("#6fb936", true); // [h, s, l]
```

## Bonnes pratiques

- ✅ Omettre la valeur pour obtenir une fonction réutilisable quand la même config sert souvent (handler de scroll, callback)
- ✅ `gsap.utils.selector(scope)` dans les composants pour scoper les sélecteurs à un conteneur/ref
- ✅ `toArray` dès que GSAP ou ton code a besoin d'un vrai tableau depuis un sélecteur/NodeList

## Do Not

- ❌ Supposer que `mapRange`/`normalize` gèrent les unités — ils travaillent sur des nombres purs (utiliser `getUnit`/`unitize` si besoin)
- ❌ Pour `random()`, omettre la valeur en espérant une fonction — il faut passer `true`

## Source

https://gsap.com/docs/v3/HelperFunctions
