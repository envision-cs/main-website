import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const locations = await queryCollection(event, 'locations').all();
  return locations;
});
