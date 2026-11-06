# EXERCICE : livraison corrective préparée, non publiée

- Studio : https://github.com/Eliassylla/video-animation/issues/1
- Portfolio : https://github.com/Eliassylla/porfolio-elias/issues/7
- Signalement Portfolio : https://github.com/Eliassylla/porfolio-elias/issues/7#issuecomment-6685035707
- Reproduction Studio avant correction : https://github.com/Eliassylla/video-animation/issues/1#issuecomment-6685038579
- Version précédente : `2.0.0-exercice.theme.1`, Studio `60c3eda3b956374cd89d479ec5c9fec66938cd1d`.
- Correctif : `2.0.0-exercice.theme.2`, Studio `2c8bfb64f36a3a0ab37f19a97a70fbbdcb7689f7`.
- Dossier source : `sites/portfolio/exports-web/01-textes/essai-theme-002/`.
- Branche source : `essai/studio-1-circuit-bug`, actuellement locale.
- Import Portfolio : `src/integrations/section01/essai-theme-002/`, octets contrôlés,
  voir integrite-correctif.json ; déclaration TypeScript locale inchangée.

Elias a confirmé le défaut dans Portfolio Preview puis dans l’aperçu Studio autonome
AVANT préparation de ce correctif. Les deux signalements sont publiés avec son accord.

Le Studio a rétabli les quatre sélecteurs CSS de palette. CSS, JavaScript, HTML et courbes
sont identiques à la v2 saine ; assets et dépendances inchangés. Les contrôles d’identité
et du manifeste sont conservés dans `specs/001-exercice-circuit-bug/` à la source.
Aucune incompatibilité nouvelle. Aucun changement de mouvement ni de vidéo/After Effects.

Le correctif est repris localement dans Portfolio par changement des imports uniquement.
Ancien export défectueux conservé pour preuve, mais plus sélectionné dans l’adaptateur.
La v2 validée et les branches main ne sont pas modifiées par cet exercice.

## Livraison à publier après accord

Le compte rendu devra être adressé aux deux tickets avec les liens immuables du commit
source publié, la version, les contrôles et leurs limites. État Studio à annoncer après
publication : « livré, à confirmer ». Aucun ticket à clôturer à ce stade.

## Confirmation encore attendue

Après accord d’envoi et création de la Preview du commit Portfolio corrigé, Elias rejoue :
charger en clair, descendre à la carte, passer en sombre puis revenir en clair.
Attendu : carte sombre puis claire. Relever URL, commit, appareil/navigateur, dimensions
et préférence de mouvement lorsqu’ils sont disponibles. La résolution navigateur n’est
pas revendiquée avant son constat. L’aperçu Studio corrigé reste également à confirmer.
Les mesures de fluidité, chargement et nettoyage, ainsi que la matrice complète de thèmes
et réduction des animations, restent à vérifier séparément. #1 demeure ouvert.

## Reprise de la livraison publiée

Le dernier retour Studio dans #7 (commentaire 6685492734) et la livraison dans #1
(commentaire 6685490019) ont été lus. L’export au commit 2c8bfb6 a été récupéré
depuis GitHub avec ses preuves au commit 7cf665d. Les 14 empreintes du manifeste
sont vérifiées ; les onze fichiers importés préexistants correspondent exactement
au commit publié. Détail : reception-publiee-theme2.json. Aucun correctif divergent
ni changement de runtime ajouté pendant cette reprise.

Les mentions de non-publication et de contrôles navigateur absents ci-dessus et dans
le manifeste décrivent l’état historique de préparation. Le dernier commentaire Studio
atteste maintenant la publication et huit scénarios navigateur ciblés côté fournisseur.
Ce résultat ne prouve pas encore la résolution dans Portfolio.
