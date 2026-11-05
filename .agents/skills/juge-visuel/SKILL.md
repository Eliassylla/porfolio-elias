---
name: juge-visuel
description: Vérifier le rendu d’un écran Portfolio contre l’intention ou la référence validée, avec observations sur plusieurs formats, thèmes et préférences de mouvement. Ne pas utiliser pour annoncer un contrôle visuel sur la seule lecture du code ou pour une modification documentaire sans écran changé.
---

# Juge visuel Portfolio

Adapté du skill juge-visuel de Skyline Drive. Lire la spec ou la fiche du chantier, puis
[la matrice de réception](../../../docs/methode/reception-composants.md#vérifier-dans-le-site-réel).
Le but est de comparer l’affichage au résultat attendu, pas au goût de l’agent.

1. Identifier le commit testé, l’état de l’arbre et la référence visuelle. Utiliser un build
   du site pour une preuve de production ; distinguer serveur local et API Vercel distante.
2. Choisir un moyen de capture réellement disponible et autorisé dans la session. Aucun
   outil ajouté ni navigateur personnel utilisé par supposition. Le script du Studio dépend
   de son environnement : le lire avant usage et ne pas le présenter comme CI du Portfolio.
3. Couvrir téléphone, tablette, ordinateur, tailles intermédiaires et seuils réels,
   redimensionnement, orientations pertinentes, thèmes et réduction des animations.
4. Regarder les images et exercer les parcours : lisibilité, éléments masqués/débordants,
   stabilité, focus/clavier, erreurs console, navigation et interactions. Pour une animation,
   comparer aussi les états et le retrait/remontage. Une image fixe ne prouve pas la fluidité.
5. Lier chaque résultat à sa configuration et à son scénario dans `verification.md`.
   Nommer les cas non exécutés et distinguer émulation et appareil réel.

Les captures jetables restent hors commit par défaut ; une preuve durable utile peut être
conservée délibérément, avec sa référence exacte et sans données privées. Aucun rendez-vous
réel, notification ou envoi externe sans accord. Si le moyen de capture est indisponible,
consigner la limite et transmettre les cas à vérifier, sans inventer un verdict.

Un défaut de mouvement/asset/export revient à la source ; un défaut d’intégration au Portfolio.
Ne pas « corriger » la relecture au scroll à l’occasion de cette vérification.
