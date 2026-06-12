<script setup lang="ts">import useEmblaCarousel from 'embla-carousel-vue';
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
    bgcolor?: 'light' | 'dark' | 'blue';
  }>(),
  {
    eyebrow: 'Client Testimonials',
    sectionTitle: 'Our clients who expect discipline, communication, and follow-through.',
    bgcolor: 'dark',
  },
);

const normalizedTestimonials = computed(() => {
  return (props.testimonials ?? [])
    .filter(testimonial => testimonial?.quote?.trim())
    .map(testimonial => ({
      quote: testimonial.quote.trim(),
      name: testimonial.name?.trim() || 'Envision Client',
      title: testimonial.title?.trim() || 'Project Partner',
      detail: testimonial.detail?.trim(),
    }));
});

const hasTestimonials = computed(() => normalizedTestimonials.value.length > 0);
const showRailNavigation = computed(() => normalizedTestimonials.value.length > 1);

const posthog = usePostHog();

type TestimonialNavMethod = 'button' | 'keyboard' | 'page' | 'swipe';

function captureTestimonialEvent(event: string, eventProps: Record<string, unknown> = {}) {
  posthog?.capture(event, {
    section_eyebrow: props.eyebrow,
    testimonial_count: normalizedTestimonials.value.length,
    ...eventProps,
  });
}

const [emblaRef, emblaApi] = useEmblaCarousel({
  align: 'center',
  loop: true,
});

const selectedIndex = ref(0);
const scrollSnaps = ref<number[]>([]);
const canScrollPrevious = ref(false);
const canScrollNext = ref(false);
const shouldPauseAutoscroll = ref(false);

const formattedIndex = computed(() => String(selectedIndex.value + 1).padStart(2, '0'));
const formattedCount = computed(() => {
  const count = scrollSnaps.value.length || normalizedTestimonials.value.length;
  return String(count).padStart(2, '0');
});

let autoscrollTimer: ReturnType<typeof setInterval> | null = null;
let reducedMotionQuery: MediaQueryList | null = null;

const sectionRef = useTemplateRef<HTMLElement | null>('sectionRef');
let viewObserver: IntersectionObserver | null = null;
let isPointerDragging = false;

function trackNavigation(method: TestimonialNavMethod, toIndex: number) {
  const target = normalizedTestimonials.value[toIndex];
  captureTestimonialEvent('testimonial_navigated', {
    method,
    from_index: selectedIndex.value,
    to_index: toIndex,
    testimonial_name: target?.name,
  });
}

function onEmblaPointerDown() {
  isPointerDragging = true;
}

function onEmblaSettle() {
  isPointerDragging = false;
}

function onEmblaSwipeSelect() {
  const api = emblaApi.value;
  if (!isPointerDragging || !api)
    return;

  isPointerDragging = false;
  trackNavigation('swipe', api.selectedScrollSnap());
}

function syncCarouselState() {
  const api = emblaApi.value;
  if (!api)
    return;

  selectedIndex.value = api.selectedScrollSnap();
  scrollSnaps.value = api.scrollSnapList();
  canScrollPrevious.value = api.canScrollPrev();
  canScrollNext.value = api.canScrollNext();
}

function stopAutoscroll() {
  if (!import.meta.client)
    return;
  if (!autoscrollTimer)
    return;

  window.clearInterval(autoscrollTimer);
  autoscrollTimer = null;
}

function startAutoscroll() {
  if (!import.meta.client)
    return;

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

function scrollPrevious(method: TestimonialNavMethod = 'button') {
  const api = emblaApi.value;
  if (!api)
    return;

  const count = scrollSnaps.value.length || normalizedTestimonials.value.length;
  if (count > 1)
    trackNavigation(method, (selectedIndex.value - 1 + count) % count);

  api.scrollPrev();
  startAutoscroll();
}

function scrollNext(method: TestimonialNavMethod = 'button') {
  const api = emblaApi.value;
  if (!api)
    return;

  const count = scrollSnaps.value.length || normalizedTestimonials.value.length;
  if (count > 1)
    trackNavigation(method, (selectedIndex.value + 1) % count);

  api.scrollNext();
  startAutoscroll();
}

function scrollTo(index: number) {
  if (index !== selectedIndex.value)
    trackNavigation('page', index);

  emblaApi.value?.scrollTo(index);
  startAutoscroll();
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    scrollPrevious('keyboard');
  }

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    scrollNext('keyboard');
  }
}

