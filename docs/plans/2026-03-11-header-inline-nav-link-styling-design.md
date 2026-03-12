# Header Inline Nav Link Styling Design

**Context**

The desktop header in [`app/components/app/header.vue`](/Users/christopherpowe/Documents/main-website/app/components/app/header.vue) mixes top-level navigation treatments. One item uses `link-button` while the others use plain `NavigationMenuLink`/`NuxtLink` styling. The requested change is to make all top-level desktop navigation links feel related to `link-button` while still reading as primary navigation rather than call-to-action buttons.

**Goals**

- Apply one consistent inline treatment to all desktop top-level nav links and the `Services` trigger.
- Borrow from `link-button` shape language without making the nav visually as heavy as the `Contact` CTA.
- Preserve existing header behavior, desktop mega menu state, and mobile navigation.

**Recommended Approach**

Keep the current `NavigationMenuLink` and `NavigationMenuTrigger` structure, but introduce a shared desktop nav-link style class. The new treatment should use compact horizontal padding, a subtle border, restrained corner radius, and a light hover/focus/open fill. This keeps interaction and semantics unchanged while unifying the row visually.

**Testing Strategy**

- Extend [`app/components/app/header.spec.ts`](/Users/christopherpowe/Documents/main-website/app/components/app/header.spec.ts) to verify all desktop top-level navigation items carry the shared inline-nav class.
- Preserve the existing mega-menu open/close test so the visual refactor does not regress behavior.
