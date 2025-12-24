import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const data = await queryCollection(event, 'coreValues').all();
  return data;
});
