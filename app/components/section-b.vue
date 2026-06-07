<script setup lang="ts">
withDefaults(
  defineProps<{
    body?: string;
    image?: string;
    flip?: boolean;
    href?: string;
    label?: string;
    title: string;
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
  </section>
</template>

<style scoped>
section {
  display: grid;
  max-width: 1200px;
  margin-inline: auto;
  grid-column: 1 / -1;
  grid-template-columns: 1fr;
  margin-block: calc(var(--spacing) * 12);
  gap: calc(var(--spacing) * 10);
  align-items: start;

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
}

.header {
  width: 100%;
  margin-inline: auto;
  position: sticky;
  top: 0;
}

.content {
  position: relative;
  width: 100%;
  margin: calc(var(--spacing) * 4);
  margin-inline: auto;
  padding-inline: calc(var(--spacing) * 4);
  container-type: inline-size;
}
</style>
