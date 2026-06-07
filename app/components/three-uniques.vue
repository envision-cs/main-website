<script setup lang="ts">
interface ThreeUniqueSlide {
  id: number;
  label: string;
  description: string;
}

const slides: ThreeUniqueSlide[] = [
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
  <section-a title="Our Three Uniques" bgcolor="light">
    <template #body>
      <app-typography>
        At Envision, every decision we make is guided by a clear philosophy, three core principles
        that define how we work, why we work, and the impact we strive to create. These Three
        Uniques are more than values; they are the driving force behind our approach, shaping every
        project, partnership, and interaction.
      </app-typography>
    </template>
    <ul>
      <li v-for="(item, idx) in slides" :key="item.id">
        <card-g :item :idx />
      </li>
    </ul>
  </section-a>
</template>

<style scoped>
section {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: 1fr;
  gap: 0;
  align-items: center;
  overflow: clip;
}

ul {
  --__border-color: rgba(255, 255, 255, 0.2);

  display: grid;
  grid-template-columns: 1fr;
  width: 100%;
  gap: calc(var(--spacing) * 4);

  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;

    li:nth-last-of-type(odd) {
      border-left: 1px solid var(--__border-color);
    }

    li:nth-child(n + 3) {
      border-top: 1px solid var(--__border-color);
    }
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);

    li:not(:first-of-type) {
      border-left: 1px solid var(--__border-color);
    }

    li:nth-child(n + 3) {
      border-top: unset;
    }
  }
}

li {
  height: 100%;
}

li:nth-child(4n + 1) {
  background-color: var(--color-envision-blue-400);
  color: var(--color-gray-950);
}

li:nth-child(4n + 2) {
  background-color: var(--color-envision-blue-900);
  color: #fff;
}

li:nth-child(4n + 3) {
  background-color: var(--color-envision-gray-900);
  color: #fff;
}

li:nth-child(4n + 4) {
  background-color: var(--color-envision-gray-300);
  color: var(--color-gray-950);
}
</style>
