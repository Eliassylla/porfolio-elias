# Feature Research

**Domain:** Portfolio B2B conversion — consultant en automatisations agentiques, cible PME francophones
**Researched:** 2026-03-10
**Confidence:** HIGH (architecture codebase analysee directement; patterns B2B issus de training data bien etablis; web search non disponible dans cette session)

---

## Contexte de depart : ce qui existe deja

Avant de definir les features, il faut nommer l'etat actuel du code pour eviter de redoubler le travail existant.

| Element | Etat actuel | Gap |
|---------|-------------|-----|
| CTA "Reserver un appel" (Hero, CTASection, ProjectDetail) | UI presente, `href="#calendly"` placeholder ou `Link to="/contact"` | Pas connecte a Cal.com |
| Contact page | Structure 2-colonnes presente (créneau + email direct) | Aucun formulaire de contact, bouton ouvre Calendly externe |
| ContactForm component | Fichier existe (`src/components/forms/ContactForm.tsx`) avec RHF + Zod | Pointe vers Formspree, types photographe (projectType: editorial/commercial/personal), non montee sur la page Contact |
| Newsletter section | UI presente (input email + bouton) | Aucun handler submit, aucun Supabase, aucun email |
| Portfolio / Case studies | Pages Portfolio + ProjectDetail presentes, structure probleme→solution→resultat 3-colonnes | Pas d'images reelles, section "Glass Box" vide, `demoUrl: null` partout |
| Supabase | Client configure dans le projet | Aucune table definie, aucune Edge Function |

---

## Feature Landscape

### Table Stakes (le visiteur PME s'attend a ca)

Un dirigeant de PME qui visite un portfolio consultant en 2026 s'attend a ce minimum. L'absence de ces elements genere de la defiance, pas juste de la friction.

| Feature | Pourquoi attendu | Complexite | Notes implementation |
|---------|-----------------|------------|----------------------|
| CTA "Reserver un appel" fonctionnel | Le visiteur veut agir dans la foulée de sa lecture, pas naviguer vers une page externe qui charge rien | LOW | Remplacer `#calendly` par l'URL Cal.com dans `business.ts`. Optionnel : embed Cal.com inline en popup via `@calcom/embed-react` |
| Formulaire de contact avec confirmation | Pour les visiteurs qui ne veulent pas donner leur agenda tout de suite — mail direct reste une alternative de confiance | MEDIUM | ContactForm existe mais doit: (1) remplacer les champs photographe par champs automation (secteur, probleme, urgence), (2) pointer vers Supabase Edge Function qui appelle Resend |
| Email de notification au consultant a chaque soumission | Sans notification, les leads tombent dans le vide | LOW | Resend API call dans la Edge Function, 10 lignes max |
| Email de confirmation au prospect | Professionnalisme basique — signale que le message a ete recu | LOW | Second appel Resend dans la meme Edge Function |
| Contenu projets reel (images ou screenshots workflows) | Sans preuve visuelle, les projets semblent fictifs. Les PME ne font pas confiance aux textes seuls | MEDIUM | Screenshots workflow n8n annotes, ou diagrammes Mermaid rendus. La "Glass Box" est deja en place dans ProjectDetail — il faut la remplir |
| Page About correcte | Un consultant inconnu = un consultant ou on ne signe pas. La page actuelle parle de "Sarah Mitchell photographe" | LOW (contenu) | Remplacer le contenu, pas l'architecture |
| Newsletter signup fonctionnel | L'email existe, le bouton ne fait rien — ca parait casse | MEDIUM | Insert Supabase `subscribers` + email bienvenue Resend |

### Differentiateurs (avantage concurrentiel sur le marche B2B PME francophone)

Ces features ne sont pas attendues, mais elles creent la difference entre "encore un freelance" et "quelqu'un qui comprend mon probleme".

