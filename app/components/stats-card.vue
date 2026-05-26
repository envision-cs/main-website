<script setup lang="ts">
withDefaults(
  defineProps<{
    stat: string;
    description: string;
    color?: string;
  }>(),
  {
    color: "--color-envision-blue-600",
  },
);
</script>

<template>
  <div class="stat-card" :style="{ '--card-bg': `var(${color})` }">
    <p class="stat">
      {{ stat }}
    </p>
    <app-typography tag="p" class="description">
      {{ description }}
    </app-typography>
  </div>
</template>

<style scoped>
.stat-card {
  display: grid;
  gap: calc(var(--spacing));
  padding: calc(var(--spacing) * 4);
  background: var(--card-bg);
  color: var(--color-white);
}

.stat {
  font-weight: 600;
  font-size: clamp(1.5rem, 7cqi, 3rem);
  line-height: 1;
  text-wrap: balance;
}

.description {
  font-size: clamp(1rem, 2cqi, 1.5rem);
}
</style>
