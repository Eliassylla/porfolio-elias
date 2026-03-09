# Codebase Concerns

**Analysis Date:** 2026-03-09

## Tech Debt

**Unfinished Formspree Integration:**
- Issue: Contact form hardcodes a placeholder form ID `YOUR_FORM_ID` in the fetch URL. Form submission silently fails in production.
- Files: `src/components/forms/ContactForm.tsx` (line 73)
- Impact: The contact form is completely non-functional. Visitors cannot reach the business owner.
- Fix approach: Replace `YOUR_FORM_ID` with a real Formspree form ID, or swap to an alternative backend (e.g., send via Supabase edge function or Resend).

**Calendly URL is a Dead Placeholder:**
- Issue: `calendlyUrl` in business data is set to `'#calendly'`. The "Ouvrir Calendly" CTA button on the Contact page opens `#calendly` — a no-op anchor.
- Files: `src/data/business.ts` (line 8), `src/pages/Contact.tsx` (line 40)
- Impact: Primary conversion action (booking a call) does not work.
- Fix approach: Replace `'#calendly'` with the actual Calendly scheduling URL.

**All Project Images Are Null:**
- Issue: All four projects in `businessInfo.projects` have `image: null` and `demoUrl: null`. The Portfolio page shows a "Capture à venir" placeholder for every project. The ProjectDetail page also shows a "workflow n8n à venir" placeholder glass box.
- Files: `src/data/business.ts` (lines 86–121), `src/pages/Portfolio.tsx` (lines 66–83), `src/pages/ProjectDetail.tsx` (lines 84–93)
- Impact: The portfolio — the core social proof section — shows no real work. Damages credibility.
- Fix approach: Add real screenshots or workflow diagrams. At minimum, upload per-project images and populate the `image` field.

**Newsletter Form Has No Backend:**
- Issue: The newsletter signup input field in `NewsletterSection.tsx` has no `onSubmit` handler, no state management, and no integration. Clicking "S'inscrire" does nothing.
- Files: `src/sections/NewsletterSection.tsx` (lines 17–29)
- Impact: Newsletter signups are silently lost. Lead capture does not function.
- Fix approach: Connect to a mailing service (Brevo, Mailchimp, ConvertKit) via API, or handle via Formspree/Supabase edge function.

**WhatIBuildSection Uses a Single Hardcoded Image for All Projects:**
- Issue: The FocusRail in `WhatIBuildSection` maps all projects from `businessInfo.projects` but assigns the same hardcoded Unsplash URL (`photo-1551288049-bebda4e38f71`) for all project cards.
- Files: `src/sections/WhatIBuildSection.tsx` (line 82)
- Impact: All project thumbnails look identical in the home page carousel. Reduces visual differentiation and professional appearance.
- Fix approach: Store a per-project `imageSrc` in `businessInfo.projects` and use it in the map.

**`Index.tsx` Legacy Wrapper:**
- Issue: `src/pages/Index.tsx` is a thin wrapper that simply re-exports `Home`. It exists "for backward compatibility" per its comment but is not mounted on any route in `App.tsx`.
- Files: `src/pages/Index.tsx`, `src/App.tsx`
- Impact: Dead code. Adds confusion about which file is the real home page.
- Fix approach: Delete `src/pages/Index.tsx`.

**`src/data/projects.ts` Is a Dead File (373 lines):**
- Issue: `src/data/projects.ts` is a 373-line photographer portfolio dataset (projects with Unsplash photo URLs, categories like `portraits`, `landscapes`, etc.) that belongs to a previous iteration of the site. No component imports it.
- Files: `src/data/projects.ts`
- Impact: Bloats the bundle conceptually. Confuses the data model — the real project data lives in `src/data/business.ts`.
- Fix approach: Delete `src/data/projects.ts`.

**`src/data/photographer.ts` Is Dead Data:**
- Issue: `src/data/photographer.ts` contains a full fake photographer persona ("Sarah Mitchell", award-winning NYC photographer) used only by `src/pages/About.tsx`. The live site is for "Elias — Automatisation IA pour PME de services". The About page currently shows the wrong person's identity.
- Files: `src/data/photographer.ts`, `src/pages/About.tsx`
- Impact: About page is completely mismatched with the rest of the site. Shows a fictitious photography persona on a real B2B automation consultancy site.
- Fix approach: Rewrite `src/pages/About.tsx` to use `businessInfo` from `src/data/business.ts`, and delete `src/data/photographer.ts`.

