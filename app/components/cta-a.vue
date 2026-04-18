<script setup lang="ts">
import { motion, useReducedMotion } from "motion-v";
const props = defineProps<{
  body?: string;
  image?: string;
  flip?: boolean;
  href?: string;
  label?: string;
}>();

const { base } = useEasings();
const shouldReduceMotion = useReducedMotion();
const isFlipped = computed(() => Boolean(props.flip));
</script>

<template>
  <section>
    <div class="content" :class="{ 'is-flipped': isFlipped }">
      <div class="content-inner">
        <app-typography tag="h2" variant="heading-lg" class="cta-panel__title">
          <slot name="title">
            <slot />
          </slot>
        </app-typography>

        <app-typography tag="p" variant="text-xl" class="cta-panel__body">
          {{ body }}
          <slot name="body" />
        </app-typography>

        <div v-if="label" class="cta-panel__actions">
          <my-button variant="primary" size="md" :to="href">{{ label }}</my-button>
        </div>
      </div>
    </div>
    <NuxtLink v-if="href" :to="href" class="image" :class="{ 'is-flipped': isFlipped }">
      <NuxtImg
        :src="image"
        provider="imagekit"
        :modifiers="{ focus: 'bottom' }"
        format="webp"
        loading="lazy"
        class="w-full h-full"
        fit="cover"
        placeholder
      />
    </NuxtLink>
    <div v-else class="image" :class="{ 'is-flipped': isFlipped }">
      <NuxtImg
        :src="image"
        provider="imagekit"
        :modifiers="{ focus: 'bottom' }"
        format="webp"
        loading="lazy"
        class="w-full h-full"
        fit="cover"
        placeholder
      />
    </div>
  </section>
</template>

<style scoped>
section {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  gap: 0;
  align-items: center;
  overflow: clip;
}

.content {
  z-index: 1;
  grid-column: 1 / -1;
  grid-row: 1;
  height: 100%;
  place-content: center;
  will-change: transform, opacity;
  opacity: 1;
  padding-bottom: 0;

  .content-inner {
    display: grid;
    gap: calc(var(--spacing) * 3);
    padding: calc(var(--spacing) * 6);
    height: 100%;
    align-content: end;
    opacity: 1;
    will-change: transform, opacity;
  }

  @media (min-width: 700px) {
    padding-bottom: calc(var(--spacing) * 12);
    grid-column: 1 / 7;
    background: linear-gradient(
      45deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0) 52%,
      rgba(0, 0, 0, 0) 99%
    );

    &.is-flipped {
      grid-column: -7 / -1;
      grid-row: 1;
      background: linear-gradient(
        -45deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0) 52%,
        rgba(0, 0, 0, 0) 99%
      );
    }
  }

  @media (min-width: 1024px) {
    grid-column: 1 / -1;
    background: linear-gradient(
      45deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0) 52%,
      rgba(0, 0, 0, 0) 99%
    );

    &.is-flipped {
      grid-column: 1 / -1;
      grid-row: 1;
      background: linear-gradient(
        45deg,
        rgba(0, 0, 0, 1) 0%,
        rgba(0, 0, 0, 0) 52%,
        rgba(0, 0, 0, 0) 99%
      );
    }
  }
}

.image {
  grid-column: 1 / -1;
  grid-row: 2;
  height: unset;
  overflow: hidden;
  aspect-ratio: 16/9;

  @media (min-width: 700px) {
    grid-row: 1;
  }

  @media (min-width: 1024px) {
    grid-row: 1;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}

.cta-panel__body {
  text-wrap: balance;
  max-width: 50ch;
}

.cta-panel__title {
  max-width: 20ch;
}
</style>
