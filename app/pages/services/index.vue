<script setup lang="ts">
const { data } = useNuxtData('services');

definePageMeta({
  layout: 'layout-a',
});
</script>

<template>
  <div>
    <ul>
      <li v-for="service in data" :key="service.title">
        <app-cta-b
          :title="service.title"
          :image="service.image"
          :path="service.param"
          :description="service.description"
        />
      </li>
    </ul>
  </div>
</template>
