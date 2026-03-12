# Header Mobile Drawer Design

## Summary

Implement a responsive primary navigation in `app/components/app/header.vue` that preserves the current desktop menu (`>=768px`) and adds a native HTML `dialog` drawer for mobile (`<768px`). The mobile drawer must meet WCAG 2.2 AA interaction requirements, including keyboard support, semantic labeling, and focus management.

## Approved Constraints

- Accessibility target: WCAG 2.2 AA.
- Breakpoint behavior:
  - Desktop full menu at widths `>=768px`.
  - Mobile drawer at widths `<768px`.
- Mobile Services behavior: Expand/collapse section inside the drawer.
- Drawer technology: native HTML `<dialog>` element.

## Desktop Behavior

- Keep existing horizontal navigation links.
- Keep existing `nav-dropdown` usage for Services on desktop.
- Desktop layout remains visible only at `min-width: 768px`.

## Mobile Behavior

- Show a hamburger menu button only on mobile.
- Opening the button calls `dialog.showModal()`.
- Drawer renders primary links and a Services disclosure section.
- Services disclosure uses button + controlled region pattern (`aria-expanded` and `aria-controls`).

## ADA/WCAG Interaction Design

- Keep semantic `<header>` and `<nav aria-label="Primary">`.
- Menu button uses `aria-haspopup="dialog"` and reflects state with `aria-expanded`.
- Drawer `<dialog>` has an accessible name (`aria-label="Main menu"`).
- Native `Esc` closes drawer.
- Backdrop click closes drawer (only when click target is dialog surface).
- On open, focus moves into first actionable item in drawer.
- On close, focus returns to the menu trigger button.
- All interactive controls include visible `:focus-visible` styling.
- Mobile controls maintain tap target sizing suitable for touch (minimum 44x44 CSS px intent).
- Any motion in drawer respects `prefers-reduced-motion: reduce`.

## Technical Notes

- Replace unused `isMainOpen`/`isSubOpen` state in header with explicit drawer + disclosure state.
- Use Vue refs for trigger button, dialog element, and first focus target.
- Keep implementation self-contained in `header.vue` unless link duplication is significant.

## Verification Expectations

- Component test coverage should include:
  - Mobile trigger semantics and dialog labeling.
  - Services disclosure ARIA state toggle.
  - Close behavior and focus restoration logic.
- Run targeted tests and project test command before completion claims.
