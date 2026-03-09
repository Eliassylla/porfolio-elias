# Technology Stack

**Analysis Date:** 2026-03-09

## Languages

**Primary:**
- TypeScript 5.8 - All source files in `src/`
- TSX - React component files throughout `src/components/`, `src/pages/`, `src/sections/`

**Secondary:**
- CSS - `src/index.css`, `src/App.css` (Tailwind utilities + custom vars)

## Runtime

**Environment:**
- Node.js v22.16.0

**Package Manager:**
- npm (primary - `package-lock.json` present)
- bun (secondary - `bun.lock` and `bun.lockb` present, project appears to have been used with both)
- Lockfile: Both `package-lock.json` (npm) and `bun.lockb` (bun) committed

## Frameworks

**Core:**
- React 18.3 - UI framework, entry at `src/main.tsx`
- React Router DOM 6.30 - Client-side routing, configured in `src/App.tsx`

**UI Component System:**
- shadcn/ui - Component library via `components.json`, base color: slate, CSS variables enabled
- Radix UI primitives - Full suite installed (accordion, dialog, dropdown, select, tooltip, etc.)
- Tailwind CSS 4.0 - Utility-first CSS, configured via `@tailwindcss/vite` plugin

**Animation:**
- Framer Motion 12.23 - Used extensively across `src/sections/`, `src/components/`, `src/pages/`
- GSAP 3.13 + `@gsap/react` 2.1 - Installed but less prominently used than Framer Motion

**Forms:**
- React Hook Form 7.61 - Form state management, used in `src/components/forms/ContactForm.tsx`
- Zod 3.25 - Schema validation, paired with `@hookform/resolvers`

**Data Fetching:**
- TanStack React Query 5.83 - Server state management, `QueryClientProvider` wraps app in `src/App.tsx`

**Build/Dev:**
- Vite 5.4 - Build tool and dev server (port 8080), config at `vite.config.ts`
- @vitejs/plugin-react-swc 3.11 - SWC-based React transform for Vite
- TypeScript ESLint 8.38 - Linting, config at `eslint.config.js`

## Key Dependencies

**Critical:**
- `@supabase/supabase-js` 2.98 - Backend-as-a-service client, initialized in `src/integrations/supabase/client.ts`
- `react-router-dom` 6.30 - All page navigation depends on this
- `framer-motion` 12.23 - Core to all UI animations; removing would break 19+ components
- `@radix-ui/*` - Underpins all shadcn/ui interactive components

**UI Utilities:**
- `lucide-react` 0.462 - Icon set used throughout components
- `tailwind-merge` 2.6 - Merges Tailwind class conflicts, used in `src/lib/utils.ts`
- `class-variance-authority` 0.7 - Variant-based component styling
- `clsx` 2.1 - Conditional class joining
- `next-themes` 0.3 - Theme switching (dark/light), `ThemeProvider` in `src/components/providers/ThemeProvider.tsx`
- `sonner` 1.7 - Toast notifications (Sonner provider)

**Content & Display:**
- `swiper` 12.0 - Carousel/slider component
- `embla-carousel-react` 8.6 - Alternative carousel (shadcn carousel component)
- `recharts` 2.15 - Chart library (installed, verify usage)
- `date-fns` 3.6 - Date utilities
- `react-day-picker` 8.10 - Date picker UI

**Dev Tools:**
- `lovable-tagger` 1.1 - Dev-mode component tagging (Lovable.dev platform integration), active only in development via `vite.config.ts`
- `tw-animate-css` 1.4 - Tailwind animation utilities

## Configuration

**Environment:**
- `.env` file present at project root (contents not read)
- Required vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (referenced in `src/integrations/supabase/client.ts`)
- All env vars must be prefixed `VITE_` to be exposed to the client bundle by Vite

**Build:**
- `vite.config.ts` - Main build config; path alias `@` → `./src`; dev server on port 8080
- `tsconfig.json` - Root TypeScript config
- `tsconfig.app.json` - App-specific: target ES2020, strict mode OFF, noImplicitAny OFF
- `tsconfig.node.json` - Node/config files TypeScript config
- `postcss.config.js` - PostCSS config for Tailwind
- `components.json` - shadcn/ui CLI configuration

## Platform Requirements

**Development:**
- Node.js 22+ recommended (v22.16.0 in use)
- npm or bun as package manager

**Production:**
- Static SPA build (`vite build`) — output goes to `dist/`
- Designed for static hosting (no server-side rendering)
- Supabase project required for backend functionality

---

*Stack analysis: 2026-03-09*
