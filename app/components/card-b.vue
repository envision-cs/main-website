<script setup lang="ts">
defineProps<{
  item: Item;
  image?: string;
  idx?: number;
}>();
</script>
<template>
  <div class="card">
    <div v-if="image">
      <NuxtImg :src="image" class="aspect-square object-cover w-full h-full" />
    </div>
    <div class="content">
      <app-typography v-if="idx != null" variant="text-xl" class="number">
        0{{ idx + 1 }}
      </app-typography>
      <app-typography variant="heading-md" class="font-semibold mb-2">
        {{ item.label }}
      </app-typography>
      <app-typography variant="text-sm" class="text-balance">
        {{ item.description }}
      </app-typography>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: grid;
  gap: calc(var(--spacing) * 4);
  grid-template-columns: 1fr 1fr;
  border: 1px solid var(--accent-color);
}

.content {
  place-self: end;
  margin-bottom: calc(var(--spacing) * 4);
}

.number {
  font-weight: semibold;
  color: var(--accent-color);
}
</style>
