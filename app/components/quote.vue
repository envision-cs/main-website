<script setup lang="ts">
import useEmblaCarousel from "embla-carousel-vue";
interface TestimonialItem {
  quote: string;
  name: string;
  title: string;
  detail?: string;
}

const AUTOSCROLL_INTERVAL_MS = 6500;

const props = withDefaults(
  defineProps<{
    quote?: string;
    name?: string;
    title?: string;
    testimonials?: TestimonialItem[];
    eyebrow?: string;
    sectionTitle?: string;
    sectionBody?: string;
    bgcolor?: "light" | "dark" | "blue";
  }>(),
  {
    eyebrow: "Client Testimonials",
    sectionTitle: "Our clients who expect discipline, communication, and follow-through.",
    bgcolor: "dark",
  },
);

const normalizedTestimonials = computed(() => {
  return (props.testimonials ?? [])
    .filter((testimonial) => testimonial?.quote?.trim())
    .map((testimonial) => ({
      quote: testimonial.quote.trim(),
      name: testimonial.name?.trim() || "Envision Client",
      title: testimonial.title?.trim() || "Project Partner",
      detail: testimonial.detail?.trim(),
    }));
});

const hasTestimonials = computed(() => normalizedTestimonials.value.length > 0);
const showRailNavigation = computed(() => normalizedTestimonials.value.length > 1);

const [emblaRef, emblaApi] = useEmblaCarousel({
  align: "center",
  loop: true,
});

const selectedIndex = ref(0);
const scrollSnaps = ref<number[]>([]);
const canScrollPrevious = ref(false);
const canScrollNext = ref(false);
const shouldPauseAutoscroll = ref(false);

let autoscrollTimer: ReturnType<typeof setInterval> | null = null;
let reducedMotionQuery: MediaQueryList | null = null;

function syncCarouselState() {
  const api = emblaApi.value;
  if (!api) return;

  selectedIndex.value = api.selectedScrollSnap();
  scrollSnaps.value = api.scrollSnapList();
  canScrollPrevious.value = api.canScrollPrev();
  canScrollNext.value = api.canScrollNext();
}

function stopAutoscroll() {
  if (!import.meta.client) return;
  if (!autoscrollTimer) return;

  window.clearInterval(autoscrollTimer);
  autoscrollTimer = null;
}

function startAutoscroll() {
  if (!import.meta.client) return;

  stopAutoscroll();

  if (!showRailNavigation.value || shouldPauseAutoscroll.value || reducedMotionQuery?.matches) {
    return;
  }

  autoscrollTimer = window.setInterval(() => {
    emblaApi.value?.scrollNext();
  }, AUTOSCROLL_INTERVAL_MS);
}

function pauseAutoscroll() {
  shouldPauseAutoscroll.value = true;
  stopAutoscroll();
}

function resumeAutoscroll() {
  shouldPauseAutoscroll.value = false;
  startAutoscroll();
}

function scrollPrevious() {
  emblaApi.value?.scrollPrev();
  startAutoscroll();
}

function scrollNext() {
  emblaApi.value?.scrollNext();
  startAutoscroll();
}

function scrollTo(index: number) {
  emblaApi.value?.scrollTo(index);
  startAutoscroll();
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    scrollPrevious();
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    scrollNext();
  }
}

watch(
  emblaApi,
  (api, previousApi) => {
    previousApi?.off("select", syncCarouselState);
    previousApi?.off("reInit", syncCarouselState);

    if (!api) return;

    syncCarouselState();
    startAutoscroll();
    api.on("select", syncCarouselState);
    api.on("reInit", syncCarouselState);
  },
  { immediate: true },
);

onMounted(() => {
  reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  reducedMotionQuery.addEventListener("change", startAutoscroll);
  startAutoscroll();
});

onUnmounted(() => {
  stopAutoscroll();
  reducedMotionQuery?.removeEventListener("change", startAutoscroll);
  emblaApi.value?.off("select", syncCarouselState);
  emblaApi.value?.off("reInit", syncCarouselState);
});
</script>