**`src/types/index.ts` Uses Photographer Domain Types:**
- Issue: `src/types/index.ts` defines types for `ProjectCategory` (portraits, landscapes, editorial), `ProjectImage`, `Project`, `PhotographerInfo`, and `ContactSubmission` — all inherited from the photography template. None of these types are used by the current automation-focused pages.
- Files: `src/types/index.ts`
- Impact: Type file is misleading. Type `contactSubmission.projectType` includes values like `'editorial'` and `'personal'`, which are still used in `ContactForm.tsx` — creating a domain mismatch between the contact form and the actual service business.
- Fix approach: Rewrite `src/types/index.ts` with automation-relevant types. Update `ContactForm.tsx` project type options to match the real service offerings (e.g., `'facturation'`, `'onboarding'`, `'reporting'`).

**ContactForm Validation Language Mismatch:**
- Issue: Form validation error messages and UI labels are in English ("Name must be at least 2 characters", "Please enter a valid email", "Send Message", "Message Sent!") while the rest of the site is entirely in French.
- Files: `src/components/forms/ContactForm.tsx` (lines 30–45, 124–129, 248–250)
- Impact: Jarring UX inconsistency. Undermines the professional presentation for a French-speaking B2B audience.
- Fix approach: Translate all form strings to French.

**`use-toast.ts` Duplicated:**
- Issue: `use-toast` exists in two locations: `src/hooks/use-toast.ts` and `src/components/ui/use-toast.ts`. Both are present and could diverge.
- Files: `src/hooks/use-toast.ts`, `src/components/ui/use-toast.ts`
- Impact: Ambiguity about which file to import. Risk of maintenance divergence.
- Fix approach: Remove one copy, establish a single canonical location.

## Known Bugs

**About Page Shows Wrong Identity:**
- Symptoms: The `/about` route renders "Sarah Mitchell — Editorial & Commercial Photographer" with a Pexels video and photography-focused bio. This is entirely wrong for the actual business.
- Files: `src/pages/About.tsx`, `src/data/photographer.ts`
- Trigger: Navigate to `/about`
- Workaround: The `/about` route is not linked in the main navigation (`Header.tsx`), so users won't discover it organically, but it is still publicly accessible.

**ErrorBoundary Suppresses Errors in Production:**
- Symptoms: `componentDidCatch` only calls `console.error` in DEV mode. In production, errors are swallowed with no external logging.
- Files: `src/components/ErrorBoundary.tsx` (lines 27–30)
- Trigger: Any uncaught React render error in production
- Workaround: None currently.

## Security Considerations

**Supabase Client Initialized with Potentially Undefined Keys:**
- Risk: `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` are read from env vars without null-checks. If the `.env` is missing, `createClient(undefined, undefined)` is called silently, which may crash or behave unpredictably at runtime.
- Files: `src/integrations/supabase/client.ts` (lines 5–6)
- Current mitigation: Supabase client is never imported or used anywhere in the app (all Tables in `types.ts` are `never`). No live risk today, but the dead integration adds surface area.
- Recommendations: Either remove the Supabase integration entirely (no tables, no usage), or add a startup assertion that validates env vars are present.

**Supabase Integration Is Completely Unused:**
- Risk: The Supabase SDK is a production dependency adding ~200KB+ to the bundle. The schema has zero tables. The client is never imported outside `integrations/supabase/`. This represents unnecessary attack surface and bundle weight.
- Files: `src/integrations/supabase/client.ts`, `src/integrations/supabase/types.ts`
- Current mitigation: None.
- Recommendations: Remove the Supabase dependency (`@supabase/supabase-js`) and both integration files until a real database schema is needed.

**No CSRF or Rate-Limit Protection on Contact Form:**
- Risk: The Formspree endpoint (once configured) will accept submissions without rate limiting from the client side. Spam and form flooding are possible.
- Files: `src/components/forms/ContactForm.tsx`
- Current mitigation: Not applicable — form currently points to a placeholder endpoint.
- Recommendations: Formspree provides built-in spam filtering; ensure honeypot and reCAPTCHA options are enabled when activating the real form ID.

## Performance Bottlenecks

**Heavy Dependency Bundle for Unused Components:**
- Problem: `package.json` includes `recharts`, `cmdk`, `embla-carousel-react`, `gsap`, `@gsap/react`, `swiper`, `vaul`, `react-day-picker`, `input-otp`, `react-resizable-panels` — none of which appear to be used by any current page. The entire Radix UI primitive set (20+ packages) is installed even though only ~6 are actively used.
- Files: `package.json`
- Cause: Lovable (the AI code generator) scaffolded a maximal shadcn/ui installation with every available component.
- Improvement path: Audit and remove unused packages. Tree-shaking only applies if components are not imported; unused shadcn components that are installed but not imported are already excluded, but the SDKs (gsap, swiper, recharts) may still be bundled if they are referenced anywhere.

