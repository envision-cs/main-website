import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vite-plus/test';

const readSource = (path: string) => readFileSync(resolve(process.cwd(), path), 'utf8');

const ctaSource = readSource('app/components/cta-c.vue');
const heroSource = readSource('app/components/hero-banner.vue');
const footerSource = readSource('app/components/app/footer.vue');
const projectSource = readSource('app/pages/projects/[id]/[project].vue');
const contactSource = readSource('app/pages/contact.vue');
const servicePages = [
  {
    path: 'app/pages/services/construction-management.vue',
    name: 'Construction Management',
  },
  { path: 'app/pages/services/design-build.vue', name: 'Design-Build' },
  {
    path: 'app/pages/services/enhanced-preconstruction.vue',
    name: 'Enhanced Preconstruction',
  },
  {
    path: 'app/pages/services/specialty-projects-division.vue',
    name: 'Specialty Projects Division',
  },
  { path: 'app/pages/services/tenant-improvements.vue', name: 'Tenant Improvements' },
].map((page) => ({ ...page, source: readSource(page.path) }));

describe('bottom-funnel service CTA tracking', () => {
  it('keeps cta-c presentation-only and emits its button click', () => {
    expect(ctaSource).toContain('defineEmits<{');
    expect(ctaSource).toContain('buttonClick: []');
    expect(ctaSource).toContain("emit('buttonClick')");
    expect(ctaSource).not.toContain('usePostHog');
    expect(ctaSource).not.toContain('posthog.capture');
    expect(ctaSource).not.toContain('eventName?:');
    expect(ctaSource).not.toContain('funnelEvent?:');
  });

  it.each(servicePages)('captures contact_cta_clicked directly from $path', ({ name, source }) => {
    expect(source).toContain('const posthog = usePostHog();');
    expect(source).toContain('const route = useRoute();');
    expect(source).toContain("posthog?.capture('contact_cta_clicked', {");
    expect(source).toContain("funnel_stage: 'bottom'");
    expect(source).toContain("conversion_role: 'process_milestone'");
    expect(source).toContain("funnel_movement: 'down'");
    expect(source).toContain("intent: 'high'");
    expect(source).toContain("cta_source: 'service'");
    expect(source).toContain(`service_name: '${name}'`);
    expect(source).toContain('source_page: route.path');
    expect(source).toContain('@button-click="trackContactCtaClick"');
  });
});

describe('bottom-funnel site CTA tracking', () => {
  it('captures the homepage start-project CTA directly', () => {
    expect(heroSource).toContain("posthog?.capture('start_project_clicked', {");
    expect(heroSource).toContain("funnel_stage: 'bottom'");
    expect(heroSource).toContain("conversion_role: 'process_milestone'");
    expect(heroSource).toContain("funnel_movement: 'down'");
    expect(heroSource).toContain("intent: 'high'");
    expect(heroSource).toContain('source_page: route.path');
    expect(heroSource).toContain('@click="trackStartProjectClick"');
  });

  it('captures the footer contact CTA directly', () => {
    expect(footerSource).toContain("posthog?.capture('contact_cta_clicked', {");
    expect(footerSource).toContain("funnel_stage: 'bottom'");
    expect(footerSource).toContain("conversion_role: 'process_milestone'");
    expect(footerSource).toContain("funnel_movement: 'down'");
    expect(footerSource).toContain("intent: 'high'");
    expect(footerSource).toContain("cta_source: 'footer'");
    expect(footerSource).toContain('source_page: route.path');
    expect(footerSource).toContain('@click="trackContactCtaClick"');
  });

  it('captures the project contact CTA directly with project context', () => {
    expect(projectSource).toContain("posthog?.capture('contact_cta_clicked', {");
    expect(projectSource).toContain("funnel_stage: 'bottom'");
    expect(projectSource).toContain("conversion_role: 'process_milestone'");
    expect(projectSource).toContain("funnel_movement: 'down'");
    expect(projectSource).toContain("intent: 'high'");
    expect(projectSource).toContain("cta_source: 'project'");
    expect(projectSource).toContain('project_title: page.value?.title');
    expect(projectSource).toContain('source_page: route.path');
    expect(projectSource).toContain('@click="trackContactCtaClick"');
    expect(projectSource).toMatch(
      /class="project-intro__body"[\s\S]*?<m-button[\s\S]*?to="\/contact"[\s\S]*?>[\s\S]*?Contact Us/,
    );
  });
});

describe('bottom-funnel contact-page tracking', () => {
  it('captures the contact-page arrival through usePageView', () => {
    expect(contactSource).toContain("eventName: 'contact_page_viewed'");
    expect(contactSource).toContain("funnel_stage: 'bottom'");
    expect(contactSource).toContain("conversion_role: 'process_milestone'");
    expect(contactSource).toContain("funnel_movement: 'down'");
    expect(contactSource).toContain("intent: 'medium-high'");
  });

  it('captures contact details once when at least half visible', () => {
    expect(contactSource).toContain("useTemplateRef<HTMLElement>('contactDetailsRef')");
    expect(contactSource).toContain('useIntersectionObserver(');
    expect(contactSource).toContain('threshold: 0.5');
    expect(contactSource).toContain('hasTrackedContactDetails');
    expect(contactSource).toContain('stopContactDetailsObserver()');
    expect(contactSource).toContain("posthog?.capture('contact_details_viewed', {");
    expect(contactSource).toContain("funnel_stage: 'bottom'");
    expect(contactSource).toContain("conversion_role: 'process_milestone'");
    expect(contactSource).toContain("funnel_movement: 'down'");
    expect(contactSource).toContain("intent: 'high'");
    expect(contactSource).toContain('source_page: route.path');
    expect(contactSource).toContain('ref="contactDetailsRef"');
  });

  it('captures pursuits email clicks with outbound context', () => {
    expect(contactSource).toContain("posthog?.capture('pursuits_email_clicked', {");
    expect(contactSource).toContain("conversion_role: 'macro_conversion_proxy'");
    expect(contactSource).toContain("funnel_movement: 'out'");
    expect(contactSource).toContain("intent: 'very-high'");
    expect(contactSource).toContain("outbound_channel: 'email'");
    expect(contactSource).toContain('source_page: route.path');
    expect(contactSource).toContain('@click="trackPursuitsEmailClick"');
    expect(contactSource).not.toContain('contact_email_clicked');
  });

  it('captures office phone clicks with outbound context', () => {
    expect(contactSource).toContain("posthog?.capture('office_phone_clicked', {");
    expect(contactSource).toContain("conversion_role: 'macro_conversion_proxy'");
    expect(contactSource).toContain("funnel_movement: 'out'");
    expect(contactSource).toContain("intent: 'very-high'");
    expect(contactSource).toContain("outbound_channel: 'phone'");
    expect(contactSource).toContain('source_page: route.path');
    expect(contactSource).toContain('@click="trackOfficePhoneClick"');
    expect(contactSource).not.toContain('contact_phone_clicked');
  });
});
