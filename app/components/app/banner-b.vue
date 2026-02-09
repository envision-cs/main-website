<script setup lang="ts">
defineProps<{
  image?: string;
  imageAlt?: string;
  body?: string;
}>();
</script>

<template>
  <section
    class="banner"
    aria-labelledby="banner-title"
    aria-describedby="banner-subtitle banner-body"
    role="region"
  >
    <div class="header my-auto">
      <app-typography
        id="banner-title"
        tag="h1"
        variant="heading-huge"
      >
        <slot />
      </app-typography>

      <app-typography
        id="banner-subtitle"
        tag="p"
        variant="heading-md"
      >
        <slot name="title" />
      </app-typography>
      <app-typography
        id="banner-body"
        tag="p"
        variant="text-md"
        class="text"
      >
        {{ body }}
      </app-typography>
    </div>

    <div class="content site-grid" />

    <div class="overlay" aria-hidden="true" />
    <NuxtImg
      v-if="image"
      :src="image"
      :alt="imageAlt || ''"
      sizes="100vw sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
      fit="cover"
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
  min-height: 350px;
  grid-column: 1 / -1;
  padding-top: calc(var(--spacing) * 24);
  padding-inline: calc(var(--spacing) * 4);
  padding-bottom: calc(var(--spacing) * 4);
  color: var(--ui-text-inverted);
  overflow: hidden;

  @media (min-width: 700px) {
    padding-inline: calc(var(--spacing) * 8);
    min-height: calc(var(--spacing) * 150);
  }
}

.header {
  margin-top: auto;
  position: relative;
  z-index: 2;
}

.content {
  display: grid;
  padding: 0;
  gap: calc(var(--spacing) * 4);
  position: relative;
  z-index: 2;
}

.text {
  margin-top: calc(var(--spacing) * 4);
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
    linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%),
    linear-gradient(180deg, rgba(0, 0, 0, 0) 43.16%, rgba(0, 0, 0, 0.55) 64.7%, rgba(0, 0, 0, 0.6) 81.1%);
}
</style>
