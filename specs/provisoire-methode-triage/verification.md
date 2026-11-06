# Vérification des skills et du routage

Date : 2026-11-06. Base de comparaison : `0cff7c9`, documents #5 préparés localement.
Branche : `chantier-methode-triage`. Aucun envoi, aucune installation de service ou connexion,
aucune action sur une réservation réelle. Les fichiers personnels non suivis restent hors commit.

## Périmètre

Triage adapté d’Oncall Kit et deux références ciblées ; routage relié aux trois skills Skyline
déjà adaptés. Licence et provenance amont conservées. Les scénarios ci-dessous sont des essais
de lecture des consignes ; ils ne sont pas des incidents réellement rejoués sur le site.
La procédure #5, ses preuves et les mouvements restent inchangés.

## Essai indépendant de routage

| Demande simulée | Réponse observée lors de la relecture |
|---|---|
| Changer un mot isolé | Circuit court et contrôle ciblé, sans diagnostic d’incident |
| Photo qui disparaît au scroll | Triage, vidéo et reproduction réelle avant correction ; juge visuel pour le rendu |
| Sauter un test rouge | Refus d’affaiblir le contrôle ; recherche de la cause et correction dans le périmètre |
| Preview disponible et conflit de PR | Diagnostic séparant branche et fusion ; résolution locale, envoi/fusion avec leurs accords |
| Mouvement Studio différent et demande de relecture | Comparer le contrat et clarifier le comportement avant modification ; aucune écriture Studio déduite |
| Fin de session, suite déjà annoncée | Passation ciblée sans redemander son but ni autoriser la future configuration GitHub |
| Vercel vert supposé prouver un email | Corriger la prémisse ; vérifier le parcours réel avec l’accord nécessaire, aucune notification lancée |

La relecture ne relève aucun défaut important de routage ou de permissions. Elle ne prouve
pas une activation dans tous les agents ni un fonctionnement de surveillance en arrière-plan.
L’évaluateur n’a appliqué aucun scénario, créé aucune passation ni effectué d’appel réseau.

## Contrôles locaux

Commit contrôlé : `22e35add666084269558909e6c743dde18f4a78b`, fichiers suivis propres.
Les résultats sont consignés dans un complément documentaire qui ne modifie pas les skills.

- Les quatre skills triage, chantier, juge-visuel et passation passent le validateur
  skill-creator disponible localement. Il vérifie leur structure, pas toutes les décisions possibles.
- 20 documents du routage et de la méthode parcourus, 49 liens relatifs valides, aucune ancre manquante.
- Licence conservée à l’identique : Git blob `d645695673349e3947e8e5ae42332d0ac3164cd7`,
  conforme au fichier source épinglé. Aucun fichier NOTICE n’existe à la racine amont inspectée.
- Sources applicatives, API, assets, configuration, dépendances et fixtures identiques à 0cff7c9.
- Diff sans erreur de whitespace ; relecture indépendante sans défaut important.
- Aucun test applicatif répété pour ces seules consignes. Les 37 tests historiques ne sont
  pas présentés comme de nouveaux tests des skills. Aucun écran modifié, aucun test navigateur
  ni incident distant exercé. Les scénarios de routage restent une évaluation de consignes.

Les références Oncall ont été lues au commit c03282cd5381a5a2e12e32bfb3c8957d52ce01f1 ;
les exemples fictifs, seuils et intégrations de son équipe ne sont pas importés comme des faits.
La licence, le relevé de provenance et les références adaptées sont conservés avec le skill.

L’envoi des branches, la PR, la fusion, la configuration du projet GitHub, la CI et le
nettoyage des branches restent des étapes ultérieures soumises à leurs accords propres.

## Décision de livraison ultérieure

Le 6 novembre 2026, Elias demande explicitement une seule PR pour les documents de réception
et les skills adaptés. La fiche est mise à jour pour ce regroupement ; les preuves ci-dessus
restent rattachées aux commits contrôlés. L’envoi et la création de cette PR sont autorisés,
sans fusion, configuration de projet GitHub ou nettoyage de branches. Le premier essai
d’envoi, antérieur à cet accord précis, avait été refusé par le contrôle automatique et
n’avait publié aucune branche.
