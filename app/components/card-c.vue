<script setup lang="ts">
defineProps<{
  item: Item;
  idx: number;
}>();
</script>
<template>
  <div class="card">
    <div class="number">
      {{ (idx + 1).toString().padStart(2, "0") }}
    </div>
    {{ item.label }}
  </div>
</template>

<style scoped>
.card {
  display: flex;
  gap: calc(var(--spacing) * 2);
  width: 100%;
  padding-inline: calc(var(--spacing) * 2);
  width: 100%;
  padding-inline: calc(var(--spacing) * 2);
  padding-block: calc(var(--spacing) * 4);
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--color-envision-gray-700);
}

.number {
  color: var(--color-envision-blue-500);
  font-weight: bold;
}
</style>
