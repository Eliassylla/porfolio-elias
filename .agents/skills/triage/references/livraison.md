<!-- Copyright 2026 Anthropic PBC -->
<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- Adaptation Portfolio du 6 novembre 2026. Les incidents fictifs de l’amont ont été retirés. -->

# Diagnostiquer une livraison ou une intégration bloquée

Dérivé de `deploy-rollout.md` d’Oncall Kit ; [provenance](origine-oncall.md).

## Page ou API différente après déploiement

1. Identifier l’URL, l’environnement (Preview/Production), le commit attendu et celui du
   déploiement réellement terminé. Lire les fichiers à une référence immuable pour éviter
   de prendre un aperçu ancien ou une branche mobile pour l’état actuel.
2. Lire le statut et le journal du déploiement accessibles en lecture seule. Séparer construction,
   publication des assets et exécution de la fonction serveur. Une page servie ne valide pas l’API.
3. Reproduire le parcours d’origine sans produire de réservation ou notification réelle.
   Si cela exige une action non autorisée, préparer le cas et demander l’accord précis.
4. Pour un échange avec Cal.com, lire l’erreur réelle et le contrat côté serveur. Vérifier
   l’existence de la configuration de l’environnement sans afficher de valeur secrète.
   Une variable présente en Preview ne prouve pas sa présence en Production.
5. Si une lecture est inaccessible ou incohérente, vérifier la référence et le moyen de mesure.
   Ne pas conclure qu’un déploiement n’existe pas parce qu’un outil n’y accède pas.

Pas de retry distant, changement de variable, rollback, push ou déploiement sans accord.
Une relance qui réussit donne une observation supplémentaire, pas une cause confirmée.
Après correctif déployé avec accord, rejouer le chemin initial ; une compilation verte seule
ne prouve pas le rétablissement. Sans reproduction, préciser la validation partielle.

## Preview disponible mais PR en conflit

La Preview construit la branche de travail ; sa réussite est compatible avec un conflit
entre cette branche et main. Identifier les versions et les fichiers en conflit, comprendre
les deux intentions, puis préparer une résolution locale dans le périmètre accepté.
Ne pas choisir automatiquement un côté, réintroduire un ancien formulaire ou supprimer un
verrou utile sans comparaison. Préserver fichiers non suivis et travaux d’autres sessions.
Le commit de résolution ne débloque la PR distante qu’après un envoi explicitement autorisé.

## Composant externe

Revenir à sa fiche : version source, adaptations locales, dépendances et preuve du rendu.
La source corrige le mouvement intrinsèque ; le Portfolio corrige son intégration. Ne pas
retoucher le mouvement ou sa relecture au scroll pendant une enquête sur le déploiement.
