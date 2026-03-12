# Main CSS Palette Style Tile Design

**Date:** 2026-03-11
**Scope:** Extract the palette tokens from `app/assets/css/main.css` and arrange them on the Paper canvas as a polished style board.

## Goal

Create a presentation-ready palette board on the Paper canvas that uses the actual color tokens defined in `main.css` and makes the palette easy to review visually.

## Source Tokens

The board should use these token families from `app/assets/css/main.css`:

1. `envision-blue` shades `50` through `950`
2. `envision-green` shades `50` through `950`
3. `envision-gray` shades `300` through `700`

## Decisions

1. Use a polished `Style Tile` layout instead of a raw token grid.
2. Show only actual palette tokens from `main.css`, not semantic aliases as separate swatches.
3. Organize the board into three palette groups: blue, green, and gray.
4. Order swatches light-to-dark within each group.
5. Label each swatch with its token name and color value so the board is both visual and referential.

## Layout

The style tile should include:

1. A title/header area that identifies the board as the main site palette.
2. Three grouped palette sections with distinct headings.
3. Large enough swatches to compare tones quickly at a glance.
4. Clean spacing and typography so the board reads like a polished internal design artifact.

## Visual Direction

The composition should feel intentional and presentation-ready rather than purely technical. Typography and spacing should support scanning, while the color swatches remain the primary visual focus.
