# Reprendre les anciennes tâches

L’[archive TASKS](../archives/TASKS-2026-11-05.md) est conservée telle qu’au commit fc306fe.
Ses statuts et affirmations étaient liés à leur date. Ce relevé ne ferme ni ne crée d’issue.

| Ancien sujet | Traitement à la reprise |
|---|---|
| T-001 à T-004, T-006 | Historique livré ; garder les tests et contrats encore actifs. Les mentions d’embed ne décrivent plus le parcours actuel. |
| T-005, configuration Cal.com | Vérifier ce qui existe réellement : réponses, provenance, rappels, replanification/annulation. Ne pas reprendre comme un fait actuel l’expiration de connexion relevée en août. |
| T-007, migration Cloudflare | Direction périmée : Elias conserve Vercel. Ne pas lancer le déploiement demandé par l’archive. |
| T-008, réservation custom | Implémentation présente et reprise dans la PR #4. Le code sous worker reste appelé depuis Vercel. |
| T-009, réponses et provenance | Elias confirme un email avec ses réponses ; le détail des champs conservés et les erreurs restent à vérifier avant de conclure à la clôture. |
| T-010, préparation par un agent | Piste relevant de l’OS personnel ; aucune intégration supplémentaire autorisée dans le Portfolio. |
| T-011 à T-013, sections, portrait, conflits | Commits 2762ba2, d36922f et 991d5d1 intégrés par la PR #4 au commit fc306fe. Les résultats visuels du dernier commit ne se déduisent pas de la fusion. |

Les sujets encore pertinents deviennent des chantiers lorsqu’ils sont repris avec accord.
Ne pas recréer systématiquement un ticket par ancienne ligne. Le risque de débordement des
boutons de confirmation sur petit écran signalé dans la PR #4 reste une hypothèse à reproduire,
pas un bug visuellement confirmé ni une correction comprise dans #5.

Le projet GitHub Portfolio, ses champs, les contrôles requis avant fusion, le nettoyage des
branches et l’installation des contrôles automatiques sont à inspecter/cadrer séparément.
L’autorisation du présent chantier n’autorise aucune de ces écritures externes.
