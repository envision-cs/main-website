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
  border: 1px solid var(--color-envision-gray-700);
  padding: calc(var(--spacing) * 4);
}

.number {
  font-weight: semibold;
}
</style>
