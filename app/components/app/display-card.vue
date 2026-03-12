<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

const props = withDefaults(defineProps<{
  link?: RouteLocationRaw;
  image?: string;
  alt?: string;
  sector?: string;
  title?: string;
  completed?: string;
  ctaLabel?: string;
  aspectRatio?: '5/3' | '4/3' | '16/9' | '3/4' | '1/1' | '3/1';
  heading?: 'heading-sm' | 'heading-md';
}>(), {
  aspectRatio: '16/9',
  heading: 'heading-md',
  ctaLabel: 'View details',
});

const linkTo = computed(() => props.link || '#');
const imageAlt = computed(() => props.alt || props.title || 'Display card image');
</script>

<template>
  <app-reveal-card
    :to="linkTo"
    :aria-label="props.title || 'View details'"
    :image="props.image || ''"
    :alt="imageAlt"
    image-loading="lazy"
    image-sizes="100vw sm:640px md:768px lg:1024px xl:1400px"
    :aspect-ratio="props.aspectRatio"
    :title-offset="12"
    details-delay="100ms"
    meta-delay="140ms"
    :details-fade="true"
    :meta-fade="true"
    class="display-card"
  >
    <template #details>
      <div v-if="props.sector || props.completed" class="display-card__stats">
        <app-typography
          v-if="props.sector"
          tag="p"
          variant="text-sm"
        >
          {{ props.sector }}
        </app-typography>
        <app-typography
          v-if="props.completed"
          tag="p"
          variant="text-sm"
        >
          {{ props.completed }}
        </app-typography>
      </div>
    </template>
    <template #title>
      <app-typography
        tag="h3"
        :variant="props.heading"
        class="display-card__title"
      >
        {{ props.title }}
      </app-typography>
    </template>
    <template #meta>
      <span class="display-card__meta">
        {{ props.ctaLabel }}
        <UIcon
          name="i-lucide-arrow-right"
          size="20"
          aria-hidden="true"
        />
      </span>
    </template>
  </app-reveal-card>
</template>

<style scoped>
.display-card__stats {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
}

.display-card__title {
  text-wrap: balance;
}

.display-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
