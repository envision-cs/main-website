import { afterEach, describe, expect, it, vi } from 'vite-plus/test';

import { getDynamicSitemapUrls } from './sitemap-urls';

const SITEMAP_FIELDS = ['slug', 'updatedAt', 'publishedAt', 'createdAt'];

function getSelectedFields(url: URL) {
  return [...url.searchParams.entries()]
    .filter(([key]) => /^fields\[\d+\]$/.test(key))
    .map(([, value]) => value);
}

describe('dynamic sitemap URLs', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('requests only sitemap fields and the project sector slug', async () => {
    const requestedUrls: string[] = [];

    vi.stubGlobal('useRuntimeConfig', () => ({
      strapi: { url: 'https://cms.example.com' },
    }));
    vi.stubGlobal(
      '$fetch',
      vi.fn(async (url: string) => {
        requestedUrls.push(url);

        if (url.includes('/api/projects?')) {
          return {
            data: [
              {
                slug: 'sample-project',
                updatedAt: '2026-07-10T00:00:00.000Z',
                sectors: [{ slug: 'business-corporate' }],
              },
            ],
          };
        }

        if (url.includes('/api/sectors?')) {
          return {
            data: [
              {
                slug: 'business-corporate',
                publishedAt: '2026-07-09T00:00:00.000Z',
              },
            ],
          };
        }

        return {
          data: [
            {
              slug: 'sample-member',
              createdAt: '2026-07-08T00:00:00.000Z',
            },
          ],
        };
      }),
    );

    const entries = await getDynamicSitemapUrls();
    const urls = requestedUrls.map((url) => new URL(url));
    const projectsUrl = urls.find((url) => url.pathname === '/api/projects');
    const sectorsUrl = urls.find((url) => url.pathname === '/api/sectors');
    const teamMembersUrl = urls.find((url) => url.pathname === '/api/team-members');

    expect(projectsUrl).toBeDefined();
    expect(sectorsUrl).toBeDefined();
    expect(teamMembersUrl).toBeDefined();
    expect(getSelectedFields(projectsUrl!)).toEqual(SITEMAP_FIELDS);
    expect(getSelectedFields(sectorsUrl!)).toEqual(SITEMAP_FIELDS);
    expect(getSelectedFields(teamMembersUrl!)).toEqual(SITEMAP_FIELDS);
    expect(projectsUrl!.searchParams.get('populate[sectors][fields][0]')).toBe('slug');
    expect(requestedUrls.every((url) => !url.includes('populate=*'))).toBe(true);
    expect(entries).toEqual([
      expect.objectContaining({
        loc: '/projects/business-corporate',
        lastmod: '2026-07-09T00:00:00.000Z',
      }),
      expect.objectContaining({
        loc: '/projects/business-corporate/sample-project',
        lastmod: '2026-07-10T00:00:00.000Z',
      }),
      expect.objectContaining({
        loc: '/team/sample-member',
        lastmod: '2026-07-08T00:00:00.000Z',
      }),
    ]);
  });
});
