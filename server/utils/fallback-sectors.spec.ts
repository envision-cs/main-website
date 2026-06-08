import { describe, expect, it } from 'vite-plus/test';
import { getFallbackSectors } from './fallback-sectors';

describe('fallback sectors', () => {
  it('maps static project sectors to the API sector shape', () => {
    const sectors = getFallbackSectors();

    expect(sectors).toEqual([
      expect.objectContaining({
        name: 'Arts & Entertainment',
        slug: 'arts-and-entertainment',
        image: expect.objectContaining({
          url: '/sectors/arts_and_entertainment.jpg',
        }),
      }),
      expect.objectContaining({
        name: 'Athletics',
        slug: 'athletics',
        image: expect.objectContaining({
          url: '/sectors/athletics.jpg',
        }),
      }),
      expect.objectContaining({
        name: 'Business & Corporate',
        slug: 'business-corporate',
        image: expect.objectContaining({
          url: '/sectors/business_corporate.jpg',
        }),
      }),
    ]);
  });

  it('does not include the aggregate all-projects category', () => {
    expect(getFallbackSectors().map(sector => sector.slug)).not.toContain('all');
  });
});
