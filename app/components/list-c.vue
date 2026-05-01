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
      <card-d :id="item.id" :label="item.label" :idx />
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: grid;
  gap: calc(var(--spacing) * 4);
  grid-template-columns: 1fr;
  width: 100%;

  @media (min-width: 500px) {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
