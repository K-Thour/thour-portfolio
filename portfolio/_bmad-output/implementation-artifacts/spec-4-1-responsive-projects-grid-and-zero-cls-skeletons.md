# Story 4.1: Responsive Projects Grid & Zero-CLS Skeletons

## Status: completed

## Intent
Transform the `/projects` page and components (`Projects.tsx`, `ProjectsHeader.tsx`, `ProjectCard.tsx`, `ProjectsCta.tsx`) to Apple design standards:
1. **ProjectsHeader**:
   - Optical typography tracking (`-0.02em` on `h1`), dual-theme badge with glass backdrop.
   - Safe `useContext(ThemeContext)` without throwing outside providers.
   - Reduced motion support.
2. **ProjectCard**:
   - Authentic Apple glass bento cards (`backdrop-blur-xl backdrop-saturate-[180%]`, dual-theme hairline borders, top hairline highlight).
   - Image fallback on error to prevent broken image icons.
   - Hover action links for GitHub and Live Demo with min 44×44px hit targets, accessible `aria-label`s, and `whileTap={{ scale: 0.97 }}` spring feedback.
   - Smooth card hover lift (`whileHover={{ y: -4, scale: 1.01 }}`).
   - Safe top-level `useContext(ThemeContext)`.
3. **ProjectsCta**:
   - Apple glass conversion card with dual-theme gradient accents.
   - Standardized CTA button with min 44×44px touch target, optical tracking, and tactile press spring.
4. **Projects Page**:
   - Zero-CLS skeleton grid during API loading.
   - Graceful fallback error handling when `fetchProjects` fails.
   - Safe top-level `useContext(ThemeContext)`.
5. **Unit Tests**:
   - `src/app/pages/Projects.test.tsx`
   - `src/app/components/projects/ProjectCard.test.tsx`

## Quality Gates
- 0 TypeScript errors
- 0 ESLint errors
- 100% Vitest test pass rate
- Successful production build

