<script setup lang="ts">import type { Project } from '~~/shared/types/content-types';

const AUTOSCROLL_INTERVAL_MS = 8000;

interface FeaturedProjectSlide {
  id: number;
  title: string;
  href: string;
  image: string;
  sector: string;
  completedLabel: string;
  linkLabel: string;
}

const { formatMonthYear } = useFormatDate();

const { data: projects } = await useAsyncData<Project[]>(
  'hero-featured-projects-carousel',
  async () => {
    try {
      return await $fetch<Project[]>('/api/projects');
    }
    catch (error) {
      console.error('Failed to fetch hero featured projects:', error);
      return [];
    }
  },
  {
    default: () => [],
  },
);

const slides = computed<FeaturedProjectSlide[]>(() => {
  return [...(projects.value ?? [])]
    .sort((left, right) => {
      const rightTime = right.completed ? new Date(right.completed).getTime() : 0;
      const leftTime = left.completed ? new Date(left.completed).getTime() : 0;

      return rightTime - leftTime;
    })
    .flatMap((project) => {
      const primarySector = getPrimaryProjectSector(project);
      const image = project.mainImage?.url;

      if (!project.slug || !primarySector || !image) {
        return [];
      }

      return [
        {
          id: project.id,
          title: project.title,
          href: `/projects/${primarySector.slug}/${project.slug}`,
          image,
          sector: primarySector.name,
          completedLabel: project.completed
            ? formatMonthYear(project.completed)
            : 'Current project',
          linkLabel: `View ${project.title}`,
        },
      ];
    })
    .slice(0, 5);
});

const carouselRef = useTemplateRef<HTMLElement | null>('carouselRef');

const activeIndex = ref(0);
const isInteractionPaused = ref(false);
const prefersReducedMotion = ref(false);

const tick = ref(0);
const progressTransition = ref(true);

const slideCount = computed(() => slides.value.length);
const activeSlide = computed(() => slides.value[activeIndex.value] ?? null);

const liveRegionMode = computed(() =>
  isInteractionPaused.value || prefersReducedMotion.value ? 'polite' : 'off',
);

const formattedIndex = computed(() => String(activeIndex.value + 1).padStart(2, '0'));
const formattedCount = computed(() => String(slideCount.value).padStart(2, '0'));
const canAutoplay = computed(() => {
  return slideCount.value > 1 && !isInteractionPaused.value && !prefersReducedMotion.value;
});

// Normalized 0 → 1 value used for scaleX
const timerScale = computed(() => {
  return tick.value / (AUTOSCROLL_INTERVAL_MS / 1000);
});

let intervalId: ReturnType<typeof window.setInterval> | null = null;
let motionMediaQuery: MediaQueryList | null = null;

function resetTick() {
  progressTransition.value = false;
  tick.value = 0;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      progressTransition.value = true;
    });
  });
}
function setActiveIndex(index: number) {
  if (!slideCount.value)
    return;
  resetTick();
  activeIndex.value = (index + slideCount.value) % slideCount.value;
}

function showNextProject() {
  setActiveIndex(activeIndex.value + 1);
}

function showPreviousProject() {
  setActiveIndex(activeIndex.value - 1);
}

function stopAutoplayInterval() {
  if (!intervalId)
    return;
  resetTick();
  window.clearInterval(intervalId);
  intervalId = null;
}

function startAutoplayInterval() {
  if (!import.meta.client || !canAutoplay.value)
    return;

  stopAutoplayInterval();
  resetTick();

  intervalId = window.setInterval(() => {
    tick.value++;

    if (tick.value > AUTOSCROLL_INTERVAL_MS / 1000) {
      showNextProject();
    }
  }, 1000);
}

function onPointerEnter() {
  isInteractionPaused.value = true;
}

function onPointerLeave() {
  isInteractionPaused.value = false;
}

function onFocusIn() {
  isInteractionPaused.value = true;
}

function onFocusOut(event: FocusEvent) {
  const nextTarget = event.relatedTarget;

  if (!nextTarget || !carouselRef.value?.contains(nextTarget as Node)) {
    isInteractionPaused.value = false;
  }
}

