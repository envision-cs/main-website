# Header Inline Nav Link Styling Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Unify the desktop header’s top-level navigation links with a lighter inline style inspired by `link-button`.

**Architecture:** Update [`app/components/app/header.vue`](/Users/christopherpowe/Documents/main-website/app/components/app/header.vue) to apply a shared class to the desktop `Services` trigger and all top-level `NavigationMenuLink` items. Implement the visual treatment in CSS only, keeping existing navigation semantics and mega-menu behavior intact.

**Tech Stack:** Nuxt 4, Vue 3, TypeScript, Reka UI, Vitest, Vue Test Utils

---

### Task 1: Add a failing header test for shared desktop nav styling

**Files:**

- Modify: `app/components/app/header.spec.ts`

**Step 1: Write the failing test**

Add a test that mounts the header and asserts all top-level desktop nav items expose the shared inline-nav class hook.

**Step 2: Run test to verify it fails**

Run: `pnpm vitest app/components/app/header.spec.ts`
Expected: FAIL because the shared class is not yet applied consistently.

**Step 3: Verify the failure reason**

Run: `pnpm vitest app/components/app/header.spec.ts`
Expected: FAIL on the new class assertions only.

### Task 2: Apply shared inline nav styling

**Files:**

- Modify: `app/components/app/header.vue`

**Step 1: Normalize markup**

Apply the same shared class to the `Services` trigger and all top-level desktop links.

**Step 2: Implement CSS**

Add a restrained inline-nav style inspired by `link-button`: compact height, subtle border, light background fill on hover/focus/open, and smooth transitions.

**Step 3: Preserve CTA hierarchy**

Keep the `Contact` `link-button` visually stronger than the main navigation links.

**Step 4: Run tests**

Run: `pnpm vitest app/components/app/header.spec.ts`
Expected: PASS

### Task 3: Verify linting

**Files:**

- Modify: `app/components/app/header.vue`
- Modify: `app/components/app/header.spec.ts`

**Step 1: Run targeted lint**

Run: `pnpm eslint app/components/app/header.vue app/components/app/header.spec.ts`
Expected: PASS
