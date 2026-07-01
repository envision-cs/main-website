export const SITE_URL = 'https://www.envision-cs.com';

export function toAbsoluteSiteUrl(pathOrUrl: string | null | undefined = '/') {
  const value = pathOrUrl?.trim() || '/';

  return new URL(value, SITE_URL).toString();
}

export function toAbsoluteOptionalSiteUrl(pathOrUrl: string | null | undefined) {
  const value = pathOrUrl?.trim();

  if (!value) return undefined;

  return new URL(value, SITE_URL).toString();
}
