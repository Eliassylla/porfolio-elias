# Portfolio · consignes des agents

Portfolio B2B francophone d’Elias : expliquer son activité, montrer des preuves réelles,
permettre de réserver un échange. Cibles : solopreneurs, indépendants, petites équipes et PME.

## Architecture et contenu

- React 18, TypeScript, Vite, Tailwind CSS 4, shadcn/ui, motion et GSAP : stack conservée.
  Versions installées : `package-lock.json`. Aucun ajout d’outil sans accord.
- Hébergement conservé : Vercel. `api/booking.ts` appelle la logique de `worker/index.ts`
  et `worker/contract.ts`. Ce dossier reste utilisé ; son nom ne signifie pas qu’un Worker
  Cloudflare est déployé. `wrangler.jsonc` est une configuration historique conservée.
- Cal.com détient réservations, statuts, qualification et rappels. Événement fixé côté serveur :
  `elias-sylla/decouverte`. Le Portfolio ne devient ni CRM ni base de leads.
- `CAL_API_KEY` reste côté serveur, dans la configuration de l’environnement Vercel concerné.
  Jamais de secret dans le frontend, les commits, les journaux ou une preuve.
- `src/data/business.ts` est la source du contenu métier public. Ne pas inventer de projets,
  témoignages, résultats ou état d’avancement. Le positionnement ne change pas au détour d’un import.
- Les futures pages Projets, newsletter, base métier, Resend et automatisations de l’OS ne sont
  pas autorisées par la procédure de réception. Aucun état externe de l’OS n’est présumé.

## Travail et autonomie

Lire [la méthode](docs/methode/developpement.md), puis le dossier du chantier dans `specs/`.
Le skill [chantier](.agents/skills/chantier/SKILL.md) applique le circuit complet ou la fiche courte.
GitHub suit les chantiers ; `TASKS.md` est un renvoi vers l’archive et n’est plus une file à maintenir.
Pour choisir les consignes utiles, lire [le routage des skills](docs/methode/choisir-un-skill.md).
En cas de bug signalé ou d’échec inattendu, appliquer [triage](.agents/skills/triage/SKILL.md)
avant correction ; le diagnostic ne donne aucun droit d’écriture externe.

Lire séparément [les permissions](docs/methode/autonomie.md). Dans un périmètre accepté,
préparer les documents, modifier localement, vérifier et corriger sans redemander chaque étape.
Une décision produit, un changement d’architecture ou de périmètre revient à Elias.
Chaque envoi externe, PR, message, fusion ou déploiement exige son accord explicite propre.
Un accord antérieur consommé ne vaut pas autorisation du suivant. Ne jamais activer l’auto-merge.

## Composants externes

Avant réception ou mise à jour, lire [la procédure générale](docs/methode/reception-composants.md).
Elle vaut pour toute provenance. Le cas [Notes → Chat](docs/composants/notes-chat.md) documente
une adaptation existante, pas une API d’export déjà disponible.

Le fournisseur possède les défauts intrinsèques du composant et du mouvement ; le Portfolio
possède son placement, sa navigation, son contenu métier et ses interactions d’intégration,
dans les limites convenues. Une adaptation qui changerait le rendu validé demande clarification.
Pour les sections issues de Video Animation, corriger le mouvement à la source avant report.
Ne pas changer ici la relecture au scroll ou les sections futures sans chantier accepté.

## Vérifications

- Commandes disponibles : `npm test`, `npm run typecheck`, `npm run build`, `npm run lint`.
  Le typage actuel couvre `src/` et `worker/`, pas explicitement le point d’entrée `api/`.
- [Matrice de réception](docs/methode/reception-composants.md#vérifier-dans-le-site-réel) : téléphone,
  tablette, ordinateur, tailles intermédiaires, orientations pertinentes, thèmes, réduction
  des animations et parcours réels. [Juge visuel](.agents/skills/juge-visuel/SKILL.md) pour le rendu.
- Une preuve nomme le commit et l’état de l’arbre testé. Un contrôle non exécuté reste à vérifier.
  Une compilation ou un déploiement réussi ne prouve ni le rendu ni la création d’une réservation.
- Avant de corriger un bug, le reproduire dans le parcours utilisateur et consigner ce constat.
  Ne pas affaiblir tests, fixtures, lint ou typage pour obtenir un résultat vert.
- Les quatre checks GitHub sont définis dans `.github/workflows/quality.yml` ; lire
  [leur fonctionnement](docs/methode/checks-github.md). Les runs et protections réellement
  vérifiés sont consignés dans `specs/009-checks-github/verification.md` ; leur configuration
  dans GitHub et Vercel ne se déduit pas de la présence du workflow.

## Invariants à préserver

- Contenu, labels et erreurs en français ; Cal.com custom sans iframe.
- Landing : ne pas monter `FeaturedProjectsSection` ou `NewsletterSection` avant leur contenu réel.
  Si la navigation Projets est réactivée, son libellé est « Mes projets ».
- Thème clair par défaut, détection système désactivée ; conserver la variante dark de Tailwind.
- Avant toute modification GSAP, lire `.claude/skills/gsap-doc/SKILL.md` puis ses références utiles.
  Conserver le scroll déterministe du Hero, ses recalculs et son nettoyage SplitText.
- Les courbes communes avec le Studio doivent rester équivalentes pour les paramètres partagés.
  Les fichiers JS et TypeScript ne sont pas identiques ; l’utilitaire de préfixage SVG est local.
- Remplacer avant de supprimer ; préserver les travaux existants et les fichiers personnels non suivis.
  Ne pas toucher sans raison à `vite.config.ts`, `components.json` ou `tsconfig.json`.
- Pour reprendre entre sessions : [passation](.agents/skills/passation/SKILL.md).
