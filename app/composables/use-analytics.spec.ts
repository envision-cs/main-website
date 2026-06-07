import { describe, expect, it } from 'vite-plus/test';

import {
  isInternalCtaDestination,
  resolveAnalyticsLinkEvent,
  resolveAnalyticsRouteEvent,
} from './use-analytics';

describe('analytics taxonomy', () => {
  it('resolves project detail routes', () => {
    expect(resolveAnalyticsRouteEvent({ path: '/projects/healthcare/moffitt-linac' })).toEqual({
      event: 'project_viewed',
      properties: {
        path: '/projects/healthcare/moffitt-linac',
        full_path: '/projects/healthcare/moffitt-linac',
        route_name: undefined,
        sector_slug: 'healthcare',
        project_slug: 'moffitt-linac',
      },
    });
  });

  it('resolves service and team detail routes', () => {
    expect(resolveAnalyticsRouteEvent({ path: '/services/design-build' })?.event).toBe(
      'service_viewed',
    );
    expect(resolveAnalyticsRouteEvent({ path: '/team/allen-greene-sr' })?.event).toBe(
      'team_member_viewed',
    );
  });

  it('resolves email, phone, social, and CTA link events without PII destinations', () => {
    expect(resolveAnalyticsLinkEvent({ href: 'mailto:test@example.com' })?.event).toBe(
      'email_clicked',
    );
    expect(resolveAnalyticsLinkEvent({ href: 'tel:8139970330' })?.event).toBe('phone_clicked');
    expect(
      resolveAnalyticsLinkEvent({ href: 'https://www.linkedin.com/company/envision-cs/' }),
    ).toMatchObject({
      event: 'external_social_clicked',
      properties: {
        destination_host: 'linkedin.com',
      },
    });
    expect(
      resolveAnalyticsLinkEvent({ href: '/contact', label: 'Contact', cta: true }),
    ).toMatchObject({
      event: 'cta_clicked',
      properties: {
        destination: '/contact',
      },
    });
  });

  it('marks only local destinations as automatic CTAs', () => {
    expect(isInternalCtaDestination('/contact')).toBe(true);
    expect(isInternalCtaDestination('#cta')).toBe(true);
    expect(isInternalCtaDestination('mailto:test@example.com')).toBe(false);
    expect(isInternalCtaDestination('https://linkedin.com/company/envision-cs')).toBe(false);
  });
});
