---
titre: "RDV → Capture de lead → Nurturing email — Recherche d'architecture 2026"
date: 2026-06-04
sujet: "Choisir l'architecture prise de RDV (Cal.com) → capture (Supabase) → emails (Resend) → nurturing pour un consultant solo. Réévaluation du Vercel Workflow SDK."
auteur: agent web-research (Firecrawl)
note: "Factuel. Toutes les URLs citées proviennent de scrapes/recherches Firecrawl réels (2026-06-04). Les incertitudes sont signalées explicitement."
---

# RDV → Capture de lead → Nurturing email — Recherche 2026

## TL;DR / Recommandation (pour SON stade)

1. **Embed Cal.com en popup/inline + 1 webhook `BOOKING_CREATED`** pointant vers **une seule Edge Function Supabase** → insert dans `contact_submissions`/`subscribers` + envoi email de confirmation via Resend. Les webhooks Cal.com sont **inclus dans le plan gratuit**.
2. **Nurturing v1 = transactionnel déclenché par le webhook**, pas une usine. 1 à 3 emails max (confirmation, rappel, relance no-show) écrits à la main dans la Edge Function.
3. **NE PAS installer le Vercel Workflow SDK maintenant** : son frontend Vercel est statique, le SDK vise des workflows durables long-running orientés serveur/agents, c'est de la sur-ingénierie à ce stade.
4. **Resend a sorti "Automations" le 13 avril 2026** (séquences event-driven, delays, branching, no-code+AI). À surveiller, mais positionné côté "produit payant" et orienté dev — à adopter seulement quand un vrai besoin de séquence multi-jours existe.
5. **IA dans le nurturing = assistant, pas pilote** : LLM pour rédiger/résumer avec un humain qui valide. Jamais d'envoi autonome à toute la liste.

---

## Sujet 1 — Cal.com : connecter une réservation à un suivi

**Findings clés**
- **Webhooks inclus dans le plan gratuit.** Le plan Free Cal.com inclut explicitement : calendriers multiples, types d'événements illimités, paiements, **workflows et automation**, **embed des pages de réservation partout**, intégrations, Cal Video. (cal.com/blog/cal-com-plans-explained, vérifié 2026-06-04). Confirmé aussi par koalendar.com/blog/calcom-vs-calendly : "free plan includes ... workflows, routing forms, monetization, webhooks".
- **Création d'un webhook** : dans `/settings/developer/webhooks`, on fournit une **Subscriber URL** (HTTPS obligatoire en SaaS — `localhost`/IP privées bloquées → l'URL de l'Edge Function Supabase convient), on choisit les **triggers**, et on peut ajouter un **secret** pour vérifier l'authenticité.
- **Triggers disponibles** : `Booking Created`, `Booking Cancelled`, `Booking Rescheduled`, `Booking Rejected`, `Booking Requested`, `Booking Paid`, `Booking Payment Initiated`, `Meeting Started`, `Meeting Ended`, `Recording Ready`, `Form Submitted`, `Form Submitted No Event` (15 min après un form sans booking), `Booking No-show Updated`, `After Hosts/Guests Cal Video No-show`, `Instant Meeting (Accepted)`, `Wrong Assignment Report`.
- **Payload** : structure `{ "triggerEvent", "createdAt", "payload": { ... } }`. Pour `BOOKING_CREATED` le payload contient `attendees[].email`, `attendees[].name`, `startTime`, `endTime`, `eventTitle`, `uid`, `metadata.videoCallUrl`, etc. → tout ce qu'il faut pour créer un lead et envoyer un email. (`MEETING_STARTED`/`MEETING_ENDED` ont un payload **plat** sans wrapper, et sont **time-delayed** — déclenchés automatiquement aux heures start/end, et auto-annulés si la résa est annulée/reprogrammée.)
- **Sécurité** : signature HMAC SHA256 dans le header `x-cal-signature-256`, à vérifier avec le secret dans l'Edge Function. Versioning du payload via `x-cal-webhook-version`.
- **Custom payload template** : on peut réduire le payload à un format custom (`{{title}}`, `{{attendees.0.name}}`, `{{metadata}}`...) pour simplifier le code de la fonction.
- **Embed vs lien vs popup (2026)** : les 3 sont gratuits. Recommandation pour un portfolio de conversion : **popup/floating button ou inline embed** sur la page Contact (réservation sans quitter le site → moins de friction), avec **lien direct** en fallback (emails, signature). Le webhook fonctionne identiquement quel que soit le mode d'affichage.

