<script setup lang="ts">
defineProps<{
  id: number;
  label: string;
  idx: number;
}>();
</script>
<template>
  <div class="card">
    <app-typography>
      {{ label }}
    </app-typography>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  gap: calc(var(--spacing) * 2);
  width: 100%;
  width: 100%;
  padding-inline: calc(var(--spacing) * 3);
  padding-block: calc(var(--spacing) * 2);
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid;
}
</style>
