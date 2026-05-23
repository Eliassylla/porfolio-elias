---
name: scrambletext
description: Plugin GSAP pour révéler du texte avec un effet de caractères aléatoires (style hacker/data).
source: https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin
scraped: 2026-05-23
topic: gsap-text
---

## Résumé

ScrambleTextPlugin anime le remplacement du contenu textuel d'un élément en scramblant des caractères aléatoires pendant la transition, créant un effet "hacker" ou "data glitch". Le nouveau texte se révèle progressivement tandis que des caractères temporaires apparaissent et disparaissent.

## Points clés

- S'utilise comme propriété `scrambleText` dans un tween : `gsap.to(el, { scrambleText: "nouveau texte" })`
- Forme objet : `scrambleText: { text: "...", chars: "XO", speed: 0.3, revealDelay: 0.5 }`
- `chars` : jeu de caractères pour le scramble — `"upperCase"` (défaut), `"lowerCase"`, `"upperAndLowerCase"`, ou string custom
- `speed` : fréquence de rafraîchissement des caractères scramblés (nombre entre 0 et 1)
- `revealDelay` : délai en secondes avant de commencer à révéler le nouveau texte
- `tweenLength` : si `true`, la longueur du texte change progressivement plutôt que d'un coup
- `delimiter` : `" "` pour révéler mot par mot au lieu de caractère par caractère
- `rightToLeft` : `true` pour révéler de droite à gauche
- `newClass` / `oldClass` : classes CSS appliquées au nouveau / ancien texte
- Gotcha : si `tweenLength: false` et le nouveau texte est plus long, la longueur change immédiatement

## Exemples

```js
gsap.registerPlugin(ScrambleTextPlugin);

// Usage simple
gsap.to(".title", { duration: 1.5, scrambleText: "NOUVEAU TEXTE" });

// Avec options complètes
gsap.to(".data-display", {
  duration: 2,
  scrambleText: {
    text: "SYSTÈME INITIALISÉ",
    chars: "01",        // effet binaire
    revealDelay: 0.3,
    speed: 0.4,
    newClass: "highlight"
  }
});

// Révélation mot par mot
gsap.to(".subtitle", {
  duration: 2,
  scrambleText: {
    text: "Automatisation intelligente pour PME",
    delimiter: " ",
    chars: "upperCase"
  }
});
```

## Source

https://gsap.com/docs/v3/Plugins/ScrambleTextPlugin
