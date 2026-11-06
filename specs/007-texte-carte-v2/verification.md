# Vérification locale du ticket #7

6 novembre 2026, macOS, Node/npm installés du dépôt, Vite 5.4.19, GSAP 3.13.0.
Branche `chantier-007-texte-carte-v2`, base `241f45f`, arbre modifié non commité.
Les fichiers personnels non suivis présents au départ sont conservés. Les mesures
ci-dessous concernent cet arbre local, pas un commit de livraison ni la production.

## Provenance et import

- Ticket #7 et commentaires lus sur GitHub, aucune écriture distante.
- Source locale à `2f347a9059b4658f4b68fde0cbb353ad4113f582`. Son dossier export v2
  est identique au commit immuable ; les modifications de l’autre projet sont hors export.
- 14 empreintes du manifeste vérifiées à la source ; dix fichiers référencés copiés et
  revérifiés. Manifeste copié sans modification. Aperçu et vendor omis volontairement.
- Ancien composant sauvegardé à l’identique et anciens assets conservés.
- Détail reproductible : [integrite.json](integrite.json).

## Vérifications avant / après

| Contrôle | Base avant import | Arbre après import |
|---|---|---|
| `npm test` | 37 tests réussis | 37 tests réussis |
| `npm run typecheck` | Réussi | Réussi |
| `npm run build` | Réussi | Réussi |
| `npm run lint` | 0 erreur, 4 avertissements | 0 erreur, mêmes 4 avertissements |

Les avertissements lint portent sur badge, button, form et sonner (Fast Refresh).
Les avertissements de build sur l’évaluation dynamique de lottie-web et la taille des
chunks sont déjà présents avant import. Le journal négatif du test Cal.com incomplet
est attendu par le scénario existant et les 37 tests passent.

Incident de contrôle local : un premier lint lancé en parallèle du build a rencontré
un fichier temporaire Vite supprimé avant lecture (`ENOENT`). Lecture du skill `triage`
et de sa référence vérifications ; lint rejoué après le build, sans modification de
configuration : réussite avec quatre avertissements. Aucun bug produit constaté.
Les vérifications finales exécutent build et lint successivement pour éviter cette concurrence.

## Poids mesuré

Même commande Vite, même installation et même méthode gzip Python avant/après.
Inventaire de tous les fichiers de `dist/`, pas une mesure des requêtes réellement chargées.

| Total du build | Avant | Après | Écart |
|---|---:|---:|---:|
| Octets bruts | 2 491 820 | 2 499 255 | +7 435 |
| Octets gzip | 877 526 | 879 169 | +1 643 |

[Mesure avant](poids-avant.json), [mesure après](poids-apres.json).
Aucun budget vérifié, aucun gain annoncé. Débit, cache, temps de chargement, LCP/INP/CLS,
fluidité et activité résiduelle ne sont pas mesurés.

## Essais dans la vraie page, confiés à Elias

Accès navigateur désactivé dans les réglages Work, constaté par l’outil de navigation.
Elias répond : « Je vais tester moi visuellement ». Aucun test en navigateur ou capture
du Portfolio réalisé par l’agent. Les contrôles statiques ne prouvent pas ce qui suit.

Aperçu de développement démarré : `http://127.0.0.1:5173/`.
La machine de consultation doit pouvoir accéder au serveur ; cette adresse de boucle
locale n’est pas un lien de test sur un téléphone distant. Aucun aperçu externe publié.

Parcours pour la première réception :

1. Recharger en haut, descendre normalement jusqu’au texte et à la carte. Comparer
   l’entrée à la v2 du Studio ; vérifier les passages avec les sections voisines.
2. Remonter puis redescendre, y compris avant la fin de l’entrée et très rapidement.
   Le contenu déjà révélé doit rester visible, sans inversion ni seconde entrée.
3. Tester clair/sombre, puis changer de thème pendant et après l’entrée. Le contenu
   doit adopter le thème sans rejouer son animation.
4. Tester réduction des animations activée puis désactivée en cours de session :
   contenu lisible, déjà révélé conservé. Recharger avec cette préférence active.
5. Tester les formats 360×800, 390×844, 768×1024, 1024×768 et 1440×900 ; puis
   320 px, 639/640, 767/768, 1023/1024 px et une largeur intermédiaire. Croiser
   téléphone/tablette/ordinateur avec les deux thèmes et les deux préférences.
6. Redimensionner sans recharger. Carte entière sous 640 px, recadrage ordinateur
   au-dessus, pas de débordement ni de contenu coupé hors du recadrage prévu.
7. Exercer liens, navigation, CTA et clavier sans créer de rendez-vous ; revenir sur
   l’accueil pour exercer le démontage/remontage. Vérifier erreurs console, absence
   de doublons et activité résiduelle avec les moyens de mesure adaptés.

Consigner pour chaque résultat : date, version source, état exact du code testé,
navigateur/appareil, dimensions, thème, mouvement, scénario et observation. Un écran
redimensionné reste une émulation. Safari/iOS et Android réels restent distincts.

## État de réception

Revue indépendante en lecture seule suivant `requesting-code-review` : aucun défaut
concret relevé dans l’adaptateur, le contrat TypeScript, la stabilité du HTML et la
conservation de l’ancienne version. Cette revue ne valide pas le fonctionnement navigateur.

Intégration locale préparée ; vérification visuelle et de fonctionnement encore à faire.
Le ticket ne peut pas être déclaré reçu ou terminé sur la base de ce rapport.
Accord reçu en session pour créer le commit et envoyer cette branche sur GitHub afin
de tester la Preview Vercel. Cet accord couvre cet envoi ; PR, confirmation externe,
fusion et publication en production attendent leurs accords propres.
L’exercice du circuit de bug sur branche d’essai n’a pas été commencé.


## Préparation de la Preview autorisée

Elias demande le commit pour donner son retour sur la Preview, après accord sur le
circuit commit local → branche GitHub → Preview. Le commit contenant ce rapport
embarque le même code que les contrôles précédents ; seules les traces documentaires
d’autorisation ont été précisées ensuite. Son identifiant sera vérifié après création,
puis associé au déploiement distant avant de transmettre le lien de test.

Le signalement visuel d’Elias sur le Hero (texte coupé dans l’aperçu téléphone intégré)
est conservé comme observation, sans cause confirmée ni correction dans ce ticket.
Il sera à comparer sur appareil réel ; cette zone n’a pas été modifiée ici.
