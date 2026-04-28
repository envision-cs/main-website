# Home Hero Cinematic Frame Design

**Scope:** Refresh the homepage hero in `app/components/home/hero-banner.vue` to feel more cinematic and premium without changing the content source or CTA path.

## Direction

Preserve the existing structural bones: full-bleed image, lower copy block, and a single project-start CTA. Shift the visual treatment from a basic dark-overlay hero to a composed cinematic frame.

The hero should feel:

- premium rather than flashy
- sculpted rather than flat
- atmospheric rather than decorative

## Visual Strategy

### Image Staging

Keep the current hero image as the foundation, but treat it more like a film still:

- stronger vignette around the outer edges
- a denser lower-left contrast zone for the copy
- a subtle warm highlight wash to create depth
- very slow background scale/drift to avoid a static first impression

### Content Framing

Anchor the text in a deliberate lower-left stage instead of letting it sit directly on the image:

- add a small eyebrow and thin rule to establish hierarchy
- constrain the text block more tightly so the headline feels larger and more intentional
- introduce a backdrop panel with soft tint and blur so the copy reads as a framed composition, not floating text

### Typography

Make the headline feel more luxurious and commanding:

- use larger display sizing on desktop
- tighten line length
- keep the subtitle lighter and slightly warmer than plain white
- preserve readability over expressiveness

### Motion

Use one restrained cinematic motion layer:

- slow image drift/scale
- soft staggered reveal for eyebrow, title, summary, and CTA

No bounce, no layout-shifting motion, and no decorative micro-interactions.

## Constraints

- No changes to Strapi content fetching
- No new CMS fields
- Keep CTA destination as `/contact`
- Maintain accessible text contrast and reduced-motion support
- Avoid generic AI hero tropes like neon gradients, glass cards everywhere, or centered marketing metrics

## Success Criteria

- The hero reads as visibly more premium on first paint
- The copy block has a stronger focal presence
- The image, overlays, and CTA feel like a cohesive composition
- The result still fits the current site’s brand language and performance constraints
