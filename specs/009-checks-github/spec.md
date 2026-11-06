# Contrat des checks

- À chaque push, PR et lancement manuel, quatre jobs indépendants : `Tests`, `Typage`,
  `Lint`, `Compilation`. Chaque job utilise exactement la commande existante correspondante.
- Aucun filtre de chemins : une PR documentaire doit aussi obtenir les résultats obligatoires.
- Installation par `npm ci` depuis le lockfile. Node 22.16.0 et npm 11.7.0 correspondent
  à l'environnement local déjà utilisé ; pas de changement des dépendances ou du lockfile.
- Actions officielles figées par SHA, permissions `contents: read`, pas de persistance
  des identifiants de checkout, aucun secret de réservation ou de déploiement requis.
- Un échec reste un échec. Les autres jobs continuent pour donner tous les diagnostics.
  Les contrôles remplacés d'un même événement et ref sont annulés ; un push et une PR
  gardent des groupes distincts afin de ne pas annuler le contrôle du commit déployé.
- GitHub Actions teste le code ; Vercel construit les Previews selon son intégration Git.
  L'import de checks Vercel conditionne la promotion en production, pas la construction
  de la Preview. Aucun workflow de déploiement ajouté.

## Réception

1. Rejouer localement l'installation et les quatre commandes, conserver les journaux.
2. Après accord d'envoi, constater quatre checks distants et garder les URLs des runs
   et le SHA réellement testé. Aucun succès distant annoncé sur un test local.
3. Après accord propre, provoquer un échec contrôlé de CI et sa correction sur cette
   branche uniquement ; garder les deux SHA et runs, aucun défaut final à fusionner.
4. Après résultats observés et accord, rendre ces quatre checks obligatoires sur main
   et les sélectionner dans les Deployment Checks Vercel. Relever les réglages réels.
5. Rejouer les checks pour toute correction du code avant approbation de fusion.

Le typage actuel couvre src/ et worker/, pas explicitement api/. Les quatre avertissements
lint connus restent visibles. Ces checks ne prouvent ni les animations ni une réservation.
