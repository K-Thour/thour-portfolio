---
stepsCompleted: [1, 2, 3, 4]
inputDocuments:
  - "src/app/Root.tsx"
  - "src/app/routes.tsx"
  - "src/app/pages/Home.tsx"
  - "src/app/pages/About.tsx"
  - "src/app/pages/Projects.tsx"
  - "src/app/pages/ProjectDetail.tsx"
  - "src/app/pages/ServiceDetail.tsx"
  - "src/app/pages/Contact.tsx"
  - "src/app/components/Navigation.tsx"
  - "src/app/components/ui/ChatBot.tsx"
  - "src/services/api.ts"
  - ".agents/skills/apple-design/SKILL.md"
  - ".agents/skills/ui-ux-pro-max/SKILL.md"
  - ".agents/skills/vercel-react-best-practices/SKILL.md"
---

# portfolio - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for the redesign of the client-facing Developer Portfolio web application (`portfolio`). It unifies existing production features with **Apple Design** principles (WWDC fluid interfaces, critically damped spring physics, translucent glass materials), **UI/UX Pro Max** design intelligence (accessible typography, tactile spacing, coherent color schemes, responsive ergonomics), and **Vercel React Best Practices** (zero waterfalls, render memoization, bundle optimization), while strictly preserving the existing codebase directory and architectural structure.

## Requirements Inventory

### Functional Requirements

- **FR1: Dynamic Root Shell & System Controls**: Global dual-theme engine (Avengers dark mode vs Norse/God-of-War light mode), ambient pointer cursor glow, interactive initial loader (`GameLoader`), top scroll progress indicator, floating conversational AI assistant (`ChatBot`), dynamic SEO head metadata, and floating top navigation bar (`Navigation`) with active route indicator and mobile sheet menu.
- **FR2: Interactive Home & Hero Mission Control**: Hero header (`HomeHero`) with personalized greeting (`UserContext`), interactive terminal window (`TerminalWindow`), code rain (`CodeRain`), interactive code snippet (`CodeSnippet`), avatar loader (`HeroAvatarLoader`), quick portfolio stats (`Stats`), categorized tech stack grid with filter pills and proficiency metrics (`TechStack`), featured projects spotlight carousel (`HomeFeaturedProjects`), services overview cards (`Services`), and bottom conversion CTA (`HomeCta`).
- **FR3: Deep Dive About & Professional Philosophy**: About hero narrative (`AboutHero`), quantitative career milestones (`AboutStats`), categorized technical skills matrix (`AboutSkills`), and problem-solving mission statement / engineering manifesto (`AboutMission`).
- **FR4: Filterable Projects Showcase**: Live projects gallery (`Projects`) fetched from API with fallback support, zero-CLS skeleton loading state (`ProjectSkeletonCard`), responsive project cards (`ProjectCard`) with tags and external links, and bottom projects CTA (`ProjectsCta`).
- **FR5: Project Case Study & Deep Dive**: Dynamic detail view at `/projects/:projectId` with smart historical back navigation (`BackButton`), rich header metadata (`ProjectHeader`), aspect-ratio preserved hero media, full mission overview description, itemized features/tech-stack/challenges grid (`ProjectFeatures`), and quantified outcomes/testimonials CTA (`ProjectResults`).
- **FR6: Services Catalog & Detailed Offerings**: Dynamic service detail view at `/services/:serviceId` with smart back navigation, hero header (`ServiceHeader`), full description, feature architecture (`ServiceFeatures`), key benefits checklist, commercial terms grid (pricing, duration, deliverables), and consultation process roadmap (`ServiceProcess`).
- **FR7: Direct Contact & Inquiry Pipeline**: Welcoming contact header (`ContactHeader`), direct communication channels and social links (`ContactInfo`), and interactive lead submission form (`ContactForm`) with field validation, submission state, and toast feedback.
- **FR8: System Resilience & Error Boundaries**: Contextual 404 Not Found page (`NotFound`) with interactive error visual and suggested links, and root error boundary (`ErrorPage`) with exception diagnostics and recovery controls.

### NonFunctional Requirements