<template>
  <section-a
    v-if="hasTestimonials"
    class="testimonials-stage"
    :class="{ dark: bgcolor === 'dark', light: bgcolor === 'light', blue: bgcolor === 'blue' }"
    :bgcolor
    :eyebrow
    :body="sectionBody"
  >
    <div
      class="testimonials-stage__carousel"
      @mouseenter="pauseAutoscroll"
      @mouseleave="resumeAutoscroll"
      @focusin="pauseAutoscroll"
      @focusout="resumeAutoscroll"
    >
      <div
        ref="emblaRef"
        class="testimonials-stage__viewport"
        :tabindex="showRailNavigation ? 0 : -1"
        aria-label="Client testimonials"
        @keydown="handleKeydown"
      >
        <ul class="testimonials-stage__rail" role="list">
          <li
            v-for="(testimonial, index) in normalizedTestimonials"
            :key="`${testimonial.name}-${index}`"
            class="testimonials-stage__slide"
          >
            <article class="testimonial">
              <app-typography tag="p" variant="heading-lg">
                <span class="testimonial__mark" aria-hidden="true">"</span>
                <span dir="auto">{{ testimonial.quote }}</span>
                <span class="testimonial__mark" aria-hidden="true">"</span>
              </app-typography>
              <div>
                <card-f :item="{ label: testimonial.name, description: testimonial.title }" />
              </div>
            </article>
          </li>
        </ul>
      </div>

      <div v-if="showRailNavigation" class="testimonials-stage__controls">
        <button
          type="button"
          class="testimonials-stage__arrow testimonials-stage__arrow--previous"
          :disabled="!canScrollPrevious"
          aria-label="Previous testimonial"
          @click="scrollPrevious"
        >
          <UIcon name="i-lucide-arrow-left" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="testimonials-stage__arrow testimonials-stage__arrow--next"
          :disabled="!canScrollNext"
          aria-label="Next testimonial"
          @click="scrollNext"
        >
          <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
        </button>
      </div>
    </div>

    <ul v-if="showRailNavigation" class="testimonials-stage__dots" aria-label="Testimonial pages">
      <li v-for="(_, index) in scrollSnaps" :key="index" class="testimonials-stage__dot-item">
        <button
          type="button"
          class="testimonials-stage__dot"
          :class="{ 'is-active': index === selectedIndex }"
          :aria-label="`Show testimonial ${index + 1}`"
          :aria-pressed="index === selectedIndex"
          @click="scrollTo(index)"
        />
      </li>
    </ul>
  </section-a>

  <section
    v-else
    class="quote-fallback"
    :class="{ dark: bgcolor === 'dark', light: bgcolor === 'light', blue: bgcolor === 'blue' }"
  >
    <div class="quote-fallback__inner">
      <app-typography
        v-if="eyebrow"
        tag="p"
        variant="eyebrow-md"
        class="testimonials-stage__eyebrow"
      >
        {{ eyebrow }}
      </app-typography>
      <app-typography variant="heading-sm" tag="p" class="quote-fallback__quote">
        {{ quote || "Clients trust Envision to communicate clearly and follow through." }}
      </app-typography>
      <app-typography v-if="name" variant="text-lg" tag="p" class="quote-fallback__name">
        {{ name }}
      </app-typography>
      <app-typography v-if="title" variant="text-md" tag="p" class="quote-fallback__title">
        {{ title }}
      </app-typography>
    </div>
  </section>
</template>

<style scoped>
.testimonials-stage,
.quote-fallback {
  grid-column: 1 / -1;
  padding-inline: calc(var(--spacing) * 4);
  padding-block: calc(var(--spacing) * 14);
  background: var(--section-bg);
  color: var(--section-color);
}

