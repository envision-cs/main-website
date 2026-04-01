<script setup lang="ts">
import useEmblaCarousel from "embla-carousel-vue";
interface TestimonialItem {
  quote: string;
  name: string;
  title: string;
  detail?: string;
}

const props = withDefaults(
  defineProps<{
    quote?: string;
    name?: string;
    title?: string;
    testimonials?: TestimonialItem[];
    eyebrow?: string;
    sectionTitle?: string;
    sectionBody?: string;
  }>(),
  {
    eyebrow: "Client Testimonials",
    sectionTitle: "Our clients who expect discipline, communication, and follow-through.",
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
  loop: false,
});

const selectedIndex = ref(0);
const scrollSnaps = ref<number[]>([]);
const canScrollPrevious = ref(false);
const canScrollNext = ref(false);

function syncCarouselState() {
  const api = emblaApi.value;
  if (!api) return;

  selectedIndex.value = api.selectedScrollSnap();
  scrollSnaps.value = api.scrollSnapList();
  canScrollPrevious.value = api.canScrollPrev();
  canScrollNext.value = api.canScrollNext();
}

const scrollPrevious = () => emblaApi.value?.scrollPrev();
const scrollNext = () => emblaApi.value?.scrollNext();
const scrollTo = (index: number) => emblaApi.value?.scrollTo(index);

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
    api.on("select", syncCarouselState);
    api.on("reInit", syncCarouselState);
  },
  { immediate: true },
);

onUnmounted(() => {
  emblaApi.value?.off("select", syncCarouselState);
  emblaApi.value?.off("reInit", syncCarouselState);
});
</script>

<template>
  <section v-if="hasTestimonials" class="testimonials-stage">
    <div class="testimonials-stage__inner">
      <header class="testimonials-stage__header">
        <app-typography
          v-if="eyebrow"
          tag="p"
          variant="eyebrow-md"
          class="testimonials-stage__eyebrow"
        >
          {{ eyebrow }}
        </app-typography>

        <app-typography tag="h2" variant="heading-md" class="testimonials-stage__title">
          {{ sectionTitle }}
        </app-typography>

        <app-typography
          v-if="sectionBody"
          tag="p"
          variant="text-lg"
          class="testimonials-stage__body"
        >
          {{ sectionBody }}
        </app-typography>
      </header>

      <div class="testimonials-stage__carousel">
        <button
          v-if="showRailNavigation"
          type="button"
          class="testimonials-stage__arrow testimonials-stage__arrow--previous"
          :disabled="!canScrollPrevious"
          aria-label="Previous testimonial"
          @click="scrollPrevious"
        >
          <span aria-hidden="true">←</span>
        </button>

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
                <app-typography tag="p" variant="heading-sm" class="testimonial__quote">
                  <span class="testimonial__mark" aria-hidden="true">“</span>
                  <span dir="auto">{{ testimonial.quote }}</span>
                  <span class="testimonial__mark" aria-hidden="true">”</span>
                </app-typography>

                <div class="testimonial__meta">
                  <app-typography tag="p" variant="text-md" class="testimonial__name">
                    <span dir="auto">{{ testimonial.name }}</span>
                  </app-typography>

                  <app-typography tag="p" variant="text-sm" class="testimonial__title">
                    <span dir="auto">{{ testimonial.title }}</span>
                  </app-typography>

                  <app-typography
                    v-if="testimonial.detail"
                    tag="p"
                    variant="eyebrow-sm"
                    class="testimonial__detail"
                  >
                    <span dir="auto">{{ testimonial.detail }}</span>
                  </app-typography>
                </div>
              </article>
            </li>
          </ul>
        </div>

        <button
          v-if="showRailNavigation"
          type="button"
          class="testimonials-stage__arrow testimonials-stage__arrow--next"
          :disabled="!canScrollNext"
          aria-label="Next testimonial"
          @click="scrollNext"
        >
          <span aria-hidden="true">→</span>
        </button>
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
    </div>
  </section>

  <section v-else class="quote-fallback">
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
  padding-block: calc(var(--spacing) * 10);
  color: var(--color-white);
}

