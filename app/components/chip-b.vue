<script setup lang="ts">
defineProps<{
  id: number;
  label: string;
  idx: number;
}>();
</script>

<template>
  <div class="chip">
    <span class="chip__dot" aria-hidden="true" />
    <app-typography variant="text-lg" class="text-balance">
      {{ label }}
    </app-typography>
  </div>
</template>

<style scoped>
.chip {
  display: flex;
  align-items: flex-start;
  gap: calc(var(--spacing) * 3);
  width: 100%;
  height: 100%;
  padding: calc(var(--spacing) * 5);
  border-radius: 8px;
  background-color: color-mix(in oklab, var(--section-color) 3%, var(--section-bg));
  border: 1px solid color-mix(in oklab, var(--section-color) 10%, var(--section-bg));
  color: var(--section-color);
}

.chip__dot {
  width: 8px;
  height: 8px;
  flex: 0 0 8px;
  margin-top: 0.4em;
  border-radius: 999px;
  background-color: var(--color-envision-blue-500);
}
</style>
