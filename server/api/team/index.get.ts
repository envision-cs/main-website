import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const team = await queryCollection(event, 'team').all();
  return team;
});
