<script setup lang="ts">
import type { Project } from '~~/shared/types/content-types';

import { parseMarkdown } from '@nuxtjs/mdc/runtime';
import {
  buildProjectImageAlt,
  buildProjectImageFilename,
  buildProjectSeoDescription,
  buildProjectSeoTitle,
  formatProjectHeading,
  getProjectLocationParts,
  limitSeoText,
  toAbsoluteProjectUrl,
} from '~/utils/project-seo';

const { formatMonthYear } = useFormatDate();

const route = useRoute();

const slug = computed(() => {
  const param = route.params.project;

  if (typeof param !== 'string') return '';

  const normalized = param.trim();
  if (!normalized || normalized === 'null' || normalized === 'undefined') return '';

  return normalized;
});
const sectorSlug = computed(() => {
  const param = route.params.id;

  if (typeof param !== 'string') return '';

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
  recommendedFilename: string;
}

const page = computed(() => {
  const entry = projectData.value;

  if (!entry) {
    return null;
  }

  const sector = formatProjectSectorLabel(entry) || 'Project';
  const gallery: GalleryImage[] = (entry.gallery || []).map((image, index) => {
    return {
      url: image.url,
      altText:
        typeof image.alternativeText === 'string' && image.alternativeText.trim()
          ? image.alternativeText.trim()
          : buildProjectImageAlt({
              projectTitle: entry.title,
              location: entry.location,
              sector,
              index,
            }),
      recommendedFilename: buildProjectImageFilename({
        projectSlug: entry.slug,
        location: entry.location,
        index,
        extension: image.ext,
      }),
    };
  });

  return {
    id: entry.id,
    title: entry.title,
    slug: entry.slug,
    main_image: entry.mainImage?.url,
    location: entry.location,
    sector,
    area: entry.area,
    completed: entry.completed,
    gallery,
    beck: entry.beck,
    content: entry.content,
    description: entry.description,
    deliveryMethod: entry.deliveryMethod,
    projectType: entry.projectType,
    facilityType: entry.facilityType,
    challenge: entry.challenge,
    strategy: entry.strategy,
    preconstructionApproach: entry.preconstructionApproach,
    tradeCollaboration: entry.tradeCollaboration,
    outcome: entry.outcome,
    seoTitle: entry.seoTitle,
    seoDescription: entry.seoDescription,
    publishedAt: entry.publishedAt,
    updatedAt: entry.updatedAt,
  };
});

const projectHeading = computed(() =>
  page.value ? formatProjectHeading(page.value.title, page.value.location) : '',
);
const serviceType = computed(
  () => page.value?.deliveryMethod || page.value?.projectType || page.value?.sector,
);

const seoTitle = computed(() => {
  if (!page.value) return 'Project | Envision Construction';

  return (
    (page.value.seoTitle ? limitSeoText(page.value.seoTitle, 60) : undefined) ||
    buildProjectSeoTitle({
      title: page.value.title,
      serviceType: serviceType.value,
      location: page.value.location,
    })
  );
});

const seoDescription = computed(() => {
  if (!page.value) return 'Explore Envision Construction Services projects.';

  return (
    (page.value.seoDescription ? limitSeoText(page.value.seoDescription, 155) : undefined) ||
    buildProjectSeoDescription({
      title: page.value.title,
      serviceType: serviceType.value,
      location: page.value.location,
      description: page.value.description,
    })
  );
});

const canonicalPath = computed(() => {
  if (sectorSlug.value && slug.value) {
    return `/projects/${sectorSlug.value}/${slug.value}`;
  }

  return route.path;
});
const canonicalUrl = computed(
  () => toAbsoluteProjectUrl(canonicalPath.value) || 'https://envision-cs.com/projects',
);

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
  if (!image) return '';

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
  if (index !== activeIndex.value) return undefined;

  return {
    transform: `translate3d(${panX.value}px, ${panY.value}px, 0) scale(${scale.value})`,
  };
}

function pointFromViewportCenter(clientX: number, clientY: number) {
  const rect = viewportRef.value?.getBoundingClientRect();
  if (!rect) return { x: 0, y: 0 };

  return {
    x: clientX - rect.left - rect.width / 2,
    y: clientY - rect.top - rect.height / 2,
  };
}

function clampPanToBounds() {
  const viewport = viewportRef.value;
  if (!viewport) return;

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
    restoreFocusRef.value =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
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
  if (!galleryCount.value) return;

  dragX.value = 0;
  isDragging.value = false;
  const target = clampValue(index, 0, galleryCount.value - 1);
  if (target === activeIndex.value) return;

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
  if (!isFirstImage.value) goToImage(activeIndex.value - 1, method);
}

