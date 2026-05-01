<script setup lang="ts">
interface Item {
  id: number;
  title: string;
  description: string;
}
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
      {{ item.title }}
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
  border-left: 4px solid var(--color-envision-blue-500);
  padding: calc(var(--spacing) * 4);
  height: 100%;
  align-content: start;
}

.number {
  color: var(--color-envision-blue-500);
  font-weight: bold;
}
</style>
