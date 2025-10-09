<script setup lang="ts">
import type { AccordionItem } from '@nuxt/ui';

const items = [
  {
    label: 'Built on Faith, Driven by Purpose',
    content:
      'Our foundation is God, our work is built on integrity, and our mission is to serve with excellence. We don’t just construct buildings—we bring visions to life, creating spaces that inspire trust, transform communities, and stand the test of time.',
  },
  {
    label: 'Versatile. Adaptive. Enhanced Approach',
    content:
      'No two projects are the same, and neither is our approach. Whether it’s a small renovation or a large-scale build, we move with precision, flexibility, and care—delivering the personal attention of a local partner with the expertise of a national leader.',
  },
  {
    label: 'Impact Beyond Construction',
    content:
      'We don’t just build—we leave a mark. Every project is an opportunity to create something lasting, from the spaces we shape to the relationships we forge. With heart, craftsmanship, and purpose, we build legacies that elevate communities for generations to come.',
  },
] satisfies AccordionItem[];
</script>

<template>
  <div class="">
    <app-banner
      title="Three Uniques that set us apart"
      description="At Envision, every decision we make is guided by a clear philosophy—three core principles that define how we work, why we work, and the impact we strive to create. These “Three Uniques” are more than values; they are the driving force behind our approach, shaping every project, partnership, and interaction."
      :images="[
        {
          img: '/thegreens2.jpg',
          alt: 'Allen Green Senior Ariana Green and Allen Green Junior standing in from of a large crane wearing hard hats and safty vest',
        },
      ]"
    />
  </div>

  <div class="mt-0 site-max">
    <app-list-item
      v-for="(item, i) in items"
      :key="i"
      :index="i"
      :title="item.label"
      :text="item.content"
    />
  </div>
</template>
