# Home Hero Cinematic Frame Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Upgrade the homepage hero to a cinematic premium treatment while preserving the existing content source and CTA path.

**Architecture:** Keep the implementation isolated to `app/components/home/hero-banner.vue` and add a focused regression test that locks in the new structural treatment. Use layered decorative elements and transform/opacity-only motion so the hero gains depth without introducing layout-heavy animation.

**Tech Stack:** Nuxt 4, Vue 3 SFCs, scoped CSS, Vitest

---

### Task 1: Add a regression for the cinematic hero structure

**Files:**

- Create: `app/components/home/hero-banner.spec.ts`
- Modify: `app/components/home/hero-banner.vue`

**Step 1: Write the failing test**

Add a component test that mounts the hero with stubbed data and asserts:

- an eyebrow label renders
- a framed content shell renders
- decorative cinematic layers render

**Step 2: Run test to verify it fails**

Run: `pnpm exec vitest run app/components/home/hero-banner.spec.ts`
Expected: FAIL because the current hero lacks the new structure.

**Step 3: Write minimal implementation**

Update the hero component to add:

- a small eyebrow
- a framed content shell
- layered decorative elements for the cinematic treatment

**Step 4: Run test to verify it passes**

Run: `pnpm exec vitest run app/components/home/hero-banner.spec.ts`
Expected: PASS

### Task 2: Implement the cinematic visual treatment

**Files:**

- Modify: `app/components/home/hero-banner.vue`

**Step 1: Strengthen image and overlay composition**

Adjust the template and scoped CSS to add:

- multi-layer overlays
- a richer lower-left reading zone
- a soft framed panel for the content

**Step 2: Upgrade typography and spacing**

Adjust headline width, subtitle width, and CTA grouping so the hero reads as a composed stage rather than a default text block.

**Step 3: Add restrained motion**

Use transform/opacity-only keyframes for:

- image drift
- staged copy reveal

Add `prefers-reduced-motion` fallbacks.

**Step 4: Verify the implementation**

Run: `pnpm exec vitest run app/components/home/hero-banner.spec.ts`
Expected: PASS

### Task 3: Regression and sanity check

**Files:**

- Test: `app/components/home/hero-banner.spec.ts`

**Step 1: Run the focused hero test**

Run: `pnpm exec vitest run app/components/home/hero-banner.spec.ts`
Expected: PASS

**Step 2: Run adjacent CTA coverage**

Run: `pnpm exec vitest run app/components/link-button.spec.ts`
Expected: PASS

**Step 3: Commit**

```bash
git add app/components/home/hero-banner.vue app/components/home/hero-banner.spec.ts docs/plans/2026-03-12-home-hero-cinematic-frame-design.md docs/plans/2026-03-12-home-hero-cinematic-frame.md
git commit -m "feat: add cinematic home hero treatment"
```
