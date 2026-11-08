---
title: 'Story 2.2: Apple Bento Grid for Tech Stack & Real-Time Stats'
type: 'feature'
created: '2026-11-08'
status: 'completed'
baseline_commit: '62df92964b9f1983cdcef6b401ef0c5da0c47577'
route: 'dispatch'
review_loop_iteration: 1
context:
  - '{project-root}/.agents/skills/apple-design/SKILL.md'
  - '{project-root}/_bmad-output/implementation-artifacts/epic-2-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:**
The home page's `Stats.tsx` and `TechStack.tsx` currently lack Apple-grade bento aesthetics, interactive filtering, and tactile feedback:
1. `Stats.tsx` cards use generic border styling, lack Apple glass materials (`backdrop-blur-xl saturate-[180%]`), do not support reduced motion for count-up animation, and lack dedicated unit test coverage.
2. `TechStack.tsx` only offers an un-categorized infinite horizontal marquee with no ability for recruiters or clients to filter by domain (e.g. Frontend, Backend, Database, Cloud/DevOps), lacks Apple layout spring tab indicators, lacks interactive bento grid presentation, and lacks comprehensive unit test coverage.
3. `TechStackSkeleton.tsx` only renders horizontal pills, causing layout shifts if loaded in a grid container.

**Approach:**
1. Upgrade `Stats.tsx` into an Apple glass bento metrics section:
   - Glassmorphic card styling with dual-theme hairline borders (`border-white/10` in dark, `border-black/10` in light) and subtle inner glow.
   - Dynamic values from `UserContext` (`experience`, `completedProjects`, `happyClients`, `solvedProblems`) with robust numerical fallbacks.
   - Count-up animation with `easeOutExpo` that immediately resolves without animation when `prefers-reduced-motion` is active.
   - Tactile hover/tap interactions (`whileHover={{ y: -3, scale: 1.02 }}`, `whileTap={{ scale: 0.98 }}`).
   - Safe top-level `useContext(ThemeContext)` and `useContext(UserContext)`.
2. Upgrade `TechStack.tsx` into an interactive Apple Bento Grid & Stream:
   - Dynamic category extraction ("All", "Frontend", "Backend", "Database", "DevOps/Tools", "Mobile", etc.).
   - Apple segmented pill filter bar with critically damped layout spring active indicator (`layoutId="activeTechCategory"`, `bounce: 0, duration: 0.35s`).
   - WAI-ARIA tablist accessibility with roving `tabIndex` and `ArrowRight` / `ArrowLeft` / `Home` / `End` keyboard navigation.
   - Dual presentation modes: "Bento Grid" (responsive 2-to-4 column bento layout with category badges, icons, and spring hover animations) and "Marquee Stream" (infinite marquee row for cinematic glanceability).
   - Tactile press feedback (`scale: 0.97`, >= 44x44px touch targets).
   - Accessible error state with tactile Retry button.
   - Upgrade `TechStackSkeleton.tsx` with bento grid shimmer skeleton.
3. Author comprehensive unit test suites:
   - `src/app/components/Stats.test.tsx` verifying count-up, UserContext values, reduced motion instant render, and theme styling.
   - `src/app/components/TechStack.test.tsx` verifying category filtering, layout spring indicator, grid vs marquee toggle, error retry, keyboard navigation, and reduced motion.

## Boundaries & Constraints

**Always:**
- Strictly preserve existing routes and exports.
- Maintain compatibility with `fetchTechnologies()` API response format.
- Implement Apple glass materials: `backdrop-filter: blur(20px) saturate(180%)` with dual-theme hairline borders.
- Adhere to WCAG 2.1 AA accessibility (min 44x44px touch targets, 4.5:1 text contrast, roving `tabIndex` keyboard navigation).
- Respect `prefers-reduced-motion` across marquee scrolling, count-up animation, and card hover springs.

**Never:**
- Call hooks inside `try/catch` or conditionals.
- Introduce cumulative layout shift (CLS) when toggling categories or view modes.
- Hardcode user stats; always integrate with `UserContext`.

</frozen-after-approval>

## Tasks

- [x] `src/app/components/Stats.tsx` -- Redesign with Apple glass bento cards, dynamic `UserContext` telemetry, reduced motion instant display, and tactile springs.
- [x] `src/app/components/Stats.test.tsx` -- Create unit test suite verifying stats values, count-up, reduced motion, theme switching, and accessibility attributes.
- [x] `src/app/components/ui/skeleton/TechStackSkeleton.tsx` -- Upgrade skeleton to support grid mode alongside marquee mode with smooth shimmer.
- [x] `src/app/components/TechStack.tsx` -- Implement Apple Bento Grid with category filter pills, layout spring indicator, WAI-ARIA keyboard navigation, dual view mode (Bento vs Marquee), tactile buttons, and retry recovery.
- [x] `src/app/components/TechStack.test.tsx` -- Create comprehensive unit test suite verifying category filtering, keyboard navigation, error recovery, view mode toggle, and reduced motion.

