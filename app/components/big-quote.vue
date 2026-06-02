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

      <app-typography variant="heading-lg" class="title">
        {{ title }}
      </app-typography>
      <app-typography class="body">
        {{ body }}
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
  text-align: center;
  background-color: var(--section-bg);
  color: var(--section-color);
}

.content-wrapper {
  margin-inline: auto;
  width: 100%;
  max-width: 1300px;
  display: grid;
  justify-content: center;
  padding: calc(var(--spacing) * 6);
}

.title {
  max-width: 25ch;
  line-height: 1.2;
  text-wrap: balance;
}

.body {
  max-width: 60ch;
  margin-inline: auto;
  margin-top: calc(var(--spacing) * 4);
  text-wrap: balance;
}

.eyebrow {
  margin-bottom: calc(var(--spacing) * 4);
  margin-inline: auto;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 6%;
  color: var(--color-envision-blue-500);
  line-height: 1.5;
}
</style>