function updateReducedMotionPreference(event?: MediaQueryListEvent) {
  prefersReducedMotion.value = event?.matches ?? motionMediaQuery?.matches ?? false;

  if (prefersReducedMotion.value) {
    stopAutoplayInterval();
  }
}

function onDocumentVisibilityChange() {
  isInteractionPaused.value = document.hidden;
}

watch(canAutoplay, (enabled) => {
  if (enabled) {
    startAutoplayInterval();
    return;
  }
  stopAutoplayInterval();
});

watch(slideCount, (count) => {
  if (!count) {
    activeIndex.value = 0;
    stopAutoplayInterval();
    return;
  }

  if (activeIndex.value >= count) {
    activeIndex.value = 0;
  }
});

onMounted(() => {
  motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  updateReducedMotionPreference();

  motionMediaQuery.addEventListener('change', updateReducedMotionPreference);
  document.addEventListener('visibilitychange', onDocumentVisibilityChange);

  startAutoplayInterval();
});

onUnmounted(() => {
  stopAutoplayInterval();
  motionMediaQuery?.removeEventListener('change', updateReducedMotionPreference);
  document.removeEventListener('visibilitychange', onDocumentVisibilityChange);
});
</script>

<template>
  <section
    v-if="slideCount"
    ref="carouselRef"
    class="featured-projects"
    aria-label="Featured projects"
    aria-roledescription="carousel"
    @mouseenter="onPointerEnter"
    @mouseleave="onPointerLeave"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
  >
    <div class="featured-projects__surface" :aria-live="liveRegionMode">
      <Transition name="featured-fade" mode="out-in">
        <article
          v-if="activeSlide"
          :key="activeSlide.id"
          class="featured-projects__slide"
          role="group"
          aria-roledescription="slide"
          :aria-label="`${formattedIndex} of ${formattedCount}`"
        >
          <NuxtLink
            class="featured-projects__card"
            :to="activeSlide.href"
            :aria-label="activeSlide.linkLabel"
            prefetch-on="interaction"
          >
            <span class="featured-projects__media" aria-hidden="true">
              <NuxtImg
                provider="imagekit"
                :src="activeSlide.image"
                alt=""
                width="640"
                height="320"
                format="avif,webp"
                sizes="100vw md:320px"
                class="featured-projects__image"
              />
            </span>

            <span class="featured-projects__content">
              <span class="featured-projects__meta">
                <span>{{ activeSlide.sector }}</span>
                <span aria-hidden="true">/</span>
                <span>{{ activeSlide.completedLabel }}</span>
              </span>

              <app-typography tag="h3" variant="heading-sm" class="featured-projects__title">
                {{ activeSlide.title }}
              </app-typography>

              <span class="featured-projects__cta">
                View project
                <UIcon name="i-lucide-arrow-right" class="featured-projects__cta-icon" />
              </span>
            </span>
          </NuxtLink>
        </article>
      </Transition>

      <div v-if="slideCount > 1" class="featured-projects__footer">
        <p class="featured-projects__count" aria-hidden="true">
          {{ formattedIndex }} / {{ formattedCount }}
        </p>

        <div class="featured-projects__progress">
          <div
            class="featured-projects__progress-bar"
            :style="{
              transform: `scaleX(${timerScale})`,
              transition: progressTransition ? 'transform 1s linear' : 'none',
            }"
          />
        </div>

        <div class="featured-projects__controls">
          <button
            type="button"
            class="featured-projects__control"
            aria-label="Show previous featured project"
            @click="showPreviousProject"
          >
            <UIcon name="i-lucide-arrow-left" class="featured-projects__control-icon" />
          </button>

          <button
            type="button"
            class="featured-projects__control"
            aria-label="Show next featured project"
            @click="showNextProject"
          >
            <UIcon name="i-lucide-arrow-right" class="featured-projects__control-icon" />
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.featured-projects {
  width: 100%;
  color: var(--color-white);

  @media (min-width: 1100px) {
    width: clamp(16rem, 22vw, 19rem);
    margin-left: auto;
  }
}

