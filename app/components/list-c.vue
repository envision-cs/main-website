<script setup lang="ts">
interface Item {
  id: number;
  label: string;
}
defineProps<{
  items: Item[];
}>();
</script>

<template>
  <ul>
    <li v-for="(item, idx) in items" :key="item.id">
      <chip-a :id="item.id" :label="item.label" :idx />
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--spacing) * 4);
  grid-template-columns: 1fr;
  width: 100%;
  min-width: 600px;

  @media (min-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
