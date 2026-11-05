# Contrats et dossiers de chantier

Les comportements sont décrits ici, implémentés dans le code et vérifiés par les tests.
Lire [la méthode](../docs/methode/developpement.md), puis uniquement le dossier du chantier
courant et les contrats qu’il cite. `TASKS.md` n’est plus la file de travail active.

## Organisation

- `NNN-sujet/intent.md`, `spec.md`, `plan.md` et `verification.md` pour un chantier complet.
- `NNN-sujet/fiche.md` pour le circuit court ; recherche seulement si elle est utile.
- `attribution/` et `fixtures/` restent les contrats historiques actifs et leurs cas exécutables.
- [005-reception-composants](005-reception-composants/intent.md) : procédure générale, premier exemple et permissions.

Un dossier de chantier fusionné est figé ; une évolution ultérieure renvoie à l’ancien.
Un contrat actif peut évoluer dans un chantier dédié et accepté. Ne pas changer une fixture
ou affaiblir un test pour faire passer une implémentation. Une correction documentaire du
point d’émission ne change pas les règles de normalisation ni les fixtures.

Cal.com conserve les réservations ; le Portfolio affiche le parcours et capture la provenance.
La mesure de parcours relève d’une spec distincte. L’orchestration post-réservation appartient
à l’OS personnel : aucun flow opérationnel ni état de connexion n’est affirmé par ce dossier.
