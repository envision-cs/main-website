<script setup lang="ts">
defineProps<{
  image?: string;
}>();
</script>

<template>
  <section class="banner">
    <app-typography tag="h1" variant="heading-huge">
      <span>
        <slot name="title" />
      </span>
      <slot />
    </app-typography>
    <div class="content site-grid">
      <!-- <NuxtImg :src="`\/sectors\/${image}.jpg`" alt="USL Super League" class="image aspect-square object-cover" /> -->
      <app-typography
        tag="p"
        variant="text-lg"
        class="text"
      >
        Explore a curated range of Envision’s innovative design, digital, and development projects across the
        Commercial, Industrial, and Corporate sectors throughout Central Florida.
      </app-typography>
      <div class="image-container">
        <slot name="image" class="img" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.banner {
  display: flex;
  isolation: isolate;
  position: relative;
  flex-direction: column;
  gap: calc(var(--spacing) * 4);
  min-height: 280px;
  grid-template-columns: subgrid;
  grid-column: 1/-1;
  padding-top: calc(var(--spacing) * 16);
  color: var(--ui-text-inverted);
  padding-inline: calc(var(--spacing) * 4);
  padding-inline: calc(var(--spacing) * 8);

  @media (min-width: 700px) {
    min-height: calc(var(--spacing) * 150);
  }
}

span {
  font-size: 0.3em;
  color: var(--ui-text-dimmed);
  text-transform: uppercase;
}

.content {
  display: grid;
  padding: 0;
  gap: calc(var(--spacing) * 4);

  .image {
    grid-column: 1/-1;
    width: 100%;
  }

  .text {
    margin-top: auto;
    grid-column: 1/-1;
  }

  @media (min-width: 483px) {
    .image {
      grid-column: span 2;
    }

    .text {
      grid-column: span 3;
    }
  }

  @media (min-width: 700px) {
    .image {
      grid-column: span 4;
    }

    .text {
      grid-column-start: 10;
      grid-column: 8/-1;
    }
  }

  @media (min-width: 1024px) {
    .text {
      grid-column: 18/-1;
    }
  }
}

.image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -10;
  background:
    linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%),
    linear-gradient(180deg, rgba(0, 0, 0, 0) 43.16%, rgba(0, 0, 0, 0.55) 64.7%, rgba(0, 0, 0, 0.6) 81.1%),
    url('/greater-tampa-realtors-02.jpg') lightgray 50% / cover no-repeat;
}
</style>
