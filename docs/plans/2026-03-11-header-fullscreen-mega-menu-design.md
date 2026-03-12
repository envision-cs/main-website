# Header Fullscreen Mega Menu Design

**Context**

The desktop header in [`app/components/app/header.vue`](/Users/christopherpowe/Documents/main-website/app/components/app/header.vue) already uses `reka-ui` `NavigationMenu` primitives for the `Services` dropdown. The current implementation opens a constrained viewport-sized panel inside the header layout. The requested change is interaction-only: preserve the site's existing visual language while making the desktop dropdown behave like a full-screen mega menu similar to the referenced Pura header.

**Goals**

- Keep the current brand, links, and mobile drawer behavior intact.
- Make the desktop `Services` dropdown open as a full-viewport panel beneath the fixed header.
- Close the menu on route change, overlay click, and existing menu dismissal interactions.
- Avoid replacing the desktop navigation system unless necessary.

**Recommended Approach**

Retain `reka-ui` for desktop state management and accessibility, but replace the constrained viewport styling with a fixed desktop-only mega menu shell:

- The header remains fixed at the top of the page.
- Opening `Services` renders a full-width, viewport-height panel positioned below the header.
- A backdrop overlay fills the remaining page area and closes the menu when clicked.
- The content within the panel is reorganized into a multi-column mega menu layout using the existing service links and a supporting feature card.

This approach minimizes risk by preserving the component tree and accessibility primitives while changing layout and open-state presentation.

**Component Changes**

- Keep `desktopMenuValue` as the single source of truth for whether the desktop menu is open.
- Add computed state for `isDesktopMenuOpen`.
- Mark the desktop root/header with an open-state class or attribute for styling hooks.
- Render a backdrop element only when the desktop menu is open.
- Restructure `NavigationMenuContent` markup into grouped columns so it can expand cleanly across the full screen.

**Interaction Details**

- The mega menu opens from the existing `Services` trigger.
- The panel spans the full viewport width and uses available viewport height beneath the fixed header.
- Clicking the backdrop closes the menu.
- Route navigation continues to close the menu via the existing watcher.
- Mobile drawer remains unchanged and unaffected by desktop-specific changes.

**Testing Strategy**

- Extend [`app/components/app/header.spec.ts`](/Users/christopherpowe/Documents/main-website/app/components/app/header.spec.ts) with a desktop-menu behavior test.
- Assert that the full-screen panel markers are not present when closed.
- Open the `Services` menu and verify the full-screen panel and backdrop markers appear.
- Click the backdrop and verify the menu closes.

**Risks**

- `reka-ui` viewport positioning can fight custom fixed positioning if partially reused. The implementation should either fully style the existing viewport shell for fixed behavior or neutralize the parts that constrain sizing.
- Desktop-only selectors must not leak into mobile behavior.