**Ce que ça implique pour lui**
- Pas besoin de Zapier ni d'intégration tierce : un webhook `BOOKING_CREATED` → une Edge Function suffit.
- L'Edge Function doit : (1) vérifier le HMAC, (2) extraire `attendees[0].email/name`, (3) upsert dans Supabase, (4) appeler Resend pour la confirmation. Tout ça tient dans une seule fonction.
- Les triggers `MEETING_ENDED` et `After Guests Cal Video No-show` ouvrent gratuitement un suivi post-RDV (email de relance, "désolé qu'on se soit ratés") sans cron ni scheduler à coder.

**Sources**
- https://cal.com/docs/developing/guides/automation/webhooks (payloads + triggers + HMAC, scrapé 2026-06-04)
- https://cal.com/blog/cal-com-plans-explained (Free inclut webhooks/workflows/embed, 2026-06-04)
- https://koalendar.com/blog/calcom-vs-calendly (confirme webhooks dans le free, 2026)

---

## Sujet 2 — Resend : automations / séquences en 2026

**Findings clés**
- **Resend a lancé "Automations" le 13 avril 2026** : séquences d'emails event-driven, avec building blocks = **Event triggers**, **Delays** (minutes/heures/jours/semaines), **Branching** (conditions sur la donnée contact ou les propriétés d'event), **Wait for event**. Builder visuel **no-code avec assistance IA** (on décrit le flux en langage naturel, ça scaffolde les étapes). (sequenzy.com/blog/resend-automations-review, 2026)
- **Déclenchement** : par **événements custom** envoyés depuis l'application (ex. `user.created`, `onboarding.completed`, `trial.expiring`). Doc officielle : "Allow you to create email sequences based on custom events from your application." (resend.com/docs/dashboard/automations/introduction)
- **Broadcasts** (déjà en place dans le cache) = blasts no-code (newsletter, lancements, changelogs), avec variables `{{{contact.first_name|fallback}}}`, `{{{RESEND_UNSUBSCRIBE_URL}}}`, API Broadcast (6 endpoints). C'est du one-shot, pas une séquence déclenchée.
- **Limitations des Automations** (review) : ce n'est **pas une plateforme marketing** (pas de segmentation d'audience riche, pas de scheduling de campagnes côté Automations) ; branching = conditionnel, pas par segment ; analytics/attribution **minces** ; pas d'intégrations commerce natives (Stripe/Shopify) ; **marketing et transactionnel sont deux produits avec deux facturations** et Automations est à cheval dessus ; feature **récente** → docs encore légères sur longueur max de séquence, complexité conditionnelle, retries.
- **Tier gratuit (page pricing, cache 2026-06-04)** : Free = **3 000 emails/mois**, **100 emails/jour**, **10 000 automation runs**, rétention 30 jours, **5 crédits IA/mois**. MAIS la même page précise pour les Automation runs : *"Start with 10,000 Automation Runs for free... **Available to paid subscriptions.**"* → **AMBIGUÏTÉ NON RÉSOLUE** : la grille liste 10 000 runs sous "Free", mais la note dit "réservé aux abonnements payants". Je n'ai pas trouvé de source qui tranche clairement. **À vérifier directement dans son dashboard Resend** avant de bâtir dessus. La review Sequenzy suggère aussi qu'Automations peut impliquer deux abonnements (marketing + transactionnel).

**Ce que ça implique pour lui**
- **Le transactionnel pur (confirmation de RDV, rappel) reste le socle gratuit fiable** : envoi via l'API `emails/send` déclenché par le webhook Cal.com, compte dans les 3 000 emails/mois — largement suffisant pour un solo.
- **Les Automations natives sont tentantes pour du nurturing sans coder**, mais : (a) statut free incertain, (b) feature jeune, (c) orientées dev/events custom (pas un outil "marketeur"). → Ne pas en faire la fondation de la v1.
- **Si nurturing multi-jours plus tard** : Automations Resend est le candidat #1 (même stack, pas de nouvel outil), à condition de confirmer le coût (sinon `$0.0015/run` au-delà du quota).

