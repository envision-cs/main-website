<script setup lang="ts">
import { parseMarkdown } from '@nuxtjs/mdc/runtime';

const route = useRoute();
const { services } = await useServicesList();

const service = computed(() => route.params.services as string);
const serviceData = computed(() => services.value.find(item => item.slug === service.value) ?? null);
const content = computedAsync(async () => {
  if (!serviceData.value?.description)
    return null;
  return parseMarkdown(serviceData.value.description);
}, null);

definePageMeta({
  layout: 'layout-a',
});

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
