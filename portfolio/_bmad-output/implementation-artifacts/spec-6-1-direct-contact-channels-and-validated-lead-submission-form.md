# Implementation Spec 6.1: Direct Contact Channels & Validated Lead Submission Form

## 1. Overview & Business Objectives
Epic 6 delivers the primary client engagement funnel for Karanveer Thour's engineering portfolio. Story 6.1 establishes an Apple-grade direct communication dashboard and lead acquisition interface at `/contact`, providing potential enterprise clients, engineering leaders, and recruiters with frictionless pathways to initiate high-impact project consultations and recruitment conversations.

## 2. Key Architecture & Design Deliverables

### A. Translucent Apple Glass Contact Architecture
- **Dual-Theme Harmonization:** Synchronized across Avengers Dark (`theme === 'avengers'`) and Norse Light (`theme === 'godofwar'`), utilizing CSS backdrop filters (`backdrop-blur-2xl backdrop-saturate-[180%]`), hairline borders (`border-white/[0.08]` dark, `border-black/[0.06]` light), specular top hairline highlights, and ambient radial glow accents.
- **Top-Level Context Safety:** Safely consumes `useContext(ThemeContext)` and `useContext(UserContext)` with graceful default fallbacks, eliminating runtime unbundled context crashes.

### B. Tactile Contact Channels & Social Footprint (`ContactInfo.tsx`)
- **Direct Channels:** Direct email, phone line, and verified geolocation coordinates dynamically retrieved from `fetchActiveContact()` with fallback to user profile details.
- **Single-Click Clipboard Copy:** Integrated safe clipboard copying with fallback across browser environments, providing tactile feedback with emerald green checkmark confirmation.
- **Verified Social Matrix:** High-contrast bento cards linking directly to GitHub, LinkedIn, and Twitter/X with micro-spring lifts (`whileHover={{ y: -3, scale: 1.02 }}`) and tactile press (`whileTap={{ scale: 0.97 }}`).
- **Real-Time Availability Indicator:** Pulsing emerald radar beacon highlighting active working hours, primary timezone (`UTC / EST / IST`), and readiness for new architectural engagements.

### C. Validated Lead Submission Form (`ContactForm.tsx`)
- **Accessible Design:** Explicit `<label>` associating with all input fields, accessible ARIA attributes (`aria-required`, `aria-invalid`, `aria-describedby`), and minimum 44×44px interactive touch targets.
- **Real-Time Inline Field Validation:** Immediate contextual feedback for empty name inputs (min 2 characters), strict regex email validation, and descriptive message requirements (min 10 characters) without jarring full-form jumps.
- **Tactile Submission Flow:** Spring-physics button feedback (`whileTap={{ scale: 0.97 }}`), double-submit prevention with loading spinner, and native `sonner` rich-color toast alerts upon successful dispatch or network exception.

## 3. Verification & Test Coverage
- **Unit Test Suite:** `src/app/pages/Contact.test.tsx` (8 unit tests passing):
  - Renders `ContactHeader` with optical tracking, dual-theme badges, and expected response time pill.
  - Verifies dynamic copy switching between Avengers and God of War themes.
  - Validates contact channels, social profiles, and geolocation rendering.
  - Tests clipboard copy mechanics for direct email.
  - Tests client-side inline validation for empty submissions, malformed email strings, and brief messages.
  - Tests end-to-end form submission with API dispatch and form reset.
  - Tests network failure handling with accessible error alert state.

