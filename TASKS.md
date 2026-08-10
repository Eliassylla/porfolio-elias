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
operateur: codex
statut: done
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
handoff: >
  Livré et vérifié : preuves inventées retirées, ancienne planification et
  copies de skills supprimées, gsap-doc conservé. 21 tests verts, typecheck
  sans erreur et build de production réussi.
next: >
  Rien. Passer à T-003.
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
operateur: codex
statut: done
depend_de: [T-002]
risques:
  - AGENTS.md est un symlink vers CLAUDE.md — ne pas le dé-symlinker
fichiers:
  - CLAUDE.md
  - README.md
tests: test -L AGENTS.md
handoff: >
  Livré et vérifié : documentation alignée sur la structure réelle, motion,
  TASKS.md et specs/. Frontière Cal.com / Portfolio / OS explicitée et mesure
  de parcours distinguée du backend métier. Symlink AGENTS.md intact, 21 tests
  verts et build de production réussi.
next: >
  Rien. Passer à T-004.
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
operateur: codex
statut: done
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
handoff: >
  Livré et vérifié : attribution capturée à l'initialisation de l'app puis
  transmise à l'embed Cal avec les 6 champs du contrat. 21 tests verts,
  typecheck et build réussis. QA navigateur réussie sur desktop 1440x900 et
  mobile 390x844 ; le premier toucher reste stable après une seconde URL UTM.
  Revue terminée sans problème critique, important ni mineur.
next: >
  Passer à T-005 pour créer les questions visibles et cachées côté Cal.com.
```

---

## T-005 · Configuration de l'event type Cal.com

```yaml
objectif: Finaliser côté Cal.com l'événement Échange découverte pour recueillir
          le contexte utile sans dupliquer les notifications natives.
spec: specs/calcom/event-type-setup.md   # à écrire dans cette tâche
acceptation:
  - 4 questions visibles : entreprise, outils quotidiens, problème, objectif
  - 6 champs UTM cachés, nommés exactement comme le contrat
  - L'événement actif reste `elias-sylla/decouverte`, 30 minutes, avec Google Meet
  - La confirmation native n'est pas dupliquée et un rappel utile est attaché
  - Réservation, replanification et annulation sont testées ; les 10 réponses
    sont vérifiées en lecture seule via Composio
operateur: null
statut: blocked
depend_de: [T-004]
risques:
  - Les 3 connexions Composio cal sont EXPIRED : composio link cal est requis
  - Chaque question ajoutée est de la friction sur la seule action qui compte
  - Audit UI du 2026-08-10 : aucune question personnalisée, aucun champ UTM et
    aucun workflow n'étaient configurés
fichiers:
  - specs/calcom/event-type-setup.md
tests: >
  Manuel — CAL_RETRIEVE_BOOKING_DETAILS_BY_UID sur la réservation de test,
  consigner l'uid et la date dans la spec.
handoff: null
next: >
  Après T-004, ajouter les 10 champs dans Cal.com, choisir un rappel qui ne
  répète pas la confirmation native, puis relinker Composio pour le test final.
```

---

## T-006 · Alignement de l'entrée V1 et de l'état Cal.com

```yaml
objectif: Donner au repo et à l'OS une seule version de la stratégie inbound V1
          et de l'état réellement observé le 2026-08-10.
spec: null
acceptation:
  - Cal.com `elias-sylla/decouverte` est l'unique entrée structurée de la V1
  - Le lien email est un secours acceptable, pas un formulaire ni un CRM
  - Formulaire séparé, Supabase métier et Resend sont reportés jusqu'à besoin réel
  - Le traitement post-réservation via Composio et Trigger.dev appartient à l'OS
operateur: codex
statut: done
depend_de: [T-003]
risques:
  - T-006 adopte le remplacement local `30min` → `decouverte` ; le déploiement reste distinct
  - Le bundle Vercel audité pointe encore vers `30min` et restera cassé jusqu'au déploiement
fichiers:
  - CLAUDE.md
  - README.md
  - TASKS.md
  - src/data/business.ts
  - src/App.tsx
tests: test -L AGENTS.md && npm test && npm run typecheck && npm run build
handoff: >
  Livré et vérifié : stratégie inbound V1, état Cal.com et frontières Portfolio/OS
  alignés. Le code local cible `decouverte`; le déploiement reste explicitement dans
  T-007. 21 tests verts, typecheck et build réussis, diff-check propre et revue sans
  problème critique ou important.
next: >
  Terminer T-004, puis T-005, puis T-007.
```

---

## T-007 · Déploiement et vérification du parcours Cal.com

```yaml
objectif: Réparer le CTA public et prouver en production le parcours de réservation complet.
spec: specs/calcom/production-verification.md   # à écrire dans cette tâche
acceptation:
  - Le bundle Vercel cible `elias-sylla/decouverte` et ne contient plus l'ancien slug
  - Les CTA desktop et mobile ouvrent l'événement Échange découverte
  - Une réservation de production porte les 4 réponses visibles et les 6 champs UTM
  - Replanification et annulation conservent un état cohérent dans Cal.com
  - URL, date et identifiant de réservation de test sont consignés dans la spec
operateur: null
statut: backlog
depend_de: [T-004, T-005]
risques:
  - Le déploiement ne suffit pas si les champs Cal.com ou le flow d'attribution sont incomplets
  - Utiliser une réservation de test identifiable et l'annuler après vérification
fichiers:
  - src/data/business.ts
  - specs/calcom/production-verification.md
tests: npm test && npm run typecheck && npm run build
handoff: null
next: >
  Déployer le commit validé, tester le parcours public, puis seulement déclarer le jalon OS terminé.
```
