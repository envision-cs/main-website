<script setup lang="ts">import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <SpeedInsights />
  </UApp>
</template>

<style>
/* Utilities */
.u-visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  border: 0;
}

.site-grid {
  margin-inline: auto;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  grid-template-areas: 'c c c c';
}

@media (min-width: 700px) {
  .site-grid {
    grid-template-columns: repeat(12, minmax(0, 1fr));
    grid-template-areas: 'a a a . b c c c c c c c ';

    &.flip {
      grid-template-areas: 'c c c c c c c b . a a a';
    }
  }
}

@media (min-width: 1024px) {
  .site-grid {
    grid-template-columns: repeat(24, minmax(0, 1fr));
    grid-template-areas: 'a a a a . . . . . . . . . b c c c c c c c c c';

    &.flip {
      grid-template-areas: 'c c c c c c c c c b . . . . . . . . . a a a a';
    }
  }
}

.section {
  padding-block: calc(var(--spacing) * 8);
  padding-inline: calc(var(--spacing) * 0);
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  gap: 0;
}

.list {
  list-style: disc outside;
  padding-left: 1.25rem;
  margin-top: 1rem;
}

.light {
  --section-bg: color-mix(in oklab, var(--color-envision-gray-900) 2%, white);
  --section-color: var(--color-envision-gray-900);
  --accent-color: var(--color-envision-blue-500);
  --card-bg: var(--color-white);
  --card-border: 1px solid color-mix(in oklch, var(--section-bg) 90%, var(--section-color));
}

.dark {
  --section-bg: var(--color-envision-gray-900);
  --section-color: var(--color-white);
  --accent-color: var(--color-envision-green-500);
}

.blue {
  --section-bg: var(--color-envision-blue-950);
  --section-color: var(--color-white);
  --accent-color: var(--color-envision-blue-500);
}
</style>
