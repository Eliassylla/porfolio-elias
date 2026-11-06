# Réception existante : Notes → Chat

Relevé statique du 5 novembre 2026. Ce document décrit ce qui est déjà intégré ; il ne livre
pas un nouvel export, ne valide pas une future section et ne décide pas la relecture au scroll.
Procédure générale : [réception](../methode/reception-composants.md).

## Identité et limites de provenance

- Source : projet Video Animation d’Elias, dépôt `Eliassylla/video-animation`,
  dossier `sites/portfolio/Sections/03-projets-reserver/versions/v3/`.
- Source comparée : commit `70f3092849ff7221770f00fc9edba57ebdc168c2`, notamment `morph.js`
  et les SVG de `Sections/03-projets-reserver/Assets/`. Ce commit est le repère de comparaison,
  **pas un commit d’import historique prouvé**.
- Destinataire comparé : `Eliassylla/porfolio-elias`, commit
  `fc306fe6d633ece2d756e6d32d07418919295de2` (PR #4 fusionnée).
- Implémentation : `src/sections/experiments/NotesMorphSection.tsx`, montée dans `src/pages/Home.tsx`.
- Historique destinataire vérifié : `d2acbe6` introduit l’ouverture v3 ; `9e943c9` change les poses
  dans une zone figée ; `2762ba2` ajoute le déclencheur d’entrée de l’icône. Ces modifications
  expliquent pourquoi l’intégration actuelle ne se déduit pas du seul nom v3.
- Responsabilité de création et validation artistique : Studio ; intégration : Portfolio.
  Le niveau exact de validation artistique v3 est contradictoire dans ses notes, à confirmer au Studio.

La source suit assets → storyboard → mouvement HyperFrames → validation → sortie vidéo/AE
ou web. L’intégration actuelle reprend une scène HTML/SVG/GSAP dans React. Le contrat d’export
standardisé reste à construire dans [Video Animation #1](https://github.com/Eliassylla/video-animation/issues/1).
Les commandes envisagées dans cette issue ne sont pas une API déjà livrée.

## Fichiers et correspondances vérifiées

| Source sous `Sections/03-projets-reserver/Assets/` | Portfolio | Résultat |
|---|---|---|
| `notes-creation-ia-fermee/notes-creation-ia-fermee.svg` | `src/assets/morph/notes-fermee.svg` | Identique octet pour octet |
| `notes-creation-ia-ouverte/notes-creation-ia-ouverte.svg` | `src/assets/morph/notes-ouverte.svg` | Identique octet pour octet |
| `chat-barre-saisie-1x1/chat-barre-saisie-1x1.svg` | `src/assets/morph/chat-barre-saisie.svg` | Identique octet pour octet |

Empreintes et chemins complets : [comparaison-sources.json](../../specs/005-reception-composants/comparaison-sources.json).
La copie des SVG est identique ; leur assemblage et leur transformation à l’exécution ne le sont pas.
Les droits de réutilisation, les polices incorporées aux SVG et les marques représentées n’ont
pas fait l’objet d’une vérification de licence dans ce chantier. À clarifier avant un nouvel usage.

## Mouvement commun et adaptations réellement présentes

Comparaison de `morph.js` v3 avec `NotesMorphSection.tsx`, sans modification :

| Élément | Observation dans les deux fichiers / adaptation locale |
|---|---|
| Formes compact/Notes/Chat | Même géométrie : 280 × 280, 834 × 760 et 864 × 160 ; même cadre SVG 90/130/900/800 |
| Repères | Même morph à 49,5 images, durée 15 images, chat à 58,5 images, pose chat 26 images après, à 30 images/s |
| Caméra et rebonds | Même zoom d’entrée, recul, repères d’icône, équations et courbes ; aucune preuve pixel à pixel déduite de cette lecture |
| Couleurs et assemblage | Préfixes mn/mp, retrait des fonds/sélections, remplacement de couleur Notes, extraction de l’icône et renommage caméra local mc-camera |
| Texte | Positions de caractères calculées sur le SVG rendu, puis reconstruction ; dépend des polices et du navigateur |
| Source autonome | Enchaîne un parcours temporel aller/retour, pauses de 0,7 s et durée globale de 8,45 s |
| Portfolio | Hook React `useGSAP`, cible locale, pose supplémentaire `icone` à l’image 10 et choix de poses via ScrollTrigger |
| Place dans la page | Après le texte/carte et avant WhatIBuild ; largeur bornée par 88 %, 34 rem et 68 vh, section d’une hauteur d’écran |
| Thèmes | Bordure adaptée au thème du site ; surfaces Notes et Chat restent les couleurs fixées par l’animation |
| Mouvement réduit | Le code local place directement la timeline en pose chat ; comportement navigateur non rejoué ici |

Les paramètres partagés `F`, ARRIVE, OPEN, MID et OUT sont équivalents sur la comparaison
numérique effectuée : 1 001 points par courbe, différence maximale 0. Le JS du Studio et le
TypeScript local ne sont pas identiques : le Portfolio ajoute le préfixage des identifiants SVG.
Ce relevé ne prouve ni une fidélité visuelle totale ni la performance dans la page.

## Déclenchements actuels du Portfolio, sans décision UX nouvelle

- L’icône entre lorsque le centre de la section atteint 90 % de la hauteur de l’écran.
  En remontant au-dessus, la timeline revient à zéro.
- La section se fige au contact du haut de la fenêtre sur une distance de 200 % d’écran.
  Les poses choisies sont icône avant 15 %, Notes de 15 à 55 %, Chat au-delà.
- Chaque changement de pose joue à la vitesse temporelle de la timeline ; il ne s’agit pas
  d’une progression continue directement liée à chaque pixel de scroll.
- La description Studio parlant de 120 %, de 15 % de fenêtre et de seuil 45 % correspond
  à des réglages antérieurs retrouvés dans `9c887fe`, pas au destinataire fc306fe.

Ces faits documentent le code actuel. [Video Animation #2](https://github.com/Eliassylla/video-animation/issues/2)
reste le sujet séparé sur la relecture. Aucun déclencheur ou mouvement n’a été changé ici.

## Dépendances, cycle de vie et limites

GSAP local installé : 3.13.0, lu dans `node_modules/gsap/package.json` et cohérent avec le verrou.
Le fichier GSAP embarqué du Studio annonce 3.14.2 dans son en-tête. C’est une différence de
version constatée, pas une incompatibilité démontrée. React, `@gsap/react` et ScrollTrigger
sont déjà présents ; les versions de livraison exactes seront à fixer pour un nouvel export.

Aucune interface publique play/pause/seek/destroy n’est exposée par le composant React actuel.
Le hook prend en charge un contexte GSAP, mais le nettoyage complet des groupes SVG ajoutés
et des commandes créées plus tard doit être éprouvé par retrait/remontage réel. Des identifiants
fixes (`mc-clip`, mn/mp) existent : le fonctionnement de plusieurs instances n’est pas garanti.
Le composant est actuellement un visuel SVG annoncé comme image, pas un vrai champ de chat
ni un formulaire cliquable. Aucun nouveau parcours métier ne doit être déduit du dessin.

## Vérification et suite

[Rapport du chantier](../../specs/005-reception-composants/verification.md) : comparaison statique
et contrôles documentaires ; pas de nouvelle capture ni mesure de fluidité. Les anciens retours
d’Elias ne deviennent pas une preuve du rendu du futur commit documentaire.
Avant une nouvelle réception, appliquer toute la matrice de la procédure, notamment tablette,
tailles intermédiaires, thèmes, mouvement réduit, redimensionnement et retrait/remontage.

Défaut de mouvement/asset/export : reproduction à préparer pour le Studio. Défaut de placement,
navigation ou intégration : Portfolio. Incident transversal : coordonner et vérifier dans le site.
Retour possible au code source et aux assets du commit fc306fe ; son déploiement ou un retour
arrière distant exige un accord distinct. Le contact confirmé est Elias ; aucun canal automatique.
