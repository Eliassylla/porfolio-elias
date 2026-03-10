# Architecture Research

**Domain:** React SPA + Supabase backend integration (Edge Functions, Resend, Cal.com)
**Researched:** 2026-03-10
**Confidence:** HIGH (Supabase/Resend patterns), MEDIUM (Cal.com embed specifics)

---

## Standard Architecture

### System Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                     BROWSER (Static SPA)                            │
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │ ContactForm  │  │ Newsletter   │  │  CTA Button  │              │
│  │ (new)        │  │ Section      │  │  (modified)  │              │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘              │
│         │                 │                  │                      │
│  ┌──────▼─────────────────▼──────┐           │ window.open()        │
│  │   supabase client (existing)  │           │ or Cal.com embed     │
│  │   src/integrations/supabase/  │           ▼                      │
│  └──────────────┬────────────────┘    ┌─────────────┐              │
│                 │ fetch (HTTPS)        │  Cal.com    │              │
│                 │                     │  (external) │              │
└─────────────────┼────────────────────-└─────────────┘──────────────┘
                  │
┌─────────────────▼───────────────────────────────────────────────────┐
│                    SUPABASE (Backend)                                │
│                                                                     │
│  ┌──────────────────────────┐  ┌──────────────────────────────┐    │
│  │  PostgreSQL Database     │  │     Edge Functions (Deno)    │    │
│  │                          │  │                              │    │
│  │  table: subscribers      │  │  send-contact-email/         │    │
│  │  - id (uuid)             │  │    index.ts                  │    │
│  │  - email (text, unique)  │  │                              │    │
│  │  - created_at (timestampz│  │  send-welcome-email/         │    │
│  │  - confirmed (bool)      │  │    index.ts                  │    │
│  │                          │  │                              │    │
│  │  RLS: anon can INSERT    │  │  (secrets: RESEND_API_KEY)   │    │
│  │  only confirmed=false    │  │                              │    │
│  └──────────────────────────┘  └──────────────┬───────────────┘    │
│                                               │ HTTPS POST          │
└───────────────────────────────────────────────┼─────────────────────┘
                                                │
┌───────────────────────────────────────────────▼─────────────────────┐
│                         RESEND (Email API)                           │
│                                                                      │
│  POST https://api.resend.com/emails                                  │
│  Authorization: Bearer $RESEND_API_KEY  ← secret, Edge Function only│
└──────────────────────────────────────────────────────────────────────┘
```

### Component Responsibilities

| Component | Responsibility | Location |
|-----------|----------------|----------|
| `ContactForm` | Collect name/email/message, call Edge Function, show feedback | new: `src/components/forms/ContactForm.tsx` (rewrite existing) |
| `NewsletterSection` | Collect email, insert into `subscribers` table via supabase client, trigger welcome email | modify: `src/sections/NewsletterSection.tsx` |
| `CTASection` / `HeroSection` | Replace `href="#calendly"` placeholder with Cal.com link or embed | modify: existing sections |
| `send-contact-email` Edge Function | Receive contact payload, call Resend API, send notification email to Elias | new: `supabase/functions/send-contact-email/index.ts` |
| `send-welcome-email` Edge Function | Receive subscriber email, call Resend API, send welcome email | new: `supabase/functions/send-welcome-email/index.ts` |
| `subscribers` table | Persist newsletter signups | new: Supabase migration |
| `useContactForm` hook | Form state, validation logic, submission handler | new: `src/hooks/useContactForm.ts` |
| `useNewsletter` hook | Newsletter state, submission handler | new: `src/hooks/useNewsletter.ts` |

---

## Data Flows

### Flow 1: Contact Form Submission → Edge Function → Resend

```
User fills ContactForm (name, email, message)
    │
    ▼
React Hook Form validates (required, email format, message min length)
    │ valid
    ▼
useContactForm.submit() called
    │
    ▼
supabase.functions.invoke('send-contact-email', { body: { name, email, message } })
    │ POST to Supabase Edge Function URL
    │ Auth: Supabase anon key (public) — Edge Function validates origin
    ▼
send-contact-email/index.ts (Deno runtime)
    │
    ├─ Reads Deno.env.get('RESEND_API_KEY')  ← secret, never exposed to browser
    ├─ Constructs email: to=elias@domain.com, from=noreply@domain.com
    ├─ POST https://api.resend.com/emails
    │
    ▼
Resend sends email to Elias
    │
    ▼ (response back to Edge Function)
Edge Function returns { success: true } or { error: "..." }
    │
    ▼
ContactForm shows success toast / error message
```

**New files required:**
- `supabase/functions/send-contact-email/index.ts` — Edge Function
- Rewrite `src/components/forms/ContactForm.tsx` — replace Formspree with supabase.functions.invoke
- `src/hooks/useContactForm.ts` — form state and submission logic

**Modified files:**
- `src/pages/Contact.tsx` — render ContactForm component

---

### Flow 2: Newsletter Signup → Supabase Insert → Edge Function → Resend Welcome Email

```
User types email into NewsletterSection
    │
    ▼
useNewsletter.submit(email) called
    │
    ▼
supabase.from('subscribers').insert({ email, confirmed: false })
    │
    ├─ Success: subscriber persisted in PostgreSQL
    │   RLS policy allows anon INSERT with confirmed=false only
    │
    ▼
supabase.functions.invoke('send-welcome-email', { body: { email } })
    │
    ▼
send-welcome-email/index.ts (Deno runtime)
    │
    ├─ Reads Deno.env.get('RESEND_API_KEY')  ← secret, never in browser
    ├─ Constructs welcome email: to=subscriber_email
    ├─ POST https://api.resend.com/emails
    │
    ▼
Resend delivers welcome email to subscriber
    │
    ▼
Edge Function returns { success: true }
    │
    ▼
NewsletterSection shows success state ("Check your inbox!")
```

**Important:** The client calls two operations sequentially — first the DB insert, then the Edge Function. An alternative is a Postgres database webhook that fires the Edge Function automatically after INSERT. The sequential client-side approach is simpler and sufficient for this scale.

**New files required:**
- `supabase/functions/send-welcome-email/index.ts` — Edge Function
- `supabase/migrations/[timestamp]_create_subscribers.sql` — DB migration
- `src/hooks/useNewsletter.ts` — submission logic

**Modified files:**
- `src/sections/NewsletterSection.tsx` — wire up useNewsletter hook, replace stub handler

---

### Flow 3: Cal.com CTA → Booking

Two implementation options, with clear recommendation:

**Option A: Simple redirect (recommended for this project)**
```
User clicks "Réserver un appel" button
    │
    ▼
<a href="https://cal.com/[username]/[event-type]" target="_blank" rel="noopener noreferrer">
    │
    ▼
Browser opens Cal.com in new tab
User books on Cal.com directly
```

**Option B: Inline embed (more complex, marginal UX gain)**
```
Install @calcom/embed-react
Add <Cal calLink="[username]/[event-type]" /> component
Cal.com loads as iframe on page
```

**Recommendation: Option A (redirect).** Avoids an npm dependency, avoids iframe loading complexity, works reliably across all browsers. Cal.com's booking page is well-designed on mobile. The gain from embedding is minimal for a portfolio site targeting PME decision-makers who will not be surprised by a new tab. Option B only makes sense if the booking flow needs to stay visually inside the site (e.g., a modal).

**Modified files for Option A:**
- `src/sections/HeroSection.tsx` — replace `href="#calendly"` with Cal.com URL
- `src/sections/CTASection.tsx` — same replacement
- `src/components/layout/Header.tsx` — any CTA link in nav
- `src/components/layout/Footer.tsx` — any CTA link in footer

Cal.com URL pattern: `https://cal.com/[your-username]/[event-slug]`
Example: `https://cal.com/elias-antigravity/decouverte-30min`

---

## Recommended File Structure (New + Modified)

```
Portfolio/
├── supabase/
│   ├── config.toml                         # existing
│   ├── migrations/
│   │   └── 20260310000000_create_subscribers.sql   # NEW
│   └── functions/
│       ├── send-contact-email/
│       │   └── index.ts                    # NEW — Edge Function
│       └── send-welcome-email/
│           └── index.ts                    # NEW — Edge Function
│
├── src/
│   ├── components/
│   │   └── forms/
│   │       └── ContactForm.tsx             # REWRITE (replace Formspree)
│   ├── sections/
│   │   ├── NewsletterSection.tsx           # MODIFY (wire hook)
│   │   ├── HeroSection.tsx                 # MODIFY (Cal.com URL)
│   │   └── CTASection.tsx                  # MODIFY (Cal.com URL)
│   ├── hooks/
│   │   ├── useContactForm.ts               # NEW
│   │   └── useNewsletter.ts                # NEW
│   ├── integrations/
│   │   └── supabase/
│   │       ├── client.ts                   # existing (no change)
│   │       └── types.ts                    # REGENERATE after migration
│   └── types/
│       └── index.ts                        # MODIFY (remove photographer types, add domain types)
```

---

## Build Order (Dependency-Respecting)

Dependencies flow in one direction: database schema → Edge Functions → client hooks → UI components.

```
Step 1: Database schema
  └── Create subscribers table migration
  └── Apply with: supabase db push (or via Supabase dashboard)
  └── Regenerate types.ts: supabase gen types typescript --local > src/integrations/supabase/types.ts

Step 2: Supabase secrets
  └── supabase secrets set RESEND_API_KEY=re_...
  └── Required before Edge Functions can be tested

Step 3: Edge Functions
  └── supabase/functions/send-contact-email/index.ts
  └── supabase/functions/send-welcome-email/index.ts
  └── Test locally: supabase functions serve
  └── Deploy: supabase functions deploy

Step 4: Client hooks
  └── src/hooks/useContactForm.ts (depends on Edge Function being deployed)
  └── src/hooks/useNewsletter.ts (depends on subscribers table + Edge Function)

Step 5: UI components
  └── Rewrite src/components/forms/ContactForm.tsx (uses useContactForm)
  └── Modify src/sections/NewsletterSection.tsx (uses useNewsletter)

Step 6: Cal.com links
  └── No backend dependency — pure string replacement
  └── src/sections/HeroSection.tsx
  └── src/sections/CTASection.tsx
  └── Any nav/footer CTAs
```

**Rationale:** Edge Functions cannot be tested end-to-end without the Resend secret. The subscribers table must exist before client-side inserts. Regenerating types after migration ensures TypeScript catches any schema mismatch at compile time, not runtime.

---

## Architectural Patterns

### Pattern 1: Supabase Edge Function as Secure Proxy

**What:** The browser calls a Supabase Edge Function (via `supabase.functions.invoke()`), which holds the Resend API key as a server-side secret. The key is never transmitted to the browser.

**When to use:** Any time a third-party API requires a secret key and the operation is triggered by user action. Contact form and welcome email both use this.

**Trade-offs:** Adds a network hop. Cold start latency on Edge Functions (~200-400ms) is acceptable for form submissions but not for page loads. For this portfolio, the user has already filled a form so a 500ms round trip is imperceptible.

**Example pattern:**
```typescript
// In Edge Function (Deno, runs on Supabase servers)
const resendKey = Deno.env.get('RESEND_API_KEY')  // never in browser

const res = await fetch('https://api.resend.com/emails', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${resendKey}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ from, to, subject, html }),
})
```

### Pattern 2: Client-Side Sequential Operations for Newsletter

**What:** Client calls `supabase.from('subscribers').insert()` directly, then calls the Edge Function. Two network calls from the browser.

**When to use:** Simple flows where both steps are fast and the sequence is tight. If the Edge Function call fails, the subscriber is still saved in the DB (acceptable — they're captured even without the welcome email).

**Trade-offs:** The DB insert is atomic and will succeed or fail clearly. The welcome email is best-effort. If the Edge Function fails, the subscriber exists in the DB but didn't get a welcome email. This is acceptable for a portfolio newsletter — no double opt-in, no compliance concern at this scale.

**Alternative (not recommended here):** Postgres database webhook firing the Edge Function automatically. More reliable but adds infrastructure complexity that is not justified for this project size.

### Pattern 3: Row Level Security for Anonymous Inserts

**What:** The `subscribers` table uses RLS to allow the anon Supabase key to INSERT only rows where `confirmed = false`. The anon key cannot update `confirmed` to true or read other rows.

**When to use:** Any Supabase table that accepts public writes without authentication. Prevents abuse.

**Example migration:**
```sql
-- Allow anon to insert unconfirmed subscribers only
CREATE POLICY "anon_insert_subscribers"
ON subscribers FOR INSERT
TO anon
WITH CHECK (confirmed = false);

-- Prevent anon from reading any rows
-- (service role key, used in Edge Functions, can read all)
```

---

## Integration Points

### External Services

| Service | Integration Pattern | Security | Notes |
|---------|---------------------|----------|-------|
| Resend | REST API called from Edge Function only | RESEND_API_KEY as Supabase secret | Never in browser, never in VITE_ env vars |
| Supabase DB | supabase-js client from browser | anon key (public) + RLS | Types regenerated after migrations |
| Supabase Edge Functions | supabase.functions.invoke() from browser | anon key authenticates caller | Function validates inputs |
| Cal.com | External URL redirect (Option A) | None needed | No API key required for redirect |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| React component → Supabase DB | supabase-js client, typed via generated types | Regenerate types after schema changes |
| React component → Edge Function | supabase.functions.invoke() | Returns typed response |
| Edge Function → Resend | fetch() with Authorization header | Secret only in Deno.env |
| Hook → Component | React state + callback props | useContactForm and useNewsletter expose: `{ isLoading, error, success, submit }` |

---

## Security Architecture

### API Key Exposure Matrix

| Key | Lives In | Exposed to Browser? | Why |
|-----|----------|---------------------|-----|
| VITE_SUPABASE_URL | .env + Vite bundle | YES — intentional | Public project URL, not a secret |
| VITE_SUPABASE_PUBLISHABLE_KEY | .env + Vite bundle | YES — intentional | Anon key, designed to be public, RLS enforces security |
| RESEND_API_KEY | Supabase secrets (Deno.env) | NO — critical | Can send emails as your domain; must never be in client |

### Critical Rule

The `RESEND_API_KEY` MUST be set as a Supabase Edge Function secret, not as a `VITE_` environment variable. Any `VITE_` variable is bundled into the client JavaScript and readable by anyone who opens devtools.

Command: `supabase secrets set RESEND_API_KEY=re_xxxxxxxxxxxx`

### Input Validation

Edge Functions must validate all inputs before calling Resend:
- Email: regex or `new URL('mailto:' + email)` pattern check
- Name and message: non-empty, max length enforced
- Return 400 with error message for invalid inputs — the browser handles this gracefully

### CORS

Supabase Edge Functions require explicit CORS headers for browser calls. Standard pattern:

```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Handle preflight
if (req.method === 'OPTIONS') {
  return new Response('ok', { headers: corsHeaders })
}
```

In production, restrict `Access-Control-Allow-Origin` to the actual domain instead of `*`.

---

## Anti-Patterns

### Anti-Pattern 1: Calling Resend From the Browser

**What people do:** Add `VITE_RESEND_API_KEY` to the .env file and call `https://api.resend.com/emails` directly from React code.

**Why it's wrong:** The Resend API key is embedded in the JS bundle. Anyone can extract it from devtools and send emails as your domain. Spam, phishing, and API quota exhaustion follow.

**Do this instead:** Always route email sends through an Edge Function. The key lives in `Deno.env`, never in the browser.

### Anti-Pattern 2: No RLS on the Subscribers Table

**What people do:** Create the `subscribers` table without Row Level Security, relying on the anon key being "hard to find."

**Why it's wrong:** The anon key is public (it's in the browser bundle). Without RLS, anyone who finds it can read all subscriber emails, delete rows, or spam INSERT calls.

**Do this instead:** Enable RLS on the table immediately. Grant anon INSERT only with `confirmed = false`. Use the Supabase service role key (only in Edge Functions) for reads.

### Anti-Pattern 3: Duplicate Form Logic in Component

**What people do:** Put all validation, loading state, error handling, and fetch logic directly inside the form component JSX.

**Why it's wrong:** The component becomes untestable, hard to read, and the logic cannot be reused. Error states become an afterthought.

**Do this instead:** Extract to a dedicated hook (`useContactForm`, `useNewsletter`). The component only handles rendering; the hook handles state and side effects. This matches the pattern already used in the codebase for `useScrollPosition`.

### Anti-Pattern 4: Calling the Edge Function Before the DB Insert for Newsletter

**What people do:** Call `send-welcome-email` first, then insert into `subscribers`. If the insert fails, the user gets a welcome email but is never in the DB.

**Why it's wrong:** Inconsistent state — user exists in Resend's sent list but not in your subscriber table.

**Do this instead:** Insert into DB first. If insert succeeds, call the Edge Function. If the Edge Function fails, the subscriber is still captured (better to have a subscriber without a welcome email than a welcome email without a subscriber).

---

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0–500 subscribers | Current architecture is sufficient. Sequential client-side ops, no queue needed. |
| 500–5k subscribers | Add Postgres trigger firing Edge Function automatically (removes client-side double-call). Consider rate limiting on Edge Function. |
| 5k+ subscribers | Move to Resend broadcast/audience API instead of individual transactional emails for newsletter sends. Add deduplication logic in subscribers insert. |

This portfolio will realistically stay under 500 subscribers for the foreseeable future. The simple sequential pattern is the right call. Do not over-engineer.

---

## Sources

- Supabase Edge Functions documentation (training data, August 2025) — HIGH confidence on patterns
- Supabase RLS documentation (training data, August 2025) — HIGH confidence
- Resend API documentation (training data, August 2025) — HIGH confidence on auth pattern
- Cal.com embed documentation (training data, August 2025) — MEDIUM confidence (Cal.com embed API evolves)
- Existing codebase analysis: `.planning/codebase/ARCHITECTURE.md`, `.planning/codebase/INTEGRATIONS.md`

---
*Architecture research for: React SPA + Supabase backend (Edge Functions, Resend, Cal.com)*
*Researched: 2026-03-10*
