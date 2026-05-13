<script setup lang="ts">
import type { Project } from "~~/shared/types/content-types";

import { parseMarkdown } from "@nuxtjs/mdc/runtime";

const { formatMonthYear } = useFormatDate();

const route = useRoute();

const slug = computed(() => {
  const param = route.params.project;

  if (typeof param !== "string") return "";

  const normalized = param.trim();
  if (!normalized || normalized === "null" || normalized === "undefined") return "";

  return normalized;
});
const sectorSlug = computed(() => {
  const param = route.params.id;

  if (typeof param !== "string") return "";

  return param.trim();
});
const asyncDataKey = computed(() => `project-page-${slug.value}`);
const markdownDataKey = computed(() => `project-page-markdown-${slug.value}`);

const { data: projectData, error: projectError } = await useAsyncData(
  asyncDataKey,
  async () => {
    if (!slug.value) {
      throw createError({
        statusCode: 404,
        statusMessage: "Project not found",
      });
    }

    return await $fetch<Project>(`/api/projects/${encodeURIComponent(slug.value)}`);
  },
  { watch: [slug], default: () => null },
);

if (projectError.value) {
  throw createError({
    statusCode: projectError.value.statusCode || 500,
    statusMessage: projectError.value.statusMessage || "Unable to load project",
    fatal: true,
  });
}

interface GalleryImage {
  url: string;
  altText: string;
}

const page = computed(() => {
  const entry = projectData.value;

  if (!entry) {
    return null;
  }

  const gallery: GalleryImage[] = (entry.gallery || []).map((image) => {
    return {
      url: image.url,
      altText: typeof image.alternativeText === "string" ? image.alternativeText : "",
    };
  });

  return {
    id: entry.id,
    title: entry.title,
    slug: entry.slug,
    main_image: entry.mainImage?.url,
    location: entry.location,
    sector: entry.sector.name,
    area: entry.area,
    completed: entry.completed,
    gallery,
    beck: entry.beck,
    content: entry.content,
    description: entry.description,
  };
});

const title = computed(() => page.value?.title);

