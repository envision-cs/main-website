<script setup lang="ts">
import type { Project } from '~~/shared/types/content-types';

import { parseMarkdown } from '@nuxtjs/mdc/runtime';

const route = useRoute();

const slug = computed(() => route.params.project as string);
const asyncDataKey = computed(() => `project-page-${slug.value}`);

const { data: projectData } = await useAsyncData(
  asyncDataKey,
  async () => {
    try {
      return await $fetch<Project>(`/api/projects/${encodeURIComponent(slug.value)}`);
    }
    catch (err) {
      console.error(`Error fetching project "${slug.value}":`, err);
      return null;
    }
  },
  { watch: [slug], default: () => null },
);

type GalleryImage = {
  url: string;
  altText: string;
};

const page = computed(() => {
  const entry = projectData.value;

  if (!entry) {
    return null;
  }

  const gallery: GalleryImage[] = (entry.gallery || []).map((image) => {
    return {
      url: image.url,
      altText: typeof image.alternativeText === 'string' ? image.alternativeText : '',
    };
  });

  return {
    id: entry.id,
    title: entry.title,
    slug: entry.slug,
    main_image: entry.mainImage?.url,
    location: entry.location,
    area: entry.area,
    completed: entry.completed,
    gallery,
    content: entry.content,
    description: entry.description,
  };
});

const title = computed(() => page.value?.title);

const activeImage = ref<string | null>(null);
const imagePopoverRef = useTemplateRef<HTMLElement | null>('imagePopoverRef');

const isLoading = ref(false);

function handleImageClick(image: GalleryImage) {
  if (activeImage.value !== image.url) {
    activeImage.value = image.url;
    isLoading.value = true;
  }

  const popover = imagePopoverRef.value;
  if (popover && !popover.matches(':popover-open')) {
    popover.showPopover();
  }
}

function onLoad() {
  isLoading.value = false;
}

const { data: ast } = await useAsyncData('markdown', async () => {
  if (!page.value?.description) {
    return null;
  }
  return parseMarkdown(page.value.description);
}, { watch: [page] });

useSeoMeta({
  title,
});
</script>

<template>
  <div>
    <app-banner-b :image="page?.main_image">
      {{ page?.title }}
    </app-banner-b>
    <app-section-a v-if="page" class="grid grid-cols-1 min-[800px]:grid-cols-2 pt-12">
      <template #header>
        <article>
          <div class="">
            <div class="info">
              <projects-info title="Location" :data="page.location" />
              <projects-info
                v-if="page.area"
                title="Area"
                :data="page.area"
              />
              <projects-info title="Completed" :data="page.completed" />
            </div>
            <div v-if="ast?.body" class="max-w-[75ch]">
              <MDCRenderer :body="ast.body" :data="ast.data" />
            </div>
            <div>
              <Icon name="logos:belogo" size="60" />
            </div>
          </div>
        </article>
      </template>
      <template #body>
        <ul class="gallery">
          <li v-for="image in page.gallery" :key="image.url">
            <app-reveal-card
              to="#"
              :aria-label="`Open ${page.title} gallery image`"
              :image="image.url"
              :alt="image.altText || page.title"
              aspect-ratio="1/1"
              overlay="linear-gradient(to top, rgb(0 0 0 / 0.2) 0%, rgb(0 0 0 / 0) 100%)"
              :image-hover-blur="0"
              :image-hover-scale="1.03"
              :meta-border="false"
              :meta-fade="false"
              :rounded="false"
              :outlined="false"
              content-padding="0"
              content-gap="0"
              :title-offset="0"
              details-delay="0ms"
              meta-delay="0ms"
              @click.prevent="handleImageClick(image)"
            />
          </li>
        </ul>
        <aside
          id="image"
          ref="imagePopoverRef"
          popover="auto"
        >
          <button
            popovertarget="image"
            popovertargetaction="hide"
            class="close-btn"
          >
            <UIcon name="i-lucide-x" class="w-6 h-6 text-black" />
          </button>
          <figure>
            <div v-if="isLoading" class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <UIcon name="i-lucide-loader-2" class="w-10 h-10 text-white animate-spin" />
            </div>
            <NuxtImg
              :key="activeImage"
              :src="activeImage"
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
  object-fit: cover;
  /* fills square, no distortion */
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
