# Codebase Structure

**Analysis Date:** 2026-03-09

## Directory Layout

```
Portfolio/
├── src/                    # All application source code
│   ├── main.tsx            # React DOM entry point
│   ├── App.tsx             # Root component: providers + routing
│   ├── App.css             # Minimal global app styles
│   ├── index.css           # Tailwind base + CSS variables (theme tokens)
│   ├── vite-env.d.ts       # Vite type declarations
│   ├── assets/             # Static image assets (hero portrait)
│   ├── components/         # Reusable components
│   │   ├── layout/         # Header, Footer, Layout shell
│   │   ├── ui/             # Primitive UI components (shadcn + custom)
│   │   ├── sections/       # Legacy/additional section components
│   │   ├── seo/            # SEOHead component
│   │   ├── forms/          # ContactForm (currently unused in pages)
│   │   ├── providers/      # ThemeProvider wrapper
│   │   ├── ErrorBoundary.tsx
│   │   ├── Header.tsx      # (duplicate — canonical is layout/Header.tsx)
│   │   ├── Footer.tsx      # (duplicate — canonical is layout/Footer.tsx)
│   │   ├── Layout.tsx      # (duplicate — canonical is layout/Layout.tsx)
│   │   └── ThemeToggle.tsx # (in components/ root, used by layout/Header.tsx)
│   ├── data/               # Static content data
│   │   ├── business.ts     # Primary data source: businessInfo object
│   │   ├── projects.ts     # Legacy photography project data (unused in active pages)
│   │   └── photographer.ts # Legacy photographer info (unused in active pages)
│   ├── hooks/              # Custom React hooks
│   │   ├── useScrollPosition.ts
│   │   ├── useMediaQuery.ts
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── integrations/       # External service clients
│   │   └── supabase/       # Supabase client config (currently unused)
│   ├── lib/                # Utility functions
│   │   └── utils.ts        # cn() class merging helper
│   ├── pages/              # Route-level page components
│   │   ├── Home.tsx        # / — composes src/sections/
│   │   ├── Services.tsx    # /services
│   │   ├── Portfolio.tsx   # /portfolio — project grid with tag filter
│   │   ├── ProjectDetail.tsx # /portfolio/:id
│   │   ├── Contact.tsx     # /contact
│   │   ├── About.tsx       # (exists but not in router — unused)
│   │   ├── Index.tsx       # (exists but not in router — unused)
│   │   └── NotFound.tsx    # * (catch-all)
│   ├── sections/           # Full-width homepage sections
│   │   ├── HeroSection.tsx
│   │   ├── WhatIBuildSection.tsx
│   │   ├── FeaturedProjectsSection.tsx
│   │   ├── NewsletterSection.tsx
│   │   └── CTASection.tsx
│   └── types/
│       └── index.ts        # Shared TypeScript interfaces
├── public/                 # Static public assets (served at root)
├── supabase/               # Supabase project config (migrations etc.)
├── tailwind-plus/          # Tailwind Plus example templates (reference only)
├── .planning/              # GSD planning documents
│   └── codebase/           # Codebase analysis docs
├── index.html              # HTML shell with #root mount point
├── vite.config.ts          # Vite config with @ alias and SWC plugin
├── tsconfig.json           # TypeScript project references
├── tsconfig.app.json       # App-specific TS config
├── tsconfig.node.json      # Node/build-tool TS config
├── package.json            # Dependencies and scripts
├── components.json         # shadcn/ui component registry config
├── eslint.config.js        # ESLint flat config
├── postcss.config.js       # PostCSS config
├── SPECIFICATION.md        # Product specification document
└── PLAN.md                 # Development plan document
```

## Directory Purposes

**`src/pages/`:**
- Purpose: One component per route; each owns its layout and SEO
- Contains: Route-level React components, imported lazily in `App.tsx`
- Key files: `Home.tsx`, `Portfolio.tsx`, `ProjectDetail.tsx`, `Contact.tsx`

**`src/sections/`:**
- Purpose: Large, full-width page sections composed into the Home page
- Contains: Self-contained section components that pull data from `src/data/business.ts`
- Key files: `HeroSection.tsx` (hero + CTA), `WhatIBuildSection.tsx` (animated FocusRail), `FeaturedProjectsSection.tsx`, `NewsletterSection.tsx`, `CTASection.tsx`

**`src/components/layout/`:**
- Purpose: Persistent site chrome
- Contains: `Header.tsx` (fixed nav with scroll transparency), `Footer.tsx`, `Layout.tsx` (shell wrapper)

**`src/components/ui/`:**
- Purpose: Reusable presentational primitives — both generated shadcn/ui components and custom animated ones
- Contains: shadcn/ui primitives (`button`, `badge`, `card`, `sheet`, `dialog`, etc.) plus custom: `ScrollReveal.tsx`, `LoadingFallback.tsx`, `SkipToContent.tsx`, `FocusRail.tsx`, `VerticalCutReveal.tsx`, `RollingTextList.tsx`, `FeatureSection.tsx`

