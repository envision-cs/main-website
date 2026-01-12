<script setup lang="ts">
const route = useRoute();

const service = computed(() => route.params.services as string);

const { data } = useFetch(`/api/services/${service.value}`);
definePageMeta({
  layout: 'layout-a',
});

useSeoMeta({
  title: data.value?.title || 'Service',
  description: data.value?.description || 'Service Description',
});
</script>

<template>
  <div v-if="data" class="p-4 md:p-8">
    <ContentRenderer :value="data.meta" class="prose max-w-prose" />
  </div>
</template>