- **NFR1: Strict Code Structure Preservation**: Strictly maintain the existing project hierarchy under `src/app/...`. Retain all existing component file names, locations, and exported names (`src/app/components/*`, `src/app/pages/*`, `src/app/context/*`, `src/app/routes.tsx`, `src/services/api.ts`). Do not introduce arbitrary new root folder restructuring or rename existing routes.
- **NFR2: Apple Fluid Interfaces & Spring Physics (via /apple-design)**: Replace linear or rigid CSS transitions with Apple-grade spring physics using `motion/react`. Default to critically damped springs (`damping: 1.0`, response `0.3s–0.4s`) for natural settle without jittery oscillation. Reserve slight under-damped bounce (`damping: ~0.8`) strictly for momentum-driven gestures. Ensure instant tactile feedback on pointer-down (`:active` with `scale: 0.97` or `scale: 0.98`), interruptible transitions from live presentation values, and spatial consistency.
- **NFR3: Apple Translucent Materials & Depth Hierarchy (via /apple-design & /ui-ux-pro-max)**: Elevate navigation, floating headers, chatbot window, and overlay cards into authentic Apple glass surfaces using `backdrop-filter: blur(20px) saturate(180%)`. Implement hairline border highlights (`1px solid rgba(255, 255, 255, 0.12)` in dark mode and `1px solid rgba(0, 0, 0, 0.06)` in light mode). Maintain clear material weight hierarchy without stacking competing blurred layers.
- **NFR4: UI/UX Pro Max Visual Intelligence & Ergonomics (via /ui-ux-pro-max)**: Ensure strict WCAG 2.1 AA compliance (>= 4.5:1 for body copy, >= 3:1 for large display headers and form controls) across both Avengers Dark and Light themes. Guarantee min 44×44px interactive hit area for all buttons and toggles. Apply optical typography with size-specific letter tracking (`-0.02em` on display headings, `1.5` line-height on body text). Maintain 8px grid spacing and zero horizontal overflow (CLS < 0.05).
- **NFR5: Vercel React Best Practices (via vercel-react-best-practices)**: Eliminate data fetching waterfalls across page routes and components using parallel queries (`Promise.all`). Optimize re-renders by deferring reads, memoizing expensive components, and hoisting static JSX/objects. Utilize functional `setState` for stable callbacks. Optimize bundle size by avoiding heavy barrel imports and animating only compositor properties (`transform`, `opacity`).

### Additional Requirements

- **ARCH-1: Routing & Navigation**: Keep React Router v7 (`react-router`) with `createBrowserRouter`, preserving all existing route paths: `/`, `/about`, `/projects`, `/projects/:projectId`, `/services/:serviceId`, `/contact`, and `*`.
- **ARCH-2: API & Services Layer**: Retain centralized Axios HTTP client in `src/services/api.ts` with all endpoints (`fetchProjects`, `fetchProjectById`, `fetchServiceById`, `sendChatMessage`, `submitContactForm`), preserving backend integration contracts.
- **ARCH-3: State & Context Layer**: Maintain `ThemeContext` (`avengers` dark vs light) and `UserContext` without breaking provider hierarchy in `Root.tsx`.
- **ARCH-4: Styling Architecture**: Retain Tailwind CSS v4 setup (`@tailwindcss/vite` 4.1.12), ensuring all Apple glassmorphism and theme CSS variables integrate smoothly into `src/styles/` (`theme.css`, `index.css`, `tailwind.css`).
- **ARCH-5: Quality & Build Hygiene**: Ensure zero TypeScript errors (`tsc --noEmit`), zero ESLint regressions (`npm run lint`), and clean test passes (`npm run test`).

### UX Design Requirements

