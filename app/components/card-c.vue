<script setup lang="ts">defineProps<{
  item: Item;
  idx: number;
}>();
</script>
<template>
  <div class="card">
    <div class="dot" />
    {{ item.label }}
  </div>
</template>

<style scoped>
.card {
  display: flex;
  gap: calc(var(--spacing) * 3);
  width: 100%;
  padding-inline: calc(var(--spacing) * 2);
  width: 100%;
  padding-inline: calc(var(--spacing) * 2);
  padding-block: calc(var(--spacing) * 4);
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--color-envision-gray-700);
  align-items: center;
}

.dot {
  background-color: var(--accent-color);
  width: calc(var(--spacing) * 2);
  height: calc(var(--spacing) * 2);
  border-radius: 50%;
}

.number {
  color: var(--accent-color);
  font-weight: bold;
}
</style>
