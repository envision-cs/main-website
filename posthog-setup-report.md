<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into the Envision marketing website. The `@posthog/nuxt` module was already present in `package.json` but its configuration was commented out and PostHog was loading via `@nuxt/scripts` registry instead — a setup that would have caused double initialization. The scripts registry block was removed and `posthogConfig` was enabled with the existing Cloudflare reverse proxy (`https://p.envision-cs.com`), client-side exception capture, server-side error autocapture, and source map upload support. Environment variables were written to `.env.local`. Events were instrumented across 9 files covering the two highest-intent conversion actions (email and phone clicks on the contact page), all primary CTA buttons, all 6 service detail pages, and both engagement actions on project detail pages.

| Event | Description | File |
|---|---|---|
| `contact_email_clicked` | User clicks the email link on the Contact page | `app/pages/contact.vue` |
| `contact_phone_clicked` | User clicks the phone number link on the Contact page | `app/pages/contact.vue` |
| `cta_clicked` | User clicks any primary CTA button (props: `label`, `href`) | `app/components/cta-c.vue` |
| `project_viewed` | User views a project detail page (props: `project_title`, `project_sector`, `project_location`, `project_slug`) | `app/pages/projects/[id]/[project].vue` |
| `project_gallery_image_opened` | User opens a gallery image in the lightbox (props: `project_title`, `project_slug`) | `app/pages/projects/[id]/[project].vue` |
| `service_page_viewed` | User views the Construction Management service page (props: `service_name`) | `app/pages/services/construction-management.vue` |
| `service_page_viewed` | User views the Design-Build service page | `app/pages/services/design-build.vue` |
| `service_page_viewed` | User views the Enhanced Preconstruction service page | `app/pages/services/enhanced-preconstruction.vue` |
| `service_page_viewed` | User views the Tenant Improvements service page | `app/pages/services/tenant-improvements.vue` |
| `service_page_viewed` | User views the Specialty Projects Division service page | `app/pages/services/specialty-projects-division.vue` |
| `service_page_viewed` | User views the Development & Master Planning service page | `app/pages/services/development-and-master-planning.vue` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- [Analytics basics (wizard) — Dashboard](https://us.posthog.com/project/224584/dashboard/1702143)
- [Contact Intent Events (wizard)](https://us.posthog.com/project/224584/insights/F51jKi45) — Email and phone clicks over time
- [CTA Clicks by Label (wizard)](https://us.posthog.com/project/224584/insights/3rwI39xU) — Which CTA buttons are clicked most
- [Service Page Interest (wizard)](https://us.posthog.com/project/224584/insights/VVGg0C26) — Which services are researched most
- [Project Portfolio Engagement (wizard)](https://us.posthog.com/project/224584/insights/3dsrLgHG) — Project views and gallery opens over time
- [Portfolio to Contact Funnel (wizard)](https://us.posthog.com/project/224584/insights/6rDQBpeM) — Conversion from portfolio research to contact intent

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
