# Plan local

Base : `241f45f`, branche `chantier-007-texte-carte-v2`, 6 novembre 2026.
Fichiers suivis propres au départ ; fichiers personnels non suivis conservés sans modification.
Aucune autre réservation de ces fichiers trouvée dans les dossiers de chantier locaux.

## Fichiers réservés

- `src/sections/experiments/TextGlowSection.tsx` : adaptateur React uniquement.
- `src/sections/experiments/TextGlowSectionLegacy.tsx` : copie exacte du composant précédent.
- `src/integrations/section01/v2/` : livraison épinglée et déclaration TypeScript locale.
- `docs/composants/texte-carte.md` : réception et conservation du relevé historique.
- `specs/007-texte-carte-v2/` : intention, contrat, plan et preuves.

## Étapes

1. Lire le ticket et la livraison, vérifier le montage actuel et l’installation GSAP.
2. Mesurer le build avant import et exécuter les vérifications disponibles sur la base.
3. Vérifier les empreintes et le contenu au commit source, copier sans modifier le Studio.
4. Conserver l’ancien composant ; relier le montage, le thème et le retrait dans React.
5. Rejouer tests, types, build et lint ; vérifier les empreintes après import et comparer le poids.
6. Relire l’intégration, documenter les limites ; préparer l’aperçu pour les essais d’Elias.
7. Attendre la réception visuelle avant adoption. Tout envoi externe attend un accord propre.

## Risques et preuves

L’export manipule son DOM : HTML stable entre les rendus React et démontage explicite.
Le changement de thème ne doit pas rejouer l’entrée. Les contextes d’animation doivent
rester locaux. Aucune modification du Hero, des courbes communes ou des autres animations.
Les fichiers source restent identiques octet pour octet. Une déclaration locale rend le
contrat du JS visible à TypeScript ; elle ne prétend pas typer l’intérieur du fournisseur.

Les preuves indiquent base et arbre modifié, date, commandes, mesures et cas non exécutés.
Sans navigateur disponible, pas de verdict sur le rendu, la fluidité, le nettoyage effectif
ou les performances en page. Les captures du Studio restent des preuves de la source.
