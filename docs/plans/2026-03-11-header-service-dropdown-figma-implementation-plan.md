# Header Service Dropdown Figma Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Restyle the desktop `Services` dropdown to match the approved Figma node `2363:2497` while preserving current header interactions.

**Architecture:** Keep the current `NavigationMenu` state and trigger behavior in [`app/components/app/header.vue`](/Users/christopherpowe/Documents/main-website/app/components/app/header.vue), but replace the dropdown markup and CSS with a compact left-card-plus-grid layout derived from Figma. Use stable `data-test` hooks for the lead card, service grid, and service items so the structure is verified independently of visual CSS details.

**Tech Stack:** Nuxt 4, Vue 3, TypeScript, Reka UI, Vitest, Vue Test Utils, Figma MCP

---

### Task 1: Add a failing test for the Figma dropdown structure

**Files:**

- Modify: `app/components/app/header.spec.ts`

**Step 1: Write the failing test**

Add a test that opens the desktop services dropdown and asserts the lead panel, service grid, and five service link items exist.

**Step 2: Run test to verify it fails**

Run: `pnpm vitest app/components/app/header.spec.ts`
Expected: FAIL because the current dropdown does not expose the new Figma structure hooks.

### Task 2: Implement the Figma dropdown structure and styles

**Files:**

- Modify: `app/components/app/header.vue`

**Step 1: Replace the current mega-menu content**

Remove the existing tall column layout and replace it with the compact lead card plus service grid layout from Figma.

**Step 2: Wire in the Figma image asset**

Use the Figma-provided image asset as the background image source for the lead card.

**Step 3: Update CSS**

Match the panel height, left/right proportions, spacing, typography hierarchy, and blue overlay treatment from Figma as closely as practical in the project’s CSS system.

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
