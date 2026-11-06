# Réception hébergée v2 : contrôles ciblés effectués

## Version et environnement

6 novembre 2026. Suivi destinataire : Portfolio #7 ; suivi fournisseur : Video Animation #1.
Le bilan actualisé du corps de #1 et les derniers commentaires des deux tickets ont été lus.
Le circuit de bug reste terminé dans son périmètre ; il n’est pas répété ici.

Version destinée au site : `portfolio-section01-web-v2 / 2.0.0-prototype`, source
`2f347a9059b4658f4b68fde0cbb353ad4113f582`.
Preview : https://porfolio-elias-qsoiwgij5-eliassyllas-projects.vercel.app/
Commit Portfolio : `dc37918d6e72e2aba918841f7c1af97e1357d5f8`.
Déploiement Vercel `dpl_5DKsKoPJPWu3Yx59Z4DJ6htVmooL`, état READY confirmé par le plugin.
Déploiement GitHub 7599216530, environnement Preview, état success.
main distant au contrôle : `4f23eeec9cd5e7f0794bdb48fbee7140a68e68dc` ; comparaison
GitHub depuis dc37918 sans fichier différent. Voir identite.json.
La Preview theme.2 de l’exercice n’est pas la version à fusionner pour cette réception.

Navigateur : Chrome 156 sur macOS, navigateur intégré, formats émulés. Aucun téléphone
ou tablette réelle. Le navigateur était d’abord bloqué sur Vercel Authentication.
Après installation/connexion du plugin et accord explicite d’Elias, un lien temporaire
d’accès a été créé pour cette seule Preview ; aucune protection modifiée et aucun
nouveau déploiement. La valeur du lien d’accès n’est pas conservée dans ces preuves.
Les dimensions CSS relevées diffèrent des dimensions demandées à l’émulateur ; seules
les dimensions réellement lues ci-dessous sont annoncées comme testées.

## Matrice exécutée

| Format émulé | Dimensions CSS réellement observées | Thèmes | Mouvement |
|---|---|---|---|
| Téléphone | 433 × 938 | clair, sombre, retour clair | normal, réduit |
| Tablette | 853 × 1138 | clair, sombre, retour clair | normal, réduit |
| Ordinateur | 1600 × 1000 | clair, sombre, retour clair | normal, réduit |

Six sessions de préférence/format, douze variantes thème/préférence ; rapport brut
`preuves/resultats-parcours.json`. Le contenu est lisible, une seule variante de carte
est affichée, cohérente avec thème et format ; aucun débordement horizontal relevé.
Sous réduction active au chargement, le contenu est en pose finale lisible. Le passage
normal → réduit en cours de session a également conservé le contenu révélé sur téléphone.
Le passage inverse est exercé avant rechargement dans les autres essais ; son comportement
complet en cours d’entrée n’a pas été capturé comme preuve distincte.

Descente, remontée et retour : les relevés finaux gardent les mots et la carte visibles.
Aucun reverse ou effacement constaté pendant les parcours effectués. Le relevé final ne
constitue pas une comparaison de chaque image d’entrée avec la source artistique.
Les changements de format sans rechargement ont affiché les variantes attendues, puis les
parcours ont été rejoués après rechargement pour chaque préférence. Les seuils exacts
639/640, 767/768 et 1023/1024, le petit téléphone 360 px et les orientations complètes
ne sont pas couverts par ces dimensions et restent à vérifier.

## Navigation et cycle de vie

- Le bouton « Demander un audit » ouvre le dialogue « Réserver un audit » ; fermeture
  par « Close », retour au site et présence d’une seule section. Aucune donnée saisie,
  aucun créneau choisi, aucune réservation, notification ou soumission.
- La route de vérification inexistante `/verification-reception-404` affiche bien la page
  introuvable et son lien « Retour à l’accueil ».
- Ce lien rétablit l’accueil. Le retour puis l’avance de l’historique exercent ensuite
  une transition SPA : zéro section sur la page 404, une seule après remontage à l’accueil.
  Rejoué en format ordinateur réduit puis téléphone normal.
- Une nouvelle première entrée au remontage normal est observée ; après sa fin les sept
  mots et les groupes suivis de la carte sont opaques et lisibles. Un instant d’entrée a
  aussi été relevé dans le rapport, sans le confondre avec une pose finale.
