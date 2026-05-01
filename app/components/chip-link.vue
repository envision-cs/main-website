<script setup lang="ts">
defineProps<{
  idx: number;
  title: string;
  slug: string;
}>();
</script>
<template>
  <NuxtLink :to="`services${slug}`">
    {{ title }}
  </NuxtLink>
</template>
