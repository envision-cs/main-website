export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  const locationsUrl
    = `${config.strapi.url}/api/locations?populate=*`;

  const [locationsError, locationsResponse] = await catchError(
    $fetch<APILocation>(locationsUrl, { method: 'GET' }),
  );

  if (locationsError || !locationsResponse) {
    console.error('Error fetching locations for contact page:', locationsError);
    throw createError({
      statusCode: 502,
      statusMessage: 'Unable to fetch contact locations',
    });
  }

  const locations = locationsResponse.data.map(l => ({
    id: l.id,
    name: l.name,
    phone: l.phone,
    email: l.email,
    address: l.address,
    city: l.city,
  }));

  return locations;
});
