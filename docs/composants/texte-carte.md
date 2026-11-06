# Réception pilote : état courant

6 novembre 2026. L'intégration v2 a été fusionnée via la PR #8 et validée visuellement
en Preview. Le circuit de défaut contrôlé entre Portfolio #7 et Studio #1 est terminé,
avec réception positive publiée dans les deux tickets. Le [bilan de réception](../../specs/007-bilan-reception/fiche.md)
conserve versions, commits, preuves et périmètre de clôture accepté par Elias.

La version du site reste `portfolio-section01-web-v2 / 2.0.0-prototype`, source
`2f347a9059b4658f4b68fde0cbb353ad4113f582`. L'exercice theme.1/theme.2 reste séparé ;
il n'est pas fusionné pour conclure le pilote. Cette mise à jour est documentaire.
Les mesures approfondies reportées ne sont pas déclarées vérifiées. Les futures sections
et leur réception complète feront l'objet de leurs propres chantiers.

Les relevés ci-dessous décrivent l'état historique de préparation et de provenance ;
les mentions d'attente ou d'absence de validation y sont conservées pour l'historique
et sont remplacées, pour l'état courant, par le bilan lié ci-dessus.

---

# Réception pilote : texte et carte « Cette semaine »

6 novembre 2026. État : intégration locale préparée, réception visuelle en attente d’Elias.

## Livraison adoptée dans la branche

