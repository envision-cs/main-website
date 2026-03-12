import type { APIServices } from '~~/shared/types/content-types';

import { catchError } from '~~/shared/utils/catch-error';

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const url = `${config.strapi.url}/api/services?populate=*`;
  const [strapiError, response] = await catchError(
    $fetch<APIServices>(url, {
      method: 'GET',
    }),
  );

  if (strapiError) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Unable to fetch services',
    });
  }

  return response?.data ?? [];
});
