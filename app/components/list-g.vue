<script setup lang="ts">
defineProps<{
  items: Item[];
}>();
</script>

<template>
  <ul>
    <li v-for="(item, idx) in items" :key="item.id">
      <card-g :item :idx />
    </li>
  </ul>
</template>

<style scoped>
ul {
  --__border-color: rgba(255, 255, 255, 0.2);

  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  gap: calc(var(--spacing) * 4);

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;

    li:nth-last-of-type(odd) {
      border-left: 1px solid var(--__border-color);
    }

    li:nth-child(n + 3) {
      border-top: 1px solid var(--__border-color);
    }
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);

    li:not(:first-of-type) {
      border-left: 1px solid var(--__border-color);
    }

    li:nth-child(n + 3) {
      border-top: unset;
    }
  }
}

li {
  height: 100%;
}

li:nth-child(4n + 1) {
  background-color: var(--color-envision-blue-400);
  color: var(--color-gray-950);
}

li:nth-child(4n + 2) {
  background-color: var(--color-envision-blue-900);
  color: #fff;
}

li:nth-child(4n + 3) {
  background-color: var(--color-envision-gray-900);
  color: #fff;
}

li:nth-child(4n + 4) {
  background-color: var(--color-envision-gray-300);
  color: var(--color-gray-950);
}
</style>
