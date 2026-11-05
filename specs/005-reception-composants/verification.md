# Vérification documentaire de la réception

Date : 2026-11-05 · Issue #5 · État : vérifié localement, prêt à relire ; aucun envoi externe.

## Références

- Base Portfolio comparée : `fc306fe6d633ece2d756e6d32d07418919295de2`, PR #4 fusionnée.
- Studio comparé : `70f3092849ff7221770f00fc9edba57ebdc168c2` ; les fichiers de scène
  comparés sont identifiés par leurs empreintes. Des changements d'outillage existent
  dans l'autre session ; ce chantier n'y écrit pas.
- [Comparaison statique](comparaison-sources.json) et [fiche Notes → Chat](../../docs/composants/notes-chat.md).
- Commit documentaire testé : `6138a2c555a8dd2a56f2a6244ecef51ece8b867e`, branche
  `chantier-5-reception-composants`. Fichiers suivis propres pendant les contrôles.
  Les documents/outils personnels et fichiers générés déjà non suivis sont restés hors commit.
- Le complément qui consigne ces résultats ne modifie que ce rapport et le statut du plan.
  Il ne constitue pas une nouvelle preuve de rendu d'interface.

## Ce qui a été vérifié par lecture et comparaison

- Les trois SVG Notes/Chat et les quatre SVG de la carte sont identiques à leurs correspondants.
- Le corps des fichiers section.js v2/v3 du texte est identique hors commentaires.
- La fiche décrit séparément le mouvement commun, l'assemblage React et les déclencheurs locaux.
- Les quatre courbes communes ont été comparées sur 1 001 points chacune, différence maximale 0.
  Cette comparaison numérique ne valide pas le rendu, les performances ou la provenance historique.
- Le modèle est général : aucune création HyperFrames ou commande de lecture n'est imposée.
- Les permissions locales et externes sont séparées ; les inconnues sont indiquées dans la fiche.

## Contrôles du chantier

Contrôles exécutés sur 6138a2c, le 5 novembre 2026, environnement local macOS avec les
dépendances déjà présentes, sans installation ni service tiers en écriture :

| Contrôle | Résultat et limite |
|---|---|
| Liens et chemins locaux | 24 documents parcourus, 39 liens relatifs valides ; références externes non retestées par ce contrôle |
| Archive TASKS | Identique octet pour octet au fichier de fc306fe ; lien AGENTS vers CLAUDE préservé |
| Validation des skills | Les trois skills passent le validateur skill-creator disponible localement ; ce contrôle ne prouve pas leur comportement dans tous les cas |
| Diff applicatif | `src/`, `worker/`, assets, dépendances, configuration d'hébergement et fixtures identiques à fc306fe |
| Entrée Vercel | JavaScript transpilé sans commentaires identique à fc306fe ; seuls deux commentaires changent |
| `npm test` | 37 tests réussis, 4 fichiers ; Cal.com simulé, aucune réservation distante créée |
| `npm run typecheck` | Réussi ; couvre src et worker, pas explicitement api/booking.ts |
| `npm run build` | Réussi ; avertissements existants sur eval de lottie-web et taille des bundles, aucune mesure de performance utilisateur |
| `npm run lint` | 0 erreur, 4 avertissements existants dans badge, button, form et sonner |
| Diff et relecture | Pas d'erreur de whitespace dans les changements ; relecture indépendante sans défaut important |

La relecture a recoupé les fichiers source, les empreintes, les déclenchements et les liens.
Une ambiguïté mineure sur l'auto-merge a été retirée avant le commit testé ; son interdiction
est cohérente dans les consignes et la politique. Aucun test de texte artificiel ajouté.

Pour reproduire : repartir de 6138a2c avec ses dépendances, exécuter les quatre commandes
ci-dessus ; comparer les sources applicatives et l'archive à fc306fe. La comparaison Studio
requiert les fichiers épinglés par le relevé, pas une future version portant le même nom.
Les sondes de comparaison et de liens de cette session sont temporaires ; les résultats et
empreintes utiles sont conservés ici. Ni CI, ni contrôle navigateur ni surveillance activés.

## Matrice d'interface à exécuter lors d'une réception

Ces cas sont **non exécutés dans ce chantier documentaire**. Leur présence est une exigence
de procédure, pas une preuve de conformité actuelle de l'animation ou de la page.

| Configuration | Déclinaisons et scénarios | État |
|---|---|---|
| Téléphone 360 × 800 et 390 × 844 | Clair/sombre × mouvement normal/réduit ; entrée, sortie, retour, lisibilité, Audit | Non exécuté |
| Tablette 768 × 1024 et paysage pertinent | Même croisement ; place disponible, interaction tactile, navigation | Non exécuté |
| Ordinateur 1440 × 900 | Même croisement ; scroll, clavier, focus, navigation | Non exécuté |
| Largeurs 639/640, 768/769 et 1023/1024 px | Variantes carte, changement de scroll/layout ; mesurer avec hauteur renseignée | Non exécuté |
| Largeur intermédiaire, par exemple 900 × 900 | Deux thèmes et préférences ; absence de débordement | Non exécuté |
| Redimensionnement et rotation | Passer entre formats sans rechargement, changer le thème en session | Non exécuté |
| Retrait/remontage et navigation | Erreurs console, doublons, animations résiduelles, état initial/final | Non exécuté |
| Appareil réel Safari/iOS | Stabilité du portrait et de l'animation, fluidité et interactions | Non exécuté |

Pour chaque cas : commit, état de l'arbre, URL/environnement, date, navigateur/outil et version,
dimensions, thème, préférence, scénario, constat, capture ou mesure, limite. Une émulation
n'est jamais qualifiée d'appareil réel. Les contrôles de réservation distante exigent leur accord propre.

## Suites non autorisées par ce rapport

Pas de push, nouvelle PR, commentaire GitHub, fusion, déploiement, création de rendez-vous,
correction Studio, nouveau mouvement ou choix sur la relecture au scroll.
La CI, les moyens de capture et le projet GitHub restent à configurer dans un travail distinct.
