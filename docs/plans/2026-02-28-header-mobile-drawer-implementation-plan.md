# Header Mobile Drawer Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a WCAG 2.2 AA-compliant mobile navigation drawer using native `dialog` below `768px`, while preserving the existing full desktop menu at `768px` and above.

**Architecture:** Keep desktop navigation structure and `nav-dropdown` behavior intact. Add mobile-only controls (trigger + native `dialog`) and explicit state/focus management in `header.vue`. Validate accessibility semantics and interaction behavior with focused component tests.

**Tech Stack:** Nuxt 4, Vue 3 (`<script setup>`), Vitest, Vue Test Utils, scoped CSS.

---

### Task 1: Create failing tests for mobile drawer behavior

**Files:**

- Create: `app/components/app/header.spec.ts`
- Test: `app/components/app/header.spec.ts`

**Step 1: Write failing test for mobile menu trigger semantics**

```ts
it('exposes mobile menu trigger semantics', () => {
  // mount header
  // assert trigger exists and has aria-haspopup="dialog"
  // assert aria-expanded reflects closed state initially
});
```

**Step 2: Run test to verify it fails**

Run: `pnpm test app/components/app/header.spec.ts`
Expected: FAIL because test file/behavior does not yet exist.

**Step 3: Write failing test for services disclosure semantics in drawer**

```ts
it('toggles services disclosure aria-expanded and controlled region state', async () => {
  // open drawer
  // click services toggle
  // assert aria-expanded true then false on second click
});
```

**Step 4: Run test to verify it fails**

Run: `pnpm test app/components/app/header.spec.ts`
Expected: FAIL because disclosure behavior not implemented yet.

**Step 5: Write failing test for focus restoration after close**

```ts
it('restores focus to menu trigger when dialog closes', async () => {
  // open drawer, close drawer
  // assert document.activeElement is trigger
});
```

**Step 6: Run test to verify it fails**

Run: `pnpm test app/components/app/header.spec.ts`
Expected: FAIL because close/focus management not implemented yet.

**Step 7: Commit**

```bash
git add app/components/app/header.spec.ts
git commit -m "test: add failing tests for mobile header drawer accessibility"
```

### Task 2: Implement minimal mobile dialog drawer behavior in header

**Files:**

- Modify: `app/components/app/header.vue`
- Test: `app/components/app/header.spec.ts`

**Step 1: Add minimal reactive state and refs**

```ts
const drawerOpen = ref(false);
const servicesExpanded = ref(false);
const menuButtonRef = ref<HTMLButtonElement | null>(null);
const dialogRef = ref<HTMLDialogElement | null>(null);
```

**Step 2: Add open/close handlers using native dialog API**

```ts
function openDrawer() {
  dialogRef.value?.showModal();
  drawerOpen.value = true;
}

function closeDrawer() {
  dialogRef.value?.close();
  drawerOpen.value = false;
}
```

**Step 3: Add focus handoff and focus restoration hooks**

```ts
function onDialogClose() {
  drawerOpen.value = false;
  servicesExpanded.value = false;
  menuButtonRef.value?.focus();
}
```

**Step 4: Add mobile drawer template markup with ADA attributes**

```vue
<button aria-haspopup="dialog" :aria-expanded="drawerOpen" />

<dialog ref="dialogRef" aria-label="Main menu" @close="onDialogClose">
  <!-- links + services disclosure -->
</dialog>
```

**Step 5: Implement services disclosure button + controlled region**

```vue
<button :aria-expanded="servicesExpanded" aria-controls="mobile-services-panel" />

<div id="mobile-services-panel" v-show="servicesExpanded">
```

**Step 6: Ensure drawer closes when a drawer link is activated**

```vue
<NuxtLink to="/projects" @click="closeDrawer">
Projects
</NuxtLink>
```

**Step 7: Run tests to verify pass**

Run: `pnpm test app/components/app/header.spec.ts`
Expected: PASS.

**Step 8: Commit**

```bash
git add app/components/app/header.vue app/components/app/header.spec.ts
git commit -m "feat: add accessible mobile dialog drawer navigation"
```

### Task 3: Add responsive and accessibility-focused styles

**Files:**

- Modify: `app/components/app/header.vue`
- Test: `app/components/app/header.spec.ts`

**Step 1: Add desktop/mobile visibility media queries**

```css
@media (min-width: 768px) {
  /* show desktop nav, hide mobile trigger/dialog */
}
@media (max-width: 767px) {
  /* hide desktop nav, show mobile trigger/dialog */
}
```

**Step 2: Style drawer panel and backdrop for mobile**

```css
dialog.mobile-drawer::backdrop {
  /* semi-transparent overlay */
}
dialog.mobile-drawer {
  /* side panel layout */
}
```

**Step 3: Add clear `:focus-visible` styles for all nav controls**

```css
a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--color-black);
}
```

**Step 4: Ensure touch target sizing for mobile controls**

```css
.mobile-trigger,
.mobile-link,
.mobile-services-toggle {
  min-height: 44px;
}
```

**Step 5: Respect reduced motion preferences**

```css
@media (prefers-reduced-motion: reduce) {
  /* disable drawer transitions */
}
```

**Step 6: Run targeted tests**

Run: `pnpm test app/components/app/header.spec.ts`
Expected: PASS.

**Step 7: Run broader verification**

Run: `pnpm test`
Expected: PASS with no new failures.

**Step 8: Commit**

```bash
git add app/components/app/header.vue app/components/app/header.spec.ts
git commit -m "style: finalize responsive and accessible mobile drawer nav"
```
