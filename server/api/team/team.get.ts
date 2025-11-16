import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const { team, name } = getQuery(event);
  const team_members = await queryCollection(event, 'team').where('group', '=', team).where('name', '<>', name).all();
  return team_members;
});
