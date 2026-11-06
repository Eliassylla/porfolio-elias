# Recevoir un composant externe

Cette procédure vaut pour une section, un composant d’interface, un visuel ou un module livré
par un autre projet ou fournisseur. Adapter le détail à son risque ; Video Animation n’est
qu’un [premier exemple](../composants/notes-chat.md). Aucun framework, outil de création ou
format d’export n’est imposé à toutes les sources.

```mermaid
flowchart TD
  A[Source : création et validation] --> B[Livraison identifiable et contrat]
  B --> C[Destinataire : compatibilité et intégration]
  C --> D[Tests dans la page réelle]
  D --> E{Résultat conforme ?}
  E -->|Oui| F[Validation puis livraison autorisée]
  E -->|Non| G{Origine du défaut ?}
  G -->|Composant ou export| H[Reproduction adressée à la source]
  H --> B
  G -->|Intégration locale| C
  G -->|Transversal| I[Coordination des deux projets]
  I --> D
```

## 1. Identifier la provenance

Noter fournisseur/projet, responsable ou contact connu, chemin, version et commit immuable
quand disponible. Distinguer le commit de comparaison du commit historique d’import : si
ce dernier n’a pas été enregistré, l’écrire. Lire les consignes du destinataire et comprendre
comment la source a construit et validé ce composant, sans reproduire tout son processus.
Séparer résultats observés, déclarations du fournisseur, hypothèses et informations inconnues.

Une fiche courte suffit pour un visuel simple. Une intégration interactive demande le contrat
plus complet ci-dessous. Utiliser [le modèle](../modeles/composant-externe.md).

## 2. Vérifier la livraison

- Inventaire des fichiers et assets réellement utilisés, empreintes si utiles, polices et droits
  d’utilisation ou licences. Un droit inconnu reste inconnu ; il n’est pas acquis par la copie.
- Versions exactes testées des dépendances, environnement et compatibilité avec le destinataire.
  Ne pas ajouter une seconde copie d’une bibliothèque sans nécessité validée.
- Instructions d’import et de démarrage, paramètres, état initial/final et arrêt/retrait complet.
  Noter les commandes réellement présentes ; une fonction interne ne devient pas une API publique.
- Dimensions, place disponible, adaptation responsive, variantes, orientations, thèmes,
  clavier et réduction des animations ; fallback lisible si la lecture ne s’exécute pas.
- Aperçu validé et son identité, limites connues, adaptations locales permises, changements
  exigeant un retour à la source, contact pour la correction et possibilité de revenir en arrière.

Si une information manque, évaluer son effet avant intégration. Une inconnue touchant le rendu
validé, les droits, la sécurité ou la compatibilité ne se comble pas par supposition : consigner
le manque et obtenir la clarification ou la livraison corrigée avant l’adaptation concernée.
Un ancien composant peut être documenté avec ces limites sans être déclaré prêt pour une nouvelle réception.

## 3. Intégrer sans dérive cachée

La source porte la logique et le rendu intrinsèques ; le destinataire porte placement,
navigation, contenu métier et interactions d’intégration dans les limites du contrat.
Ne pas déplacer une décision produit dans le composant reçu.

Conserver une version importée identifiable et noter les adaptations et leur raison. Examiner
les styles globaux, identifiants, dépendances, chargement et interférences avec la page. Tester
plusieurs instances si le contrat le prévoit ; ne pas annoncer cette capacité sans la vérifier.
Les commandes de lecture d’un composant ne décident pas de la relecture au scroll du site.
Chaque dépôt garde ses branches et ses PR ; aucun push, transfert ou déploiement automatique
entre projets n’est autorisé par cette procédure.

## Vérifier dans le site réel

Une validation isolée à la source ne valide pas la page destinataire. Utiliser les outils
réellement disponibles, noter les cas non exécutés et comparer au rendu de référence identifié.
La matrice s’applique aux changements d’interface ; un chantier documentaire n’en devient pas
une validation visuelle. Le détail des preuves est fourni par [le juge visuel](../../.agents/skills/juge-visuel/SKILL.md).

| Axe | Cas à couvrir |
|---|---|
| Téléphone | Petit écran et format courant, par exemple 360 × 800 et 390 × 844 |
| Tablette | Par exemple 768 × 1024, portrait et paysage pertinents |
| Ordinateur | Par exemple 1440 × 900 et fenêtre plus étroite |
| Tailles intermédiaires | Juste avant/après chaque seuil réellement utilisé par la page, plus une largeur entre formats |
| Redimensionnement | Passage entre formats sans rechargement ; changements d’orientation pertinents |
| Thèmes | Clair et sombre, y compris changement pendant la session |
| Mouvement | Réduction activée/désactivée, entrée/sortie et retour au scroll selon le contrat actuel |
| Parcours | Chargement, navigation, clics, clavier, focus, ouverture/fermeture et erreurs |
| Stabilité | Débordements, sauts de mise en page, ressources manquantes, console et fluidité |
| Cycle de vie | Sortie de route, retrait/remontage et absence de travail résiduel ou de doublons |

Couvrir les trois formats avec les deux thèmes et les deux préférences de mouvement. Croiser
les cas intermédiaires avec les variantes qui changent le rendu ; expliquer tout cas non exécuté.
L’émulation d’un iPhone reste une émulation, pas une mesure Safari/iOS réelle.
Pour le clavier et le retrait, utiliser un parcours qui exerce réellement ces comportements.
Aucune réservation réelle ni notification ne fait partie d’un test sans accord spécifique.