function toSeoDescription(description?: string) {
  return (
    description
      ?.replace(/```[\s\S]*?```/g, " ")
      .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[#*_>`~|-]/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 160) || ""
  );
}

const seoTitle = computed(() => {
  return title.value ? `${title.value} | Envision Projects` : "Project | Envision";
});

const seoDescription = computed(() => {
  const fromDescription = toSeoDescription(page.value?.description);
  if (fromDescription) return fromDescription;

  const location = page.value?.location ? ` in ${page.value.location}` : "";
  const sector = page.value?.sector ? `${page.value.sector} ` : "";
  return `Explore ${page.value?.title || "this project"}, an Envision ${sector}project${location}.`;
});

const canonicalPath = computed(() => {
  if (sectorSlug.value && slug.value) {
    return `/projects/${sectorSlug.value}/${slug.value}`;
  }

  return route.path;
});

const activeImage = ref<string | null>(null);
const imageDialogRef = useTemplateRef<HTMLDialogElement | null>("imageDialogRef");
const closeButtonRef = useTemplateRef<HTMLButtonElement | null>("closeButtonRef");
const restoreFocusRef = ref<HTMLElement | null>(null);

const isLoading = ref(false);
const hasImageError = ref(false);

async function handleImageClick(image: GalleryImage) {
  if (activeImage.value !== image.url) {
    activeImage.value = image.url;
    isLoading.value = true;
    hasImageError.value = false;
  }

  const dialog = imageDialogRef.value;
  if (!dialog?.open) {
    restoreFocusRef.value =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog?.showModal();
  }

  await nextTick();
  closeButtonRef.value?.focus();
}

function closeImageDialog() {
  imageDialogRef.value?.close();
}

function onImageDialogClose() {
  restoreFocusRef.value?.focus();
  restoreFocusRef.value = null;
}

function onLoad() {
  isLoading.value = false;
}

function onImageError() {
  isLoading.value = false;
  hasImageError.value = true;
}

const { data: ast } = await useAsyncData(
  markdownDataKey,
  async () => {
    if (!page.value?.description) {
      return null;
    }
    return parseMarkdown(page.value.description);
  },
  { watch: [page] },
);

const stats = computed<Item[]>(() => {
  if (!page.value) return [];

  return [
    {
      id: 1,
      label: page.value.location || "Location unavailable",
      description: "Location",
    },

    {
      id: 2,
      label: page.value.completed ? formatMonthYear(page.value.completed) : "Current project",
      description: "Completed",
    },

    {
      id: 3,
      label: page.value.area || "Area unavailable",
      description: "Area",
    },
  ];
});

useSeoMeta(() => ({
  title: seoTitle.value,
  description: seoDescription.value,
  ogTitle: seoTitle.value,
  ogDescription: seoDescription.value,
  ogImage: page.value?.main_image,
  ogType: "article",
  ogUrl: canonicalPath.value,
  twitterCard: page.value?.main_image ? "summary_large_image" : "summary",
  twitterTitle: seoTitle.value,
  twitterDescription: seoDescription.value,
  twitterImage: page.value?.main_image,
}));

useHead(() => ({
  link: [
    {
      rel: "canonical",
      href: canonicalPath.value,
    },
  ],
}));
</script>

<template>
  <div>
    <banner-b :image="page?.main_image">
      {{ page?.title }}
    </banner-b>
    <section-e
      v-if="page"
      bgcolor="dark"
      no-padding
      class="dark grid grid-cols-1 min-[800px]:grid-cols-2"
    >
      <template #header>
        <section-header-a :eyebrow="page.sector" :title="page.title" />
        <article>
          <div class="">
            <div class="info">
              <list-e small :items="stats" />
            </div>
            <div v-if="ast?.body" class="max-w-[75ch]">
              <MDCRenderer :body="ast.body" :data="ast.data" />
            </div>
            <div v-if="page?.beck">
              <Icon name="logos:belogo" size="60" />
            </div>
          </div>
        </article>
      </template>
      <template #body>
        <ul class="gallery">
          <li v-for="image in page.gallery" :key="image.url">
            <button
              type="button"
              class="gallery-trigger"
              :aria-label="`Open ${page.title} gallery image`"
              @click="handleImageClick(image)"
            >
              <NuxtImg
                provider="imagekit"
                :src="image.url"
                :alt="image.altText || page.title"
                format="webp"
                sizes="100vw sm:50vw lg:25vw"
                loading="lazy"
                class="gallery-trigger__image"
              />
            </button>
          </li>
        </ul>
        <dialog
          id="image"
          ref="imageDialogRef"
          :aria-label="`${page.title} image viewer`"
          @close="onImageDialogClose"
        >
          <button
            ref="closeButtonRef"
            type="button"
            class="close-btn"
            :aria-label="`Close ${page.title} image viewer`"
            @click="closeImageDialog"
          >
            <UIcon name="i-lucide-x" class="close-btn__icon w-6 h-6" />
          </button>
          <figure>
            <div
              v-if="isLoading"
              class="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <UIcon name="i-lucide-loader-2" class="loading-icon w-10 h-10 animate-spin" />
            </div>
            <NuxtImg
              v-if="activeImage && !hasImageError"
              :key="activeImage"
              :src="activeImage"
              :alt="page.title"
              format="avif"
              sizes="100vw sm:500px md:600px lg:900px xl:1100px 2xl:1300px"
              @load="onLoad"
              @error="onImageError"
            />
            <div v-else-if="hasImageError" class="image-error" role="status">
              <AppTypography tag="p">
                This project image could not be loaded. Close the viewer and try another image.
              </AppTypography>
            </div>
          </figure>
        </dialog>
      </template>
    </section-e>
    <div v-else>Oh no! Page not found.</div>
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

.gallery-trigger {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  cursor: pointer;
  display: block;
  overflow: hidden;
  background: transparent;
}

.gallery-trigger::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(
    to top,
    color-mix(in oklch, var(--color-envision-gray-900) 20%, transparent) 0%,
    transparent 100%
  );
}

.gallery-trigger__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 0.5s var(--ease-base);
}

.gallery-trigger:hover .gallery-trigger__image,
.gallery-trigger:focus-visible .gallery-trigger__image {
  transform: scale(1.03);
}

.gallery-trigger:focus-visible {
  outline: 2px solid var(--ui-primary);
  outline-offset: 3px;
  z-index: 1;
}

.info {
  display: flex;
  flex-wrap: wrap;
  column-gap: calc(var(--spacing) * 8);
  row-gap: calc(var(--spacing) * 4);
}

#image[open] {
  position: fixed;
  inset: 0;
  margin: 0;
  padding: 0;
  border: 0;

  width: 100vw;
  height: 100vh;

  overflow: hidden;
  background: color-mix(in oklch, var(--color-envision-gray-900) 85%, transparent);
}

#image::backdrop {
  background: color-mix(in oklch, var(--color-envision-gray-900) 85%, transparent);
}

.close-btn {
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 50;

  background-color: var(--color-white);
  border-radius: 9999px;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
}

.close-btn__icon {
  color: var(--color-envision-gray-900);
}

.loading-icon {
  color: var(--color-white);
}

.image-error {
  max-width: 32rem;
  padding-inline: calc(var(--spacing) * 6);
  color: var(--color-white);
  text-align: center;
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

@media (prefers-reduced-motion: reduce) {
  .gallery-trigger__image {
    transition: none;
  }
}
</style>
