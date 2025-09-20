<script setup lang="ts">
const items = [
  {
    eyebrow: 'Tampa Business Journal',
    title: 'Member Spotlight: Envision Construction Services',
    icon: 'i-lucide-newspaper',
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
    icon: 'i-lucide-newspaper',
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
    icon: 'i-lucide-newspaper',
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
  <app-section-title title="Envision In the News">
    <div v-if="items.length > 0" class="border-t border-accented pt-6 mt-6 items-stretch flex flex-wrap">
      <app-news-card
        v-for="item in items"
        :key="item.title"
        :image="item.image"
        :icon="item.icon"
        :eyebrow="item.eyebrow"
        :title="item.title"
        :description="item.description"
        :link="item.link"
        class="w-full md:max-w-md"
      />
    </div>
  </app-section-title>
</template>
