# Testing Patterns

**Analysis Date:** 2026-03-09

## Test Framework

**Runner:** None — no test framework is installed or configured
- No `jest.config.*`, `vitest.config.*`, or any test runner in `package.json`
- No `@testing-library/react`, `vitest`, `jest`, or `playwright` in dependencies
- No `test` script in `package.json` (only `dev`, `build`, `build:dev`, `lint`, `preview`)

**Assertion Library:** Not applicable

**Run Commands:**
```bash
# No test commands available
npm run lint    # Only quality check available
```

## Test File Organization

**Location:** No test files exist in the codebase
**Naming:** No `.test.*` or `.spec.*` files found anywhere under `src/`
**Structure:** No test directories (`__tests__`, `tests`, `e2e`) present

## Test Structure

No tests exist. If adding tests, the recommended approach for this React/Vite/TypeScript stack is Vitest with React Testing Library.

**Recommended setup to add:**
```bash
bun add -D vitest @testing-library/react @testing-library/user-event jsdom
```

**Recommended `vitest.config.ts`:**
```typescript
import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
  },
});
```

## Mocking

**Framework:** Not applicable (no tests exist)

**What to Mock when adding tests:**
- `window.matchMedia` for `useMediaQuery` hook tests
- `window.scrollY` for `useScrollPosition` hook tests
- `fetch` for `ContactForm` submission tests
- `react-router-dom` hooks (`useLocation`, `useNavigate`) for component tests
- Supabase client at `@/integrations/supabase/client`

**What NOT to Mock:**
- `cn()` utility from `@/lib/utils`
- Zod validation schemas
- Pure data functions in `@/data/projects.ts` (getProjectBySlug, getFeaturedProjects, etc.)

## Fixtures and Factories

**Test Data:** No fixtures exist. When adding tests, derive test data from existing type definitions in `src/types/index.ts`:
```typescript
// Example fixture based on Project interface
const mockProject: Project = {
  id: '1',
  title: 'Test Project',
  category: 'landscapes',
  year: '2024',
  slug: 'test-project',
  coverImage: 'https://example.com/image.jpg',
  description: 'Test description',
  images: [],
};
```

**Location:** Place fixtures at `src/test/fixtures/` when created

## Coverage

**Requirements:** None enforced (no coverage tooling configured)
**View Coverage:** Not available

## Test Types

**Unit Tests:** Not present
**Integration Tests:** Not present
**E2E Tests:** Not present (no Playwright, Cypress, or similar)

## Priority Areas for Adding Tests

Given the codebase structure, the highest-value areas to test first are:

**Data helper functions (`src/data/projects.ts`):**
- `getProjectBySlug(slug)` — returns correct project or undefined
- `getProjectsByCategory(category)` — filters correctly, handles 'all'
- `getFeaturedProjects()` — returns first 4 projects
- `getAdjacentProjects(slug)` — returns correct prev/next, handles edges

**Custom hooks (`src/hooks/`):**
- `useMediaQuery` — responds to media query changes
- `useScrollPosition` — updates isScrolled at 50px threshold, tracks direction

**Form validation (`src/components/forms/ContactForm.tsx`):**
- Zod schema: name min/max, email format, message min/max
- Submit: shows loading state, handles fetch error, shows success state

**Component rendering:**
- `ErrorBoundary` — renders fallback on error, passes children when no error
- `PortfolioGrid` — renders correct number of project cards
- `CategoryFilter` (if filter logic is extracted)

## Common Patterns (Recommended)

**Hook Testing:**
```typescript
import { renderHook, act } from '@testing-library/react';
import { useScrollPosition } from '@/hooks/useScrollPosition';

test('isScrolled becomes true after scrolling 50px', () => {
  const { result } = renderHook(() => useScrollPosition());
  act(() => {
    Object.defineProperty(window, 'scrollY', { value: 60 });
    window.dispatchEvent(new Event('scroll'));
  });
  expect(result.current.isScrolled).toBe(true);
});
```

**Error Testing:**
```typescript
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '@/components/ErrorBoundary';

const ThrowingComponent = () => { throw new Error('Test error'); };

test('renders fallback UI on error', () => {
  render(
    <ErrorBoundary>
      <ThrowingComponent />
    </ErrorBoundary>
  );
  expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
});
```

**Async Testing:**
```typescript
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

test('shows success after valid form submission', async () => {
  global.fetch = vi.fn().mockResolvedValue({ ok: true });
  render(<ContactForm />);
  // ... fill fields
  await userEvent.click(screen.getByRole('button', { name: /send/i }));
  await waitFor(() =>
    expect(screen.getByText(/message sent/i)).toBeInTheDocument()
  );
});
```

---

*Testing analysis: 2026-03-09*
