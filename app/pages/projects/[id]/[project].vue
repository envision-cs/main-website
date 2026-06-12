<script setup lang="ts">import type { Project } from '~~/shared/types/content-types';

import { parseMarkdown } from '@nuxtjs/mdc/runtime';

const { formatMonthYear } = useFormatDate();

const route = useRoute();

const slug = computed(() => {
  const param = route.params.project;

  if (typeof param !== 'string')
    return '';

  const normalized = param.trim();
  if (!normalized || normalized === 'null' || normalized === 'undefined')
    return '';

  return normalized;
});
const sectorSlug = computed(() => {
  const param = route.params.id;

  if (typeof param !== 'string')
    return '';

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
        statusMessage: 'Project not found',
      });
    }

    return await $fetch<Project>(`/api/projects/${encodeURIComponent(slug.value)}`);
  },
  { watch: [slug], default: () => null },
);

if (projectError.value) {
  throw createError({
    statusCode: projectError.value.statusCode || 500,
    statusMessage: projectError.value.statusMessage || 'Unable to load project',
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
      altText: typeof image.alternativeText === 'string' ? image.alternativeText : '',
    };
  });

  return {
    id: entry.id,
    title: entry.title,
    slug: entry.slug,
    main_image: entry.mainImage?.url,
    location: entry.location,
    sector: formatProjectSectorLabel(entry) || 'Project',
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
      ?.replace(/```[\s\S]*?```/g, ' ')
      .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/[#*_>`~|-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 160) || ''
  );
}

const seoTitle = computed(() => {
  return title.value ? `${title.value} | Envision Projects` : 'Project | Envision';
});

const seoDescription = computed(() => {
  const fromDescription = toSeoDescription(page.value?.description);
  if (fromDescription)
    return fromDescription;

  const location = page.value?.location ? ` in ${page.value.location}` : '';
  const sector = page.value?.sector ? `${page.value.sector} ` : '';
  return `Explore ${page.value?.title || 'this project'}, an Envision ${sector}project${location}.`;
});

const canonicalPath = computed(() => {
  if (sectorSlug.value && slug.value) {
    return `/projects/${sectorSlug.value}/${slug.value}`;
  }

  return route.path;
});

const posthog = usePostHog();

onMounted(() => {
  if (page.value) {
    posthog?.capture('project_viewed', {
      project_title: page.value.title,
      project_sector: page.value.sector,
      project_location: page.value.location,
      project_slug: page.value.slug,
    });
  }
});

const imageDialogRef = useTemplateRef<HTMLDialogElement | null>('imageDialogRef');
const closeButtonRef = useTemplateRef<HTMLButtonElement | null>('closeButtonRef');
const viewportRef = useTemplateRef<HTMLDivElement | null>('viewportRef');
const restoreFocusRef = ref<HTMLElement | null>(null);

const galleryImages = computed<GalleryImage[]>(() => page.value?.gallery ?? []);
const galleryCount = computed(() => galleryImages.value.length);

const isLightboxOpen = ref(false);
const activeIndex = ref(0);
const loadedImageUrls = reactive(new Set<string>());
const failedImageUrls = reactive(new Set<string>());

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;

const scale = ref(1);
const panX = ref(0);
const panY = ref(0);
const dragX = ref(0);
const isDragging = ref(false);
const zoomAnimated = ref(true);

const isFirstImage = computed(() => activeIndex.value <= 0);
const isLastImage = computed(() => activeIndex.value >= galleryCount.value - 1);

const lightboxAnnouncement = computed(() => {
  const image = galleryImages.value[activeIndex.value];
  if (!image)
    return '';

  const alt = image.altText ? `: ${image.altText}` : '';
  return `Image ${activeIndex.value + 1} of ${galleryCount.value}${alt}`;
});

interface GestureSnapshot {
  x: number;
  y: number;
  time: number;
  panX: number;
  panY: number;
  scale: number;
  dist: number;
  midX: number;
  midY: number;
}

const activePointers = new Map<number, { x: number; y: number }>();
let gesture: 'none' | 'swipe' | 'pan' | 'pinch' = 'none';
let gestureStart: GestureSnapshot = {
  x: 0,
  y: 0,
  time: 0,
  panX: 0,
  panY: 0,
  scale: 1,
  dist: 1,
  midX: 0,
  midY: 0,
};
let lastTap = { time: 0, x: 0, y: 0 };
let suppressTap = false;
let moveFrame = 0;