.featured-projects__surface {
  position: relative;
  overflow: hidden;
  border: 1px solid color-mix(in oklch, var(--color-white) 12%, transparent);
  background: color-mix(in oklch, var(--color-envision-gray-900) 62%, transparent);
  box-shadow: 0 18px 40px rgb(0 0 0 / 16%);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.featured-projects__card {
  display: flex;
  color: inherit;
  text-decoration: none;

  @media(min-width: 1100px){
      display: block;
  }
}

.featured-projects__media {
  position: relative;
  display: block;
  overflow: hidden;
  aspect-ratio: 21 / 9;

  @media (min-width: 700px) {
    aspect-ratio: 8/ 3;
  }

  @media (min-width: 1100px) {
    aspect-ratio: 2 / 1;
  }
}

.featured-projects__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  transition: transform 0.5s var(--ease-base);
}

.featured-projects__card:hover .featured-projects__image,
.featured-projects__card:focus-visible .featured-projects__image {
  transform: scale(1.03);
}

.featured-projects__content {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 1);
  padding: calc(var(--spacing) * 2.5);
  border-top: 1px solid color-mix(in oklch, var(--color-white) 12%, transparent);
}

.featured-projects__meta {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--spacing) * 1.5);
  color: color-mix(in oklch, var(--color-white) 72%, transparent);
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1.2;
  text-transform: uppercase;
}

.featured-projects__title {
  display: -webkit-box;
  overflow: hidden;
  margin: 0;
  font-size: 0.98rem !important;
  font-weight: 700;
  line-height: 1.15;
  text-wrap: pretty;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.featured-projects__cta {
  display: inline-flex;
  align-items: center;
  gap: calc(var(--spacing) * 1.5);
  margin-top: calc(var(--spacing) * 0.5);
  color: color-mix(in oklch, var(--color-white) 90%, transparent);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1;
}

.featured-projects__cta-icon {
  width: 1rem;
  height: 1rem;
  transition: transform 0.3s var(--ease-base);
}

.featured-projects__card:hover .featured-projects__cta-icon,
.featured-projects__card:focus-visible .featured-projects__cta-icon {
  transform: translateX(0.18rem);
}

.featured-projects__footer {
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 2.5);
  border-top: 1px solid color-mix(in oklch, var(--color-white) 12%, transparent);
  padding-left: calc(var(--spacing) * 2.5);
}

.featured-projects__count {
  margin: 0;
  color: color-mix(in oklch, var(--color-white) 80%, transparent);
  font-size: 0.72rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.featured-projects__progress {
  position: relative;
  flex: 1;
  height: 2px;
  overflow: hidden;
  background: color-mix(in oklch, var(--color-white) 14%, transparent);
}

.featured-projects__progress-bar {
  /* Always full width — scaleX drives the visual fill from the left */
  width: 100%;
  height: 100%;
  background: var(--color-envision-green-500);
  transform: scaleX(0);
  transform-origin: left center;
  /* transition is controlled inline via :style to allow instant resets */
}

.featured-projects__controls {
  display: flex;
  flex: none;
}

.featured-projects__control {
  display: grid;
  place-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 0;
  border-left: 1px solid color-mix(in oklch, var(--color-white) 12%, transparent);
  background: transparent;
  color: var(--color-white);
  cursor: pointer;
  transition: background-color 180ms ease;
}

.featured-projects__control:hover {
  background: color-mix(in oklch, var(--color-white) 12%, transparent);
}

.featured-projects__control-icon {
  width: 1rem;
  height: 1rem;
}

.featured-projects__card:focus-visible,
.featured-projects__control:focus-visible {
  outline: 3px solid var(--color-envision-blue-500);
  outline-offset: -3px;
}

.featured-fade-enter-active,
.featured-fade-leave-active {
  transition: opacity 240ms var(--ease-base);
}

.featured-fade-enter-from,
.featured-fade-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .featured-projects__image,
  .featured-projects__cta-icon,
  .featured-projects__control,
  .featured-fade-enter-active,
  .featured-fade-leave-active {
    transition: none;
  }
}
</style>
