<script setup lang="ts">
import { motion, useReducedMotion } from "motion-v";
const props = defineProps<{
  body?: string;
  image?: string;
  flip?: boolean;
  href?: string;
}>();

const { base } = useEasings();
const shouldReduceMotion = useReducedMotion();
const isFlipped = computed(() => Boolean(props.flip));

const contentOffset = computed(() => {
  if (shouldReduceMotion.value) {
    return 0;
  }

  return isFlipped.value ? "100%" : "-100%";
});

const textOffset = computed(() => {
  if (shouldReduceMotion.value) {
    return 0;
  }

  return isFlipped.value ? "100%" : "-100%";
});

const contentTransition = computed(() => ({
  duration: shouldReduceMotion.value ? 0.2 : 0.7,
  easing: base,
}));

const textTransition = computed(() => ({
  duration: shouldReduceMotion.value ? 0.2 : 0.55,
  delay: shouldReduceMotion.value ? 0 : 0.18,
  easing: base,
}));
</script>

<template>
  <section>
    <motion.div
      class="content"
      :class="{ 'is-flipped': isFlipped }"
      :initial="{ opacity: 1, x: contentOffset }"
      :while-in-view="{ x: 0 }"
      :transition="contentTransition"
      :viewport="{ once: true, amount: 0.35 }"
    >
      <motion.div
        class="content-inner"
        :initial="{ opacity: 0, x: textOffset }"
        :while-in-view="{ opacity: 1, x: 0 }"
        :transition="textTransition"
        :viewport="{ once: true, amount: 0.35, delay: 0.2 }"
      >
        <app-typography tag="h2" variant="heading-lg" class="cta-panel__title">
          <slot name="title">
            <slot />
          </slot>
        </app-typography>

        <app-typography tag="p" variant="text-xl" class="cta-panel__body">
          {{ body }}
          <slot name="body" />
        </app-typography>

        <div class="cta-panel__actions">
          <template v-if="href">
            <app-button :to="href" color="secondary" variant="solid">Learn More</app-button>
          </template>
          <slot name="action" />
        </div>
      </motion.div>
    </motion.div>
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
}

.content {
  z-index: 1;
  grid-column: 1 / -1;
  grid-row: 1;
  height: 100%;
  place-content: center;
  backdrop-filter: contrast(30%) grayscale() blur(5px);
  background: rgb(0 0 0 / 60%);
  will-change: transform, opacity;

  .content-inner {
    display: grid;
    gap: calc(var(--spacing) * 3);
    padding: calc(var(--spacing) * 6);
    height: 100%;
    align-content: center;
    will-change: transform, opacity;
  }

  @media (min-width: 700px) {
    grid-column: 1 / 7;

    &.is-flipped {
      grid-column: -7 / -1;
      grid-row: 1;
    }
  }

  @media (min-width: 1024px) {
    grid-column: 1 / 9;

    &.is-flipped {
      grid-column: -9 / -1;
      grid-row: 1;
    }
  }
}

.image {
  grid-column: 1 / -1;
  grid-row: 2;
  height: unset;
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
</style>
