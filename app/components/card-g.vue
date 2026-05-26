<script setup lang="ts">
defineProps<{
  item: Item;
  idx?: number;
}>();
</script>
<template>
  <div class="card">
    <app-typography v-if="idx != null" variant="text-xl" class="number">
      0{{ idx + 1 }}
    </app-typography>
    <app-typography v-if="item.label" variant="heading-lg" class="font-semibold">
      {{ item.label }}
    </app-typography>
    <div class="bar" />
    <app-typography v-if="item.description" variant="text-lg" class="text-balance">
      {{ item.description }}
    </app-typography>
    <ul>
      <li v-for="i in item.items" :key="i">
        {{ i }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.card {
  display: grid;
  gap: calc(var(--spacing) * 2);
  padding: calc(var(--spacing) * 6);
  height: 100%;
  align-content: start;
}

.number {
  color: var(--accent-color);
  font-weight: bold;
}

.bar {
  height: 4px;
  width: 25%;
  background-color: var(--color-envision-blue-500);
}

ul {
  list-style: disc outside;
  padding-left: 1.25rem;
}
</style>
