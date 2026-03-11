# Mobile Nav GSAP Design

**Date:** 2026-03-10
**Scope:** Header mobile CTA visibility and GSAP animations for the mobile drawer.

## Goal

1. Hide the top-right header contact CTA on mobile.
2. Animate the mobile dialog panel sliding from the right using GSAP.
3. Add staggered entrance animation for drawer nav links.

## Decisions

- Keep the mobile drawer's `Contact` link in the nav list.
- Hide only the header CTA (`link-button.header-cta`) below `768px`.
- Use `useGSAP()` (from `v-gsap-nuxt`) in `mobile-nav-drawer.vue` for deterministic open/close control.
- Control dialog state with `:open` + `@update:open` so close animation can complete before setting `open=false`.
- Add a shared marker attribute (`data-anim="mobile-nav-link"`) to nav link/toggle targets for stagger sequencing.

## Animation Behavior

- **Open**
  - Overlay fades in.
  - Drawer content slides in from right (`xPercent: 100 -> 0`).
  - Nav links/toggle animate in with stagger (`x` offset + opacity).
- **Close**
  - Nav links animate out quickly (reverse stagger direction).
  - Drawer content slides out right (`xPercent: 0 -> 100`).
  - Overlay fades out.
  - Component then commits `open=false`.

## Accessibility and Interaction

- Keep current `aria-*` semantics and focus-return logic.
- Preserve close-on-route-change behavior.
- Keep keyboard and overlay close flows by handling dialog open state updates centrally.

## Testing Strategy

- Update `header.spec.ts` for the new mobile-hidden CTA class contract.
- Add `mobile-nav-drawer.spec.ts`:
  - open/close behavior remains functional
  - GSAP APIs are called on open and close
  - stagger target selector is present on expected nav items
