# Cross-Browser Nav Dropdown Design

## Goal

Rebuild the desktop Services navigation dropdown to keep current visual styling while delivering stable positioning and smooth animation across Chrome, Safari, and Firefox.

## Constraints

- Keep native HTML `popover` for built-in behavior and baseline accessibility.
- Preserve existing visual design (image column, content grid, spacing, typography).
- Support open on pointer hover and keyboard focus.
- Avoid CSS anchor positioning due cross-browser inconsistencies.

## Architecture

- Use native `popover` as the panel primitive.
- Position panel with JavaScript using `getBoundingClientRect()` from trigger/header instead of CSS anchor positioning.
- Control open/close state in Vue for consistent trigger semantics (`aria-expanded`, `aria-controls`).
- Animate panel entry using GSAP (`v-gsap-nuxt`) and keep close behavior stable.

## Interaction Model

- Open when:
  - pointer enters dropdown container (hover-capable devices),
  - focus enters dropdown container (keyboard users).
- Close when:
  - pointer leaves dropdown container,
  - focus leaves dropdown container,
  - route changes.
- Recompute panel position while open on resize and scroll.

## Accessibility

- Trigger remains a native `button`.
- Trigger exposes `aria-expanded`, `aria-controls`, and `aria-haspopup="menu"`.
- Keyboard users can open on focus without requiring pointer interaction.
- Native `popover` is retained for built-in platform behavior and better interoperability.

## Testing Strategy

- Add component tests to verify:
  - hover opens dropdown and updates expanded state,
  - explicit `top/left/width` positioning is applied when open.
