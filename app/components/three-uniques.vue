<script setup lang="ts">
const { data: threeUniques } = useFetch('/api/threeUniques');
</script>

<template>
  <app-section-a no-padding class="border-b border-ui-accented">
    <template #header>
      <app-typography tag="h2" variant="heading-md">
        Our <span>Three</span> Uniques
      </app-typography>
      <app-typography
        variant="text-md"
        tag="p"
        class="max-w-[60ch]"
      >
        At Envision, every decision we make is guided by a clear philosophy—three core principles that define how we
        work, why we work, and the impact we strive to create. These “Three Uniques” are more than values; they are the
        driving force behind our approach, shaping every project, partnership, and interaction.
      </app-typography>
    </template>

    <template #body>
      <app-accordion :data="threeUniques" name="threeUniques" />
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
