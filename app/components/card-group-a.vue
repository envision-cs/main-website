<script setup lang="ts">
interface Card {
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
    <div class="main-wrapper site-grid">
      <ul class="wrapper">
        <li v-for="(card, index) in visibleCards" :key="index">
          <app-reveal-card
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
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
section {
  grid-column: 1/-1;
}

.main-wrapper {
  container-type: inline-size;
  gap: calc(var(--spacing) * 8);
}

.wrapper {
  display: grid;
  grid-column: 1/-1;

  @container (inline-size < 40ch) {
    grid-template-columns: repeat(1, 1fr);
  }

  @container (inline-size > calc(35ch * 2 + 1rem)) {
    grid-template-columns: repeat(2, 1fr);
  }

  @container (inline-size > calc(40ch * 3 + 1rem)) {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
