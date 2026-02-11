import type { Service } from '~~/shared/types/content-types';

type ServiceWithSlug = Service & {
  slug: string;
  image?: string;
};

export async function useServicesList() {
  const { data } = await useAsyncData(
    'services-list',
    () => $fetch<Service[]>('/api/services'),
    { default: () => [] },
  );

  const services = computed<ServiceWithSlug[]>(() =>
    (data.value ?? [])
      .filter(service => Boolean(service?.slug))
      .map(service => ({
        ...service,
        slug: service.slug,
        image: service?.image.url,
      })),
  );

  return {
    data,
    services,
  };
}
