# Implementation Spec 6.2: Apple-Grade Conversational AI Assistant (ChatBot)

## 1. Overview & Business Objectives
Story 6.2 provides portfolio visitors with an always-accessible, conversational AI assistant (`ChatBot`) powered by Gemini. Visitors can rapidly explore Karanveer Thour's technical skills, architectural strengths, production case studies, and contact options via tactile prompt chips or custom free-form inquiries.

## 2. Key Architecture & Design Deliverables

### A. Translucent Apple Sheet Chrome & Spring Physics
- **Spring Sheet Motion:** Window expands from the floating trigger button using Apple-tuned spring physics (`damping: 25, stiffness: 350`) anchored to the bottom-right viewport corner.
- **Glassmorphic Materiality:** Translucent background (`backdrop-filter: blur(25px)`), hairline borders (`border-white/[0.12]` in dark mode, `border-black/[0.08]` in light mode), specular top hairline highlight (`bg-gradient-to-r from-transparent via-white/25 to-transparent`), and deep drop shadows.
- **Header Controls:** Dual-theme badge, live radar status indicator ("Live"), conversation reset (`RotateCcw`), and assistant close button (`X`).
- **Context Safety:** Safely consumes `useContext(ThemeContext)` and `useContext(UserContext)` with safe fallbacks, preventing unbundled test crashes.

### B. Conversational UX & Inquiry Velocity
- **Categorized Quick Prompt Chips:** Grid of 4 one-click discovery prompts ("Core Tech Stack", "Featured Projects", "Work Experience", "Hire / Contact Me") displayed prior to initial interaction for rapid zero-typing exploration.
- **Kinetic Thinking Wave:** Shimmering animated dot wave indicator ("Synthesizing...") while awaiting Gemini AI response.
- **Rich Markdown Engine:**
  - Bold text (`**text**` -> `<strong>`)
  - Inline code chips (`` `code` `` -> `<code className="font-mono text-xs px-1.5 py-0.5 rounded-md ...">`)
  - Bullet lists (`• `, `- `, `* ` -> `<ul><li>`)
  - Internal route links (`[label](/path)` -> `<Link to="...">`) and external links (`[label](url)` -> `<a target="_blank">`)
- **Tactile Clipboard Action:** One-click copy button on every model message with emerald green checkmark feedback ("Copied!") for 2 seconds.
- **Mobile Viewport Optimization:** Background scrolling is locked when the chat sheet is open on small viewports (< 640px).

## 3. Verification & Test Coverage
- **Unit Test Suite:** `src/app/components/ui/ChatBot.test.tsx` (9 tests passing):
  - Accessible floating trigger button with `aria-label` and `aria-expanded` toggle states.
  - Dual-theme styling and label adaptation (JARVIS AI vs ASK AI).
  - Sheet expansion displaying welcome greeting and prompt chips.
  - Header controls (close assistant and reset conversation thread).
  - Prompt chip click dispatches prompt to `sendChatMessage`.
  - Input field Enter key and send button dispatches message and renders markdown response.
  - One-click copy action with clipboard write and checkmark feedback.
  - Resilient backend error handling with fallback guidance to `/contact`.

