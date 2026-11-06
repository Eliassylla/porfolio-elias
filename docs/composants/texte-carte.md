# Repérage existant : texte et carte « Cette semaine »

Relevé statique du 5 novembre 2026, complément au premier cas Notes → Chat.
Source comparée : Video Animation `70f3092849ff7221770f00fc9edba57ebdc168c2`.
Destinataire : Portfolio `fc306fe6d633ece2d756e6d32d07418919295de2`,
`src/sections/experiments/TextGlowSection.tsx`.

## Ce que la comparaison permet de dire

- Les fichiers `Sections/01-textes/versions/v2/section.js` et `versions/v3/section.js`
  diffèrent uniquement dans les commentaires. Leur corps hors commentaires est identique.
  Le mot v2 en tête du composant local ne suffit donc pas à identifier sa livraison.
- Les quatre SVG locaux (clair/sombre, ordinateur/téléphone) sont identiques octet pour octet
  à ceux présents dans `Sections/01-textes/Assets/`. Le relevé complet est dans
  [comparaison-sources.json](../../specs/005-reception-composants/comparaison-sources.json).
- L’affichage local coupe la carte ordinateur avec un fondu et présente la carte téléphone
  entière sous 640 px. Les imports, cadres, préfixes et variantes sont construits dans le composant.
- Le code source combine la phrase et la carte dans une timeline et conserve une fin à 51 images.
  Le Portfolio sépare leurs déclencheurs et utilise une timeline par format : la dernière vague
  téléphone finit à l’image 45 ; l’ordinateur à 51. Les halos ne sont actifs que dans la zone observée.
- Le Portfolio retire la copie lumineuse, laisse la phrase glisser et passer au bleu ; il
  rétablit la couleur du thème en fin de phrase. Le Studio documente également la variante sans lueur.
- Phrase : départ au haut de l’élément à 70 % de la fenêtre. Carte : départ quand le repère
  à 47 % de sa hauteur (ordinateur) ou 64 % (téléphone) atteint le bas de la fenêtre.
  Retour à l’envers selon les déclencheurs existants, sans changement dans ce chantier.

L’historique local montre `124ad73` (v2), `90b449d` (déclenchements séparés) et `2762ba2`
(carte masquée, variantes téléphone, sans lueur). Cela établit des adaptations successives,
pas un import littéral v3 ni le commit source historique de chaque transfert.
Aucun renommage, remplacement, nettoyage ou modification du composant n’est effectué ici.

Ce relevé n’est pas un nouveau contrat de livraison complet : licences, référence visuelle
figée, API d’export et matrice navigateur complète restent à établir pour une nouvelle réception.
