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
  <section class="">
    <app-reveal-card
      v-for="(card, index) in cards"
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

  @media (min-width: 750px) {
    grid-template-columns: 1fr 2fr;
  }
}
</style>
