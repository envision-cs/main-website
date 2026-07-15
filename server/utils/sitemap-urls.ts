import type { SitemapUrlInput } from '@nuxtjs/sitemap';

import { catchError } from '~~/shared/utils/catch-error';

export type SitemapEntry = Exclude<SitemapUrlInput, string>;

type TimestampedEntity = {
  updatedAt?: string | null;
  publishedAt?: string | null;
  createdAt?: string | null;
};

type SitemapSector = TimestampedEntity & {
  slug?: string | null;
};

type SitemapProject = TimestampedEntity & {
  slug?: string | null;
  sector?: SitemapSector[] | SitemapSector | null;
  sectors?: SitemapSector[] | null;
};

type SitemapTeamMember = TimestampedEntity & {
  slug?: string | null;
};

const SITEMAP_FIELDS = ['slug', 'updatedAt', 'publishedAt', 'createdAt'] as const;

function createFieldsQuery(fields: readonly string[]) {
  const query = new URLSearchParams();

  fields.forEach((field, index) => {
    query.set(`fields[${index}]`, field);
  });

  return query;
}

function createProjectsQuery() {
  const query = createFieldsQuery(SITEMAP_FIELDS);
  query.set('populate[sectors][fields][0]', 'slug');

  return query;
}

function toLastmod(entry: {
  updatedAt?: string | null;
  publishedAt?: string | null;
  createdAt?: string | null;
}) {
  return entry.updatedAt || entry.publishedAt || entry.createdAt || undefined;
}

export function addSitemapUrl(urls: Map<string, SitemapEntry>, entry: SitemapEntry) {
  if (!entry.loc || urls.has(entry.loc)) return;

  urls.set(entry.loc, entry);
}

function getPrimaryProjectSector(project: SitemapProject): SitemapSector | undefined {
  const source = project.sectors ?? project.sector;
  const sectors = Array.isArray(source) ? source : source ? [source] : [];

  return sectors.find((sector) => Boolean(sector?.slug));
}

async function fetchCollection<T>(url: string) {
  const [error, response] = await catchError(
    $fetch<{ data?: T[] }>(url, {
      method: 'GET',
    }),
  );

  if (error) {
    console.warn(`[sitemap] Failed to fetch ${url}: ${error.message}`);
    return [];
  }

  return response?.data ?? [];
}

export async function getDynamicSitemapUrls() {
  const config = useRuntimeConfig();
  const urls = new Map<string, SitemapEntry>();
  const baseUrl = config.strapi.url;
  const projectsQuery = createProjectsQuery();
  const collectionQuery = createFieldsQuery(SITEMAP_FIELDS);

  const [projects, sectors, teamMembers] = await Promise.all([
    fetchCollection<SitemapProject>(`${baseUrl}/api/projects?${projectsQuery}`),
    fetchCollection<SitemapSector>(`${baseUrl}/api/sectors?${collectionQuery}`),
    fetchCollection<SitemapTeamMember>(
      `${baseUrl}/api/team-members?${collectionQuery}`,
    ),
  ]);

  for (const sector of sectors) {
    if (!sector.slug) continue;

    addSitemapUrl(urls, {
      loc: `/projects/${sector.slug}`,
      lastmod: toLastmod(sector),
      changefreq: 'weekly',
      priority: 0.75,
    });
  }

  for (const project of projects) {
    const sector = getPrimaryProjectSector(project);
    if (!project.slug || !sector?.slug) continue;

    addSitemapUrl(urls, {
      loc: `/projects/${sector.slug}/${project.slug}`,
      lastmod: toLastmod(project),
      changefreq: 'monthly',
      priority: 0.7,
    });
  }

  for (const member of teamMembers) {
    if (!member.slug) continue;

    addSitemapUrl(urls, {
      loc: `/team/${member.slug}`,
      lastmod: toLastmod(member),
      changefreq: 'monthly',
      priority: 0.55,
    });
  }

  return [...urls.values()];
}
