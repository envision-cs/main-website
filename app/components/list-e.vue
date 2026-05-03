<script setup lang="ts">
interface Item {
  id: number;
  title: string;
  description: string;
}
defineProps<{
  items: Item[];
}>();
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <card-e :id="item.id" :item="item" />
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: grid;
  gap: calc(var(--spacing) * 4);
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  width: 100%;
}
</style>
