<script setup lang="ts">
import type { Project } from '~~/shared/types/content-types';

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
    } catch (error) {
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
          sector: formatProjectSectorLabel(project) || primarySector.name,
          completedLabel: project.completed
            ? formatMonthYear(project.completed)
            : 'Current project',
          linkLabel: `Read more about ${project.title}`,
        },
      ];
    })
    .slice(0, 5);
});

const carouselRef = useTemplateRef<HTMLElement | null>('carouselRef');

const activeIndex = ref(0);
const isUserPaused = ref(false);
const isInteractionPaused = ref(false);
const prefersReducedMotion = ref(false);

const tick = ref(0);
const progressTransition = ref(true);

const slideCount = computed(() => slides.value.length);
const activeSlide = computed(() => slides.value[activeIndex.value] ?? null);

const liveRegionMode = computed(() =>
  isUserPaused.value || prefersReducedMotion.value ? 'polite' : 'off',
);

const formattedIndex = computed(() => String(activeIndex.value + 1).padStart(2, '0'));
const formattedCount = computed(() => String(slideCount.value).padStart(2, '0'));
const canAutoplay = computed(() => {
  return (
    slideCount.value > 1 &&
    !isUserPaused.value &&
    !isInteractionPaused.value &&
    !prefersReducedMotion.value
  );
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
  if (!slideCount.value) return;
  resetTick();
  activeIndex.value = (index + slideCount.value) % slideCount.value;
}

function showNextProject() {
  setActiveIndex(activeIndex.value + 1);
}

function showPreviousProject() {
  setActiveIndex(activeIndex.value - 1);
}

function pauseAutoplay() {
  isUserPaused.value = true;
}

function resumeAutoplay() {
  if (prefersReducedMotion.value) return;
  isUserPaused.value = false;
}

function toggleAutoplay() {
  if (isUserPaused.value) {
    resumeAutoplay();
    return;
  }
  pauseAutoplay();
}

function stopAutoplayInterval() {
  if (!intervalId) return;
  resetTick();
  window.clearInterval(intervalId);
  intervalId = null;
}

function startAutoplayInterval() {
  if (!import.meta.client || !canAutoplay.value) return;

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
    aria-labelledby="featured-projects-title"
    aria-roledescription="carousel"
    @mouseenter="onPointerEnter"
    @mouseleave="onPointerLeave"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
  >
    <div class="featured-projects__shell">
      <div class="featured-projects__surface" :aria-live="liveRegionMode">
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
                sizes="sm:320px md:400px lg:480px"
                format="avif,webp"
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
                Read more
                <UIcon name="i-lucide-arrow-right" class="featured-projects__cta-icon" />
              </span>
            </span>
          </NuxtLink>
        </article>

        <div class="featured-projects__footer">
          <div class="featured-projects__progress">
            <div
              class="featured-projects__progress-bar"
              :style="{
                transform: `scaleX(${timerScale})`,
                transition: progressTransition ? 'transform 1s linear' : 'none',
              }"
            />
          </div>
        </div>
      </div>

      <div class="featured-projects__controls">
        <button
          type="button"
          class="featured-projects__control featured-projects__control--toggle"
          :aria-label="
            isUserPaused ? 'Resume featured project rotation' : 'Pause featured project rotation'
          "
          :disabled="prefersReducedMotion"
          @click="toggleAutoplay"
        >
          <UIcon
            :name="isUserPaused || prefersReducedMotion ? 'i-lucide-play' : 'i-lucide-pause'"
            class="featured-projects__control-icon"
          />
        </button>

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
  </section>
</template>

<style scoped>
.featured-projects {
  width: 100%;
  align-self: end;
  margin-left: 0;
  color: #fff;
  display: none;
  place-self: end;

  @media (min-width: 600px) {
    display: block;
    max-width: 50ch;
    margin-left: auto;
  }
}

.featured-projects__shell {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: stretch;
}

.featured-projects__surface {
  position: relative;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  color: var(--color-envision-gray-100);
  min-height: 100%;
  box-shadow: 0 18px 40px rgb(7 15 24 / 18%);
}

.featured-projects__eyebrow {
  margin: 0;
  margin-bottom: calc(var(--spacing) * 2);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.featured-projects__card {
  display: grid;
  grid-template-columns: auto 1fr;
  min-height: 100%;
  gap: calc(var(--spacing) * 3);
  color: inherit;
  margin-bottom: calc(var(--spacing) * 2);
  text-decoration: none;
  overflow: hidden;
}

.featured-projects__media {
  position: relative;
  display: block;
  overflow: hidden;
  width: calc(var(--spacing) * 30);
  aspect-ratio: 1/1;
  border-right: 1px solid rgb(255 255 255 / 0.25);
}

.featured-projects__media::after {
  content: '';
  position: absolute;
  inset: 0;
}

.featured-projects__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-projects__content {
  display: flex;
  flex-direction: column;
  margin-top: calc(var(--spacing));
  gap: calc(var(--spacing) * 2);
}

.featured-projects__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1.2;
  text-transform: uppercase;
}

.featured-projects__title {
  margin: 0;
  line-height: 1.05;
  font-size: 1.25rem !important;
  text-wrap: balance;
}

.featured-projects__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 1rem;
  line-height: 1;
}

.featured-projects__cta-icon {
  width: 1rem;
  height: 1rem;
}

.featured-projects__footer {
  display: flex;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background-color: rgba(255, 255, 255, 0.2);
}

.featured-projects__count {
  margin: 0;
  font-size: 0.82rem;
  font-variant-numeric: tabular-nums;
}

.featured-projects__controls {
  display: grid;
  flex-direction: column;
}

