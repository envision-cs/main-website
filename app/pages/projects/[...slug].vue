<script setup lang="ts">
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () =>
  queryCollection('projects').path(route.path).first());

const title = page.value?.seo?.title || page.value?.title;

useSeoMeta({
  title,
});
</script>

<template>
  <UPage class="mt-0">
    {{ page }}
  </UPage>
</template>