| Feature | Valeur proposee | Complexite | Notes implementation |
|---------|----------------|------------|----------------------|
| Formulaire de contact avec champ "secteur d'activite" et "probleme principal" | Qualifie le lead avant l'appel. Elias arrive en appel avec le contexte, pas le prospect. Signal de professionnalisme fort pour le dirigeant | LOW | Remplacer `projectType: editorial/commercial/personal` par `sector` (conseil/formation/services-pro/autre) + `mainProblem` (textarea courte) dans le schema Zod |
| Miniature du workflow n8n annote dans ProjectDetail (la "Glass Box") | Differenciateur cle : montre la transparence technique. Un consultant qui montre le "sous le capot" inspire confiance. Rare chez les concurrents francophones | MEDIUM | Screenshots annotés avec Figma/Canva, ou diagramme SVG statique. Pas besoin d'outil dynamique |
| Metriques quantifiees en entete de chaque projet | "45 min/client economisees" dans le hero du cas client — les dirigeants PME pensent en temps et en euros, pas en technologie | LOW | Champ `metric` a ajouter dans le type `Project` de `business.ts`, affiche en badge prominent dans ProjectDetail |
| CTA contextuel en fin de chaque case study ("Vous avez ce probleme ?") | Le visitor lit un cas qui lui ressemble, le CTA contextuel convertit mieux qu'un CTA generique | VERY LOW | Deja code dans ProjectDetail — il faut juste le connecter a Cal.com (change `href` dans `Link to="/contact"` → `href={businessInfo.calendlyUrl}`) |
| Newsletter avec promesse concrete ("une automatisation decortiquee par mois") | La promesse est deja dans le code (`NewsletterSection.tsx` ligne 12-15). Elle est differenciante : contenu utile vs spam | LOW | Le texte est en place, il faut juste connecter le backend |
| Affichage du delai de reponse ("Je reponds sous 24h ouvrés") | Reduit l'anxiete du prospect PME qui craint d'envoyer un message dans le vide | VERY LOW | Deja present dans `Contact.tsx` ligne 55, mais la page Contact n'a pas de formulaire — incoherence a corriger |

### Anti-Features (eviter absolument)

Ces features semblent bonnes mais nuisent au positionnement B2B ou creent de la complexite inutile.

| Feature | Pourquoi demandee | Pourquoi problematique | Alternative |
|---------|------------------|------------------------|-------------|
| Chat en temps reel (Intercom, Crisp, Tidio) | "Reduce friction to contact" | Pour un consultant solo, le chat live cree une attente d'immediat impossible a tenir. Si absent, ca degrade la confiance. Le pop-up de chat distrait du message principal | Le formulaire avec promesse "24h" remplit ce role sans engagement temps-reel |
| Formulaire avec trop de champs (budget, timeline, taille equipe...) | Qualification maximale du lead | Les formulaires longs > 5 champs reduisent le taux de completion de 50%+ en B2B SME. Les PME n'ont pas le temps | 4 champs max : nom, email, secteur, probleme principal. Qualifier a l'oral en appel |
| Calendrier embarque avec disponibilites en temps reel (Cal.com inline embed) | Impression de modernite | Ajoute 60-120KB de JS, casse le controle CSS, necessite @calcom/embed-react bien configure. Pour ce milestone, le risque depasse le gain | Lien direct vers Cal.com (nouvelle onglet). Simple, fiable, zero maintenance |
| Animations d'entree complexes sur les formulaires | "Feels premium" | Framer Motion est deja utilise partout — en ajouter sur les formulaires ralentit la perception et distraire du CTA | ScrollReveal wrapper suffit, deja en place |
| Pop-up newsletter au scroll ou a la sortie (exit intent) | Augmente les inscriptions | Destroy la credibilite B2B. Les dirigeants PME associent ces pop-ups aux sites e-commerce low-cost | Section newsletter en pied de page avec proposition de valeur claire — c'est deja l'architecture actuelle |
| Systeme de temoignages avec notation etoiles | Social proof "prouv" | Pour un consultant avec 15 projets, les etoiles semblent fabriquees. Le format citation + nom + role est plus credible | Citations textuelles avec role precis (deja dans `businessInfo.testimonials`) |
| CMS externe (Contentful, Sanity) pour les projets | "Facilite les mises a jour" | Ajoute une dependance externe, un cout, un apprentissage, et un point de defaillance pour des contenus qui changent rarement. Hors scope confirme | Editer `business.ts` directement — c'est la decision deja validee dans PROJECT.md |
| Blog integre au site | Content marketing | Hors scope confirme dans PROJECT.md. Un blog mal alimente nuit plus qu'un portfolio sans blog | Newsletter mensuelle (in scope) fait office de content marketing minimal |

---

## Feature Dependencies

