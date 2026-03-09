# External Integrations

**Analysis Date:** 2026-03-09

## APIs & External Services

**Form Submission:**
- Formspree - Handles contact form submissions from `src/components/forms/ContactForm.tsx`
  - SDK/Client: Native `fetch` POST to `https://formspree.io/f/YOUR_FORM_ID`
  - Auth: No API key (form ID embedded in URL)
  - Status: Placeholder — `YOUR_FORM_ID` not yet replaced with a real form ID
  - Payload: `{ name, email, projectType, message, _subject }`

**Lovable.dev (dev-only):**
- `lovable-tagger` plugin active in development mode only (see `vite.config.ts`)
- Used by the Lovable.dev AI development platform to tag components
- No runtime dependency; excluded from production builds

## Data Storage

**Databases:**
- Supabase (PostgreSQL via BaaS)
  - Project ID: `clwiqqbpsspjxsmwhpww` (from `supabase/config.toml`)
  - Connection: `VITE_SUPABASE_URL` env var
  - Client: `@supabase/supabase-js` 2.98, initialized in `src/integrations/supabase/client.ts`
  - Current schema: No tables defined — `src/integrations/supabase/types.ts` shows all public Tables/Views/Functions as empty (never type)
  - Auth config: Session persisted in `localStorage`, auto token refresh enabled
  - Usage: Client is available project-wide via `import { supabase } from "@/integrations/supabase/client"`, but no active queries detected in current codebase — TanStack Query is configured but not wired to Supabase yet

**File Storage:**
- Local filesystem only — project images served as static assets from `src/assets/` and `public/`
- No cloud storage integration detected

**Caching:**
- TanStack React Query (in-memory, client-side) — configured globally in `src/App.tsx` with default `QueryClient` settings

## Authentication & Identity

**Auth Provider:**
- Supabase Auth — client configured with session persistence (`localStorage`) and auto token refresh in `src/integrations/supabase/client.ts`
- No auth UI (login pages, protected routes, session checks) detected in current codebase — auth infrastructure is present but not yet implemented

## Monitoring & Observability

**Error Tracking:**
- None — no Sentry, Datadog, or similar SDK detected

**Error Boundaries:**
- Custom React `ErrorBoundary` component at `src/components/ErrorBoundary.tsx` — catches render errors client-side

**Logs:**
- Console only — no structured logging library

## CI/CD & Deployment

**Hosting:**
- Not explicitly configured — likely Lovable.dev managed hosting (given `lovable-tagger` dev dependency and project structure)
- Build output: static SPA from `vite build` → `dist/`

**CI Pipeline:**
- None detected — no `.github/workflows/`, `.gitlab-ci.yml`, or similar

## Environment Configuration

**Required env vars:**
- `VITE_SUPABASE_URL` - Supabase project URL (referenced in `src/integrations/supabase/client.ts`)
- `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase anon/public key (referenced in `src/integrations/supabase/client.ts`)

**Secrets location:**
- `.env` file at project root (present and tracked in git status as modified — verify it is gitignored)

## Webhooks & Callbacks

**Incoming:**
- None detected

**Outgoing:**
- Formspree POST at `https://formspree.io/f/YOUR_FORM_ID` (from `src/components/forms/ContactForm.tsx`) — currently uses placeholder ID, not functional until replaced

---

*Integration audit: 2026-03-09*
