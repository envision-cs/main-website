<script setup lang="ts">
const { data: servicesData } = await useAsyncData(
  'services-list',
  () => $fetch('/api/services'),
  { default: () => [] },
);

definePageMeta({
  layout: 'layout-a',
});

function resolveImage(image: unknown) {
  if (typeof image === 'string')
    return image;
  const img = image as { url?: string; data?: { attributes?: { url?: string } } } | undefined;
  return img?.url || img?.data?.attributes?.url;
}

const services = computed(() =>
  (servicesData.value ?? [])
    .filter(service => Boolean(service?.param ?? service?.slug))
    .map(service => ({
      ...service,
      slug: service.param ?? service.slug,
      image: resolveImage(service.image),
    })),
);
</script>

<template>
  <app-team-member-list dense>
    <app-team-member-card
      v-for="service in services"
      :key="service.slug"
      :path="`/services/${service.slug}`"
      :name="service.title"
      :image="service.image"
    />
  </app-team-member-list>
</template>
