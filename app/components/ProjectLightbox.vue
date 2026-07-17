<script setup lang="ts">
import type { GalleryNavMethod, GalleryZoomMethod } from '~/composables/useLightboxGestures';
import type { GalleryImage } from '~~/shared/types/global';

const props = defineProps<{
  images: GalleryImage[];
  title: string;
}>();

const emit = defineEmits<{
  opened: [index: number];
  closed: [index: number];
  navigated: [payload: { from: number; to: number; method: GalleryNavMethod }];
  zoomed: [payload: { method: GalleryZoomMethod; index: number }];
  imageError: [url: string];
}>();

const dialogRef = useTemplateRef('dialogRef');
const closeButtonRef = useTemplateRef('closeButtonRef');
const viewportRef = useTemplateRef('viewportRef');

const isOpen = ref(false);
const loadedImageUrls = reactive(new Set<string>());
const failedImageUrls = reactive(new Set<string>());

const galleryCount = computed(() => props.images.length);

const {
  activeIndex,
  scale,
  isDragging,
  zoomAnimated,
  isFirstImage,
  isLastImage,
  showPreviousImage,
  showNextImage,
  openAt,
  teardown,
  slideStyle,
  zoomStyle,
} = useLightboxGestures({
  viewport: viewportRef,
  dialog: dialogRef,
  isOpen,
  count: galleryCount,
  onClose: close,
  onNavigate: (payload) => emit('navigated', payload),
  onZoom: (method) => emit('zoomed', { method, index: activeIndex.value }),
});

const isNearActive = (index: number) => Math.abs(index - activeIndex.value) <= 1;

const announcement = computed(() => {
  const image = props.images[activeIndex.value];
  if (!image) return '';

  const alt = image.altText ? `: ${image.altText}` : '';
  return `Image ${activeIndex.value + 1} of ${galleryCount.value}${alt}`;
});

async function open(index: number) {
  openAt(index);
  isOpen.value = true;

  const dialog = dialogRef.value;
  // showModal() traps focus and restores it to the invoker on close natively.
  if (dialog && !dialog.open) dialog.showModal();

  emit('opened', index);

  await nextTick();
  closeButtonRef.value?.focus();
}

function close() {
  dialogRef.value?.close();
}

function onDialogClose() {
  emit('closed', activeIndex.value);
  isOpen.value = false;
  teardown();
}

function onSlideError(image: GalleryImage) {
  failedImageUrls.add(image.url);
  emit('imageError', image.url);
}

defineExpose({ open, close });

    function getImageKitPath(url?: string) {
  if (!url) return undefined;

  return url
    .replace('https://ik.imagekit.io/pnixsw7lg', '')
    .split('?')[0];
}
</script>

<template>
  <dialog
    ref="dialogRef"
    class="lightbox"
    :aria-label="`${title} image viewer`"
    aria-describedby="lightbox-help"
    @close="onDialogClose"
  >
    <p id="lightbox-help" class="sr-only">
      Swipe, use the previous and next buttons, or press the left and right arrow keys to change
      images. Pinch, double-tap, scroll, or press plus and minus to zoom. Press Escape to close the
      viewer.
    </p>
    <p class="sr-only" role="status">{{ announcement }}</p>

    <div
      ref="viewportRef"
      class="lightbox__viewport"
      :class="{ 'lightbox__viewport--zoomed': scale > 1 }"
    >
      <ul class="lightbox__slides">
        <li
          v-for="(image, index) in images"
          :key="image.url"
          class="lightbox__slide"
          :class="{ 'lightbox__slide--dragging': isDragging }"
          :style="slideStyle(index)"
          :aria-hidden="index !== activeIndex"
        >
          <template v-if="isOpen && isNearActive(index)">
            <div v-if="failedImageUrls.has(image.url)" class="image-error" role="status">
              <AppTypography tag="p">
                This project image could not be loaded. Close the viewer and try another image.
              </AppTypography>
            </div>
            <template v-else>
              <div
                class="lightbox__zoom"
                :class="{ 'lightbox__zoom--animated': zoomAnimated || index !== activeIndex }"
                :style="zoomStyle(index)"
              >
                <NuxtImg
                  class="lightbox__image"
                  :src="getImageKitPath(image.url)"
                  :alt="image.altText"
                  :data-recommended-filename="image.recommendedFilename"
                  format="avif"
                  sizes="100vw sm:500px md:600px lg:900px xl:1100px 2xl:1300px"
                  loading="eager"
                  draggable="false"
                  @load="loadedImageUrls.add(image.url)"
                  @error="onSlideError(image)"
                />
              </div>
              <div v-if="!loadedImageUrls.has(image.url)" class="lightbox__loading">
                <UIcon name="i-lucide-loader-2" class="loading-icon w-10 h-10 animate-spin" />
              </div>
            </template>
          </template>
        </li>
      </ul>
    </div>

    <p v-if="galleryCount > 1" class="lightbox__counter" aria-hidden="true">
      {{ activeIndex + 1 }} / {{ galleryCount }}
    </p>

    <MButton
      ref="closeButtonRef"
      type="button"
      class="close-btn"
      :aria-label="`Close ${title} image viewer`"
      icon-only
      @click="close"
    >
      <template #icon>
        <UIcon name="i-lucide-x" class="close-btn__icon w-6 h-6" />
      </template>
    </MButton>

    <MButton
      v-if="galleryCount > 1"
      type="button"
      class="lightbox__nav lightbox__nav--prev"
      aria-label="Previous image"
      :aria-disabled="isFirstImage"
      icon-only
      @click="showPreviousImage('button')"
    >
      <template #icon>
        <UIcon name="i-lucide-chevron-left" class="w-6 h-6" />
      </template>
    </MButton>

    <MButton
      v-if="galleryCount > 1"
      type="button"
      class="lightbox__nav lightbox__nav--next"
      aria-label="Next image"
      :aria-disabled="isLastImage"
      icon-only
      @click="showNextImage('button')"
    >
      <template #icon>
        <UIcon name="i-lucide-chevron-right" class="w-6 h-6" />
      </template>
    </MButton>
  </dialog>
