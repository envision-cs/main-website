import type { TeamMember } from '~~/shared/types/content-types';

import { queryCollection } from '@nuxt/content/server';
import { catchError } from '~~/shared/utils/catch-error';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const url = `${config.strapi.url}/api/teams?populate[team_members][populate]=*`;
  const [error, response] = await catchError(
    $fetch<TeamMember[]>(url, {
      method: 'GET',
    }),
  );

  if (error) {
    console.error('Error fetching team members:', error);
  }
  else if (response?.data) {
    return [...response.data].sort((a, b) => {
      const aOrder = typeof a.order === 'number' ? a.order : Number.POSITIVE_INFINITY;
      const bOrder = typeof b.order === 'number' ? b.order : Number.POSITIVE_INFINITY;
      return aOrder - bOrder;
    });
  }

  const team = await queryCollection(event, 'teams').all();
  const team_members = await queryCollection(event, 'team').all();

  const grouped_teams = team.map(team => ({
    name: team.name,
    description: team.description,
    color: team.color,
    role: team.role,
    members: team_members.filter(tm => tm.group.toLowerCase() === team.name.toLowerCase()),
  })).sort((a, b) => {
    const aOrder = typeof a.order === 'number' ? a.order : Number.POSITIVE_INFINITY;
    const bOrder = typeof b.order === 'number' ? b.order : Number.POSITIVE_INFINITY;
    return aOrder - bOrder;
  });

  return grouped_teams;
});
