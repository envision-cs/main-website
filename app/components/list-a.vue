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
    <li
      v-for="(item, idx) in items"
      :key="item.id"
      v-gsap.whenVisible.from="{
        y: '100%',
        opacity: 0,
        stagger: 0.1,
        start: 'top 80%',
      }"
    >
      <card-a :item :idx />
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: grid;
  grid-template-columns: 1fr;
  gap: calc(var(--spacing) * 8);
}

li {
  background: var(--color-envision-blue-600);
}

li:nth-child(2) {
  background: var(--color-envision-green-500);
}

li:nth-child(3) {
  background: var(--color-envision-gray-700);
}

li:nth-child(4) {
  background: var(--color-envision-blue-800);
}
</style>
