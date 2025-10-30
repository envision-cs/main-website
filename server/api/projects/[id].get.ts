import { queryCollection } from '@nuxt/content/server';

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const project = await queryCollection(event, 'projects').where('id', '=', `projects/projects/${id}.md`).first();
  return project;
});
