<script setup lang="ts">
const { data } = useFetch('/api/coreValues');
</script>

<template>
  <section class="cta site-max">
    <app-banner-content class="cta-content">
      <template #title>
        Our <span>Core</span> Values
      </template>
      <template #body>
        Choosing the wrong partner can mean wasted budget, endless delays, and a space that never meets its potential. We protect your investment, your timeline, and your vision
      </template>
    </app-banner-content>

    <div class="mt-0 acc">
      <app-accordion :data="data" name="Core Values" />
    </div>
  </section>
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
