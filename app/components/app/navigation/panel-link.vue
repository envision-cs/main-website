<script setup lang="ts">defineProps<{
  to: string;
  title: string;
  description?: string;
}>();
</script>

<template>
  <NuxtLink :to="to" class="nav-panel-link">
    <span class="nav-panel-link__title">{{ title }}</span>
    <app-typography
      v-if="description"
      class="nav-panel-link__description"
      variant="text-sm"
    >
      {{ description }}
    </app-typography>
  </NuxtLink>
</template>

<style scoped>
.nav-panel-link {
  display: block;
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease;
  position: relative;
  margin-left: calc(var(--spacing) * 6);
}

.nav-panel-link:hover {
  opacity: 0.8;
}

.nav-panel-link:hover::after {
  content: '';
  position: absolute;
  top: 0;
  left: -1rem;
  background-color: var(--color-secondary-500);
  height: 100%;
  width: 8px;
}

.nav-panel-link__title {
  display: block;
  font-weight: 600;
}

.nav-panel-link__description {
  text-transform: none;
  opacity: 0.8;
  text-wrap: balance;
}
</style>
