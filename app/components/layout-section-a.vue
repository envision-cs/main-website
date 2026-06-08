<script setup lang="ts">withDefaults(
  defineProps<{
    body?: string;
    image?: string;
    flip?: boolean;
    href?: string;
    label?: string;
    title?: string;
    eyebrow?: string;
    bgcolor?: 'light' | 'dark' | 'blue';
  }>(),
  {
    bgcolor: 'light',
  },
);
</script>
<template>
  <section
    :class="{
      dark: bgcolor === 'dark',
      light: bgcolor === 'light',
      blue: bgcolor === 'blue',
    }"
  >
    <slot />
  </section>
</template>

<style scoped>
section {
  display: grid;
  grid-column: 1 / -1;
  place-content: center;
  grid-template-columns: 1fr;
  padding-block: calc(var(--spacing) * 12);
  gap: calc(var(--spacing) * 10);
  align-items: center;
  background-color: var(--section-bg);
  color: var(--section-color);
  max-height: auto;

  @media (width > 120ch) {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
