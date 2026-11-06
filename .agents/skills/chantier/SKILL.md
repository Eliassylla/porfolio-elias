---
name: chantier
description: Conduire un chantier Portfolio avec intention, spec, plan, preuves et PR, ou un spec.md court pour une modification isolée. Reprendre ou terminer un travail accepté. Ne pas utiliser pour une simple question ou lecture.
---

# Chantier Portfolio

Structure adaptée du skill chantier de Skyline Drive. Avant d’agir, lire
[la méthode du dépôt](../../../docs/methode/developpement.md) et
[les permissions séparées](../../../docs/methode/autonomie.md).
Aucun identifiant de projet, règle métier, stack ou automatisme Skyline n’est transposé.

- Identifier le chantier déjà ouvert et le périmètre accepté ; ne pas multiplier les tickets.
- Pour le circuit complet, garder `intent.md`, `spec.md`, `plan.md` et les preuves dans
  `specs/NNN-sujet/`. Modèles dans `assets/`. Pour le circuit court, un `spec.md` court suffit : pourquoi, résultat attendu et vérification.
  Utiliser `assets/spec-court.md`. Les anciennes `fiche.md` restent des archives ; ne pas les renommer.
- Rédiger et exécuter les étapes locales autorisées sans redemander la même décision.
  Proposer les choix importants puis attendre ; signaler un écart au périmètre avant d’agir dessus.
- Lire uniquement les contrats utiles. Le plan nomme les fichiers réservés, les risques et
  la preuve attendue ; préserver le travail des autres sessions.
- Si un composant vient de l’extérieur, appliquer
  [la réception générale](../../../docs/methode/reception-composants.md), pas le workflow du fournisseur.
- Après une modification d’écran, lire `../juge-visuel/SKILL.md`. Une capture doit être liée
  au commit testé ; un résultat non disponible est une limite, pas un succès.
- Préparer une seule PR du dépôt avec résultat utilisateur, preuves et limites. Push,
  création de PR, message, fusion et déploiement attendent chacun l’accord correspondant.
- Sur un bug signalé ou un échec inattendu, ouvrir [triage](../triage/SKILL.md) avant correction.
  Il établit les faits et propose ; reprendre ensuite la correction locale déjà autorisée dans
  le chantier, puis rejouer le chemin initial et consigner les preuves. Ne pas le déclencher
  sur une modification sans anomalie ni sur un avertissement déjà compris.
- Pour une fin de session, utiliser `../passation/SKILL.md` si une reprise doit être préparée.

Ne pas réécrire un dossier de chantier fusionné ni affaiblir un test pour obtenir du vert.
Ne pas annoncer un projet GitHub, une CI ou une surveillance sans preuve de sa configuration.
