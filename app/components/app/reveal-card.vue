<script setup lang="ts">const props = withDefaults(defineProps<{
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
  imageHoverBlur?: number;
  imageHoverScale?: number;
  overlay?: string;
  contentPadding?: string;
  contentGap?: string;
  detailsDelay?: string;
  metaDelay?: string;
  detailsFade?: boolean;
  metaFade?: boolean;
  metaBorder?: boolean;
  containerType?: boolean;
  rounded?: boolean;
  outlined?: boolean;
}>(), {
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
  imageHoverBlur: 5,
  imageHoverScale: 1.1,
  overlay: 'linear-gradient(to top, rgb(0 0 0 / 0.85) 0%, rgb(0 0 0 / 0.4) 50%, rgb(0 0 0 / 0) 100%)',
  contentPadding: '1rem',
  contentGap: '0.75rem',
  detailsDelay: '100ms',
  metaDelay: '140ms',
  detailsFade: false,
  metaFade: true,
  metaBorder: true,
  containerType: false,
  rounded: true,
  outlined: true,
});

const imageAlt = computed(() => props.alt || props.ariaLabel);
const hasDetails = computed(() => Boolean(useSlots().details));
const hasMeta = computed(() => Boolean(useSlots().meta));
</script>

<template>
  <NuxtLink
    v-if="linkMode === 'wrap'"
    :to="to"
    :aria-label="ariaLabel"
    prefetch-on="interaction"
    class="reveal-card__wrapper"
    :class="{ 'reveal-card__wrapper--container': containerType }"
  >
    <article
      class="reveal-card"
      :class="{
        'reveal-card--rounded': rounded,
        'reveal-card--outlined': outlined,
      }"
      :style="{
        '--reveal-aspect-ratio': aspectRatio,
        '--reveal-overlay': overlay,
        '--reveal-padding': contentPadding,
        '--reveal-gap': contentGap,
        '--reveal-blur': `${imageHoverBlur}px`,
        '--reveal-scale': String(imageHoverScale),
        '--reveal-object-fit': imageObjectFit,
        '--reveal-details-delay': detailsDelay,
        '--reveal-meta-delay': metaDelay,
      }"
    >
      <NuxtImg
        provider="imagekit"
        :src="image"
        :alt="imageAlt"
        :format="imageFormat"
        :sizes="imageSizes"
        :loading="imageLoading"
        :width="imageWidth"
        :height="imageHeight"
        class="reveal-card__image"
      />
      <div class="reveal-card__content">
        <header class="reveal-card__title">
          <slot name="title" />
        </header>
        <div
          v-if="hasDetails"
          class="reveal-card__details"
          :class="{ 'reveal-card__details--fade': detailsFade }"
        >
          <div class="reveal-card__details-inner">
            <slot name="details" />
          </div>
        </div>
        <footer
          v-if="hasMeta"
          class="reveal-card__meta"
          :class="{
            'reveal-card__meta--fade': metaFade,
            'reveal-card__meta--borderless': !metaBorder,
          }"
        >
          <div class="reveal-card__meta-inner">
            <slot name="meta" />
          </div>
        </footer>
      </div>
    </article>
  </NuxtLink>

  <article
    v-else
    class="reveal-card reveal-card--overlay"
    :class="{
      'reveal-card--rounded': rounded,
      'reveal-card--outlined': outlined,
    }"
    :style="{
      '--reveal-aspect-ratio': aspectRatio,
      '--reveal-overlay': overlay,
      '--reveal-padding': contentPadding,
      '--reveal-gap': contentGap,
      '--reveal-blur': `${imageHoverBlur}px`,
      '--reveal-scale': String(imageHoverScale),
      '--reveal-object-fit': imageObjectFit,
      '--reveal-details-delay': detailsDelay,
      '--reveal-meta-delay': metaDelay,
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
        <slot name="title" />
      </header>
      <div
        v-if="hasDetails"
        class="reveal-card__details"
        :class="{ 'reveal-card__details--fade': detailsFade }"
      >
        <div class="reveal-card__details-inner">
          <slot name="details" />
        </div>
      </div>
      <footer
        v-if="hasMeta"
        class="reveal-card__meta"
        :class="{
          'reveal-card__meta--fade': metaFade,
          'reveal-card__meta--borderless': !metaBorder,
        }"
      >
        <div class="reveal-card__meta-inner">
          <slot name="meta" />
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

