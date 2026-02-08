import type { APITeam } from '~~/shared/types/content-types';

import { catchError } from '~~/shared/utils/catch-error';

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const url = `${config.strapi.url}/api/teams?populate[team_members][populate]=*`;
  const [error, response] = await catchError(
    $fetch<APITeam>(url, {
      method: 'GET',
    }),
  );

  if (error || !response?.data) {
    console.error('Error fetching teams:', error);
    throw createError({
      statusCode: error ? 500 : 404,
      statusMessage: error ? 'Error fetching teams' : 'Teams not found',
    });
  }

  return [...response.data].sort((a, b) => {
    return (a.order ?? 0) - (b.order ?? 0);
  });
});
