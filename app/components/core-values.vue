<script setup lang="ts">
const { data } = useFetch('/api/coreValues');
</script>

<template>
  <app-section-a no-padding>
    <template #header>
      <app-typography tag="h2" variant="heading-md">
        Our <span>Core</span> Values
      </app-typography>
      <app-typography
        variant="text-md"
        tag="p"
        class="max-w-[60ch]"
      >
        Choosing the wrong partner can mean wasted budget, endless delays, and a space that never meets its potential. We protect your investment, your timeline, and your vision
      </app-typography>
    </template>

    <template #body>
      <app-accordion :data="data" name="Core Values" />
    </template>
  </app-section-a>
</template>

<style scoped>
.cta {
  display: grid;
  border-block: 1px solid var(--ui-border);

  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}
.cta-content {
  padding: calc(var(--spacing) * 4);

  @media (min-width: 800px) {
    padding: calc(var(--spacing) * 8);
  }
}
</style>
