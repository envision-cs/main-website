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
  if (!serviceData.value?.description)
    return null;
  return parseMarkdown(serviceData.value.description);
}, null);

useSeoMeta(() => ({
  title: serviceData.value?.title || 'Service',
  description: serviceData.value?.description || 'Service Description',
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
