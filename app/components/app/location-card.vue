<script setup lang="ts">
defineProps<{
  title: string;
  address: string;
  phone?: string;
  email?: string;
  city?: string;
  callLabel?: string;
  emailLabel?: string;
}>();
</script>

<template>
  <article class="location-card">
    <AppTypography class="uppercase mb-2 text-primary font-bold">
      {{ title }}
    </AppTypography>
    <AppTypography
      tag="p"
      variant="text-lg"
      class=""
    >
      {{ address }}<br>
      {{ city }}<br>
      {{ phone }}<br>
      {{ email }}
    </AppTypography>
  </article>
</template>

<style scoped>

</style>
