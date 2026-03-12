# Main CSS Palette Style Tile Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Place a polished style-tile palette board on the Paper canvas using the actual color tokens defined in `app/assets/css/main.css`.

**Architecture:** Read the palette tokens from the stylesheet, translate them into a presentation-oriented board layout, and create the board directly in Paper as a standalone artboard. Organize the board into a header and three palette sections so the output is both visually polished and useful as a reference.

**Tech Stack:** CSS token source in `app/assets/css/main.css`, Paper MCP tools

---

### Task 1: Extract the palette inventory

**Files:**

- Read: `app/assets/css/main.css`
- Reference: `docs/plans/2026-03-11-main-css-palette-style-tile-design.md`

**Step 1: Confirm the token groups**

Read the color token definitions for:

- `envision-blue` 50-950
- `envision-green` 50-950
- `envision-gray` 300-700

**Step 2: Preserve the display order**

Arrange each family from light to dark so the board presents a visible tonal ramp.

### Task 2: Create the style-tile artboard

**Files:**

- Source: `app/assets/css/main.css`

**Step 1: Create a new Paper artboard**

Use a desktop-sized artboard with enough width for three palette groups and a header.

**Step 2: Add the board header**

Create a title and short subtitle identifying the board as the site palette extracted from `main.css`.

**Step 3: Add three palette sections**

Create one section each for blue, green, and gray with consistent spacing and headings.

### Task 3: Populate swatches and labels

**Files:**

- Source: `app/assets/css/main.css`

**Step 1: Add swatches for each token**

Render a swatch for every actual token in the three families.

**Step 2: Add token metadata**

Label each swatch with the token name and color value.

**Step 3: Check readability**

Use contrasting text treatment where needed so labels stay legible against light and dark fills.

### Task 4: Verify the board visually

**Files:**

- Output target: Paper canvas

**Step 1: Capture the artboard screenshot**

Use the Paper screenshot tool to inspect spacing, alignment, and readability.

**Step 2: Make targeted fixes if needed**

Adjust spacing, text size, or section alignment without changing the overall layout direction.
