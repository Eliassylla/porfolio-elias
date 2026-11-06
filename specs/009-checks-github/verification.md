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

## Résultats et relecture

Les quatre commandes ont réussi : 37 tests, typage et build ; lint sans erreur et quatre
avertissements connus. Ces preuves portent sur le code de `4bc2b1852687e22bf9ad555c773ffee63d124bbb`
et la même configuration de workflow ; les retouches suivantes sont documentaires seulement.
Les protections classiques de main répondent « Branch not protected » au contrôle API ;
aucun réglage n'a été changé. Vérifier aussi les éventuels rulesets avant une modification.

Relecture indépendante en lecture seule suivant requesting-code-review sur 4bc2b18 :
aucun problème critique ou important. Prérequis Vercel et réservation des noms clarifiés
dans la documentation ; référence du commit local ajouté ici. Verdict : prêt pour
proposition en PR, pas une validation des runs distants ou une autorisation de fusion.

## Reprise du 6 novembre 2026 après fusion de #11

Reprise explicitement demandée par Elias pour terminer #9. Les sections précédentes
conservent les constats historiques avant livraison ; le présent relevé les remplace
pour l'état actuel. L'installation et le workflow ne sont pas refaits.

Base locale et main GitHub : `03beb50839d1e2d9c2dcffaeab3149f240f05be6`, arbre
initial propre. Branche locale de reprise : `chantier-009-verification`.
Preuves API relues : [reprise-20261106.json](preuves/reprise-20261106.json).

