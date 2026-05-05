<script setup lang="ts">
defineProps<{
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
  padding: calc(var(--spacing) * 6);
  height: 100%;
  align-content: start;
}

.number {
  color: var(--color-envision-blue-500);
  font-weight: bold;
}
</style>
