# Mobile Nav GSAP Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Hide the desktop contact CTA on mobile and add GSAP-driven mobile drawer slide + staggered nav-link animations.

**Architecture:** Keep `header.vue` structure unchanged except for a mobile-only visibility class on the CTA. In `mobile-nav-drawer.vue`, move dialog control to an explicit `:open` state handler so close can be animated before state commit, and use `useGSAP()` timelines/tweens for panel and links.

**Tech Stack:** Nuxt 4, Vue 3 (`<script setup lang="ts">`), Reka UI Dialog/Collapsible, `v-gsap-nuxt` (`useGSAP`), Vitest + Vue Test Utils

---

### Task 1: Add Failing Tests for Header CTA Contract and Drawer Animation Hooks

**Files:**

- Modify: `app/components/app/header.spec.ts`
- Create: `app/components/app/mobile-nav-drawer.spec.ts`
- Test: `app/components/app/header.spec.ts`
- Test: `app/components/app/mobile-nav-drawer.spec.ts`

**Step 1: Write failing tests**

- In `header.spec.ts`, add assertion that header CTA has mobile-hide class (e.g. `header-cta--desktop-only`).
- In new `mobile-nav-drawer.spec.ts`:
  - stub global `useGSAP`
  - assert open flow invokes GSAP animation calls
  - assert close flow invokes slide-out call
  - assert nav elements include the shared stagger marker attribute

**Step 2: Run tests to verify failure**

Run: `pnpm vitest run app/components/app/header.spec.ts app/components/app/mobile-nav-drawer.spec.ts`
Expected: FAIL because class/attributes and animation orchestration do not exist yet.

### Task 2: Implement Header Mobile CTA Visibility

**Files:**

- Modify: `app/components/app/header.vue`
- Test: `app/components/app/header.spec.ts`

**Step 1: Minimal implementation**

- Add desktop-only utility class to header CTA instance:
  - `class="header-cta header-cta--desktop-only"`
- Add CSS:
  - hide at `<768px`
  - show at `>=768px`

**Step 2: Run targeted test**

Run: `pnpm vitest run app/components/app/header.spec.ts`
Expected: CTA class contract test passes.

### Task 3: Implement GSAP Drawer + Staggered Links

**Files:**

- Modify: `app/components/app/mobile-nav-drawer.vue`
- Test: `app/components/app/mobile-nav-drawer.spec.ts`

**Step 1: Minimal implementation**

- Replace `v-model:open` with controlled props:
  - `:open="mobileDrawerOpen"`
  - `@update:open="onDrawerOpenChange"`
- Add animation helpers:
  - query drawer/overlay/nav links by stable `data-test` + `data-anim`
  - open tween/timeline: overlay fade, content from right, links stagger in
  - close tween: links out, content to right, overlay fade, then set `mobileDrawerOpen=false`
- Add `data-anim="mobile-nav-link"` markers to nav targets (services toggle + links).

**Step 2: Run tests**

Run: `pnpm vitest run app/components/app/mobile-nav-drawer.spec.ts`
Expected: PASS

### Task 4: Final Verification

**Files:**

- Test: `app/components/app/header.spec.ts`
- Test: `app/components/app/mobile-nav-drawer.spec.ts`

**Step 1: Run full targeted suite**

Run: `pnpm vitest run app/components/app/header.spec.ts app/components/app/mobile-nav-drawer.spec.ts`
Expected: PASS
