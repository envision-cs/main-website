<script setup lang="ts">
const route = useRoute();
const id = computed(() => route.params.project);
const { data: page } = useFetch(`/api/projects/${id.value}`);
const router = useRouter();
const title = page.value?.seo?.title || page.value?.title;

const activeImage = ref<string | null>(null);
const imageRef = useTemplateRef<HTMLDivElement>('image');

watch(
  () => page.value?.gallery,
  (gallery) => {
    if (!activeImage.value && gallery?.length)
      activeImage.value = gallery[0];
  },
  { immediate: true },
);

function handleImageClick(image: string) {
  imageRef.value?.showPopover();
  activeImage.value = image;
}

useSeoMeta({
  title,
});
</script>

<template>
  <app-section-a v-if="page" class="grid grid-cols-1 min-[800px]:grid-cols-2 pt-12">
    <template #header>
      <article>
        <div class="">
          <div>
            <UButton @click="router.back()">
              Back
            </UButton>
          </div>
          <app-typography
            tag="h1"
            variant="heading-md"
            class="max-w-[50ch] text-balance"
          >
            {{ page.title }}
          </app-typography>
          <div class="info">
            <projects-info title="Location" :data="page.location" />
            <projects-info
              v-if="page.area"
              title="Area"
              :data="page.area"
            />
            <projects-info title="Completed" :data="page.completed" />
          </div>
          <div class="max-w-[75ch]">
            <ContentRenderer :value="page" />
          </div>
        </div>
      </article>
    </template>
    <template #body>
      <ul class="gallery">
        <li v-for="image in page.gallery" :key="image">
          <button popovertarget="image" @click="handleImageClick(image)">
            <NuxtImg
              :src="image"
              :alt="page.title"
              fit="fill"
              format="avif"
              sizes="50vw md:400px"
            />
          </button>
        </li>
      </ul>
      <aside
        id="image"
        ref="imageRef"
        popover
      >
        <figure>
          <NuxtImg
            :key="activeImage"
            :src="activeImage"
            :alt="page.title"
            format="avif"
          />
        </figure>
      </aside>
    </template>
  </app-section-a>
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
  grid-template-columns: repeat(2, 1fr);
}

.gallery li {
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.gallery button {
  width: 100%;
  height: 100%;
  padding: 0;
}

.gallery img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* fills square, no distortion */
}

.info {
  display: flex;
  flex-wrap: wrap;
  column-gap: calc(var(--spacing) * 8);
  row-gap: calc(var(--spacing) * 4);
}

#image[popover] {
  position: fixed;
  inset: 0;
  margin: 0;
  padding: 0;
  border: 0;

  width: 100vw;
  height: 100vh;

  overflow: hidden;
  background: rgba(0, 0, 0, 0.85);
}

#image figure {
  width: 100%;
  height: 100%;
  margin: 0;

  display: flex;
  align-items: center;
  justify-content: center;
}

#image img {
  max-width: 100vw;
  max-height: 90vh;

  width: 90%;
  height: aut0;

  object-fit: contain;
}
</style>
