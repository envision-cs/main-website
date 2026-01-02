<script setup lang="ts">
const route = useRoute();
const id = computed(() => route.params.project);
const { data: page } = useFetch(`/api/projects/${id.value}`);
const router = useRouter();
const title = page.value?.seo?.title || page.value?.title;

const activeImage = ref<string | null>(null);
const imageRef = useTemplateRef<HTMLDivElement>('image');

const imageSrc = computed(() => {
  const src = activeImage.value;
  if (!src)
    return null;
  if (src.startsWith('http'))
    return src;
  if (src.startsWith('/'))
    return src;
  return `/images/projects/${src}`; // adjust folder
});

const isLoading = ref(false);

function handleImageClick(image: string) {
  if (activeImage.value === image)
    return;
  activeImage.value = image;
  isLoading.value = true;
}

function onLoad() {
  isLoading.value = false;
}

useSeoMeta({
  title,
});
</script>

<template>
  <div>
    <app-banner-b
      :image="page?.main_image"
    >
      {{ page?.title }}
    </app-banner-b>
    <app-section-a v-if="page" class="grid grid-cols-1 min-[800px]:grid-cols-2 pt-12">
      <template #header>
        <article>
          <div class="">
            <div>
              <UButton @click="router.back()">
                Back
              </UButton>
            </div>
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
          popover="auto"
        >
          <button
            popovertarget="image"
            popovertargetaction="hide"
            class="close-btn"
          >
            <UIcon
              name="i-lucide-x"
              class="w-6 h-6 text-black"
            />
          </button>
          <figure>
            <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <UIcon name="i-lucide-loader-2" class="w-10 h-10 text-white animate-spin" />
            </div>
            <NuxtImg
              :key="activeImage"
              :src="imageSrc"
              :alt="page.title"
              lazy="true"
              format="avif"
              sizes="100vw sm:500px md:600px lg:900px xl:1100px 2xl:1300px"
              @load="onLoad"
              @error="onLoad"
            />
          </figure>
        </aside>
      </template>
    </app-section-a>
    <div v-else>
      Oh no! Page not found.
    </div>
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

.close-btn {
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 50;

  background-color: white;
  border-radius: 9999px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
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
  height: auto;

  object-fit: contain;
}
</style>
