export default defineEventHandler(async (event) => {
  const document = await queryCollection(event, 'services').all();
  return document;
});