**All External Images Load Without Lazy Loading or Size Optimization:**
- Problem: Multiple Unsplash URLs in `WhatIBuildSection`, `Services`, and `rolling-list.tsx` use `?w=1000` or smaller but have no `loading="lazy"` attribute, no `srcset`, and no responsive sizing. The FocusRail loads background blur images unconditionally on every render.
- Files: `src/sections/WhatIBuildSection.tsx`, `src/pages/Services.tsx`, `src/components/ui/rolling-list.tsx`, `src/components/ui/focus-rail.tsx`
- Cause: Components were designed for visual richness without performance budgeting.
- Improvement path: Add `loading="lazy"` and `decoding="async"` to all non-hero images. For FocusRail background images, only load the active item's blur version.

**About Page Autoloads a Video from Pexels:**
- Problem: `src/pages/About.tsx` embeds an autoplaying video from an external Pexels URL with no preload control beyond `preload="metadata"`. On mobile or slow connections, this blocks rendering and wastes bandwidth.
- Files: `src/pages/About.tsx` (lines 57–66)
- Cause: Placeholder content from the photography template was never replaced.
- Improvement path: Replace with a static image or a self-hosted video once real About content is created.

## Fragile Areas

**`SEOHead` Mutates the DOM Imperatively:**
- Files: `src/components/seo/SEOHead.tsx`
- Why fragile: The component uses `document.querySelector` + `appendChild` to manage meta tags directly instead of a proper `<Helmet>` or similar library. If two routes with different SEO props render simultaneously (e.g., during route transitions), meta tags may flicker or duplicate. The `keywords` meta tag is hardcoded and never changes across routes.
- Safe modification: Add `react-helmet-async` and replace all DOM mutation logic. Keep the same prop interface.
- Test coverage: None.

**`allTags` Computed at Module Level in Portfolio.tsx:**
- Files: `src/pages/Portfolio.tsx` (line 9)
- Why fragile: `allTags` is derived from `businessInfo.projects` at module import time, not inside a hook or `useMemo`. If the projects data changes dynamically, the filter options will not update. Currently not a live bug, but could become one if projects are fetched from an API.
- Safe modification: Move `allTags` inside the component body, wrapped in `useMemo`.
- Test coverage: None.

## Dependencies at Risk

**`react-day-picker` v8 + `date-fns` v3 Mismatch:**
- Risk: `react-day-picker@8.x` officially supports `date-fns@2.x`. The project uses `date-fns@3.x`, which introduced breaking API changes. This may cause silent failures or type errors in any calendar/date-picker usage.
- Impact: `src/components/ui/calendar.tsx` would be affected if used.
- Migration plan: Either upgrade `react-day-picker` to v9 (which supports date-fns v3) or downgrade date-fns to v2.

**Dual Lockfiles (`bun.lock` and `package-lock.json`):**
- Risk: Both `bun.lock` (Bun) and `package-lock.json` (npm) are committed. This means two different package managers may be used in different environments, causing dependency resolution divergence.
- Impact: CI/CD or collaborators using npm may install different resolved versions than the local Bun environment.
- Migration plan: Choose one package manager. Delete the unused lockfile and add the other to `.gitignore`.

## Missing Critical Features

**No Analytics:**
- Problem: There is no page view tracking, conversion event tracking, or session recording installed.
- Blocks: Cannot measure how many visitors land on the site, which pages convert to contact form views, or where users drop off.

**No Error Monitoring in Production:**
- Problem: The `ErrorBoundary` logs to console only in dev mode. No Sentry, LogRocket, or equivalent is configured.
- Blocks: Production bugs are invisible.

**About Page Is Inaccessible and Wrong:**
- Problem: The `/about` route exists but is not linked from the `Header` nav. The content is from the photographer template, not the actual business. There is no way for a real visitor to reach the page through navigation.
- Blocks: Personal brand story and trust-building content is completely absent.

## Test Coverage Gaps

**Zero Tests Exist:**
- What's not tested: Entire codebase. No unit tests, no integration tests, no E2E tests.
- Files: All `src/` files.
- Risk: Form submission logic, route navigation, SEO tag mutation, and animation logic can all break silently with no automated detection.
- Priority: High — at minimum, the contact form submission path should have an integration test before the Formspree ID is filled in.

---

*Concerns audit: 2026-03-09*
