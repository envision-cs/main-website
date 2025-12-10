<script setup lang="ts">
const { data: threeUniques } = useFetch('/api/threeUniques');
</script>

<template>
  <section class="grid grid-cols-1 md:grid-cols-2">
    <app-banner-content>
      <template #title>
        Our <span>Three</span> Uniques
      </template>
      <template #body>
        At Envision, every decision we make is guided by a clear philosophy—three core principles that define how we
        work, why we work, and the impact we strive to create. These “Three Uniques” are more than values; they are the
        driving force behind our approach, shaping every project, partnership, and interaction.
      </template>
    </app-banner-content>

    <div class="mt-0">
      <app-accordion :data="threeUniques" name="threeUniques" />
    </div>
  </section>
</template>

<style scoped>
section {
}
</style>
