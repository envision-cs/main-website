<script setup lang="ts">
interface TestimonialItem {
  quote: string;
  name: string;
  title: string;
  detail?: string;
  tone?: "green" | "blue" | "charcoal";
}

const TESTIMONIAL_CARD_IMAGE =
  "https://ik.imagekit.io/pnixsw7lg/main-website/20250519_134053.jpg?updatedAt=1771548280364";

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
      tone: testimonial.tone ?? "charcoal",
    }));
});

const hasTestimonials = computed(() => Boolean(normalizedTestimonials.value.length));
const showRailNavigation = computed(() => normalizedTestimonials.value.length > 1);

const { canScrollPrevious, canScrollNext, scrollPrevious, scrollNext, handleKeydown } =
  useScrollGallery(scrollContainer, items);

useTouchHandler(scrollContainer);
</script>

<template>
  <section v-if="hasTestimonials" class="testimonials-section">
    <div class="site-grid section-shell">
      <div class="intro">
        <app-typography tag="h2" variant="heading-lg" class="intro-title">
          {{ sectionTitle }}
        </app-typography>
        <div class="rail-meta intro-actions">
          <app-gallery-paddle-nav
            v-if="showRailNavigation"
            :can-scroll-previous="canScrollPrevious"
            :can-scroll-next="canScrollNext"
            @previous="scrollPrevious"
            @next="scrollNext"
          />
        </div>
      </div>

      <div class="rail-shell">
        <div
          ref="scrollContainer"
          class="scroll-container"
          :tabindex="showRailNavigation ? 0 : -1"
          aria-label="Client testimonials"
          @keydown="handleKeydown"
        >
          <ul class="rail card-set" role="list">
            <li
              v-for="(testimonial, index) in normalizedTestimonials"
              :key="`${testimonial.name}-${index}`"
              class="card gallery-item"
              :class="`tone-${testimonial.tone ?? 'charcoal'}`"
              :style="{ '--card-delay': `${index * 90}ms` }"
            >
              <div class="media" aria-hidden="true">
                <img
                  :src="TESTIMONIAL_CARD_IMAGE"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  class="media-image"
                />
                <div class="media-overlay" />
              </div>

              <app-typography tag="p" variant="heading-sm" class="card-quote">
                <span dir="auto">"{{ testimonial.quote }}"</span>
              </app-typography>

              <div class="card-footer">
                <app-typography tag="p" variant="text-md" class="name">
                  <span dir="auto">{{ testimonial.name }}</span>
                </app-typography>
                <app-typography tag="p" variant="text-sm" class="title">
                  <span dir="auto">{{ testimonial.title }}</span>
                </app-typography>
                <app-typography v-if="testimonial.detail" tag="p" variant="text-sm" class="detail">
                  <span dir="auto">{{ testimonial.detail }}</span>
                </app-typography>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <section v-else class="site-grid bg-white z-10">
    <div class="divider" />
    <div class="quote">
      <app-typography variant="heading-md" tag="p" class="text-balance">
        {{ quote || "Clients trust Envision to communicate clearly and follow through." }}
      </app-typography>
      <app-typography v-if="name" variant="heading-sm" tag="p" class="text-balance mt-4">
        {{ name }}
      </app-typography>
      <app-typography v-if="title" variant="text-md" tag="p" class="text-balance">
        {{ title }}
      </app-typography>
    </div>
  </section>
</template>

<style scoped>
.testimonials-section {
  border-block: 1px solid var(--ui-border);
  background-color: color-mix(in srgb, var(--color-white) 96%, var(--color-envision-gray-300) 4%);
  content-visibility: auto;
  contain-intrinsic-size: 900px;
}

.section-shell {
  container-type: inline-size;
  row-gap: calc(var(--spacing) * 4);
}

.intro,
.rail-shell {
  grid-column: 1 / -1;
}

.intro {
  display: grid;
  gap: calc(var(--spacing) * 2);
  padding-block: 0;
}

.intro-title {
  max-width: 10ch;
  font-weight: 600;
  letter-spacing: 0;
  text-transform: uppercase;
}

.rail-shell {
  min-width: 0;
}

.rail-meta {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: calc(var(--spacing) * 3);
  margin-bottom: calc(var(--spacing) * 2);
}

.intro-actions {
  justify-content: start;
  margin-bottom: 0;
}

.scroll-container {
  min-width: 0;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: var(--color-envision-blue-500) transparent;
  -webkit-overflow-scrolling: touch;
}

.scroll-container:focus-visible {
  outline: 2px solid var(--color-envision-blue-500);
  outline-offset: 4px;
}

.rail {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(18.5rem, 92vw);
  margin: 0;
  list-style: none;
  scroll-snap-type: x proximity;
}

.card {
  --panel-color: color-mix(in srgb, var(--color-envision-gray-700) 88%, black 12%);
  --panel-highlight: color-mix(in srgb, var(--color-white) 18%, var(--panel-color) 82%);
  --panel-shadow: color-mix(in srgb, black 24%, var(--panel-color) 76%);

  scroll-snap-align: start;
  position: relative;
  display: grid;
  align-content: space-between;
  min-height: 21rem;
  min-width: 0;
  padding: calc(var(--spacing) * 4);
  overflow: hidden;
  isolation: isolate;
  color: var(--color-white);
  background-color: var(--panel-color);
  box-shadow:
    inset 0 1px 0 color-mix(in srgb, var(--color-white) 14%, transparent),
    inset 0 -5rem 6rem var(--panel-shadow);
}

.media {
  position: absolute;
  inset: 0;
  z-index: -2;
}

