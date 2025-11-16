import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const team_name = 'Green team';
  const name = 'Allen Greene II';
  const team_members = await queryCollection(event, 'team').where('group', '=', team_name).where('name', '<>', name).all();
  return team_members;
});