- **UX-DR1: Translucent Apple Navigation & Responsive Menu**: Redesign `Navigation.tsx` into a floating Apple glass pill with `backdrop-filter: blur(20px)`, smooth active route indicator, instant touch-down feedback, and an interruptible spring-animated mobile sheet menu.
- **UX-DR2: Interactive Hero & Developer Command Center**: Modernize `HomeHero.tsx`, `HeroAvatarLoader.tsx`, `TerminalWindow.tsx`, and `CodeRain.tsx` with refined typography, responsive glass frames, and tactile spring controls.
- **UX-DR3: Apple-Grade Interactive Bento Grid for Tech Stack & Stats**: Upgrade `TechStack.tsx` and `Stats.tsx` with Apple-style bento card aesthetics, category pill filters with layout spring animations, and smooth icon hover/press micro-interactions.
- **UX-DR4: Showcase Project Cards & Detail Experience**: Elevate `ProjectCard.tsx` and `ProjectDetail.tsx` with immersive image aspect-ratio scaling, tag pills, fluid skeleton transitions, and smart back navigation.
- **UX-DR5: Services & Value Proposition Elevation**: Polish `Services.tsx` and `ServiceDetail.tsx` with tactile benefit badges, glassmorphic pricing and deliverables cards, and clear consultation process roadmaps.
- **UX-DR6: Contact Experience & Form Validation UX**: Refine `ContactForm.tsx` and `ContactInfo.tsx` with accessible focus rings, inline validation states, instant button active feedback, and smooth toast notifications.
- **UX-DR7: Conversational AI Assistant (ChatBot) Refinement**: Elevate `ChatBot.tsx` into an Apple-style floating assistant window with translucent glass chrome, categorized prompt chips, kinetic thinking shimmer wave, and smooth spring open/close sheet transitions.

### FR Coverage Map

- **FR1 (Dynamic Root Shell & System Controls)**: Epic 1 - Apple Translucent Shell, System Controls & Mission Navigation
- **FR2 (Interactive Home & Hero Mission Control)**: Epic 2 - Interactive Home Mission Control & Developer Command Center
- **FR3 (Deep Dive About & Professional Philosophy)**: Epic 3 - Deep Dive Professional Identity & Architectural Philosophy
- **FR4 (Filterable Projects Showcase)**: Epic 4 - Showcase Project Gallery & Immersive Case Studies
- **FR5 (Project Case Study & Deep Dive)**: Epic 4 - Showcase Project Gallery & Immersive Case Studies
- **FR6 (Services Catalog & Detailed Offerings)**: Epic 5 - Services Catalog, Value Proposition & Client Conversion
- **FR7 (Direct Contact & Inquiry Pipeline)**: Epic 6 - Client Engagement Pipeline & Apple-Grade AI Assistant
- **FR8 (System Resilience & Error Boundaries)**: Epic 1 - Apple Translucent Shell, System Controls & Mission Navigation

## Epic List

### Epic 1: Apple Translucent Shell, System Controls & Mission Navigation
**Goal**: Visitors experience an immediate, fluid Apple-grade environment with authentic translucent glass chrome (`Navigation`), smooth page transitions, tactile theme switching (`ThemeContext` - Avengers dark mode vs Norse light mode), ambient pointer cursor glow (`CursorGlow`), interactive initial loader (`GameLoader`), top scroll depth indicator (`ScrollProgress`), and resilient system error boundaries (`NotFound`, `ErrorPage`).
**FRs covered**: FR1, FR8
**NFRs & UX-DRs addressed**: NFR1, NFR2, NFR3, NFR4, NFR5, ARCH-1, ARCH-3, ARCH-4, ARCH-5, UX-DR1
**Key Files**: `src/app/Root.tsx`, `src/app/components/Navigation.tsx`, `src/app/components/ThemeToggle.tsx`, `src/app/components/ui/CursorGlow.tsx`, `src/app/components/ui/GameLoader.tsx`, `src/app/components/ui/ScrollProgress.tsx`, `src/app/pages/NotFound/*`, `src/app/pages/ErrorPage/*`

### Epic 2: Interactive Home Mission Control & Developer Command Center
**Goal**: Potential clients, recruiters, and collaborators landing on the home page encounter an immersive developer command center featuring personalized greeting, responsive terminal code window, ambient code rain, interactive snippet runner, user avatar loader, live portfolio stats, categorized tech stack grid with layout spring filter pills, featured project spotlight, services overview cards, and high-conversion CTA.
**FRs covered**: FR2
**NFRs & UX-DRs addressed**: NFR1, NFR2, NFR3, NFR4, NFR5, ARCH-2, ARCH-3, ARCH-4, UX-DR2, UX-DR3
**Key Files**: `src/app/pages/Home.tsx`, `src/app/components/home/*`, `src/app/components/TechStack.tsx`, `src/app/components/Stats.tsx`, `src/app/components/Services.tsx`, `src/app/components/TerminalWindow.tsx`, `src/app/components/CodeRain.tsx`, `src/app/components/CodeSnippet.tsx`

