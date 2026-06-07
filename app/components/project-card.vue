<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    to?: string;
    ariaLabel?: string;
    image: string;
    alt?: string;
    imageFormat?: string;
    imageSizes?: string;
    imageDensities?: string;
    imageLoading?: 'lazy' | 'eager';
    imageWidth?: string | number;
    imageHeight?: string | number;
    aspectRatio?: '5/3' | '4/3' | '16/9' | '3/4' | '1/1' | '3/1';
    linkMode?: 'wrap' | 'overlay';
    imageObjectFit?: 'cover' | 'fill' | 'contain';
    imageHoverScale?: number;
    overlay?: string;
    contentPadding?: string;
    contentGap?: string;
    title?: string;
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
    imageFormat: 'webp',
    imageSizes: undefined,
    imageDensities: undefined,
    imageLoading: undefined,
    imageWidth: undefined,
    imageHeight: undefined,
    aspectRatio: '16/9',
    linkMode: 'wrap',
    imageObjectFit: 'cover',
    imageHoverScale: 1.1,
    overlay:
      'linear-gradient(to top, rgb(0 0 0 / 0.85) 0%, rgb(0 0 0 / 0.4) 50%, rgb(0 0 0 / 0) 100%)',
    contentPadding: '1rem',
    contentGap: '0.75rem',
    title: undefined,
    location: undefined,
    completed: undefined,
    sector: undefined,
    metaBorder: true,
    outlined: true,
  },
);

const imageAlt = computed(() => props.alt || props.ariaLabel);
const hasProjectDetails = computed(() => Boolean(props.location || props.completed));
const hasDetails = computed(() => Boolean(useSlots().details || hasProjectDetails.value));
const hasMeta = computed(() => Boolean(useSlots().meta || props.sector));
</script>

<template>
  <NuxtLink
    v-if="linkMode === 'wrap'"
    :to="to"
    :aria-label="ariaLabel"
    prefetch-on="interaction"
    class="reveal-card__wrapper"
  >
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
        :loading="imageLoading"
        :width="imageWidth"
        sizes="400px md:500px lg:700px"
        :height="imageHeight"
        class="reveal-card__image"
      />
      <div class="reveal-card__content">
        <header class="reveal-card__title">
          <slot name="title">
            <app-typography v-if="title" tag="h3" class="reveal-card__heading" variant="heading-md">
              {{ title }}
            </app-typography>
          </slot>
        </header>
        <div v-if="hasDetails" class="reveal-card__details">
          <div class="reveal-card__details-inner">
            <slot name="details">
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
            </slot>
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
            <slot name="meta">
              <div v-if="sector" class="reveal-card__sector">
                {{ sector }}
                <UIcon name="i-lucide-arrow-right" />
              </div>
            </slot>
          </div>
        </footer>
      </div>
    </article>
  </NuxtLink>

  <article
    v-else
    class="reveal-card reveal-card--overlay"
    :class="{
      'reveal-card--outlined': outlined,
    }"
  >
    <NuxtLink
      :to="to"
      :aria-label="ariaLabel"
      prefetch-on="interaction"
      class="reveal-card__overlay-link"
    />
    <NuxtImg
      :src="image"
      :alt="imageAlt"
      :format="imageFormat"
      :sizes="imageSizes"
      :densities="imageDensities"
      :loading="imageLoading"
      :width="imageWidth"
      :height="imageHeight"
      class="reveal-card__image"
    />
    <div class="reveal-card__content">
      <header class="reveal-card__title">
        <slot name="title">
          <app-typography v-if="title" tag="h3" class="reveal-card__heading" variant="heading-md">
            {{ title }}
          </app-typography>
        </slot>
      </header>
      <div v-if="hasDetails" class="reveal-card__details">
        <div class="reveal-card__details-inner">
          <slot name="details">
            <ul class="reveal-card__stats">
              <li v-if="location">
                <app-typography tag="p" variant="text-sm" bold> Location </app-typography>
                <app-typography tag="p">
                  {{ location }}
                </app-typography>
              </li>
              <li v-if="completed">
                <app-typography tag="p" variant="text-sm"> Completion </app-typography>
                <app-typography tag="p">
                  {{ completed }}
                </app-typography>
              </li>
            </ul>
          </slot>
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
          <slot name="meta">
            <div v-if="sector" class="reveal-card__sector">
              {{ sector }}
              <UIcon name="i-lucide-arrow-right" />
            </div>
          </slot>
        </div>
      </footer>
    </div>
  </article>
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

.reveal-card__overlay-link {
  position: absolute;
  inset: 0;
  z-index: 2;
}

.reveal-card__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: v-bind('props.imageObjectFit');
  z-index: 0;
  transform: scale(1);
  transition: transform 0.5s var(--ease-base);
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
  font-size: 1cqh;
}

.reveal-card__heading {
  margin-bottom: 0.5rem;
  text-wrap: balance;
  font-size: 3cqh;
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
.reveal-card__wrapper:focus-visible .reveal-card__image,
.reveal-card--overlay:hover .reveal-card__image,
.reveal-card--overlay:focus-within .reveal-card__image {
  transform: scale(v-bind('String(props.imageHoverScale)'));
  will-change: transform;
}

.reveal-card__wrapper:focus-visible,
.reveal-card__overlay-link:focus-visible {
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
