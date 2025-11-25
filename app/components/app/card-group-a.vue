<script setup lang="ts">
type Card = {
  title: string;
  link: string;
  image: string;
  sector: string;
  completed: string;
};

defineProps<{
  cards: Card[];
}>();
</script>

<template>
  <section>
    <app-display-card
      v-for="(card, index) in cards"
      :key="index"
      v-bind="card"
    />
  </section>
</template>

<style scoped>
section {
  display: grid;
  gap: calc(var(--spacing) * 8);

  @media (min-width: 750px) {
    grid-template-columns: 1fr 2fr;
  }
}
</style>