**Acceptance Criteria:**
- Given the user views the home page, when `Stats` renders, it displays developer stats with smooth count-up animation, Apple glass styling, and adapts instantly without animation when `prefers-reduced-motion` is enabled.
- Given the user views `TechStack`, when technologies load, it renders an Apple segmented category filter bar and a responsive bento grid of technology cards with icons, titles, and category tags.
- Given the user navigates category filters via keyboard, when pressing arrow keys (`ArrowRight`, `ArrowLeft`), focus moves to adjacent filters and activates them with layout spring pill transitions.
- Given the user clicks view toggle ("Grid" vs "Marquee"), when toggled, it smoothly transitions between the structured bento grid and the continuous marquee stream without layout jumping.
- Given a network error occurs during technology fetching, when the error state renders, an accessible retry button allows the user to re-trigger the fetch with tactile press feedback.

## Implementation Notes

- **Apple Glass Bento Cards**:
  - Upgraded `Stats.tsx` and `TechStack.tsx` to Apple glass bento cards using `backdrop-blur-xl backdrop-saturate-[180%]` with dual-theme hairline borders (`border-white/10` in dark, `border-black/10` in light) and top hairline light catchers (`bg-gradient-to-r from-transparent via-white/20 to-transparent`).
  - Tactile spring interactions applied: `whileHover={{ y: -3, scale: 1.02 }}`, `whileTap={{ scale: 0.98 }}` with critically damped spring transitions (`type: 'spring', bounce: 0, duration: 0.35`).
- **Telemetry & Context Fallbacks**:
  - `Stats.tsx` consumes dynamic metrics from `UserContext` (`experience`, `completedProjects`, `happyClients`, `solvedProblems`) with default fallback values (5, 50, 30, 200).
  - Both components consume `ThemeContext` and `UserContext` at the top level without `try/catch` wrapping hooks, providing safe fallbacks when rendered outside providers.
- **Count-up Animation & Reduced Motion**:
  - `Stats.tsx` executes an `easeOutExpo` count-up animation over 1400ms.
  - Automatically checks `useReducedMotionConfig()` and `useReducedMotion()`; when reduced motion is preferred, count resolves immediately to target values without running animation frames.
- **TechStack Dynamic Category Filtering & Apple Segmented Control**:
  - Dynamically extracts unique category tags from fetched technologies (`All`, `Frontend`, `Backend`, `Database`, `DevOps`, etc.).
  - Apple segmented filter pills with layout spring active pill indicator (`layoutId="activeTechCategory"`).
  - Accessible WAI-ARIA tablist APG compliance: roving `tabIndex={category === activeCategory ? 0 : -1}`, with arrow navigation (`ArrowRight`, `ArrowLeft`, `Home`, `End`).
- **Dual Presentation Modes (Bento Grid vs Marquee Stream)**:
  - User can toggle between responsive Bento Grid (`grid-cols-2 sm:grid-cols-3 md:grid-cols-4`) and Marquee Stream via an Apple segmented pill toggle.
  - In Marquee mode with reduced motion enabled, switches from infinite auto-scroll (`animate-scroll`) to an accessible static scrollable container.
- **Skeleton Shimmer Modes**:
  - Upgraded `TechStackSkeleton.tsx` with `mode="grid"` (default) and `mode="marquee"` to eliminate layout shifts (CLS) when loading.
- **Testing & Quality Gates**:
  - `Stats.test.tsx`: 6 comprehensive tests verifying telemetry, count-up animation, reduced motion, dark/light themes, and semantic accessibility.
  - `TechStack.test.tsx`: 17 comprehensive tests verifying skeletons, dynamic category extraction, filtering, keyboard navigation, view mode toggle, error states, retry recovery, and empty states.
  - Verification: 100% tests pass (14 test files, 128 tests), `npm run typecheck`, `npm run lint`, and `npm run build` all pass with 0 errors.

## Spec Change Log

## Review Triage Log

### Review Loop 1 (Triaged & Dispatched for Remediation)
- **Reduced Motion Resolution**: Refined `shouldReduceMotion` boolean evaluation to prevent Framer Motion default `{ reducedMotion: "never" }` from masking OS device preferences.
- **Accessibility & Focus Indicators**: Added `focus-visible:ring-2` to `#tech-display-panel` and interactive buttons.
- **Tabpanel Resilience**: Ensured `#tech-display-panel` remains in the DOM with an Apple glass empty state card when 0 items match, avoiding orphaned `aria-controls`.
- **Marquee A11y & Pause**: Added pause-on-hover / pause-on-focus (`hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]`) and separated visual clone tracks with `aria-hidden="true"`.
- **Metrics ARIA Stability**: Set `aria-label` to final target `value` on `StatCard` to avoid 60Hz DOM mutation churn and prevent initial `0+` screen reader announcement; added `aria-hidden="true"` on the animated numbers.
- **Transition Scoping**: Scoped top-level delay in `StatCard` to entrance animations (`opacity`, `y`) so hover/tap spring feedback doesn't inherit initial delay.
- **Data Hygiene**: Trimmed category and technology names on ingestion; added `type="button"` across all buttons; added `tracking-tight` to heading.

## Verification

**Commands:**
- `npm test` -- expected: All Vitest test suites pass, including new `Stats.test.tsx` and `TechStack.test.tsx`.
- `npm run typecheck` -- expected: `tsc --noEmit` exits with 0 errors.
- `npm run lint` -- expected: ESLint passes with 0 errors.
- `npm run build` -- expected: `vite build` completes successfully.
