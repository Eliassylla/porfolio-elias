# Tasks — Portfolio

## T-013 · Résoudre les conflits de la PR #4

```yaml
objectif: Rendre la branche de Preview compatible avec main en conservant le site validé.
spec: null
acceptation:
  - Intégrer main dans la branche de travail sans fusionner la PR
  - Garder le formulaire custom et ses conteneurs défilants
  - Garder npm et package-lock.json, sans rétablir bun.lock
operateur: codex
statut: review
depend_de: [T-011, T-012]
risques:
  - Les ajouts de main concernent l'ancien embed Cal.com, déjà remplacé dans la Preview
fichiers:
  - src/components/booking/CalBookingDialog.tsx
  - src/index.css
  - bun.lock
  - TASKS.md
  - .lovable/plan/correction-d-affichage-du-dialog-cal-com-desktop-tablette-2026-08-10.md
tests: npm test && npm run typecheck && npm run build && npm run lint
handoff: >
  Les trois conflits sont reproduits et résolus : le formulaire custom, les styles
  et les sources de la Preview d36922f restent identiques. Le plan de l'ancien embed
  ajouté par main est conservé et explicitement archivé. Aucun fichier non suivi ajouté.
  Vérification : 37 tests verts, typecheck et build réussis, lint sans erreur
  (4 avertissements préexistants). Main n'est pas modifiée ; envoi de la résolution en attente.
next: >
  Résoudre et vérifier localement, puis faire approuver l'envoi du commit de résolution.
```

---

## T-012 · Portrait stable pendant le scroll

```yaml
objectif: Empêcher la photo de profil de clignoter pendant le défilement.
spec: null
acceptation:
  - Le bouton de profil garde son identité pendant les mises à jour de scroll
  - L'ouverture de la présentation reste disponible sur téléphone et ordinateur
  - Elias vérifie le défilement sur iPhone après un éventuel envoi en Preview
operateur: codex
statut: review
depend_de: []
risques:
  - Vidéo fournie par Elias : portrait visible vers 1 s, cercle vide vers 2–4 s, initiales ES ensuite
  - La disparition visuelle après correction reste à vérifier sur l'appareil réel
fichiers:
  - src/components/layout/Header.tsx
  - TASKS.md
tests: npm run typecheck && npm run build && npm run lint
handoff: >
  Le bouton de profil est défini hors du Header pour conserver l'image montée pendant
  les mises à jour de scroll. Aucun mouvement ni style modifié. Typecheck et build
  réussis ; lint sans erreur, 4 avertissements préexistants. La vidéo fournie établit
  le défaut avant correction ; le résultat sur iPhone reste à vérifier par Elias.
next: >
  Vérifier et enregistrer la correction locale ; demander l'accord avant un nouvel envoi en Preview.
```

---

## T-011 · Preview Vercel de la version locale actuelle (issue #3)

```yaml
objectif: Afficher les nouvelles sections et corrections locales dans la Preview Vercel existante.
spec: null
acceptation:
  - Conserver le texte sans flou, la carte partiellement masquée et ses variantes téléphone
  - Envoyer uniquement les changements du site sur essai/animations-hyperframes
  - Ne pas fusionner main ; Elias vérifie le rendu et le formulaire dans la Preview
operateur: codex
statut: review
depend_de: []
risques:
  - Les fichiers personnels non suivis et les fichiers générés restent hors commit
  - Le test de réservation consigné au commit 33ef3bf concerne la Preview du 31 octobre
  - Elias confirme le 5 novembre la réception de l'email Cal.com avec les informations saisies
  - Ce test historique ne vaut pas validation du nouveau déploiement
  - Vercel est l'hébergement conservé selon Elias ; les mentions de migration Cloudflare sont périmées
fichiers:
  - src/sections/
  - src/assets/taches/
  - src/index.css
  - TASKS.md
tests: npm test && npm run typecheck && npm run build && npm run lint
handoff: >
  Vérifications locales du 5 novembre 2026 : 37 tests verts, typecheck et build réussis,
  lint sans erreur (4 avertissements dans les composants UI existants).
  Les modifications du site sont conservées sans retoucher les mouvements.
  Le contrôle visuel et le formulaire sur la nouvelle Preview seront vérifiés par Elias.
next: >
  Après l'envoi, identifier le commit et la Preview ; Elias effectue la vérification visuelle.
  L'alignement complet de la documentation et la PR vers main restent dans l'issue #3.
```

---

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

## T-007 · Déploiement Cloudflare et vérification du parcours Cal.com

```yaml
objectif: Publier le Portfolio et son API sur Cloudflare, puis prouver en production
          le parcours de réservation complet.
spec: specs/calcom/production-verification.md   # à écrire dans cette tâche
acceptation:
  - Le Worker sert la SPA et `/api/booking` sur la même origine
  - Les CTA desktop et mobile ouvrent le parcours custom sans iframe Cal.com
  - Les créneaux affichés proviennent de Cal.com et l’événement reste fixé côté Worker
  - Une réservation de production porte les 4 réponses visibles et les 6 champs UTM
  - Replanification et annulation conservent un état cohérent dans Cal.com
  - URL, date et identifiant de réservation de test sont consignés dans la spec
operateur: null
statut: backlog
depend_de: [T-004, T-005, T-008]
risques:
  - Le déploiement ne suffit pas si les champs Cal.com ou le flow d'attribution sont incomplets
  - Utiliser une réservation de test identifiable et l'annuler après vérification
  - Garder Vercel en pause comme retour arrière jusqu’à validation du domaine Cloudflare
fichiers:
  - wrangler.jsonc
  - worker/index.ts
  - src/components/booking/CalBookingDialog.tsx
  - specs/calcom/production-verification.md
tests: npm test && npm run typecheck && npm run build
handoff: null
next: >
  Après T-008, connecter GitHub à Workers Builds, tester l’URL workers.dev, puis le
  domaine personnalisé avant de retirer définitivement le déploiement Vercel.
```

