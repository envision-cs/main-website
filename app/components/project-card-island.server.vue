<script setup lang="ts">
// Server-only (island) variant of project-card for large lists (e.g. /projects).
// Renders zero client JS: no hydration, no SPA-nav interception. Wrap-mode + props
// only — no slots, no overlay variant. Hover/focus motion is pure CSS, so nothing
// is lost visually. Links degrade to plain anchors (full navigation).
const props = withDefaults(
  defineProps<{
    to?: string;
    ariaLabel?: string;
    image: string;
    alt?: string;
    imageFormat?: string;
    imageQuality?: number;
    imageSizes?: string;
    imageDensities?: string;
    imageLoading?: 'lazy' | 'eager';
    imageWidth?: string | number;
    imageHeight?: string | number;
    aspectRatio?: '5/3' | '4/3' | '16/9' | '3/4' | '1/1' | '3/1';
    imageObjectFit?: 'cover' | 'fill' | 'contain';
    imageHoverScale?: number;
    overlay?: string;
    contentPadding?: string;
    contentGap?: string;
    title?: string;
    subtitle?: string;
    location?: string;
    completed?: string;
    sector?: string;
    metaBorder?: boolean;
    outlined?: boolean;
  }>(),
  {
    to: '#',
    ariaLabel: 'View details',
    alt: '',
    imageFormat: 'avif',
    // Inherit the global image.quality (nuxt.config) unless a page overrides it.
    imageQuality: undefined,
    imageSizes: '100vw sm:50vw lg:33vw xl:33vw 2xl:25vw',
    imageDensities: 'x1 x2',
    imageLoading: 'lazy',
    imageWidth: undefined,
    imageHeight: undefined,
    aspectRatio: '16/9',
    imageObjectFit: 'cover',
    imageHoverScale: 1.04,
    overlay:
      'linear-gradient(to top, rgb(0 0 0 / 0.85) 0%, rgb(0 0 0 / 0.4) 50%, rgb(0 0 0 / 0) 100%)',
    contentPadding: '1rem',
    contentGap: '0.75rem',
    title: undefined,
    subtitle: undefined,
    location: undefined,
    completed: undefined,
    sector: undefined,
    metaBorder: true,
    outlined: true,
  },
);

const imageAlt = computed(() => props.alt || props.ariaLabel);
const hasProjectDetails = computed(() => Boolean(props.location || props.completed));
const hasMeta = computed(() => Boolean(props.sector));
</script>

<template>
  <NuxtLink :to="to" :aria-label="ariaLabel" class="reveal-card__wrapper">
    <article
      class="reveal-card"
      :class="{
        'reveal-card--outlined': outlined,
      }"
    >
      <NuxtImg
        provider="imagekit"
        :src="image"
        :alt="imageAlt"
        :format="imageFormat"
        :quality="imageQuality"
        :loading="imageLoading"
        :width="imageWidth"
        :sizes="imageSizes"
        :densities="imageDensities"
        :height="imageHeight"
        decoding="async"
        class="reveal-card__image"
      />
      <div class="reveal-card__content">
        <header class="reveal-card__title">
          <app-typography v-if="title" tag="h3" class="reveal-card__heading" variant="heading-md">
            {{ title }}
          </app-typography>
          <app-typography
            v-if="subtitle"
            tag="p"
            variant="text-md"
            class="reveal-card__subtitle"
          >
            {{ subtitle }}
          </app-typography>
        </header>
        <div v-if="hasProjectDetails" class="reveal-card__details">
          <div class="reveal-card__details-inner">
            <ul class="reveal-card__stats">
              <li v-if="location">
                <app-typography tag="p" variant="text-sm" bold> Location </app-typography>
                <app-typography tag="p">
                  {{ location }}
                </app-typography>
              </li>
              <li v-if="completed">
                <app-typography tag="p" variant="text-sm" bold> Completion </app-typography>
                <app-typography tag="p">
                  {{ completed }}
                </app-typography>
              </li>
            </ul>
          </div>
        </div>
        <footer
          v-if="hasMeta"
          class="reveal-card__meta"
          :class="{
            'reveal-card__meta--borderless': !metaBorder,
          }"
        >
          <div class="reveal-card__meta-inner">
            <div v-if="sector" class="reveal-card__sector">
              {{ sector }}
              <UIcon name="i-lucide-arrow-right" />
            </div>
          </div>
        </footer>
      </div>
    </article>
  </NuxtLink>
</template>

<style scoped>
.reveal-card__wrapper {
  container-type: inline-size;
  display: block;
  overflow: hidden;
  text-decoration: none;
}

.reveal-card {
  position: relative;
  aspect-ratio: v-bind('props.aspectRatio');
  overflow: hidden;
  isolation: isolate;
  color: var(--ui-text-inverted);
  background: var(--color-envision-gray-900);
}

.reveal-card--outlined {
  outline: 1px solid rgb(255 255 255 / 0.2);
}

.reveal-card::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: v-bind('props.overlay');
}

.reveal-card__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: v-bind('props.imageObjectFit');
  z-index: 0;
  transform: scale(1);
  transition: transform 320ms var(--ease-gentle);
}

.reveal-card__content {
  position: absolute;
  inset: auto 0 0;
  z-index: 3;
  display: grid;
  gap: v-bind('props.contentGap');
  padding: v-bind('props.contentPadding');
}

.reveal-card__title {
  text-wrap: balance;
}

.reveal-card__heading {
  margin-bottom: 0.5rem;
  text-wrap: balance;
  font-size: clamp(1.25rem, 5.25cqi, 2.25rem);
  line-height: 1.05;
}

.reveal-card__subtitle {
  margin-top: -0.25rem;
  opacity: 0.85;
}

.reveal-card__details {
  display: block;
}

.reveal-card__details-inner {
  overflow: hidden;
}

.reveal-card__meta {
  display: block;
}

.reveal-card__meta-inner {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid transparent;
  padding-top: 0.75rem;
}

.reveal-card__meta--borderless .reveal-card__meta-inner {
  border-top: 0;
  padding-top: 0;
}

.reveal-card__meta:not(.reveal-card__meta--borderless) .reveal-card__meta-inner {
  border-top-color: rgb(255 255 255 / 0.3);
}

.reveal-card__stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem 1rem;
  margin-bottom: 1rem;
}

.reveal-card__sector {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.reveal-card__wrapper:hover .reveal-card__image,
.reveal-card__wrapper:focus-visible .reveal-card__image {
  transform: scale(v-bind('String(props.imageHoverScale)'));
  will-change: transform;
}

.reveal-card__wrapper:focus-visible {
  outline: 2px solid var(--ui-primary);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .reveal-card,
  .reveal-card__image,
  .reveal-card__content,
  .reveal-card__details,
  .reveal-card__meta {
    transition: none !important;
    animation: none !important;
  }
}
</style>