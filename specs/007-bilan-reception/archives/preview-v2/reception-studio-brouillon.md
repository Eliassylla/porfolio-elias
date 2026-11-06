## Réception hébergée v2 : contrôles ciblés, validation globale encore ouverte

Brouillon de réception complémentaire non publié pour Studio #1, lié à Portfolio #7, 6 novembre 2026.
Destinataire : https://github.com/Eliassylla/porfolio-elias/issues/7
Fournisseur : https://github.com/Eliassylla/video-animation/issues/1

Version testée : portfolio-section01-web-v2 / 2.0.0-prototype, livraison source
2f347a9059b4658f4b68fde0cbb353ad4113f582. Preview existante :
https://porfolio-elias-qsoiwgij5-eliassyllas-projects.vercel.app/
Commit Portfolio dc37918d6e72e2aba918841f7c1af97e1357d5f8, déploiement Vercel
dpl_5DKsKoPJPWu3Yx59Z4DJ6htVmooL, état READY. GitHub ne relève aucun fichier différent
avec le commit main 4f23eeec9cd5e7f0794bdb48fbee7140a68e68dc au contrôle.
La version theme.2 et la branche de l’exercice ne sont pas destinées à être fusionnées
pour conclure cette réception.

Chrome 156/macOS, formats émulés. Dimensions CSS effectivement relevées : téléphone
433×938, tablette 853×1138, ordinateur 1600×1000, différentes des tailles demandées à
l’émulateur. Douze variantes thème/préférence : clair et sombre, mouvement normal et
réduit, changements en session, descente/remontée. Contenu lisible et révélé conservé,
une seule variante de carte affichée, palette conforme, aucun débordement horizontal
relevé. Aucun appareil réel ni parité artistique image par image revendiqués.

Navigation : ouverture/fermeture de « Réserver un audit » sans saisie ou soumission ;
page 404 de contrôle puis lien Retour à l’accueil ; navigation SPA arrière/avant en
ordinateur réduit et téléphone normal. Zéro section sur 404, une seule au retour ;
entrée normale au nouveau montage, contenu visible après sa fin. Ce test ne prouve pas
le nettoyage complet des écouteurs/timelines ou l’absence d’activité résiduelle.
Aucune erreur/alerte dans la collecte console finale.

Chargement : les fichiers JS/CSS principaux observés répondent 200. Le relevé brut
navigation conservé porte sur la page 404 suivie d’un retour SPA, pas sur une baseline
complète de la landing ; tailles de ressources partielles/masquées et cache non isolé.
Six échantillons RAF d’environ 2 s : moyenne autour de 16,6–16,7 ms ; une frame à
33,4 ms en tablette réduite. Ce n’est ni une mesure GPU ni une garantie sur appareil
réel ; pas de budget respecté ou d’amélioration avant/après affirmés. Pas de métriques
terrain LCP/INP/CLS p75.

Télémétrie vérifiée à la demande d’Elias : aucune intégration Speed Insights trouvée dans
le code et aucun script correspondant observé ; l’état du bouton dashboard n’est pas
établi. L’API indique Observability Plus non activé pour l’équipe. Observability standard
non établi ; les requêtes métriques du plugin ont été rejetées sans donnée exploitable.
Aucun SDK, dépendance ou réglage ajouté.

Preuves locales prêtes à publier : dossier specs/007-reception-preview-v2/, rapport
verification.md, identité, résultats bruts, inventaire et 23 captures. Avant envoi du
commentaire, remplacer ces chemins par les liens immuables du commit documentaire publié.
Le lien d’accès temporaire n’est pas inclus dans les preuves.

Conclusion : contrôles ciblés hébergés positifs. Réception globale à compléter :
nettoyage mesuré, comparaison avant/après fiable, tailles/seuils et clavier non couverts,
appareils réels et validation finale selon le périmètre retenu. #1 et #7 restent ouverts.
Aucun nouveau déploiement, correction, fusion ou modification vidéo/After Effects.
Le circuit de bug reste terminé et n’est pas répété ici. Publication soumise à accord.