```
[Cal.com URL dans business.ts]
    └──deblocage──> [CTA Hero fonctionnel]
    └──deblocage──> [CTA CTASection fonctionnel]
    └──deblocage──> [CTA ProjectDetail fonctionnel]
    └──deblocage──> [Bouton Contact page "Ouvrir le calendrier"]

[Supabase Edge Function contact]
    └──requiert──> [Schema Zod mis a jour (champs automation)]
    └──requiert──> [Resend API key configuree]
    └──produit──>  [Email notification consultant]
    └──produit──>  [Email confirmation prospect]

[Supabase table subscribers]
    └──requiert──> [Schema Supabase cree (migration)]
    └──deblocage──> [Newsletter handler submit]
    └──deblocage──> [Email de bienvenue Resend]

[Contenu business.ts mis a jour]
    └──deblocage──> [Page About correcte]
    └──deblocage──> [Projets avec images reelles]
    └──deblocage──> [Types TypeScript alignes automation]

[Screenshots / visuels workflows]
    └──deblocage──> [Glass Box remplie dans ProjectDetail]
    └──enhances──>  [Credibilite des case studies]

[ContactForm fields mis a jour]
    └──requiert──> [Contenu business.ts mis a jour] (pour les options de secteur)
    └──requiert──> [Supabase Edge Function contact]
    └──deblocage──> [Formulaire monte sur Contact page]
```

### Notes de dependances

- **Cal.com URL est le deblocage le plus rapide :** Une seule variable dans `business.ts` debloque 4 CTAs en meme temps. Faire en premier.
- **Supabase Edge Function requiert Resend :** Les deux sont inutiles l'un sans l'autre. Les deployer ensemble.
- **ContactForm existe mais est inutilisable :** Il n'est pas monte sur la page Contact (Contact.tsx ne l'importe pas). La plomberie est faite, il manque le raccordement.
- **Screenshots sont un prerequis psychologique :** Inutile d'optimiser la conversion si les projets semblent fictifs. Contenu > technique pour ce milestone.

---

## MVP Definition

### Lancer avec (v1.0 — ce milestone)

Ordre recommande : unlocker les CTAs d'abord (impact immediat, effort minimal), puis backend, puis contenu.

- [ ] **Cal.com URL dans `business.ts`** — debloque tous les CTAs en une ligne. Aucune raison d'attendre.
- [ ] **Contenu `business.ts` complet** — vrais projets, vraie bio, vraie URL Cal.com. Fondation de tout le reste.
- [ ] **Page About correcte** — elimine la defiance immediate ("ce n'est pas son site").
- [ ] **ContactForm reconnecte (champs automation + Supabase Edge Function + Resend)** — formulaire de contact fonctionnel avec notification email.
- [ ] **Newsletter connectee (Supabase table + email bienvenue Resend)** — le seul mecanisme de lead nurturing long terme.
- [ ] **Glass Box remplie (screenshots workflows annotees)** — credibilite des case studies. Contenu pas code.
- [ ] **Nettoyage code mort** — types photographe, Index.tsx, projects.ts legacy. Hygiene avant livraison.

### Ajouter apres validation (v1.x)

A declencher quand les premiers prospects ont interagi avec le site.

- [ ] **Champ `metric` dans le type Project** — affichage d'une metrique en badge sur ProjectDetail. Trigger : feedback que les projets manquent d'impact visuel.
- [ ] **Email de confirmation personnalise post-formulaire** — avec resume du probleme soumis. Trigger : premier lead qualifie recu.
- [ ] **Images screenshots de haute qualite** — remplacement des placeholders SVG. Trigger : projets reels avec clients.

### Reporter a v2+

- [ ] **Cal.com embed inline (popup)** — remplacer le lien externe par un embed React. Defer : complexite de configuration, peu d'impact si le lien fonctionne.
- [ ] **Analytics de conversion** — tracking des clics CTA, soumissions formulaire. Defer : Google Analytics simple suffit pour ce stade.
- [ ] **Temoignages video** — format plus fort que les citations. Defer : besoin de clients satisfaits avec disponibilite video.

---

## Feature Prioritization Matrix