.media-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.28;
  filter: grayscale(1) contrast(0.7);
}

.media-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--panel-highlight) 42%, transparent) 0%,
      transparent 36%
    ),
    linear-gradient(
      180deg,
      transparent 22%,
      color-mix(in srgb, var(--panel-shadow) 75%, transparent) 100%
    ),
    var(--panel-color);
  mix-blend-mode: multiply;
}

.tone-green {
  --panel-color: color-mix(in srgb, var(--color-envision-green-700) 88%, black 12%);
  --panel-highlight: color-mix(
    in srgb,
    var(--color-envision-green-300) 36%,
    var(--panel-color) 64%
  );
}

.tone-blue {
  --panel-color: color-mix(in srgb, var(--color-envision-blue-700) 84%, black 16%);
  --panel-highlight: color-mix(in srgb, var(--color-envision-blue-300) 32%, var(--panel-color) 68%);
}

.tone-charcoal {
  --panel-color: color-mix(in srgb, var(--color-envision-gray-700) 92%, black 8%);
  --panel-highlight: color-mix(in srgb, var(--color-envision-blue-200) 18%, var(--panel-color) 82%);
}

.card-quote {
  max-width: 12ch;
  min-width: 0;
  padding-top: 0;
  font-size: clamp(1.5rem, 5vw, 2.25rem);
  line-height: 1.15;
  letter-spacing: 0.02em;
  color: var(--color-white);
  text-wrap: balance;
  overflow-wrap: anywhere;
  hyphens: auto;
}

.card-footer {
  display: grid;
  gap: calc(var(--spacing) * 1);
  align-self: end;
  min-width: 0;
  max-width: 19ch;
  text-transform: uppercase;
  color: var(--color-white);
}

.card :deep(p),
.card :deep(span) {
  color: var(--color-white);
}

.name,
.title,
.detail {
  max-inline-size: none;
  color: inherit;
  overflow-wrap: anywhere;
  hyphens: auto;
}

.name {
  font-weight: var(--font-weight-bold);
}

.title,
.detail {
  font-size: var(--font-size-text-t4);
  line-height: 1.2;
  letter-spacing: 0.02em;
}

.detail {
  display: inline-flex;
  width: fit-content;
  max-width: 100%;
  padding-inline: calc(var(--spacing) * 2);
  padding-block: calc(var(--spacing) * 1);
  margin-top: calc(var(--spacing) * 2);
  background-color: color-mix(in srgb, var(--panel-highlight) 24%, transparent);
}

.rail-shell :deep(.paddle-nav) {
  gap: calc(var(--spacing) * 2);
  padding: 0;
}

.rail-shell :deep(.nav-arrow) {
  background: color-mix(in srgb, var(--color-white) 82%, var(--color-envision-blue-100) 18%);
  transition:
    transform 180ms ease,
    background-color 180ms ease,
    opacity 180ms ease;
}

.rail-shell :deep(.nav-arrow:focus-visible) {
  outline: 2px solid var(--color-envision-blue-500);
  outline-offset: 3px;
}

.rail-shell :deep(.nav-arrow:disabled) {
  opacity: 0.4;
}

@container (width < 30rem) {
  .rail-meta {
    align-items: start;
    flex-direction: column;
  }
}

@media (prefers-reduced-motion: reduce) {
  .scroll-container {
    scroll-behavior: auto;
  }
}

@media (max-width: 699px) {
  .rail-meta {
    margin-bottom: calc(var(--spacing) * 2);
  }

  .rail-shell :deep(.paddle-nav) {
    display: none;
  }

  .card {
    min-height: 19.5rem;
    padding: calc(var(--spacing) * 3);
  }

  .card-quote {
    max-width: 13ch;
  }
}

section {
  border-bottom: 1px solid var(--ui-border);
}

.divider {
  height: 100%;
  width: 1px;
  background-color: var(--ui-border);
  grid-column: 5;
}

.quote {
  grid-column: 6/-1;
  padding-block: 4rem;
  padding-inline: 1rem;
  position: relative;

  &:before {
    content: '"';
    position: absolute;
    top: 0;
    left: 0;
    line-height: 1;
    font-size: 15em;
    opacity: 0.2;
    transform: translate(-25%, 0%);
  }

  @media (max-width: 768px) {
    grid-column: 1/-1;
    padding-block: 4rem;
  }
}

@media (min-width: 700px) {
  .section-shell {
    row-gap: calc(var(--spacing) * 5);
  }

  .intro {
    grid-column: 2 / 8;
    padding-inline: 0;
    max-width: 30rem;
  }

  .rail-shell {
    grid-column: 2 / -1;
  }

  .rail-meta {
    padding-inline: 0;
  }

  .rail {
    grid-auto-columns: minmax(24rem, 72vw);
    padding-inline: 0;
  }

  .card {
    min-height: 22rem;
  }
}

@media (min-width: 1024px) {
  .section-shell {
    align-items: stretch;
    column-gap: calc(var(--spacing) * 6);
  }

  .intro {
    grid-column: 2 / 7;
    align-self: center;
  }

  .rail-shell {
    grid-column: 8 / 25;
  }

  .rail {
    grid-auto-columns: minmax(24rem, 28rem);
  }

  .card {
    min-height: 22rem;
  }
}

@media (min-width: 1440px) {
  .section-shell {
    column-gap: calc(var(--spacing) * 8);
  }

  .intro {
    grid-column: 3 / 8;
  }

  .rail-shell {
    grid-column: 9 / 25;
  }

  .rail {
    grid-auto-columns: minmax(25rem, 27rem);
  }
}
</style>
