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
      <card-c :id="item.id" :label="item.label" :idx />
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: grid;
  gap: calc(var(--spacing) * 4);
  width: 100%;
}
</style>