.light {
  --section-bg: var(--color-white);
  --section-color: var(--color-envision-gray-900);
  --quote-heading-color: var(--color-envision-blue-950);
  --quote-muted-color: var(--text-color-muted);
  --quote-accent-color: var(--color-envision-green-600);
  --quote-control-bg: var(--color-white);
  --quote-control-border: var(--color-envision-gray-300);
  --quote-control-color: var(--color-envision-blue-950);
  --quote-control-focus: var(--color-envision-blue-900);
  --quote-control-active-bg: var(--color-envision-blue-600);
  --quote-control-active-border: var(--color-envision-blue-600);
  --quote-control-active-color: var(--color-white);
  --quote-dot-color: var(--color-envision-gray-300);
  --quote-dot-active-color: var(--color-envision-blue-600);
}

.dark {
  --section-bg: var(--color-envision-gray-900);
  --section-color: var(--color-white);
  --quote-heading-color: var(--color-white);
  --quote-muted-color: var(--color-envision-gray-200);
  --quote-accent-color: var(--color-envision-green-500);
  --quote-control-bg: transparent;
  --quote-control-border: color-mix(in oklab, var(--color-white) 30%, transparent);
  --quote-control-color: var(--color-white);
  --quote-control-focus: var(--color-envision-green-500);
  --quote-control-active-bg: var(--color-envision-green-500);
  --quote-control-active-border: var(--color-envision-green-500);
  --quote-control-active-color: var(--color-envision-blue-950);
  --quote-dot-color: color-mix(in oklab, var(--color-white) 28%, transparent);
  --quote-dot-active-color: var(--color-envision-green-500);
}

.blue {
  --section-bg: var(--color-envision-blue-950);
  --section-color: var(--color-white);
  --quote-heading-color: var(--color-white);
  --quote-muted-color: var(--color-envision-gray-100);
  --quote-accent-color: var(--color-envision-green-500);
  --quote-control-bg: transparent;
  --quote-control-border: color-mix(in oklab, var(--color-white) 30%, transparent);
  --quote-control-color: var(--color-white);
  --quote-control-focus: var(--color-envision-green-500);
  --quote-control-active-bg: var(--color-envision-green-500);
  --quote-control-active-border: var(--color-envision-green-500);
  --quote-control-active-color: var(--color-envision-blue-950);
  --quote-dot-color: color-mix(in oklab, var(--color-white) 28%, transparent);
  --quote-dot-active-color: var(--color-envision-green-500);
}

.testimonials-stage__inner,
.quote-fallback__inner {
  display: grid;
  gap: calc(var(--spacing) * 10);
  width: min(100%, var(--ui-container));
  margin-inline: auto;
}

.testimonials-stage__header {
  display: grid;
  gap: calc(var(--spacing) * 4);
  max-width: 48rem;
}

.testimonials-stage__eyebrow {
  color: var(--quote-accent-color);
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.testimonials-stage__title,
.testimonials-stage__body,
.testimonial__quote,
.testimonial__name,
.testimonial__title,
.testimonial__detail,
.quote-fallback__quote,
.quote-fallback__name,
.quote-fallback__title {
  max-width: none;
  color: inherit;
}

.testimonials-stage :deep(span:not(.testimonial__mark)),
.quote-fallback :deep(span) {
  color: inherit;
}

.testimonials-stage__title {
  width: min(100%, 42rem);
  color: var(--quote-heading-color);
  text-wrap: balance;
}

.testimonials-stage__body {
  width: min(100%, 36rem);
  color: var(--quote-muted-color);
  line-height: 1.5;
}

.testimonials-stage__carousel {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  width: 100%;
  min-width: 0;
  padding-block: calc(var(--spacing) * 2);
}

.testimonials-stage__controls {
  display: flex;
  gap: calc(var(--spacing) * 2);
  padding-top: calc(var(--spacing) * 4);
}

.testimonials-stage__viewport {
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  min-width: 0;
}

.testimonials-stage__viewport:focus-visible {
  outline: 2px solid var(--quote-control-focus);
  outline-offset: 4px;
}

.testimonials-stage__rail {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  touch-action: pan-y pinch-zoom;
}

.testimonials-stage__slide {
  flex: 0 0 100%;
  min-width: 0;
  display: flex;
  justify-content: center;
}

.testimonial {
  display: grid;
  gap: calc(var(--spacing) * 8);
  width: min(100%, 62rem);
  padding-block: calc(var(--spacing) * 10);
  padding-inline: calc(var(--spacing) * 1);
}

.testimonial__quote {
  position: relative;
  width: min(100%, 56rem);
  color: var(--quote-heading-color);
  font-weight: 300;
  line-height: 1.18;
  text-wrap: balance;
}

.testimonial__mark {
  color: var(--quote-accent-color);
  font-weight: 600;
}

.testimonials-stage__arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid var(--quote-control-border);
  border-radius: 0;
  background: var(--quote-control-bg);
  color: var(--quote-control-color);
  cursor: pointer;
  transition:
    background-color 180ms ease,
    border-color 180ms ease,
    color 180ms ease;
}

