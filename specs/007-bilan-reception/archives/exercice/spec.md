# Contrat d’essai

- Studio : [#1](https://github.com/Eliassylla/video-animation/issues/1).
- Destinataire : [Portfolio #7](https://github.com/Eliassylla/porfolio-elias/issues/7).
- Source saine : `2f347a9059b4658f4b68fde0cbb353ad4113f582`, `2.0.0-prototype`.
- Export défectueux : `2.0.0-exercice.theme.1`, commit Studio `60c3eda3b956374cd89d479ec5c9fec66938cd1d`.
- Base Portfolio : `dc37918d6e72e2aba918841f7c1af97e1357d5f8`, commit testé par Elias.
  La fusion `4f23eee` est attestée par #1 mais son objet n’est pas disponible localement.
  Cette copie d’essai ne prétend pas être le main distant actualisé.
- Copies indépendantes sous `/private/tmp/circuit-bug-20261106/` ; dépôts originaux préservés.

## Scénario utilisateur à rejouer

Charger la page en clair, descendre jusqu’à la carte « Cette semaine », attendre la fin
de l’entrée, passer en sombre. Attendu : carte sombre. Défaut prévu : carte toujours claire.
Rejouer sur téléphone et ordinateur si disponibles, noter les dimensions exactes.
Avant correction Studio, ouvrir le même export dans son aperçu autonome et obtenir le
même constat d’Elias. Le résultat prévu ne constitue pas une reproduction déjà effectuée.

## Critères distincts du circuit

| Critère de #1 | Preuve encore nécessaire | État |
|---|---|---|
| Circuit complet | Signalement, reproduction Studio avant correction, version corrective, réception | À exécuter |
| Thèmes | Clair/sombre et changement en session dans la vraie page | À vérifier |
| Réduction des animations | Chargement et changement en session, contenu lisible | À vérifier |
| Lecture unique | Montée/descente et scroll rapide | À vérifier |
| Nettoyage | Retrait/remontage réel, absence de doublons et activité résiduelle mesurée | À mesurer |
| Fluidité et chargement | Avant/après avec même environnement, traces et limites | À mesurer |
| Formats et navigation | Matrice Portfolio, clavier, console et interactions | À vérifier |

Aucune case n’est validée par le seul exercice ou par la compilation.
Les versions vidéo, After Effects, courbes et relecture des autres sections sont préservées.
