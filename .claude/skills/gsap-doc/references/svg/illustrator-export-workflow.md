---
name: illustrator-export-workflow
description: Workflow optimal pour exporter un SVG depuis Adobe Illustrator afin de l'animer avec les plugins GSAP SVG (DrawSVG, MorphSVG, MotionPath).
source: https://gsap.com/community/forums/topic/18010-better-adobe-illustrator-svg-exports-make-gsap-animating-easier/ + https://medium.com/@colinlord/how-to-export-svgs-for-the-web-from-illustrator-829bc1c841f6
scraped: 2026-05-25
topic: gsap-svg-workflow
---

## Résumé

Pour qu'un SVG créé dans Illustrator soit facilement animable avec GSAP (DrawSVG, MorphSVG, MotionPath), il faut suivre une structure de calques imbriquée + un naming descriptif + des réglages d'export précis. Une mauvaise structure (paths sans stroke, IDs auto-générés, "Internal CSS") rend l'animation soit impossible (DrawSVG), soit ingérable (sélecteurs `.st0 .st1 .st2`).

## Points clés

- **Structure** : un master group englobant TOUT, avec nested groups par catégorie d'animation. Permet à la fois ciblage individuel et collectif (`gsap.to("#nodes > g", ...)`)
- **Naming** : kebab-case, préfixé par type (`node-`, `path-`, `frame-`, `status-`, `connector-`). Les Layer Names deviennent les `id` SVG après export
- **Texte HORS du SVG** : SplitText ne fonctionne pas sur `<text>` SVG. Toujours laisser de la place pour mettre le texte en HTML par-dessus
- **DrawSVG = stroke only** : les paths qu'on veut "dessiner" doivent rester en stroke. Ne PAS faire "Outline Stroke" sur eux (les transforme en fill, DrawSVG échoue)
- **Z-index par ordre des calques** : dans Illustrator, les calques en HAUT sont rendus en PREMIER (au-dessus). Pour que les flèches passent DERRIÈRE les nodes : `paths` AU-DESSUS de `nodes` dans le panneau (donc rendus en premier, donc en arrière-plan)
- **Optimiser avec SVGOMG** ([jakearchibald.github.io/svgomg](https://jakearchibald.github.io/svgomg/)) après export — réduction 60-80%
- **DÉSACTIVER "Cleanup IDs"** dans SVGOMG — sinon les noms `node-webhook`, `path-X-to-Y` sont remplacés par `a`, `b`, `c`

## Réglages d'export Illustrator (validés forum GSAP officiel)

| Réglage | Valeur | Pourquoi |
|---|---|---|
| File → Export → Export As → Format | **SVG** | — |
| Styling | **Presentation Attributes** | Met les styles en attributs directs (`fill="..."` `stroke="..."`). "Internal CSS" génère des classes `.st0 .st1` illisibles |
| Font | **SVG** ou **Convert to Outline** | Pas critique vu qu'on n'a pas de texte dans le SVG (texte → HTML par-dessus) |
| Object IDs | **Layer Names** | Utilise les noms des calques comme `id` SVG — ciblable directement en GSAP |
| Decimal | **2** | Précision suffisante, fichier plus léger |
| Minify | ✅ | Réduit la taille |
| Responsive | ✅ | Active le viewBox, retire width/height absolus → scalable en CSS |

## Structure de calques recommandée

```
📁 illustration-name             ← master group
   📁 frame                       ← cadre / décor
       🔷 frame-window
       📁 frame-dots
           🔘 dot-1, dot-2, dot-3
   📁 paths                       ← SOUS les nodes dans le rendu = AU-DESSUS dans le panneau Illustrator
       🔷 path-from-to            ← chaque flèche/connexion, stroke obligatoire pour DrawSVG
   📁 nodes                       ← chaque "boîte" en groupe
       📁 node-A
           🔷 node-A-rect
           🔷 node-A-icon
       📁 node-B
           🔷 node-B-rect
           🔷 node-B-icon
           🔘 status-dot          ← détails internes dans leur groupe
```

## Convention de nommage des `id`

| Préfixe | Pour quoi | Exemple |
|---|---|---|
| `frame-` | Décor / cadre / arrière-plan | `frame-window`, `frame-dots` |
| `node-` | Une "boîte" / card / composant | `node-webhook`, `node-ai-agent` |
| `path-` | Une connexion / ligne / courbe (stroke) | `path-webhook-to-ai-agent` |
| `connector-` | Petit cercle / dot de jointure | `connector-webhook-out` |
| `status-` | Indicateur d'état (dot, badge) | `status-dot-ai-agent` |
| `icon-` | Une icône simple | `icon-brain`, `icon-webhook` |

Kebab-case (pas d'espace, pas d'accents). Caractères : `[a-z0-9-]` uniquement.

## Exemples

### Animer toute une illustration en 3 lignes GSAP

```js
gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

// 1. Pop des nodes en stagger
gsap.from("#nodes > g", {
  scale: 0,
  opacity: 0,
  stagger: 0.1,
  ease: "back.out(2)",
  scrollTrigger: { trigger: "#illustration", start: "top 60%" },
});

// 2. Dessin des flèches en stagger (après les nodes)
gsap.from("#paths > *", {
  drawSVG: 0,
  stagger: 0.15,
  delay: 0.6,
  ease: "power2.out",
  scrollTrigger: { trigger: "#illustration", start: "top 60%" },
});

// 3. Pulse permanent du status dot
gsap.to("#status-dot-ai-agent", {
  scale: 1.3,
  opacity: 0.6,
  repeat: -1,
  yoyo: true,
  duration: 0.8,
});
```

### Intégration React + texte HTML par-dessus

```tsx
// Import direct (vite/webpack gère les SVG en composants ou en URL)
import AutomationDiagram from "@/assets/illustrations/automation.svg?react";

export function WhatIBuildIllustration() {
  return (
    <div className="relative">
      <AutomationDiagram className="w-full h-auto" />
      {/* Labels HTML positionnés en absolute par-dessus le SVG */}
      <div className="absolute inset-0 pointer-events-none">
        <span className="absolute left-[12%] top-[35%] text-sm font-medium">Webhook</span>
        <span className="absolute left-[42%] top-[25%] text-sm font-medium">AI Agent</span>
        {/* ... */}
      </div>
    </div>
  );
}
```

## Gotchas

1. **DrawSVG silencieux sur path avec fill** : si la flèche ne s'anime pas, vérifier qu'elle a bien un `stroke` (pas juste `fill`). Outline Stroke dans Illustrator transforme un trait en forme fill — incompatible DrawSVG.

2. **SVGOMG vire les `id`** : par défaut, SVGOMG active "Cleanup IDs" qui remplace tes noms par `a`, `b`, etc. **Décocher cette option** avant d'optimiser.

3. **"Internal CSS" rend l'animation impossible à débugger** : `.st0 .st1 .st2` ne dit rien sur ce qu'est chaque élément. Toujours préférer "Presentation Attributes".

4. **Pas de `<text>` SVG si on veut SplitText** : le plugin SplitText ne fonctionne PAS sur `<text>` SVG (voir `text/splittext.md` ligne 24). Tout texte animable mot/char doit être en HTML.

5. **Pas converti en outline pour DrawSVG** : transformer le texte ou les flèches en "Outline Stroke" les rend inanimables avec DrawSVG. À éviter pour tout élément qu'on veut dessiner.

6. **Ordre des calques inversé en Illustrator vs SVG rendu** : dans Illustrator, calque DU HAUT = rendu en PREMIER = en BAS visuellement (en arrière-plan). Donc pour que les flèches passent derrière les nodes, mettre `paths` AU-DESSUS de `nodes` dans le panneau Calques.

## Source

- [Forum officiel GSAP — Better Adobe Illustrator SVG exports](https://gsap.com/community/forums/topic/18010-better-adobe-illustrator-svg-exports-make-gsap-animating-easier/)
- [Medium — How To Export SVGs For The Web From Illustrator (Colin Lord)](https://medium.com/@colinlord/how-to-export-svgs-for-the-web-from-illustrator-829bc1c841f6)
- [GSAP DrawSVGPlugin docs](https://gsap.com/docs/v3/Plugins/DrawSVGPlugin/)
- Référence interne : `references/svg/drawsvg.md`, `references/svg/morphsvg.md`, `references/svg/motionpath.md`
- Référence interne : `references/text/splittext.md` ligne 24 (gotcha `<text>` SVG)
