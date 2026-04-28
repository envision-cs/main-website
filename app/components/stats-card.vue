<script setup lang="ts">
withDefaults(
  defineProps<{
    stat: string;
    description?: string;
    color?: string;
  }>(),
  {
    color: "--color-envision-blue-600",
  },
);
</script>

<template>
  <div class="stat-card" :style="{ '--card-bg': `var(${color})` }">
    <app-typography tag="p" variant="heading-lg" class="stat">
      {{ stat }}
    </app-typography>
    <app-typography tag="p" class="description">
      {{ description }}
    </app-typography>
  </div>
</template>

<style>
.stat-card {
  display: grid;
  gap: calc(var(--spacing));
  padding: 2cqi;
}

.stat {
  font-weight: 600;
  font-size: 7cqi !important;
}

.description {
  font-size: 2cqi !important;
}
</style>
