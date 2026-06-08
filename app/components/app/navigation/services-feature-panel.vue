<script setup lang="ts">defineProps<{
  to: string;
  image: string;
  eyebrow: string;
  title: string;
  copy: string;
  linkLabel: string;
  tone?: 'services' | 'projects';
  dataTest?: string;
}>();
</script>

<template>
  <NuxtLink class="feature-panel" :data-test="dataTest" :to="to">
    <div class="content">
      <section-header-a :eyebrow :title :body="copy" />
    </div>
  </NuxtLink>
</template>

<style scoped>
.feature-panel {
  position: relative;
  display: grid;
  grid-template-rows: 10rem auto;
  overflow: hidden;
  color: var(--section-color);
  background-color: var(--color-envision-gray-800);
  text-decoration: none;
  isolation: isolate;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (prefers-reduced-motion: reduce) {
  .services-feature-panel__link::after {
    transition: none;
  }
}
</style>
