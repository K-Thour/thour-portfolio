---
title: 'Story 2.1: Developer Hero Command Center with Terminal & Ambient Effects'
type: 'feature'
created: '2026-11-08'
status: 'completed'
baseline_commit: '2d36e85a5816ec055c25ae8cc05b20c2457f6cfd'
route: 'dispatch'
review_loop_iteration: 1
context:
  - '{project-root}/.agents/skills/apple-design/SKILL.md'
  - '{project-root}/_bmad-output/implementation-artifacts/epic-2-context.md'
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** The home hero section does not display the interactive `TerminalWindow`, leaving the right-hand column limited to the profile avatar, and `TerminalWindow` lacks functional tab switching, syntax highlighting, copy-to-clipboard capabilities, and theme-adaptive Apple glass styling. Furthermore, hero CTAs lack standardized min 44x44px touch targets and tactile spring feedback.

**Approach:** Upgrade `TerminalWindow.tsx` into an Apple-grade interactive glassmorphic terminal featuring functional tab switching (`developer.ts`, `mission.sh`, `skills.json`), syntax highlighting, copy-to-clipboard button with visual feedback, and dual-theme tokens. Integrate `TerminalWindow` into `HomeHero.tsx` with seamless toggling or bento-layout presentation alongside `HeroAvatarLoader`, optical typography tracking (`-0.02em`), and tactile CTA buttons (`scale: 0.97`, >= 44x44px). Add unit test suites for `TerminalWindow` and `HomeHero`.

## Boundaries & Constraints

**Always:**
- Strictly preserve existing routes and links: `/contact` and `/projects`.
- Maintain `UserContext` integration displaying developer name and custom greetings.
- Implement Apple glass materials: `backdrop-filter: blur(20px) saturate(180%)` with dual-theme hairline borders (`border-white/10` in dark mode, `border-black/10` in light mode).
- Use `motion/react` critically damped spring physics for tab switching and tactile feedback (`scale: 0.97` on pointer-down).
- Guarantee WCAG 2.1 AA accessibility (min 44x44px touch targets, visible focus rings, ARIA tabs and panel relationships).
- Respect `prefers-reduced-motion` across all ambient effects (CodeRain, particles, snowflakes).

**Never:**
- Never remove or disrupt existing component exports (`HomeHero`, `TerminalWindow`, `CodeRain`, `HeroAvatarLoader`).
- Never introduce CPU layout thrashing during animations or code rain.
- Never hardcode user data that should resolve dynamically from `UserContext`.
- Never produce horizontal page overflow or cumulative layout shift (CLS < 0.05).

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Tab switching | User clicks a terminal tab (`developer.ts`, `mission.sh`, `skills.json`) | Active tab indicator animates with layout spring; terminal content updates with syntax-highlighted code | Default to first tab if invalid |
| Copy to clipboard | User clicks copy button in TerminalWindow | Code content of active tab copied to clipboard; button transforms to checkmark with "Copied!" for 2s | Fallback gracefully if `navigator.clipboard` is unavailable |
| Hero view mode toggle | User toggles between Terminal and Avatar view | Smooth spring transition switches view between interactive terminal and avatar crest | Retain state without resetting terminal tabs |
| CTA button tap | User presses pointer down on "View Projects" or "Contact Me" | Instant `scale: 0.97` tactile feedback; navigates on release | Cancel scale if dragged away |
| Reduced motion active | System preference `prefers-reduced-motion: reduce` | Code rain, particles, and rotating rings suppressed; tab transitions cross-fade instantly | Accessible static fallback |

</frozen-after-approval>

## Code Map

- `src/app/components/TerminalWindow.tsx` -- Terminal window component to refactor with tab switching, syntax highlighting, copy-to-clipboard, and dual-theme Apple glass styling.
- `src/app/components/TerminalWindow.test.tsx` -- New unit test suite verifying tab switching, copy action, theme adaptation, and syntax display.
- `src/app/components/home/HomeHero.tsx` -- Hero section integrating TerminalWindow, optical typography, dynamic greeting, and tactile CTAs.
- `src/app/components/home/HomeHero.test.tsx` -- New unit test suite verifying dynamic greeting, CTAs, view toggling, and accessibility.
- `src/app/components/home/HeroAvatarLoader.tsx` -- Profile avatar loader with shimmer skeleton and rotating energy rings.
- `src/app/components/CodeRain.tsx` -- Ambient matrix code rain canvas/overlay backdrop.

## Tasks & Acceptance

**Execution:**
- [x] `src/app/components/TerminalWindow.tsx` -- Refactor to Apple glass terminal with tab switching (`developer.ts`, `mission.sh`, `skills.json`), syntax highlighting, copy-to-clipboard button with copied state, traffic light window controls, and dual-theme tokens.
- [x] `src/app/components/TerminalWindow.test.tsx` -- Create unit test suite covering tab switching, clipboard copying, syntax code rendering, and theme adaptation.
- [x] `src/app/components/home/HomeHero.tsx` -- Integrate `TerminalWindow` with interactive command center view controls, apply optical typography (`tracking-tight`), and update CTA buttons with `whileTap={{ scale: 0.97 }}` and min 44x44px touch targets.
- [x] `src/app/components/home/HomeHero.test.tsx` -- Create unit test suite verifying user greeting, CTA buttons, terminal integration, and reduced motion fallback.

