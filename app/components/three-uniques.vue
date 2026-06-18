<script setup lang="ts">
import SectionF from './section-f.vue';

const slides: Item[] = [
  {
    id: 1,
    label: 'Built on Faith, Driven by Purpose',
    description:
      'Our foundation is God, our work is built on integrity, and our mission is to serve with excellence.',
  },
  {
    id: 2,
    label: 'Impact Beyond Construction',
    description:
      'We don’t just build—we leave a mark. Every project is an opportunity to create something lasting, from the spaces we shape to the relationships we forge. With heart, craftsmanship, and purpose, we build legacies that elevate communities for generations to come.',
  },
  {
    id: 3,
    label: 'Versatile. Adaptive. Enhanced Approach',
    description:
      'No two projects are the same, and neither is our approach. Whether it’s a small renovation or a large-scale build, we move with precision, flexibility, and care, delivering the personal attention of a local partner with the expertise of a national leader.',
  },
];
</script>

<template>
  <SectionF
    eyebrow="Our Three Uniques"
    title="Principles that shape every project."
    body="At Envision, every decision we make is guided by a clear philosophy, three core principles that define how we work, why we work, and the impact we strive to create. These Three Uniques are more than values; they are the driving force behind our approach, shaping every project, partnership, and interaction."
    :items="slides"
  />
</template>
