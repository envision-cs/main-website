import type { APIProjects } from '~~/shared/types/content-types';

import { catchError } from '~~/shared/utils/catch-error';

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const url = `${config.strapi.url}/api/projects?populate=*`;
  const [strapiError, response] = await catchError(
    $fetch<APIProjects>(url, {
      method: 'GET',
    }),
  );

  if (strapiError) {
    console.error('Error fetching projects from Strapi:', strapiError);
    throw createError({
      statusCode: 502,
      statusMessage: 'Unable to fetch projects',
    });
  }

  return response?.data ?? [];
});
