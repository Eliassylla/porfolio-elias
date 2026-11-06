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

## Reprise autorisée du 6 novembre 2026

L'implémentation #11 est fusionnée. Le plan ci-dessus reste l'historique ; aucun
nouveau workflow ni installation à prévoir. Elias demande de terminer les contrôles
manquants sur `chantier-009-verification`, depuis main `03beb50839d1e2d9c2dcffaeab3149f240f05be6`.
Périmètre : complément des preuves et de la documentation active ; sonde de typage
locale non importée, puis retrait complet. Dépendances déjà installées conservées.
L'alignement demandé des consignes utilise désormais un `spec.md` court pour les
petites tâches : méthode, routage, CLAUDE.md (cible du lien AGENTS.md), skill chantier
et modèle court. Les anciennes fiches et leurs liens restent conservés.

Les deux commits d'essai sont préparés localement avant toute demande d'envoi.
Chaque push, éventuelle PR et mise à jour du ticket attend son accord propre.
Un push peut déclencher une Preview Vercel selon l'intégration Git ; aucun push sur
main ni fusion n'est prévu pour cette sonde. La reprise de #9 autorise ce complément
du dossier existant, sans réécrire les décisions et preuves historiques fusionnées.
