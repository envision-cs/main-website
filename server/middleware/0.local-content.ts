/**
 * Serves site content from in-repo snapshots (see server/content-snapshots/).
 * These snapshots are the site's source of truth for content, so the site can be
 * run and edited entirely from code — no Strapi/CMS access required.
 *
 * To change content, edit the files under server/content-snapshots/.
 *
 * Fallback: for any GET content path NOT present in the snapshots, this returns
 * undefined and lets the normal API route run — so if a CMS is still configured
 * (STRAPI_URL set), it transparently backfills anything not yet captured.
 */
import { snapshots } from '../content-snapshots';

const { singletons, maps } = snapshots;

export default defineEventHandler((event) => {
  if (event.method !== 'GET')
    return;

  const pathname = event.path.split('?')[0];

  // Exact-match content endpoints (lists + singletons).
  if (pathname in singletons)
    return singletons[pathname as keyof typeof singletons];

  // Parameterized detail endpoints: /api/projects/:slug, /api/services/:slug, /api/team/:slug
  for (const prefix of Object.keys(maps) as (keyof typeof maps)[]) {
    if (pathname.startsWith(prefix)) {
      const key = decodeURIComponent(pathname.slice(prefix.length));
      const map = maps[prefix];
      if (key in map)
        return map[key];
      // The snapshots are authoritative for these content types, so an unknown
      // slug genuinely does not exist (e.g. a removed team member). Return 404
      // rather than falling through to a CMS that might still have stale data.
      throw createError({ statusCode: 404, statusMessage: 'Not found' });
    }
  }

  // Not a snapshotted content path — let the normal handler run.
  return undefined;
});