### Epic 3: Deep Dive Professional Identity & Architectural Philosophy
**Goal**: Prospective employers and technical leads exploring `/about` gain deep confidence in Karan's engineering caliber through an elegant Apple-style storytelling layout, showcasing personal narrative and engineering leadership, career milestone metrics, comprehensive categorized technical skills matrix, and problem-solving manifesto.
**FRs covered**: FR3
**NFRs & UX-DRs addressed**: NFR1, NFR2, NFR3, NFR4, NFR5, ARCH-1, ARCH-4, UX-DR2, UX-DR4
**Key Files**: `src/app/pages/About.tsx`, `src/app/components/about/AboutHero.tsx`, `src/app/components/about/AboutStats.tsx`, `src/app/components/about/AboutSkills.tsx`, `src/app/components/about/AboutMission.tsx`

### Epic 4: Showcase Project Gallery & Immersive Case Studies
**Goal**: Visitors can seamlessly explore Karan's portfolio of work on `/projects` with fluid category tags, zero-CLS skeleton cards, and dive deep into full case studies on `/projects/:projectId` with smart back navigation, rich architecture metadata, full mission overview, itemized feature/tech-stack breakdowns, and measurable outcome metrics.
**FRs covered**: FR4, FR5
**NFRs & UX-DRs addressed**: NFR1, NFR2, NFR3, NFR4, NFR5, ARCH-1, ARCH-2, ARCH-4, ARCH-5, UX-DR4
**Key Files**: `src/app/pages/Projects.tsx`, `src/app/pages/ProjectDetail.tsx`, `src/app/components/projects/*`, `src/app/components/project/*`, `src/app/components/ui/BackButton.tsx`, `src/app/components/ui/skeleton/*`

### Epic 5: Services Catalog, Value Proposition & Client Conversion
**Goal**: Prospective clients can inspect Karan's detailed service offerings on `/services/:serviceId` with smart back navigation, architectural scope, deliverable benefits checklist, transparent commercial terms (pricing, duration, deliverables cards), and engagement roadmaps designed to convert inquiries into active collaborations.
**FRs covered**: FR6
**NFRs & UX-DRs addressed**: NFR1, NFR2, NFR3, NFR4, NFR5, ARCH-1, ARCH-2, ARCH-4, UX-DR5
**Key Files**: `src/app/pages/ServiceDetail.tsx`, `src/app/components/service/*`, `src/app/components/ui/BackButton.tsx`, `src/app/components/ui/skeleton/*`

### Epic 6: Client Engagement Pipeline & Apple-Grade AI Assistant
**Goal**: Visitors have two direct paths to connect: an Apple-refined contact page (`/contact`) with direct communication channels, social cards, and an interactive lead inquiry form with inline validation and toast feedback; and an always-available floating Apple-style AI assistant (`ChatBot`) powered by Gemini with suggested prompt chips, kinetic thinking shimmer wave, and copyable markdown responses.
**FRs covered**: FR7
**NFRs & UX-DRs addressed**: NFR1, NFR2, NFR3, NFR4, NFR5, ARCH-1, ARCH-2, ARCH-4, UX-DR6, UX-DR7
**Key Files**: `src/app/pages/Contact.tsx`, `src/app/components/contact/*`, `src/app/components/ui/ChatBot.tsx`

---

## Epic 1: Apple Translucent Shell, System Controls & Mission Navigation

**Goal**: Deliver a fluid, responsive Apple-grade environment with authentic translucent glass chrome (`Navigation`), smooth page transitions, tactile theme switching (`ThemeContext` - Avengers dark mode vs Norse light mode), ambient pointer cursor glow (`CursorGlow`), interactive initial loader (`GameLoader`), top scroll depth indicator (`ScrollProgress`), and resilient system error boundaries (`NotFound`, `ErrorPage`).

### Story 1.1: Translucent Apple Navigation Bar & Fluid Sheet Drawer

As a portfolio visitor,
I want a floating translucent navigation bar with instant tactile feedback and smooth mobile drawer interactions,
So that I can orient myself immediately and transition between pages without visual interruption.

