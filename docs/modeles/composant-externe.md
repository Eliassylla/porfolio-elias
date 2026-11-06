# Fiche de réception : [nom]

Date et responsable du relevé : à compléter. État : reçu / en comparaison / intégré / limites ouvertes.

## Provenance

Projet/fournisseur, responsable connu, chemin, version, commit source, commit d’import si connu,
commit destinataire comparé. Inconnues explicites. Processus de création et validation en quelques lignes.

## Contrat et fichiers

Fichiers et assets utilisés ; dépendances et versions testées ; polices, licences et droits.
Instructions d’import, paramètres, commandes disponibles, états initial/final, arrêt et retrait.
Dimensions, responsive, thèmes, réduction des animations, accessibilité et limites.
Référence visuelle validée et son identité. Adaptations locales permises et corrections à la source.

## Intégration réelle

Fichiers destinataires, transformations réalisées, différences avec la livraison, raisons et accord
associé. Distinguer ce qui est observé dans le code de ce qui a été testé dans le navigateur.

## Vérifications et mise à jour

Renvoyer au rapport du commit testé et à la matrice de réception. Résultats, écarts et cas non exécutés.
Responsable des corrections, contact connu ou inconnu, version précédente et retour arrière possible.
Une mise à jour de cette fiche ne modifie pas le contrat du fournisseur sans son accord.

## Suivi entre projets et réception de la correction

Site demandeur et dépôt ; section/composant ; version affectée ; ticket destinataire existant ;
ticket fournisseur si une correction intrinsèque est nécessaire ; liens réciproques.
Rechercher les suivis existants avant création, conserver le même ticket destinataire pour
les livraisons correctives du même problème.

Résultat attendu/observé, reproduction, environnement et preuves ; version corrigée/commit
livrés ; version réellement importée et commit du site ; scénario initial rejoué et résultat.
Lien vers la confirmation de réception dans le ticket fournisseur, date et validation requise.
État du fournisseur : correction / livré, à confirmer / réception confirmée.
État du site : attente / intégration / vérification / résolu. Ce sont des indications de suivi,
pas des champs GitHub présumés configurés.
Clôture conforme aux critères et permissions ; ne pas fermer le ticket fournisseur sur la
seule livraison. Si plusieurs sites partagent la correction, suivre leur réception séparément.
Règle complète : [suivi des corrections](../methode/reception-composants.md#5-suivre-une-correction-entre-deux-projets-sans-doublons).
