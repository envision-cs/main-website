<script setup lang="ts">
import type { ProjectLightbox } from '#components';
import type { GalleryImage } from '~~/shared/types/gallery';

const props = defineProps<{
  images: GalleryImage[];
  projectTitle: string;
  projectSlug: string;
}>();

const posthog = usePostHog();

function track(event: string, extra: Record<string, unknown> = {}) {
  posthog?.capture(event, {
    project_title: props.projectTitle,
    project_slug: props.projectSlug,
    ...extra,
  });
}

// The lightbox (and its gesture code) is only mounted after the first
// interaction, keeping it out of the initial render + hydration path.
const lightboxRequested = ref(false);
const hasTrackedGalleryInteraction = ref(false);
const lightboxRef = useTemplateRef<InstanceType<typeof ProjectLightbox>>('lightboxRef');

watch(
  () => props.projectSlug,
  () => {
    hasTrackedGalleryInteraction.value = false;
  },
);

async function openLightbox(index: number) {
  if (!lightboxRequested.value) {
    lightboxRequested.value = true;
    await nextTick();
  }

  const lightbox = lightboxRef.value;
  if (!lightbox) return;

  if (!hasTrackedGalleryInteraction.value) {
    hasTrackedGalleryInteraction.value = true;
    track('project_gallery_interacted', {
      funnel_stage: 'middle',
      conversion_role: 'process_milestone',
      funnel_movement: 'neutral',
      intent: 'medium',
    });
  }

  await lightbox.open(index);
}
function getImageKitPath(url?: string) {
  if (!url) return undefined;

  return url.replace('https://ik.imagekit.io/pnixsw7lg', '').split('?')[0];
}
</script>

<template>
  <ul class="gallery">
    <li v-for="(image, index) in images" :key="image.url">
      <MButton
        type="button"
        class="gallery-trigger"
        :aria-label="`Open image ${index + 1} of ${images.length} in the ${projectTitle} gallery`"
        @click="openLightbox(index)"
      >
        <NuxtImg
          provider="imagekit"
          :src="getImageKitPath(image.url)"
          :alt="image.altText"
          :data-recommended-filename="image.recommendedFilename"
          format="avif"
          sizes="100vw sm:50vw lg:25vw"
          loading="lazy"
          class="gallery-trigger__image"
        />
      </MButton>
    </li>
  </ul>

  <LazyProjectLightbox
    v-if="lightboxRequested"
    ref="lightboxRef"
    :images="images"
    :title="projectTitle"
    @navigated="
      track('project_gallery_image_navigated', {
        from_index: $event.from,
        to_index: $event.to,
        method: $event.method,
      })
    "
    @zoomed="
      track('project_gallery_image_zoomed', {
        method: $event.method,
        image_index: $event.index,
      })
    "
    @image-error="track('project_gallery_image_error', { image_url: $event })"
  />
</template>

<style scoped>
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
  content: '';
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

@media (prefers-reduced-motion: reduce) {
  .gallery-trigger__image {
    transition: none;
  }
}
</style>