**Acceptance Criteria:**

**Given** the user is viewing any page in the portfolio,
**When** the user looks at the top navigation bar,
**Then** it renders as an Apple-style translucent floating chrome with `backdrop-filter: blur(20px) saturate(180%)`, a 1px border highlight (`rgba(255,255,255,0.12)` in dark mode and `rgba(0,0,0,0.06)` in light mode), and content visibly scrolling underneath.
**And** the active route indicator pill animates smoothly between items using a critically damped layout spring (`damping: 1.0, duration: 0.35s`).
**And** nav links and action buttons respond instantly on pointer-down with `scale: 0.97` tactile feedback.
**And** on mobile viewports (< 768px), clicking the menu toggle opens a spring-animated drawer with safe-area spacing that can be dismissed or redirected mid-motion without locking input.

### Story 1.2: Dual-Theme Engine Synchronization, Anti-FOUC & Circular Radial View Transition

As a portfolio visitor,
I want to toggle seamlessly between Avengers Dark mode and Norse Light mode with an institutional-grade, zero-flicker Circular Radial View Transition (Telegram/Raycast-style ripple effect) and instant Axe & Shield button availability,
So that the visual atmosphere adapts to my preference with physical beauty, direct manipulation, and zero latency.

**Acceptance Criteria:**

**Given** the portfolio initializes in any browser session,
**When** the DOM loads,
**Then** a synchronous inline `<script>` in the `<head>` of `index.html` resolves `localStorage.getItem('theme')` / `'portfolio-theme'` and synchronizes `.dark`/`.light` on `document.documentElement` before frame 0 paint, eliminating FOUC.
**And** the navigation chrome and `ThemeToggle` button are rendered at `z-[110]` so they appear immediately without being delayed by intro sequences.
**When** the user clicks the `ThemeToggle` button or activates it via keyboard (`Enter` or `Space`),
**Then** the origin coordinates `(x, y)` are computed from the button bounds and expanded to `endRadius` covering the furthest screen corner.
**And** if View Transitions API is supported and reduced motion is disabled, `document.startViewTransition` executes and animates `clipPath: circle(...)` on `::view-transition-new(root)` using Web Animations API over `720ms` with `cubic-bezier(0.4, 0, 0.2, 1)`.
**And** the theme toggle icon seamlessly morphs between the Avengers Shield (`<Shield />`) and God of War Axe (`<Axe />`) using an Apple spring curve (`damping: 18, stiffness: 240`).
**And** if reduced motion is requested or View Transitions are unsupported, `toggleTheme()` applies immediately without visual distortion or re-triggering while a transition is active.
**And** the `CursorGlow` component tracks pointer movements using hardware-accelerated transforms (`translate3d`) without causing CPU layout thrashing.
**And** the `ScrollProgress` bar at the top edge tracks scroll position accurately using passive window scroll listeners and smooth scale-x transform.

### Story 1.3: Game Loader Introduction & System Error Boundaries

As a portfolio visitor,
I want a fluid introductory entrance experience and resilient error recovery pages,
So that unexpected navigation errors or broken routes provide clear wayfinding without breaking my application state.

**Acceptance Criteria:**

**Given** a first-time visitor arrives on the site,
**When** the initial `GameLoader` executes,
**Then** it displays an engaging introductory sequence that settles and dismisses using an Apple spring scale-and-fade animation, completing smoothly without blocking background hydration.
**And** when a non-existent URL is accessed (e.g. `/unknown-path`), the `NotFound` page renders an Apple-styled card with contextual guidance, suggested routes, and a `BackButton` returning to previous history.
**And** when a runtime rendering error occurs, the `ErrorPage` boundary catches it cleanly, rendering an error state with a reload action button and home navigation without crashing the root application shell.

---

## Epic 2: Interactive Home Mission Control & Developer Command Center

**Goal**: Transform the home landing page into an interactive developer command center featuring personalized greeting, responsive terminal code window, ambient matrix code rain, snippet runner, user avatar loader, live portfolio stats, categorized tech stack grid with layout spring filter pills, featured project spotlight, services overview cards, and high-conversion CTA.

### Story 2.1: Developer Hero Command Center with Terminal & Ambient Effects

