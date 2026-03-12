# Header Uppercase Nav Links Design

**Context**

The desktop header’s top-level navigation was recently unified with a shared inline class. The next refinement is to remove the pill treatment entirely and restyle the row as uppercase primary navigation with a simpler, more editorial hover/open state.

**Goals**

- Keep the shared desktop nav class and existing header behavior.
- Remove pill visuals: no rounded container, no background wash, no bordered button framing.
- Apply uppercase text styling and a thin underline/bottom-rule interaction for hover and open state.

**Recommended Approach**

Update the shared `.desktop-inline-nav-link` styles in [`app/components/app/header.vue`](/Users/christopherpowe/Documents/main-website/app/components/app/header.vue) to use uppercase text, lighter spacing-driven nav presentation, and a pseudo-element underline that animates on hover, focus, and `Services` open state. Keep markup unchanged so only the nav treatment shifts.

**Testing Strategy**

- Preserve the existing shared-class test in [`app/components/app/header.spec.ts`](/Users/christopherpowe/Documents/main-website/app/components/app/header.spec.ts).
- Add one assertion that the `Services` trigger keeps the shared class and open-state attribute used by the underline treatment.
