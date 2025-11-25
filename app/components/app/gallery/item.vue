<script setup>
import { computed, inject } from 'vue';

const props = defineProps({
  index: { type: Number, required: true },
});

const currentIndex = inject('currentIndex', ref(0));
const isCurrent = computed(() => props.index === currentIndex.value);
</script>

<template>
  <li
    class="gallery-item snap-start shrink-0"
    :class="{ current: isCurrent }"
    role="listitem"
  >
    <slot />
  </li>
</template>

<style scoped>
.gallery-item {
  width: 380px;
  scroll-snap-align: start;
  scroll-snap-stop: always;
}

@media (max-width: 1068px) {
  .gallery-item {
    width: 320px;
  }
}

@media (max-width: 734px) {
  .gallery-item {
    width: 280px;
  }
}
</style>
