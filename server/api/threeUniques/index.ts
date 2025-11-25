import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const uniques = await queryCollection(event, 'threeUniques').all();
  return uniques;
});
