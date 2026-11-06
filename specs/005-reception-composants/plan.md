# Plan : documents et consignes de réception

Issue #5 · Date : 2026-11-05 · Branche : `chantier-5-reception-composants`.
Périmètre autorisé par Elias en session ; plan rédigé avant les modifications documentaires.
Statut : préparé et vérifié localement, à relire par Elias ; aucun envoi externe.
Aucun fichier applicatif ne change de comportement.

## Fichiers réservés dans ce chantier

- `CLAUDE.md`, `README.md`, `TASKS.md`, `DESIGN.md`, `.gitignore`.
- `specs/README.md`, uniquement le point d’émission documentaire de `specs/attribution/utm-contract.md`.
- Uniquement les commentaires de `api/booking.ts`, aucun code exécutable.
- Nouveaux dossiers `docs/methode/`, `docs/modeles/`, `docs/composants/`, `docs/suivi/`, `docs/archives/`.
- `specs/005-reception-composants/`.
- `.agents/skills/chantier/`, `.agents/skills/passation/`, `.agents/skills/juge-visuel/`, adaptés de Skyline.

Les autres documents personnels de `docs/` et les skills déjà non suivis ne sont pas réservés
ni ajoutés au commit. Ne pas toucher au Studio, à `src/`, aux assets, aux fixtures,
aux dépendances, à la configuration d’hébergement ou aux versions des animations.

## Ordre

1. Comparer fichiers source/destinataire, relever commits et empreintes, distinguer historique et hypothèses.
2. Écrire procédure générale, modèle, cas concret et écarts Studio séparés.
3. Corriger les consignes Portfolio, adapter les trois skills de gestion demandés et archiver TASKS.
4. Formaliser l’autonomie séparément ; vérifier liens, champs de preuve et scénarios de reprise.
5. Vérifier absence de changement exécutable, lancer les contrôles disponibles, faire relire.
6. Créer un commit local et fournir les résultats ; aucun push ni PR sans accord ultérieur.

## Risques et parades

| Risque | Parade |
|---|---|
| Déduire une version d’un commentaire | Comparaison des fichiers, empreintes et historique local |
| Transformer un exemple en norme | Procédure générale, contraintes spécifiques dans la fiche Notes → Chat |
| Perdre du travail en retirant TASKS | Archive exacte du commit de référence et tableau des reprises |
| Modifier une permission en simplifiant le circuit | Politique autonome séparée, actions externes toujours soumises à accord |
| Confondre plan de tests et résultat | Statut explicite et commit dans le rapport, aucune capture inventée |
| Importer les règles de Skyline en bloc | Conserver la structure, adapter stack, métiers, commandes et autorisations |

## Preuves attendues

Relevé de comparaison lié à fc306fe (Portfolio) et 70f3092 (Studio), liens et chemins valides,
lecture à froid, absence de différence des sources applicatives, contrôles locaux et revue.
Les scénarios d’interface de la matrice restent non exécutés dans ce chantier documentaire.
Aucun test de rendu, de performance ou d’arrêt complet n’est remplacé par le contrôle statique.

Résultats : [verification.md](verification.md), commit documentaire testé 6138a2c.
Les écarts Studio restent dans le relevé local, sans écriture dans l'autre dépôt.

## Complément accepté le 6 novembre 2026 : tickets liés et réception

Elias demande d'ajouter à la procédure portée par la PR #6 la règle convenue en session Studio :
un ticket destinataire pour le problème dans la page, un ticket fournisseur seulement si le
composant est à corriger, réutilisation du ticket destinataire à chaque livraison du même défaut,
et confirmation avec preuves avant clôture. La branche actuelle est chantier-methode-triage,
qui regroupe le travail documentaire #5 et le routage.

Fichiers de ce complément : docs/methode/reception-composants.md,
docs/modeles/composant-externe.md et ce dossier de chantier.
Vérifier liens et cohérence des scénarios de correction, réception, reprise, abandon et
plusieurs sites ; conserver les sources applicatives et travaux non suivis.
Le complément demandé vise la PR #6 existante, sans fusion, nouveau ticket, installation
d'automatisme ou modification du composant. Une mise à jour de sa branche peut relancer la Preview existante.
