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

Le commit exact et les résultats de validation des fichiers seront consignés après
l’enregistrement local de cette adaptation. Les 37 tests historiques de l’application ne
sont pas présentés comme de nouveaux tests de ces skills. Aucun test d’interface nécessaire
à un changement d’écran n’a été exécuté, car ce chantier ne change aucun écran.

L’envoi des branches, la PR, la fusion, la configuration du projet GitHub, la CI et le
nettoyage des branches restent des étapes ultérieures soumises à leurs accords propres.
