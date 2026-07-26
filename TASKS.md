# Tasks — Portfolio

File d'attente du **développement de ce repo**. Le backlog business vit dans l'OS personnel : une tâche d'ici n'y apparaît au plus que comme jalon, jamais recopiée.

## Format

Une tâche = un titre + un bloc YAML à 11 champs. `statut` est un champ, pas une section : une tâche ne se déplace pas, elle change d'état — c'est ce qui permet à l'autre opérateur de la retrouver sans deviner où elle a migré.

Statuts : `backlog` · `in_progress` · `review` · `blocked` · `done`

## Règles de collaboration

- **`fichiers:` est une réservation exclusive.** Un opérateur qui veut toucher un fichier listé dans une tâche `in_progress` s'arrête et le signale.
- **La spec est la seule autorité.** Qui pense qu'une spec est fausse ouvre une tâche de révision — il ne code pas contre elle.
- **Découper avant de démarrer** si `acceptation:` dépasse 5 lignes ou `fichiers:` dépasse 5 entrées.
- **`tests:` doit être une commande exécutable.** Sans elle, la tâche ne peut pas passer `done`.
- **Un `handoff:` sans commit vérifié est refusé.**

---

## T-001 · Harness de test et contrat d'attribution

```yaml
objectif: Fixer et vérifier la règle d'attribution avant tout accès externe, pour
          que Codex et Claude Code projettent la provenance de façon identique.
spec: specs/attribution/utm-contract.md
acceptation:
  - Une arrivée sans UTM donne direct/none, jamais null ni chaîne vide
  - Le premier toucher de la session gagne, y compris après rechargement
  - Aucune donnée personnelle ni caractère hors liste blanche n'est émis
  - Une entrée hostile ne produit ni crash ni dépassement de longueur
  - sessionStorage indisponible dégrade sans casser la page
operateur: claude-code
statut: done
depend_de: []
risques:
  - Les accents sont retirés par la liste blanche (réseaux → rseaux) ; comportement
    volontaire et testé, mais à connaître au moment de nommer les campagnes
fichiers:
  - specs/attribution/utm-contract.md
  - specs/attribution/scenarios.md
  - specs/fixtures/landing.*.json
  - src/lib/attribution/capture.ts
  - src/lib/attribution/session.ts
tests: npm test
handoff: >
  Livré et vérifié : 21 tests verts, typecheck 0 erreur, build de prod inchangé.
  Le module n'est branché nulle part — c'est voulu, la règle est validée avant
  d'être câblée. Le contrat est fermé : les fixtures sont la définition du
  comportement, ne pas les modifier pour faire passer un test.
next: >
  Rien. Passer à T-002.
```

---

## T-002 · Nettoyage de l'état du repo

```yaml
objectif: Supprimer ce qui est faux ou mort, pour que les deux opérateurs lisent
          un repo qui décrit sa propre réalité.
spec: null   # audit du 2026-07-25, section 3 du plan
acceptation:
  - stats et testimonials inventés retirés de business.ts
  - .planning/ supprimé, remplacé par specs/ + TASKS.md
  - Skills en double supprimés, gsap-doc conservé pour ses 3 références uniques
  - npm run build et npm test passent toujours
operateur: null
statut: backlog
depend_de: [T-001]
risques:
  - .agents/skills/content-strategy est déjà supprimé du disque mais encore
    tracké ; la suppression doit être commitée, pas refaite
fichiers:
  - src/data/business.ts
  - .planning/
  - .agents/skills/
  - .mcp.json
tests: npm test && npm run build
handoff: null
next: >
  Retirer businessInfo.stats et businessInfo.testimonials de src/data/business.ts,
  vérifier par grep qu'aucun composant ne les référence, puis commiter seul.
```

---

## T-003 · Alignement de CLAUDE.md sur la réalité

```yaml
objectif: Faire de CLAUDE.md une description exacte du projet, pour qu'un agent
          qui le lit ne parte pas sur une structure qui n'existe plus.
spec: null   # audit du 2026-07-25, section 3 du plan
acceptation:
  - Plus aucune référence à photographer.ts, projects.ts, src/types/, pages/About
  - Framer Motion corrigé en motion (le package installé est motion ^12.40)
  - Roadmap périmée retirée, pointeurs vers TASKS.md et specs/ ajoutés
  - Frontière documentée : Cal.com = réservations, Portfolio = provenance et
    parcours, OS = redistribution
  - Règle « Backend = Edge Functions uniquement » nuancée pour la mesure de parcours
operateur: null
statut: backlog
depend_de: [T-002]
risques:
  - AGENTS.md est un symlink vers CLAUDE.md — ne pas le dé-symlinker
fichiers:
  - CLAUDE.md
  - README.md
tests: test -L AGENTS.md
handoff: null
next: >
  Retirer la table de roadmap et la section structure obsolète, puis réécrire la
  frontière des responsabilités en trois lignes.
```

---

## T-004 · Câblage de l'attribution dans l'embed Cal

```yaml
objectif: Faire voyager la provenance jusque dans la réservation — sans ce
          câblage, T-001 reste du code mort.
spec: specs/attribution/utm-contract.md
acceptation:
  - La capture a lieu une fois au montage de l'app, pas à l'ouverture du dialog
  - Le config du <Cal> contient les 6 champs d'attribution
  - Aucune régression du dialog desktop ni du sheet mobile
operateur: null
statut: backlog
depend_de: [T-001]
risques:
  - Le config n'est lu qu'au montage de l'embed, et l'embed ne monte qu'à
    l'ouverture — la capture doit donc précéder largement le clic
  - Les questions cachées n'existent pas encore côté Cal.com ; les clés seront
    ignorées sans erreur, le déploiement est donc sûr
fichiers:
  - src/App.tsx
  - src/components/booking/CalBookingDialog.tsx
tests: npm test && npm run build
handoff: null
next: >
  Appeler captureAttributionFromWindow() au montage de App, stocker le résultat,
  puis étendre le config du <Cal> avec toCalConfig().
```

---

## T-005 · Configuration de l'event type Cal.com

```yaml
objectif: Créer côté Cal.com les questions qui recueillent la qualification et
          la provenance, sans alourdir la réservation.
spec: specs/calcom/event-type-setup.md   # à écrire dans cette tâche
acceptation:
  - 4 questions visibles : entreprise, outils quotidiens, problème, objectif
  - 6 champs UTM cachés, nommés exactement comme le contrat
  - Le slug reste 30min (le renommer casserait l'embed)
  - Une réservation de test porte les 4 réponses et les 6 champs, vérifié en
    lecture seule via Composio
operateur: null
statut: blocked
depend_de: [T-004]
risques:
  - Les 3 connexions Composio cal sont EXPIRED : composio link cal est requis
  - Chaque question ajoutée est de la friction sur la seule action qui compte
fichiers:
  - specs/calcom/event-type-setup.md
tests: >
  Manuel — CAL_RETRIEVE_BOOKING_DETAILS_BY_UID sur la réservation de test,
  consigner l'uid et la date dans la spec.
handoff: null
next: >
  Bloqué sur Elias : relinker Composio (composio link cal) et arrêter le libellé
  exact des 4 questions.
```
