# Section 01 · export web v2

Export v2 vérifié localement et validé visuellement par Elias le 6 novembre 2026. Livraison pour intégration pilote ; la vraie page Portfolio reste à vérifier.
Identifiant : `portfolio-section01-web-v2`, version `2.0.0-prototype`.
Le mouvement de référence est la **section 01 v3 retenue le 1er novembre**, avec les déclencheurs du report Portfolio actuel.

## Voir l’animation

Copier **tout ce dossier**, puis depuis la copie :

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Ouvrir http://127.0.0.1:8765/ et faire défiler. Pour essayer les commandes indépendamment du scroll :
http://127.0.0.1:8765/?mode=manual. Arrêter le serveur avec Ctrl+C.
Un serveur HTTP est requis pour les modules JavaScript ; ne pas ouvrir index.html par double-clic.
Aucun npm install, HyperFrames, React ou fichier extérieur au dossier n’est nécessaire pour cet aperçu.

## Ce que contient la livraison

- `section.html` : section complète, quatre cartes SVG intégrées, contenu lisible sans JavaScript.
- `section.css` : styles limités à `.va01`, sans Tailwind ni styles globaux de site.
- `section.js`, `courbes.js` : mouvement et montage propres à cette section.
- `vendor/` : GSAP et ScrollTrigger **3.13.0** pour l’aperçu autonome, notices d’origine conservées.
- `assets/` : quatre SVG originaux conservés pour provenance et correction. Déjà intégrés au HTML, ils ne sont pas téléchargés en plus à la lecture.
- `index.html`, `preview.js` : page d’essai et commandes, à ne pas monter comme une page du Portfolio.
- `manifest.json` : origine, révisions comparées, empreintes des fichiers, dépendances et limites.
- `NOTICES.md` : polices, bibliothèque et droits connus ou non établis.

La livraison ne modifie aucune version vidéo, aucun MP4 ni aucun projet After Effects.
Pas de package partagé ni d’API commune entre projets : les commandes ci-dessous concernent uniquement cette section.

## Intégrer dans un site

1. Garder le dossier importé identifiable. Vérifier ses empreintes avec `manifest.json`.
2. Importer `section.html` comme contenu statique fiable, `section.css` et `mountSection01` depuis `section.js`.
3. Fournir le GSAP et le ScrollTrigger du site. **Ne pas charger vendor en plus de sa propre bibliothèque.** La version vérifiée est 3.13.0 ; une autre version demande un essai.
4. Monter après insertion du HTML. Ne pas réécrire les enfants de la section tant qu’elle est montée.
5. Relier le thème du site par `setTheme('light')` ou `setTheme('dark')`.
6. Appeler `destroy()` avant de retirer la section ou de remplacer son contenu. Les groupes, délais, écouteurs et déclencheurs de cette instance sont nettoyés, sans supprimer ceux des autres sections.

Exemple minimal, sans framework :

```js
import { mountSection01 } from './section.js';
const animation = mountSection01(document.querySelector('[data-va-section01]'), { gsap, ScrollTrigger });
animation.setTheme('dark');
// Avant retrait du composant :
animation.destroy();
```

Dans React/Vite, importer le HTML avec `?raw` et le monter dans un effet avec un nettoyage retournant `destroy`.
Ne pas placer le HTML brut directement sur le même élément que le `ref` : sélectionner la section enfant `[data-va-section01]`.
Le double montage sans retrait est refusé ; le cycle montage → retrait → remontage est testé.
L’adaptation React et les tests du vrai Portfolio restent à réaliser dans son dépôt.

## Commandes présentes

| Commande | Effet |
|---|---|
| `play()` | Continue phrase et carte à leur vitesse, avec l’attente d’entrée de la carte |
| `pause()` | Arrête phrase, carte et attente ; les halos dépendent de la visibilité en mode scroll |
| `seek(secondes)` | Pose manuelle entre 0 et 1,7 s ; carte téléphone terminée à 1,5 s |
| `reset()` / `finish()` | Pose initiale / finale |
| `setTheme('light' ou 'dark')` | Thème et couleur du texte, même pendant une lecture |
| `destroy()` | Nettoie l’instance et restaure le HTML statique final, sans enlever la section |

En mode `scroll` (par défaut), chaque révélation se déclenche une seule fois, puis son déclencheur est retiré. Le suivi des halos reste actif uniquement lorsque la section est visible. Les commandes de pose servent aux essais manuels ; un appel explicite à reset peut remettre une pose initiale.
Utiliser `{ gsap, ScrollTrigger, mode: 'manual' }` pour piloter les poses sans déclencheurs.
Le mode manuel ne fait pas tourner les halos : il sert aux commandes et à la vérification de poses.
Avec réduction des animations, le contenu reste en pose finale, sans animation ni déclencheur ; les commandes de mouvement sont sans effet. Le thème et le nettoyage restent disponibles.

## Dimensions, thèmes et scroll