function showNextImage(method: GalleryNavMethod = 'button') {
  if (!isLastImage.value) goToImage(activeIndex.value + 1, method);
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

  if (gesture === 'pan') zoomAnimated.value = false;
  else isDragging.value = true;
}

function startPinchGesture() {
  const [first, second] = [...activePointers.values()];
  if (!first || !second) return;

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
  if (!remaining) return;

  suppressTap = true;
  startSinglePointerGesture(remaining.x, remaining.y);
}

function onViewportPointerDown(event: PointerEvent) {
  if (event.pointerType === 'mouse' && event.button !== 0) return;

  const viewport = viewportRef.value;
  if (!viewport) return;

  viewport.setPointerCapture(event.pointerId);
  activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

  if (activePointers.size === 2) {
    startPinchGesture();
  } else if (activePointers.size === 1) {
    suppressTap = false;
    startSinglePointerGesture(event.clientX, event.clientY);
  }
}

function onViewportPointerMove(event: PointerEvent) {
  const pointer = activePointers.get(event.pointerId);
  if (!pointer) return;

  pointer.x = event.clientX;
  pointer.y = event.clientY;

  if (gesture !== 'none' && !moveFrame) moveFrame = requestAnimationFrame(applyGestureFrame);
}

function applyGestureFrame() {
  moveFrame = 0;

  if (gesture === 'pinch') {
    const [first, second] = [...activePointers.values()];
    if (!first || !second) return;

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
  if (!pointer) return;

  if (gesture === 'pan') {
    panX.value = gestureStart.panX + (pointer.x - gestureStart.x);
    panY.value = gestureStart.panY + (pointer.y - gestureStart.y);
    clampPanToBounds();
  } else if (gesture === 'swipe') {
    let delta = pointer.x - gestureStart.x;
    if ((isFirstImage.value && delta > 0) || (isLastImage.value && delta < 0)) delta *= 0.3;
    dragX.value = delta;
  }
}

function handleTap(event: PointerEvent) {
  const now = performance.now();
  const isDoubleTap =
    now - lastTap.time < 300 &&
    Math.hypot(event.clientX - lastTap.x, event.clientY - lastTap.y) < 32;

  if (isDoubleTap) {
    lastTap = { time: 0, x: 0, y: 0 };
    zoomAnimated.value = true;
    if (scale.value > 1.01) {
      resetZoom(true);
    } else {
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
  if (target && !target.closest('img') && !target.closest('button')) closeImageDialog();
}

function endGesture() {
  gesture = 'none';
  isDragging.value = false;
  zoomAnimated.value = true;
  if (scale.value < 1.01) resetZoom(true);
}

function onViewportPointerUp(event: PointerEvent) {
  if (!activePointers.has(event.pointerId)) return;

  activePointers.delete(event.pointerId);

  if (gesture === 'pinch') {
    if (activePointers.size === 1) rebaselineSinglePointer();
    else if (activePointers.size >= 2) startPinchGesture();
    else endGesture();
    return;
  }

  const elapsed = performance.now() - gestureStart.time;
  const movedDistance = Math.hypot(event.clientX - gestureStart.x, event.clientY - gestureStart.y);
  const isTap = !suppressTap && movedDistance < 8 && elapsed < 350;

  if (gesture === 'swipe') {
    if (isTap) handleTap(event);

    const viewportWidth = viewportRef.value?.clientWidth ?? 0;
    const threshold = Math.min(96, Math.max(viewportWidth * 0.2, 48));
    const isFlick = elapsed < 280 && Math.abs(dragX.value) > 32;

    if (dragX.value <= -threshold || (isFlick && dragX.value < 0)) showNextImage('swipe');
    else if (dragX.value >= threshold || (isFlick && dragX.value > 0)) showPreviousImage('swipe');

    dragX.value = 0;
  } else if (gesture === 'pan' && isTap) {
    handleTap(event);
  }

  if (activePointers.size === 0) endGesture();
}

function onViewportPointerCancel(event: PointerEvent) {
  if (!activePointers.has(event.pointerId)) return;

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
  if (moveFrame) cancelAnimationFrame(moveFrame);
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
  if (!page.value) return [];
  return [
    {
      id: 1,
      label: page.value.location,
      description: 'Location',
    },

    {
      id: 2,
      label: page.value.projectType || page.value.sector,
      description: 'Project type',
    },

    {
      id: 3,
      label: page.value.deliveryMethod,
      description: 'Delivery method',
    },

    {
      id: 4,
      label: page.value.completed ? formatMonthYear(page.value.completed) : '',
      description: 'Completion',
    },

    {
      id: 5,
      label: page.value.area,
      description: 'Area',
    },
  ].filter((item): item is Item => Boolean(item.label));
});

useSeoMeta(() => ({
  title: seoTitle.value,
  description: seoDescription.value,
  ogTitle: seoTitle.value,
  ogDescription: seoDescription.value,
  ogImage: page.value?.main_image,
  ogType: 'article',
  ogUrl: canonicalUrl.value,
  twitterCard: page.value?.main_image ? 'summary_large_image' : 'summary',
  twitterTitle: seoTitle.value,
  twitterDescription: seoDescription.value,
  twitterImage: page.value?.main_image,
}));

const projectSchema = computed(() => {
  if (!page.value) return null;

  const organizationId = 'https://envision-cs.com/#organization';
  const webpageId = `${canonicalUrl.value}#webpage`;
  const articleId = `${canonicalUrl.value}#project`;
  const imageUrls = [page.value.main_image, ...page.value.gallery.map((image) => image.url)]
    .map(toAbsoluteProjectUrl)
    .filter((url): url is string => Boolean(url));
  const location = getProjectLocationParts(page.value.location);
  const keywords = [
    page.value.sector,
    page.value.projectType,
    page.value.deliveryMethod,
    location.city,
    location.stateName,
  ].filter((value): value is string => Boolean(value));

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': webpageId,
        url: canonicalUrl.value,
        name: seoTitle.value,
        description: seoDescription.value,
        inLanguage: 'en-US',
        about: {
          '@id': articleId,
        },
        breadcrumb: {
          '@id': `${canonicalUrl.value}#breadcrumb`,
        },
        ...(imageUrls[0]
          ? {
              primaryImageOfPage: {
                '@type': 'ImageObject',
                url: imageUrls[0],
              },
            }
          : {}),
      },
      {
        '@type': 'Article',
        '@id': articleId,
        url: canonicalUrl.value,
        headline: projectHeading.value,
        description: seoDescription.value,
        articleSection: page.value.sector,
        keywords: keywords,
        author: {
          '@id': organizationId,
        },
        publisher: {
          '@id': organizationId,
        },
        ...(page.value.publishedAt ? { datePublished: page.value.publishedAt } : {}),
        ...(page.value.updatedAt ? { dateModified: page.value.updatedAt } : {}),
        ...(imageUrls.length ? { image: imageUrls } : {}),
        ...(page.value.location
          ? {
              contentLocation: {
                '@type': 'Place',
                name: page.value.location,
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: location.city,
                  addressRegion: location.stateCode,
                  addressCountry: 'US',
                },
              },
            }
          : {}),
        about: {
          '@type': 'Thing',
          name: page.value.projectType || page.value.sector,
        },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl.value}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Projects',
            item: 'https://envision-cs.com/projects',
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: page.value.sector,
            item: toAbsoluteProjectUrl(`/projects/${sectorSlug.value}`),
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: page.value.title,
            item: canonicalUrl.value,
          },
        ],
      },
    ],
  };
});

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: canonicalUrl.value,
    },
  ],
  script: projectSchema.value
    ? [
        {
          key: 'schema-org-project',
          type: 'application/ld+json',
          innerHTML: JSON.stringify(projectSchema.value).replace(/</g, '\\u003c'),
        },
      ]
    : [],
}));