As a prospective employer or client landing on the home page,
I want to explore an interactive hero command center with dynamic greetings, live terminal window, and tactile action buttons,
So that I immediately understand Karan's engineering caliber and role focus.

**Acceptance Criteria:**

**Given** the user lands on `/`,
**When** the `HomeHero` renders,
**Then** it displays dynamic user greeting from `UserContext`, role typography with optical letter tracking (`-0.02em` on headings), and a responsive glassmorphic `TerminalWindow`.
**And** the terminal window features functional tab switching, code syntax highlighting, copy-to-clipboard button, and an ambient matrix `CodeRain` backdrop rendered efficiently on canvas without dropped frames.
**And** the `HeroAvatarLoader` displays the developer profile avatar with smooth shimmer skeleton fallback during image loading.
**And** call-to-action buttons ("View Projects", "Contact Me") feature tactile pointer-down feedback (`scale: 0.97`) and min 44×44px touch target dimensions adhering to WCAG 2.1 AA.

### Story 2.2: Cinematic Marquee Stream for Tech Stack & Real-Time Stats

As a technical recruiter or engineering manager,
I want to view Karan's tech stack as an exclusive cinematic marquee stream with slow, dignified movement that pauses on hover,
So that I can smoothly inspect technologies and tools with tactile Apple glass materiality and zero cognitive friction.

**Acceptance Criteria:**

**Given** the user scrolls to the Tech Arsenal section on the home page,
**When** the section renders,
**Then** it exclusively displays a continuous cinematic marquee stream with horizontal gradient fade masks (`mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent)`), omitting any static grid toggle buttons.
**And** the marquee stream moves with a clean, slow cinematic velocity (`animate-scroll-slow` / `animate-scroll-reverse-slow` at 65s duration) across alternating fluid rows.
**And** hovering or focusing anywhere within a marquee row immediately pauses the scroll animation (`animation-play-state: paused`).
**And** category filter pills (WAI-ARIA tablist) allow filtering the tech stack by domain, updating the stream with layout spring transitions.
**And** each card renders in an Apple glass style with SVG icon, category badge, technology name, and tactile spring hover lift (`whileHover={{ y: -3, scale: 1.02 }}`).
**And** if skills data is loading, `TechStackSkeleton` displays an animated marquee skeleton to prevent layout shift.
**And** when reduced motion is preferred (`prefers-reduced-motion: reduce`), the animated scroll disables and renders a clean, accessible scrollable strip (`data-testid="tech-marquee-reduced"`).
**And** the `Stats` component displays key metrics (projects, experience, satisfaction) with animated counter numbers that count up smoothly upon entering viewport.

### Story 2.3: Featured Projects Spotlight, Services Cards & Bottom Conversion CTA

As a portfolio visitor,
I want to preview highlight projects and engineering services with direct navigation to detailed case studies,
So that I can quickly discover the most impactful work and initiate a project inquiry.

**Acceptance Criteria:**

**Given** the user continues exploring the home page,
**When** the user views `HomeFeaturedProjects`,
**Then** high-impact project spotlight cards display with aspect-ratio preserved media, live badges, technology chips, and instant link to `/projects/:projectId`.
**And** hovering over project cards invokes an Apple-inspired subtle depth lift (`translateY: -4px`) and refined shadow intensification using critically damped springs.
**And** the `Services` section displays cards summarizing core services with benefit highlights and direct links to `/services/:serviceId`.
**And** the bottom `HomeCta` section presents a glassmorphic banner with clear primary and secondary conversion actions that route seamlessly to `/contact` and `/projects`.

---

## Epic 3: Deep Dive Professional Identity & Architectural Philosophy

**Goal**: Deliver an elegant Apple-style storytelling layout on `/about`, showcasing personal narrative and engineering leadership, career milestone metrics, comprehensive categorized technical skills matrix, and problem-solving manifesto.

### Story 3.1: Apple Storytelling About Hero & Career Milestones

As an engineering manager or collaborator exploring `/about`,
I want to read Karan's career narrative and milestone achievements presented in a refined typography layout,
So that I gain confidence in his background, leadership, and technical depth.

**Acceptance Criteria:**

