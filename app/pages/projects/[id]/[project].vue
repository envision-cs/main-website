<script setup lang="ts">
const route = useRoute();
const id = computed(() => route.params.project);
const { data: page } = useFetch(`/api/projects/${id.value}`);
const router = useRouter();
const title = page.value?.seo?.title || page.value?.title;

useSeoMeta({
  title,
});
</script>

<template>
  <section v-if="page" class="grid grid-cols-1 min-[800px]:grid-cols-2 pt-12">
    <article>
      <div class="">
        <div>
          <UButton @click="router.back()">
            Back
          </UButton>
        </div>
        <app-typography tag="h1" variant="heading-lg">
          {{ page.title }}
        </app-typography>
        <NuxtImg :src="page.main_image" />
        <div class="info">
          <projects-info title="Location" :data="page.location" />
          <projects-info
            v-if="page.area"
            title="Area"
            :data="page.area"
          />
          <projects-info title="Completed" :data="page.completed" />
        </div>
        <div class>
          <ContentRenderer :value="page" />
        </div>
      </div>
    </article>
    <div class="gallery">
      <NuxtImg
        v-for="image in page.gallery"
        :key="image"
        :src="image"
        :alt="page.title"
      />
    </div>
  </section>
  <div v-else>
    Oh no! Page not found.
  </div>
</template>

<style scoped>
article {
  position: sticky;

  @media (min-width: 1024px) {
    position: sticky;
    top: calc(var(--spacing) * 15);
  }
}

.content {
  padding-top: calc(var(--spacing) * 15);

  img {
    width: 100%;
  }
}

.gallery {
  display: grid;
  gap: calc(var(--spacing) * 4);

  @media (min-width: 1024px) {
  }

  img {
    width: 100%;
  }
}

.info {
  display: flex;
  flex-wrap: wrap;
  column-gap: calc(var(--spacing) * 8);
  row-gap: calc(var(--spacing) * 4);
}
</style>