const { data } = await useAsyncData<Project[]>(
  'projects-page-data',
  async () => {
    try {
      return await $fetch<Project[]>('/api/projects');
    } catch (err) {
      console.error('Strapi error:', err);
      return [];
    }
  },
  { default: () => [] },
);

const relatedProjects = computed(() => {
  const current = projectData.value;
  if (!current) return [];

  const currentSectorSlug = getPrimaryProjectSector(current)?.slug || sectorSlug.value;
  if (!currentSectorSlug) return [];

  return (data.value ?? [])
    .filter((p) => p.slug !== current.slug && projectBelongsToSector(p, currentSectorSlug))
    .flatMap((p) => {
      const image = p.mainImage?.url;
      const primarySector = getPrimaryProjectSector(p);

      if (!image || !primarySector || !p.slug) {
        return [];
      }

      return [
        {
          id: p.id,
          image,
          title: p.title,
          to: `/projects/${primarySector.slug}/${p.slug}`,
          location: p.location,
          completed: p.completed ? formatMonthYear(p.completed) : undefined,
          sector: formatProjectSectorLabel(p),
        },
      ];
    })
    .slice(0, 3);
});

const relatedProjectsTitle = computed(
  () => `Related Commercial Projects in ${page.value?.sector || 'This Sector'}`,
);
</script>

