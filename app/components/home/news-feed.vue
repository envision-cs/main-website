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
  <app-section-a no-padding>
    <template #header>
      <app-typography tag="h2" variant="heading-lg">
        Envision in the <span>News</span>
      </app-typography>
      <app-typography
        tag="p"
        variant="text-md"
        class="max-w-[60ch]"
      >
        Our proven process brings structure and consistency to every project. We listen, plan, and execute to
        reduce risk, maintain alignment, and deliver on time, on budget, and with complete transparency.
      </app-typography>
    </template>

    <template #body>
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
    </template>
  </app-section-a>
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
