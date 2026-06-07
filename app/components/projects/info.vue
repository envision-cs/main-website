<script setup lang="ts">
defineProps<{
  title: string;
  data: string;
}>();
</script>

<template>
  <div>
    <app-typography variant="text-md">
      {{ title }}
    </app-typography>
    <app-typography variant="heading-sm">
      {{ data }}
    </app-typography>
  </div>
</template>
