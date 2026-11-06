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
et reste indépendant des autres. Les journaux GitHub permettent de voir ce qui échoue.
Un fichier de workflow présent ne prouve pas qu'un run distant a réussi ; l'état réel
de mise en place et les preuves sont dans le [chantier #9](../../specs/009-checks-github/verification.md).

Les contrôles locaux restent utiles avant l'envoi. Aucun check n'exige de secret Cal.com
ou Vercel. Ne pas ajouter de vraie réservation ou notification à ces tests.
Le typage actuel ne couvre pas explicitement l'entrée api/ ; les avertissements connus
ne sont pas supprimés pour obtenir un résultat vert.

## Avant fusion et avant production

Après un premier run complet, les noms réellement affichés seront sélectionnés dans
les protections de main pour rendre les quatre checks obligatoires avant fusion.
Ces protections ne sont pas activées par le YAML. Leur modification attend son accord.

Dans Vercel : Settings → Build and Deployment → Deployment Checks → Add checks → GitHub.
Sélectionner les mêmes quatre checks, après vérification des prérequis du projet et accord.
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
