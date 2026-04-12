import type { Service } from "~~/shared/types/content-types";

export type ServiceListItem = Service & {
  slug: string;
  image?: string;
  to: string;
};

export async function useServicesList() {
  const { data } = await useAsyncData("services-list", () => $fetch<Service[]>("/api/services"), {
    default: () => [],
  });

  const services = computed<ServiceListItem[]>(() =>
    (data.value ?? [])
      .filter((service) => Boolean((service as any)?.slug || service?.param))
      .map((service) => ({
        ...service,
        slug: String((service as any).slug ?? service.param),
        image:
          typeof service.image === "object" && service.image !== null
            ? service.image.url
            : undefined,
        to: `/services/${String((service as any).slug ?? service.param)}`,
      })),
  );

  return {
    data,
    services,
  };
}