**`src/data/`:**
- Purpose: Single source of truth for all site content — edit here to update any text or data on the site
- Contains: `business.ts` (active), `projects.ts` (legacy), `photographer.ts` (legacy)
- Key files: `business.ts` — exports `businessInfo` with all services, projects, testimonials, stats, process steps, and targets

**`src/hooks/`:**
- Purpose: Stateful logic extracted from components
- Contains: Scroll tracking, viewport size detection, toast state

**`src/integrations/supabase/`:**
- Purpose: Supabase client setup (present but not actively used in any page or component)
- Contains: Client initialization and type exports

**`src/lib/`:**
- Purpose: Pure utility functions
- Contains: `utils.ts` with `cn()` helper

**`src/types/`:**
- Purpose: Shared TypeScript type definitions
- Contains: `index.ts` — `Project`, `ProjectImage`, `PhotographerInfo`, `ContactSubmission`, `ProjectCategory`, `AspectRatio`

**`tailwind-plus/`:**
- Purpose: Reference UI templates from Tailwind Plus subscription; not part of the app build
- Committed: Yes
- Generated: No

## Key File Locations

**Entry Points:**
- `src/main.tsx`: React root mount
- `index.html`: HTML shell
- `src/App.tsx`: Provider stack + route table

**Configuration:**
- `vite.config.ts`: Build config, `@` alias, plugins
- `components.json`: shadcn/ui configuration
- `src/index.css`: CSS custom properties (theme tokens, dark mode variables)
- `tsconfig.app.json`: TypeScript settings for application code

**Core Logic:**
- `src/data/business.ts`: All editable site content
- `src/pages/ProjectDetail.tsx`: Dynamic project routing logic
- `src/components/seo/SEOHead.tsx`: Meta tag management

**Styling:**
- `src/index.css`: Theme tokens (CSS variables for colors, radius, etc.) and Tailwind directives
- All component styling: Tailwind utility classes inline via `className`

## Naming Conventions

**Files:**
- React components: `PascalCase.tsx` (e.g., `HeroSection.tsx`, `ScrollReveal.tsx`)
- Hooks: `camelCase.ts` or `use-kebab-case.tsx` (mixed — prefer `camelCase.ts` for new hooks)
- Data files: `camelCase.ts` (e.g., `business.ts`, `projects.ts`)
- Utilities: `camelCase.ts` (e.g., `utils.ts`)

**Directories:**
- All lowercase, single-word or hyphenated (e.g., `components`, `layout`, `seo`, `tailwind-plus`)

**Components:**
- Named exports for layout/utility components: `export function Header()`, `export class ErrorBoundary`
- Default exports for pages and sections: `export default function Home()`

**shadcn/ui components:**
- Generated with lowercase hyphenated filenames: `button.tsx`, `input.tsx`, `scroll-area.tsx`
- Custom variants follow the same convention: `animated-sections-1.tsx`, `vertical-cut-reveal.tsx`

## Where to Add New Code

**New Page (new route):**
- Implementation: `src/pages/NewPage.tsx` (use default export)
- Register: Add lazy import + `<Route>` in `src/App.tsx`
- SEO: Add `<SEOHead title="..." description="..." />` at top of component

**New Homepage Section:**
- Implementation: `src/sections/NewSection.tsx`
- Register: Import and render in `src/pages/Home.tsx`

**New Content/Data:**
- Edit `src/data/business.ts` — add fields to `businessInfo` or extend existing arrays
- If new TypeScript types are needed, add to `src/types/index.ts`

**New Reusable UI Component:**
- Primitive (shadcn-style): `src/components/ui/component-name.tsx`
- Section-level reusable: `src/components/sections/ComponentName.tsx`

**New Custom Hook:**
- Location: `src/hooks/useHookName.ts`
- Naming: `useHookName` (camelCase with `use` prefix)

**New Utility Function:**
- Location: `src/lib/utils.ts` (for small helpers), or `src/lib/newUtil.ts` for larger modules

## Special Directories

**`.planning/`:**
- Purpose: GSD planning docs (phases, codebase analysis)
- Generated: No
- Committed: Yes

**`tailwind-plus/`:**
- Purpose: Reference UI template library — browse for component inspiration
- Generated: No
- Committed: Yes
- Note: Not part of the Vite build; files here are not imported by the app

**`supabase/`:**
- Purpose: Supabase project config and migrations
- Generated: Partially (migration files)
- Committed: Yes

**`node_modules/`:**
- Generated: Yes
- Committed: No

---

*Structure analysis: 2026-03-09*
