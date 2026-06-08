<script setup lang="ts">defineProps<{
  item: Item;
  idx?: number;
}>();
</script>
<template>
  <div class="card">
    <app-typography v-if="idx != null" variant="text-xl" class="number">
      0{{ idx + 1 }}
    </app-typography>
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
  border-left: 4px solid var(--accent-color);
  padding: calc(var(--spacing) * 4);
  height: 100%;
  align-content: start;
  background: color-mix(in oklch, var(--section-bg) 95%, white);
}

.number {
  color: var(--accent-color);
  font-weight: bold;
}
</style>
