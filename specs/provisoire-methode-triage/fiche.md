# Fiche : utiliser les skills au bon moment

Auteur : Elias · Date : 2026-11-06 · Statut : préparation locale autorisée en session.
Aucune issue créée ; dossier explicitement provisoire, sans numéro inventé.
Branche locale : `chantier-methode-triage`, issue de la préparation documentaire #5 au commit 0cff7c9.

## Ce qui change et pourquoi

Elias demande de récupérer les skills Oncall pertinents et de configurer leur usage avec les
méthodes/skills Skyline adaptés au Portfolio. Ajouter triage pour diagnostiquer les anomalies,
avec références ciblées tests et livraison ; les trois skills Skyline sont déjà présents.

## Ce qu’Elias verra

Les agents passent au diagnostic sur un problème réel, au juge visuel pour le rendu et à la
passation pour une reprise de session. Ils avancent localement dans le périmètre accepté et
s’arrêtent pour une décision nouvelle ou une action externe exigeant son accord.
Aucun changement d’écran ou d’animation ; aucune CI, surveillance, connexion ou routine installée.

## Fichiers réservés

- `.agents/skills/triage/` et adaptations ciblées de `.agents/skills/chantier/SKILL.md` et `juge-visuel/SKILL.md`.
- `CLAUDE.md`, `README.md`, `docs/methode/{choisir-un-skill,developpement,autonomie}.md`.
- `specs/README.md`, ce dossier provisoire et son rapport de vérification.

Les documents de #5 déjà commités gardent leur propre rapport. Ne pas modifier ses preuves
pour prétendre qu’elles couvrent ce nouveau skill. Les fichiers applicatifs, les travaux
personnels, les dépôts Skyline et Studio, les dépendances et la configuration restent inchangés.

## Vérification

Valider le skill et ses liens, vérifier la provenance/attribution, puis éprouver le routage
sur des demandes représentatives sans action externe : petite modification, bug, test en échec,
conflit de PR, composant Studio et fin de session. Rapport lié au commit local contrôlé.
Pas de répétition des tests applicatifs sur un changement de consignes seul.

## Livraison

Commit local seulement. La branche dépend des documents #5 encore locaux ; ne pas créer une
PR qui prétendrait ne contenir que triage avant intégration de cette base ou découpage explicite.
Envoi, PR, organisation GitHub, fusion, déploiement et nettoyage de branches restent à autoriser.
