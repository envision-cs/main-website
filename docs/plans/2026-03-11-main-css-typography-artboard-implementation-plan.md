# Main CSS Typography Artboard Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a separate Paper artboard that presents the typography tokens defined in `app/assets/css/main.css`.

**Architecture:** Read the typography definitions from the stylesheet, translate them into a reference-oriented style board, and create the board as a separate Paper artboard next to the existing palette board. Organize the artboard into a header, family overview, weight specimens, and token-scale sections so the result works as both design artifact and token reference.

**Tech Stack:** CSS token source in `app/assets/css/main.css`, Paper MCP tools

---

### Task 1: Inventory the typography system

**Files:**

- Read: `app/assets/css/main.css`
- Reference: `docs/plans/2026-03-11-main-css-typography-artboard-design.md`

**Step 1: Confirm the font family definitions**

Collect the `Proxima Nova` weights defined in the `@font-face` entries and the `--font-sans` stack.

**Step 2: Confirm the size tokens**

Collect:

- `--text-xs` through `--text-9xl`
- `--font-size-text-t1` through `--font-size-text-t4`
- `--font-size-h4` through `--font-size-huge`

### Task 2: Create the typography artboard

**Files:**

- Source: `app/assets/css/main.css`

**Step 1: Create a new related Paper artboard**

Place a new desktop-sized artboard next to the existing palette board.

**Step 2: Add the artboard header**

Create a title and short subtitle explaining that the artboard is derived from `main.css`.

**Step 3: Add the main sections**

Create the `Font Family`, `Weight Samples`, and `Type Scales` sections with consistent visual treatment.

### Task 3: Populate the typography content

**Files:**

- Source: `app/assets/css/main.css`

**Step 1: Add the family overview**

Show the primary family and fallback stack.

**Step 2: Add weight specimens**

Show sample text for the loaded `Proxima Nova` weights defined in the CSS.

**Step 3: Add size token specimens**

Show the raw `text-*` scale and the semantic `text-t*` and `h*` tokens with their CSS values.

### Task 4: Verify the artboard visually

**Files:**

- Output target: Paper canvas

**Step 1: Capture the artboard screenshot**

Inspect spacing, readability, and hierarchy with the Paper screenshot tool.

**Step 2: Make targeted fixes if needed**

Adjust type size, spacing, or section proportions without changing the overall layout direction.
