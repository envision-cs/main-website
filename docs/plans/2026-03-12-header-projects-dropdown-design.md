# Header Projects Dropdown Design

**Context**

[`/Users/christopherpowe/Documents/envision/projects-dropdown/app/components/app/header.vue`](/Users/christopherpowe/Documents/envision/projects-dropdown/app/components/app/header.vue) already renders a desktop `Services` mega-menu with a featured panel, a link grid, and open/close behavior managed through `desktopMenuValue`. `Projects` is still a plain top-level link.

**Approved Direction**

Use the same desktop mega-menu pattern for `Projects` as `Services`, but populate the grid with top-level project categories plus `Beck/Envision`, not individual project links.

**Design**

- Keep the current `reka-ui` navigation structure and route-reset behavior.
- Add a second desktop menu item for `Projects` that uses the existing mega-menu shell and styling.
- Give the projects panel a featured card linking to `/projects` and a grid of taxonomy links matching the projects navigation:
  - `Arts and Entertainment`
  - `Athletics`
  - `Aviation`
  - `Business/Corporate`
  - `Healthcare`
  - `Industrial`
  - `Religious`
  - `Beck/Envision`
- Preserve the existing mobile drawer behavior for now because the request only targets the header desktop link.

**Testing**

- Extend [`/Users/christopherpowe/Documents/envision/projects-dropdown/app/components/app/header.spec.ts`](/Users/christopherpowe/Documents/envision/projects-dropdown/app/components/app/header.spec.ts) with a failing test that opens the `Projects` trigger and asserts the featured panel plus the category labels render.