.testimonials-stage__arrow:hover:not(:disabled),
.testimonials-stage__arrow:focus-visible {
  border-color: var(--quote-control-active-border);
  background: var(--quote-control-active-bg);
  color: var(--quote-control-active-color);
}

.testimonials-stage__arrow:focus-visible {
  outline: 2px solid var(--quote-control-focus);
  outline-offset: 3px;
}

.testimonials-stage__arrow:disabled {
  opacity: 0.35;
  cursor: default;
}

.dark .testimonial__mark,
.blue .testimonial__mark {
  color: var(--quote-accent-color);
}

.testimonials-stage__dots {
  display: flex;
  justify-content: center;
  gap: calc(var(--spacing) * 1.5);
  margin: 0;
  padding: 0;
  list-style: none;
}

.testimonials-stage__dot-item {
  display: flex;
}

.testimonials-stage__dot {
  width: calc(var(--spacing) * 8);
  height: 0.1875rem;
  border: 0;
  border-radius: 0;
  background: var(--quote-dot-color);
  cursor: pointer;
  transition:
    background-color 180ms ease,
    transform 180ms ease;
}

.testimonials-stage__dot:hover,
.testimonials-stage__dot:focus-visible,
.testimonials-stage__dot.is-active {
  background: var(--quote-dot-active-color);
}

.testimonials-stage__dot.is-active {
  transform: scaleY(1.4);
}

.testimonials-stage__dot:focus-visible {
  outline: 2px solid var(--quote-control-focus);
  outline-offset: 3px;
}

.quote-fallback__inner {
  justify-items: center;
  text-align: center;
  padding-block: calc(var(--spacing) * 10);
  border-block: var(--border);
}

.quote-fallback__quote {
  width: min(100%, 42rem);
  color: var(--quote-heading-color);
  text-wrap: balance;
}

.quote-fallback__name {
  color: var(--section-color);
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.quote-fallback__title {
  color: var(--quote-muted-color);
}

@media (max-width: 767px) {
  .testimonials-stage,
  .quote-fallback {
    padding-block: calc(var(--spacing) * 10);
  }

  .testimonials-stage__inner,
  .quote-fallback__inner {
    gap: calc(var(--spacing) * 6);
  }

  .testimonial {
    width: min(100%, 32rem);
    gap: calc(var(--spacing) * 6);
    padding-block: calc(var(--spacing) * 8);
  }

  .testimonials-stage__carousel {
    gap: calc(var(--spacing) * 4);
    justify-items: center;
  }
}

@media (min-width: 900px) {
  .testimonials-stage__inner {
    grid-template-columns: minmax(0, 0.45fr) minmax(0, 0.55fr);
    align-items: start;
  }

  .testimonials-stage__carousel,
  .testimonials-stage__dots {
    grid-column: 2;
  }

  .testimonials-stage__dots {
    justify-content: flex-start;
  }
}

@media (prefers-reduced-motion: reduce) {
  .testimonials-stage__arrow,
  .testimonials-stage__dot {
    transition: none;
  }
}
</style>
