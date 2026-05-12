<script setup lang="ts">
defineProps<{
  items: Item[];
}>();
</script>

<template>
  <ul>
    <li v-for="(item, idx) in items" :key="item.id">
      <card-c :item :idx />
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: grid;
  gap: calc(var(--spacing) * 4);
  width: 100%;
  min-width: 600px;
}
</style>
