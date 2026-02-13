import type { APISectors } from '~~/shared/types/content-types';

import { catchError } from '~~/shared/utils/catch-error';

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const url = `${config.strapi.url}/api/sectors?populate=*`;

  const [strapiError, response] = await catchError(
    $fetch<APISectors>(url, {
      method: 'GET',
    }),
  );
  if (strapiError) {
    console.error('Error fetching projects from Strapi:', strapiError);
    throw createError({
      statusCode: strapiError?.status,
      statusMessage: strapiError?.statusText,
    });
  }
  return response?.data ?? [];
});
