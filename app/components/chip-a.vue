<script setup lang="ts">
defineProps<{
  id: number;
  label: string;
  idx: number;
}>();
</script>
<template>
  <div class="chip">
    <app-typography>
      {{ label }}
    </app-typography>
  </div>
</template>

<style scoped>
.chip {
  display: flex;
  gap: calc(var(--spacing) * 2);
  width: 100%;
  width: 100%;
  padding-inline: calc(var(--spacing) * 2);
  border-radius: 999em;
  padding-block: calc(var(--spacing) * 1);
  background-color: rgba(255, 255, 255, 0.02);
  border: 1px solid;
}
</style>
