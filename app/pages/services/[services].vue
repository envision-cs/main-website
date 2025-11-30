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
    <app-typography tag="h1" variant="heading-lg">
      {{ data.title }}
    </app-typography>
    <NuxtImg
      :src="data.image"
      height="500"
      sizes="100vw sm:50vw md:600px"
      format="webp"
    />
    <ContentRenderer :value="data.meta" class="prose max-w-prose" />
  </div>
</template>
