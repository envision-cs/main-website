# Header Projects Dropdown Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a desktop `Projects` mega-menu in the header that matches the
existing `Services` dropdown interaction pattern and lists project categories
instead of individual projects.

**Architecture:** Reuse the current header `NavigationMenu` state model by
supporting both `services` and `projects` values, then render a second
`NavigationMenuItem` with the same shell layout and shared styling hooks.
Populate the projects grid from a local category list aligned with the existing
projects taxonomy and cover the behavior with a focused Vitest component spec in
the existing header test file.

**Tech Stack:** Nuxt 4, Vue 3, TypeScript, reka-ui, Vitest, Vue Test Utils

---

### Task 1: Add a failing header spec for the projects menu

**Files:**

- Modify: `/Users/christopherpowe/Documents/envision/projects-dropdown/app/components/app/header.spec.ts`

**Step 1: Write the failing test**

Add a spec that opens the desktop `Projects` trigger and expects:

- `[data-test="desktop-projects-trigger"]` exists
- `[data-test="projects-feature-panel"]` exists after opening
- `[data-test="projects-grid"]` exists after opening
- category labels such as `Religious`, `Athletics`, and `Beck/Envision` render

**Step 2: Run test to verify it fails**

Run: `pnpm test app/components/app/header.spec.ts`

Expected: FAIL because the projects trigger and dropdown hooks do not exist yet.

### Task 2: Implement the minimal projects mega-menu

**Files:**

- Modify: `/Users/christopherpowe/Documents/envision/projects-dropdown/app/components/app/header.vue`

**Step 1: Update menu state**

Allow the computed open state and menu helpers to work for either `services` or `projects`.

**Step 2: Add projects menu content**

Add:

- a `projectsFeatureImage` constant
- a `projectDropdownItems` array containing top-level categories and
  `Beck/Envision`
- a `Projects` `NavigationMenuItem` with trigger and content hooks

Use the existing mega-menu structure and shared CSS classes where possible.

**Step 3: Keep links aligned with existing routes**

Point the featured panel to `/projects` and point grid items to the same
category routes used by the projects sidebar, plus `/projects/beck-envision`.

### Task 3: Verify behavior

**Files:**

- Modify: `/Users/christopherpowe/Documents/envision/projects-dropdown/app/components/app/header.spec.ts`
- Modify: `/Users/christopherpowe/Documents/envision/projects-dropdown/app/components/app/header.vue`

**Step 1: Run the targeted header spec**

Run: `pnpm test app/components/app/header.spec.ts`

Expected: PASS.

**Step 2: Run a focused lint check if needed**

Run: `pnpm exec eslint app/components/app/header.vue app/components/app/header.spec.ts`

Expected: no lint errors.
