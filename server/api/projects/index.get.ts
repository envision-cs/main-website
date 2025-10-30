import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const projects = await queryCollection(event, 'projects').all();
  return projects;
});
