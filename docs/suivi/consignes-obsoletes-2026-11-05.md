# Consignes Portfolio corrigées et limites conservées

État avant chantier : commit fc306fe. Date : 5 novembre 2026.

| Support | Constat | Traitement dans ce chantier |
|---|---|---|
| `CLAUDE.md` et lien `AGENTS.md` | Vercel en pause, Cloudflare principal, secret uniquement Worker, courbes dites identiques, file TASKS active | Remplacer ces consignes par le fonctionnement Vercel, les responsabilités, le circuit et les permissions séparées ; garder le lien symbolique |
| `README.md` | Publication et état du formulaire décrits avant le retour à Vercel | Décrire l’entrée Vercel et le code partagé encore utilisé ; expliquer les limites des commandes locales |
| `TASKS.md` | Mélange ancien backlog et états devenus historiques | Archiver le contenu exact de fc306fe, laisser un renvoi, reprendre les sujets non soldés sans les fermer par supposition |
| `specs/README.md` | Lecture conditionnée au champ spec de TASKS, redistribution de l’OS formulée comme un fait | Lire le chantier courant et ses contrats ; ne pas affirmer l’état d’un système externe non vérifié |
| `specs/attribution/utm-contract.md` | Point d’émission encore décrit comme config de l’embed Cal | Corriger uniquement l’explication du transport actuel ; règles et fixtures inchangées |
| `api/booking.ts` | Commentaire présentant Vercel comme essai avant Cloudflare | Mettre à jour les commentaires, sans changer l’exécution |
| `DESIGN.md` | Référence Linear interdisant le clair et les halos, contraire au site actuel | La signaler comme inspiration historique sans autorité sur la palette/le thème validés |
| `TextGlowSection.tsx`, commentaire v2 | Nom insuffisant pour établir la provenance ; code v2/v3 source identique hors commentaires | Ne pas renommer ; documenter les fichiers et adaptations comparés dans la fiche texte/carte |
| Commandes Wrangler et `wrangler.jsonc` | Restent exécutables, mais ne publient pas sur Vercel | Avertir dans README ; aucune suppression ni modification de configuration dans ce chantier |
| Anciennes connexions Composio / état de l’OS | Affirmations datées non revérifiées | Conserver dans l’archive, ne pas les présenter comme l’état courant |

Les scripts GSD sous `.codex/hooks/` sont des vestiges à examiner séparément ; le fichier
`.codex/hooks.json` lu est vide. Aucune activation ou suppression n’est faite ici.
Le plan Lovable de l’ancien embed est déjà marqué archive ; aucune réapplication.
Les skills Supabase conservés dans le dépôt ne signifient pas qu’une base Supabase est utilisée.
Aucun ménage d’outillage personnel, de branches ou de dépendances n’est inclus.
