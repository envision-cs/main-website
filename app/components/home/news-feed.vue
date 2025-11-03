<script setup lang="ts">
const items = [
  {
    eyebrow: 'Tampa Business Journal',
    title: 'Member Spotlight: Envision Construction Services',
    icon: 'i-lucide-newspaper',
    link:
    {
      label: 'Read more',
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
      label: 'Read more',
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
      label: 'Read more',
      to: '#',
      color: 'neutral',
    },
  },
];
</script>

<template>
  <section class="news-feed">
    <app-banner
      title="Envision in the News"
      description="Articles from around the web about Envision, its founders, and incredible team."
    />
    <div class="news-feed__list">
      <app-news-spotlight-card
        v-for="item in items"
        :key="item.title"
        class="news-feed__item"
        :eyebrow="item.eyebrow"
        :title="item.title"
        :icon="item.icon"
        :link="item.link"
      />
    </div>
  </section>
</template>

<style scoped>
.news-feed {
  display: grid;
}

.news-feed__list {
  display: grid;
  gap: 16px;
}

.news-feed__item:not(:first-of-type) {
  border-top: --_border;
}
</style>
