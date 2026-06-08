<script setup lang="ts">defineProps<{
  title: string;
  to: string;
}>();
</script>
<template>
  <NuxtLink :to="to" class="chip-link">
    <app-typography tag="span" variant="text-sm" class="chip-link__label">
      {{ title }}
    </app-typography>
  </NuxtLink>
</template>

<style scoped>
.chip-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: calc(var(--spacing) * 2);
  padding-inline: calc(var(--spacing) * 3);
  padding-block: calc(var(--spacing) * 1.5);
  font-size: 0.75rem;
  letter-spacing: 0.02em;
  border-radius: 999em;
  background-color: var(--color-white);
  border: 1px solid var(--color-white);
  color: var(--color-envision-gray-900);
  text-decoration: none;
  transition: all 200ms ease-in-out;
  cursor: pointer;
}

.chip-link :deep(.chip-link__label.text-sm) {
  max-inline-size: none;
  font-size: inherit;
  line-height: 1.2;
}

.chip-link:hover {
  background-color: var(--color-envision-gray-100);
  border-color: var(--color-envision-gray-100);
}

.chip-link:active {
  transform: scale(0.98);
  background-color: var(--color-envision-gray-200);
}

.chip-link:focus-visible {
  outline: 2px solid var(--color-envision-blue-500);
  outline-offset: 2px;
}
</style>
