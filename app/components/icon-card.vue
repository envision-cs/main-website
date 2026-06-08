<script setup lang="ts">defineProps<{
  icon: string;
  label: string;
}>();
</script>

<template>
  <div class="icon-card">
    <span class="">
      <UIcon :name="icon" aria-hidden="true" class="size-10" />
    </span>
    <app-typography tag="p" variant="text-md" class="">
      {{ label }}
    </app-typography>
  </div>
</template>

<style scoped>
.icon-card {
  display: grid;
  justify-items: center;
  place-content: center;
  padding: calc(var(--spacing) * 4);
  min-height: 11rem;
  border: var(--card-border);
  background: var(--card-bg);
}
</style>
