# Vérification locale de #9

6 novembre 2026. Base main `4f23eeec9cd5e7f0794bdb48fbee7140a68e68dc`,
branche `chantier-009-checks`, checkout isolé `/private/tmp/portfolio-009-ci`.
Arbre modifié avant commit : workflow et documents seuls, code applicatif inchangé.

## Vérifications exécutées

- Releases officielles GitHub lues via l'API : checkout v7.0.1 et setup-node v7.1.0.
  Les SHA du workflow ont été résolus depuis ces tags. Leurs action.yml confirment
  un runtime d'action Node 24 ; les commandes du projet utilisent Node 22.16.0.
- YAML lu avec la bibliothèque système Ruby/Psych ; quatre entrées de matrice.
  Cette lecture ne remplace pas la validation du moteur GitHub Actions.
- Installation propre des dépendances verrouillées réussie avec npm 11.7.0 : 392 packages,
  sans changement de package.json ou package-lock.json. Cache isolé dans /private/tmp.
- Les quatre commandes sont rejouées sur cette installation ; commandes, dates,
  environnement et journaux complets dans [preuves/controles.json](preuves/controles.json).
- `git diff --check` exécuté. AGENTS.md est un lien symbolique vers CLAUDE.md déjà présent
  dans main ; il est préservé. Une seule modification des consignes est nécessaire.

Un premier npm ci sous sandbox ne pouvait pas écrire les journaux dans le cache utilisateur
et a fini avec « Exit handler never called ». Après lecture du triage vérifications,
installation rejouée avec cache isolé et accès réseau autorisé : réussite. Aucun changement
applicatif, de test, de dépendance ou de lockfile utilisé pour masquer ce problème d'environnement.

## État distant et étapes encore à faire

Aucun workflow n'est présent dans main au contrôle initial ; la présence locale de quality.yml
n'est pas une CI active. Le dépôt est public et l'identité authentifiée dispose du droit admin.
Les protections réellement présentes sont lues avant de préparer leur changement ; aucune
protection, statut de projet ou configuration Vercel modifiée par cette préparation.

Branche non envoyée, PR non ouverte ; aucun run GitHub de ce nouveau workflow à attester.
Le test distant d'échec contrôlé puis correction, le choix des noms réellement affichés,
la protection de main et l'import Vercel restent à réaliser après les accords requis.
Les contrôles locaux ne sont pas annoncés comme des checks GitHub réussis.

Aucun ajout de test navigateur, déploiement par Actions, secret, outil ou dépendance au site.
Aucun rendu changé : pas de nouvelle matrice visuelle nécessaire pour ce workflow/documentation.
Le typage ne couvre pas explicitement api/ ; ce périmètre reste inchangé et documenté.
