# Vérification documentaire de la réception

Date : 2026-11-05 · Issue #5 · État : préparation locale, aucun envoi externe.

## Références

- Base Portfolio comparée : `fc306fe6d633ece2d756e6d32d07418919295de2`, PR #4 fusionnée.
- Studio comparé : `70f3092849ff7221770f00fc9edba57ebdc168c2` ; les fichiers de scène
  comparés sont identifiés par leurs empreintes. Des changements d'outillage existent
  dans l'autre session ; ce chantier n'y écrit pas.
- [Comparaison statique](comparaison-sources.json) et [fiche Notes → Chat](../../docs/composants/notes-chat.md).
- Le commit documentaire testé sera renseigné après son enregistrement local.
  Aucun résultat des tests à venir n'est encore affirmé dans cette version.

## Ce qui a été vérifié par lecture et comparaison

- Les trois SVG Notes/Chat et les quatre SVG de la carte sont identiques à leurs correspondants.
- Le corps des fichiers section.js v2/v3 du texte est identique hors commentaires.
- La fiche décrit séparément le mouvement commun, l'assemblage React et les déclencheurs locaux.
- Les quatre courbes communes ont été comparées sur 1 001 points chacune, différence maximale 0.
  Cette comparaison numérique ne valide pas le rendu, les performances ou la provenance historique.
- Le modèle est général : aucune création HyperFrames ou commande de lecture n'est imposée.
- Les permissions locales et externes sont séparées ; les inconnues sont indiquées dans la fiche.

## Contrôles du chantier

À compléter avec le commit, les commandes réellement exécutées, leurs résultats et les limites :
liens et chemins, validation des skills, archive exacte, absence de changement exécutable,
tests existants, typage, compilation et lint. La lecture indépendante sera consignée après son retour.

## Matrice d'interface à exécuter lors d'une réception

Ces cas sont **non exécutés dans ce chantier documentaire**. Leur présence est une exigence
de procédure, pas une preuve de conformité actuelle de l'animation ou de la page.

| Configuration | Déclinaisons et scénarios | État |
|---|---|---|
| Téléphone 360 × 800 et 390 × 844 | Clair/sombre × mouvement normal/réduit ; entrée, sortie, retour, lisibilité, Audit | Non exécuté |
| Tablette 768 × 1024 et paysage pertinent | Même croisement ; place disponible, interaction tactile, navigation | Non exécuté |
| Ordinateur 1440 × 900 | Même croisement ; scroll, clavier, focus, navigation | Non exécuté |
| Largeurs 639/640, 768/769 et 1023/1024 px | Variantes carte, changement de scroll/layout ; mesurer avec hauteur renseignée | Non exécuté |
| Largeur intermédiaire, par exemple 900 × 900 | Deux thèmes et préférences ; absence de débordement | Non exécuté |
| Redimensionnement et rotation | Passer entre formats sans rechargement, changer le thème en session | Non exécuté |
| Retrait/remontage et navigation | Erreurs console, doublons, animations résiduelles, état initial/final | Non exécuté |
| Appareil réel Safari/iOS | Stabilité du portrait et de l'animation, fluidité et interactions | Non exécuté |

Pour chaque cas : commit, état de l'arbre, URL/environnement, date, navigateur/outil et version,
dimensions, thème, préférence, scénario, constat, capture ou mesure, limite. Une émulation
n'est jamais qualifiée d'appareil réel. Les contrôles de réservation distante exigent leur accord propre.

## Suites non autorisées par ce rapport

Pas de push, nouvelle PR, commentaire GitHub, fusion, déploiement, création de rendez-vous,
correction Studio, nouveau mouvement ou choix sur la relecture au scroll.
La CI, les moyens de capture et le projet GitHub restent à configurer dans un travail distinct.
