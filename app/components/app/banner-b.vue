<script setup lang="ts">
defineProps<{
  image?: string;
}>();
</script>

<template>
  <section class="banner">
    <app-typography tag="h1" variant="heading-xl">
      <span>
        <slot name="title" />
      </span>
      <br>
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
    </div>
  </section>
</template>

<style scoped>
.banner {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 4);
  min-height: 280px;
  margin-top: calc(var(--spacing) * 15);
  grid-template-columns: subgrid;
  grid-column: 1/-1;

  @media (min-width: 700px) {
    min-height: 450px;
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
  padding-bottom: calc(var(--spacing) * 4);

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
      grid-column: span 2;
    }
  }

  @media (min-width: 700px) {
    .image {
      grid-column: span 4;
    }

    .text {
      grid-column-start: 10;
      grid-column: 9/-1;
    }
  }

  @media (min-width: 1024px) {
    .text {
      grid-column: 20/-1;
    }
  }
}
</style>