watch(
  emblaApi,
  (api, previousApi) => {
    previousApi?.off('select', onEmblaSwipeSelect);
    previousApi?.off('select', syncCarouselState);
    previousApi?.off('reInit', syncCarouselState);
    previousApi?.off('pointerDown', onEmblaPointerDown);
    previousApi?.off('settle', onEmblaSettle);

    if (!api)
      return;

    syncCarouselState();
    startAutoscroll();
    // Swipe handler registered first so it reads the pre-navigation index.
    api.on('select', onEmblaSwipeSelect);
    api.on('select', syncCarouselState);
    api.on('reInit', syncCarouselState);
    api.on('pointerDown', onEmblaPointerDown);
    api.on('settle', onEmblaSettle);
  },
  { immediate: true },
);

onMounted(() => {
  reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  reducedMotionQuery.addEventListener('change', startAutoscroll);
  startAutoscroll();

  if (sectionRef.value && 'IntersectionObserver' in window) {
    viewObserver = new IntersectionObserver(
      (entries) => {
        if (!entries.some(entry => entry.isIntersecting))
          return;

        captureTestimonialEvent('testimonials_section_viewed');
        viewObserver?.disconnect();
        viewObserver = null;
      },
      { threshold: 0.3 },
    );
    viewObserver.observe(sectionRef.value);
  }
});

onUnmounted(() => {
  stopAutoscroll();
  viewObserver?.disconnect();
  viewObserver = null;
  reducedMotionQuery?.removeEventListener('change', startAutoscroll);
  emblaApi.value?.off('select', onEmblaSwipeSelect);
  emblaApi.value?.off('select', syncCarouselState);
  emblaApi.value?.off('reInit', syncCarouselState);
  emblaApi.value?.off('pointerDown', onEmblaPointerDown);
  emblaApi.value?.off('settle', onEmblaSettle);
});
</script>

<template>
  <section
    v-if="hasTestimonials"
    ref="sectionRef"
    class="testimonials"
    :class="{ dark: bgcolor === 'dark', light: bgcolor === 'light', blue: bgcolor === 'blue' }"
    aria-labelledby="testimonials-title"
    @mouseenter="pauseAutoscroll"
    @mouseleave="resumeAutoscroll"
    @focusin="pauseAutoscroll"
    @focusout="resumeAutoscroll"
  >
    <div class="testimonials__inner">
      <header class="testimonials__header">
        <div class="testimonials__heading">
          <app-typography tag="p" variant="eyebrow-md" class="testimonials__eyebrow">
            {{ eyebrow }}
          </app-typography>

          <app-typography
            id="testimonials-title"
            tag="h2"
            variant="heading-md"
            class="testimonials__title"
          >
            {{ sectionTitle }}
          </app-typography>

          <app-typography
            v-if="sectionBody"
            tag="p"
            variant="text-lg"
            class="testimonials__body"
          >
            {{ sectionBody }}
          </app-typography>
        </div>

        <div v-if="showRailNavigation" class="testimonials__nav testimonials__nav--header">
          <button
            type="button"
            class="testimonials__arrow"
            :disabled="!canScrollPrevious"
            aria-label="Previous testimonial"
            @click="scrollPrevious('button')"
          >
            <UIcon name="i-lucide-arrow-left" aria-hidden="true" />
          </button>
          <button
            type="button"
            class="testimonials__arrow"
            :disabled="!canScrollNext"
            aria-label="Next testimonial"
            @click="scrollNext('button')"
          >
            <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div class="testimonials__stage">
        <span class="testimonials__mark" aria-hidden="true">“</span>

        <div
          ref="emblaRef"
          class="testimonials__viewport"
          :tabindex="showRailNavigation ? 0 : -1"
          aria-label="Client testimonials"
          @keydown="handleKeydown"
        >
          <ul class="testimonials__rail" role="list">
            <li
              v-for="(testimonial, index) in normalizedTestimonials"
              :key="`${testimonial.name}-${index}`"
              class="testimonials__slide"
            >
              <figure class="testimonial">
                <blockquote class="testimonial__blockquote">
                  <app-typography tag="p" variant="heading-lg" class="testimonial__quote">
                    <span dir="auto">{{ testimonial.quote }}</span>
                  </app-typography>
                </blockquote>

                <figcaption class="testimonial__attribution">
                  <span class="testimonial__name">{{ testimonial.name }}</span>
                  <span class="testimonial__role">{{ testimonial.title }}</span>
                  <span v-if="testimonial.detail" class="testimonial__detail">
                    {{ testimonial.detail }}
                  </span>
                </figcaption>
              </figure>
            </li>
          </ul>
        </div>

        <footer v-if="showRailNavigation" class="testimonials__railfoot">
          <p class="testimonials__counter" aria-hidden="true">
            {{ formattedIndex }} / {{ formattedCount }}
          </p>

          <ul class="testimonials__pages" aria-label="Testimonial pages">
            <li v-for="(_, index) in scrollSnaps" :key="index" class="testimonials__page-item">
              <button
                type="button"
                class="testimonials__page"
                :class="{ 'is-active': index === selectedIndex }"
                :aria-label="`Show testimonial ${index + 1}`"
                :aria-pressed="index === selectedIndex"
                @click="scrollTo(index)"
              />
            </li>
          </ul>

          <div class="testimonials__nav testimonials__nav--rail">
            <button
              type="button"
              class="testimonials__arrow"
              :disabled="!canScrollPrevious"
              aria-label="Previous testimonial"
              @click="scrollPrevious('button')"
            >
              <UIcon name="i-lucide-arrow-left" aria-hidden="true" />
            </button>
            <button
              type="button"
              class="testimonials__arrow"
              :disabled="!canScrollNext"
              aria-label="Next testimonial"
              @click="scrollNext('button')"
            >
              <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
            </button>
          </div>
        </footer>
      </div>
    </div>
  </section>

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
        class="quote-fallback__eyebrow"
      >
        {{ eyebrow }}
      </app-typography>
      <app-typography variant="heading-sm" tag="p" class="quote-fallback__quote">
        {{ quote || 'Clients trust Envision to communicate clearly and follow through.' }}
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
.testimonials,
.quote-fallback {
  grid-column: 1 / -1;
  padding-inline: calc(var(--spacing) * 4);
  padding-block: calc(var(--spacing) * 16);
  background: var(--section-bg);
  color: var(--section-color);
}

