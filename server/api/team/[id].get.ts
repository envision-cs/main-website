import type { APITeamMember } from '~~/shared/types/content-types';

import { catchError } from '~~/shared/utils/catch-error';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const config = useRuntimeConfig();
  const url = `${config.strapi.url}/api/team-members?populate=*`;
  const [error, response] = await catchError(
    $fetch<APITeamMember>(url, {
      method: 'GET',
    }),
  );

  if (error) {
    console.error('Error fetching team members:', error);
    return;
  }

  const teamMember = response.data.find((member) => {
    return member.slug === id;
  });

  if (!teamMember) {
    throw new Error('Team member not found');
  }

  const team = response.data.filter(member => member.team.name === teamMember.team.name);

  return {
    teamMember,
    team,
  };
});
