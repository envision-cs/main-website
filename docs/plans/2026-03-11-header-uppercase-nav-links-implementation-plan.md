# Header Uppercase Nav Links Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restyle the desktop header navigation into uppercase inline links with a thin underline/open-state indicator instead of pill-shaped buttons.

**Architecture:** Keep the existing shared `.desktop-inline-nav-link` markup in [`app/components/app/header.vue`](/Users/christopherpowe/Documents/main-website/app/components/app/header.vue) and replace only its CSS. Use a pseudo-element underline so hover, focus, and open state are handled by one visual system across the trigger and plain links.

**Tech Stack:** Nuxt 4, Vue 3, TypeScript, Reka UI, Vitest, Vue Test Utils

---

### Task 1: Add a failing assertion for the shared nav trigger contract

**Files:**

- Modify: `app/components/app/header.spec.ts`

**Step 1: Write the failing test**

Extend the shared-nav test to assert the `Services` trigger carries the shared class and exposes `aria-expanded`.

**Step 2: Run test to verify it fails**

Run: `pnpm vitest app/components/app/header.spec.ts`
Expected: FAIL if the trigger contract is incomplete.

### Task 2: Replace the pill styling with uppercase nav styling

**Files:**

- Modify: `app/components/app/header.vue`

**Step 1: Keep markup stable**

Do not change nav structure beyond what is needed for the shared class/open-state hook.

**Step 2: Update CSS**

Remove border, background, blur, and pill radius from `.desktop-inline-nav-link`, then add uppercase text, tracking, and an animated underline/bottom rule for hover, focus, and `aria-expanded='true'`.

**Step 3: Run tests**

Run: `pnpm vitest app/components/app/header.spec.ts`
Expected: PASS

### Task 3: Verify linting

**Files:**

- Modify: `app/components/app/header.vue`
- Modify: `app/components/app/header.spec.ts`

**Step 1: Run targeted lint**

Run: `pnpm eslint app/components/app/header.vue app/components/app/header.spec.ts`
Expected: PASS
