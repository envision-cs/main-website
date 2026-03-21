<script setup lang="ts">interface Card {
  title: string;
  link: string;
  image: string;
  sector: string;
  completed: string;
}

const props = defineProps<{
  cards: Card[];
  spacing?: string;
}>();

const visibleCards = computed(() => props.cards.slice(0, 3));
</script>

<template>
  <section class="card-group-a">
    <app-reveal-card
      v-for="(card, index) in visibleCards"
      :key="index"
      :image="card.image"
      :title="card.title"
      :to="card.link"
      aspect-ratio="3/4"
      :title-offset="-16"
      :image-hover-blur="0"
    >
      <template #title>
        <app-typography class="" variant="heading-md">
          {{ card.title }}
        </app-typography>
      </template>
      <template #meta>
        <div class="flex gap-2 items-center">
          <p>See Project</p>
          <UIcon name="i-lucide-arrow-right" />
        </div>
      </template>
    </app-reveal-card>
  </section>
</template>

<style scoped>
section {
  position: relative;
  display: grid;
  background-color: #fff;
  grid-template-columns: 1fr;
  max-height: 100vh;
  grid-template-areas: 'a';

  @media (min-width: 750px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    grid-template-areas: 'a b c ';
  }
}

section > :nth-child(1) {
  grid-area: a;
}

section > :nth-child(1) {
  grid-area: c;
}

section > :nth-child(2) {
  grid-area: b;
}
</style>
