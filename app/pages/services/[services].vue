<script setup lang="ts">
const route = useRoute();

const service = computed(() => route.params.services as string);

const { data } = useFetch(`/api/services/${service.value}`);
definePageMeta({
  layout: 'layout-a',
});
</script>

<template>
  <div v-if="data">
    {{ data.title }}
  </div>
</template>
