import { catchError } from '~~/shared/utils/catch-error';

type FeaturedProject = {
  title?: string;
  slug?: string;
  completed?: string;
  mainImage?: {
    url?: string;
  } | null;
  sector?: {
    name?: string;
    slug?: string;
  } | null;
};

type HomepageFeaturedSectionResponse = {
  data?: {
    projects?: FeaturedProject[];
  } | null;
};

type FeaturedCard = {
  title: string;
  link: string;
  image: string;
  sector: string;
  completed: string;
};

function normalizeValue(value?: string): string {
  if (!value)
    return '';

  const normalized = value.trim();
  if (!normalized || normalized === 'null' || normalized === 'undefined')
    return '';

  return normalized;
}

function getCompletedYear(completed?: string): string {
  if (!completed)
    return '';

  const year = new Date(completed).getFullYear();
  return Number.isNaN(year) ? '' : String(year);
}

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const url = `${config.strapi.url}/api/homepage-featured-project-section?populate[projects][fields][0]=title&populate[projects][fields][1]=slug&populate[projects][fields][2]=completed&populate[projects][populate][mainImage][fields][0]=url&populate[projects][populate][sector][fields][0]=name&populate[projects][populate][sector][fields][1]=slug`;

  const [strapiError, response] = await catchError(
    $fetch<HomepageFeaturedSectionResponse>(url, {
      method: 'GET',
    }),
  );

  if (strapiError) {
    console.error('Error fetching homepage featured project section from Strapi:', strapiError);
    throw createError({
      statusCode: 502,
      statusMessage: 'Unable to fetch homepage featured projects',
    });
  }

  const projects = response?.data?.projects ?? [];

  return projects
    .map((project) => {
      const projectSlug = normalizeValue(project.slug);
      const sectorSlug = normalizeValue(project.sector?.slug) || 'all';

      if (!projectSlug)
        return null;

      const card: FeaturedCard = {
        title: normalizeValue(project.title),
        link: `/projects/${sectorSlug}/${projectSlug}`,
        image: normalizeValue(project.mainImage?.url),
        sector: normalizeValue(project.sector?.name),
        completed: getCompletedYear(project.completed),
      };

      return card;
    })
    .filter((project): project is FeaturedCard => project !== null);
});
