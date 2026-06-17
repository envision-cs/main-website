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
  <section class="three-uniques" aria-labelledby="three-uniques-title">
    <div class="three-uniques__inner">
      <header class="three-uniques__header">
        <p class="three-uniques__eyebrow">Our Three Uniques</p>
        <app-typography
          id="three-uniques-title"
          tag="h2"
          variant="heading-lg"
          class="three-uniques__title"
        >
          Principles that shape every project.
        </app-typography>
        <app-typography tag="p" variant="text-md" class="three-uniques__intro">
          At Envision, every decision we make is guided by a clear philosophy, three core principles
          that define how we work, why we work, and the impact we strive to create. These Three
          Uniques are more than values; they are the driving force behind our approach, shaping
          every project, partnership, and interaction.
        </app-typography>
      </header>

      <ol class="three-uniques__list">
        <li v-for="(item, idx) in slides" :key="item.id" class="three-uniques__item">
          <article class="three-uniques__card">
            <span class="three-uniques__number">0{{ idx + 1 }}</span>
            <app-typography tag="h3" variant="heading-sm" class="three-uniques__card-title">
              {{ item.label }}
            </app-typography>
            <app-typography tag="p" variant="text-md" class="three-uniques__description">
              {{ item.description }}
            </app-typography>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.three-uniques {
  grid-column: 1 / -1;
  color: var(--color-envision-gray-900);
  background: var(--color-envision-gray-100);
  border-block: 1px solid color-mix(in oklab, var(--color-envision-gray-900) 12%, transparent);
}

.three-uniques__inner {
  display: grid;
  width: 100%;
  max-width: none;
}

.three-uniques__header {
  display: grid;
  width: 100%;
  gap: calc(var(--spacing) * 3);
  align-content: start;
  padding: calc(var(--spacing) * 8);
  border-block-end: 1px solid color-mix(in oklab, var(--color-envision-gray-900) 12%, transparent);
}

.three-uniques__eyebrow {
  margin: 0;
  color: var(--color-envision-blue-600);
  font-size: var(--font-size-text-t4);
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
}

.three-uniques__title {
  max-inline-size: 20ch;
  color: var(--color-envision-gray-900);
}

.three-uniques__intro {
  max-width: 42rem;
  color: color-mix(in oklab, var(--color-envision-gray-900) 72%, transparent);
}

.three-uniques__list {
  display: grid;
  grid-template-columns: 1fr;
  margin: 0;
  padding: 0;
  list-style: none;
}

.three-uniques__item {
  min-width: 0;
  color: var(--card-color);
  background: var(--card-bg);
  border-block-end: 1px solid color-mix(in oklab, var(--color-white) 20%, transparent);
}

.three-uniques__item:last-child {
  border-block-end: 0;
}

.three-uniques__card {
  display: grid;
  gap: calc(var(--spacing) * 4);
  align-content: start;
  height: 100%;
  min-height: 10rem;
  padding: calc(var(--spacing) * 8);
}

.three-uniques__number {
  color: var(--card-accent);
  font-size: var(--font-size-text-t2);
  font-weight: 700;
  line-height: 1;
}

.three-uniques__card-title {
  max-inline-size: 20ch;
  text-wrap: balance;
  color: var(--card-color);
}

.three-uniques__description {
  color: var(--card-muted);
}

.three-uniques__item:nth-child(1) {
  --card-bg: var(--color-envision-blue-400);
  --card-color: var(--color-envision-gray-900);
  --card-muted: color-mix(in oklab, var(--color-envision-gray-900) 72%, transparent);
  --card-accent: var(--color-envision-blue-950);
}

.three-uniques__item:nth-child(2) {
  --card-bg: var(--color-envision-blue-900);
  --card-color: var(--color-white);
  --card-muted: color-mix(in oklab, var(--color-white) 76%, transparent);
  --card-accent: var(--color-envision-green-400);
}

.three-uniques__item:nth-child(3) {
  --card-bg: var(--color-envision-gray-900);
  --card-color: var(--color-white);
  --card-muted: color-mix(in oklab, var(--color-white) 74%, transparent);
  --card-accent: var(--color-envision-green-500);
}

@media (min-width: 700px) {
  .three-uniques__list {
    grid-template-columns: 1fr 1fr;
  }

  .three-uniques__item {
    border-block-end: 1px solid color-mix(in oklab, var(--color-white) 20%, transparent);
  }

  .three-uniques__item:nth-child(odd) {
    border-inline-end: 1px solid color-mix(in oklab, var(--color-white) 20%, transparent);
  }

  .three-uniques__item:last-child {
    grid-column: 1 / -1;
    border-inline-end: 0;
  }
}

@media (min-width: 1024px) {
  .three-uniques__inner {
    grid-template-columns: minmax(22rem, 0.72fr) minmax(0, 2fr);
  }

  .three-uniques__header {
    min-height: 25rem;
    border-block-end: 0;
    border-inline-end: 1px solid
      color-mix(in oklab, var(--color-envision-gray-900) 12%, transparent);
  }

  .three-uniques__list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .three-uniques__item,
  .three-uniques__item:last-child {
    grid-column: auto;
    border-block-end: 0;
    border-inline-end: 1px solid color-mix(in oklab, var(--color-white) 20%, transparent);
  }

  .three-uniques__item:last-child {
    border-inline-end: 0;
  }
}
</style>
