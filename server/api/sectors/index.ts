import type { APISectors } from "~~/shared/types/content-types";

import { getFallbackSectors } from "~~/server/utils/fallback-sectors";
import { catchError } from "~~/shared/utils/catch-error";

export default defineEventHandler(async () => {
  const config = useRuntimeConfig();
  const url = `${config.strapi.url}/api/sectors?populate=*`;

  const [strapiError, response] = await catchError(
    $fetch<APISectors>(url, {
      method: "GET",
    }),
  );
  if (strapiError) {
    console.warn(
      `[api/sectors] Strapi sectors unavailable: ${strapiError.message}. Using local fallback sectors.`,
    );

    return getFallbackSectors();
  }

  return response?.data ?? [];
});
