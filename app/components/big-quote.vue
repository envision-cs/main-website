<script setup lang="ts">
withDefaults(
  defineProps<{
    body?: string;
    title?: string;
    eyebrow?: string;
    bgcolor?: "light" | "dark";
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
    }"
  >
    <div class="content-wrapper">
      <app-typography variant="text-md" class="eyebrow">
        {{ eyebrow }}
      </app-typography>

      <app-typography variant="heading-huge">
        {{ title }}
      </app-typography>
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
}

.content-wrapper {
  margin-inline: auto;
  width: 100%;
  max-width: 1300px;
  padding: calc(var(--spacing) * 6);
}

.eyebrow {
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 6%;
  color: var(--color-envision-blue-500);
  line-height: 1.5;
}
</style>