| Feature | Valeur prospect | Cout implementation | Priorite |
|---------|----------------|---------------------|----------|
| Cal.com URL dans business.ts | HIGH | LOW (1 ligne) | P1 |
| Contenu business.ts complet | HIGH | LOW (redaction) | P1 |
| Page About correcte | HIGH | LOW (contenu) | P1 |
| ContactForm champs automation | HIGH | LOW (modifier schema Zod) | P1 |
| Supabase Edge Function + Resend (contact) | HIGH | MEDIUM | P1 |
| Newsletter Supabase + Resend | MEDIUM | MEDIUM | P1 |
| Screenshots Glass Box | HIGH | MEDIUM (production contenu) | P1 |
| Nettoyage types TypeScript | LOW (technique) | LOW | P1 (dette technique) |
| Metrique en badge ProjectDetail | MEDIUM | LOW | P2 |
| Cal.com embed inline | LOW | HIGH | P3 |

---

## Patterns UX B2B Consulting — Ce qui fait confiance chez les PME

Ces observations informent les decisions de design au-dela des features individuelles.

**1. La "preuve avant le pitch"**
Les dirigeants PME ne font pas confiance aux promesses, ils font confiance aux resultats documentes. L'ordre de lecture cible est : voir un cas client similaire → comprendre le probleme resolu → voir le resultat chiffre → reserver l'appel. La structure probleme→solution→resultat en 3 colonnes (deja en place dans ProjectDetail) suit ce pattern correctement.

**2. La friction du formulaire doit signaler le serieux, pas l'urgence**
Un formulaire de 4 champs avec champ "probleme principal" envoie le signal : "ce consultant s'interesse a mon contexte avant de parler prix". C'est rassurante pour une PME qui a deja ete deca par des prestataires generiques. Ne pas reduire le formulaire a email + message.

**3. Le "20 minutes, sans engagement" est une promesse de respect du temps**
La promesse est deja dans le code (CTASection, Contact, ProjectDetail). Elle fonctionne parce que les dirigeants PME craignent d'etre bloques dans une demo commerciale de 90 minutes. Ne pas la supprimer pour la remplacer par "appel decouverte" generique.

**4. Le double chemin de contact est juste**
La page Contact offre deux options : reserver un creneau (Cal.com) ou envoyer un email. C'est le bon pattern B2B — certains prospects veulent controler leur agenda, d'autres preferent initier par ecrit. Le formulaire de contact viendra remplacer le lien mailto actuel.

**5. La newsletter doit promettre un apprentissage, pas un "restez informe"**
La promesse actuelle dans NewsletterSection ("une automatisation decortiquee par mois, le probleme, la solution, comment l'adapter") est exactement ce qui fonctionne pour une audience PME : contenu actionnable et applicable, pas contenu corporate.

---

## Competitor Feature Analysis

Analyse basee sur les patterns du marche des consultants independants B2B francophones (training data, MEDIUM confidence — sites non verifies en temps reel).

| Feature | Concurrents generiques | Elias (cible) |
|---------|----------------------|---------------|
| CTA principal | "Contactez-moi" vague → formulaire generique | "Reserver un appel de 20 min" → Cal.com direct |
| Case studies | Screenshots produits, liste de clients logos | Probleme→solution→resultat + "Glass Box" workflow visible |
| Formulaire | Nom/email/message | Nom/email/secteur/probleme principal (qualifie avant appel) |
| Newsletter | Absent ou "restez informe" | Workflow reel decortique chaque mois |
| About | CV liste de competences techniques | Positionnement "medecin des processus" avec angle metier |
| Social proof | Logos clients (souvent fallaciex) | Citations avec role precis + metriques quantifiees |

**Ecart strategique a maintenir :** La transparence technique ("Glass Box") est rare chez les consultants B2B francophones. C'est le differenciateur le plus fort a developper en priorite apres le v1.0.

---

## Sources

- Analyse directe du codebase : `src/sections/`, `src/pages/`, `src/data/business.ts`, `src/components/forms/ContactForm.tsx`
- `.planning/PROJECT.md` — decisions stack et scope validees
- `.planning/codebase/ARCHITECTURE.md` — architecture SPA et couches de donnees
- Patterns B2B consulting conversion : training data (MEDIUM confidence — non verifie en session faute d'acces web)
- Patterns UX formulaire B2B SME : training data (MEDIUM confidence)

---

*Feature research pour : portfolio B2B conversion — consultant automatisations agentiques PME francophones*
*Recherche : 2026-03-10*
