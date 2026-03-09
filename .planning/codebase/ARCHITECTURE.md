# Architecture

**Analysis Date:** 2026-03-09

## Pattern Overview

**Overall:** Single-Page Application (SPA) with client-side routing

**Key Characteristics:**
- React 18 with TypeScript, built by Vite, deployed as a static SPA
- All data is static — hardcoded in `src/data/business.ts` and `src/data/projects.ts`; there are no API calls or server-side data fetching
- Component hierarchy: App → Layout → Pages → Sections → UI components
- Lazy-loaded page components wrapped in React Suspense for code splitting
- Context providers stacked at the root level (QueryClient, ThemeProvider, TooltipProvider)

## Layers

**Application Shell:**
- Purpose: Global providers, routing, and persistent chrome (header/footer)
- Location: `src/App.tsx`, `src/main.tsx`
- Contains: Provider stack, React Router setup, lazy imports for pages
- Depends on: All providers, all page components
- Used by: Nothing (root)

**Layout:**
- Purpose: Persistent shell wrapping every route
- Location: `src/components/layout/Layout.tsx`
- Contains: `Header`, `<main>` wrapper, `Footer`
- Depends on: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`
- Used by: `App.tsx`

**Pages:**
- Purpose: Route-level components — one per URL
- Location: `src/pages/`
- Contains: `Home`, `Services`, `Portfolio`, `ProjectDetail`, `Contact`, `NotFound`
- Depends on: Sections, UI components, data layer, SEO component
- Used by: React Router route table in `App.tsx`

**Sections:**
- Purpose: Reusable full-width page sections composed into pages
- Location: `src/sections/` (homepage sections), `src/components/sections/` (legacy/reusable)
- Contains: `HeroSection`, `WhatIBuildSection`, `FeaturedProjectsSection`, `NewsletterSection`, `CTASection`
- Depends on: `src/data/business.ts`, UI components, framer-motion
- Used by: Page components

**UI Components:**
- Purpose: Presentational primitives — shadcn/ui base components plus custom animated primitives
- Location: `src/components/ui/`
- Contains: shadcn/ui components (`button`, `badge`, `sheet`, `card`, etc.) plus `ScrollReveal`, `LoadingFallback`, `SkipToContent`, `FocusRail`, `VerticalCutReveal`, `RollingTextList`, `FeatureSection`
- Depends on: `src/lib/utils.ts` for `cn()`, framer-motion for animations
- Used by: Sections, pages, layout components

**Data Layer:**
- Purpose: Static content and typed data for the entire app
- Location: `src/data/`
- Contains: `business.ts` (all business info: name, services, projects, testimonials, stats, targets), `projects.ts` (legacy photography projects), `photographer.ts`
- Depends on: `src/types/index.ts`
- Used by: Pages, sections, SEO component

**Types:**
- Purpose: Shared TypeScript interfaces
- Location: `src/types/index.ts`
- Contains: `Project`, `ProjectImage`, `PhotographerInfo`, `ContactSubmission`, `ProjectCategory`, `AspectRatio`
- Depends on: Nothing
- Used by: Data files, component props

**Hooks:**
- Purpose: Reusable stateful logic
- Location: `src/hooks/`
- Contains: `useScrollPosition.ts` (scroll tracking for header), `useMediaQuery.ts`, `use-mobile.tsx`, `use-toast.ts`
- Depends on: React core
- Used by: Layout/header components, UI components

**Utilities:**
- Purpose: Shared helper functions
- Location: `src/lib/utils.ts`
- Contains: `cn()` — Tailwind class merging via clsx + tailwind-merge
- Depends on: clsx, tailwind-merge
- Used by: Nearly all components

## Data Flow

**Page Render Flow:**

1. `src/main.tsx` mounts `<App />` into `#root`
2. `App.tsx` wraps the tree in providers: `ErrorBoundary` → `QueryClientProvider` → `ThemeProvider` → `TooltipProvider`
3. `BrowserRouter` enables client-side routing; `Layout` wraps all routes
4. React Router matches the URL to a lazy-loaded page component
5. Page component renders `SEOHead` (imperatively updates `document.title` and meta tags via `useEffect`)
6. Page composes sections, passing static data from `src/data/business.ts` via direct import

