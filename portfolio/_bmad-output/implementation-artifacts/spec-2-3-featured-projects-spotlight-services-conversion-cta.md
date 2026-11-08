---
title: 'Story 2.3: Featured Projects Spotlight, Services Cards & Bottom Conversion CTA'
type: 'feature'
created: '2026-11-08'
status: 'completed'
baseline_commit: 'b8932491b1cf11a1f0cb1939cc110809eeed889a'
route: 'dispatch'
review_loop_iteration: 0
context:
  - '{project-root}/.agents/skills/apple-design/SKILL.md'
  - '{project-root}/_bmad-output/implementation-artifacts/epic-2-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:**
The home page's final three sections (`HomeFeaturedProjects.tsx`, `Services.tsx`, `HomeCta.tsx`) do not meet Apple design standards:
1. `HomeFeaturedProjects.tsx` lacks Apple glass cards (`backdrop-blur-xl saturate-[180%]`), lacks image error fallbacks, lacks min 44x44px touch targets on GitHub/Demo overlay icons, and has no dedicated unit test suite.
2. `Services.tsx` and `ServiceCard.tsx` use basic card styling with harsh borders, lack Apple glass material depth, and lack comprehensive unit test coverage.
3. `HomeCta.tsx` buttons use basic CSS `active:scale-[0.98]` without tactile `motion/react` spring physics, lack standardized min 44x44px touch targets across viewports, and have no unit test suite.

**Approach:**
1. Upgrade `HomeFeaturedProjects.tsx`:
   - Apple glass card styling (`backdrop-blur-xl backdrop-saturate-[180%]`, dual-theme hairline borders).
   - Min 44x44px touch targets on external action links (GitHub & Live Demo) with accessible `aria-label`s.
   - Tactile card hover spring (`whileHover={{ y: -4, scale: 1.01 }}`) and CTA press spring (`whileTap={{ scale: 0.97 }}`).
   - Optical letter tracking on section header (`tracking-tight`, `-0.02em`).
   - Image fallback on error to prevent broken image icons.
2. Upgrade `Services.tsx` and `ServiceCard.tsx`:
   - Apple glass bento cards with dual-theme hairline borders, inner glow, and smooth spring hover feedback (`whileHover={{ y: -3, scale: 1.02 }}`).
   - Safe top-level `useContext(ThemeContext)` without hook violations.
   - High-contrast feature list with accessible check icons.
   - Optical typography tracking on section header.
3. Upgrade `HomeCta.tsx`:
   - High-impact glassmorphic conversion card with dual-theme gradient accents and subtle light-catcher borders.
   - Dynamic user email from `UserContext` with robust fallback.
   - Standardized tactile CTA buttons with `whileTap={{ scale: 0.97 }}` and min 44x44px touch targets.
   - Safe top-level `useContext(ThemeContext)` and `useContext(UserContext)`.
4. Author comprehensive unit test suites:
   - `src/app/components/home/HomeFeaturedProjects.test.tsx`
   - `src/app/components/Services.test.tsx`
   - `src/app/components/home/HomeCta.test.tsx`

## Boundaries & Constraints

**Always:**
- Strictly preserve existing routes (`/projects`, `/contact`, `/services/:id`).
- Maintain compatibility with `fetchProjects()` and `fetchServices()` API return contracts.
- Implement Apple glass materials: `backdrop-filter: blur(20px) saturate(180%)` with dual-theme hairline borders (`border-white/10` in dark, `border-black/10` in light).
- Guarantee WCAG 2.1 AA accessibility (min 44x44px touch targets, 4.5:1 text contrast, visible focus rings).
- Respect `prefers-reduced-motion` across all cards, hover springs, and transitions.

**Never:**
- Call hooks inside `try/catch` or conditionals.
- Hardcode email or projects without `UserContext` / API integration.

</frozen-after-approval>

## Tasks

- [ ] `src/app/components/home/HomeFeaturedProjects.tsx` -- Redesign with Apple glass cards, tactile spring interactions, min 44x44px touch targets on action links, optical tracking, and image fallback.
- [ ] `src/app/components/home/HomeFeaturedProjects.test.tsx` -- Author unit test suite verifying projects fetching, skeleton loading, project card rendering, external links, and reduced motion.
- [ ] `src/app/components/service/ServiceCard.tsx` & `src/app/components/Services.tsx` -- Redesign with Apple glass bento cards, tactile hover feedback, high-contrast features, and safe context consumption.
- [ ] `src/app/components/Services.test.tsx` -- Author unit test suite verifying services fetching, skeleton loading, card rendering, and navigation links.
- [ ] `src/app/components/home/HomeCta.tsx` -- Redesign with high-impact Apple glass conversion card, dynamic `UserContext` email, tactile CTA buttons (>= 44x44px), and optical typography.
- [ ] `src/app/components/home/HomeCta.test.tsx` -- Author unit test suite verifying dynamic email, contact navigation, tactile touch targets, and reduced motion.

**Acceptance Criteria:**
- Given the user scrolls to Featured Projects on the home page, when projects load, it renders Apple glass cards with responsive thumbnails, title, tags, and accessible min 44x44px action links.
- Given the user scrolls to Services, when services load, it displays Apple glass bento service cards with tactile hover transitions, feature highlights, and navigation links.
- Given the user reaches the bottom conversion CTA, when rendered, it displays personalized email from `UserContext`, optical typography tracking, and tactile CTA buttons responding immediately with `scale: 0.97` press feedback.
- Given `prefers-reduced-motion` is enabled, all animations, hover scale transforms, and bouncing transitions are suppressed across all three sections.

## Implementation Notes

## Spec Change Log

## Review Triage Log

## Verification

**Commands:**
- `npm test` -- expected: All Vitest test suites pass, including new test files.
- `npm run typecheck` -- expected: `tsc --noEmit` exits with 0 errors.
- `npm run lint` -- expected: ESLint passes with 0 errors.
- `npm run build` -- expected: `vite build` completes successfully.
