<script setup lang="ts">
withDefaults(
  defineProps<{
    body?: string;
    image?: string;
    flip?: boolean;
    href?: string;
    label?: string;
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
      blue: bgcolor === 'blue',
    }"
  >
    <div class="content-wrapper">
      <div class="header">
        <section-header-a :eyebrow :title="title" :body :button-to="href" :button-label="label">
          <template #body>
            <slot name="body" />
          </template>
        </section-header-a>
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
}

.header {
  width: 100%;
  margin-inline: auto;
}

.content {
  position: relative;
  width: 100%;
  margin-inline: auto;
  padding-inline: calc(var(--spacing) * 4);
  container-type: inline-size;
}
</style>
