<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

defineProps<{
  to: RouteLocationRaw;
}>();
</script>

<template>
  <NuxtLink :to>
    <slot />
  </NuxtLink>
</template>

<style scoped>
a {
  font-size: var(--text-lg);
  position: relative;
}

a::after {
  content: '';
  height: 1px;
  width: 0%;
  left: 0;
  bottom: var(--spacing);
  background: var(--ui-border);
  position: absolute;
  transition: width 0.2s ease-in-out;
}

a:hover::after {
  width: 100%;
}
</style>