---

## T-008 · Parcours de réservation custom via Cloudflare

```yaml
objectif: Montrer une réservation entièrement personnalisée dans le Portfolio,
          sans afficher l'interface Cal.com au visiteur.
spec: null   # prototype isolé sur codex/custom-cal-intake
acceptation:
  - Les 4 questions de qualification reprennent le langage visuel de Cal.com
  - Le choix de la date et du créneau est une interface shadcn, sans embed Cal.com
  - La confirmation envoie le payload Cal.com avec réponses et 6 champs UTM
  - Les retours entre étapes conservent les réponses et le créneau sélectionné
  - Le Worker fixe `elias-sylla/decouverte` et n’accepte aucun événement fourni par le navigateur
  - La lecture et la création utilisent uniquement les endpoints publics Cal.com prévus
  - `CAL_API_KEY` reste exclusivement dans les secrets du Worker
  - La SPA et `/api/booking` sont prêtes à être servies sur la même origine Cloudflare
operateur: codex
statut: done
depend_de: [T-004]
risques:
  - Une disponibilité peut disparaître entre l’affichage et la confirmation ; le Worker doit la revérifier
  - Une réservation réelle ne doit être créée qu'avec une identité de test, puis annulée
fichiers:
  - TASKS.md
  - src/components/booking/bookingIntake.ts
  - src/components/booking/BookingIntakeForm.tsx
  - src/components/booking/BookingIntakeForm.test.ts
  - src/components/booking/CalBookingDialog.tsx
  - src/components/booking/bookingApi.ts
  - worker/index.ts
  - worker/contract.ts
  - worker/index.test.ts
  - worker/contract.test.ts
  - wrangler.jsonc
tests: npm test && npm run typecheck && npm run build && npx wrangler deploy --dry-run
handoff: >
  Branche codex/custom-cal-intake. Le dialog custom sans iframe, les 4 questions,
  le calendrier, les créneaux réels, les coordonnées et la création directe Cal.com
  sont implémentés localement. Le Worker sert aussi les assets Vite, fixe l’événement
  5777679 et revérifie le créneau avant création. Supabase, Composio et Vercel sont
  retirés du runtime. Les artefacts locaux `.claude/skills/composio-cli/` et `docs/`
  ont été audités, préservés et restent hors commit. 37 tests verts, typecheck,
  lint sans erreur, build et dry-run Wrangler réussis. Lecture réelle validée sans
  créer de rendez-vous ; revue finale sans constat critique ou important restant.
next: >
  Créer le commit atomique sans pousser, puis demander à Elias de créer la clé API
  Cal.com, le token Workers Builds et lancer le premier déploiement workers.dev.
```

---

## T-009 · Réponses du formulaire conservées dans Cal.com

```yaml
objectif: Que chaque réservation garde les réponses du formulaire et la provenance,
          pour pouvoir préparer le rendez-vous à partir d'elles.
spec: null
acceptation:
  - Test du 2026-10-31 (aperçu Vercel) : réservation créée, mais aucune réponse visible dans Cal.com
  - Les questions du rendez-vous « Échange de découverte » portent les identifiants envoyés
    (company_context, operational_problem, current_tools, desired_outcome), ou les réponses partent en metadata
  - Les 6 champs UTM sont retrouvables sur la réservation
  - Une adresse e-mail refusée par Cal.com (« email_domain_cannot_receive_mail ») affiche un message
    sur l'adresse, pas « service momentanément indisponible »
operateur: null
statut: backlog
depend_de: [T-008]
risques:
  - Les questions changeront selon la qualification voulue (T-010) ; garder les identifiants stables
  - api/booking.ts (fonction Vercel) est un test pour les aperçus ; Cloudflare reste l'hébergement prévu
fichiers:
  - worker/contract.ts
  - worker/index.ts
  - src/components/booking/bookingApi.ts
  - api/booking.ts
tests: npm test && npm run typecheck && npm run build
handoff: null
next: >
  Vérifier dans Cal.com où apparaissent les réponses d'une réservation de test, puis
  annuler cette réservation.
```

---

## T-010 · Préparation du rendez-vous par un agent

```yaml
objectif: À chaque réservation, transmettre les réponses à un agent IA qui prépare
          le premier rendez-vous et qualifie le prospect.
spec: null   # à écrire : questions, template du résumé, critères de qualification
acceptation:
  - Une réservation déclenche un message dans un canal Slack
  - Un résumé est créé dans Google Docs depuis un template (besoins, recherches utiles,
    questions à poser, points d'entrée de la réunion)
  - Le prospect est trié : qualité, budget, urgence
  - Les questions du formulaire sont revues pour nourrir cette préparation
operateur: null
statut: backlog
depend_de: [T-009]
risques:
  - Branchement prévu via Composio ; aucun envoi ni écriture tiers sans accord explicite
  - Le Portfolio ne devient pas une base de leads (README) : les données restent chez Cal.com et dans les outils choisis
fichiers: []
tests: null
handoff: null
next: >
  Plus tard : le travail actuel porte sur les sections animées de la page d'accueil.
```
