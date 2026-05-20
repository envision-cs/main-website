<script setup lang="ts">
const props = defineProps<{
  image?: string;
  imageAlt?: string;
  body?: string;
  cta?: string;
  ctaTo?: string;
}>();

const slots = useSlots();

const hasEyebrow = computed(() => Boolean(slots.eyebrow || slots.title));
const hasBody = computed(() => Boolean(slots.body || props.body));
</script>

<template>
  <section
    class="banner"
    aria-labelledby="banner-title"
    :aria-describedby="hasBody ? 'banner-body' : undefined"
    role="region"
  >
    <div class="header my-auto">
      <div>
        <app-typography v-if="hasEyebrow" variant="heading-sm" tag="p" class="eyebrow mb-3">
          <slot name="eyebrow">
            <slot name="title" />
          </slot>
        </app-typography>

        <app-typography
          id="banner-title"
          tag="h1"
          variant="heading-huge"
          class="max-w-full md:max-w-[60vw] text-balance"
        >
          <slot />
        </app-typography>
      </div>

      <app-typography v-if="hasBody" id="banner-body" tag="p" variant="text-xl" class="text">
        <slot name="body">
          {{ body }}
        </slot>
      </app-typography>
      <div v-if="ctaTo">
        <my-button :to="ctaTo">
          {{ cta }}
        </my-button>
      </div>
    </div>

    <div class="content site-grid" />

    <div class="overlay" aria-hidden="true" />
    <NuxtImg
      v-if="image"
      :src="image"
      :alt="imageAlt || ''"
      sizes="100vw sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
      fit="cover"
      format="avif"
      preload
      loading="eager"
      class="image h-full w-full z-0 object-cover"
    />
  </section>
</template>

<style scoped>
.banner {
  display: flex;
  isolation: isolate;
  position: relative;
  flex-direction: column;
  gap: calc(var(--spacing) * 4);
  height: 600px;
  grid-column: 1 / -1;
  padding-top: calc(var(--spacing) * 24);
  padding-inline: calc(var(--spacing) * 4);
  padding-bottom: calc(var(--spacing) * 4);
  color: var(--ui-text-inverted);
  overflow: hidden;

  @media (min-width: 700px) {
    padding-inline: calc(var(--spacing) * 8);
    height: 700px;
  }
}

.header {
  display: flex;
  flex-direction: column;
  margin-top: auto;
  position: relative;
  z-index: 2;
  gap: calc(var(--spacing) * 6);
}

.eyebrow {
  text-transform: uppercase;
  font-weight: 600;
}

.content {
  display: grid;
  padding: 0;
  gap: calc(var(--spacing) * 4);
  position: relative;
  z-index: 2;
}

.text {
  grid-column: 1 / -1;
}

@media (min-width: 483px) {
  .text {
    grid-column: span 3;
  }
}

@media (min-width: 700px) {
  .text {
    grid-column: 8 / -1;
  }
}

@media (min-width: 1024px) {
  .text {
    grid-column: 18 / -1;
  }
}

.image-container {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 0;
}

.image {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.overlay {
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(0deg, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.2) 100%),
    linear-gradient(
      -90deg,
      rgba(0, 0, 0, 0) 23.16%,
      rgba(0, 0, 0, 0.2) 64.7%,
      rgba(0, 0, 0, 0.4) 81.1%
    );
}
</style>
