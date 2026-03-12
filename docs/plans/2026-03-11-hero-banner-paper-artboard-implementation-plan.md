# Hero Banner Paper Artboard Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a standalone Paper artboard that faithfully recreates the `app/components/home/hero-banner.vue` component as a static design.

**Architecture:** Read the Vue component structure, map its layered hero layout into a single Paper artboard, and use a local image asset to represent the runtime Strapi image. Recreate the image, overlay, content block, and CTA hierarchy so the result feels like the actual component translated into a static canvas.

**Tech Stack:** Vue component source in `app/components/home/hero-banner.vue`, local image assets in `public/`, Paper MCP tools

---

### Task 1: Inventory the hero structure

**Files:**

- Read: `app/components/home/hero-banner.vue`
- Reference: `docs/plans/2026-03-11-hero-banner-paper-artboard-design.md`

**Step 1: Confirm the main visual layers**

Identify the section container, background image, overlay, title block, and CTA.

**Step 2: Confirm the layout behavior**

Preserve the full-height composition and low content placement from the component.

### Task 2: Create the hero artboard

**Files:**

- Source: `app/components/home/hero-banner.vue`
- Image: `public/USFSPResidenceHall-Exteriors-DuskLandscapefromRamp.jpg`

**Step 1: Create a new related Paper artboard**

Place a new desktop-sized artboard in the existing Paper file.

**Step 2: Add the hero container**

Create the base hero frame sized like a full-screen landing section.

**Step 3: Add the image and overlay**

Use the local image asset and add a dark top-oriented gradient overlay.

### Task 3: Add the content block

**Files:**

- Source: `app/components/home/hero-banner.vue`

**Step 1: Add the heading and subtitle**

Use representative static content with the same hierarchy as the component.

**Step 2: Add the CTA**

Create a secondary-style button matching the site system.

**Step 3: Place the content low in the composition**

Keep the content block near the lower-left region of the hero.

### Task 4: Verify the artboard visually

**Files:**

- Output target: Paper canvas

**Step 1: Capture the artboard screenshot**

Inspect spacing, image balance, overlay contrast, and text readability.

**Step 2: Make targeted fixes if needed**

Adjust padding, overlay strength, or type sizing without changing the overall structure.
