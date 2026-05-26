<script setup lang="ts">
withDefaults(
  defineProps<{
    body?: string;
    title?: string;
    eyebrow?: string;
    bgcolor?: "light" | "dark" | "blue";
  }>(),
  {
    bgcolor: "light",
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
    <div class="content-wrapper">
      <div class="header">
        <app-typograpy>
          {{ title }}
        </app-typograpy>
      </div>
      <div class="content">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.light {
  --section-bg: var(--color-white);
  --section-color: var(--color-envision-gray-900);
}

.dark {
  --section-bg: var(--color-envision-gray-900);
  --section-color: var(--color-white);
}

.blue {
  --section-bg: var(--color-envision-blue-950);
  --section-color: var(--color-white);
}

section {
  display: grid;
  grid-column: 1 / -1;
  place-content: center;
  grid-template-columns: 1fr;
  padding-block: calc(var(--spacing) * 8);
  gap: calc(var(--spacing) * 10);
  align-items: center;
  background-color: var(--section-bg);
  color: var(--section-color);
}

.content-wrapper {
  display: grid;
  gap: calc(var(--spacing) * 8);
  margin-inline: auto;
  width: 100%;
  max-width: 1300px;
  grid-template-columns: 1fr;
  align-items: center;

  @media (min-width: 600px) {
    grid-template-columns: auto 1fr;
  }
}

.header {
  width: fit-content;
  height: min-content;
  padding-inline: 1rem;
  padding-block: 0.5rem;
  border-right: none;
  text-transform: uppercase;
  letter-spacing: 8%;

  @media (min-width: 600px) {
    border-right: 1px solid var(--section-color);
  }
}

.content {
  position: relative;
  width: 100%;
  margin-inline: auto;
  padding-inline: calc(var(--spacing) * 4);
  container-type: inline-size;
}
</style>
