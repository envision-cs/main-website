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

  @media (min-width: 400px) {
    grid-template-columns: 1fr 1fr;

    li:nth-last-of-type(odd) {
      border-left: 1px solid var(--__border-color);
    }

    li:nth-child(n + 3) {
      border-top: 1px solid var(--__border-color);
    }
  }

  @media (min-width: 880px) {
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
</style>
