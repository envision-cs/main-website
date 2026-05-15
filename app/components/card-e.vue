<script setup lang="ts">
defineProps<{
  item: Item;
  idx?: number;
  small?: boolean;
}>();
</script>
<template>
  <div v-if="item.label" class="card">
    <app-typography v-if="idx != null" variant="text-xl" class="number">
      0{{ idx + 1 }}
    </app-typography>
    <app-typography
      v-if="item.label"
      variant="heading-lg"
      class="font-semibold"
      :class="{
        small: small,
      }"
    >
      {{ item.label }}
    </app-typography>
    <app-typography v-if="item.description" variant="text-lg" class="text-balance">
      {{ item.description }}
    </app-typography>
  </div>
</template>

<style scoped>
.card {
  display: grid;
  gap: calc(var(--spacing) * 2);
  border-left: 4px solid var(--accent-color);
  padding: calc(var(--spacing) * 4);
  height: 100%;
  align-content: start;

  .small {
    font-size: 1.5rem;
    line-height: 1;
  }
}

.number {
  color: var(--accent-color);
  font-weight: bold;
}
</style>