**Sources**
- https://resend.com/docs/dashboard/automations/introduction (def. officielle event-driven, 2026-06-04)
- https://www.sequenzy.com/blog/resend-automations-review (lancement 13/04/2026, blocks, limites)
- .firecrawl/resend.com-pricing.md (Free: 3000/mo, 100/jour, 10k runs "available to paid", 5 AI credits)
- .firecrawl/resend.com-docs-dashboard-broadcasts-introduction.md (Broadcasts no-code)

---

## Sujet 3 — Vercel Workflow SDK (workflow-sdk.dev)

**Findings clés**
- **Ce que c'est** : "brings durability, reliability, and observability to async JavaScript" — apps et **AI Agents** qui peuvent **suspend, resume, maintain state** ; alternative aux queues/retries faits main. (workflow-sdk.dev, 2026-06-04)
- **Compatibilité** : "universally compatible" — Next.js, Vite, Astro, Express, Fastify, Hono, Nitro, Nuxt, SvelteKit, NestJS, TanStack. **Pour du zero-config/scalable, déploiement sur Vercel.**
- **Supabase** : **non mentionné** sur la page → pas de compatibilité documentée out-of-the-box.
- **Pricing / free tier** : **non mentionné sur la page** (info non trouvable côté SDK ; un déploiement sur Vercel impliquerait la tarification fonctions/compute Vercel, hors scope de cette page).
- **Quand l'utiliser** : besoin de durabilité/observabilité/retries automatiques, **process long-running**, agents IA persistants.

**Ce que ça implique pour lui**
- Son frontend Vercel est **statique** → adopter le SDK signifierait introduire du **compute serveur sur Vercel**, ce qui **casse l'archi décidée** (`Vercel = statique`, `Supabase = backend`).
- Le SDK répond à des problèmes (workflows durables, retries, state long-running) **qu'il n'a pas encore** : confirmation/rappel de RDV = travail court, idempotent, qu'une Edge Function fait très bien.
- **Pour un solo débutant en 2026 : sur-ingénierie.** Garder la consigne actuelle "ne pas installer".
- **Quand réévaluer** : séquences sur plusieurs jours avec état (lead nurturing long), retries fins, ou **agent IA durable** qui orchestre du suivi sur la durée. À ce moment-là, comparer Workflow SDK **vs** Resend Automations **vs** un cron Supabase + table d'état — et arbitrer selon le coût Vercel compute (à vérifier alors).

**Sources**
- https://workflow-sdk.dev (durabilité, compat frameworks, deploy Vercel ; pricing/Supabase non documentés, 2026-06-04)

---

## Sujet 4 — Workflows de nurturing combinables avec l'IA (réaliste & léger)

**Findings clés** (digitalapplied.com, guide 2026)
- **Qualification de lead — léger** : segmentation/scoring assistée par IA sur la donnée d'engagement. Réaliste solo : décrire en langage naturel → règles de segment. Complexité basse, coût LLM bas.
- **Rédaction de relance personnalisée — léger** : IA pour brouillon + variations de sujet. Réaliste solo : LLM (ex. Claude Sonnet) pour matcher le ton / la voix de marque sur un brouillon. Complexité basse-moyenne, coût LLM modéré (~15–80 $/mois selon volume).
- **Nurturing enrichi par agent — léger** : LLM qui résume les perfs en rollup hebdo avec tendances + actions recommandées. Complexité basse, coût bas (~5–20 $/mois).
- **À éviter (lourd / risqué)** : orchestration full-lifecycle sans supervision ; **envoi autonome à toute la liste sans validation humaine** (haut risque) ; revue de conformité par IA sans humain dans la boucle.

