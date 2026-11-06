# Vérifications GitHub et mise en ligne Vercel

Le workflow [Qualité](../../.github/workflows/quality.yml) définit quatre résultats :

| Check | Commande |
|---|---|
| Tests | `npm test` |
| Typage | `npm run typecheck` |
| Lint | `npm run lint` |
| Compilation | `npm run build` |

Il se lance sur les pushes, les PR et manuellement. Les noms sont stables pour les
protections GitHub et l'import Vercel. Chaque job installe les dépendances verrouillées
et reste indépendant des autres. Réserver les quatre noms à ce workflow pour éviter
les collisions avec de futurs checks. Les journaux GitHub permettent de voir ce qui échoue.
Un fichier de workflow présent ne prouve pas qu'un run distant a réussi ; l'état réel
de mise en place et les preuves sont dans le [chantier #9](../../specs/009-checks-github/verification.md).

Les contrôles locaux restent utiles avant l'envoi. Aucun check n'exige de secret Cal.com
ou Vercel. Ne pas ajouter de vraie réservation ou notification à ces tests.
Le typage actuel ne couvre pas explicitement l'entrée api/ ; les avertissements connus
ne sont pas supprimés pour obtenir un résultat vert.

## Avant fusion et avant production

Au relevé du 6 novembre 2026, les quatre checks sont actifs et obligatoires avant fusion
sur main : [règle 26716961](https://github.com/Eliassylla/porfolio-elias/rules/26716961).
La branche doit être à jour et les discussions résolues ; une PR est obligatoire.
Ces protections sont configurées dans GitHub, séparément du YAML.
Le dernier [run main vérifié](https://github.com/Eliassylla/porfolio-elias/actions/runs/42277662992)
est réussi sur `03beb50839d1e2d9c2dcffaeab3149f240f05be6`.
L’essai distant d’échec volontaire puis correction est terminé :
[échec du typage](https://github.com/Eliassylla/porfolio-elias/actions/runs/42289758000),
puis [quatre checks réussis après correction](https://github.com/Eliassylla/porfolio-elias/actions/runs/42290341257).
Les commits et limites sont conservés dans le chantier #9.
Toute modification des protections attend un accord propre.

L’import Vercel a été reporté par Elias ; il ne conditionne pas la clôture des critères
initiaux de #9. Aucun import réussi n’est attesté. Pour une reprise autorisée :

Dans Vercel : Settings → Build and Deployment → Deployment Checks → Add checks → GitHub.
Vérifier que le dépôt est relié par Vercel for GitHub et que l’attribution automatique
des domaines de production est activée. Sélectionner les mêmes quatre checks après accord.
Il n'est pas nécessaire de les refaire avec les Native Deployment Checks Vercel.
Les checks GitHub et Vercel sont deux réglages distincts : GitHub contrôle la fusion,
Vercel contrôle la promotion du build de production vers les domaines publics.
Ne pas contourner un échec avec Force Promote. La présence d'une Preview prête ne
remplace pas ces résultats. Les essais visuels restent nécessaires pour les écrans modifiés.

## Références vérifiées le 6 novembre 2026

- [Deployment Checks Vercel](https://vercel.com/docs/deployment-checks).
- [actions/checkout v7.0.1](https://github.com/actions/checkout/releases/tag/v7.0.1),
  SHA `3d3c42e5aac5ba805825da76410c181273ba90b1`.
- [actions/setup-node v7.1.0](https://github.com/actions/setup-node/releases/tag/v7.1.0),
  SHA `949feb2413d6458794dcd2491c4babbbce0c15c1`.

Ces deux actions utilisent leur runtime Node 24 ; les commandes du projet tournent
sous Node 22.16.0 fourni par setup-node. Le runner retenu est ubuntu-24.04.