**Project Detail Flow:**

1. User navigates to `/portfolio/:id`
2. `ProjectDetail.tsx` reads `id` from `useParams`
3. Finds matching project in `businessInfo.projects` array
4. If not found, redirects to `/portfolio` via `<Navigate>`
5. Renders project data inline

**Theme Flow:**

1. `ThemeProvider` wraps app with `next-themes` `NextThemesProvider`
2. Default theme is `"system"` — reads OS preference
3. `ThemeToggle` in header allows manual override
4. Theme state persisted in localStorage by next-themes; applied as `class` attribute on `<html>`

**State Management:**
- No global client state beyond theme (next-themes via context)
- `@tanstack/react-query` is configured but not actively used for data fetching (all data is static)
- Local `useState` handles UI state: mobile menu open/closed, portfolio filter tag, scroll position, animation triggers

## Key Abstractions

**`businessInfo` object:**
- Purpose: Single source of truth for all business content
- Examples: `src/data/business.ts`
- Pattern: Plain exported TypeScript object; imported directly by any component that needs content. Changing content means editing this file only.

**`SEOHead` component:**
- Purpose: Per-route meta tag management without a full SSR setup
- Examples: `src/components/seo/SEOHead.tsx`
- Pattern: Renders null; uses `useEffect` to imperatively set `document.title` and create/update `<meta>` tags on every route change

**`ScrollReveal` component:**
- Purpose: Intersection Observer-based fade/slide-in animation for sections
- Examples: `src/components/ui/ScrollReveal.tsx`
- Pattern: Wraps children in a motion div; triggers animation on viewport entry

**`Layout` component:**
- Purpose: Consistent chrome (Header + Footer) across all routes
- Examples: `src/components/layout/Layout.tsx`
- Pattern: Renders `Header`, a `<main id="main-content">` wrapper for accessibility, and `Footer`

**`cn()` utility:**
- Purpose: Merge Tailwind classes safely with conditional logic
- Examples: `src/lib/utils.ts`
- Pattern: `cn(baseClasses, conditionalClass && 'class-name')` — used universally across all components

## Entry Points

**Application Entry:**
- Location: `src/main.tsx`
- Triggers: Browser load of `index.html` → Vite injects `main.tsx`
- Responsibilities: Creates React root, renders `<App />`

**HTML Shell:**
- Location: `index.html`
- Triggers: HTTP request
- Responsibilities: Defines `<div id="root">`, loads Vite module entry

**Route Entry Points (pages):**
- `src/pages/Home.tsx` — `/`
- `src/pages/Services.tsx` — `/services`
- `src/pages/Portfolio.tsx` — `/portfolio`
- `src/pages/ProjectDetail.tsx` — `/portfolio/:id`
- `src/pages/Contact.tsx` — `/contact`
- `src/pages/NotFound.tsx` — `*`

## Error Handling

**Strategy:** React class-based ErrorBoundary at root level; no per-route error boundaries

**Patterns:**
- `src/components/ErrorBoundary.tsx` catches all render errors below `App.tsx`
- On error: renders a user-friendly fallback UI with a "Return to Home" button that redirects to `/`
- Console logging of errors is gated behind `import.meta.env.DEV` — no production noise
- Missing project routes: `ProjectDetail` handles unknown IDs with `<Navigate to="/portfolio" replace />`
- Lazy-loaded pages: `<Suspense fallback={<LoadingFallback />}>` handles async chunk loading

## Cross-Cutting Concerns

**Logging:** `console.error` in `ErrorBoundary`, gated to DEV mode only. No logging library.

**Validation:** None — all data is static; no user input is submitted or validated (newsletter form has no submit handler; contact page links to Calendly externally)

**Authentication:** None — fully public site, no auth layer

**Accessibility:** `SkipToContent` component (`src/components/ui/SkipToContent.tsx`) provides keyboard skip link; `<main id="main-content">` is the skip target; ARIA labels on icon buttons in Header

**SEO:** `SEOHead` component imperatively manages page title, description, Open Graph, and Twitter Card meta tags on each route

---

*Architecture analysis: 2026-03-09*
