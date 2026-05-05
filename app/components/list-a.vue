<script setup lang="ts">
defineProps<{
  items: Item[];
}>();
</script>

<template>
  <ul>
    <li v-for="(item, idx) in items" :key="item.id">
      <card-a :item :idx />
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  gap: calc(var(--spacing) * 8);

  @media (min-width: 700px) {
    grid-template-columns: 1fr 1fr;
  }
}

li {
  height: 100%;
}
</style>
