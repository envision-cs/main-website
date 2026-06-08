<script setup lang="ts">defineProps<{
  items: Item[];
  small?: boolean;
}>();
</script>

<template>
  <ul>
    <li v-for="item in items" :key="item.id">
      <card-e v-if="item.label" :small :item />
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