</template>

<style scoped>
.lightbox[open] {
  position: fixed;
  inset: 0;
  margin: 0;
  padding: 0;
  border: 0;

  width: 100vw;
  max-width: none;
  height: 100vh;
  height: 100dvh;
  max-height: none;

  overflow: hidden;
  touch-action: none;
  background: color-mix(in oklch, var(--color-envision-gray-900) 92%, transparent);
}

.lightbox::backdrop {
  background: color-mix(in oklch, var(--color-envision-gray-900) 85%, transparent);
}

.lightbox__viewport {
  position: absolute;
  inset: 0;
  overflow: hidden;
  touch-action: none;
  overscroll-behavior: contain;
  user-select: none;
  -webkit-user-select: none;
}

.lightbox__viewport--zoomed {
  cursor: grab;
}

.lightbox__slides {
  position: absolute;
  inset: 0;
  margin: 0;
  padding: 0;
  list-style: none;
}

.lightbox__slide {
  position: absolute;
  inset: 0;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  transition: transform 0.35s var(--ease-base);
}

.lightbox__slide--dragging {
  transition: none;
}

.lightbox__zoom {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center;
}

.lightbox__zoom--animated {
  transition: transform 0.3s var(--ease-base);
}

.lightbox__image {
  max-width: 100%;
  max-height: 100%;
  width: auto;
  height: auto;
  object-fit: contain;
  -webkit-user-drag: none;
}

.lightbox__loading {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
}

.lightbox__counter {
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 50;
  margin: 0;
  line-height: 2.5rem;
  color: var(--color-white);
  font-variant-numeric: tabular-nums;
}

.lightbox__nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;

  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;

  border: none;
  border-radius: 9999px;
  background-color: var(--color-white);
  color: var(--color-envision-gray-900);
  cursor: pointer;
}

.lightbox__nav--prev {
  left: 1.5rem;
}

.lightbox__nav--next {
  right: 1.5rem;
}

.lightbox__nav[aria-disabled='true'] {
  opacity: 0.35;
  cursor: default;
}

@media (pointer: coarse) {
  .lightbox__nav {
    width: 2.75rem;
    height: 2.75rem;
    background-color: color-mix(in oklch, var(--color-envision-gray-900) 60%, transparent);
    color: var(--color-white);
  }

  .lightbox__nav--prev {
    left: 0.75rem;
  }

  .lightbox__nav--next {
    right: 0.75rem;
  }
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

.lightbox__nav:focus-visible,
.close-btn:focus-visible {
  outline: 2px solid var(--color-white);
  outline-offset: 3px;
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

@media (prefers-reduced-motion: reduce) {
  .lightbox__slide,
  .lightbox__zoom--animated {
    transition: none;
  }
}
</style>
