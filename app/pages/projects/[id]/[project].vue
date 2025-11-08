<script setup lang="ts">
const route = useRoute();
const id = computed(() => route.params.project);
const { data: page } = await useFetch(`/api/projects/${id.value}`);

const title = page.value?.seo?.title || page.value?.title;

useSeoMeta({
  title,
});
</script>

<template>
  <div v-if="page" class="site-grid">
    <app-banner
      class="hero"
      :title="page.title"
      :description="page.description"
      :images="[{ img: page.main_image, alt: page.title }]"
    />
    <div class="content">
      <ContentRenderer :value="page" />
    </div>
    <div class="gallery">
      <NuxtImg
        v-for="image in page.images"
        :key="image"
        :src="image"
        :alt="page.title"
        class="image"
      />
    </div>
  </div>
  <div v-else>
    Oh no! Page not found.
  </div>
</template>

<style scoped>
.hero {
  margin-top: calc(var(--spacing) * 15);
}

.content {
  grid-column: 1 / -1;
  padding: calc(var(--spacing) * 4);
}

.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: calc(var(--spacing) * 4);
  grid-column: 1 / -1;
  padding: calc(var(--spacing) * 4);
}
</style>
