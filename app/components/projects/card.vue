<script setup lang="ts">defineProps<{
  image: string;
  title: string;
  sector?: string;
  location?: string;
  completed?: string;
  to: string;
}>();
</script>

<template>
  <project-card
    :to="to"
    :aria-label="title"
    prefetch-on="interaction"
    class="project-wrapper"
    :image="image"
    :alt="title"
    aspect-ratio="3/4"
    image-densities="x1 x2"
    image-object-fit="cover"
    :outlined="false"
    :title="title"
    :location="location"
    :completed="completed"
    :sector="sector"
  />
</template>
