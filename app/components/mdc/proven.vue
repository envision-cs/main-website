<script setup lang="ts">
const { data: our_process, pending, error } = await useAsyncData('our-process', () => $fetch('/api/process'), {
  server: true,
  lazy: false,
  default: () => [],
});
</script>

<template>
  <app-section-a no-padding>
    <template #header>
      <app-typography tag="h2" variant="heading-md">
        Our <span>Proven</span> Process
      </app-typography>
      <app-typography
        variant="text-md"
        tag="p"
        class="max-w-[60ch]"
      >
        Our proven process brings structure and consistency to every project. We listen, plan, and execute to
        reduce risk, maintain alignment, and deliver on time, on budget, and with complete transparency.
      </app-typography>
    </template>

    <template #body>
      <app-accordion
        v-if="!pending && !error"
        :data="our_process"
        name="our-process"
        class="accordion"
      />
    </template>
  </app-section-a>
</template>

<style scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-block: calc(var(--spacing) * 10);
  padding-inline: calc(var(--spacing) * 4);
  gap: calc(var(--spacing) * 20);
}

.accordion {
  border-left: 1px solid var(--color-border);
}
</style>
