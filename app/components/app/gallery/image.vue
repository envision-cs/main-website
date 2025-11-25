<script setup>
defineProps({
  sources: Array,
  fallbackSrc: String,
  alt: { type: String, default: '' },
});
</script>

<template>
  <NuxtPicture
    class="feature-card-image"
    :src="fallbackSrc"
    :alt="alt"
    :sources="sources"
    format="webp"
    loading="lazy"
  />
</template>

<style scoped>
.feature-card-image {
  width: 100%;
  height: auto;
  display: block;
}
</style>