**Acceptance Criteria:**
- Given the user lands on `/`, when `HomeHero` renders, then it displays dynamic greetings from `UserContext`, role typography with optical letter tracking, and an interactive glassmorphic `TerminalWindow`.
- Given the user interacts with `TerminalWindow`, when clicking tabs, then the active tab transitions with layout springs and renders formatted code for that tab.
- Given the user clicks the copy button in `TerminalWindow`, when clicked, then the active tab's code copies to clipboard and displays temporary confirmation feedback.
- Given the user interacts with hero CTA buttons ("View Projects", "Contact Me"), when pressed down, then they immediately respond with `scale: 0.97` tactile feedback and adhere to min 44x44px touch targets.

## Implementation Notes

- Refactored `TerminalWindow.tsx` into an Apple glassmorphic interactive terminal with macOS traffic light controls, tab pills (`developer.ts`, `mission.sh`, `skills.json`) animated via layout spring indicator, tokenized dual-theme syntax highlighting, line numbers, blinking terminal cursor, status bar, and accessible copy-to-clipboard button with visual feedback and graceful fallback.
- Added `TerminalWindow.test.tsx` with 10 unit tests covering tabs, syntax rendering, clipboard copy, theme adaptation, accessibility attributes (ARIA tablist, tab, tabpanel), and reduced motion handling.
- Enhanced `HomeHero.tsx` with a command center view switcher (`Terminal` vs `Avatar`), dynamic time-based greeting and developer name from `UserContext`, optical letter tracking (`-0.02em` on headings), and tactile CTA buttons (`scale: 0.97` on press, >= 44x44px touch targets).
- Added `HomeHero.test.tsx` with 8 unit tests verifying dynamic greetings, typography tracking, CTAs, command center view toggling, terminal tab state preservation across toggles, theme adaptation, and reduced motion.
- Updated `HeroAvatarLoader.tsx` with `motion-reduce:animate-none` on rotating tracks, halos, and radar sweep for accessible reduced motion compliance.

## Spec Change Log

## Review Triage Log

### Review Loop 1 (Triaged & Dispatched for Remediation)
- **Rules of Hooks**: Top-level `useContext(ThemeContext)` and `useContext(UserContext)` to replace `try/catch` in `TerminalWindow.tsx`.
- **Keyboard Navigation (ARIA APG)**: Added `ArrowRight`, `ArrowLeft`, `Home`, and `End` arrow key navigation for terminal tabs.
- **Uncontrolled-with-callback State**: Fixed `handleSelectTab` to update internal tab state when uncontrolled even if `onTabChange` is provided; reset `copied` state on tab switch.
- **Clipboard Resilience**: Handled `navigator.clipboard.writeText` promise rejection with seamless fallback to `document.execCommand`.
- **Touch Target Size**: Added `min-h-[44px]` to tab buttons for WCAG 2.1 AA 44x44px target size compliance.
- **Apple Glass**: Added `backdrop-saturate-[180%]` to terminal container.
- **WCAG AA Contrast**: Dark mode comments updated to `text-slate-400`, light mode numbers updated to `text-amber-700`.
- **Scroll & Focus**: Added `overflow-y-auto` and `tabIndex={0}` to terminal code viewport.
- **Typography & Hero Polish**: Optical tracking `-0.01em` on role subtitle, image preload unmount guard, CLS stabilization to `min-h-[440px] sm:min-h-[480px]`, `invisible` class on light mode `CodeRain`.
- **Test Enhancements**: Added tests for keyboard arrow navigation, clipboard rejection fallback, tab touch target sizing, copy state reset, role typography tracking, and reduced motion animation suppression.

## Design Notes

Apple glass terminal styling:
- Terminal window container: `rounded-2xl border backdrop-blur-xl shadow-2xl`, with `bg-slate-950/85 border-white/[0.12]` in dark mode and `bg-white/90 border-black/[0.08]` in light mode.
- Window controls: macOS traffic lights (red, yellow, green dots with subtle border).
- Tab pills: `rounded-lg px-3 py-1.5 text-xs font-mono font-medium transition-colors` with `whileTap={{ scale: 0.97 }}` and layout spring active pill indicator.
- Copy button: `p-1.5 rounded-lg border text-xs flex items-center gap-1.5 transition-colors`.

## Verification

**Commands:**
- `npm run test` -- expected: All Vitest test suites pass, including new `TerminalWindow.test.tsx` and `HomeHero.test.tsx`.
- `npm run typecheck` -- expected: `tsc --noEmit` exits with 0 errors.
- `npm run lint` -- expected: ESLint passes with 0 errors.
- `npm run build` -- expected: `vite build` completes successfully.

**Manual checks (if no CLI):**
- Verify terminal tab switching, copy-to-clipboard behavior, hero CTA responsiveness, and mobile viewport adaptability.
