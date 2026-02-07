import type { APIServices, Service } from '~~/shared/types/content-types';

import { catchError } from '~~/shared/utils/catch-error';

export default defineEventHandler(async (event) => {
  const { service } = getRouterParams(event);
  if (!service) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing service slug',
    });
  }

  const config = useRuntimeConfig();
  const url = `${config.strapi.url}/api/services?populate=*`;
  const [strapiError, response] = await catchError(
    $fetch<APIServices>(url, {
      method: 'GET',
    }),
  );

  if (strapiError) {
    console.error(`Error fetching service "${service}" from Strapi:`, strapiError);
    throw createError({
      statusCode: 502,
      statusMessage: 'Unable to fetch service',
    });
  }

  const strapiService = response?.data?.find((item: any) => {
    // support either flat or Strapi-style attributes payloads
    const attrs = item?.attributes ?? item;
    return attrs?.param === service || attrs?.slug === service;
  });
  if (!strapiService) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Service not found',
    });
  }

  return strapiService as Service;
});
