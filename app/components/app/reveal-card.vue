<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core';

const props = withDefaults(defineProps<{
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
  titleOffset?: number;
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
  titleOffset: 8,
  detailsDelay: '100ms',
  metaDelay: '140ms',
  detailsFade: false,
  metaFade: true,
  metaBorder: true,
  containerType: false,
  rounded: true,
  outlined: true,
});

const titleRef = useTemplateRef<HTMLDivElement | null>('titleRef');
const titleHeight = ref(0);

function updateHeight() {
  titleHeight.value = titleRef.value?.clientHeight ?? 0;
}

useResizeObserver(titleRef, (entries) => {
  const entry = entries[0];
  if (entry) {
    titleHeight.value = entry.contentRect.height;
  }
});

onMounted(() => {
  updateHeight();
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
        '--reveal-title-height': `${Math.max(titleHeight - titleOffset, 0)}px`,
        '--reveal-blur': `${imageHoverBlur}px`,
        '--reveal-scale': String(imageHoverScale),
        '--reveal-object-fit': imageObjectFit,
        '--reveal-details-delay': detailsDelay,
        '--reveal-meta-delay': metaDelay,
      }"
    >
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
        <header ref="titleRef" class="reveal-card__title">
          <slot name="title" />
        </header>
        <div
          v-if="hasDetails"
          class="reveal-card__details"
          :class="{ 'reveal-card__details--fade': detailsFade }"
        >
          <slot name="details" />
        </div>
        <footer
          v-if="hasMeta"
          class="reveal-card__meta"
          :class="{
            'reveal-card__meta--fade': metaFade,
            'reveal-card__meta--borderless': !metaBorder,
          }"
        >
          <slot name="meta" />
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
      '--reveal-title-height': `${Math.max(titleHeight - titleOffset, 0)}px`,
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
      <header ref="titleRef" class="reveal-card__title">
        <slot name="title" />
      </header>
      <div
        v-if="hasDetails"
        class="reveal-card__details"
        :class="{ 'reveal-card__details--fade': detailsFade }"
      >
        <slot name="details" />
      </div>
      <footer
        v-if="hasMeta"
        class="reveal-card__meta"
        :class="{
          'reveal-card__meta--fade': metaFade,
          'reveal-card__meta--borderless': !metaBorder,
        }"
      >
        <slot name="meta" />
      </footer>
    </div>
  </article>
</template>

<style scoped>
.reveal-card__wrapper {
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

.reveal-card--rounded {
  border-radius: calc(var(--ui-radius));
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
  transform: translateY(calc(90% - v-bind('`${Math.max(titleHeight - props.titleOffset, 0)}px`')));
  transition: transform 0.5s var(--ease-base);
}

.reveal-card__title {
  text-wrap: balance;
}

.reveal-card__details {
  transform: translateY(100%);
  transition: transform 0.5s var(--ease-base);
  transition-delay: v-bind('props.detailsDelay');
}

.reveal-card__details--fade {
  opacity: 0;
  transition:
    transform 0.5s var(--ease-base),
    opacity 0.3s var(--ease-base);
}

.reveal-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgb(255 255 255 / 0.3);
  padding-top: 0.75rem;
  transform: translateY(100%);
  transition: transform 0.5s var(--ease-base);
  transition-delay: v-bind('props.metaDelay');
}

.reveal-card__meta--borderless {
  border-top: 0;
  padding-top: 0;
}

.reveal-card__meta--fade {
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

.reveal-card__wrapper:hover .reveal-card__content,
.reveal-card__wrapper:focus-visible .reveal-card__content,
.reveal-card--overlay:hover .reveal-card__content,
.reveal-card--overlay:focus-within .reveal-card__content,
.reveal-card__wrapper:hover .reveal-card__details,
.reveal-card__wrapper:focus-visible .reveal-card__details,
.reveal-card--overlay:hover .reveal-card__details,
.reveal-card--overlay:focus-within .reveal-card__details,
.reveal-card__wrapper:hover .reveal-card__meta,
.reveal-card__wrapper:focus-visible .reveal-card__meta,
.reveal-card--overlay:hover .reveal-card__meta,
.reveal-card--overlay:focus-within .reveal-card__meta {
  transform: translateY(0);
}

.reveal-card__wrapper:hover .reveal-card__details--fade,
.reveal-card__wrapper:focus-visible .reveal-card__details--fade,
.reveal-card--overlay:hover .reveal-card__details--fade,
.reveal-card--overlay:focus-within .reveal-card__details--fade,
.reveal-card__wrapper:hover .reveal-card__meta--fade,
.reveal-card__wrapper:focus-visible .reveal-card__meta--fade,
.reveal-card--overlay:hover .reveal-card__meta--fade,
.reveal-card--overlay:focus-within .reveal-card__meta--fade {
  opacity: 1;
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
