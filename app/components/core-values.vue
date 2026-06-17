<script setup lang="ts">
const slides = [
  {
    id: 1,
    eyebrow: '01',
    label: 'Be Humbly Confident',
    description:
      'Your gifts, talents, and resources are not only for you or about you. Without believing in something bigger than yourself, you will only seek to serve yourself. Lead with conviction, then back it with service.',
  },
  {
    id: 2,
    eyebrow: '02',
    label: "It's Bigger Than You",
    description:
      'We build the company, the project, and the people around us with a bigger purpose in view. Purpose gets clearer when ego gets smaller.',
  },
  {
    id: 3,
    eyebrow: '03',
    label: 'Be the Light',
    description:
      'Being positive should never be based on circumstances, but on an internal belief we choose to carry into every room. Optimism is a discipline, not a mood.',
  },
  {
    id: 4,
    eyebrow: '04',
    label: 'Be the Solution',
    description:
      'Our success and fulfillment depend on our willingness to seek and help provide solutions with clarity and urgency. Help first, be the easy button, and lead with the kind of clarity that breeds confidence.',
  },
  {
    id: 5,
    eyebrow: '05',
    label: 'Find a Better Way',
    description:
      'We keep improving the way we work, communicate, and solve problems because good enough is rarely the right stopping point. Improvement is part of the job, not extra credit.',
  },
];
</script>

<template>
  <section class="core-values" aria-labelledby="core-values-title">
    <div class="core-values__inner">
      <header class="core-values__header">
        <p class="core-values__eyebrow">Our Core Values</p>
        <app-typography
          id="core-values-title"
          tag="h2"
          variant="heading-lg"
          class="core-values__title"
        >
          How we lead the work.
        </app-typography>
        <app-typography tag="p" variant="text-md" class="core-values__intro">
          The way we lead projects is the way we lead people: with clarity, discipline, humility,
          and a commitment to leave every partnership stronger than we found it.
        </app-typography>
      </header>

      <ol class="core-values__list">
        <li v-for="item in slides" :key="item.id" class="core-values__item">
          <article class="core-values__card">
            <span class="core-values__number">{{ item.eyebrow }}</span>
            <div class="core-values__copy">
              <app-typography tag="h3" variant="heading-sm" class="core-values__value-title">
                {{ item.label }}
              </app-typography>
              <app-typography tag="p" variant="text-sm" class="core-values__description">
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
.core-values {
  --section-bg: var(--color-envision-gray-900);
  --section-color: var(--color-white);
  --core-values-accent: var(--color-envision-green-500);
  --core-values-rule: color-mix(in oklab, var(--section-color) 14%, transparent);
  --core-values-muted: color-mix(in oklab, var(--section-color) 68%, transparent);

  grid-column: 1 / -1;
  color: var(--section-color);
  background: var(--section-bg);
  border-block: 1px solid var(--core-values-rule);
}

.core-values__inner {
  display: grid;
  width: 100%;
}

.core-values__header {
  display: grid;
  gap: calc(var(--spacing) * 3);
  align-content: end;
  min-height: 22rem;
  padding: calc(var(--spacing) * 8);
  border-block-end: 1px solid var(--core-values-rule);
}

.core-values__eyebrow {
  margin: 0;
  color: var(--core-values-accent);
  font-size: var(--font-size-text-t4);
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
}

.core-values__title {
  max-inline-size: 10ch;
  color: var(--section-color);
  text-wrap: balance;
}

.core-values__intro {
  max-width: 36rem;
  color: var(--core-values-muted);
  text-wrap: balance;
}

.core-values__list {
  display: grid;
  grid-template-columns: 1fr;
  margin: 0;
  padding: 0;
  list-style: none;
}

.core-values__item {
  min-width: 0;
  border-block-end: 1px solid var(--core-values-rule);
}

.core-values__item:last-child {
  border-block-end: 0;
}

.core-values__card {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: calc(var(--spacing) * 6);
  min-height: 12rem;
  padding: calc(var(--spacing) * 8);
  background: var(--section-bg);
}

.core-values__number {
  color: var(--core-values-muted);
  font-size: var(--font-size-text-t3);
  font-weight: 700;
  line-height: 1;
}

.core-values__copy {
  display: grid;
  gap: calc(var(--spacing) * 3);
  min-width: 0;
}

.core-values__value-title {
  max-inline-size: 18ch;
  color: var(--section-color);
  text-wrap: balance;
}

.core-values__description {
  max-width: 56rem;
  color: var(--core-values-muted);
  text-wrap: balance;
}

@media (min-width: 700px) {
  .core-values__header {
    min-height: 24rem;
    padding: calc(var(--spacing) * 12);
  }

  .core-values__card {
    grid-template-columns: 4rem minmax(0, 1fr);
    padding: calc(var(--spacing) * 10) calc(var(--spacing) * 12);
  }
}

@media (min-width: 1024px) {
  .core-values__inner {
    grid-template-columns: minmax(26rem, 0.82fr) minmax(0, 1.65fr);
  }

  .core-values__header {
    min-height: 40rem;
    border-block-end: 0;
    border-inline-end: 1px solid var(--core-values-rule);
  }

  .core-values__card {
    min-height: 8rem;
  }
}
</style>