function clampValue(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function isNearActive(index: number) {
  return Math.abs(index - activeIndex.value) <= 1;
}

function slideStyle(index: number) {
  return {
    transform: `translate3d(calc(${(index - activeIndex.value) * 100}% + ${dragX.value}px), 0, 0)`,
  };
}

function zoomStyle(index: number) {
  if (index !== activeIndex.value)
    return undefined;

  return {
    transform: `translate3d(${panX.value}px, ${panY.value}px, 0) scale(${scale.value})`,
  };
}

function pointFromViewportCenter(clientX: number, clientY: number) {
  const rect = viewportRef.value?.getBoundingClientRect();
  if (!rect)
    return { x: 0, y: 0 };

  return {
    x: clientX - rect.left - rect.width / 2,
    y: clientY - rect.top - rect.height / 2,
  };
}

function clampPanToBounds() {
  const viewport = viewportRef.value;
  if (!viewport)
    return;

  const maxX = (viewport.clientWidth * (scale.value - 1)) / 2;
  const maxY = (viewport.clientHeight * (scale.value - 1)) / 2;
  panX.value = clampValue(panX.value, -maxX, maxX);
  panY.value = clampValue(panY.value, -maxY, maxY);
}

function resetZoom(animated = true) {
  zoomAnimated.value = animated;
  scale.value = 1;
  panX.value = 0;
  panY.value = 0;
}

function zoomToPoint(targetScale: number, originX: number, originY: number) {
  const nextScale = clampValue(targetScale, MIN_SCALE, MAX_SCALE);
  const ratio = nextScale / scale.value;
  panX.value = originX - (originX - panX.value) * ratio;
  panY.value = originY - (originY - panY.value) * ratio;
  scale.value = nextScale;
  clampPanToBounds();
}

function captureGalleryEvent(event: string, props: Record<string, unknown> = {}) {
  posthog?.capture(event, {
    project_title: page.value?.title,
    project_slug: page.value?.slug,
    ...props,
  });
}

async function openLightbox(index: number) {
  captureGalleryEvent('project_gallery_image_opened', { image_index: index });

  activeIndex.value = clampValue(index, 0, Math.max(galleryCount.value - 1, 0));
  resetZoom(false);
  dragX.value = 0;
  isLightboxOpen.value = true;

  const dialog = imageDialogRef.value;
  if (dialog && !dialog.open) {
    restoreFocusRef.value
      = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog.showModal();
  }

  await nextTick();
  closeButtonRef.value?.focus();
}

function closeImageDialog() {
  imageDialogRef.value?.close();
}

function onSlideLoaded(url: string) {
  loadedImageUrls.add(url);
}

function onSlideError(image: GalleryImage) {
  failedImageUrls.add(image.url);
  captureGalleryEvent('project_gallery_image_error', { image_url: image.url });
}

function onImageDialogClose() {
  captureGalleryEvent('project_gallery_closed', { image_index: activeIndex.value });
  isLightboxOpen.value = false;
  activePointers.clear();
  gesture = 'none';
  isDragging.value = false;
  dragX.value = 0;
  if (moveFrame) {
    cancelAnimationFrame(moveFrame);
    moveFrame = 0;
  }
  resetZoom(false);
  restoreFocusRef.value?.focus();
  restoreFocusRef.value = null;
}

type GalleryNavMethod = 'button' | 'keyboard' | 'swipe';

function goToImage(index: number, method: GalleryNavMethod = 'button') {
  if (!galleryCount.value)
    return;

  dragX.value = 0;
  isDragging.value = false;
  const target = clampValue(index, 0, galleryCount.value - 1);
  if (target === activeIndex.value)
    return;

  const fromIndex = activeIndex.value;
  activeIndex.value = target;
  resetZoom(true);
  captureGalleryEvent('project_gallery_image_navigated', {
    from_index: fromIndex,
    to_index: target,
    method,
  });
}

function showPreviousImage(method: GalleryNavMethod = 'button') {
  if (!isFirstImage.value)
    goToImage(activeIndex.value - 1, method);
}

function showNextImage(method: GalleryNavMethod = 'button') {
  if (!isLastImage.value)
    goToImage(activeIndex.value + 1, method);
}

function startSinglePointerGesture(x: number, y: number) {
  gesture = scale.value > 1.01 ? 'pan' : 'swipe';
  gestureStart = {
    x,
    y,
    time: performance.now(),
    panX: panX.value,
    panY: panY.value,
    scale: scale.value,
    dist: 1,
    midX: 0,
    midY: 0,
  };

  if (gesture === 'pan')
    zoomAnimated.value = false;
  else
    isDragging.value = true;
}

function startPinchGesture() {
  const [first, second] = [...activePointers.values()];
  if (!first || !second)
    return;

  if (scale.value <= 1.01) {
    captureGalleryEvent('project_gallery_image_zoomed', {
      method: 'pinch',
      image_index: activeIndex.value,
    });
  }

  dragX.value = 0;
  isDragging.value = false;
  zoomAnimated.value = false;
  gesture = 'pinch';

  const mid = pointFromViewportCenter((first.x + second.x) / 2, (first.y + second.y) / 2);
  gestureStart = {
    x: 0,
    y: 0,
    time: performance.now(),
    panX: panX.value,
    panY: panY.value,
    scale: scale.value,
    dist: Math.max(Math.hypot(second.x - first.x, second.y - first.y), 1),
    midX: mid.x,
    midY: mid.y,
  };
}

function rebaselineSinglePointer() {
  const [remaining] = [...activePointers.values()];
  if (!remaining)
    return;

  suppressTap = true;
  startSinglePointerGesture(remaining.x, remaining.y);
}

function onViewportPointerDown(event: PointerEvent) {
  if (event.pointerType === 'mouse' && event.button !== 0)
    return;

  const viewport = viewportRef.value;
  if (!viewport)
    return;

  viewport.setPointerCapture(event.pointerId);
  activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

  if (activePointers.size === 2) {
    startPinchGesture();
  }
  else if (activePointers.size === 1) {
    suppressTap = false;
    startSinglePointerGesture(event.clientX, event.clientY);
  }
}

function onViewportPointerMove(event: PointerEvent) {
  const pointer = activePointers.get(event.pointerId);
  if (!pointer)
    return;

  pointer.x = event.clientX;
  pointer.y = event.clientY;

  if (gesture !== 'none' && !moveFrame)
    moveFrame = requestAnimationFrame(applyGestureFrame);
}

function applyGestureFrame() {
  moveFrame = 0;

  if (gesture === 'pinch') {
    const [first, second] = [...activePointers.values()];
    if (!first || !second)
      return;

    const dist = Math.max(Math.hypot(second.x - first.x, second.y - first.y), 1);
    const nextScale = clampValue(
      gestureStart.scale * (dist / gestureStart.dist),
      MIN_SCALE,
      MAX_SCALE,
    );
    const mid = pointFromViewportCenter((first.x + second.x) / 2, (first.y + second.y) / 2);
    const ratio = nextScale / gestureStart.scale;
    panX.value = mid.x - (gestureStart.midX - gestureStart.panX) * ratio;
    panY.value = mid.y - (gestureStart.midY - gestureStart.panY) * ratio;
    scale.value = nextScale;
    clampPanToBounds();
    return;
  }

  const [pointer] = [...activePointers.values()];
  if (!pointer)
    return;

  if (gesture === 'pan') {
    panX.value = gestureStart.panX + (pointer.x - gestureStart.x);
    panY.value = gestureStart.panY + (pointer.y - gestureStart.y);
    clampPanToBounds();
  }
  else if (gesture === 'swipe') {
    let delta = pointer.x - gestureStart.x;
    if ((isFirstImage.value && delta > 0) || (isLastImage.value && delta < 0))
      delta *= 0.3;
    dragX.value = delta;
  }
}

function handleTap(event: PointerEvent) {
  const now = performance.now();
  const isDoubleTap
    = now - lastTap.time < 300
      && Math.hypot(event.clientX - lastTap.x, event.clientY - lastTap.y) < 32;

  if (isDoubleTap) {
    lastTap = { time: 0, x: 0, y: 0 };
    zoomAnimated.value = true;
    if (scale.value > 1.01) {
      resetZoom(true);
    }
    else {
      captureGalleryEvent('project_gallery_image_zoomed', {
        method: 'double_tap',
        image_index: activeIndex.value,
      });
      const origin = pointFromViewportCenter(event.clientX, event.clientY);
      zoomToPoint(DOUBLE_TAP_SCALE, origin.x, origin.y);
    }
    return;
  }

  lastTap = { time: now, x: event.clientX, y: event.clientY };

  const target = document.elementFromPoint(event.clientX, event.clientY);
  if (target && !target.closest('img') && !target.closest('button'))
    closeImageDialog();
}

function endGesture() {
  gesture = 'none';
  isDragging.value = false;
  zoomAnimated.value = true;
  if (scale.value < 1.01)
    resetZoom(true);
}

function onViewportPointerUp(event: PointerEvent) {
  if (!activePointers.has(event.pointerId))
    return;

  activePointers.delete(event.pointerId);

  if (gesture === 'pinch') {
    if (activePointers.size === 1)
      rebaselineSinglePointer();
    else if (activePointers.size >= 2)
      startPinchGesture();
    else
      endGesture();
    return;
  }

  const elapsed = performance.now() - gestureStart.time;
  const movedDistance = Math.hypot(
    event.clientX - gestureStart.x,
    event.clientY - gestureStart.y,
  );
  const isTap = !suppressTap && movedDistance < 8 && elapsed < 350;

  if (gesture === 'swipe') {
    if (isTap)
      handleTap(event);

    const viewportWidth = viewportRef.value?.clientWidth ?? 0;
    const threshold = Math.min(96, Math.max(viewportWidth * 0.2, 48));
    const isFlick = elapsed < 280 && Math.abs(dragX.value) > 32;

    if (dragX.value <= -threshold || (isFlick && dragX.value < 0))
      showNextImage('swipe');
    else if (dragX.value >= threshold || (isFlick && dragX.value > 0))
      showPreviousImage('swipe');

    dragX.value = 0;
  }
  else if (gesture === 'pan' && isTap) {
    handleTap(event);
  }

  if (activePointers.size === 0)
    endGesture();
}

function onViewportPointerCancel(event: PointerEvent) {
  if (!activePointers.has(event.pointerId))
    return;

  activePointers.delete(event.pointerId);

  if (gesture === 'pinch' && activePointers.size === 1) {
    rebaselineSinglePointer();
    return;
  }

  if (activePointers.size === 0) {
    dragX.value = 0;
    endGesture();
  }
}

function onViewportWheel(event: WheelEvent) {
  event.preventDefault();
  zoomAnimated.value = false;
  const origin = pointFromViewportCenter(event.clientX, event.clientY);
  const factor = Math.exp(-event.deltaY * 0.002);
  if (factor > 1 && scale.value <= 1.01) {
    captureGalleryEvent('project_gallery_image_zoomed', {
      method: 'wheel',
      image_index: activeIndex.value,
    });
  }
  zoomToPoint(scale.value * factor, origin.x, origin.y);
}

function keyboardZoom(factor: number) {
  zoomAnimated.value = true;
  if (factor > 1 && scale.value <= 1.01) {
    captureGalleryEvent('project_gallery_image_zoomed', {
      method: 'keyboard',
      image_index: activeIndex.value,
    });
  }
  zoomToPoint(scale.value * factor, 0, 0);
}

function onDialogKeydown(event: KeyboardEvent) {
  switch (event.key) {
    case 'ArrowRight':
      showNextImage('keyboard');
      break;
    case 'ArrowLeft':
      showPreviousImage('keyboard');
      break;
    case 'Home':
      goToImage(0, 'keyboard');
      break;
    case 'End':
      goToImage(galleryCount.value - 1, 'keyboard');
      break;
    case '+':
    case '=':
      keyboardZoom(1.5);
      break;
    case '-':
    case '_':
      keyboardZoom(1 / 1.5);
      break;
    case '0':
      resetZoom(true);
      break;
    default:
      return;
  }
  event.preventDefault();
}

onBeforeUnmount(() => {
  if (moveFrame)
    cancelAnimationFrame(moveFrame);
});

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
  if (!page.value)
    return [];
  const stats = [
    {
      id: 1,
      label: page.value.location ?? null,
      description: 'Location',
    },

    {
      id: 2,
      label: page.value.completed ? formatMonthYear(page.value.completed) : null,
      description: 'Completion',
    },

    {
      id: 3,
      label: page.value.area,
      description: 'Area',
    },
  ];

  if (!stats[0]?.label && !stats[1]?.label && !stats[2]?.label) {
    return null;
  }
  return stats;
});