.light {
  --section-bg: var(--color-white);
  --section-color: var(--color-envision-gray-900);
  --quote-heading-color: var(--color-envision-blue-950);
  --quote-muted-color: var(--text-color-muted);
  --quote-accent-color: var(--color-envision-green-600);
  --quote-hairline: color-mix(in oklab, var(--color-envision-gray-900) 14%, transparent);
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
  --quote-hairline: color-mix(in oklab, var(--color-white) 18%, transparent);
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
  --quote-hairline: color-mix(in oklab, var(--color-white) 18%, transparent);
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

.testimonials__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: calc(var(--spacing) * 10);
  width: min(100%, 1500px);
  margin-inline: auto;
}

.testimonials__header {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: calc(var(--spacing) * 6);
  min-width: 0;
}

.testimonials__heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: calc(var(--spacing) * 3);
  max-width: 52rem;
  min-width: 0;
}

.testimonials__eyebrow {
  color: var(--quote-accent-color);
  font-size: 0.78rem;
  letter-spacing: 0.14em;
}

.testimonials__title {
  max-width: 40rem;
  color: var(--quote-heading-color);
  text-wrap: balance;
}

.testimonials__body {
  max-width: 38rem;
  color: var(--quote-muted-color);
  line-height: 1.5;
}

.testimonials__nav {
  display: flex;
}

.testimonials__nav--header {
  display: none;
}

.testimonials__nav--rail .testimonials__arrow {
  width: 2.75rem;
  height: 2.75rem;
}

@media (min-width: 768px) {
  .testimonials__nav--header {
    display: flex;
  }

  .testimonials__nav--rail {
    display: none;
  }
}

