<script setup lang="ts">
const props = withDefaults(defineProps<{
  direction?: 'left' | 'right' | 'top' | 'bottom' | 'botom';
}>(), {
  direction: 'bottom',
});

const angle = computed(() => {
  switch (props.direction) {
    case 'top':
      return '0deg';
    case 'left':
      return '270deg';
    case 'right':
      return '90deg';
    case 'botom':
    case 'bottom':
    default:
      return '180deg';
  }
});

const overlayBackground = computed(() =>
  `linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.0) 70%), 
   linear-gradient(${angle.value}, rgba(0, 0, 0, .6) 0%, rgba(0, 0, 0, 0.45) 45%, rgba(0, 0, 0, 0) 70%)`,
);
</script>

<template>
  <div
    class="overlay"
    :style="{ background: overlayBackground }"
    aria-hidden="true"
  />
</template>

<style scoped>
.overlay {
  width: 100%;
  grid-column: 1/-1;
  grid-row: 1/-1;
}
</style>