<template>
  <div>
    <banner-b :image="page?.main_image">
      <!-- {{ page?.title }} -->
    </banner-b>
    <section-e
      v-if="page"
      bgcolor="dark"
      no-padding
      class="dark grid grid-cols-1 min-[800px]:grid-cols-2"
    >
      <template #header>
        <section class="project-intro" aria-labelledby="project-title">
          <p v-if="page.sector" class="project-intro__eyebrow">
            {{ page.sector }}
          </p>
          <app-typography
            id="project-title"
            tag="h1"
            variant="heading-lg"
            class="project-intro__title"
          >
            {{ projectHeading }}
          </app-typography>

          <app-typography tag="h2" variant="heading-sm" class="u-visually-hidden">
            Project Overview &amp; Commercial Scope
          </app-typography>

          <dl v-if="stats.length" class="project-intro__stats" aria-label="Project details">
            <div
              v-for="item in stats"
              v-show="item.label"
              :key="item.id"
              class="project-intro__stat"
            >
              <dt>{{ item.description }}</dt>
              <dd>{{ item.label }}</dd>
            </div>
          </dl>

          <div v-if="ast?.body" class="project-intro__body">
            <MDCRenderer :body="ast.body" :data="ast.data" />
          </div>

          <div
            v-if="page?.beck"
            class="project-intro__partner"
            role="img"
            aria-label="Beck affiliated project"
          >
            <Icon name="logos:belogo" size="60" aria-hidden="true" />
          </div>
        </section>
      </template>
      <template #body>
        <ul class="gallery">
          <li v-for="(image, index) in page.gallery" :key="image.url">
            <MButton
              type="button"
              class="gallery-trigger"
              :aria-label="`Open image ${index + 1} of ${page.gallery.length} in the ${page.title} gallery`"
              @click="openLightbox(index)"
            >
              <NuxtImg
                provider="imagekit"
                :src="image.url"
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
            change images. Pinch, double-tap, scroll, or press plus and minus to zoom. Press Escape
            to close the viewer.
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
                        :alt="image.altText"
                        :data-recommended-filename="image.recommendedFilename"
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
          <MButton
            ref="closeButtonRef"
            type="button"
            class="close-btn"
            :aria-label="`Close ${page.title} image viewer`"
            icon-only
            @click="closeImageDialog"
          >
            <template #icon>
              <UIcon name="i-lucide-x" class="close-btn__icon w-6 h-6" />
            </template>
          </MButton>
          <MButton
            v-if="page.gallery.length > 1"
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
            v-if="page.gallery.length > 1"
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
    </section-e>
    <div v-else>Oh no! Page not found.</div>
    <section
      v-if="
        page &&
        (page.challenge ||
          page.strategy ||
          page.preconstructionApproach ||
          page.tradeCollaboration ||
          page.outcome)
      "
      class="project-narrative dark"
      aria-label="Project execution details"
    >
      <div v-if="page.challenge" class="project-narrative__section">
        <app-typography tag="h2" variant="heading-md">
          The Challenge: Preconstruction &amp; Scheduling Hurdles
        </app-typography>
        <app-typography tag="p" variant="text-md">{{ page.challenge }}</app-typography>
      </div>

      <div
        v-if="page.strategy || page.preconstructionApproach || page.tradeCollaboration"
        class="project-narrative__section"
      >
        <app-typography tag="h2" variant="heading-md">
          The Strategy: How Envision Executed the
          {{ page.deliveryMethod || 'Project Plan' }}
        </app-typography>
        <app-typography v-if="page.strategy" tag="p" variant="text-md">
          {{ page.strategy }}
        </app-typography>

        <div v-if="page.preconstructionApproach" class="project-narrative__subsection">
          <app-typography tag="h3" variant="heading-sm">
            Enhanced Preconstruction &amp; Cost Estimating
          </app-typography>
          <app-typography tag="p" variant="text-md">
            {{ page.preconstructionApproach }}
          </app-typography>
        </div>

        <div v-if="page.tradeCollaboration" class="project-narrative__subsection">
          <app-typography tag="h3" variant="heading-sm">
            Specialty Project Management &amp; Trade Collaboration
          </app-typography>
          <app-typography tag="p" variant="text-md">
            {{ page.tradeCollaboration }}
          </app-typography>
        </div>
      </div>

      <div v-if="page.outcome" class="project-narrative__section">
        <app-typography tag="h2" variant="heading-md">
          The Outcome: Delivering a Premier
          {{ page.facilityType || page.projectType || page.sector }} Facility
        </app-typography>
        <app-typography tag="p" variant="text-md">{{ page.outcome }}</app-typography>
      </div>
    </section>
    <section-e
      v-if="page && relatedProjects.length"
      no-padding
      bgcolor="dark"
      class="related-projects dark"
    >
      <template #header>
        <section-header-a :eyebrow="page.sector" :title="relatedProjectsTitle" />
      </template>
      <template #body>
        <div class="projects">
          <div class="projects-grid">
            <project-card
              v-for="project in relatedProjects"
              :key="project.id"
              :image="project.image"
              :alt="project.title"
              :aria-label="project.title"
              :to="project.to"
              aspect-ratio="3/4"
              image-densities="x1 x2"
              :outlined="false"
              :title="project.title"
              :location="project.location"
              :completed="project.completed"
              :sector="project.sector"
            />
          </div>
        </div>
      </template>
    </section-e>
  </div>
