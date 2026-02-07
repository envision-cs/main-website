<script setup lang="ts">
import { parseMarkdown } from '@nuxtjs/mdc/runtime';

const route = useRoute();

const service = computed(() => route.params.services as string);
const fetchKey = computed(() => `service-${service.value}`);

const { data } = await useAsyncData(
  fetchKey,
  async () => $fetch(`/api/services/${service.value}`),
  {
    watch: [service],
    default: () => null,
  },
);

const serviceData = computed(() => data.value);
const content = await parseMarkdown(data?.value?.description);

definePageMeta({
  layout: 'layout-a',
});

useSeoMeta(() => ({
  title: serviceData.value?.title || 'Service',
  description: serviceData.value?.description || 'Service Description',
}));
</script>

<template>
  <div v-if="content.body" class="p-4">
    <MDCRenderer :body="content.body" :data="content.data" />
  </div>
</template>