- Site : Portfolio, [ticket #7](https://github.com/Eliassylla/porfolio-elias/issues/7).
- Source : Video Animation, `portfolio-section01-web-v2`, `2.0.0-prototype`.
- Livraison immuable : `2f347a9059b4658f4b68fde0cbb353ad4113f582`,
  [PR source #4](https://github.com/Eliassylla/video-animation/pull/4).
- Chemin source : `sites/portfolio/exports-web/01-textes/v2/`.
- Import : `src/integrations/section01/v2/`, branche `chantier-007-texte-carte-v2`,
  base Portfolio `241f45f`, arbre modifié non commité. Aucun déploiement effectué.

Les 14 fichiers du manifeste ont été comparés au commit source et à leurs empreintes.
Les dix fichiers du manifeste réellement copiés sont identiques ; le manifeste est conservé.
La page d’aperçu, son script et les deux bibliothèques vendor ne sont pas importés.
Leurs empreintes restent dans le manifeste original : leur absence ici est volontaire.
[Relevé d’intégrité](../../specs/007-texte-carte-v2/integrite.json).

## Contrat conservé

Le Studio a créé et validé l’entrée. L’aperçu ordinateur v2 a été validé par Elias,
le 6 novembre 2026, selon le ticket ; ses 61 contrôles Chrome/macOS et ses 32 poses
comparées portent sur l’export isolé. La vraie page Portfolio n’est pas validée par ces preuves.

Première entrée unique par montage ; aucune inversion ou réintroduction automatique.
Phrase à 70 % de la fenêtre, carte au repère 64 % téléphone / 47 % ordinateur, attente
jusqu’à l’image 22 de la phrase si nécessaire. Carte entière sous 640 px, recadrage
ordinateur à partir de 640 px ; typographie et espacements aux seuils 768/1024 px.
Largeur minimale essayée à la source : 320 px ; carte maximum 860 px, conteneur 1152 px.
Le thème est explicite ; réduction des animations et HTML statique lisible sont gérés par l’export.

Lire la [notice importée](../../src/integrations/section01/v2/LISEZ-MOI.md) pour les
commandes et les limites, et les [notices](../../src/integrations/section01/v2/NOTICES.md)
pour les droits. Polices système et alternatives SVG Inter/Helvetica/Arial sans fichier embarqué.
Les droits des marques/icônes ne sont pas attestés : cette intégration locale ne lève pas
cette inconnue et n’autorise aucune diffusion. Le Studio possède mouvement, assets et export.

## Adaptations locales

`TextGlowSection.tsx` conserve son emplacement dans Home et monte le HTML fiable via Vite.
Il sélectionne la section enfant après insertion, fournit GSAP et ScrollTrigger **3.13.0**
déjà installés et importe le CSS limité à `.va01`. Aucun second GSAP n’est chargé.
Une déclaration `section.d.ts` décrit le contrat JS sans modifier son contenu ni prétendre
vérifier les types internes du fournisseur.

Le HTML reste constant entre rendus React. Le changement de thème appelle uniquement
la commande de thème, sans démontage ni remise à zéro. Le nettoyage appelle `destroy()`
avant retrait. L’export possède son contexte et son nettoyage local : aucun nettoyage
global des animations du site n’est ajouté. Ces points ont été relus dans le code ;
le comportement effectif en navigateur reste à tester.

`TextGlowSectionLegacy.tsx` conserve une copie exacte de l’ancien composant de la base
`241f45f`. Les quatre anciens SVG restent en place. Retour possible en repointant l’import
de Home vers ce composant ; aucun basculement public ni option utilisateur n’est ajouté.

## Vérification et réception

[Preuves et parcours à tester](../../specs/007-texte-carte-v2/verification.md).
Tests, typage et build réussis ; lint sans erreur avec quatre avertissements préexistants.
Le build ajoute 7 435 octets bruts et 1 643 octets gzip au total des fichiers générés,
avec le même environnement de mesure. Ce poids ne mesure ni le chargement réel, ni la
fluidité, ni LCP/INP/CLS. Aucun gain de performance n’est déclaré.

Accès navigateur désactivé dans Work ; Elias a indiqué qu’il ferait les essais visuels.
Aucune capture ou validation de la vraie page par l’agent. Le ticket reste en intégration /
vérification, sans confirmation de réception publiée. Aucun défaut intrinsèque reproduit,
donc aucun ticket fournisseur de correction créé. Coordination existante :
[Video Animation #1](https://github.com/Eliassylla/video-animation/issues/1).
Une éventuelle correction reprend le même ticket Portfolio et exige une nouvelle version
source ainsi que les permissions d’écriture correspondantes.

---

## Relevé historique conservé, avant réception v2

# Repérage existant : texte et carte « Cette semaine »

Relevé statique du 5 novembre 2026, complément au premier cas Notes → Chat.
Source comparée : Video Animation `70f3092849ff7221770f00fc9edba57ebdc168c2`.
Destinataire : Portfolio `fc306fe6d633ece2d756e6d32d07418919295de2`,
`src/sections/experiments/TextGlowSection.tsx`.

## Ce que la comparaison permet de dire

- Les fichiers `Sections/01-textes/versions/v2/section.js` et `versions/v3/section.js`
  diffèrent uniquement dans les commentaires. Leur corps hors commentaires est identique.
  Le mot v2 en tête du composant local ne suffit donc pas à identifier sa livraison.
- Les quatre SVG locaux (clair/sombre, ordinateur/téléphone) sont identiques octet pour octet
  à ceux présents dans `Sections/01-textes/Assets/`. Le relevé complet est dans
  [comparaison-sources.json](../../specs/005-reception-composants/comparaison-sources.json).
- L’affichage local coupe la carte ordinateur avec un fondu et présente la carte téléphone
  entière sous 640 px. Les imports, cadres, préfixes et variantes sont construits dans le composant.
- Le code source combine la phrase et la carte dans une timeline et conserve une fin à 51 images.
  Le Portfolio sépare leurs déclencheurs et utilise une timeline par format : la dernière vague
  téléphone finit à l’image 45 ; l’ordinateur à 51. Les halos ne sont actifs que dans la zone observée.
- Le Portfolio retire la copie lumineuse, laisse la phrase glisser et passer au bleu ; il
  rétablit la couleur du thème en fin de phrase. Le Studio documente également la variante sans lueur.
- Phrase : départ au haut de l’élément à 70 % de la fenêtre. Carte : départ quand le repère
  à 47 % de sa hauteur (ordinateur) ou 64 % (téléphone) atteint le bas de la fenêtre.
  Retour à l’envers selon les déclencheurs existants, sans changement dans ce chantier.

L’historique local montre `124ad73` (v2), `90b449d` (déclenchements séparés) et `2762ba2`
(carte masquée, variantes téléphone, sans lueur). Cela établit des adaptations successives,
pas un import littéral v3 ni le commit source historique de chaque transfert.
Aucun renommage, remplacement, nettoyage ou modification du composant n’est effectué ici.

Ce relevé n’est pas un nouveau contrat de livraison complet : licences, référence visuelle
figée, API d’export et matrice navigateur complète restent à établir pour une nouvelle réception.
