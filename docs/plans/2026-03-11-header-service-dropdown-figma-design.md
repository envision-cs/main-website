# Header Service Dropdown Figma Design

**Context**

The service dropdown in [`app/components/app/header.vue`](/Users/christopherpowe/Documents/main-website/app/components/app/header.vue) currently uses a tall mega-menu layout. The approved Figma node `2363:2497` defines a much more compact dropdown: a fixed-height white panel with a blue image-backed lead card on the left and five service links arranged as a `3 x 2` grid on the right.

**Goals**

- Match the Figma dropdown structure and proportions closely.
- Keep the existing header trigger/open-state behavior already implemented in Vue and `reka-ui`.
- Preserve the top-level nav styling and mobile drawer.

**Figma Notes**

- Overall panel size: `1368 x 284`
- Left lead card: `368 x 284`, blue overlay on image background
- Right content area: `1000 x 284`, `3` columns and `2` rows
- Link cards are simple title/description stacks, not sectioned columns

**Recommended Approach**

Replace the current dropdown content markup with:

- A left promo panel using the provided Figma image asset plus blue overlay
- A right-side CSS grid with five service links mapped into the same visual arrangement as Figma
- Typography and spacing adjusted to resemble the screenshot while using the project’s Vue/CSS conventions

**Testing Strategy**

- Extend [`app/components/app/header.spec.ts`](/Users/christopherpowe/Documents/main-website/app/components/app/header.spec.ts) with assertions for the compact dropdown structure:
  - lead panel hook exists
  - right-side grid exists
  - five service link tiles render
- Keep the existing open/close menu behavior test intact
