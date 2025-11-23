import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const process = await queryCollection(event, 'process').all();
  return process;
});
