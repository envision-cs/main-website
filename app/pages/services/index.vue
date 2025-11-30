<script setup lang="ts">
const { data } = useFetch(`/api/services`);

definePageMeta({
  layout: 'layout-a',
});
</script>

<template>
  <div>
    <h1>Services</h1>
    {{ data }}
  </div>
</template>
