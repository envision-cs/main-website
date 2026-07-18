# Bottom-funnel events design

## Goal

Add six bottom-funnel PostHog events covering homepage project-start intent, contact CTA clicks, contact-page arrival and visibility, and outbound pursuits email and office phone clicks.

## Ownership

Each click surface owns a direct `posthog.capture()` call. Funnel metadata is intentionally repeated at the point of interaction instead of introducing a shared event-properties API.

The generic `cta-c` component will stop owning analytics configuration. It will emit a `button-click` event, and each service page will capture `contact_cta_clicked` in its own script.

Existing composables remain in use where they already match the behavior:

- `usePageView` captures `contact_page_viewed`.
- VueUse intersection observation detects when contact details enter the viewport.

## Event map

### `start_project_clicked`

- Surface: homepage hero “Start your project” button.
- Funnel: bottom / process milestone / down / high.
- Additional property: `source_page`.

### `contact_cta_clicked`

- Surfaces: the five service-page CTA blocks, the site footer Contact Us button, and a new Contact Us button on each project detail page.
- Funnel: bottom / process milestone / down / high.
- Additional properties: `source_page` and `cta_source` (`service`, `footer`, or `project`).
- Service pages also include `service_name`; project pages include `project_title`.

The new project button appears immediately after `.project-intro__body` and contains only the label “Contact Us.”

### `contact_page_viewed`

- Surface: contact-page arrival.
- Funnel: bottom / process milestone / down / medium-high.
- Captured with `usePageView`, which adds `source_page`.

### `contact_details_viewed`

- Surface: the primary pursuits email and office phone action group on the contact page.
- Funnel: bottom / process milestone / down / high.
- Fires once per contact-page visit when at least 50% of the action group is visible.
- Additional property: `source_page`.

### `pursuits_email_clicked`

- Surface: pursuits email link.
- Funnel: bottom / macro conversion proxy / out / very-high.
- Additional properties: `source_page` and `outbound_channel: 'email'`.
- Replaces `contact_email_clicked`.

### `office_phone_clicked`

- Surface: office phone link.
- Funnel: bottom / macro conversion proxy / out / very-high.
- Additional properties: `source_page` and `outbound_channel: 'phone'`.
- Replaces `contact_phone_clicked`.

## Component changes

- `hero-banner.vue`: add the homepage start-project handler.
- `cta-c.vue`: emit `button-click` and remove component-owned PostHog props and capture logic.
- Five service pages: add direct contact CTA handlers and bind them to `button-click`.
- Project detail page: add the minimal Contact Us button and direct handler.
- Footer: add a direct contact CTA handler.
- Contact page: add the page-view event, visibility observer, and renamed outbound click handlers.

Header Contact links remain outside this event set because project and service pages now have explicit CTA surfaces.

## Error handling

PostHog remains optional, matching existing project code. If the client is unavailable, captures no-op without affecting navigation. The visibility observer stops after the first qualifying intersection and is cleaned up with the component lifecycle.

## Testing

Focused tests will verify:

- all six event names and exact funnel properties;
- direct ownership of click captures;
- `cta-c` emits without owning analytics;
- all five service CTA bindings;
- project button placement and source properties;
- contact-page one-shot visibility behavior;
- removal of the two superseded contact event names.
