import type { APITeamMember } from '~~/shared/types/content-types';

import { catchError } from '~~/shared/utils/catch-error';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing team member id',
    });
  }
  const config = useRuntimeConfig();
  const url = `${config.strapi.url}/api/team-members?populate=*`;
  const [error, response] = await catchError(
    $fetch<APITeamMember>(url, {
      method: 'GET',
    }),
  );

  if (error || !response?.data) {
    console.error('Error fetching team members:', error);
    throw createError({
      statusCode: error ? 500 : 404,
      statusMessage: error ? 'Error fetching team members' : 'Team members not found',
    });
  }

  const teamMember = response.data.find((member) => {
    return member.slug === id;
  });

  if (!teamMember) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Team member not found',
    });
  }

  const team = response.data.filter(member => member.team.name === teamMember.team.name);

  return {
    teamMember,
    team,
  };
});
