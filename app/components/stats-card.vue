<script setup lang="ts">
defineProps<{
  stat: string;
  description: string;
}>();
</script>

<template>
  <div class="stat-card">
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
