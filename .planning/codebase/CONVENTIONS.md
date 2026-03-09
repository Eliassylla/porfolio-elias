# Coding Conventions

**Analysis Date:** 2026-03-09

## Naming Patterns

**Files:**
- React components use PascalCase: `Header.tsx`, `PortfolioGrid.tsx`, `ScrollReveal.tsx`
- Custom hooks use camelCase with `use` prefix: `useScrollPosition.ts`, `useMediaQuery.ts`, `use-mobile.tsx`
- Data files use camelCase: `projects.ts`, `business.ts`, `photographer.ts`
- Utility files use camelCase: `utils.ts`
- shadcn/ui primitives use kebab-case: `button.tsx`, `alert-dialog.tsx`, `navigation-menu.tsx`
- Custom UI components use PascalCase even in the `ui/` directory: `ScrollReveal.tsx`, `LoadingFallback.tsx`, `SkipToContent.tsx`

**Functions:**
- Named component functions use PascalCase: `export function Header()`, `export function ContactForm()`
- Default-exported page/section functions use PascalCase: `export default function Home()`
- Custom hooks use camelCase with `use` prefix: `useScrollPosition`, `useMediaQuery`
- Helper functions use camelCase: `getProjectBySlug`, `getProjectsByCategory`, `getFeaturedProjects`
- Event handlers are prefixed `handle` or `on`: `handleReset`, `onSubmit`
- Arrow function constants use camelCase: `const handleScroll = () => {}`

**Variables:**
- Boolean state variables use `is`/`has` prefix: `isScrolled`, `isSubmitting`, `isSuccess`, `hasError`, `mobileMenuOpen`
- State setters follow React convention: `setScrollY`, `setIsScrolled`
- Data arrays use plural nouns: `navLinks`, `projects`, `allTags`

**Types/Interfaces:**
- Interfaces use PascalCase: `PortfolioGridProps`, `ScrollRevealProps`, `SEOHeadProps`, `LayoutProps`
- Props interfaces are named `[ComponentName]Props`
- Type aliases use PascalCase: `ProjectCategory`, `AspectRatio`, `ContactFormValues`
- Zod-inferred types use `z.infer<typeof schema>`: `type ContactFormValues = z.infer<typeof contactFormSchema>`

## Code Style

**Formatting:**
- No Prettier config detected — formatting enforced only through ESLint
- Consistent 2-space indentation used throughout
- Single quotes for import strings: `import { useState } from 'react'`
- Double quotes in JSX attribute strings: `className="..."`, `placeholder="..."`
- Trailing commas in multiline objects/arrays (observed throughout)

**Linting:**
- ESLint 9 with flat config format at `eslint.config.js`
- Plugins: `eslint-plugin-react-hooks` (recommended rules), `eslint-plugin-react-refresh`
- TypeScript ESLint with recommended rules
- `@typescript-eslint/no-unused-vars` is explicitly **OFF**
- `react-refresh/only-export-components` is `warn` with `allowConstantExport: true`
- No `@typescript-eslint/no-explicit-any` enforcement (`noImplicitAny: false` in tsconfig)
- TypeScript `strict` mode is **disabled** (`"strict": false` in `tsconfig.app.json`)

## Import Organization

**Order observed:**
1. External library imports (React, framer-motion, lucide-react, react-router-dom)
2. Internal path alias imports using `@/` (components, hooks, data, types, lib)
3. No blank line separation enforced (not linted)

**Path Aliases:**
- `@/*` maps to `./src/*` — always use this alias, never relative paths like `../../`
- Examples: `@/components/ui/button`, `@/hooks/useScrollPosition`, `@/data/business`, `@/lib/utils`, `@/types`

## Styling

**System:** Tailwind CSS v4 utility classes — always use Tailwind, never custom CSS
**Utility helper:** Use `cn()` from `@/lib/utils` to merge conditional classes:
```typescript
import { cn } from '@/lib/utils';
// Usage:
className={cn('base-classes', condition && 'conditional-class', variable)}
```
**Responsive classes:** Mobile-first with `md:` and `lg:` breakpoint prefixes
**Layout constants:** Max widths use `max-w-6xl` or `max-w-7xl` with `mx-auto px-6 lg:px-8`
**Spacing:** Prefer Tailwind spacing scale (`gap-6`, `py-16`, `mt-8`)
**Icon sizing:** Use `size-*` shorthand: `size-4`, `size-5`, `size-12` (not `w-4 h-4`)
**Dark mode:** CSS variable–based via `next-themes`; use semantic tokens like `text-foreground`, `bg-background`, `text-muted-foreground`, `border-border`

## Animation Patterns

**Library:** Framer Motion — use `motion.*` wrapper elements and `AnimatePresence`
**Standard entry animation:**
```typescript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.6, delay: 0.1 }}
```
**Scroll-triggered animation:** Use `<ScrollReveal>` component from `@/components/ui/ScrollReveal`
**Staggered lists:** Apply incremental delay: `delay={index * 0.05}` or `delay={index * 0.08}`

## Error Handling

**Patterns:**
- Class-based `ErrorBoundary` at `src/components/ErrorBoundary.tsx` wraps the entire app in `App.tsx`
- `console.error` used only in dev: guarded with `if (import.meta.env.DEV)`
- Async form submissions use `try/catch/finally` pattern with `setIsSubmitting` flag
- Form errors surfaced via `react-hook-form`'s `form.setError('root', {...})` for submission failures
- Field validation errors displayed inline via `<FormMessage />` from `@/components/ui/form`
- HTTP errors throw with `new Error('...')` and are caught in the surrounding `catch`

## Logging

**Framework:** `console.error` only — no logging library
**Pattern:**
- Log errors only in `ErrorBoundary.componentDidCatch`, guarded by `import.meta.env.DEV`
- No `console.log` or `console.warn` anywhere in the codebase
- Production builds produce zero console output

## Comments

**When to Comment:**
- JSDoc-style block comments on components and hooks to describe purpose
- Inline comments for non-obvious logic (e.g., `// Header should be solid if scrolled more than 50px`)
- Section dividers in JSX using `{/* Section Name */}` comments
- Source attribution for external assets (e.g., `// Photo by X on Unsplash`)

**JSDoc/TSDoc:**
```typescript
/**
 * Custom hook to track scroll position
 * Used for header transparency/solid state transitions
 */
export const useScrollPosition = () => { ... }
```
Short single-purpose description, no param/return docs unless parameters are non-obvious.

## Function Design

**Size:** Functions are small and focused; pages/sections compose smaller components
**Parameters:** Props typed via inline `interface [Name]Props` definition above the component
**Default props:** Use default parameter values: `delay = 0`, `image = ''`, `type = 'website'`
**Return Values:** Components return JSX; hooks return an object with named properties: `{ scrollY, scrollDirection, isScrolled }`

## Module Design

**Exports:**
- Named exports for most components: `export function Header()`, `export function ContactForm()`
- Default exports for pages and sections: `export default function Home()`
- Named exports for data arrays and helper functions in data files

**Barrel Files:** Not used — import directly from the source file path

## Form Pattern

All forms use react-hook-form + zod:
```typescript
const schema = z.object({ field: z.string().min(2) });
type FormValues = z.infer<typeof schema>;
const form = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: {...} });
```
Use shadcn `<Form>`, `<FormField>`, `<FormItem>`, `<FormLabel>`, `<FormControl>`, `<FormMessage>` wrappers.

---

*Convention analysis: 2026-03-09*
