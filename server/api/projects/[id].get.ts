import type { APIProjects, Project } from '~~/shared/types/content-types';

import { catchError } from '~~/shared/utils/catch-error';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing project id',
    });
  }

  const config = useRuntimeConfig();
  const url = `${config.strapi.url}/api/projects?filters[slug][$eq]=${encodeURIComponent(id)}&populate=*`;
  const [strapiError, response] = await catchError(
    $fetch<APIProjects>(url, {
      method: 'GET',
    }),
  );

  if (strapiError) {
    console.error(`Error fetching project "${id}" from Strapi:`, strapiError);
    throw createError({
      statusCode: 502,
      statusMessage: 'Unable to fetch project',
    });
  }

  const project = response?.data?.[0];
  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Project not found',
    });
  }

  return project as Project;
});
