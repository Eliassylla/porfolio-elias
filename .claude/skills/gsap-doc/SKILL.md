---
name: gsap-doc
description: >
  Documentation de référence GSAP pour écrire des animations correctes et précises.
  Utiliser ce skill dès que l'utilisateur demande une animation GSAP, mentionne un plugin
  GSAP spécifique, veut corriger ou déboguer une animation existante, ou pose une question
  sur le comportement d'un plugin. Couvre tous les plugins : ScrollTrigger, ScrollSmoother,
  ScrollTo, SplitText, ScrambleText, TextReplace, Flip, Draggable, Inertia, Observer,
  DrawSVG, MorphSVG, MotionPath, MotionPathHelper, Physics2D, PhysicsProps, GSDevTools.
  Toujours lire le fichier de référence correspondant AVANT d'écrire du code GSAP —
  les options, signatures d'API et comportements exacts y sont documentés.
---

# GSAP Documentation — Guide de référence

## Étape 1 — Identifier le(s) plugin(s) concerné(s)

Avant d'écrire du code, identifier quels plugins sont impliqués et lire les fichiers
de référence correspondants dans le tableau ci-dessous.

## Carte des références

| Plugin | Fichier à lire |
|--------|---------------|
| **ScrollTrigger** | `references/scroll/scrolltrigger.md` |
| **ScrollSmoother** | `references/scroll/scrollsmoother.md` |
| **ScrollTo** | `references/scroll/scrollto.md` |
| **SplitText** | `references/text/splittext.md` |
| **ScrambleText** | `references/text/scrambletext.md` |
| **TextReplace** | `references/text/textreplace.md` |
| **Flip** | `references/ui/flip.md` |
| **Draggable** | `references/ui/draggable.md` |
| **Inertia** | `references/ui/inertia.md` |
| **Observer** | `references/ui/observer.md` |
| **DrawSVG** | `references/svg/drawsvg.md` |
| **MorphSVG** | `references/svg/morphsvg.md` |
| **MotionPath** | `references/svg/motionpath.md` |
| **MotionPathHelper** | `references/svg/motionpathhelper.md` |
| **Physics2D** | `references/other/physics2d.md` |
| **PhysicsProps** | `references/other/physicsprops.md` |
| **GSDevTools** | `references/other/gsdevtools.md` |

## Patterns avancés (recettes complètes)

| Pattern | Fichier à lire | Quand l'utiliser |
|---------|----------------|------------------|
| **Phrase horizontale scrub mot-par-mot** | `references/scroll/horizontal-scroll-words.md` | Section pinned où une longue phrase défile horizontalement au scroll vertical, avec animation d'entrée individuelle par mot et éléments inline (card, image). Ex : hero d'accueil. |
| **Workflow Illustrator → SVG → GSAP** | `references/svg/illustrator-export-workflow.md` | Préparer une illustration créée dans Adobe Illustrator pour qu'elle soit facilement animable avec DrawSVG/MorphSVG/MotionPath. Structure de calques, naming, réglages d'export, gotchas DrawSVG. |

> Si un fichier de référence est absent (pas encore rempli), signaler à l'utilisateur
> que la documentation de ce plugin n'a pas encore été récupérée.

## Étape 2 — Appliquer les règles communes

Ces règles s'appliquent à tous les plugins :

- **Toujours `gsap.registerPlugin(...)`** avant le premier usage — une seule fois, au niveau module
- **Dans React**, utiliser `useGSAP()` (@gsap/react) pour le cleanup automatique ; ne jamais mettre `gsap.registerPlugin()` dans un composant qui re-render
- **Nettoyage** : `useGSAP` gère le revert automatiquement ; pour ScrollTrigger standalone, appeler `ScrollTrigger.getAll().forEach(t => t.kill())` au unmount
- **Tous les plugins GSAP sont gratuits** depuis l'acquisition par Webflow — importer depuis le package npm `gsap` standard, jamais depuis un registry privé ni avec token Club GSAP

## Étape 3 — Écrire le code

Utiliser les exemples et options du fichier de référence. Privilégier les patterns
documentés plutôt que de reconstruire à partir de mémoire.