Une preuve conserve : date, commit source et destinataire, état propre/modifié de l’arbre,
URL/environnement, outil/navigateur, dimensions, thème, préférence de mouvement, scénario,
résultat observé et limites. Après modification, refaire les preuves concernées. Des captures
anciennes ou un build vert ne prouvent pas le rendu du nouveau commit.
Mesurer les performances à partir d’une référence dans le site réel ; ne pas déclarer des
budgets respectés ou un nettoyage correct sur la seule lecture du code.

## 4. Corriger et mettre à jour

- Défaut intrinsèque, asset ou export : reproduction et preuves pour la source ; nouvelle livraison.
- Défaut local de placement, navigation ou intégration : correction dans le destinataire.
- Défaut transversal : accord sur la répartition, tests des deux côtés et validation finale dans le site.

Une mise à jour indique la version précédente, les changements incompatibles et les adaptations
à reprendre. Tester avant adoption et conserver le retour possible à la version précédente.
Les droits d’écriture restent ceux de chaque projet : préparer un relevé ne permet pas de le publier.

## 5. Suivre une correction entre deux projets sans doublons

Un ticket suit un résultat à livrer. Le destinataire possède le ticket du problème dans sa
page ; le fournisseur possède, si nécessaire, le ticket de correction du composant.
Ces deux travaux sont liés, mais ne sont pas deux copies du même suivi. Une livraison
corrective ne crée pas un nouveau ticket destinataire si le problème y est déjà suivi.

```mermaid
flowchart TD
  A[Ticket du site : problème constaté] --> B{Origine du défaut ?}
  B -->|Intégration| C[Le site corrige sur sa branche]
  B -->|Composant ou export| D[Ticket fournisseur lié : reproduction et correction]
  D --> E[Fournisseur : nouvelle version et preuves]
  E --> F[Le ticket du site existant reprend]
  F --> G[Le site intègre sur sa branche et teste]
  G --> H{Scénario initial résolu ?}
  H -->|Non| D
  H -->|Oui| I[Confirmation du site dans le ticket fournisseur]
  I --> J[Clôture autorisée des deux travaux]
```

### Identifier et réutiliser les tickets

Avant une création, rechercher le même composant, symptôme et version dans les tickets
ouverts des deux dépôts. Réutiliser le ticket actif pertinent et ajouter des liens réciproques.
Un problème distinct ou une nouvelle demande justifie un nouveau ticket ; une tentative de
correction du même problème reste dans le suivi existant. Si un défaut clos réapparaît,
consigner ce qui diffère et décider explicitement de rouvrir ou de créer un incident lié.

Le signalement comporte : site demandeur et dépôt, section/composant, version et commit
utilisés, résultat attendu/observé, étapes de reproduction, appareil/navigateur et preuves,
URL du ticket destinataire et URL du ticket fournisseur dès qu'il existe.
Une même cause affectant plusieurs sites peut partager un ticket fournisseur, avec une
réception distincte suivie par chaque site ; ne pas multiplier les corrections identiques.

### Livraison, confirmation et clôture

| Responsable | Travail et état de suivi | Preuve attendue |
|---|---|---|
| Site destinataire | Problème suivi, en attente du fournisseur si nécessaire | Reproduction et lien vers le ticket fournisseur |
| Fournisseur | Correction, puis « livré, à confirmer » | Version/commit immuable, changements, essais et lien de récupération dans les tickets liés |
| Site destinataire | L'attente est levée ; intégration sur sa propre branche | Version reçue/importée, commit destinataire, scénario initial rejoué, résultats et limites |
| Site destinataire | Confirmation de réception | Résultat explicite et lien vers les preuves dans le ticket fournisseur ; lien retour dans son ticket |
| Chaque projet | Clôture après réception et validation requises | Critères satisfaits, confirmation liée, autorisation de clôture correspondante |

Ces expressions décrivent le suivi ; elles ne prétendent pas que des champs ou automatismes
GitHub Projects existent. L'attente du site est levée à la livraison : l'attente de confirmation
du fournisseur ne doit pas créer une dépendance circulaire qui empêcherait l'intégration.

La publication de la correction ne prouve pas que le problème est résolu dans le site.
Le ticket fournisseur reste ouvert jusqu'à la confirmation attendue ; éviter une fermeture
automatique à la fusion de sa seule correction. Le ticket du site reste ouvert jusqu'au
résultat convenu et à la validation requise. Distinguer « testé en Preview » et « vérifié en
production » selon les critères du ticket ; ne pas promettre la production sur la base d'un essai local.
Si le site n'adopte plus la version, documenter l'abandon ou le report au lieu d'attendre
indéfiniment ou de déclarer le défaut résolu sans preuve.

### Mise en pratique et permissions

À chaque reprise, lire les deux tickets et le dernier accusé de réception ; personne ne
surveille automatiquement les commentaires en arrière-plan. La confirmation peut utiliser :
« Site : … ; composant : … ; version reçue : … ; commit du site : … ; environnement : … ;
scénario rejoué : … ; résultat : résolu / non résolu ; preuves : … ; limites : … ».

Le fournisseur crée ou complète le ticket de livraison du destinataire ; c'est le destinataire
qui prépare sa branche, son intégration et ses tests. Lors d'une première livraison sans
problème préalable, un ticket d'intégration du site suffit ; n'inventer aucun incident.
Une nouvelle version n'est jamais adoptée automatiquement par tous les sites.

Cette règle n'accorde aucun droit d'écriture externe supplémentaire : ouverture, commentaire,
changement de statut, clôture, push et publication suivent les accords du projet concerné.
Aucune synchronisation, notification ou fermeture automatique n'est installée par cette documentation.
