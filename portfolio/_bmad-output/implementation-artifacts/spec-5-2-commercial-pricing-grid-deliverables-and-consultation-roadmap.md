# Story 5.2: Commercial Pricing Grid, Deliverables & Consultation Roadmap

## Status: completed

## Intent
Provide prospective clients with transparent commercial terms and an actionable consultation path:
1. **Commercial Terms Bento Grid**:
   - Three Apple glass bento cards: Pricing Tier, Duration Timeline, and Deliverables Checklist.
   - Spring hover lifts (`whileHover={{ y: -4, scale: 1.02 }}`) with critically damped springs.
   - Dual-theme hairline borders and top specular hairline highlights.
2. **Engagement & Delivery Roadmap (`ServiceProcess.tsx`)**:
   - Numbered step cards detailing structured phases.
   - Responsive 2-column layout.
3. **Primary Consultation Action**:
   - High-impact glass conversion banner with min 44×44px touch target routing to `/contact`.
   - Tactile spring press feedback (`whileTap={{ scale: 0.97 }}`).
4. **Verification**:
   - Full coverage in `ServiceDetail.test.tsx`.

## Quality Gates
- 0 TypeScript errors
- 0 ESLint errors
- 100% Vitest test pass rate
- Successful production build

