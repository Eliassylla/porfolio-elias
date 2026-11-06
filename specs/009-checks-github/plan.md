# Plan et périmètre réservé

Base propre : main distant `4f23eeec9cd5e7f0794bdb48fbee7140a68e68dc`.
Copie isolée : `/private/tmp/portfolio-009-ci`, branche `chantier-009-checks`.
Les travaux personnels du checkout Portfolio et les branches d'exercice sont préservés.

Fichiers : `.github/workflows/quality.yml`, `docs/methode/checks-github.md`, ce dossier
et le renvoi CI dans AGENTS.md et CLAUDE.md. Aucun fichier applicatif, configuration
de build, secret, dépendance ou mouvement n'est modifié.

Ordre : comparer le workflow Skyline en lecture seule ; vérifier les versions et SHA
officiels des actions ; préparer le workflow ; valider sa structure et les commandes
sur une installation verrouillée ; revue ; commit et proposition d'envoi/PR ; contrôles
distants ; protections GitHub et import Vercel après accords. Une seule PR pour #9.

Skyline ajoute Supabase et des tests de réservation qui ne correspondent pas à ce périmètre.
Seuls le principe des checks, les permissions limitées et l'annulation des runs remplacés
sont repris. Aucun accès ou identifiant Skyline copié.

La PR de bilan #7 sera préparée séparément depuis main avec les preuves durables,
sans importer les exports défectueux ni les changements d'adaptateur de l'exercice.
