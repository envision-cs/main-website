<script setup lang="ts">
import type { RouteLocationRaw } from 'vue-router';

defineProps<{
  to: RouteLocationRaw;
  label?: string;
}>();
</script>

<template>
  <Nuxtlink :to="to" class="h-full w-full">
    {{ label }}
  </Nuxtlink>
</template>
