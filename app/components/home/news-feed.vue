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
  <section class="grid grid-cols-1 md:grid-cols-2">
    <div>
      <app-banner-content class="sticky top-0">
        <template #title>
          Envision in the <span>News</span>
        </template>
        <template #body>
          Our proven process brings structure and consistency to every project. We listen, plan, and execute to
          reduce
          risk, maintain alignment, and deliver on time, on budget, and with complete transparency"
        </template>
      </app-banner-content>
    </div>

    <div class="mt-0 content-wrapper">
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
    </div>
  </section>
</template>

<style scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-block: calc(var(--spacing) * 10);
  padding-inline: calc(var(--spacing) * 4);
  gap: calc(var(--spacing) * 20);
}

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