**Given** the user navigates to `/about`,
**When** `AboutHero` renders,
**Then** it presents the personal bio using optical typography (tight negative tracking on headings, relaxed 1.5 line-height on body copy) with high contrast ratio (>= 4.5:1) in both themes.
**And** the `AboutStats` grid highlights career achievements with glassmorphic cards featuring subtle light-catching borders and ambient depth.
**And** all entrance animations trigger sequentially using `useInView` with spring-based motion curves that respect `prefers-reduced-motion` settings.

### Story 3.2: Technical Competency Matrix & Engineering Philosophy Manifesto

As a technical lead evaluating architectural depth,
I want to review Karan's categorized skill matrix and engineering mission statement,
So that I understand his problem-solving philosophy, engineering standards, and architectural values.

**Acceptance Criteria:**

**Given** the user scrolls down the `/about` page,
**When** `AboutSkills` enters viewport,
**Then** it displays categorized competencies (Languages, Frameworks, Architecture, Cloud) with visual proficiency meters and clean badges.
**And** `AboutMission` renders the development manifesto cards detailing principles of performance, maintainability, and user-centric design.
**And** all card interactions feature instant pointer feedback with `active:scale-[0.98]` and accessible focus outlines for keyboard navigation.

---

## Epic 4: Showcase Project Gallery & Immersive Case Studies

**Goal**: Enable visitors to seamlessly explore Karan's portfolio of work on `/projects` with fluid category tags and zero-CLS skeleton cards, and dive deep into full case studies on `/projects/:projectId` with smart back navigation, rich architecture metadata, full mission overview, itemized feature/tech-stack breakdowns, and measurable outcome metrics.

### Story 4.1: Responsive Projects Grid & Zero-CLS Skeletons

As a client or recruiter browsing `/projects`,
I want to explore the complete catalog of projects with live API data, filter tags, and zero layout shift while loading,
So that I have a fast, flicker-free browsing experience.

**Acceptance Criteria:**

**Given** the user navigates to `/projects`,
**When** the page loads,
**Then** `fetchProjects` initiates immediately without sequential waterfalls, displaying `ProjectSkeletonCard` placeholders that match the final card geometry (CLS < 0.05).
**And** when project data resolves, cards render in an Apple-grade grid with high-resolution image previews, status tags, tech stack badges, live demo links, and GitHub links.
**And** if the network request fails, graceful fallback records load with an informative non-blocking status notification.
**And** the bottom `ProjectsCta` invites visitors to discuss custom project inquiries, routing smoothly to `/contact`.

### Story 4.2: Immersive Project Case Study Detail Page & Smart Back Navigation

As a stakeholder interested in a specific project,
I want to view a comprehensive case study at `/projects/:projectId` with architecture deep dives, measurable metrics, and smart back navigation,
So that I can evaluate the engineering process, challenges overcome, and business outcomes.

**Acceptance Criteria:**

**Given** the user clicks on a project card or directly accesses `/projects/:projectId`,
**When** `ProjectDetail` loads,
**Then** `ProjectDetailSkeleton` renders during data retrieval and transitions smoothly to content without flashing.
**And** a smart `BackButton` component sits at the top, returning the visitor to `/projects` with natural spatial consistency.
**And** `ProjectHeader` displays project title, device/subtitle, category icon badge, role/team type, and live/repo links.
**And** the hero image renders with preserved 16:9 aspect-ratio and translucent border chrome.
**And** `ProjectFeatures` breaks down key deliverables, tech stack icons, and architectural challenges faced.
**And** `ProjectResults` details quantifiable business metrics and client testimonials with a next-steps CTA.
**And** if an invalid `projectId` is requested, a clean "Project Not Found" state appears with a prominent button to return to `/projects`.

---

## Epic 5: Services Catalog, Value Proposition & Client Conversion

**Goal**: Provide prospective clients with detailed service offerings on `/services/:serviceId` with smart back navigation, architectural scope, deliverable benefits checklist, transparent commercial terms (pricing, duration, deliverables cards), and engagement roadmaps designed to convert inquiries into active collaborations.

### Story 5.1: Dynamic Service Detail Page & Scope Architecture

As a potential client exploring specialized services,
I want to view a comprehensive service breakdown at `/services/:serviceId` with scope definitions, technology stack, and key benefits,
So that I can assess whether Karan's capabilities match my business requirements.

