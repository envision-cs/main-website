<script setup lang="ts">
defineProps<{
  icon: string;
  label: string;
}>();
</script>

<template>
  <div class="icon-card">
    <span class="">
      <UIcon :name="icon" aria-hidden="true" />
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
}
</style>
