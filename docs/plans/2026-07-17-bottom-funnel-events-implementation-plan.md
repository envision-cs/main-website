# Bottom-Funnel Events Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement six direct-owned PostHog events for homepage, service, project, footer, and contact-page bottom-funnel actions.

**Architecture:** Each interaction-owning page or component calls `posthog.capture()` directly with its full funnel payload and `source_page`. `cta-c` becomes analytics-agnostic and emits a generic `button-click`; `usePageView` remains responsible for contact-page arrival, while VueUse intersection observation captures one-shot visibility of contact details.

**Tech Stack:** Nuxt 4, Vue 3 Composition API, `@posthog/nuxt`, VueUse, TypeScript, Vite+ Test

---

### Task 1: Make service CTAs directly own `contact_cta_clicked`

**Files:**
- Create: `app/bottom-funnel-events.spec.ts`
- Modify: `app/components/cta-c.vue`
- Modify: `app/pages/services/construction-management.vue`
- Modify: `app/pages/services/design-build.vue`
- Modify: `app/pages/services/enhanced-preconstruction.vue`
- Modify: `app/pages/services/specialty-projects-division.vue`
- Modify: `app/pages/services/tenant-improvements.vue`

**Step 1: Write failing source-contract tests**

Create tests that read the component and five service pages. Assert that:

- `cta-c.vue` declares and emits `buttonClick`;
- `cta-c.vue` contains neither `usePostHog` nor `posthog.capture`;
- every service page binds `@button-click="trackContactCtaClick"`;
- every service handler directly captures `contact_cta_clicked` with bottom/process-milestone/down/high, `cta_source: 'service'`, a service name, and `source_page: route.path`.

**Step 2: Run the focused test and confirm red**

```bash
vp test app/bottom-funnel-events.spec.ts
```

Expected: FAIL because the generic emit and direct service captures do not exist.

**Step 3: Make `cta-c` presentation-only**

Remove `eventName`, `funnelEvent`, PostHog, and route concerns. Emit the existing section-header button action:

```ts
const emit = defineEmits<{ buttonClick: [] }>();

function handleCtaClick() {
  emit('buttonClick');
}
```

**Step 4: Add direct handlers to all five service pages**

Each page gets `usePostHog()`, `useRoute()`, and a local handler with the exact event payload. Remove the former `event-name` and `funnel-event` props from `cta-c`, then bind `@button-click`.

**Step 5: Run the focused test and confirm green**

```bash
vp test app/bottom-funnel-events.spec.ts
```

Expected: service and `cta-c` tests PASS.

### Task 2: Add homepage, project, and footer CTA captures

**Files:**
- Modify: `app/bottom-funnel-events.spec.ts`
- Modify: `app/components/hero-banner.vue`
- Modify: `app/components/app/footer.vue`
- Modify: `app/pages/projects/[id]/[project].vue`

**Step 1: Add failing tests**

Assert:

- the homepage hero captures `start_project_clicked` with bottom/process-milestone/down/high and `source_page`;
- the footer captures `contact_cta_clicked` with `cta_source: 'footer'`;
- the project page renders one Contact Us button after `.project-intro__body` and captures `contact_cta_clicked` with `cta_source: 'project'`, `project_title`, and `source_page`.

**Step 2: Run the focused test and confirm red**

```bash
vp test app/bottom-funnel-events.spec.ts
```

Expected: FAIL on the three unimplemented surfaces.

**Step 3: Implement direct captures**

Add local PostHog/route handlers to the hero and footer. The project page already has both dependencies; add its handler and this minimal template action immediately after the intro body:

```vue
<m-button to="/contact" size="sm" variant="outline" @click="trackContactCtaClick">
  Contact Us
</m-button>
```

Add only the small alignment style needed to keep the button content-sized.

**Step 4: Run the focused test and confirm green**

```bash
vp test app/bottom-funnel-events.spec.ts
```

Expected: homepage, project, and footer tests PASS.

### Task 3: Implement contact-page arrival, visibility, email, and phone events

**Files:**
- Modify: `app/bottom-funnel-events.spec.ts`
- Modify: `app/pages/contact.vue`

**Step 1: Add failing tests**

Assert that the contact page:

- uses `usePageView` for `contact_page_viewed` with bottom/process-milestone/down/medium-high;
- observes the primary contact-actions element at threshold `0.5`;
- captures `contact_details_viewed` once and stops the observer;
- directly captures `pursuits_email_clicked` with bottom/macro-conversion-proxy/out/very-high and `outbound_channel: 'email'`;
- directly captures `office_phone_clicked` with the same funnel classification and `outbound_channel: 'phone'`;
- no longer contains `contact_email_clicked` or `contact_phone_clicked`.

**Step 2: Run the focused test and confirm red**

```bash
vp test app/bottom-funnel-events.spec.ts
```

Expected: FAIL on the new page-view, visibility, and renamed outbound events.

**Step 3: Add page-view and outbound click captures**

Reuse `usePageView` for arrival. Rename the click handlers and add their exact direct PostHog payloads plus `source_page` and channel properties.

**Step 4: Add one-shot visibility capture**

Attach a template ref to `.contact-actions`. Use VueUse `useIntersectionObserver` with a `0.5` threshold, a component-local boolean guard, and `stop()` after the first qualifying intersection.

**Step 5: Run the focused test and confirm green**

```bash
vp test app/bottom-funnel-events.spec.ts
```

Expected: all bottom-funnel tests PASS.

### Task 4: Focused and repository validation

**Files:**
- Check all files modified in Tasks 1–3.

**Step 1: Run focused Vite+ checks**

```bash
vp check app/bottom-funnel-events.spec.ts app/components/cta-c.vue app/components/hero-banner.vue app/components/app/footer.vue app/pages/contact.vue app/pages/services/construction-management.vue app/pages/services/design-build.vue app/pages/services/enhanced-preconstruction.vue app/pages/services/specialty-projects-division.vue app/pages/services/tenant-improvements.vue 'app/pages/projects/[id]/[project].vue'
git diff --check
```

Expected: focused formatting, linting, type checks, and whitespace checks PASS.

**Step 2: Run repository-required validation**

```bash
vp check
vp test
```

Expected: PASS, or report existing unrelated baseline failures separately from the focused results.

**Step 3: Review scope**

Review the exact diff and `git status --short`. Preserve all pre-existing user changes and do not commit, merge, or push unless requested.
