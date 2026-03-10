# Research Summary

**Project:** Portfolio Antigravity — Elias
**Milestone:** v1.0 — Portfolio Fonctionnel
**Researched:** 2026-03-10
**Files:** STACK.md · FEATURES.md · ARCHITECTURE.md · PITFALLS.md

---

## Executive Summary

Le portfolio est un brownfield à 70% visuel, 0% fonctionnel côté conversion. La structure React/Supabase/Framer Motion est saine — il ne manque pas une refonte, il manque la plomberie. Trois couches à construire dans cet ordre : contenu réel d'abord (impact immédiat, zéro backend), infrastructure email ensuite (Supabase Edge Functions + Resend), puis câblage UI.

Le risque principal n'est pas technique : c'est l'ordre de priorité. Changer une variable dans `business.ts` débloque 4 CTAs Cal.com simultanément — c'est la première chose à faire. Tout le reste dépend du contenu réel pour être testable.

La décision architecturale la plus importante : les subscribers newsletter doivent aller **dans Supabase ET dans Resend Contacts**. Supabase est la source de vérité; Resend Contacts permet d'envoyer des broadcasts newsletter depuis le dashboard sans passer par du code supplémentaire.

---

## Findings par domaine

### Stack — Pas de nouveaux packages frontend

| Ajout | Où | Pourquoi |
|-------|----|----------|
| `npm:resend@6` | Deno (Edge Function) uniquement | Email API — jamais dans package.json React |
| `npm:@react-email/components` | Deno (Edge Function) | Templates HTML emails en JSX |
| Cal.com | Zéro npm — URL directe | `https://cal.com/[username]/[event-slug]` dans business.ts |
| `@calcom/embed-react@1.5.3` | Optionnel — popup seulement | Pas recommandé pour v1.0 |

**Ce qui est déjà installé et utilisable :** react-hook-form, zod, @hookform/resolvers, @supabase/supabase-js.

**Claude Code skills à installer avant d'implémenter :**
```bash
npx skills add resend/react-email
npx skills add resend/resend
npx skills add resend/email-best-practices
```

### Features — Ordre de valeur décroissante

| Feature | Effort | Impact | Bloquer par |
|---------|--------|--------|-------------|
| Cal.com URL dans business.ts | 1 ligne | 4 CTAs débloqués | URL Cal.com d'Elias |
| Contenu business.ts réel | Rédaction | Crédibilité totale | Elias |
| Page About correcte | Contenu | Supprime défiance immédiate | Elias |
| ContactForm → Edge Function → Resend | MEDIUM | Leads captés | Resend configuré |
| Newsletter → Supabase + Resend | MEDIUM | Lead nurturing | Supabase migration |
| Nettoyage code mort | LOW | Build propre | Contenu migré d'abord |

**Différenciateur clé identifié :** La "Glass Box" (screenshots workflows annotés dans ProjectDetail) est rare chez les concurrents B2B francophones. À remplir avec du contenu Elias — pas du code.

**Anti-features à éviter :** Chat live temps réel, formulaire > 5 champs, Cal.com embed inline, popup newsletter.

### Architecture — 3 flux de données

**Flux 1 — Contact Form:**
```
Client → Edge Function 'send-contact-email'
  → Supabase insert(contact_submissions) [archivage]
  → Resend.send() notification à Elias
  → Resend.send() confirmation au prospect
```

**Flux 2 — Newsletter (double destination):**
```
Client → supabase.insert('subscribers')          [source de vérité]
       → Edge Function 'add-subscriber'
           → resend.contacts.create(audienceId)  [Resend Broadcasts]
           → Resend.send() welcome email
```

**Flux 3 — Cal.com:**
```
Client → window.open('https://cal.com/username/event') [zéro backend]
```

**Nouveaux fichiers à créer :**
- `supabase/migrations/[ts]_create_subscribers.sql`
- `supabase/functions/send-contact-email/index.ts`
- `supabase/functions/add-subscriber/index.ts`
- `src/hooks/useContactForm.ts`
- `src/hooks/useNewsletter.ts`

**Fichiers à modifier :**
- `src/data/business.ts` — contenu réel + Cal.com URL
- `src/components/forms/ContactForm.tsx` — rewrite (Formspree → Edge Function)
- `src/sections/NewsletterSection.tsx` — câbler useNewsletter
- `src/sections/HeroSection.tsx`, `CTASection.tsx` — URL Cal.com
- `src/pages/Contact.tsx` — monter ContactForm
- `src/integrations/supabase/types.ts` — régénérer après migration

### Pitfalls — Critiques à adresser par phase

| Pitfall | Phase | Priorité |
|---------|-------|----------|
| URL Cal.com manquante | Phase 1 | BLOQUEUR |
| Resend Audience ID manquant | Phase 2 setup | BLOQUEUR |
| CORS manquants sur Edge Functions | Phase 2 | CRITIQUE |
| `VITE_RESEND_API_KEY` exposé | Phase 2 | CRITIQUE (sécurité) |
| Secrets locaux manquants (`supabase functions serve`) | Phase 2 dev | HIGH |
| Email dupliqué newsletter sans gestion | Phase 3 UI | MEDIUM |
| Brownfield Replace-Before-Delete | Phase 1 nettoyage | HIGH |
| Strings validation en anglais dans ContactForm | Phase 3 UI | LOW |

---

## Watch Out For

1. **Ne pas mettre `RESEND_API_KEY` dans `.env`** — uniquement `supabase secrets set`
2. **Créer l'audience Resend dans le dashboard AVANT le code** — l'`audienceId` est requis par `resend.contacts.create()`
3. **Insert Supabase AVANT l'Edge Function** pour la newsletter — si l'email échoue, le subscriber est quand même capté
4. **Remplacer avant supprimer** pour le code mort brownfield — build TypeScript doit passer à chaque étape
5. **Tester le lien Cal.com manuellement** avant de valider la phase — une 404 sur le CTA principal est catastrophique

---

## Prérequis à collecter avant de coder

| Info | Usage | Status |
|------|-------|--------|
| URL Cal.com d'Elias (`cal.com/[user]/[event]`) | CTA principal + 4 liens | ○ Manquante |
| Domaine email vérifié dans Resend | Envoi emails (pas de spam) | ○ À vérifier |
| Audience ID Resend | `resend.contacts.create()` | ○ À créer |
| Texte biographie réelle | Page About, business.ts | ○ Manquant |
| Screenshots projets réels | Glass Box, FeaturedProjects | ○ Manquants |

---

## Suggested Build Order (Phase Implications)

```
Phase 1 — Contenu & CTAs (zero backend)
  ├── business.ts complet (bio, services, projets, URL Cal.com)
  ├── Page About correcte
  ├── Cal.com URL dans HeroSection + CTASection
  └── Nettoyage code mort (après migration contenu)

Phase 2 — Infrastructure Email (Supabase + Resend)
  ├── Migration SQL (subscribers + contact_submissions)
  ├── Supabase secrets (RESEND_API_KEY, RESEND_AUDIENCE_ID)
  ├── Edge Function send-contact-email
  └── Edge Function add-subscriber (insert Resend Contacts + welcome email)

Phase 3 — Câblage UI
  ├── useContactForm hook + ContactForm rewrite
  ├── useNewsletter hook + NewsletterSection câblage
  ├── Contact.tsx : monter ContactForm
  └── Types TypeScript regenerés + validation strings en français

Phase 4 — Polish
  └── Dark/light mode audit toutes sections modifiées
```

---

*Research synthesized: 2026-03-10*
*Sources: STACK.md · FEATURES.md · ARCHITECTURE.md · PITFALLS.md*
