const DEFAULT_SITE_URL = 'https://envision-cs.com';
const TITLE_LIMIT = 60;
const DESCRIPTION_LIMIT = 155;

const STATE_NAMES: Record<string, string> = {
  FL: 'Florida',
};

function compact(value: string | null | undefined): string {
  return value?.replace(/\s+/g, ' ').trim() ?? '';
}

function truncateAtWord(value: string, limit: number): string {
  const normalized = compact(value);
  if (normalized.length <= limit) return normalized;

  const candidate = normalized.slice(0, Math.max(limit - 1, 0));
  const lastSpace = candidate.lastIndexOf(' ');
  const trimmed = lastSpace >= Math.floor(limit * 0.65) ? candidate.slice(0, lastSpace) : candidate;

  return `${trimmed.trimEnd()}…`;
}

export function limitSeoText(value: string, limit: number): string {
  return truncateAtWord(value, limit);
}

export function stripMarkdown(value: string | null | undefined): string {
  return compact(
    value
      ?.replace(/```[\s\S]*?```/g, ' ')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[#*_>`~|]/g, ' ')
      .replace(/^\s*[-+]\s+/gm, ' '),
  );
}

export function getProjectLocationParts(location: string | null | undefined) {
  const normalized = compact(location);
  const [city = '', state = ''] = normalized.split(',').map((part) => part.trim());
  const stateCode = state.toUpperCase() === 'FLORIDA' ? 'FL' : state.toUpperCase();

  return {
    city,
    stateCode,
    stateName: STATE_NAMES[stateCode] || state,
  };
}

export function formatProjectHeading(title: string, location?: string | null): string {
  const normalizedTitle = compact(title);
  const { city, stateName } = getProjectLocationParts(location);
  const localizedName = [city, stateName].filter(Boolean).join(', ');

  if (!localizedName || normalizedTitle.toLowerCase().includes(city.toLowerCase())) {
    return normalizedTitle;
  }

  return `${normalizedTitle} in ${localizedName}`;
}

export function buildProjectSeoTitle(input: {
  title: string;
  serviceType?: string | null;
  location?: string | null;
}): string {
  const title = compact(input.title);
  const serviceType = compact(input.serviceType) || 'Commercial';
  const { city, stateCode } = getProjectLocationParts(input.location);
  const location = [city, stateCode].filter(Boolean).join(', ');
  const fullTitle = [title, `${serviceType} Contractor`, location].filter(Boolean).join(' | ');

  if (fullTitle.length <= TITLE_LIMIT) return fullTitle;

  const localizedTitle = [title, location].filter(Boolean).join(' | ');
  if (localizedTitle.length <= TITLE_LIMIT) return localizedTitle;

  return truncateAtWord(localizedTitle, TITLE_LIMIT);
}

export function buildProjectSeoDescription(input: {
  title: string;
  serviceType?: string | null;
  location?: string | null;
  description?: string | null;
}): string {
  const sourceDescription = stripMarkdown(input.description);
  if (sourceDescription) return truncateAtWord(sourceDescription, DESCRIPTION_LIMIT);

  const title = compact(input.title) || 'this commercial project';
  const serviceType = compact(input.serviceType).toLowerCase() || 'construction';
  const { city, stateCode } = getProjectLocationParts(input.location);
  const location = [city, stateCode].filter(Boolean).join(', ');
  const description = `Explore Envision's ${serviceType} work on ${title}${location ? ` in ${location}` : ''}. See the project scope, execution, and results.`;

  return truncateAtWord(description, DESCRIPTION_LIMIT);
}

export function toAbsoluteProjectUrl(pathOrUrl: string | null | undefined): string | undefined {
  const value = compact(pathOrUrl);
  if (!value) return undefined;

  try {
    return new URL(value, DEFAULT_SITE_URL).toString();
  } catch {
    return undefined;
  }
}

export function buildProjectImageAlt(input: {
  projectTitle: string;
  location?: string | null;
  sector?: string | null;
  index?: number;
}): string {
  const { city, stateName } = getProjectLocationParts(input.location);
  const location = [city, stateName].filter(Boolean).join(', ');
  const sector = compact(input.sector);
  const imageNumber = typeof input.index === 'number' ? `, image ${input.index + 1}` : '';

  return compact(
    `${sector ? `${sector} project` : 'Completed construction project'} at ${input.projectTitle}${location ? ` in ${location}` : ''}${imageNumber} by Envision Construction Services`,
  );
}

export function buildProjectImageFilename(input: {
  projectSlug: string;
  location?: string | null;
  index: number;
  extension?: string;
}): string {
  const { city, stateCode } = getProjectLocationParts(input.location);
  const suffix = [city, stateCode]
    .filter(Boolean)
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const base = [compact(input.projectSlug), suffix, String(input.index + 1).padStart(2, '0')]
    .filter(Boolean)
    .join('-')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
  const extension = compact(input.extension).replace(/^\./, '').toLowerCase() || 'jpg';

  return `${base}.${extension}`;
}
