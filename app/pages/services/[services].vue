<script setup lang="ts">
const route = useRoute();

const service = computed(() => route.params.services as string);
const fetchKey = computed(() => `service-${service.value}`);

const { data } = await useAsyncData(
  fetchKey,
  () => $fetch(`/api/services/${service.value}`),
  {
    watch: [service],
    default: () => null,
  },
);

const serviceData = computed(() => data.value);

definePageMeta({
  layout: 'layout-a',
});

useSeoMeta(() => ({
  title: serviceData.value?.title || 'Service',
  description: serviceData.value?.description || 'Service Description',
}));
</script>

<template>
  <div v-if="serviceData" class="p-4 md:p-8">
    {{ data?.content }}
  </div>
</template>
