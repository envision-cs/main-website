<script setup lang="ts">
interface TestimonialItem {
  quote: string;
  name: string;
  title: string;
  detail?: string;
  tone?: "green" | "blue" | "charcoal";
}
const scrollContainer = ref<HTMLElement | null>(null);
const items = ref<HTMLElement[]>([]);
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
    sectionTitle: "Client Testimonials",
    sectionBody: "Our clients expect discipline, communication, and follow-through",
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
      tone: testimonial.tone ?? "charcoal",
    }));
});
const hasTestimonials = computed(() => normalizedTestimonials.value.length > 0);
const showRailNavigation = computed(() => normalizedTestimonials.value.length > 1);
const { canScrollPrevious, canScrollNext, scrollPrevious, scrollNext, handleKeydown } =
  useScrollGallery(scrollContainer, items);
useTouchHandler(scrollContainer);
</script>

<template>
  <section v-if="hasTestimonials" class="testimonials-section">
    <div class="site-grid testimonials-shell">
      <div class="testimonials-surface">
        <header class="l-testimonials-header">
          <div class="l-stack testimonials-copy">
            <app-typography
              v-if="eyebrow"
              tag="p"
              variant="eyebrow-md"
              class="testimonials-eyebrow"
            >
              {{ eyebrow }}
            </app-typography>

            <app-typography tag="h2" variant="heading-md" class="testimonials-title">
              {{ sectionTitle }}
            </app-typography>

            <app-typography v-if="sectionBody" tag="p" variant="text-lg" class="testimonials-body">
              {{ sectionBody }}
            </app-typography>
          </div>

          <app-gallery-paddle-nav
            v-if="showRailNavigation"
            class="testimonials-nav"
            :can-scroll-previous="canScrollPrevious"
            :can-scroll-next="canScrollNext"
            @previous="scrollPrevious"
            @next="scrollNext"
          />
        </header>

        <div
          ref="scrollContainer"
          class="testimonials-viewport"
          :tabindex="showRailNavigation ? 0 : -1"
          aria-label="Client testimonials"
          @keydown="handleKeydown"
        >
          <ul class="testimonials-rail card-set" role="list">
            <li
              v-for="(testimonial, index) in normalizedTestimonials"
              :key="`${testimonial.name}-${index}`"
              class="testimonial-card gallery-item"
              :class="`is-${testimonial.tone ?? 'charcoal'}`"
            >
              <app-typography tag="p" variant="heading-sm" class="testimonial-card__quote">
                <span dir="auto">"{{ testimonial.quote }}"</span>
              </app-typography>

              <div class="testimonial-card__meta">
                <app-typography tag="p" variant="text-md" class="testimonial-card__name">
                  <span dir="auto">{{ testimonial.name }}</span>
                </app-typography>

                <app-typography tag="p" variant="text-sm" class="testimonial-card__title">
                  <span dir="auto">{{ testimonial.title }}</span>
                </app-typography>

                <app-typography
                  v-if="testimonial.detail"
                  tag="p"
                  variant="text-sm"
                  class="testimonial-card__detail"
                >
                  <span dir="auto">{{ testimonial.detail }}</span>
                </app-typography>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section v-else class="site-grid quote-fallback-section">
    <div class="quote">
      <app-typography variant="heading-sm" tag="p" class="text-balance">
        {{ quote || "Clients trust Envision to communicate clearly and follow through." }}
      </app-typography>
      <app-typography v-if="name" variant="text-lg" tag="p" class="text-balance mt-4">
        {{ name }}
      </app-typography>
      <app-typography v-if="title" variant="text-md" tag="p" class="text-balance">
        {{ title }}
      </app-typography>
    </div>
  </section>
</template>

<style scoped>
:root {
  --testimonials-surface: color-mix(
    in srgb,
    var(--color-white) 88%,
    var(--color-envision-gray-300) 12%
  );
  --testimonials-copy-width: 38.25rem;
  --testimonial-card-width: 19.375rem;
  --testimonial-card-height: 18.75rem;
}

.testimonials-section,
.quote-fallback-section {
  border-bottom: 1px solid var(--ui-border);
}

.l-testimonials-header,
.l-stack {
  display: flex;
}

.l-testimonials-header {
  align-items: end;
  gap: calc(var(--spacing) * 4);
  justify-content: space-between;
}

.l-stack {
  flex-direction: column;
}

.testimonials-section {
  background-color: var(--color-white);
  content-visibility: auto;
  contain-intrinsic-size: 40rem;
}

.testimonials-shell {
  grid-column: 1 / -1;
}

.testimonials-surface {
  grid-column: 1 / -1;
  display: grid;
  gap: calc(var(--spacing) * 7.5);
  width: 100%;
  padding-block: calc(var(--spacing) * 9);
  padding-inline: calc(var(--spacing) * 4);
  background-color: var(--testimonials-surface);
}

