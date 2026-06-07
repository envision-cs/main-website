<script setup lang="ts">
const props = defineProps<{
  item: Item;
  idx?: number;
  small?: boolean;
}>();

const varient = computed(() => (props.small ? 'text-sm' : 'text-lg'));
</script>
<template>
  <div class="card" :class="{ small: small }">
    <app-typography v-if="idx != null" variant="text-xl" class="number">
      0{{ idx + 1 }}
    </app-typography>
    <app-typography variant="heading-sm" class="font-semibold">
      {{ item.label }}
    </app-typography>
    <app-typography :variant="varient" class="text-balance">
      {{ item.description }}
    </app-typography>
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

.card.small {
  padding: calc(var(--spacing) * 4) !important;
}

.number {
  color: var(--accent-color);
  font-weight: bold;
}
</style>
