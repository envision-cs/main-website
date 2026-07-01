<script setup lang="ts">
interface SectionGItem {
  id: number;
  eyebrow?: string;
  label: string;
  description: string;
}

const props = defineProps<{
  eyebrow?: string;
  title: string;
  body?: string;
  items: SectionGItem[];
}>();

const titleId = computed(() => {
  return `section-g-${props.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}`;
});
</script>

<template>
  <section class="section-g" :aria-labelledby="titleId">
    <div class="section-g__inner">
      <header class="section-g__header">
        <p v-if="eyebrow" class="section-g__eyebrow">{{ eyebrow }}</p>
        <app-typography :id="titleId" tag="h2" variant="heading-lg" class="section-g__title">
          {{ title }}
        </app-typography>
        <app-typography v-if="body" tag="p" variant="text-md" class="section-g__intro">
          {{ body }}
        </app-typography>
      </header>

      <ol class="section-g__list">
        <li v-for="item in items" :key="item.id" class="section-g__item">
          <article class="section-g__card">
            <span v-if="item.eyebrow" class="section-g__number">{{ item.eyebrow }}</span>
            <div class="section-g__copy">
              <app-typography tag="h3" variant="heading-sm" class="section-g__item-title">
                {{ item.label }}
              </app-typography>
              <app-typography tag="p" variant="text-sm" class="section-g__description">
                {{ item.description }}
              </app-typography>
            </div>
          </article>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.section-g {
  --section-bg: var(--color-envision-gray-900);
  --section-color: var(--color-white);
  --section-g-accent: var(--color-envision-blue-500);
  --section-g-rule: color-mix(in oklab, var(--section-color) 14%, transparent);
  --section-g-muted: color-mix(in oklab, var(--section-color) 68%, transparent);

  container: section-g / inline-size;
  grid-column: 1 / -1;
  color: var(--section-color);
  background: var(--section-bg);
  border-block: 1px solid var(--section-g-rule);
}

.section-g__inner {
  position: relative;
  display: grid;
  width: 100%;
}

.section-g__header {
  position: sticky;
  top: 0;
  z-index: 1;
  align-self: start;
  display: grid;
  gap: calc(var(--spacing) * 3);
  align-content: start;
  padding: calc(var(--spacing) * 8);
  background: var(--section-bg);
  max-width: unset;
  width: 100%;
  border-block-end: 1px solid var(--section-g-rule);
}

.section-g__eyebrow {
  margin: 0;
  color: var(--section-g-accent);
  font-size: var(--font-size-text-t4);
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
}

.section-g__title {
  color: var(--section-color);
  text-wrap: balance;
}

.section-g__intro {
  color: var(--section-g-muted);
  text-wrap: balance;
}

.section-g__list {
  display: grid;
  grid-template-columns: 1fr;
  margin: 0;
  padding: 0;
  list-style: none;
  border-inline-start: 1px solid var(--section-g-rule);
}

.section-g__item {
  min-width: 0;
  border-block-end: 1px solid var(--section-g-rule);
}

.section-g__item:last-child {
  border-block-end: 0;
}

.section-g__card {
  display: flex;
  grid-template-columns: auto minmax(0, 1fr);
  gap: calc(var(--spacing) * 6);
  min-height: 12rem;
  padding: calc(var(--spacing) * 8);
  background: var(--card-bg);
  color: var(--card-color);
}

.section-g__number {
  color: var(--section-g-muted);
  font-size: var(--font-size-text-t3);
  font-weight: 700;
  line-height: 1;
}

.section-g__copy {
  display: grid;
  gap: calc(var(--spacing) * 3);
  min-width: 0;
}

.section-g__item-title {
  max-inline-size: 18ch;
  color: var(--section-color);
  text-wrap: balance;
}

.section-g__description {
  color: var(--section-g-muted);
  text-wrap: balance;
  max-width: unset;
}

@container section-g (min-width: 700px) {
  .section-g__header {
    padding: calc(var(--spacing) * 12);
    max-width: unset;
  }

  .section-g__card {
    grid-template-columns: 4rem minmax(0, 1fr);
    padding: calc(var(--spacing) * 10) calc(var(--spacing) * 12);
  }
}

@container section-g (min-width: 1024px) {
  .section-g__inner {
    grid-template-columns: repeat(2, 1fr);
  }

  .section-g__header {
    border-block-end: 0;
    max-width: 650px;
  }

  .section-g__card {
    min-height: 8rem;
  }

  .section__description {
    max-width: 650px;
  }
}
</style>
