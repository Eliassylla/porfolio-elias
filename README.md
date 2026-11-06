# Portfolio d’Elias

Site B2B en français pour les solopreneurs, indépendants, petites équipes et PME.
Stack conservée : React, TypeScript, Vite, Tailwind CSS, shadcn/ui, motion et GSAP.

## Fonctionnement

Le site et son entrée serveur `/api/booking` sont hébergés sur Vercel. Le parcours de
réservation est personnalisé ; Cal.com conserve les rendez-vous et envoie ses notifications.
Le point d’entrée `api/booking.ts` réutilise `worker/index.ts` et `worker/contract.ts`.
Ces fichiers restent nécessaires ; la configuration Cloudflare est conservée historiquement.
Aucune base métier propre au Portfolio ni intégration Resend n’est requise aujourd’hui.

La PR #4 a été fusionnée dans `main` le 5 novembre 2026 au commit
`fc306fe6d633ece2d756e6d32d07418919295de2`. Les dernières sections et la correction du portrait
s’y trouvent. Le succès de déploiement observé n’est pas une preuve de tous les parcours.

## Développement local

Après installation des dépendances du dépôt :

```sh
npm run dev
```

Vite sert le frontend sur `http://localhost:8080/`. Ce serveur seul ne prouve pas que
l’API Vercel fonctionne. La réservation doit être vérifiée dans l’environnement serveur concerné.
Une réservation réelle et les notifications associées demandent un accord distinct.

```sh
npm test
npm run typecheck
npm run build
npm run lint
npm run preview
```

`npm run typecheck` couvre le frontend et la logique `worker/` ; il ne vérifie pas explicitement
`api/booking.ts`. Les tests actuels de l’API simulent Cal.com. Aucun contrôle ne doit être annoncé
comme une réservation distante effectivement testée.

`npm run dev:worker` et `npm run deploy` utilisent encore Wrangler. Ce sont des commandes
historiques Cloudflare : **ne pas lancer `npm run deploy` pour publier sur Vercel**.
Ce chantier ne change pas ces commandes et n’entreprend aucune migration d’hébergement.

## Secrets

`CAL_API_KEY` doit être présent côté serveur dans Vercel pour l’environnement testé
(Preview et Production sont distincts). Ne pas exposer sa valeur ni utiliser de préfixe `VITE_`.
Les fichiers `.env`, `.dev.vars` et les secrets ne se commitent pas. `.dev.vars` concerne
le chemin local Wrangler historique, pas le chargement automatique des variables par Vite.

## Où lire quoi

| Besoin | Emplacement |
|---|---|
| Consignes des agents | `AGENTS.md`, lien conservé vers `CLAUDE.md` |
| Développement et circuit court | [Méthode](docs/methode/developpement.md) |
| Opérations autorisées et accords restants | [Autonomie](docs/methode/autonomie.md) |
| Quel skill utiliser selon la situation | [Routage](docs/methode/choisir-un-skill.md) |
| Réception de tout composant externe | [Procédure](docs/methode/reception-composants.md) |
| Exemple documenté | [Notes → Chat](docs/composants/notes-chat.md) |
| Intention, spec, plan et preuves | `specs/NNN-sujet/` |
| Contenu métier public | `src/data/business.ts` |
| Anciennes tâches à relire | [Reprise de l’archive](docs/suivi/reprise-tasks.md) |

Les routes secondaires `/services`, `/portfolio`, `/portfolio/:id` et `/contact` redirigent
actuellement vers l’accueil. Les futures pages et les changements de positionnement se décident
séparément. Les sections sources du Studio ne décident pas du contenu public du Portfolio.

## Livraison et maintenance

Une branche de chantier porte les changements vérifiés. L’envoi, la PR, la fusion et le
déploiement nécessitent chacun l’autorisation correspondante. Avant une fusion, identifier
ce qu’elle déclenche dans la configuration d’hébergement ; la Preview et la Production sont distinctes.
Après publication autorisée, vérifier l’URL et le commit effectivement servis.

Les contrôles CI et les protections de branche ne sont pas créés par ces documents.
Consigner un incident avec sa reproduction, ses preuves, le responsable de la correction
et le contrôle qui confirme le rétablissement. Ne pas annoncer de surveillance permanente inexistante.