.testimonials-stage__inner,
.quote-fallback__inner {
  display: grid;
  gap: calc(var(--spacing) * 8);
  width: min(100%, 78rem);
  margin-inline: auto;
}

.testimonials-stage__header {
  display: grid;
  justify-items: center;
  gap: calc(var(--spacing) * 3);
  text-align: center;
}

.testimonials-stage__eyebrow {
  opacity: 0.72;
  letter-spacing: 0.12em;
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
  color: var(--color-white);
}

.testimonials-stage :deep(p),
.testimonials-stage :deep(span),
.testimonials-stage :deep(h2),
.quote-fallback :deep(p),
.quote-fallback :deep(span) {
  color: var(--color-white);
}

.testimonials-stage__title {
  width: min(100%, 36rem);
  text-align: center;
  text-wrap: balance;
}

.testimonials-stage__body {
  width: min(100%, 30rem);
  opacity: 0.82;
  line-height: 1.5;
}

.testimonials-stage__carousel {
  position: relative;
  display: grid;
  align-items: center;
}

.testimonials-stage__viewport {
  overflow: hidden;
}

.testimonials-stage__viewport:focus-visible {
  outline: 2px solid currentColor;
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
  justify-items: center;
  gap: calc(var(--spacing) * 5);
  width: min(100%, 44rem);
  text-align: center;
}

.testimonial__quote {
  width: min(100%, 42rem);
  font-style: italic;
  line-height: 1.55;
  text-wrap: balance;
}

.testimonial__mark {
  opacity: 0.92;
}

.testimonial__meta {
  display: grid;
  justify-items: center;
  gap: calc(var(--spacing) * 1.5);
}

.testimonial__name {
  text-transform: uppercase;
  letter-spacing: 0.12em;
}

.testimonial__title {
  opacity: 0.7;
}

.testimonial__detail {
  padding-inline: calc(var(--spacing) * 3);
  padding-block: calc(var(--spacing) * 1);
  border: 1px solid currentColor;
  opacity: 0.9;
}

.testimonials-stage__arrow {
  position: absolute;
  top: 50%;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid currentColor;
  border-radius: 999px;
  background: transparent;
  color: inherit;
  transform: translateY(-50%);
  opacity: 0.45;
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.testimonials-stage__arrow:hover:not(:disabled),
.testimonials-stage__arrow:focus-visible {
  opacity: 1;
}

.testimonials-stage__arrow:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}

.testimonials-stage__arrow:disabled {
  opacity: 0.18;
}

.testimonials-stage__arrow--previous {
  left: 0;
}

.testimonials-stage__arrow--next {
  right: 0;
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
  width: 0.375rem;
  height: 0.375rem;
  border: 0;
  border-radius: 999px;
  background: currentColor;
  opacity: 0.22;
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.testimonials-stage__dot:hover,
.testimonials-stage__dot:focus-visible,
.testimonials-stage__dot.is-active {
  opacity: 1;
}

.testimonials-stage__dot.is-active {
  transform: scale(1.15);
}

.testimonials-stage__dot:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}

.quote-fallback__inner {
  justify-items: center;
  text-align: center;
}

.quote-fallback__quote {
  width: min(100%, 42rem);
  text-wrap: balance;
}

.quote-fallback__title {
  opacity: 0.72;
}

@media (max-width: 767px) {
  .testimonials-stage,
  .quote-fallback {
    padding-block: calc(var(--spacing) * 8);
  }

  .testimonials-stage__inner,
  .quote-fallback__inner {
    gap: calc(var(--spacing) * 6);
  }

  .testimonial {
    width: min(100%, 32rem);
  }

  .testimonials-stage__arrow {
    position: static;
    transform: none;
    margin-top: calc(var(--spacing) * 2);
  }

  .testimonials-stage__carousel {
    gap: calc(var(--spacing) * 4);
    justify-items: center;
  }

  .testimonials-stage__arrow--previous,
  .testimonials-stage__arrow--next {
    inset: auto;
  }
}

@media (prefers-reduced-motion: reduce) {
  .testimonials-stage__arrow,
  .testimonials-stage__dot {
    transition: none;
  }
}
</style>