**Acceptance Criteria:**

**Given** the user navigates to `/services/:serviceId`,
**When** the service loads via `fetchServiceById`,
**Then** `ServiceDetailSkeleton` presents layout-stable placeholders until content settles.
**And** `ServiceHeader` renders the service title, category banner, and brief overview with high-contrast typography.
**And** `ServiceFeatures` displays the full technical scope, architectural deliverable highlights, and supporting technologies.
**And** the "Key Benefits" grid presents checkmarked advantage cards with spring hover lift (`translateY: -2px`) and subtle translucent borders.

### Story 5.2: Commercial Pricing Grid, Deliverables & Consultation Roadmap

As a business owner preparing to hire Karan,
I want to inspect clear pricing expectations, delivery timelines, itemized deliverables, and an engagement roadmap,
So that I can make a prompt hiring decision and initiate consultation.

**Acceptance Criteria:**

**Given** the user is viewing a service detail page,
**When** scrolling to the commercial terms section,
**Then** three Apple bento glass cards display: "Pricing" tier card, "Duration" timeline card, and "Deliverables" checklist card.
**And** each card features tactile spring hover transitions (`scale: 1.02, translateY: -4px`) with spring stiffness 300 and damping 20.
**And** the `ServiceProcess` roadmap section outlines step-by-step engagement phases (Discovery, Architecture, Build, Launch).
**And** a prominent primary CTA button routes the user directly to `/contact` with pre-filled service context where applicable.

---

## Epic 6: Client Engagement Pipeline & Apple-Grade AI Assistant

**Goal**: Provide two frictionless pathways for visitors to connect: an Apple-refined contact page (`/contact`) with direct communication channels, social cards, and an interactive lead inquiry form with inline validation and toast feedback; and an always-available floating Apple-style AI assistant (`ChatBot`) powered by Gemini with suggested prompt chips, kinetic thinking shimmer wave, and copyable markdown responses.

### Story 6.1: Direct Contact Channels & Validated Lead Submission Form

As a prospective client or recruiter on `/contact`,
I want to access direct communication channels and submit an inquiry with real-time field validation,
So that I can reach Karan quickly with complete confidence that my message is received.

**Acceptance Criteria:**

**Given** the user is on `/contact`,
**When** the page renders,
**Then** `ContactHeader` displays welcoming copy and expected response times.
**And** `ContactInfo` renders tactile cards for direct email, location, working hours, and social channels (GitHub, LinkedIn, Twitter/X) with single-click copy buttons and hover springs.
**And** `ContactForm` features accessible inputs (Name, Email, Subject, Message) with clear labels, min 44×44px touch targets, and subtle inner glow focus rings.
**And** inline validation flags errors immediately near the field without full form submit jumps.
**And** clicking "Send Message" triggers pointer-down feedback (`scale: 0.97`), disables duplicate submits, shows a spinner inside the button, and emits a success toast via `sonner` upon completion.

### Story 6.2: Apple-Grade Conversational AI Assistant (ChatBot)

As a portfolio visitor,
I want to chat with an always-available AI assistant featuring Apple-style translucent sheet physics and suggested prompts,
So that I can ask verified questions about Karan's skills, projects, and availability at any time.

**Acceptance Criteria:**

**Given** the user is anywhere on the portfolio,
**When** the floating AI trigger button is clicked,
**Then** the `ChatBot` window expands smoothly using Apple-grade spring physics (`damping: 25, stiffness: 350`) anchored to the bottom-right corner.
**And** the chat window renders with translucent glass chrome (`backdrop-filter: blur(25px)`), hairline borders, and header controls (reset conversation, close assistant).
**And** before any messages are sent, categorized quick inquiry prompt chips ("Core Tech Stack", "Featured Projects", "Work Experience", "Hire / Contact Me") allow one-click questioning.
**And** while awaiting the AI reply, a shimmering kinetic wave indicator ("Synthesizing...") indicates activity without freezing the UI.
**And** AI responses render rich markdown (bolding, inline code chips, bullet lists, internal route links) with one-click copy buttons showing a green "Copied!" confirmation checkmark.
**And** on mobile viewports (< 640px), background page scrolling is locked while the chat modal is active.
