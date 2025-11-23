<script setup lang="ts">
const { data } = useFetch('/api/process');
</script>

<template>
  <section class="grid grid-cols-1 md:grid-cols-2">
    <app-banner-content>
      <template #title>
        Our <span>Proven</span> Process
      </template>
      <template #body>
        Our proven process brings structure and consistency to every project. We listen, plan, and execute to
        reduce
        risk, maintain alignment, and deliver on time, on budget, and with complete transparency"
      </template>
    </app-banner-content>

    <div class="mt-0">
      <app-accordion :data name="our-process" />
    </div>
  </section>
</template>

<style scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-block: calc(var(--spacing) * 10);
  padding-inline: calc(var(--spacing) * 4);
  border: 1px solid var(--ui-border);
  gap: calc(var(--spacing) * 20);
}
</style>
