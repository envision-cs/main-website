# Build notes

Prepared 27 October 2026. This folder replaces the original handoff folder.

## What was wrong with the original

The pages were exported as Claude Design working files. They carried
`{{ }}` placeholders, `<sc-for>` loops and `<image-slot>` elements, and the
finished page was assembled in the visitor's browser by `support.js`, which
downloaded React and ReactDOM from unpkg.com on every page load.

That put a third party CDN in the critical path of a paid ad landing page.
If unpkg is slow or unreachable, the page is blank.

## What changed

1. React 18.3.1 and ReactDOM 18.3.1 are now served from this folder at
   `vendor/`. `support.js` points at those local copies instead of
   unpkg.com. Subresource integrity hashes were cleared because the files
   are now same origin.
2. The Google Fonts import for Barlow was removed from the design system
   stylesheet, and the two font variables now use Proxima Nova. Barlow was
   never painting any visible text on these pages, so nothing looks
   different. Proxima Nova still loads from envision-cs.com/fonts/.
3. En dashes in the timeline dropdown became hyphens: "1-3 months" and
   "3-6 months", on both landing pages.

Nothing else was touched. No copy, no layout, no photos, no form, no pixel.

## Verified on 27 October 2026

All four pages were rendered in a real browser from this folder.

- No `{{ }}` placeholders remain in any rendered page
- No broken images on any page
- No requests to unpkg.com or fonts.googleapis.com
- Remaining external calls are the intended ones only: Vimeo, the Meta
  pixel, and the Proxima Nova files on envision-cs.com
- noindex, nofollow present on all four pages
- Meta Pixel 29227754990247374 present on all four pages
- Every visible element renders in Proxima Nova
- The image tabs switch panels
- No JavaScript errors on any page

## Photos

47 of the 51 files in assets/ appear on a page. Four never render:

- assets/logo-full.webp
- assets/usl-deck-after-web.jpg
- assets/usl-gd-box-web.jpg
- assets/ut-pepin-before-web.jpg

They were left in place. Someone who knows the campaign should say whether
content is missing from a page or whether these are spares.

## Still open

- The Vimeo videos were blocked during testing, so playback and the
  pause-on-scroll behaviour have not been confirmed. Test both on a real
  page before any ad spend.
- The forms were not submitted during testing. Submit each one and confirm
  the email reaches pursuit@envision-cs.com and the visitor lands on the
  matching thank you page.
- Claude Design is being retired on 14 December 2026. After that this
  folder is the source for these pages.
