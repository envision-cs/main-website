# Nav Dropdown Cross-Browser Reimplementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace fragile CSS-anchor popover behavior with native popover + deterministic JS positioning while preserving visual styling.

**Architecture:** Keep native `popover` in `nav-dropdown.vue`, remove anchor-positioning CSS, compute `top/left/width` in Vue, and animate open with GSAP. Add focused component tests around hover/focus opening and inline position styles.

**Tech Stack:** Nuxt 4, Vue 3, native HTML Popover API, v-gsap-nuxt, Vitest, Vue Test Utils.

---

### Task 1: Add Failing Behavior Tests

**Files:**

- Create: `app/components/nav-dropdown.spec.ts`

**Step 1: Write failing tests**

- Assert hover opens dropdown (`aria-expanded="true"`).
- Assert explicit inline `top/left/width` style is applied when opened.

**Step 2: Run tests to verify fail**

- Run: `pnpm test -- app/components/nav-dropdown.spec.ts`
- Expected: failures with current anchor-position implementation.

### Task 2: Rebuild Component Logic

**Files:**

- Modify: `app/components/nav-dropdown.vue`

**Step 1: Remove anchor-positioning approach**

- Remove `anchor-name`, `position-anchor`, and `position-area` dependencies.

**Step 2: Implement native popover + JS positioning**

- Keep `<div popover>`.
- Add refs for root, trigger, and popover.
- Add `syncPopoverPosition()` based on `getBoundingClientRect()`.
- Apply inline style (`top`, `left`, `width`) to panel.

**Step 3: Implement interaction behavior**

- Open on hover and focus-in.
- Close on mouse leave, focus-out, and route changes.
- Maintain trigger accessibility state (`aria-expanded`, `aria-controls`, `aria-haspopup`).

**Step 4: Add GSAP entry animation**

- Use `useGSAP()` for panel entry animation.
- Respect `prefers-reduced-motion`.

### Task 3: Verify and Stabilize Tests

**Files:**

- Modify: `app/components/nav-dropdown.spec.ts` (if needed for test environment mocks)

**Step 1: Run targeted tests**

- Run: `pnpm test -- app/components/nav-dropdown.spec.ts`
- Expected: new dropdown tests pass.

**Step 2: Record known unrelated suite failures**

- Note existing failures outside dropdown scope.
