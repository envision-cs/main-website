<script setup lang="ts">
import type { Service } from '~~/shared/types/content-types';

import { parseMarkdown } from '@nuxtjs/mdc/runtime';

const props = defineProps<{
  service: string;
}>();

const { data: serviceData } = await useAsyncData(
  `service-${props.service}`,
  () => $fetch<Service>(`/api/services/${props.service}`),
  { default: () => null },
);

const content = computedAsync(async () => {
  if (!serviceData.value?.description) return null;
  return parseMarkdown(serviceData.value.description);
}, null);

const seoImage = computed(() => {
  const image = serviceData.value?.image;
  if (typeof image === 'object' && image !== null) return image.url;
  return typeof image === 'string' ? image : undefined;
});

useSeoMeta(() => ({
  title: serviceData.value?.title || 'Service',
  description: serviceData.value?.description || 'Service Description',
  ogTitle: serviceData.value?.title || 'Service',
  ogDescription: serviceData.value?.description || 'Service Description',
  ogImage: seoImage.value,
  ogType: 'website',
  twitterCard: seoImage.value ? 'summary_large_image' : 'summary',
  twitterTitle: serviceData.value?.title || 'Service',
  twitterDescription: serviceData.value?.description || 'Service Description',
  twitterImage: seoImage.value,
}));
</script>

<template>
  <div v-if="content" class="p-4">
    <MDCRenderer :body="content.body" :data="content.data" />
  </div>
  <div v-else class="p-4">
    <app-typography tag="p" variant="text-md">
      No description available for this service.
    </app-typography>
  </div>
</template>
