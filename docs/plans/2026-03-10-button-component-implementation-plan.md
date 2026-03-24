# Button Component Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a native `button.vue` component that visually matches `link-button.vue` and supports the same size/variant API plus native button semantics.

**Architecture:** Implement a standalone `app/components/button.vue` that mirrors the exact class structure and CSS used by `link-button.vue`, swapping `NuxtLink` for `<button>`. Add a focused unit test file to lock down API defaults and class/attribute behavior.

**Tech Stack:** Nuxt 4, Vue 3 SFC (`<script setup lang="ts">`), Vitest, Vue Test Utils

---

### Task 1: Add Failing Tests for New Button Component

**Files:**

- Create: `app/components/button.spec.ts`
- Test: `app/components/button.spec.ts`

**Step 1: Write the failing test**

```ts
import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import Button from "./button.vue";

describe("Button", () => {
  it("uses primary variant by default", () => {
    const wrapper = mount(Button, { slots: { default: "Contact" } });
    expect(wrapper.find(".btn").classes()).toContain("btn--primary");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `pnpm test -- app/components/button.spec.ts`
Expected: FAIL because `app/components/button.vue` does not exist yet.

**Step 3: Commit**

```bash
git add app/components/button.spec.ts
git commit -m "test: add button component behavior specs"
```

### Task 2: Implement Minimal Button Component

**Files:**

- Create: `app/components/button.vue`
- Modify: `app/components/button.spec.ts`
- Test: `app/components/button.spec.ts`

**Step 1: Write minimal implementation**

Create `app/components/button.vue`:

- `withDefaults(defineProps(...))` with:
  - `size?: 'sm' | 'md' | 'lg'` default `md`
  - `variant?: 'primary' | 'secondary'` default `primary`
  - `type?: 'button' | 'submit' | 'reset'` default `button`
  - `disabled?: boolean` default `false`
- Template:
  - root `<button :type="type" :disabled="disabled" class="btn" :class="`btn--${variant}`">`
  - nested `.btn-main`, `.btn-text`, `.btn-overlay` matching `link-button.vue`
- Styles:
  - Copy the scoped CSS from `link-button.vue`
  - Add disabled styling and disabled hover guards:
    - `.btn:disabled { opacity: 0.55; cursor: not-allowed; }`
    - `.btn:hover:not(:disabled) ...` rules for hover transitions.

**Step 2: Expand tests**

In `app/components/button.spec.ts`, include tests for:

- default `size` class (`btn-main--md`)
- explicit `sm` and `lg` classes
- `secondary` variant class
- overlay existence
- default button `type="button"`
- `disabled` attribute forwarding

**Step 3: Run test to verify it passes**

Run: `pnpm test -- app/components/button.spec.ts`
Expected: PASS

**Step 4: Commit**

```bash
git add app/components/button.vue app/components/button.spec.ts
git commit -m "feat: add styled native button component"
```

### Task 3: Final Verification

**Files:**

- Test: `app/components/button.spec.ts`
- Optional regression check: `app/components/link-button.spec.ts`

**Step 1: Run targeted tests**

Run: `pnpm test -- app/components/button.spec.ts app/components/link-button.spec.ts`
Expected: PASS

**Step 2: Commit if needed**

```bash
git add docs/plans/2026-03-10-button-component-design.md docs/plans/2026-03-10-button-component-implementation-plan.md
git commit -m "docs: add button component design and implementation plan"
```
