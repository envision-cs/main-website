<script setup lang="ts">
interface Accomplishment {
  id: number;
  value: string;
  label: string;
}

withDefaults(
  defineProps<{
    eyebrow?: string;
    title: string;
    image?: string;
    imageAlt?: string;
    accomplishments: Accomplishment[];
    bgcolor?: 'light' | 'dark' | 'blue';
  }>(),
  {
    bgcolor: 'dark',
  },
);
</script>

<template>
  <section
    class="accomplishments"
    :class="{
      light: bgcolor === 'light',
      dark: bgcolor === 'dark',
      blue: bgcolor === 'blue',
    }"
  >
    <div class="accomplishments__inner">
      <header
        class="accomplishments__header"
        :class="{ 'accomplishments__header--has-image': image }"
      >
        <NuxtImg
          v-if="image"
          :src="image"
          :alt="imageAlt || ''"
          format="avif"
          loading="lazy"
          fit="cover"
          sizes="100vw md:50vw xl:720px"
          class="accomplishments__image"
        />
        <div v-if="image" class="accomplishments__overlay" aria-hidden="true" />

        <p v-if="eyebrow" class="accomplishments__eyebrow">{{ eyebrow }}</p>
        <app-typography tag="h2" variant="heading-lg" class="accomplishments__title">
          {{ title }}
        </app-typography>
      </header>

      <dl class="accomplishments__stats" aria-label="Company accomplishments">
        <div v-for="stat in accomplishments" :key="stat.id" class="accomplishments__stat">
          <dt>{{ stat.label }}</dt>
          <dd>{{ stat.value }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.accomplishments {
  --section-bg: var(--color-envision-gray-900);
  --section-color: var(--color-white);
  --accomplishments-accent: var(--color-envision-green-500);
  --accomplishments-rule: color-mix(in oklab, var(--section-color) 14%, transparent);
  --accomplishments-muted: color-mix(in oklab, var(--section-color) 66%, transparent);

  grid-column: 1 / -1;
  color: var(--section-color);
  background: var(--section-bg);
  border-block: 1px solid var(--accomplishments-rule);
}

.light {
  --section-bg: color-mix(in oklab, var(--color-envision-gray-900) 2%, white);
  --section-color: var(--color-envision-gray-900);
  --accomplishments-accent: var(--color-envision-blue-500);
  --accomplishments-rule: color-mix(in oklab, var(--section-color) 12%, transparent);
  --accomplishments-muted: color-mix(in oklab, var(--section-color) 62%, transparent);
}

.blue {
  --section-bg: var(--color-envision-blue-950);
  --section-color: var(--color-white);
  --accomplishments-accent: var(--color-envision-blue-500);
}

.accomplishments__inner {
  display: grid;
  width: 100%;
  margin-inline: auto;
}

.accomplishments__header {
  position: relative;
  display: grid;
  gap: calc(var(--spacing) * 3);
  align-content: end;
  min-height: 22rem;
  padding: calc(var(--spacing) * 8);
  border-block-end: 1px solid var(--accomplishments-rule);
  overflow: hidden;
  isolation: isolate;
}

.accomplishments__header--has-image {
  --section-color: var(--color-white);
}

.accomplishments__image,
.accomplishments__overlay {
  position: absolute;
  inset: 0;
}

.accomplishments__image {
  z-index: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.accomplishments__overlay {
  z-index: 1;
  background:
    radial-gradient(
      ellipse at 22% 78%,
      rgb(7 12 18 / 0.86) 0%,
      rgb(7 12 18 / 0.64) 34%,
      rgb(7 12 18 / 0.22) 64%,
      transparent 84%
    ),
    linear-gradient(0deg, rgb(7 12 18 / 0.34) 0%, rgb(7 12 18 / 0.1) 46%, transparent 78%);
}

.accomplishments__header > *:not(.accomplishments__image, .accomplishments__overlay) {
  position: relative;
  z-index: 2;
}

.accomplishments__eyebrow {
  width: fit-content;
  margin: 0;
  color: var(--accomplishments-accent);
  font-size: var(--font-size-text-t4);
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
}

.accomplishments__title {
  max-inline-size: 12ch;
  color: var(--section-color);
}

.accomplishments__stats {
  display: grid;
  grid-template-columns: 1fr;
  margin: 0;
}

.accomplishments__stat {
  display: grid;
  grid-template-areas:
    'value'
    'label';
  gap: calc(var(--spacing) * 4);
  min-width: 0;
  /*min-height: 12rem;*/
  padding: calc(var(--spacing) * 8);
  border-block-end: 1px solid var(--accomplishments-rule);
  background: var(--section-bg);
}

.accomplishments__stat dt {
  grid-area: label;
  margin: 0;
  color: var(--accomplishments-muted);
  font-size: var(--font-size-text-t3);
  font-weight: 500;
  line-height: 1;
}

.accomplishments__stat dd {
  grid-area: value;
  margin: 0;
  color: var(--section-color);
  font-size: var(--font-size-h1);
  font-weight: 500;
  line-height: 0.95;
}

.accomplishments__stat:last-child {
  border-block-end: 0;
}

@media (min-width: 700px) {
  .accomplishments__header {
    min-height: auto;
    padding: calc(var(--spacing) * 12);
  }

  .accomplishments__stats {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .accomplishments__stat {
    border-block-end: 0;
    border-inline-end: 1px solid var(--accomplishments-rule);
  }

  .accomplishments__stat:last-child {
    border-inline-end: 0;
  }
}

@media (min-width: 1024px) {
  .accomplishments__inner {
    grid-template-columns: minmax(26rem, 1fr) minmax(0, 1.35fr);
  }

  .accomplishments__header {
    min-height: auto;
    border-block-end: 0;
    border-inline-end: 1px solid var(--accomplishments-rule);
  }

  .accomplishments__stats {
    grid-template-columns: 1fr;
  }

  .accomplishments__stat {
    min-height: auto;
    border-inline-end: 0;
    border-block-end: 1px solid var(--accomplishments-rule);
  }

  .accomplishments__stat:last-child {
    border-block-end: 0;
  }
}
</style>
