<script setup lang="ts">
import type { Link } from '#shared/types/global';

type Item = {
  image?: string;
  icon?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  link?: Link;
};

const items: Item[] = [
  {
    image: '/community.jpg',
    icon: 'i-heroicons-home',
    title: 'Start a Project',
    link: { label: 'Learn More', to: '/about', color: 'neutral' },
  },
  {
    image: '/community.jpg',
    icon: 'i-heroicons-home',
    title: 'Contact Information',
    link: { label: 'Learn More', to: '/about', color: 'neutral' },
  },
  {
    image: '/images/hero-construction.jpg',
    icon: 'i-heroicons-home',
    title: 'Meet the team',
    link: { label: 'Learn More', to: '/about', color: 'neutral' },
  },
];
</script>

<template>
  <app-section-title
    title="Ready to Build With Purpose"
  >
    <div
      class="border-t border-accented pt-6 mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      <app-pre-footer-card
        v-for="item in items"
        :key="item.title"
        :image="item.image"
        :icon="item.icon"
        :eyebrow="item.eyebrow"
        :title="item.title"
        :description="item.description"
        :link="item.link"
      />
    </div>
  </app-section-title>
</template>
