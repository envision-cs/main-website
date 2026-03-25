<script setup lang="ts">
import type { Project } from "~~/shared/types/content-types";

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
  "hero-featured-projects-carousel",
  async () => {
    try {
      return await $fetch<Project[]>("/api/projects");
    } catch (error) {
      console.error("Failed to fetch hero featured projects:", error);
      return [];
    }
  },
  {
    default: () => [],
  },
);

const slides = computed<FeaturedProjectSlide[]>(() => {
  return [...(projects.value ?? [])]
    .filter((project) => project.slug && project.sector?.slug && project.mainImage?.url)
    .sort((left, right) => {
      const rightTime = right.completed ? new Date(right.completed).getTime() : 0;
      const leftTime = left.completed ? new Date(left.completed).getTime() : 0;

      return rightTime - leftTime;
    })
    .slice(0, 5)
    .map((project) => ({
      id: project.id,
      title: project.title,
      href: `/projects/${project.sector.slug}/${project.slug}`,
      image: project.mainImage.url,
      sector: project.sector.name,
      completedLabel: project.completed ? formatMonthYear(project.completed) : "Current project",
      linkLabel: `Read more about ${project.title}`,
    }));
});

const carouselRef = useTemplateRef<HTMLElement | null>("carouselRef");

const activeIndex = ref(0);
const isUserPaused = ref(false);
const isInteractionPaused = ref(false);
const prefersReducedMotion = ref(false);

const tick = ref(0);
const progressTransition = ref(true);

const slideCount = computed(() => slides.value.length);
const activeSlide = computed(() => slides.value[activeIndex.value] ?? null);

const liveRegionMode = computed(() =>
  isUserPaused.value || prefersReducedMotion.value ? "polite" : "off",
);

const formattedIndex = computed(() => String(activeIndex.value + 1).padStart(2, "0"));
const formattedCount = computed(() => String(slideCount.value).padStart(2, "0"));
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
  motionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  updateReducedMotionPreference();

  motionMediaQuery.addEventListener("change", updateReducedMotionPreference);
  document.addEventListener("visibilitychange", onDocumentVisibilityChange);

  startAutoplayInterval();
});

onUnmounted(() => {
  stopAutoplayInterval();
  motionMediaQuery?.removeEventListener("change", updateReducedMotionPreference);
  document.removeEventListener("visibilitychange", onDocumentVisibilityChange);
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
        <p id="featured-projects-title" class="featured-projects__eyebrow">Featured Projects</p>

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
}

.featured-projects__shell {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: stretch;
}

.featured-projects__surface {
  position: relative;
  background: rgb(255 255 255 / 0.98);
  color: var(--color-envision-gray-700);
  min-height: 100%;
  box-shadow: 0 18px 40px rgb(7 15 24 / 18%);
  padding: calc(var(--spacing)) calc(var(--spacing) * 2);
}

.featured-projects__eyebrow {
  margin: 0;
  margin-bottom: calc(var(--spacing));
  color: var(--color-envision-gray-500);
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
  text-decoration: none;
  overflow: hidden;
}

.featured-projects__media {
  position: relative;
  display: block;
  overflow: hidden;
  width: calc(var(--spacing) * 30);
  aspect-ratio: 1/1;
  border-bottom: 1px solid rgb(24 54 87 / 0.12);
}

.featured-projects__media::after {
  content: "";
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgb(6 15 26 / 0.08) 0%, rgb(6 15 26 / 0.26) 100%),
    linear-gradient(135deg, rgb(18 76 149 / 0.12) 0%, rgb(28 127 72 / 0.1) 100%);
}

.featured-projects__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.14) contrast(1.02);
}

.featured-projects__content {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);
}

.featured-projects__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  color: var(--color-envision-gray-500);
  font-size: 0.76rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  line-height: 1.2;
  text-transform: uppercase;
}

.featured-projects__title {
  margin: 0;
  color: #0b1521;
  line-height: 1.05;
  text-wrap: balance;
}

.featured-projects__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--color-envision-gray-700);
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
}

.featured-projects__count {
  margin: 0;
  color: var(--color-envision-gray-400);
  font-size: 0.82rem;
  font-variant-numeric: tabular-nums;
}

.featured-projects__controls {
  display: flex;
  flex-direction: column;
}

.featured-projects__control {
  width: 3.35rem;
  min-height: 3.35rem;
  border: 1px solid rgb(255 255 255 / 0.3);
  border-left: 0;
  background: rgb(255 255 255 / 0.94);
  color: #0b1521;
  cursor: pointer;
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
  background: rgb(15 32 52 / 0.16);
  overflow: hidden;
}

.featured-projects__progress-bar {
  /* Always full width — scaleX drives the visual fill from the left */
  width: 100%;
  height: 100%;
  background: var(--color-envision-green-400);
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
    border-right: 1px solid rgb(24 54 87 / 0.12);
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

@media (prefers-reduced-motion: reduce) {
  .featured-projects__cta-icon,
  .featured-projects__control {
    transition: none;
  }
}
</style>