- Largeur minimale testée : **320 px**, conteneur de section de la largeur de la page. Une colonne étroite dans une grande fenêtre n’est pas une intégration validée.
- Sous **640 px** : carte entière à trois tâches ; à partir de 640 px : carte ordinateur à cinq tâches, recadrée avec fondu.
- Typographie et espacements aux seuils **768** et **1024 px**, comme le composant Portfolio comparé. Maximum de carte 860 px, conteneur 1152 px.
- Thèmes clair et sombre explicites ; pas de changement global du thème du site.
- La phrase part à `top 70%`. La carte part lorsque son repère entre dans l’écran : 64 % de sa hauteur sur téléphone, 47 % sur ordinateur.
- Si nécessaire, la carte attend l’image 22 de la phrase. La phrase et la carte ne se révèlent qu’une fois par montage de la section. En remontant puis en redescendant, elles restent visibles ; aucun retour à l’envers. Une entrée déjà commencée continue même en cas de remontée rapide. Pas de scrub ni de blocage de page.
- Sans JavaScript : contenu final et carte statique lisibles. Le lecteur d’écran reçoit la phrase et une description synthétique de la carte ; le SVG décoratif n’ajoute pas de commandes clavier.
- Réduction des animations, redimensionnement sans rechargement et changement de thème pris en charge.
- Plusieurs instances testées, avec préfixes SVG et nettoyage indépendant.

## Origine et validation

Voir `manifest.json` pour les commits de référence et les empreintes des sources.
L’animation a été créée au studio : assets → storyboard → v3 → validation → report dans Portfolio.
Le commentaire v2 présent dans le composant Portfolio n’est pas une preuve de sa version : le rendu comparé porte déjà la carte recadrée de v3.
Elias a validé les aperçus de la v1 et indiqué que son animation fonctionne proprement sur son téléphone (modèle et navigateur non relevés). Elias a ensuite validé l’aperçu ordinateur de la v2 sans reverse (« C’est parfait »). Cette validation ne vaut pas validation de son intégration dans Portfolio.
La procédure de réception Portfolio est portée par sa PR #6, ouverte et non fusionnée au dernier contrôle. Sa branche a reçu la règle des tickets liés au commit 88a4e68a624799951445cced114f2ffbdf23be05. Vérifier son état lors de l’intégration.
L’historique exact du premier import dans Portfolio n’est pas connu.

## Vérifications et limites

[Résultats et captures](../verification-v2/LISEZ-MOI.md) : 61 contrôles navigateur réussis, dont 44 cas de taille/thème/préférence, sans erreur d’exécution ni requête externe de la page d’export.
Contrôles automatisés dans Chrome/macOS, formats émulés ; aperçu v2 validé par Elias sur ordinateur. Safari/iOS, Android réel, Firefox, lecteur d’écran, performance sur matériel modeste et rendu dans le vrai Portfolio restent à contrôler.
Les captures portent sur la pose finale ; elles ne prouvent pas à elles seules chaque image du mouvement.
Les seuils de scroll et les formules reprennent la référence existante, mais la parité image par image avec le Portfolio n’a pas encore été mesurée.
LCP, INP, CLS et performance globale doivent être mesurés lors de l’intégration dans le vrai site.
Consulter aussi `NOTICES.md` pour les limites de polices et de droits.

## Corrections et mise à jour

Mouvement, asset ou export : correction dans Video Animation, puis nouvelle version livrée.
Placement, navigation ou adaptation du site : correction dans le dépôt destinataire. Toute modification du mouvement exige une validation à la source.
La v1 est conservée ; la v2 est une nouvelle livraison. Une modification future produit un nouveau dossier v3 et décrit les incompatibilités.
Pour revenir en arrière dans Portfolio, garder le composant précédent jusqu’à validation de l’intégration pilote.
La livraison est préparée sur une branche et proposée par PR dans Video Animation, sans fusion ni déploiement. Aucun import dans Portfolio n’est effectué par cette livraison.

## Changement v1 → v2 autorisé par Elias

Même entrée, mêmes courbes, mêmes assets, dimensions et thèmes. Seule la politique web de relecture change : entrée unique, sans reverse automatique. La commande reverse et le bouton Retour sont retirés. Cette suppression est un changement du contrat : un consommateur v1 qui appelait reverse doit être adapté.
La mémoire de révélation dure jusqu’au retrait de l’instance. Un nouveau montage ou un rechargement de page autorise une nouvelle première entrée.
Le changement de préférence de mouvement en cours de session conserve les contenus déjà révélés.
Recherche conservée : `chaine/recherches/2026-11-05-animations-scroll-relecture.md` dans le dépôt source.
Notes → Chat et les autres sections restent inchangés : leurs transformations futures doivent faire l’objet d’un cadrage distinct. Les versions vidéo et After Effects sont préservées.

## Réception dans Portfolio

Lire la [passation](../PASSATION-PORTFOLIO.md) pour le périmètre ciblé et le suivi des corrections.
La PR du studio et son commit de livraison identifient les fichiers ; `source.commit` dans le manifeste est le commit historique des sources v3, pas celui de cette livraison.
La version reste nommée `2.0.0-prototype` pour signaler que son intégration réelle et ses performances ne sont pas encore validées.
