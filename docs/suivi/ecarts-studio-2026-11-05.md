# Écarts à reprendre dans Video Animation

Relevé préparé dans le Portfolio, le 5 novembre 2026. **Aucune écriture dans le Studio,
aucune issue/commentaire envoyé.** Ce document est un support pour sa prochaine session.
Références : source 70f3092, destinataire fc306fe ; empreintes dans
[comparaison-sources.json](../../specs/005-reception-composants/comparaison-sources.json).

| Fichier côté Studio | Écart constaté | Reprise à proposer dans le Studio |
|---|---|---|
| `sites/portfolio/LISEZ-MOI.md` | Dit que rien n’est fusionné dans main du site ; PR Portfolio #4 fusionnée au commit fc306fe | Actualiser l’état avec lien et commit ; ne pas confondre fusion et vérification de tous les parcours |
| Même fichier, offre affichée | Liste landing page et vidéo comme services, alors que le contenu métier du Portfolio n’a pas été aligné dans ce chantier | Clarifier avec Elias ; ne pas réécrire le positionnement du Portfolio à partir de cette note |
| `Sections/03-projets-reserver/LISEZ-MOI.md` | Statut v3 à valider et notes ultérieures indiquant une validation ; portée/date exacte ambiguë | Identifier la référence réellement validée et la portée de cette validation |
| Même fichier et commentaire de `versions/v3/morph.js` | Décrit anciens seuils 120 % / 45 % et entrée à 15 %, ou une durée figée d’un écran ; code Portfolio fc306fe : 200 %, 15/55 %, entrée icône au centre à 90 % | Corriger la description de l’intégration existante après comparaison ; ne pas modifier les mouvements ni choisir une nouvelle relecture |
| `Sections/01-textes/LISEZ-MOI.md` | Marges indiquées ne décrivent pas les classes actuelles du site | Mettre à jour le relevé d’intégration ou le dater comme historique, sans changer le site |
| `Commun/courbes.js` | Dit « même contenu » que le fichier TS local, qui comprend typage/export et utilitaire SVG supplémentaires | Décrire les paramètres de courbes communs ; comparaison numérique sans identité de fichier |
| `Commun/gsap.min.js` | En-tête 3.14.2, contre GSAP installé 3.13.0 dans Portfolio | Documenter les environnements testés ; ne pas mettre à niveau pour effacer la différence |

Les fichiers du Studio peuvent évoluer dans une autre session. Au moment du relevé, des
modifications de son outillage HyperFrames et de `.gitignore` étaient présentes, hors des
fichiers comparés ici. Relire le commit et les fichiers avant toute correction ; ne pas
écraser ces travaux. Le commit 70f3092 est le repère de comparaison, pas la preuve d’une
livraison source historiquement épinglée.

Le travail d’export standardisé appartient à [Video Animation #1](https://github.com/Eliassylla/video-animation/issues/1).
La relecture au scroll reste [Video Animation #2](https://github.com/Eliassylla/video-animation/issues/2).
Les notes sur des versions futures ne constituent pas une autorisation de les intégrer.
