import { catchError } from "~~/shared/utils/catch-error";

type StrapiMedia = {
  url?: string | null;
} | null;

type StrapiHomeHero = {
  title?: string | null;
  subtitle?: string | null;
  image?: StrapiMedia;
} | null;

type StrapiHomeHeroResponse = {
  data?: StrapiHomeHero;
};

type HomeHeroResponse = {
  title: string;
  subtitle: string;
  image: {
    url: string;
  } | null;
} | null;

function normalizeText(value?: string | null): string {
  const normalized = value?.trim() ?? "";
  return normalized === "null" || normalized === "undefined" ? "" : normalized;
}

function normalizeImageUrl(value: string | null | undefined, baseUrl: string): string {
  const normalized = normalizeText(value);

  if (!normalized) return "";

  if (/^https?:\/\//.test(normalized)) return normalized;

  return new URL(normalized, baseUrl).toString();
}

export default defineEventHandler(async (): Promise<HomeHeroResponse> => {
  const config = useRuntimeConfig();
  const url = `${config.strapi.url}/api/home-hero?populate=*`;

  const [strapiError, response] = await catchError(
    $fetch<StrapiHomeHeroResponse>(url, {
      method: "GET",
    }),
  );

  if (strapiError) {
    console.error("Error fetching home hero from Strapi:", strapiError);
    throw createError({
      statusCode: 502,
      statusMessage: "Unable to fetch homepage hero",
    });
  }

  const hero = response?.data;

  if (!hero) return null;

  const imageUrl = normalizeImageUrl(hero.image?.url, config.strapi.url);

  return {
    title: normalizeText(hero.title),
    subtitle: normalizeText(hero.subtitle),
    image: imageUrl ? { url: imageUrl } : null,
  };
});