.reveal-card__wrapper--container {
  container-type: inline-size;
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
  filter: blur(0);
  will-change: transform, filter;
  transition:
    transform 0.5s var(--ease-base),
    filter 0.5s var(--ease-base);
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

.reveal-card__details {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.5s var(--ease-base);
  transition-behavior: allow-discrete;
}

.reveal-card__details-inner {
  overflow: hidden;
  transform: translateY(0.75rem);
  will-change: transform, opacity;
  transition:
    transform 0.5s var(--ease-base),
    opacity 0.3s var(--ease-base);
  transition-behavior: allow-discrete;
}

.reveal-card__details--fade .reveal-card__details-inner {
  opacity: 0;
  transition:
    transform 0.5s var(--ease-base),
    opacity 0.3s var(--ease-base);
}

.reveal-card__meta {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.5s var(--ease-base);
  transition-behavior: allow-discrete;
}

.reveal-card__meta-inner {
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid transparent;
  padding-top: 0;
  transform: translateY(0.75rem);
  will-change: transform, opacity;
  transition:
    transform 0.5s var(--ease-base),
    opacity 0.3s var(--ease-base),
    border-top-color 0.5s var(--ease-base),
    padding-top 0.5s var(--ease-base);
  transition-behavior: allow-discrete;
}

.reveal-card__meta--borderless .reveal-card__meta-inner {
  border-top: 0;
  padding-top: 0;
}

.reveal-card__meta--fade .reveal-card__meta-inner {
  opacity: 0;
  transition:
    transform 0.5s var(--ease-base),
    opacity 0.3s var(--ease-base);
}

.reveal-card__wrapper:hover .reveal-card__image,
.reveal-card__wrapper:focus-visible .reveal-card__image,
.reveal-card--overlay:hover .reveal-card__image,
.reveal-card--overlay:focus-within .reveal-card__image {
  filter: blur(v-bind('`${props.imageHoverBlur}px`'));
  transform: scale(v-bind('String(props.imageHoverScale)'));
}

.reveal-card__wrapper:hover .reveal-card__details,
.reveal-card__wrapper:focus-visible .reveal-card__details,
.reveal-card--overlay:hover .reveal-card__details,
.reveal-card--overlay:focus-within .reveal-card__details,
.reveal-card__wrapper:hover .reveal-card__meta,
.reveal-card__wrapper:focus-visible .reveal-card__meta,
.reveal-card--overlay:hover .reveal-card__meta,
.reveal-card--overlay:focus-within .reveal-card__meta {
  grid-template-rows: 1fr;
  transform: translateY(0);
}

.reveal-card__wrapper:hover .reveal-card__details-inner,
.reveal-card__wrapper:focus-visible .reveal-card__details-inner,
.reveal-card--overlay:hover .reveal-card__details-inner,
.reveal-card--overlay:focus-within .reveal-card__details-inner,
.reveal-card__wrapper:hover .reveal-card__meta-inner,
.reveal-card__wrapper:focus-visible .reveal-card__meta-inner,
.reveal-card--overlay:hover .reveal-card__meta-inner,
.reveal-card--overlay:focus-within .reveal-card__meta-inner {
  transform: translateY(0);
}

.reveal-card__wrapper:hover .reveal-card__meta:not(.reveal-card__meta--borderless) .reveal-card__meta-inner,
.reveal-card__wrapper:focus-visible .reveal-card__meta:not(.reveal-card__meta--borderless) .reveal-card__meta-inner,
.reveal-card--overlay:hover .reveal-card__meta:not(.reveal-card__meta--borderless) .reveal-card__meta-inner,
.reveal-card--overlay:focus-within .reveal-card__meta:not(.reveal-card__meta--borderless) .reveal-card__meta-inner {
  border-top-color: rgb(255 255 255 / 0.3);
  padding-top: 0.75rem;
}

.reveal-card__wrapper:hover .reveal-card__details--fade .reveal-card__details-inner,
.reveal-card__wrapper:focus-visible .reveal-card__details--fade .reveal-card__details-inner,
.reveal-card--overlay:hover .reveal-card__details--fade .reveal-card__details-inner,
.reveal-card--overlay:focus-within .reveal-card__details--fade .reveal-card__details-inner,
.reveal-card__wrapper:hover .reveal-card__meta--fade .reveal-card__meta-inner,
.reveal-card__wrapper:focus-visible .reveal-card__meta--fade .reveal-card__meta-inner,
.reveal-card--overlay:hover .reveal-card__meta--fade .reveal-card__meta-inner,
.reveal-card--overlay:focus-within .reveal-card__meta--fade .reveal-card__meta-inner {
  opacity: 1;
}

.reveal-card__wrapper:focus-visible,
.reveal-card__overlay-link:focus-visible {
  outline: 2px solid var(--ui-primary);
  outline-offset: 3px;
}

@starting-style {
  .reveal-card__wrapper:hover .reveal-card__details,
  .reveal-card__wrapper:focus-visible .reveal-card__details,
  .reveal-card--overlay:hover .reveal-card__details,
  .reveal-card--overlay:focus-within .reveal-card__details,
  .reveal-card__wrapper:hover .reveal-card__meta,
  .reveal-card__wrapper:focus-visible .reveal-card__meta,
  .reveal-card--overlay:hover .reveal-card__meta,
  .reveal-card--overlay:focus-within .reveal-card__meta {
    grid-template-rows: 0fr;
  }

  .reveal-card__wrapper:hover .reveal-card__details-inner,
  .reveal-card__wrapper:focus-visible .reveal-card__details-inner,
  .reveal-card--overlay:hover .reveal-card__details-inner,
  .reveal-card--overlay:focus-within .reveal-card__details-inner,
  .reveal-card__wrapper:hover .reveal-card__meta-inner,
  .reveal-card__wrapper:focus-visible .reveal-card__meta-inner,
  .reveal-card--overlay:hover .reveal-card__meta-inner,
  .reveal-card--overlay:focus-within .reveal-card__meta-inner {
    transform: translateY(0.75rem);
  }

  .reveal-card__wrapper:hover .reveal-card__details--fade .reveal-card__details-inner,
  .reveal-card__wrapper:focus-visible .reveal-card__details--fade .reveal-card__details-inner,
  .reveal-card--overlay:hover .reveal-card__details--fade .reveal-card__details-inner,
  .reveal-card--overlay:focus-within .reveal-card__details--fade .reveal-card__details-inner,
  .reveal-card__wrapper:hover .reveal-card__meta--fade .reveal-card__meta-inner,
  .reveal-card__wrapper:focus-visible .reveal-card__meta--fade .reveal-card__meta-inner,
  .reveal-card--overlay:hover .reveal-card__meta--fade .reveal-card__meta-inner,
  .reveal-card--overlay:focus-within .reveal-card__meta--fade .reveal-card__meta-inner {
    opacity: 0;
  }
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

@media (max-width: 550px) {
  .reveal-card__meta {
    grid-template-rows: 1fr;
  }

  .reveal-card__meta-inner {
    transform: translateY(0);
    opacity: 1;
  }

  .reveal-card__meta--fade .reveal-card__meta-inner {
    opacity: 1;
  }
}
</style>
