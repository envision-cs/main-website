import { sectors as staticSectors } from "~~/app/assets/sectors";
import type { Photo, Sector } from "~~/shared/types/content-types";

const FALLBACK_TIMESTAMP = "2026-01-01T00:00:00.000Z";

function createFallbackPhoto(id: number, url: string, name: string): Photo {
  return {
    id,
    documentId: `fallback-sector-photo-${id}`,
    name,
    alternativeText: name,
    caption: null,
    width: 0,
    height: 0,
    formats: null,
    hash: "",
    ext: "",
    mime: "",
    size: 0,
    url,
    previewUrl: "",
    provider: "local",
    provider_metadata: { fileId: "" },
    createdAt: FALLBACK_TIMESTAMP,
    updatedAt: FALLBACK_TIMESTAMP,
    publishedAt: FALLBACK_TIMESTAMP,
  };
}

export function getFallbackSectors(): Sector[] {
  return staticSectors
    .filter((sector) => sector.slug !== "all")
    .map((sector, index) => {
      const id = index + 1;

      return {
        id,
        documentId: `fallback-sector-${id}`,
        name: sector.title,
        slug: sector.slug,
        description: "",
        createdAt: FALLBACK_TIMESTAMP,
        updatedAt: FALLBACK_TIMESTAMP,
        publishedAt: FALLBACK_TIMESTAMP,
        image: createFallbackPhoto(id, sector.image, sector.title),
        projects: [],
      };
    });
}
