import type { Project, Sector } from "~~/shared/types/content-types";

export type SectorListItem = {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  preview?: string;
  to: string;
};

type ProjectSectorSource = {
  sector?: Project["sector"] | Sector | null;
  sectors?: Project["sectors"] | null;
};

function isValidProjectSector(sector: Sector | null | undefined): sector is Sector {
  return Boolean(sector?.slug && sector?.name);
}

export function getProjectSectors(project: ProjectSectorSource): Sector[] {
  const source = project.sectors ?? project.sector;
  const sectors = Array.isArray(source) ? source : source ? [source] : [];

  return sectors.filter(isValidProjectSector);
}

export function getPrimaryProjectSector(project: ProjectSectorSource): Sector | undefined {
  return getProjectSectors(project)[0];
}

export function projectBelongsToSector(
  project: ProjectSectorSource,
  slug: string | undefined,
): boolean {
  if (!slug) {
    return false;
  }
  return getProjectSectors(project).some((sector) => sector.slug === slug);
}

export function formatProjectSectorLabel(project: ProjectSectorSource): string | undefined {
  const label = getProjectSectors(project)
    .map((sector) => sector.name)
    .join(", ");

  return label || undefined;
}

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
