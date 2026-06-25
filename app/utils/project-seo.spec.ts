import { describe, expect, it } from 'vite-plus/test';

import {
  buildProjectImageAlt,
  buildProjectImageFilename,
  buildProjectSeoDescription,
  buildProjectSeoTitle,
  formatProjectHeading,
  getProjectLocationParts,
} from './project-seo';

describe('project SEO utilities', () => {
  it('formats a localized project heading without duplicating the city', () => {
    expect(formatProjectHeading('USF Honors College', 'Tampa, FL')).toBe(
      'USF Honors College in Tampa, Florida',
    );
    expect(formatProjectHeading('Tampa International Airport', 'Tampa, FL')).toBe(
      'Tampa International Airport',
    );
  });

  it('normalizes Florida locations for metadata and schema', () => {
    expect(getProjectLocationParts('Tampa, Florida')).toEqual({
      city: 'Tampa',
      stateCode: 'FL',
      stateName: 'Florida',
    });
  });

  it('keeps generated titles and descriptions within search result limits', () => {
    const title = buildProjectSeoTitle({
      title: 'Judy Genshaft Honors College at the University of South Florida',
      serviceType: 'Institutional Build',
      location: 'Tampa, FL',
    });
    const description = buildProjectSeoDescription({
      title: 'Judy Genshaft Honors College',
      serviceType: 'Construction Management',
      location: 'Tampa, FL',
      description:
        'A long project description '.repeat(20) +
        'covering project planning, execution, and results.',
    });

    expect(title.length).toBeLessThanOrEqual(60);
    expect(description.length).toBeLessThanOrEqual(155);
  });

  it('builds contextual image alt text and upload filename recommendations', () => {
    expect(
      buildProjectImageAlt({
        projectTitle: 'Judy Genshaft Honors College',
        location: 'Tampa, FL',
        sector: 'Higher Education',
        index: 0,
      }),
    ).toBe(
      'Higher Education project at Judy Genshaft Honors College in Tampa, Florida, image 1 by Envision Construction Services',
    );

    expect(
      buildProjectImageFilename({
        projectSlug: 'judy-genshaft-honors-college',
        location: 'Tampa, FL',
        index: 0,
        extension: '.jpeg',
      }),
    ).toBe('judy-genshaft-honors-college-tampa-fl-01.jpeg');
  });
});
