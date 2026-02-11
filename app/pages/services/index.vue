<script setup lang="ts">
const { data } = await useServicesList();
definePageMeta({
  layout: 'layout-a',
});
</script>

<template>
  <app-team-member-list dense>
    <app-team-member-card
      v-for="service in data"
      :key="service.slug"
      :path="`/services/${service.slug}`"
      :name="service.title"
      :image="service.image.url"
      title-size="heading-md"
    />
  </app-team-member-list>
</template>
