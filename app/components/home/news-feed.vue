<script setup lang="ts">
const items = [
  {
    eyebrow: 'Tampa Business Journal',
    title: 'Member Spotlight: Envision Construction Services',
    icon: 'i-lucide-newspaper',
    wide: false,
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
    wide: false,
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
    image: '/thegreens2.jpg',
    wide: true,
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
    <div
      v-if="items.length > 0"
      class="news-feed border-t border-accented pt-6 mt-6 items-stretch flex flex-col lg:flex-row lg:flex-wrap xl:flex-nowrap gap-4"
    >
      <app-news-card
        v-for="item in items"
        :key="item.title"
        :image="item.image"
        :icon="item.icon"
        :eyebrow="item.eyebrow"
        :title="item.title"
        :link="item.link"
        :wide="item.wide"
        class="w-full lg:w-auto"
        :class="[
          // At lg (wrap allowed): make all cards fill rows
          item.wide
            ? 'lg:flex-1 lg:min-w-[360px]'
            : 'lg:flex-1 lg:min-w-[306.5px]',
          // At xl (no wrap): revert to default minimal vs wide
          item.wide
            ? 'xl:flex-1 xl:min-w-0'
            : 'xl:flex-none xl:shrink-0 xl:basis-[306.5px]',
        ]"
      />
    </div>
  </app-section-title>
</template>

<style scoped>
.news-feed > * + * {
  padding-top: 1rem;
  border-top: 1px solid var(--ui-border-muted);
}
/* Add a 1px divider to cards that have a card to their left (desktop only) */
@media (min-width: 1024px) {
  .news-feed > * + * {
    padding-top: 0rem;
    border-top: none;

    padding-left: 1rem;
    border-left: 1px solid var(--ui-border-muted);
  }
}
</style>
