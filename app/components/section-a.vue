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
    bgcolor?: "light" | "dark" | "blue";
  }>(),
  {
    bgcolor: "light",
  },
);
</script>
<template>
  <layout-section-a :bgcolor>
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
  </layout-section-a>
</template>

<style scoped>
.content-wrapper {
  margin-inline: auto;
  width: 100%;
  max-width: 1300px;
  display: grid;
  gap: calc(var(--spacing) * 4);
  grid-column: 1 / -1;
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
