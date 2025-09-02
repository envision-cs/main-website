<script setup lang="ts">
const items = [
  {
    eyebrow: 'Tampa Business Journal',
    title: 'Member Spotlight: Envision Construction Services',
    link:
      {
        label: 'See More',
        to: '#',
        color: 'neutral',
      },
  },
  {
    eyebrow: 'Tampa Business Journal',
    title: 'Meet Envision CS, a 2021 Fast 50 honoree',
    link:
      {
        label: 'See More',
        to: '#',
        color: 'neutral',
      },
  },
  {
    eyebrow: 'Tampa Business Journal',
    title: 'Member Spotlight: Envision Construction Services',
    link:
      {
        label: 'See More',
        to: '#',
        color: 'neutral',
      },
  },
];
</script>

<template>
  <app-section-title
    title="Envision In the News"
  >
    <UCarousel
      v-slot="{ item }"
      class="border-t border-accented pt-6 mt-6"
      :items="items"
      :ui="{ item: 'basis-1.5/1 sm:basis-2/3 md:basis-1/3' }"
    >
      <app-link-card
        :image="item.image"
        :icon="item.icon"
        :eyebrow="item.eyebrow"
        :title="item.title"
        :description="item.description"
        :link="item.link"
      />
    </UCarousel>
  </app-section-title>
</template>