useSeoMeta(() => ({
  title: seoTitle.value,
  description: seoDescription.value,
  ogTitle: seoTitle.value,
  ogDescription: seoDescription.value,
  ogImage: page.value?.main_image,
  ogType: 'article',
  ogUrl: canonicalPath.value,
  twitterCard: page.value?.main_image ? 'summary_large_image' : 'summary',
  twitterTitle: seoTitle.value,
  twitterDescription: seoDescription.value,
  twitterImage: page.value?.main_image,
}));

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: canonicalPath.value,
    },
  ],
}));

const { data } = await useAsyncData<Project[]>(
  'projects-page-data',
  async () => {
    try {
      return await $fetch<Project[]>('/api/projects');
    }
    catch (err) {
      console.error('Strapi error:', err);
      return [];
    }
  },
  { default: () => [] },
);

const activeProjects = computed(() => {
  return data.value.find((p) => {
    const sector = formatProjectSectorLabel(p);
    if (!sector || sector === undefined) {
      return true;
    }
    return sector === page.value?.sector;
  });
});
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
            <div v-if="stats != null" class="info">
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
          <li v-for="(image, index) in page.gallery" :key="image.url">
            <button
              type="button"
              class="gallery-trigger"
              :aria-label="`Open image ${index + 1} of ${page.gallery.length} in the ${page.title} gallery`"
              @click="openLightbox(index)"
            >
              <NuxtImg
                provider="imagekit"
                :src="image.url"
                :alt="image.altText || page.title"
                format="avif"
                sizes="100vw sm:50vw lg:25vw"
                loading="lazy"
                class="gallery-trigger__image"
              />
            </button>
          </li>
        </ul>
        <dialog
          ref="imageDialogRef"
          class="lightbox"
          :aria-label="`${page.title} image viewer`"
          aria-describedby="lightbox-help"
          @close="onImageDialogClose"
          @keydown="onDialogKeydown"
        >
          <p id="lightbox-help" class="sr-only">
            Swipe, use the previous and next buttons, or press the left and right arrow keys to
            change images. Pinch, double-tap, scroll, or press plus and minus to zoom. Press
            Escape to close the viewer.
          </p>
          <p class="sr-only" role="status">{{ lightboxAnnouncement }}</p>
          <div
            ref="viewportRef"
            class="lightbox__viewport"
            :class="{ 'lightbox__viewport--zoomed': scale > 1 }"
            @pointerdown="onViewportPointerDown"
            @pointermove="onViewportPointerMove"
            @pointerup="onViewportPointerUp"
            @pointercancel="onViewportPointerCancel"
            @wheel="onViewportWheel"
          >
            <ul class="lightbox__slides">
              <li
                v-for="(image, index) in page.gallery"
                :key="image.url"
                class="lightbox__slide"
                :class="{ 'lightbox__slide--dragging': isDragging }"
                :style="slideStyle(index)"
                :aria-hidden="index !== activeIndex"
              >
                <template v-if="isLightboxOpen && isNearActive(index)">
                  <div v-if="failedImageUrls.has(image.url)" class="image-error" role="status">
                    <AppTypography tag="p">
                      This project image could not be loaded. Close the viewer and try another
                      image.
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
                        :src="image.url"
                        :alt="image.altText || page.title"
                        format="avif"
                        sizes="100vw sm:500px md:600px lg:900px xl:1100px 2xl:1300px"
                        loading="eager"
                        draggable="false"
                        @load="onSlideLoaded(image.url)"
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
          <p v-if="page.gallery.length > 1" class="lightbox__counter" aria-hidden="true">
            {{ activeIndex + 1 }} / {{ page.gallery.length }}
          </p>
          <button
            ref="closeButtonRef"
            type="button"
            class="close-btn"
            :aria-label="`Close ${page.title} image viewer`"
            @click="closeImageDialog"
          >
            <UIcon name="i-lucide-x" class="close-btn__icon w-6 h-6" />
          </button>
          <button
            v-if="page.gallery.length > 1"
            type="button"
            class="lightbox__nav lightbox__nav--prev"
            aria-label="Previous image"
            :aria-disabled="isFirstImage"
            @click="showPreviousImage('button')"
          >
            <UIcon name="i-lucide-chevron-left" class="w-6 h-6" />
          </button>
          <button
            v-if="page.gallery.length > 1"
            type="button"
            class="lightbox__nav lightbox__nav--next"
            aria-label="Next image"
            :aria-disabled="isLastImage"
            @click="showNextImage('button')"
          >
            <UIcon name="i-lucide-chevron-right" class="w-6 h-6" />
          </button>
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

.info {
  display: flex;
  flex-wrap: wrap;
  column-gap: calc(var(--spacing) * 8);
  row-gap: calc(var(--spacing) * 4);
}

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
  .gallery-trigger__image,
  .lightbox__slide,
  .lightbox__zoom--animated {
    transition: none;
  }
}

.projects {
  container-type: inline-size;
  container-name: projects;
  position: relative;
  background: var(--color-envision-gray-800);
}
.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  container: projects;
  background: var(--color-envision-gray-800);
}

@container projects (width > 550px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@container projects (width > 1000px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@container projects (width > 1400px) {
  .projects-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