| Critère | Constat vérifié |
|---|---|
| Push et quatre résultats | [Run main 42277662992](https://github.com/Eliassylla/porfolio-elias/actions/runs/42277662992), SHA `03beb50839d1e2d9c2dcffaeab3149f240f05be6` : Tests, Typage, Lint, Compilation réussis |
| PR et commit courant | [Run PR #11](https://github.com/Eliassylla/porfolio-elias/actions/runs/42269982110), SHA `36e3bb02d5d3dd97e59cdba295af9256961abf77` : success. Après mise à jour de #10, [run PR](https://github.com/Eliassylla/porfolio-elias/actions/runs/42277452015), SHA `9f2e94a0edb11a99648769573c79b1d758e4f257` : success |
| Protection main | [Règle active 26716961](https://github.com/Eliassylla/porfolio-elias/rules/26716961) relue : PR, quatre checks GitHub Actions obligatoires, branche à jour, discussions résolues, suppression et force push interdits, aucun contournement |
| Fusion #11 | Preuve conservée dans `.passations/checks-009-preuves-locales/preuves/fusion-pr-11.json` : fusion `fd1ebeaa9c828ab0cab39d745b27d090b87066e1`, 6 novembre 2026 |
| Échec volontaire et correction | Préparés et vérifiés localement ; leurs runs distants restent à exécuter après accords propres |
| Import Vercel | Reporté par Elias, distinct des critères initiaux du ticket. Aucun réglage Vercel modifié |

Environnement distant : workflow `quality.yml`, runner ubuntu-24.04, Node 22.16.0,
npm 11.7.0, commandes existantes et installation verrouillée. Pas de nouvel outil,
secret ou appel métier ajouté. Les preuves locales antérieures et les JSON de push,
PR et fusion de #11 sont sauvegardés dans `.passations/checks-009-preuves-locales/`.
Les anciens checkouts temporaires mentionnés dans le plan ont été supprimés avec
accord lors de la session précédente ; ils ne sont pas requis pour cette reprise.

### Essai local préparé, sans envoi

- Commit d'échec : `78d80951c727c8a2f70af82529da4e88797d2223`.
  Ajoute seulement `src/verification-checks-009.ts`, jamais importé dans le site.
  Une valeur numérique déclarée comme texte fait échouer le typage (TS2322).
- Commit de correction : `d2fbd02629eed7d524aa15ebb19a907cec052057`.
  Retire entièrement la sonde ; aucun changement applicatif net par rapport à main.
- Arbre testé : modifications documentaires locales en plus de ces commits,
  dépendances existantes, Node 22.16.0 et npm 11.7.0. Aucune installation rejouée.
- Journaux et résultats détaillés : [essai-local-20261106.json](preuves/essai-local-20261106.json)
  et fichiers texte voisins. L'échec est volontaire ; aucun contrôle n'est affaibli.
- Résultat local : échec volontaire du typage seul ; après retrait, 37 tests, typage,
  lint (quatre avertissements connus) et compilation réussis. Le lint lancé en parallèle
  du build a rencontré un fichier temporaire disparu (ENOENT) ; rejoué seul après le
  build, il réussit. Aucun code ni règle modifié pour ce diagnostic. Les jobs GitHub
  ont chacun leur checkout, contrairement à cette exécution locale concurrente.
- Les preuves locales ne valident pas encore le comportement GitHub en échec.
  Envoyer d'abord le commit d'échec sur la branche dédiée après accord, observer les
  quatre résultats, puis envoyer sa correction après un nouvel accord. Si une PR
  d'essai est nécessaire, demander son accord propre ; aucune fusion prévue pour la sonde.

Le suivi GitHub #9 reste ouvert et son corps n'a pas été actualisé. Aucune écriture
externe effectuée pendant cette préparation. Les limites de typage (`api/` non couvert
explicitement), les quatre avertissements lint et l'absence de preuve visuelle ou de
réservation restent inchangés.

La référence de triage affirmait encore que la CI était inactive : consigne périmée
corrigée localement dans `.agents/skills/triage/references/verifications.md`.

## Échec distant contrôlé observé après accord du premier envoi

Le 6 novembre 2026, Elias autorise par « Oui » le seul envoi du commit
`78d80951c727c8a2f70af82529da4e88797d2223` sur `chantier-009-verification`.
Push effectué, puis [run 42289758000](https://github.com/Eliassylla/porfolio-elias/actions/runs/42289758000)
terminé en failure : **Typage en échec**, **Tests, Lint et Compilation réussis**.
Le journal du job Typage confirme TS2322 sur la sonde, sortie 2. Les installations
du workflow existant ont réussi ; aucune modification de la CI ni installation locale.
[Preuve datée](preuves/echec-distant-20261106.json) et [extrait du journal](preuves/echec-distant-typage-extrait.txt).

Main relue et inchangée : `03beb50839d1e2d9c2dcffaeab3149f240f05be6`.
Aucune PR créée, aucun message ou changement du ticket. La correction distante
reste à vérifier : le commit local `d2fbd02629eed7d524aa15ebb19a907cec052057`
retire seulement la sonde et attend un nouvel accord d'envoi sur la même branche.
L'accord consommé pour le premier envoi ne couvre pas cette correction.

## Correction distante vérifiée, contrôles restants terminés

Le 6 novembre 2026, nouvel accord d'Elias (« Oui ») pour envoyer uniquement
`d2fbd02629eed7d524aa15ebb19a907cec052057` sur la même branche.
[Run correctif 42290341257](https://github.com/Eliassylla/porfolio-elias/actions/runs/42290341257) :
completed/success, **Tests, Typage, Lint et Compilation tous réussis**.
[Preuve datée](preuves/correction-distante-20261106.json).

La sonde a disparu ; le code de ce commit est identique à celui de main, ce que confirme
`git diff 03beb50839d1e2d9c2dcffaeab3149f240f05be6 d2fbd02629eed7d524aa15ebb19a907cec052057 --exit-code`.
Main GitHub est restée sur `03beb50839d1e2d9c2dcffaeab3149f240f05be6`.
Aucune fusion, PR, modification des protections, du ticket ou de Vercel réalisée.
Les vérifications manquantes de #9 sont terminées. Leur publication documentaire
et la mise à jour ou clôture du ticket restent soumises aux accords propres.
L'import Vercel reste reporté et ne constitue pas un critère initial de réception du ticket.

L'arbre final de cette reprise ne contient que des modifications documentaires par
rapport à main : méthode, skill chantier et modèle court, consigne de triage périmée,
documentation des checks, plan et preuves. Les anciens documents historiques restent
conservés. Contrôles documentaires : liens locaux, validation des skills concernés,
`git diff --check`. Aucun écran modifié, aucune installation locale refaite.

### Relecture avant publication documentaire

Le diff complet depuis main contient uniquement des documents et preuves. Les liens
locaux sont valides. Le contrôle des espaces sur les fichiers Markdown et JSON passe.
Le même contrôle sur les journaux bruts signale cinq lignes vides finales issues
des commandes ; elles sont conservées pour préserver les journaux et leurs empreintes.
Ce constat ne concerne ni le code ni les checks GitHub.
