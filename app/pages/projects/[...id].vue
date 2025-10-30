<script setup lang="ts">
const route = useRoute();
const id = computed(() => route.params.id);

const { data: page } = await useFetch(`/api/projects/${id.value}`);

const title = page.value?.seo?.title || page.value?.title;

useSeoMeta({
  title,
});
</script>

<template>
  <UPage class="mt-0">
    <NuxtLink to="/projects">
      Back
    </NuxtLink>
    <div v-if="page">
      <h1 class="text-3xl font-bold">
        {{ page.title }}
      </h1>
      <ContentRenderer :value="page" />
    </div>
    <div v-else>
      Oh no! Page not found.
    </div>
  </UPage>
</template>