.testimonials-copy {
  gap: calc(var(--spacing) * 3);
  max-width: var(--testimonials-copy-width);
}

.testimonials-viewport {
  min-width: 0;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
  -webkit-overflow-scrolling: touch;
}

.testimonials-viewport::-webkit-scrollbar {
  display: none;
}

.testimonials-viewport:focus-visible {
  outline: 2px solid var(--color-envision-blue-500);
  outline-offset: 4px;
}

.testimonials-eyebrow {
  letter-spacing: 0.08em;
}

.testimonials-title {
  max-width: none;
  font-weight: var(--font-weight-regular);
  letter-spacing: -0.02em;
  text-transform: none;
}

.testimonials-body {
  max-width: 26ch;
  color: var(--text-color-muted);
  line-height: 1.5;
}

.testimonials-rail {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(25rem, 86vw);
  gap: calc(var(--spacing) * 4);
  margin: 0;
  padding: 0;
  list-style: none;
  scroll-snap-type: x proximity;
}

.testimonial-card {
  --testimonial-card-bg: var(--color-envision-gray-700);

  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 4.5);
  justify-content: space-between;
  min-width: 0;
  min-height: var(--testimonial-card-height);
  padding: calc(var(--spacing) * 6);
  color: var(--color-white);
  background-color: var(--testimonial-card-bg);
  scroll-snap-align: start;
}

.testimonial-card__quote {
  font-weight: var(--font-weight-semibold);
  line-height: 1.45;
  text-wrap: balance;
}

.testimonial-card__meta {
  display: grid;
  gap: calc(var(--spacing) * 1.5);
  align-content: end;
  max-width: 16rem;
}

.testimonial-card :deep(p),
.testimonial-card :deep(span) {
  color: inherit;
}

.testimonial-card__name,
.testimonial-card__title,
.testimonial-card__detail {
  max-width: none;
  overflow-wrap: anywhere;
}

.testimonial-card__name {
  font-weight: var(--font-weight-bold);
}

.testimonial-card__title,
.testimonial-card__detail {
  color: color-mix(in srgb, var(--color-white) 84%, var(--color-envision-blue-100) 16%);
  line-height: 1.45;
}

.testimonials-nav {
  align-self: start;
  flex-shrink: 0;
}

.testimonials-nav :deep(.paddle-nav) {
  gap: calc(var(--spacing) * 2);
  padding: 0;
}

.testimonials-nav :deep(.nav-arrow) {
  background: color-mix(in srgb, var(--color-white) 86%, var(--color-envision-blue-100) 14%);
  border: 1px solid color-mix(in srgb, var(--ui-border) 60%, transparent);
  transition:
    background-color 180ms ease,
    border-color 180ms ease,
    opacity 180ms ease;
}

.testimonials-nav :deep(.nav-arrow:hover:not(:disabled)) {
  background: color-mix(in srgb, var(--color-white) 72%, var(--color-envision-blue-100) 28%);
  border-color: color-mix(in srgb, var(--color-envision-blue-500) 32%, transparent);
}

.testimonials-nav :deep(.nav-arrow:focus-visible) {
  outline: 2px solid var(--color-envision-blue-500);
  outline-offset: 3px;
}

.testimonials-nav :deep(.nav-arrow:disabled) {
  opacity: 0.35;
}

.is-green {
  --testimonial-card-bg: var(--color-envision-green-600);
}

.is-blue {
  --testimonial-card-bg: var(--color-envision-blue-700);
}

.is-charcoal {
  --testimonial-card-bg: var(--color-envision-gray-700);
}

.divider {
  grid-column: 5;
  width: 1px;
  height: 100%;
  background-color: var(--ui-border);
}

.quote {
  position: relative;
  grid-column: 6 / -1;
  padding-block: 4rem;
  padding-inline: 1rem;
}

.quote::before {
  content: '"';
  position: absolute;
  top: 0;
  left: 0;
  font-size: 15em;
  line-height: 1;
  opacity: 0.2;
  transform: translate(-25%, 0%);
}

@media (max-width: 699px) {
  .testimonials-surface {
    gap: calc(var(--spacing) * 6);
  }

  .l-testimonials-header {
    align-items: start;
    flex-direction: column;
  }

  .testimonials-nav :deep(.paddle-nav) {
    display: none;
  }

  .testimonial-card {
    min-height: 17.5rem;
    padding: calc(var(--spacing) * 5);
  }
}

@media (min-width: 700px) {
  .testimonials-surface {
    padding-inline: calc(var(--spacing) * 10);
  }
}

@media (min-width: 1024px) {
  .testimonials-surface {
    padding-inline: calc(var(--spacing) * 10);
  }
}

@media (max-width: 768px) {
  .quote {
    grid-column: 1 / -1;
    padding-block: 4rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .testimonials-viewport {
    scroll-behavior: auto;
  }
}
</style>
