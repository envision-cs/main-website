# Main CSS Typography Artboard Design

**Date:** 2026-03-11
**Scope:** Extract the typography definitions from `app/assets/css/main.css` and present them on a separate Paper artboard.

## Goal

Create a standalone typography reference artboard in Paper that presents the font family, available weights, and defined size tokens from `main.css` in a polished, presentation-ready format.

## Source Tokens

The artboard should use these typography definitions from `app/assets/css/main.css`:

1. `@font-face` entries for `Proxima Nova` at weights `300`, `400`, `600`, and `800`
2. `--font-sans` stack
3. Scale tokens `--text-xs` through `--text-9xl`
4. Semantic tokens `--font-size-text-t1` through `--font-size-text-t4`
5. Semantic tokens `--font-size-h4` through `--font-size-huge`

## Decisions

1. Use a separate artboard instead of combining typography with the palette board.
2. Mirror the polish of the palette style tile so both boards feel like a paired system.
3. Show the actual CSS token names and values on the board.
4. Split the content into three sections: `Font Family`, `Weight Samples`, and `Type Scales`.
5. Use `Proxima Nova` for the specimen presentation so the board reflects the real site typeface.

## Layout

The typography artboard should include:

1. A title/header area identifying the board as the typography system extracted from `main.css`
2. A `Font Family` section showing the primary family and the fallback stack
3. A `Weight Samples` section showing the loaded font weights with visible sample text
4. A `Type Scales` section split into raw scale tokens and semantic display/body tokens

## Visual Direction

The composition should read as a clean internal style board rather than a raw CSS dump. Large type specimens should do most of the visual work, while the token labels and values remain easy to inspect.
