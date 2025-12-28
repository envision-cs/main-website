<script setup lang="ts">
const { data: our_process } = useFetch('/api/process');
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
      <app-accordion :data="our_process" name="our-process" />
    </template>
  </app-section-a>
</template>

<style scoped>
section {
  /*min-height: min(640px, 45vw);*/
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-block: calc(var(--spacing) * 10);
  padding-inline: calc(var(--spacing) * 4);
  gap: calc(var(--spacing) * 20);
}
</style>