</template>

<style scoped>
.project-intro {
  --project-intro-rule: color-mix(in oklab, var(--section-color) 18%, transparent);
  --project-intro-muted: color-mix(in oklab, var(--section-color) 68%, transparent);

  display: grid;
  gap: calc(var(--spacing) * 6);
  align-content: start;
  max-width: 44rem;
  min-height: 100%;
  margin: calc(var(--spacing) * 2);
  padding-block: calc(var(--spacing) * 4);
  padding-inline-start: calc(var(--spacing) * 5);
}

.project-intro__eyebrow {
  width: fit-content;
  margin: 0;
  padding-block-end: calc(var(--spacing) * 2);
  color: var(--accent-color);
  font-size: var(--font-size-text-t4);
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
}

.project-intro__title {
  max-inline-size: 25ch;
  color: var(--section-color);
}

.project-intro__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(8.5rem, 1fr));
  gap: 1px;
  margin: 0;
  border-block: 1px solid var(--project-intro-rule);
  background: var(--project-intro-rule);
}

.project-intro__stat {
  min-width: 0;
  padding-block: calc(var(--spacing) * 4);
  padding-inline: calc(var(--spacing) * 4);
  background: var(--section-bg);
}

.project-intro__stat dt {
  margin-block-end: calc(var(--spacing) * 1.5);
  color: var(--project-intro-muted);
  font-size: var(--font-size-text-t4);
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
}

.project-intro__stat dd {
  margin: 0;
  color: var(--section-color);
  font-size: var(--font-size-text-t2);
  font-weight: 700;
  line-height: 1.05;
  overflow-wrap: anywhere;
}

.project-intro__body {
  max-width: 66ch;
  color: var(--project-intro-muted);
}

.project-intro__body :deep(p) {
  margin: 0;
  font-size: var(--font-size-text-t3);
  line-height: 1.55;
}

.project-intro__body :deep(p + p) {
  margin-block-start: calc(var(--spacing) * 4);
}

.project-intro__partner {
  width: fit-content;
  padding-block-start: calc(var(--spacing) * 4);
  border-block-start: 1px solid var(--project-intro-rule);
  color: var(--section-color);
}

@media (max-width: 649px) {
  .project-intro {
    margin: 0;
    padding-inline-start: calc(var(--spacing) * 4);
  }

  .project-intro__title {
    max-inline-size: 100%;
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

.project-narrative {
  display: grid;
  gap: calc(var(--spacing) * 14);
  padding: calc(var(--spacing) * 12) max(calc(var(--spacing) * 6), 6vw);
  color: var(--color-white);
  background: var(--color-envision-gray-900);
}

.project-narrative__section {
  display: grid;
  gap: calc(var(--spacing) * 5);
  width: min(100%, 68rem);
  margin-inline: auto;
  padding-block-start: calc(var(--spacing) * 8);
  border-block-start: 1px solid color-mix(in oklab, currentcolor 18%, transparent);
}

.project-narrative__subsection {
  display: grid;
  gap: calc(var(--spacing) * 3);
  max-width: 52rem;
  margin-block-start: calc(var(--spacing) * 4);
}

.related-projects {
  border-top: 1px solid color-mix(in oklab, white 12%, transparent);
}

.related-projects :deep(.reveal-card__content) {
  color: white;
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
