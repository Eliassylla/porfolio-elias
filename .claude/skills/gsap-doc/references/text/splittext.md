---
name: splittext
description: Plugin GSAP pour découper le texte HTML en caractères, mots et lignes animables individuellement.
source: https://gsap.com/docs/v3/Plugins/SplitText
scraped: 2026-05-23
topic: gsap-text
---

## Résumé

SplitText divise le contenu textuel d'éléments HTML en `chars`, `words` et/ou `lines`, chacun enveloppé dans son propre élément DOM. Cela permet d'animer chaque unité individuellement avec GSAP (stagger, reveal, etc.). Le plugin supporte le re-split automatique au resize et des options d'accessibilité.

## Points clés

- `type` : `"chars"`, `"words"`, `"lines"` ou combinaisons comme `"chars,words"` (défaut : `"chars,words,lines"`)
- `autoSplit: true` : re-split automatique au resize ou chargement de font — animer dans le callback `onSplit`
- `mask` : `"lines"`, `"words"` ou `"chars"` — enveloppe les éléments pour des effets de masque (reveal propre)
- `aria` : `"auto"` (défaut), `"hidden"` ou `"none"` — gestion accessibilité
- `tag` : tag HTML utilisé pour les éléments splittés (défaut `<div>`)
- `onSplit(self)` : callback après split/re-split — retourner un tween/timeline pour que `autoSplit` le kill avant de re-splitter
- `revert()` : restaure l'élément à son état original
- Gotcha : splitter avant le chargement des fontes custom cause des layout shifts — attendre `document.fonts.ready` ou utiliser `autoSplit: true`
- Gotcha : `text-wrap: balance` interfère avec le splitting — éviter ce style
- Gotcha : ne fonctionne pas avec les éléments SVG `<text>`
- Gotcha : `font-kerning: none` et `text-rendering: optimizeSpeed` pour éviter le décalage entre caractères

## Exemples

```js
// Split basique avec animation stagger
const split = SplitText.create(".title");
gsap.from(split.chars, { y: 100, opacity: 0, stagger: 0.05, duration: 0.8 });

// Avec autoSplit et re-animation automatique
SplitText.create(".headline", {
  type: "lines",
  mask: "lines",
  autoSplit: true,
  onSplit: (self) => {
    return gsap.from(self.lines, { y: "100%", opacity: 0, stagger: 0.1, duration: 0.6 });
  }
});

// Revert après animation
const split = SplitText.create(".text");
gsap.to(split.words, {
  x: 100,
  onComplete: () => split.revert()
});
```

## Source

https://gsap.com/docs/v3/Plugins/SplitText

## Tableaux résultats

Après `SplitText.create()`, l'instance expose les éléments DOM créés :
- `split.chars` — tableau de tous les éléments caractères (un `<div>` par caractère)
- `split.words` — tableau de tous les éléments mots
- `split.lines` — tableau de tous les éléments lignes

Ces tableaux sont directement utilisables avec GSAP : `gsap.from(split.chars, { ... })`

## Options de classes CSS

- `linesClass` : classe CSS appliquée à chaque élément ligne. Si `"++"` est ajouté (ex: `"line++"`), un numéro incrémenté est aussi ajouté (`line1`, `line2`, etc.)
- `wordsClass` : classe CSS appliquée à chaque élément mot (même convention `++`)
- `charsClass` : classe CSS appliquée à chaque élément caractère (même convention `++`)
- `wordDelimiter` : `RegExp` ou `string` pour définir les séparateurs de mots (défaut : espace `" "`). Peut aussi être un objet `{ delimiter: yourRegExp, replaceWith: "yourReplacement" }`
- `specialChars` : tableau de strings à traiter comme un seul caractère (ex: `["**"]` pour Markdown bold)

## React / Cleanup

```js
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

// Pattern 1 — avec autoSplit (recommandé pour les textes dynamiques)
const AnimatedTitle = ({ text }) => {
  const ref = useRef(null);

  useGSAP(() => {
    // autoSplit gère le re-split au resize + cleanup intégré
    SplitText.create(ref.current, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (self) => {
        return gsap.from(self.lines, {
          y: "100%",
          opacity: 0,
          stagger: 0.1,
          duration: 0.6
        });
      }
    });
    // ctx.revert() de useGSAP appelle automatiquement split.revert()
  }, { scope: ref, dependencies: [text] }); // re-split si text change

  return <h1 ref={ref}>{text}</h1>;
};

// Pattern 2 — sans autoSplit, cleanup manuel
useLayoutEffect(() => {
  const split = SplitText.create(ref.current, { type: "chars" });
  const tween = gsap.from(split.chars, { opacity: 0, stagger: 0.05 });
  return () => {
    tween.kill();
    split.revert(); // OBLIGATOIRE — restaure le DOM original
  };
}, []);
```
