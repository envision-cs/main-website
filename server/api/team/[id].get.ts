import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const team_member = await queryCollection(event, 'team')
    .where('path', '=', `/team/${id}`)
    .first();

  return team_member;
});
