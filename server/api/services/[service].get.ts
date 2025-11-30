export default defineEventHandler(async (event) => {
  const { service } = getRouterParams(event);

  // This queries the 'services' content directory for a document
  // where the title field in the front-matter matches the 'service' parameter.
  const document = await queryCollection(event, 'services')
    .where('param', '=', service)
    .first();

  return document;
});