.featured-projects__control {
  width: 3.35rem;
  border: 1px solid rgb(255 255 255 / 0.3);
  border-left: 0;
  background: rgb(255 255 255 / 0.94);
  color: #0b1521;
  cursor: pointer;
  display: grid;
  place-content: center;
  transition:
    background-color 180ms ease,
    color 180ms ease;
}

.featured-projects__control + .featured-projects__control {
  border-top: 0;
}

.featured-projects__control-icon {
  width: 1rem;
  height: 1rem;
}

.featured-projects__progress {
  position: relative;
  width: 100%;
  height: calc(var(--spacing) * 2);
  background: rgb(15 32 52 / 0.08);
  overflow: hidden;
}

.featured-projects__progress-bar {
  /* Always full width — scaleX drives the visual fill from the left */
  width: 100%;
  height: 100%;
  background: var(--color-envision-blue-500);
  transform: scaleX(0);
  transform-origin: left center;
  /* transition is controlled inline via :style to allow instant resets */
}

.featured-projects__card:hover .featured-projects__cta-icon,
.featured-projects__card:focus-visible .featured-projects__cta-icon {
  transform: translateX(0.18rem);
}

.featured-projects__card:focus-visible,
.featured-projects__control:focus-visible {
  outline: 3px solid var(--color-envision-blue-500);
  outline-offset: 3px;
}

.featured-projects__control:hover:not(:disabled) {
  background: color-mix(in srgb, var(--color-envision-blue-500) 18%, white);
}

.featured-projects__control:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

@media (min-width: 740px) {
  .featured-projects__media {
    border-bottom: 0;
  }
}

@media (max-width: 739px) {
  .featured-projects__shell {
    grid-template-columns: minmax(0, 1fr);
  }

  .featured-projects__controls {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .featured-projects__control {
    width: 100%;
    border-left: 1px solid rgb(255 255 255 / 0.3);
    border-top: 0;
  }

  .featured-projects__control + .featured-projects__control {
    border-left: 0;
  }
}

/* Compact hero case-study card */
.featured-projects {
  display: block;
  margin-left: 0;
  color: var(--color-envision-gray-900);
}

.featured-projects__shell {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
}

.featured-projects__surface {
  min-height: 0;
  overflow: hidden;
  border: 1px solid color-mix(in oklch, var(--color-white) 9%, transparent);
  border-radius: 16px;
  background: color-mix(in oklch, var(--color-envision-gray-900) 50%, transparent);
  box-shadow: 0 22px 55px rgb(0 0 0 / 18%);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.featured-projects__card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 5.25rem;
  align-items: stretch;
  gap: calc(var(--spacing) * 3);
  min-height: 6.6rem;
  margin: 0;
  padding: calc(var(--spacing) * 2);
}

.featured-projects__media {
  grid-column: 2;
  grid-row: 1;
  align-self: stretch;
  width: 5.25rem;
  aspect-ratio: 1;
  border: 0;
  border-radius: 10px;
}

.featured-projects__content {
  grid-column: 1;
  grid-row: 1;
  justify-content: center;
  min-width: 0;
  margin: 0;
  padding: calc(var(--spacing) * 2) 0 calc(var(--spacing) * 2) calc(var(--spacing) * 2);
  gap: calc(var(--spacing) * 1.5);
}

.featured-projects__meta {
  gap: calc(var(--spacing) * 1.5);
  color: color-mix(in oklch, var(--color-white) 78%, transparent);
  font-size: 0.72rem;
  line-height: 1.1;
  letter-spacing: 0.08em;
}

.featured-projects__meta::before {
  content: '';
  width: 0.45rem;
  height: 0.45rem;
  margin-top: 0.12rem;
  background: var(--color-white);
}

.featured-projects__title {
  display: -webkit-box;
  overflow: hidden;
  font-size: 0.96rem !important;
  font-weight: 700;
  line-height: 1.12;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
}

.featured-projects__cta {
  display: none;
}

.featured-projects__footer {
  height: 2px;
  background: color-mix(in oklch, var(--color-white) 12%, transparent);
}

.featured-projects__progress {
  height: 2px;
}

.featured-projects__progress-bar {
  background: var(--color-envision-green-500);
}

.featured-projects__controls {
  position: absolute;
  right: calc(5.25rem + var(--spacing) * 5);
  bottom: calc(var(--spacing) * 2);
  z-index: 2;
  display: flex;
  opacity: 0;
  pointer-events: none;
  transition: opacity 160ms ease;
}

.featured-projects__shell:hover .featured-projects__controls,
.featured-projects__shell:focus-within .featured-projects__controls {
  opacity: 1;
  pointer-events: auto;
}

.featured-projects__control {
  width: 1.9rem;
  height: 1.9rem;
  border: 1px solid color-mix(in oklch, var(--color-white) 12%, transparent);
  border-left: 0;
  border-radius: 0;
  background: color-mix(in oklch, var(--color-envision-gray-900) 88%, transparent);
  color: var(--color-white);
}

.featured-projects__control:first-child {
  border-left: 1px solid color-mix(in oklch, var(--color-white) 12%, transparent);
  border-radius: 8px 0 0 8px;
}

.featured-projects__control:last-child {
  border-radius: 0 8px 8px 0;
}

.featured-projects__control + .featured-projects__control {
  border-top: 1px solid color-mix(in oklch, var(--color-white) 12%, transparent);
}

.featured-projects__control-icon {
  width: 0.82rem;
  height: 0.82rem;
}

.featured-projects__control:hover:not(:disabled) {
  background: color-mix(in oklch, var(--color-white) 12%, var(--color-envision-gray-900));
}

@media (min-width: 740px) {
}

@media (prefers-reduced-motion: reduce) {
  .featured-projects__cta-icon,
  .featured-projects__control {
    transition: none;
  }
}
</style>
