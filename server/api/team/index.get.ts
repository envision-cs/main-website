import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const team = await queryCollection(event, 'teams').all();
  const team_members = await queryCollection(event, 'team').all();

  const grouped_teams = team.map(team => ({
    name: team.name,
    description: team.description,
    color: team.color,
    role: team.role,
    members: team_members.filter(tm => tm.group.toLowerCase() === team.name.toLowerCase()),
  }));

  return grouped_teams;
});