**Ce que ça implique pour lui**
- Comme il code avec Claude Code + Codex, le pattern réaliste est : **webhook Cal.com → Edge Function → (optionnel) appel LLM pour drafter une relance personnalisée à partir du payload (`additionalNotes`, type d'event, nom)** → email Resend, **avec lui qui valide** avant envoi sur les cas non triviaux.
- Garder l'IA en **assistant** (qualifier le lead à partir des réponses du formulaire Cal.com, suggérer un angle de relance, résumer la semaine), **jamais en pilote autonome** vers la liste.
- Tout ça est faisable **sans Workflow SDK** : un appel HTTP LLM depuis l'Edge Function suffit pour la v1.

**Sources**
- https://www.digitalapplied.com/blog/email-marketing-ai-agents-automation-guide-2026 (patterns light vs heavy, coûts, 2026)

---

## Tableau de décision

| Option | Coût | Complexité | Quand l'adopter |
|---|---|---|---|
| **Embed Cal.com (popup/inline) + lien fallback** | Gratuit (plan Free) | Très basse | **Maintenant** — page Contact |
| **Webhook `BOOKING_CREATED` → 1 Edge Function Supabase** | Gratuit | Basse | **Maintenant** — socle capture de lead |
| **Email confirmation/rappel via Resend API (transactionnel)** | Gratuit (3000/mo, 100/j) | Basse | **Maintenant** — 1 à 3 emails à la main |
| **Triggers `MEETING_ENDED` / no-show → relance** | Gratuit | Basse-moyenne | **Bientôt** — quand le tunnel de base tourne |
| **IA assistant (draft relance / qualif / résumé) via appel LLM dans la fonction** | ~5–80 $/mois LLM | Basse-moyenne | **Bientôt** — avec validation humaine |
| **Resend Automations (séquences event-driven)** | Free incertain → sinon $0.0015/run | Moyenne | **Différé** — quand vrai besoin de séquence multi-jours, après avoir confirmé le coût |
| **Vercel Workflow SDK (durable/agents)** | Non documenté + compute Vercel | Élevée | **Différé / probablement jamais à ce stade** — réévaluer si workflows durables long-running |

---

## Ce qu'on fait maintenant vs ce qu'on diffère

**Maintenant (v1, 100 % gratuit, cohérent avec l'archi)**
- Embed Cal.com en popup/inline sur Contact + lien direct en fallback.
- 1 webhook `BOOKING_CREATED` (HTTPS, secret HMAC) → 1 Edge Function Supabase.
- Edge Function : vérif HMAC → upsert lead (`contact_submissions`/`subscribers`) → email de confirmation Resend (transactionnel).
- Optionnel léger : 2e email de rappel J-1 et relance no-show via triggers Cal.com gratuits.

**Différé (réévaluer après que le tunnel de base tourne)**
- **Resend Automations** pour séquences multi-jours → d'abord **confirmer dans le dashboard si c'est utilisable en Free** (note pricing ambiguë).
- **IA dans le nurturing** : commencer par un draft de relance assisté (humain valide), pas d'envoi autonome.
- **Vercel Workflow SDK** : ne pas installer ; réévaluer uniquement si besoin réel de workflows durables long-running / agents persistants — et alors comparer au trio Edge Function + cron Supabase + Resend Automations.

**Incertitudes / non trouvées (pas inventées)**
- Statut exact des **Automations Resend en tier gratuit** : la grille pricing les liste sous Free (10 000 runs) mais la note dit "Available to paid subscriptions". Non tranché → vérifier en compte.
- **Pricing du Vercel Workflow SDK** et compat Supabase : non documentés sur workflow-sdk.dev.

---

## Sources (URLs réelles retournées par Firecrawl, 2026-06-04)

- https://cal.com/docs/developing/guides/automation/webhooks
- https://cal.com/blog/cal-com-plans-explained
- https://koalendar.com/blog/calcom-vs-calendly
- https://resend.com/docs/dashboard/automations/introduction
- https://www.sequenzy.com/blog/resend-automations-review
- https://www.digitalapplied.com/blog/email-marketing-ai-agents-automation-guide-2026
- https://workflow-sdk.dev
- Cache local : .firecrawl/resend.com-pricing.md, .firecrawl/resend.com-docs-dashboard-broadcasts-introduction.md (scrapés 02–04 juin 2026)