- Ce contrôle vérifie le retrait DOM et l’absence de doublon observé ; il ne mesure pas
  les écouteurs, les timelines et l’activité résiduelle de chaque instance. Le nettoyage
  mesuré complet reste ouvert. Le parcours clavier complet n’a pas été exécuté.

## Chargement et fluidité : mesures disponibles et limites

Le relevé `preuves/chargement.json` porte sur la navigation vers la page 404 avant retour
SPA à l’accueil : TTFB environ 65,7 ms, DOMContentLoaded environ 434,7 ms et événement
load vers 506 ms. Il ne mesure pas le chargement complet initial de la landing.
Un relevé antérieur en début de contrôle sur la landing indiquait environ 61,7 ms,
466,4 ms et 932,3 ms respectivement, mais n’a pas été conservé dans un fichier brut ;
il reste une observation de l’outil, pas la référence principale de comparaison.
Les ressources JS/CSS principales observées répondent HTTP 200. Le script de toolbar
Vercel est externe : les valeurs de taille/statut sont partiellement masquées ou nulles.
Plusieurs ressources du site ont decodedBodySize=0 et transferSize=300 : ne pas en déduire
un poids réseau réel complet. Cache, isolation du navigateur, absence de throttling et
absence de baseline avant intégration empêchent une comparaison avant/après fiable.

Six échantillons requestAnimationFrame d’environ deux secondes ont été relevés autour du
placement de section, sur le même ordinateur et sans bridage CPU : moyenne 16,60 à
16,68 ms par frame environ. Cinq échantillons n’ont aucune frame >33,34 ms ; l’échantillon
tablette réduit en a une à 33,4 ms. Il s’agit du rythme des callbacks, pas d’un profil GPU,
d’une preuve d’absence de frames perdues ou d’une mesure continue sur téléphone réel.
Le coût du scroll et des actions d’automatisation n’est pas entièrement isolé ; aucun
budget de fluidité respecté n’est proclamé. Aucun INP/LCP/CLS terrain p75 disponible.
Aucune erreur ou alerte capturée par `tab.dev.logs` dans le relevé final ; console.json
contient le résultat vide. Cela ne prouve pas l’absence d’erreurs dans tous les parcours.

## Vérification de la télémétrie demandée par Elias

Voir telemetrie-vercel.json. Speed Insights n’est pas intégré dans le code inspecté et
aucun script correspondant n’est observé sur la page. L’état éventuel de son bouton dans
le dashboard n’est pas établi. L’API Vercel répond « Observability Plus is not enabled »
pour l’équipe. Cela ne permet pas de conclure sur l’Observability standard. Les requêtes
métriques essayées via le plugin ont échoué en 400, sans données exploitables ; ne pas
interpréter cet échec comme une absence de trafic ou de mesures. Aucune option modifiée.

## Preuves, bilan et état

Les captures clés ordinateur sombre et téléphone clair ont été inspectées par l’agent :
carte ordinateur recadrée avec fondu, carte téléphone entière, texte lisible dans le cadre
visible ; les captures peuvent couper le haut du titre selon la position du scroll.
Les captures fixes prouvent ces états, pas le mouvement image par image.
Inventaire avec empreintes : preuves/inventaire.json.

Les contrôles ciblés sur l’hébergement sont positifs pour les cas ci-dessus. Aucun défaut
reproductible d’export ou d’intégration établi dans cette reprise ; aucune correction,
nouvelle branche de livraison, PR, fusion ou nouveau déploiement préparé.
La branche d’exercice n’est pas destinée à main. Les documents sont préparés localement
sans publication ; les comptes rendus vers #7 et Studio #1 attendent l’accord d’Elias.
Les déclarations d’accès bloqué des premiers commits de ce dossier sont historiques et
sont remplacées par ces observations, pas effacées de l’historique.

La réception globale n’est pas déclarée complète : restent le nettoyage mesuré, la
comparaison avant/après exploitable, les formats/seuils et parcours non couverts, les
appareils réels et la validation finale d’Elias selon le périmètre retenu. #1 et #7 restent
ouverts ; aucune autorisation de clôture reçue. Les workflows vidéo et After Effects ne
sont pas touchés. L’exercice réussi ne valide pas ces critères restants.
