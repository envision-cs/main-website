<script setup lang="ts">
defineProps<{
  body?: string;
  image?: string;
  flip?: boolean;
  href?: string;
}>();
</script>

<template>
  <section>
    <div class="content">
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
    <div class="image">
      <NuxtImg
        :src="image"
        provider="imagekit"
        :modifiers="{ focus: 'bottom', aspectRatio: '16/9' }"
        format="webp"
        loading="lazy"
        sizes="100vw sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
        class="cta-panel__image"
        fit="exact"
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
  gap: calc(var(--spacing) * 8);
  padding-inline: calc(var(--spacing) * 4);
  padding-block: calc(var(--spacing) * 16);
  align-items: center;
}

.content {
  grid-column: 1/-1;

  @media (min-width: 700px) {
    grid-column: 1/6;
  }

  @media (min-width: 1024px) {
    grid-column: 1/9;
  }
}

.image {
  grid-column: 1/-1;

  @media (min-width: 700px) {
    grid-column: 6/-1;
  }

  @media (min-width: 1024px) {
    grid-column: 10/-1;
  }
}
</style>
