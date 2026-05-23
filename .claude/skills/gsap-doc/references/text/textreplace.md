---
name: textreplace
description: Plugin GSAP pour remplacer le texte d'un élément caractère par caractère ou mot par mot.
source: https://gsap.com/docs/v3/Plugins/TextPlugin
scraped: 2026-05-23
topic: gsap-text
---

## Résumé

TextPlugin remplace le contenu textuel d'un élément DOM un caractère à la fois (ou un mot à la fois avec `delimiter: " "`). Contrairement à ScrambleText, il n'y a pas de caractères aléatoires : le texte apparaît progressivement comme s'il était tapé. Il supporte la différenciation visuelle avec des classes CSS sur l'ancien et le nouveau texte.

## Points clés

- S'utilise comme propriété `text` dans un tween : `gsap.to(el, { text: "nouveau texte" })`
- Forme objet obligatoire si options supplémentaires : `text: { value: "...", delimiter: " " }` — `value` est requis
- `delimiter` : `""` (défaut, char par char) ou `" "` (mot par mot)
- `newClass` / `oldClass` : classes CSS appliquées au nouveau / ancien texte via `<span>`
- `padSpace` : si `true`, pad les espaces trailing avec `&nbsp;` quand le nouveau texte est plus court
- `preserveSpaces` : force le maintien des espaces multiples
- `rtl` : `true` pour animer de droite à gauche
- `type: "diff"` : n'anime que les différences entre l'ancien et le nouveau texte
- `speed` : ajuste la durée automatiquement selon le nombre de changements
- Gotcha : les options `delimiter`, `newClass`, etc. doivent être dans un objet `text: {}`, pas au niveau racine du tween
- Gotcha : TextPlugin reconnaît les noeuds HTML simples comme `<br>`

## Exemples

```js
gsap.registerPlugin(TextPlugin);

// Remplacement simple caractère par caractère
gsap.to(".label", { duration: 2, text: "Nouveau contenu" });

// Mot par mot
gsap.to(".sentence", {
  duration: 2,
  text: { value: "Automatisation pour PME francophones", delimiter: " " }
});

// Avec classes de style
gsap.to(".el", {
  duration: 2,
  text: {
    value: "Texte mis à jour",
    newClass: "text-green",
    oldClass: "text-gray"
  }
});

// Seulement les différences
gsap.to(".counter", {
  duration: 1,
  text: { value: "1 247 clients", type: "diff" }
});
```

## Source

https://gsap.com/docs/v3/Plugins/TextPlugin
