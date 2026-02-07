<script setup lang="ts">
const props = defineProps<{
  /** When true, use a denser, auto-fitting grid */
  dense?: boolean;
}>();
</script>

<template>
  <ul class="members-section" :class="{ dense: props.dense }">
    <slot />
  </ul>
</template>

<style scoped>
.members-section {
  display: grid;
  grid-column: 1/-1;
  grid-template-columns: 1fr;

  @media (min-width: 450px) {
    grid-template-columns: 1fr 1fr;
  }
}

.members-section.dense {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  align-items: stretch;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
