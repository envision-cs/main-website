<script setup lang="ts">
defineProps<{
  item: Item;
  idx?: number;
}>();
</script>
<template>
  <div class="card">
    <app-typography variant="heading-sm" class="font-semibold">
      {{ item.label }}
    </app-typography>
    <app-typography variant="text-lg" class="text-balance">
      {{ item.description }}
    </app-typography>
  </div>
</template>

<style scoped>
.card {
  display: grid;
  gap: calc(var(--spacing) * 2);
  background-color: color-mix(in oklab, var(--section-color) 3%, var(--section-bg));
  border: 1px solid color-mix(in oklab, var(--section-color) 10%, var(--section-bg));
  color: var(--section-color);
  padding: calc(var(--spacing) * 4);
  height: 100%;
  align-content: start;
}
</style>
