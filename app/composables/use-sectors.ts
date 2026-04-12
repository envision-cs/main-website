import type { Sector } from "~~/shared/types/content-types";

export type SectorListItem = {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  to: string;
};

export async function useSectors() {
  const { data } = await useAsyncData("sectors-list", () => $fetch<Sector[]>("/api/sectors"), {
    default: () => [],
  });

  const sectors = computed<SectorListItem[]>(() =>
    (data.value ?? [])
      .filter((sector) => Boolean(sector?.slug && sector?.name))
      .map((sector) => ({
        name: sector.name,
        slug: sector.slug,
        description: sector.description,
        image: sector.image?.url,
        to: `/projects/${sector.slug}`,
      })),
  );

  return {
    data,
    sectors,
  };
}
