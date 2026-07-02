<script setup lang="ts">
const props = defineProps<{
  eyebrow?: string;
  title: string;
  body?: string;
  items: Item[];
}>();

const titleId = computed(() => {
  return `section-f-${props.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}`;
});

const sectionClasses = computed(() => {
  return [`section-f--count-${props.items.length}`];
});

const cardBackgrounds = [
  'var(--color-envision-blue-400)',
  'var(--color-envision-blue-900)',
  'var(--color-envision-gray-900)',
  'var(--color-envision-gray-300)',
];

const innerStyles = computed(() => {
  const lastItemIndex = Math.max(props.items.length - 1, 0) % cardBackgrounds.length;

  return {
    '--section-f-inner-gradient-end': cardBackgrounds[lastItemIndex],
  };
});
</script>

<template>
  <section class="section-f" :class="sectionClasses" :aria-labelledby="titleId">
    <header class="section-f__header">
      <div class="section-f__heading">
        <p v-if="eyebrow" class="section-f__eyebrow">{{ eyebrow }}</p>
        <app-typography :id="titleId" tag="h2" variant="heading-lg" class="section-f__title">
          {{ title }}
        </app-typography>
      </div>
      <app-typography v-if="body" tag="p" variant="text-md" class="section-f__intro">
        {{ body }}
      </app-typography>
    </header>
    <div class="section-f__inner" :style="innerStyles">
      <ol class="section-f__list">
        <li v-for="(item, idx) in items" :key="item.id" class="section-f__item">
          <article class="section-f__card">
            <span class="section-f__number">0{{ idx + 1 }}</span>
            <app-typography tag="h3" variant="heading-sm" class="section-f__card-title">
              {{ item.label }}
            </app-typography>
            <app-typography
              v-if="item.description"
              tag="p"
              variant="text-md"
              class="section-f__description"
            >
              {{ item.description }}
            </app-typography>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.section-f {
  grid-column: 1 / -1;
  color: var(--color-envision-gray-900);
  background: var(--color-envision-gray-100);
}

.section-f__inner {
  display: grid;
  width: 100%;
  max-width: none;
  place-content: center;
  grid-column: 1 / -1;
  background: linear-gradient(
    90deg,
    var(--color-envision-blue-400) 50%,
    var(--section-f-inner-gradient-end) 51%
  );
}

.section-f__header {
  display: grid;
  width: 100%;
  margin-inline: auto;
  grid-template-columns: 1fr;
  gap: calc(var(--spacing) * 3);
  align-content: start;
  padding: calc(var(--spacing) * 8);
  padding-block: calc(var(--spacing) * 16);
}

.section-f__heading {
  display: grid;
  place-content: start;
}

.section-f__eyebrow {
  margin: 0;
  color: var(--color-envision-blue-600);
  font-size: var(--font-size-text-t4);
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
}

.section-f__title {
  max-inline-size: 23ch;
  color: var(--color-envision-gray-900);
}

.section-f__intro {
  max-width: 42rem;
  color: color-mix(in oklab, var(--color-envision-gray-900) 72%, transparent);
}

.section-f__list {
  display: grid;
  grid-template-columns: 1fr;
  margin-inline: auto;
  margin: 0;
  padding: 0;
  list-style: none;
}

.section-f__item {
  min-width: 0;
  color: var(--card-color);
  background: var(--card-bg);
  padding-block: calc(var(--spacing) * 8);
}

.section-f__item:last-child {
  border-block-end: 0;
}

.section-f__card {
  display: grid;
  gap: calc(var(--spacing) * 4);
  align-content: start;
  height: 100%;
  min-height: 10rem;
  padding: calc(var(--spacing) * 8);
}

.section-f__number {
  color: var(--card-accent);
  font-size: var(--font-size-text-t2);
  font-weight: 700;
  line-height: 1;
}

.section-f__card-title {
  max-inline-size: 20ch;
  text-wrap: balance;
  color: var(--card-color);
}

.section-f__description {
  color: var(--card-muted);
}

.section-f__item:nth-child(4n + 1) {
  --card-bg: var(--color-envision-blue-400);
  --card-color: var(--color-envision-gray-900);
  --card-muted: color-mix(in oklab, var(--color-envision-gray-900) 72%, transparent);
  --card-accent: var(--color-envision-blue-950);
}

.section-f__item:nth-child(4n + 2) {
  --card-bg: var(--color-envision-blue-900);
  --card-color: var(--color-white);
  --card-muted: color-mix(in oklab, var(--color-white) 76%, transparent);
  --card-accent: var(--color-envision-green-400);
}

.section-f__item:nth-child(4n + 3) {
  --card-bg: var(--color-envision-gray-900);
  --card-color: var(--color-white);
  --card-muted: color-mix(in oklab, var(--color-white) 74%, transparent);
  --card-accent: var(--color-envision-green-500);
}

.section-f__item:nth-child(4n + 4) {
  --card-bg: var(--color-envision-gray-300);
  --card-color: var(--color-envision-gray-900);
  --card-muted: color-mix(in oklab, var(--color-envision-gray-900) 72%, transparent);
  --card-accent: var(--color-envision-blue-700);
}

@media (min-width: 700px) {
  .section-f__list {
    grid-template-columns: 1fr 1fr;
  }

  .section-f__item {
    border-block-end: 1px solid color-mix(in oklab, var(--color-white) 20%, transparent);
  }

  .section-f__item:nth-child(odd) {
    border-inline-end: 1px solid color-mix(in oklab, var(--color-white) 20%, transparent);
  }

  .section-f--count-3 .section-f__item:last-child {
    grid-column: 1 / -1;
    border-inline-end: 0;
  }

  .section-f--count-4 .section-f__item:nth-last-child(-n + 2) {
    border-block-end: 0;
  }
}

@media (min-width: 1000px) {
  .section-f__header {
    grid-template-columns: repeat(2, 1fr);
  }

  .section-f__heading {
    place-content: center;
  }
}

@media (min-width: 1024px) {
  .section-f__header {
    border-block-end: 0;
  }

  .section-f--count-3 .section-f__list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .section-f--count-4 .section-f__list {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .section-f__item,
  .section-f--count-3 .section-f__item:last-child,
  .section-f--count-4 .section-f__item:nth-last-child(-n + 2) {
    grid-column: auto;
    border-block-end: 0;
  }

  .section-f__item:last-child {
    border-inline-end: 0;
  }
}
</style>
