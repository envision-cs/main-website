import type { SitemapEntry } from '~~/server/utils/sitemap-urls';

import { addSitemapUrl, getDynamicSitemapUrls } from '~~/server/utils/sitemap-urls';

const STATIC_SITEMAP_URLS: SitemapEntry[] = [
  { loc: '/', changefreq: 'weekly', priority: 0.7 },
  { loc: '/about', changefreq: 'weekly', priority: 0.7 },
  { loc: '/contact', changefreq: 'weekly', priority: 0.7 },
  { loc: '/projects', changefreq: 'weekly', priority: 0.7 },
  { loc: '/services', changefreq: 'weekly', priority: 0.7 },
  { loc: '/team', changefreq: 'weekly', priority: 0.7 },
  { loc: '/trade-partners', changefreq: 'weekly', priority: 0.7 },
  { loc: '/projects/beck-envision', changefreq: 'weekly', priority: 0.7 },
  { loc: '/services/construction-management', changefreq: 'weekly', priority: 0.7 },
  { loc: '/services/design-build', changefreq: 'weekly', priority: 0.7 },
  { loc: '/services/development-and-master-planning', changefreq: 'weekly', priority: 0.7 },
  { loc: '/services/enhanced-preconstruction', changefreq: 'weekly', priority: 0.7 },
  { loc: '/services/specialty-projects-division', changefreq: 'weekly', priority: 0.7 },
  { loc: '/services/tenant-improvements', changefreq: 'weekly', priority: 0.7 },
];

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&apos;');
}

function normalizeSiteUrl(value: unknown) {
  return typeof value === 'string' && value.length > 0
    ? value.replace(/\/$/, '')
    : 'https://www.envision-cs.com';
}

function resolveLoc(siteUrl: string, loc: string) {
  return loc.startsWith('http') ? loc : `${siteUrl}${loc.startsWith('/') ? loc : `/${loc}`}`;
}

function buildUrlXml(siteUrl: string, entry: SitemapEntry) {
  const lines = [
    '  <url>',
    `    <loc>${escapeXml(resolveLoc(siteUrl, entry.loc || '/'))}</loc>`,
  ];

  if (entry.lastmod) {
    lines.push(`    <lastmod>${escapeXml(String(entry.lastmod))}</lastmod>`);
  }

  if (entry.changefreq) {
    lines.push(`    <changefreq>${escapeXml(String(entry.changefreq))}</changefreq>`);
  }

  if (entry.priority !== undefined) {
    lines.push(`    <priority>${escapeXml(String(entry.priority))}</priority>`);
  }

  lines.push('  </url>');
  return lines.join('\n');
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const siteUrl = normalizeSiteUrl(config.site?.url);
  const urls = new Map<string, SitemapEntry>();

  for (const entry of STATIC_SITEMAP_URLS) {
    addSitemapUrl(urls, entry);
  }

  for (const entry of await getDynamicSitemapUrls()) {
    addSitemapUrl(urls, entry);
  }

  setHeader(event, 'Content-Type', 'text/xml; charset=UTF-8');
  setHeader(event, 'Cache-Control', 'public, max-age=600, s-maxage=600, stale-while-revalidate=3600');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...[...urls.values()].map((entry) => buildUrlXml(siteUrl, entry)),
    '</urlset>',
  ].join('\n');
});
