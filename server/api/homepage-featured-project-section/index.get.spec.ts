import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const fetchMock = vi.fn();

describe('homepage featured project section endpoint', () => {
  beforeEach(() => {
    fetchMock.mockReset();

    vi.stubGlobal('defineEventHandler', (handler: unknown) => handler);
    vi.stubGlobal('useRuntimeConfig', () => ({
      strapi: {
        url: 'https://cms.example.com',
      },
    }));
    vi.stubGlobal('$fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.resetModules();
  });

  it('returns separate project arrays for each homepage section', async () => {
    fetchMock
      .mockResolvedValueOnce({
        data: {
          projects: [
            {
              title: 'Alpha',
              slug: 'alpha',
              completed: '2024-05-20',
              mainImage: { url: '/alpha.jpg' },
              sector: { name: 'Industrial', slug: 'industrial' },
            },
          ],
        },
      })
      .mockResolvedValueOnce({
        data: {
          projects: [
            {
              title: 'Beta',
              slug: 'beta',
              completed: '2023-01-10',
              mainImage: { url: '/beta.jpg' },
              sector: { name: 'Commercial', slug: 'commercial' },
            },
          ],
        },
      });

    const { default: handler } = await import('./index.get');

    await expect(handler()).resolves.toEqual({
      sectionOne: [
        {
          title: 'Alpha',
          link: '/projects/industrial/alpha',
          image: '/alpha.jpg',
          sector: 'Industrial',
          completed: '2024',
        },
      ],
      sectionTwo: [
        {
          title: 'Beta',
          link: '/projects/commercial/beta',
          image: '/beta.jpg',
          sector: 'Commercial',
          completed: '2023',
        },
      ],
    });

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0]?.[0]).toContain('/api/homepage-featured-project-section');
    expect(fetchMock.mock.calls[1]?.[0]).toContain('/api/featured-project-section-two');
  });
});
