# Specs — Portfolio

Ce dossier est la **source de vérité du comportement**. Le code l'implémente, les tests le vérifient, `CLAUDE.md` y renvoie.

## Règle de lecture

Ne pas charger tout ce dossier au démarrage d'une session. Lire uniquement la spec de la tâche en cours, désignée par le champ `spec:` de la tâche dans `TASKS.md`.

## Règle de modification

Une spec est **fermée** pendant l'exécution d'une tâche. Un opérateur qui pense qu'une spec est fausse ouvre une tâche de révision — il ne code pas contre elle, et il ne la modifie pas en passant.

Les fixtures de `fixtures/` sont la **définition exécutable** du comportement. Changer une fixture, c'est changer le contrat : ça se fait dans une tâche dédiée, jamais pour faire passer un test.

## Contenu

| Fichier | Rôle |
|---|---|
| `attribution/utm-contract.md` | Champs d'attribution, normalisation, valeurs par défaut, durée de vie |
| `attribution/scenarios.md` | Scénarios Given/When/Then du contrat d'attribution |
| `fixtures/landing.*.json` | Cas d'entrée/sortie attendus, consommés par `src/lib/attribution/capture.test.ts` |

## Frontière des responsabilités

Rappel, parce que c'est ce qui détermine où une spec a le droit d'exister :

- **Cal.com** est la source de vérité des réservations, de leurs statuts, des réponses de qualification et des rappels.
- **Le Portfolio** conserve le contexte d'acquisition et mesurera le parcours. Il ne détient aucune réservation.
- **L'OS personnel** récupère les données Cal.com via Composio et les redistribue aux départements. Aucune spec de redistribution ne vit ici.
