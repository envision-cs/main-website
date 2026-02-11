import type { APILocation, APITeamMember } from '~~/shared/types/content-types';

import { catchError } from '~~/shared/utils/catch-error';

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();

  const teamUrl
    = `${config.strapi.url}/api/contact-team?populate[team_members][populate]=*`;
  const locationsUrl
    = `${config.strapi.url}/api/locations?populate=*`;

  // --- Team ---
  const [teamError, teamResponse] = await catchError(
    $fetch<APITeamMember>(teamUrl, { method: 'GET' }),
  );

  if (teamError || !teamResponse) {
    console.error('Error fetching teams for contact page:', teamError);
    throw createError({
      statusCode: 502,
      statusMessage: 'Unable to fetch contact team',
    });
  }

  const team = teamResponse.data.team_members.map(t => ({
    name: t.name,
    email: t.email,
    title: t.title,
    linkedIn: t.linkedin,
    slug: t.slug,
    photo: t.photo
      ? {
          alt: t.photo.alternativeText,
          url: t.photo.url,
        }
      : null,
  }));

  // --- Locations ---
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

  return {
    team,
    locations,
  };
});