.testimonials__arrow {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
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

.testimonials__arrow + .testimonials__arrow {
  border-left: 0;
}

.testimonials__arrow:hover:not(:disabled),
.testimonials__arrow:focus-visible {
  border-color: var(--quote-control-active-border);
  background: var(--quote-control-active-bg);
  color: var(--quote-control-active-color);
}

.testimonials__arrow:focus-visible {
  outline: 2px solid var(--quote-control-focus);
  outline-offset: 3px;
}

.testimonials__arrow:disabled {
  opacity: 0.35;
  cursor: default;
}

.testimonials__stage {
  min-width: 0;
  border-top: 1px solid var(--quote-hairline);
  padding-top: calc(var(--spacing) * 8);
}

.testimonials__mark {
  display: block;
  height: 0.52em;
  overflow: visible;
  color: var(--quote-accent-color);
  font-size: clamp(4.5rem, 9vw, 7rem);
  font-weight: 700;
  line-height: 0.9;
  user-select: none;
}

.testimonials__viewport {
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  min-width: 0;
  margin-top: calc(var(--spacing) * 4);
}

.testimonials__viewport:focus-visible {
  outline: 2px solid var(--quote-control-focus);
  outline-offset: 4px;
}

.testimonials__rail {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  touch-action: pan-y pinch-zoom;
}

.testimonials__slide {
  flex: 0 0 100%;
  min-width: 0;
}

.testimonial {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: calc(var(--spacing) * 7);
  max-width: 60rem;
  margin: 0;
}

.testimonial__blockquote {
  min-width: 0;
  margin: 0;
}

.testimonial__quote {
  max-width: 56rem;
  color: var(--quote-heading-color);
  font-weight: 300;
  line-height: 1.16;
  text-wrap: balance;
}

.testimonial__quote :deep(span) {
  color: inherit;
}

.testimonial__attribution {
  display: grid;
  gap: calc(var(--spacing) * 0.5);
  padding-left: calc(var(--spacing) * 4);
  border-left: 2px solid var(--quote-accent-color);
}

.testimonial__name {
  color: var(--section-color);
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.testimonial__role {
  color: var(--quote-muted-color);
  font-size: 0.9rem;
  line-height: 1.35;
}

.testimonial__detail {
  color: var(--quote-muted-color);
  font-size: 0.8rem;
  line-height: 1.35;
}

.testimonials__railfoot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: calc(var(--spacing) * 3);
  margin-top: calc(var(--spacing) * 8);
  border-top: 1px solid var(--quote-hairline);
  padding-top: calc(var(--spacing) * 4);
}

.testimonials__counter {
  margin: 0;
  color: var(--quote-muted-color);
  font-size: 0.78rem;
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.testimonials__pages {
  display: flex;
  gap: calc(var(--spacing) * 1.5);
  margin: 0;
  padding: 0;
  list-style: none;
}

.testimonials__page-item {
  display: flex;
}

.testimonials__page {
  position: relative;
  width: calc(var(--spacing) * 10);
  height: 1.25rem;
  border: 0;
  padding: 0;
  background: transparent;
  cursor: pointer;
}

.testimonials__page::after {
  content: '';
  position: absolute;
  inset-inline: 0;
  top: 50%;
  height: 2px;
  translate: 0 -50%;
  background: var(--quote-dot-color);
  transition:
    background-color 180ms ease,
    height 180ms ease;
}

.testimonials__page:hover::after,
.testimonials__page:focus-visible::after,
.testimonials__page.is-active::after {
  background: var(--quote-dot-active-color);
}

.testimonials__page.is-active::after {
  height: 4px;
}

.testimonials__page:focus-visible {
  outline: 2px solid var(--quote-control-focus);
  outline-offset: 3px;
}

.quote-fallback__inner {
  display: grid;
  gap: calc(var(--spacing) * 4);
  width: min(100%, var(--ui-container));
  margin-inline: auto;
  justify-items: center;
  text-align: center;
  padding-block: calc(var(--spacing) * 10);
  border-block: var(--border);
}

.quote-fallback__eyebrow {
  color: var(--quote-accent-color);
  font-size: 0.78rem;
  letter-spacing: 0.14em;
}

.quote-fallback__quote {
  max-width: 42rem;
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
  .testimonials,
  .quote-fallback {
    padding-block: calc(var(--spacing) * 12);
  }

  .testimonials__inner {
    gap: calc(var(--spacing) * 7);
  }

  .testimonials__stage {
    padding-top: calc(var(--spacing) * 6);
  }

  .testimonial {
    gap: calc(var(--spacing) * 5);
  }

  .testimonials__railfoot {
    margin-top: calc(var(--spacing) * 6);
  }

  .testimonials__page {
    width: calc(var(--spacing) * 7);
  }
}

@media (min-width: 1000px) {
  .testimonials__stage {
    display: grid;
    grid-template-columns: clamp(5rem, 9vw, 7.5rem) minmax(0, 1fr);
    column-gap: calc(var(--spacing) * 8);
  }

  .testimonials__mark {
    grid-column: 1;
    height: auto;
  }

  .testimonials__viewport {
    grid-column: 2;
    margin-top: calc(var(--spacing) * 2);
  }

  .testimonials__railfoot {
    grid-column: 2;
  }
}

@media (prefers-reduced-motion: reduce) {
  .testimonials__arrow,
  .testimonials__page::after {
    transition: none;
  }
}
</style>
