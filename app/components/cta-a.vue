<script setup lang="ts">
const props = defineProps<{
  body?: string;
  image?: string;
  flip?: boolean;
  href?: string;
}>();
</script>

<template>
  <section>
    <div class="content" :class="{ 'is-flipped': props.flip }">
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
    </div>
    <NuxtLink v-if="href" :to="href" class="image" :class="{ 'is-flipped': props.flip }">
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
    <div v-else class="image" :class="{ 'is-flipped': props.flip }">
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
  grid-column: 1/-1;
  grid-template-columns: subgrid;
  gap: 0;
  align-items: center;
}

.content {
  z-index: 1;
  grid-column: 1/-1;
  grid-row: 1/-1;
  padding: calc(var(--spacing) * 6);
  height: 100%;
  place-content: center;
  backdrop-filter: contrast(30%) grayscale() blur(5px);
  background: rgb(0 0 0 / 60%);

  @media (min-width: 700px) {
    grid-column: 1/6;

    &.is-flipped {
      grid-column: -7/-1;
      grid-row: 1;
    }
  }

  @media (min-width: 1024px) {
    grid-column: 1/9;

    &.is-flipped {
      grid-column: -9/-1;
      grid-row: 1;
    }
  }
}

.image {
  grid-column: 1/-1;
  grid-row: 1/-1;
  height: unset;
  aspect-ratio: 16/9;

  @media (min-width: 700px) {
    &.is-flipped {
      grid-row: 1;
    }
  }

  @media (min-width: 1024px) {
    &.is-flipped {
      grid-row: 1;
    }
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
}
</style>
