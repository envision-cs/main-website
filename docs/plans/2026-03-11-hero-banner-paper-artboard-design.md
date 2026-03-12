# Hero Banner Paper Artboard Design

**Date:** 2026-03-11
**Scope:** Translate `app/components/home/hero-banner.vue` into a standalone Paper artboard.

## Goal

Create a high-fidelity static hero artboard in Paper that mirrors the structure and visual hierarchy of `hero-banner.vue`.

## Source Component

The source is `app/components/home/hero-banner.vue`, which defines:

1. A full-height hero section
2. A full-bleed background image
3. A top gradient overlay above the image
4. A bottom-aligned content block
5. An uppercase display heading, supporting paragraph, and secondary CTA

## Decisions

1. Build the hero as its own standalone artboard in the existing Paper file.
2. Mirror the component structure rather than abstract it into a style board.
3. Use a local architectural image that matches the component’s residence hall at dusk intent.
4. Keep the content block low in the composition to reflect the component’s `margin-top: auto` behavior.
5. Use the existing site typography and palette so the artboard matches the other boards already in the file.

## Layout

The artboard should include:

1. A full-viewport hero frame
2. A full-bleed image background
3. A dark top gradient overlay layer for contrast and mood
4. A content container with generous padding
5. A title block containing heading, subtitle, and CTA near the lower-left portion of the frame

## Content Approach

Because the Vue component gets its content from Strapi at runtime, the Paper artboard should use representative static copy and a relevant local image while preserving the original structure and hierarchy.

## Visual Direction

The hero should feel like a production-ready landing-page section, not a wireframe. The image, overlay, and typography should carry most of the visual weight, with the CTA presented as a clear secondary action.
