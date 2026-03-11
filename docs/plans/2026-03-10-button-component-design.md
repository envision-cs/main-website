# Button Component Design

**Date:** 2026-03-10
**Scope:** Add a native button component that matches `link-button.vue` visuals and behavior patterns.

## Goal

Create a reusable `button.vue` component with the same styling and animation as `link-button.vue`, while using semantic native button behavior.

## Decisions

1. Keep `link-button.vue` unchanged.
2. Create a new standalone component at `app/components/button.vue`.
3. Reuse the same class structure (`.btn`, `.btn-main`, `.btn-text`, `.btn-overlay`) to keep visuals 1:1.
4. Add native button props and behavior:
   - `type: 'button' | 'submit' | 'reset'` (default: `button`)
   - `disabled: boolean` (default: `false`)
5. Keep parity with existing styling API:
   - `size: 'sm' | 'md' | 'lg'` (default: `md`)
   - `variant: 'primary' | 'secondary'` (default: `primary`)

## Component API

- Props:
  - `size?: 'sm' | 'md' | 'lg'`
  - `variant?: 'primary' | 'secondary'`
  - `type?: 'button' | 'submit' | 'reset'`
  - `disabled?: boolean`
- Slot:
  - Default slot for button label/content.
- Events:
  - No custom emits. Native `click` behavior is preserved.

## Behavior and Accessibility

- Render a native `<button>` element.
- Forward `type` and `disabled` directly.
- Keep the same layered hover animation and variant-specific styles as `link-button.vue`.

## Testing Strategy

Create `app/components/button.spec.ts` with checks for:

- default variant (`primary`)
- default size (`md`)
- default type (`button`)
- variant class application (`secondary`)
- size class application (`sm`, `lg`)
- overlay presence for animation (`.btn-overlay`)
- disabled attribute forwarding
