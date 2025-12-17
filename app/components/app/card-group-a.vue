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
  spacing?: string;
}>();
</script>

<template>
  <section class="site-max">
    <app-display-card
      v-for="(card, index) in cards"
      :key="index"
      v-bind="card"
      aspect-ratio="3/4"
    />
  </section>
</template>

<style scoped>
section {
  position: relative;
  display: grid;
  padding: calc(var(--spacing) * 8);
  background-color: #fff;
  gap: calc(var(--spacing) * 4);

  :first-child {
    display: none;
  }

  @media (min-width: 750px) {
    gap: calc(var(--spacing) * 8);
    grid-template-columns: 1fr 2fr;

    :first-child {
      display: block;
    }
  }
}
</style>
