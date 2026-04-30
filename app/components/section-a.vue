<script setup lang="ts">
defineProps<{
  body?: string;
  image?: string;
  flip?: boolean;
  href?: string;
  label?: string;
  title: string;
  eyebrow?: string;
}>();
</script>
<template>
  <section>
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
  max-width: 1800px;
  margin-inline: auto;
  grid-column: 1 / -1;
  grid-template-columns: 1fr;
  margin-block: calc(var(--spacing) * 12);
  gap: calc(var(--spacing) * 10);
  align-items: center;
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
