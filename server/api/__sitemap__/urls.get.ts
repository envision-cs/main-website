import type { SitemapUrlInput } from '@nuxtjs/sitemap';
import type { Project, Sector, Team } from '~~/shared/types/content-types';

import { catchError } from '~~/shared/utils/catch-error';

type SitemapEntry = Exclude<SitemapUrlInput, string>;

function toLastmod(entry: {
  updatedAt?: string | null;
  publishedAt?: string | null;
  createdAt?: string | null;
}) {
  return entry.updatedAt || entry.publishedAt || entry.createdAt || undefined;
}

function addUrl(urls: Map<string, SitemapEntry>, entry: SitemapEntry) {
  if (!entry.loc || urls.has(entry.loc)) return;

  urls.set(entry.loc, entry);
}

function getPrimaryProjectSector(project: Project): Sector | undefined {
  const source = project.sectors ?? project.sector;
  const sectors = Array.isArray(source) ? source : source ? [source] : [];

  return sectors.find((sector) => Boolean(sector?.slug && sector?.name));
}

async function fetchCollection<T>(url: string) {
  const [error, response] = await catchError(
    $fetch<{ data?: T[] }>(url, {
      method: 'GET',
    }),
  );

  if (error) {
    console.warn(`[api/__sitemap__/urls] Failed to fetch ${url}: ${error.message}`);
    return [];
  }

  return response?.data ?? [];
}

export default defineSitemapEventHandler(async () => {
  const config = useRuntimeConfig();
  const urls = new Map<string, SitemapEntry>();

  const [projects, sectors, teams] = await Promise.all([
    fetchCollection<Project>(`${config.strapi.url}/api/projects?populate=*`),
    fetchCollection<Sector>(`${config.strapi.url}/api/sectors?populate=*`),
    fetchCollection<Team>(`${config.strapi.url}/api/teams?populate[team_members][populate]=*`),
  ]);

  for (const sector of sectors) {
    if (!sector.slug) continue;

    addUrl(urls, {
      loc: `/projects/${sector.slug}`,
      lastmod: toLastmod(sector),
      changefreq: 'weekly',
      priority: 0.75,
    });
  }

  for (const project of projects) {
    const sector = getPrimaryProjectSector(project);
    if (!project.slug || !sector?.slug) continue;

    addUrl(urls, {
      loc: `/projects/${sector.slug}/${project.slug}`,
      lastmod: toLastmod(project),
      changefreq: 'monthly',
      priority: 0.7,
    });
  }

  for (const team of teams) {
    for (const member of team.team_members ?? []) {
      if (!member.slug) continue;

      addUrl(urls, {
        loc: `/team/${member.slug}`,
        lastmod: toLastmod(member),
        changefreq: 'monthly',
        priority: 0.55,
      });
    }
  }

  return [...urls.values()];
});
