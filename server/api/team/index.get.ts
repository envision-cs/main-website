import type { APITeamMember } from '~~/shared/types/content-types';

import { queryCollection } from '@nuxt/content/server';
import { catchError } from '~~/shared/utils/catch-error';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const url = `${config.strapi.url}/api/teams?populate[team_members][populate]=*`;
  const [error, response] = await catchError(
    $fetch<APITeamMember>(url, {
      method: 'GET',
    }),
  );

  if (error) {
    console.error('Error fetching team members:', error);
  }
  else if (response?.data) {
    return [...response.data].sort((a, b) => {
      return (a.order ?? 0) - (b.order ?? 0);
    });
  }

  const team = await queryCollection(event, 'teams').all();
  const team_members = await queryCollection(event, 'team').all();

  const grouped_teams = team
    .map(team => ({
      name: team.name,
      description: team.description,
      color: team.color,
      role: team.role,
      order: team.order,
      members: team_members.filter(tm => tm.group.toLowerCase() === team.name.toLowerCase()),
    }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

  return grouped_teams;
});
