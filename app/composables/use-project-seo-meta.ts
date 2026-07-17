import type { ComputedRef } from 'vue';
import {
  buildProjectSeoDescription,
  buildProjectSeoTitle,
  formatProjectHeading,
  getProjectLocationParts,
  limitSeoText,
  toAbsoluteProjectUrl,
} from '~/utils/project-seo';

/** The view model shape the project page derives from the API entry. */
export interface ProjectPageView {
  title: string;
  slug: string;
  main_image?: string;
  location?: string;
  sector: string;
  gallery: { url: string }[];
  description?: string;
  deliveryMethod?: string;
  projectType?: string;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string;
  updatedAt?: string;
}

interface UseProjectSeoMetaOptions {
  page: ComputedRef<ProjectPageView | null>;
  slug: ComputedRef<string>;
  sectorSlug: ComputedRef<string>;
}

export function useProjectSeoMeta({ page, slug, sectorSlug }: UseProjectSeoMetaOptions) {
  const route = useRoute();

  const projectHeading = computed(() =>
    page.value ? formatProjectHeading(page.value.title, page.value.location) : '',
  );

  const serviceType = computed(
    () => page.value?.deliveryMethod || page.value?.projectType || page.value?.sector,
  );

  const seoTitle = computed(() => {
    if (!page.value) return 'Project | Envision Construction';

    return (
      (page.value.seoTitle ? limitSeoText(page.value.seoTitle, 60) : undefined) ||
      buildProjectSeoTitle({
        title: page.value.title,
        serviceType: serviceType.value,
        location: page.value.location,
      })
    );
  });

  const seoDescription = computed(() => {
    if (!page.value) return 'Explore Envision Construction Services projects.';

    return (
      (page.value.seoDescription ? limitSeoText(page.value.seoDescription, 155) : undefined) ||
      buildProjectSeoDescription({
        title: page.value.title,
        serviceType: serviceType.value,
        location: page.value.location,
        description: page.value.description,
      })
    );
  });

  const canonicalPath = computed(() =>
    sectorSlug.value && slug.value ? `/projects/${sectorSlug.value}/${slug.value}` : route.path,
  );
  const canonicalUrl = computed(
    () => toAbsoluteProjectUrl(canonicalPath.value) || toAbsoluteSiteUrl('/projects'),
  );
  const socialImage = computed(() => toAbsoluteOptionalSiteUrl(page.value?.main_image));

  useSeoMeta(() => ({
    title: seoTitle.value,
    description: seoDescription.value,
    ogTitle: seoTitle.value,
    ogDescription: seoDescription.value,
    ogImage: socialImage.value,
    ogType: 'article',
    ogUrl: canonicalUrl.value,
    twitterCard: socialImage.value ? 'summary_large_image' : 'summary',
    twitterTitle: seoTitle.value,
    twitterDescription: seoDescription.value,
    twitterImage: socialImage.value,
  }));

  const projectSchema = computed(() => {
    if (!page.value) return null;

    const organizationId = `${toAbsoluteSiteUrl('/')}#organization`;
    const webpageId = `${canonicalUrl.value}#webpage`;
    const articleId = `${canonicalUrl.value}#project`;
    const imageUrls = [page.value.main_image, ...page.value.gallery.map((image) => image.url)]
      .map(toAbsoluteProjectUrl)
      .filter((url): url is string => Boolean(url));
    const location = getProjectLocationParts(page.value.location);
    const keywords = [
      page.value.sector,
      page.value.projectType,
      page.value.deliveryMethod,
      location.city,
      location.stateName,
    ].filter((value): value is string => Boolean(value));

    return {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebPage',
          '@id': webpageId,
          url: canonicalUrl.value,
          name: seoTitle.value,
          description: seoDescription.value,
          inLanguage: 'en-US',
          about: { '@id': articleId },
          breadcrumb: { '@id': `${canonicalUrl.value}#breadcrumb` },
          ...(imageUrls[0]
            ? { primaryImageOfPage: { '@type': 'ImageObject', url: imageUrls[0] } }
            : {}),
        },
        {
          '@type': 'Article',
          '@id': articleId,
          url: canonicalUrl.value,
          headline: projectHeading.value,
          description: seoDescription.value,
          articleSection: page.value.sector,
          keywords,
          author: { '@id': organizationId },
          publisher: { '@id': organizationId },
          ...(page.value.publishedAt ? { datePublished: page.value.publishedAt } : {}),
          ...(page.value.updatedAt ? { dateModified: page.value.updatedAt } : {}),
          ...(imageUrls.length ? { image: imageUrls } : {}),
          ...(page.value.location
            ? {
                contentLocation: {
                  '@type': 'Place',
                  name: page.value.location,
                  address: {
                    '@type': 'PostalAddress',
                    addressLocality: location.city,
                    addressRegion: location.stateCode,
                    addressCountry: 'US',
                  },
                },
              }
            : {}),
          about: {
            '@type': 'Thing',
            name: page.value.projectType || page.value.sector,
          },
        },
        {
          '@type': 'BreadcrumbList',
          '@id': `${canonicalUrl.value}#breadcrumb`,
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Projects',
              item: toAbsoluteSiteUrl('/projects'),
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: page.value.sector,
              item: toAbsoluteProjectUrl(`/projects/${sectorSlug.value}`),
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: page.value.title,
              item: canonicalUrl.value,
            },
          ],
        },
      ],
    };
  });

  useHead(() => ({
    link: [{ rel: 'canonical', key: 'canonical', href: canonicalUrl.value }],
    meta: socialImage.value
      ? [
          { key: 'og:image', property: 'og:image', content: socialImage.value },
          { key: 'twitter:image', name: 'twitter:image', content: socialImage.value },
        ]
      : [],
    script: projectSchema.value
      ? [
          {
            key: 'schema-org-project',
            type: 'application/ld+json',
            innerHTML: JSON.stringify(projectSchema.value).replace(/</g, '\\u003c'),
          },
        ]
      : [],
  }));

  return { projectHeading, serviceType, seoTitle, seoDescription, canonicalUrl };
}
