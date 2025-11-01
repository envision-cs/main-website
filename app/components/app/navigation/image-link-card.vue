<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

defineProps<{
  to: RouteLocationRaw;
  image: string;
}>();
</script>

<template>
  <NuxtLink :to="to" class="image-link-card">
    <img :src="image" class="absolute h-full w-full object-cover ">
    <span class="label text-lg text-white">
      <slot />
    </span>
    <div class="icon">
      <UIcon
        class="arrow-icon"
        name="i-lucide-arrow-right"
        size="32"
      />
    </div>
  </NuxtLink>
</template>

<style scoped>
.image-link-card {
  position: relative;
  display: grid;
  padding: calc(var(--spacing) * 2);
  height: 100%;
  min-height: 200px;
  overflow: hidden;
  isolation: isolate;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.image-link-card img {
  transition: transform 0.3s ease;
}

.image-link-card:hover img {
  transform: scale(1.05);
}

.label {
  font-size: var(--text-lg);
  color: var(--color-white);
  z-index: 10;
  grid-column: 1 / -1;
  grid-row: 1 / -1;
}

.icon {
  z-index: 10;
  grid-column: 1 / -1;
  grid-row: 1 / -1;
  place-self: end;
  background: var(--color-white);
  aspect-ratio: 1;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-40%);
  opacity: 0;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.image-link-card:hover .icon {
  opacity: 1;
  transform: translateX(0);
}
</style>
