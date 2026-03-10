# Stack Research

**Domain:** Portfolio B2B — Cal.com + Resend + Supabase Edge Functions
**Researched:** 2026-03-10
**Confidence:** HIGH (versions verified via npm registry; package.json inspection; Resend docs live)

## Recommended Stack

### Core Technologies (nouvelles additions seulement)

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| Resend SDK (Edge Function only) | npm:resend@6 | Envoi emails transactionnels + gestion contacts/audiences | API simple, 3000 emails/mois gratuits, Contacts API intégrée pour broadcasts newsletter |
| Supabase Edge Functions | Deno (auto) | Backend serverless — emails, insert contacts Resend | Évite serveur séparé, cohérent avec Supabase existant, secrets sécurisés |
| Cal.com (redirect) | URL directe | Prise de rendez-vous | Aucun package npm nécessaire — juste remplacer l'URL dans business.ts |
| react-email | npm:@react-email/components | Templates emails HTML/text en JSX | Composants prêts (Button, Text, Section), dual render HTML+plain text, Tailwind support |

### Supporting Libraries (optionnelles)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @calcom/embed-react | 1.5.3 | Cal.com popup intégré | Uniquement si popup en overlay souhaité (vs redirect simple) |

### Déjà installé (ne pas réinstaller)

| Package | Status | Usage actuel |
|---------|--------|--------------|
| @supabase/supabase-js | ✓ installé | Client configuré, pas de tables ni Edge Functions |
| react-hook-form | ✓ installé | Utilisé dans ContactForm.tsx existant |
| zod | ✓ installé | Validation dans ContactForm.tsx |
| @hookform/resolvers | ✓ installé | Résolution Zod dans ContactForm.tsx |

### Claude Code Skills Resend (recommandés pour l'implémentation)

Ces skills s'installent dans Claude Code et aident à générer le code email :

```bash
npx skills add resend/react-email       # Templates React Email
npx skills add resend/resend            # Resend SDK patterns
npx skills add resend/email-best-practices  # Deliverability + conformité
```

## Installation

```bash
# Aucun package npm à installer pour Cal.com redirect
# Resend et react-email s'utilisent UNIQUEMENT dans les Edge Functions (import Deno)

# UNIQUEMENT si popup Cal.com intégré souhaité (optionnel) :
npm install @calcom/embed-react
```

**Configuration Supabase Edge Functions :**
```bash
# Secrets (jamais dans package.json ou .env frontend)
supabase secrets set RESEND_API_KEY=re_xxxx

# Créer les Edge Functions
supabase functions new send-contact-email
supabase functions new add-subscriber
```

**Import dans Edge Function (Deno) :**
```typescript
import { Resend } from "npm:resend@6";
import { render } from "npm:@react-email/render";
const resend = new Resend(Deno.env.get("RESEND_API_KEY"));
```

## Architecture des données — Vue complète

### Newsletter Subscriber (double destination)

```
Client → Supabase.insert('subscribers') → Edge Function 'add-subscriber'
                                                    ↓
                                        Resend Contacts API (create contact)
                                        + Resend send welcome email
```

**Pourquoi double destination :**
- **Supabase** = source de vérité, backup, analytics, RLS
- **Resend Contacts** = permet d'envoyer des Broadcasts newsletter depuis le dashboard Resend

### Contact Form (archivage + notification)

```
Client → Edge Function 'send-contact-email'
              ↓
    Supabase.insert('contact_submissions')  ← archivage
    + Resend.send() notification email à Elias
```

### Cal.com CTA (aucun backend)

```
Client → window.open('https://cal.com/username/event-slug')
```

## Resend Contacts API — Fonctionnalités pertinentes

| Feature | Usage dans ce projet |
|---------|---------------------|
| `resend.contacts.create()` | Ajouter subscriber newsletter |
| `resend.contacts.update()` | Mettre à jour statut (confirmed, unsubscribed) |
| Segments | Grouper subscribers par intérêt (futur) |
| Topics | Préférences d'abonnement (futur) |
| Broadcasts | Envoyer newsletter depuis dashboard Resend (futur) |
| Suppression list | Gestion bounces/unsubscribes automatique |

## Tables Supabase nécessaires (SQL migrations)

```sql
-- subscribers (source de vérité côté Supabase)
create table subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  resend_contact_id text,      -- ID retourné par Resend Contacts API
  created_at timestamptz default now(),
  confirmed boolean default false
);
alter table subscribers enable row level security;
create policy "Public insert" on subscribers for insert with check (true);
-- Seules les Edge Functions (service role) peuvent lire/mettre à jour

-- contact_submissions (archivage formulaire contact)
create table contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  message text not null,
  created_at timestamptz default now()
);
alter table contact_submissions enable row level security;
-- Seules les Edge Functions (service role) peuvent insérer
```

## Alternatives Considérées

| Recommandé | Alternative | Quand utiliser l'alternative |
|------------|-------------|------------------------------|
| Cal.com redirect (URL) | @calcom/embed-react | Si popup calendrier inline dans la page est requis |
| Resend Contacts API | Mailchimp / Brevo | Si volume > 3000 emails/mois ou segmentation avancée requise |
| Supabase Edge Functions | Serveur Node.js séparé | Si volume ou complexité dépasse les limites du tier gratuit |
| react-email templates | HTML brut | Jamais — maintenance impossible, client compatibility cassée |

## What NOT to Use

| Éviter | Pourquoi | Utiliser à la place |
|--------|----------|---------------------|
| `resend` dans package.json | Bundle le SDK serveur dans le navigateur | `npm:resend@6` dans Edge Function Deno uniquement |
| `VITE_RESEND_API_KEY` | Exposé publiquement dans le bundle navigateur | `supabase secrets set` |
| `@calcom/atoms` | Requiert plan payant Cal.com + bundle massif | URL redirect ou `@calcom/embed-react` |
| Database webhooks Supabase | Complexité inutile pour ce volume | Appel Edge Function direct depuis le client |
| Formspree | Dépendance externe, coût, moins de contrôle | ContactForm → Edge Function → Resend |

## Open Questions

- **Cal.com username/event-slug** : `https://cal.com/[username]/[event-slug]` — à confirmer avant implémentation
- **Domaine email Resend** : vérification DNS requise dans le dashboard Resend avant envoi (ex: `contact@antigravity.fr`)
- **Audience Resend** : créer l'audience dans le dashboard Resend avant d'appeler l'API Contacts (l'audience ID sera une variable d'environnement Edge Function)
- **Double opt-in** : actuellement single opt-in (`confirmed = false`). Si audience EU, envisager email de confirmation pour conformité GDPR.
- **Popup vs redirect Cal.com** : décision produit — redirect recommandé pour simplicité

## Sources

- `npm show @calcom/embed-react` — version 1.5.3 confirmée
- `npm show resend` — version 6.9.3 confirmée
- https://resend.com/docs/llms.txt — Contacts API, Audiences, Topics, Broadcasts
- https://resend.com/docs/react-email-skill — React Email skill Claude Code
- Inspection directe package.json, ContactForm.tsx, business.ts

---
*Stack research for: Portfolio B2B — Cal.com + Resend + Supabase Edge Functions*
*Researched: 2026-03-10*
