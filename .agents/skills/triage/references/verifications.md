<!-- Copyright 2026 Anthropic PBC -->
<!-- SPDX-License-Identifier: Apache-2.0 -->
<!-- Adaptation Portfolio du 6 novembre 2026. Les incidents fictifs de l’amont ont été retirés. -->

# Diagnostiquer une vérification en échec

Dérivé de `test-failures.md` d’Oncall Kit ; [provenance](origine-oncall.md).
Ne lire cette référence que pour un contrôle en échec, absent ou incohérent.

1. Relever la commande exacte, le commit, l’environnement, l’heure et la fin réelle du contrôle.
   Lire le premier message utile dans le journal complet, pas seulement « échec ».
2. Déterminer la portée : un test, tous les tests, le typage, la compilation ou l’outil lui-même.
   Comparer avec la dernière exécution connue, à code et environnement identifiés.
3. Pour un contrôle absent, lire les scripts et la configuration réellement présents. La CI
   du Portfolio est active depuis #9 ; vérifier ses derniers runs au lieu de déduire
   leur résultat du statut Vercel. Lire le nombre de tests exécutés et les filtres :
   une baisse inexpliquée mérite enquête, sans imposer un ancien nombre à un nouveau code.
4. Différencier défaut d’application, environnement et défaut du contrôle : dépendance absente,
   version Node, réseau, fichier temporaire, processus concurrent, permissions. Ne pas installer,
   mettre à niveau ou modifier la configuration pour effacer l’erreur sans le périmètre requis.
5. Rejouer seulement le contrôle pertinent avec les moyens locaux autorisés. Si la compilation
   produit puis supprime des fichiers temporaires que le lint lit en parallèle, les lancer
   successivement pour confirmer cette hypothèse plutôt que masquer l’erreur.
6. Vérifier que la correction ne diminue pas la couverture utile : pas de test sauté, fixture
   adaptée à l’implémentation, lint assoupli ou typage désactivé pour obtenir du vert.

Les tests de réservation existants simulent Cal.com. Leur succès ne démontre pas la présence
réelle des réponses dans Cal.com ou un email envoyé. Un stderr peut être attendu par un scénario
négatif : regarder les assertions et le résultat final avant de conclure à une panne.

Comparer les mêmes scénarios avant/après ; un contrôle inaccessible reste non vérifié.
Aucune métrique, équipe d’astreinte ou cause de l’exemple amont n’est présumée ici.
