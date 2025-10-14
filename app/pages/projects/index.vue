<script setup lang="ts">
const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects').all();
});

const catagories = computed(() => {
  const set = new Set();
  set.add('All');
  if (!projects.value)
    return ['All'];
  for (const project of projects.value) {
    set.add(project.sector);
  }
  return Array.from(set);
});
</script>

<template>
  <UPage class="mt-0 ">
    {{ catagories }}
  </UPage>
</template>
