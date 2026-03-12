# Header Fullscreen Mega Menu Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the desktop header `Services` dropdown behave like a full-screen mega menu while preserving the site’s existing visual design and mobile navigation.

**Architecture:** Keep the current `reka-ui` `NavigationMenu` in [`app/components/app/header.vue`](/Users/christopherpowe/Documents/main-website/app/components/app/header.vue), but change the desktop content shell into a fixed, full-viewport panel with an overlay and grouped columns. Drive visibility from the existing `desktopMenuValue` state so open/close behavior remains centralized and route changes still dismiss the menu.

**Tech Stack:** Nuxt 4, Vue 3, TypeScript, `reka-ui`, Vitest, Vue Test Utils

---

### Task 1: Add failing desktop mega menu behavior tests

**Files:**

- Modify: `app/components/app/header.spec.ts`
- Test: `app/components/app/header.spec.ts`

**Step 1: Write the failing test**

Add a test that mounts the header, confirms the desktop mega menu/backdrop markers are absent by default, opens the `Services` trigger, and expects the markers to appear.

**Step 2: Run test to verify it fails**

Run: `pnpm vitest app/components/app/header.spec.ts`
Expected: FAIL because the desktop mega menu markers or interaction hooks do not yet exist.

**Step 3: Write minimal implementation**

Do not implement yet. This task ends after proving the missing behavior.

**Step 4: Run test to verify failure is the intended one**

Run: `pnpm vitest app/components/app/header.spec.ts`
Expected: FAIL on the new desktop mega menu assertions, not due to unrelated setup errors.

### Task 2: Implement full-screen desktop mega menu behavior

**Files:**

- Modify: `app/components/app/header.vue`

**Step 1: Add open-state helpers**

Add a computed boolean for whether the desktop menu is open and expose stable `data-test` hooks for the desktop trigger, backdrop, and panel.

**Step 2: Restructure desktop menu markup**

Rework the `Services` `NavigationMenuContent` into grouped columns suitable for a mega menu while preserving existing links.

**Step 3: Add backdrop and close behavior**

Render a backdrop when the desktop menu is open and close the menu by resetting `desktopMenuValue` on backdrop click.

**Step 4: Replace constrained viewport styles**

Update the desktop CSS so the open panel is fixed, full-width, and fills the viewport below the header without affecting mobile styles.

**Step 5: Run tests**

Run: `pnpm vitest app/components/app/header.spec.ts`
Expected: PASS

### Task 3: Refine styles and verify no regressions

**Files:**

- Modify: `app/components/app/header.vue`

**Step 1: Refactor class names if needed**

Keep styles readable and scoped to desktop mega menu behavior.

**Step 2: Run targeted lint/tests**

Run: `pnpm vitest app/components/app/header.spec.ts`
Expected: PASS

Run: `pnpm eslint app/components/app/header.vue app/components/app/header.spec.ts`
Expected: PASS

**Step 3: Commit**

```bash
git add docs/plans/2026-03-11-header-fullscreen-mega-menu-design.md docs/plans/2026-03-11-header-fullscreen-mega-menu-implementation-plan.md app/components/app/header.vue app/components/app/header.spec.ts
git commit -m "feat: add fullscreen desktop header mega menu"
```
