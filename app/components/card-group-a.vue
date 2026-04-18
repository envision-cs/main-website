<script setup lang="ts">
interface Card {
  title: string;
  link: string;
  image: string;
  sector: string;
  completed: string;
}

defineProps<{
  cards: Card[];
  spacing?: string;
}>();
</script>

<template>
  <section class="card-group-a">
    <div class="main-wrapper site-grid">
      <ul class="wrapper">
        <li v-for="(card, index) in cards" :key="index">
          <app-reveal-card
            :image="card.image"
            :title="card.title"
            :to="card.link"
            aspect-ratio="3/4"
            :title-offset="-16"
            :image-hover-blur="0"
          >
            <template #title>
              <app-typography class="" variant="heading-md">
                {{ card.title }}
              </app-typography>
            </template>
            <template #meta>
              <div class="flex gap-2 items-center">
                <p>See Project</p>
                <UIcon name="i-lucide-arrow-right" />
              </div>
            </template>
          </app-reveal-card>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
section {
  grid-column: 1/-1;
}

.main-wrapper {
  container-type: inline-size;
  gap: calc(var(--spacing) * 8);
}

.wrapper {
  display: grid;
  grid-column: 1/-1;

  @container (inline-size < 30ch) {
    grid-template-columns: repeat(1, 1fr);
  }

  @container (inline-size > calc(30ch * 2 + 1rem)) {
    grid-template-columns: repeat(2, 1fr);
  }

  @container (inline-size > calc(30ch * 3 + 1rem)) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}

.wrapper > li {
  display: grid;
}

.wrapper > li:last-of-type {
  grid-column: 1;

  @container (inline-size > calc(30ch * 2 + 1rem)) {
    grid-column: 1/-1;
  }

  @container (inline-size > calc(30ch * 3 + 1rem)) {
    grid-column: unset;
  }
}

.image-link {
  position: relative;
  display: grid;
  min-height: 100%;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  isolation: isolate;
  text-decoration: none;
  color: var(--color-white);
  background-color: var(--color-envision-gray-900);
  outline: 1px solid color-mix(in srgb, var(--color-white) 18%, transparent);
}

.image-link__image,
.image-link__overlay,
.image-link__content {
  grid-area: 1 / 1;
}

.image-link__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  transform: scale(1);
  transition:
    transform 220ms var(--ease-gentle),
    filter 220ms var(--ease-gentle);
}

.image-link__overlay {
  background:
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--color-envision-gray-900) 84%, transparent) 0%,
      color-mix(in srgb, var(--color-envision-gray-900) 78%, transparent) 100%
    ),
    linear-gradient(
      180deg,
      color-mix(in srgb, var(--ui-primary) 12%, transparent) 0%,
      color-mix(in srgb, var(--ui-secondary) 6%, transparent) 100%
    );
  z-index: 1;
}

.image-link__content {
  position: relative;
  z-index: 2;
  display: grid;
  align-content: space-between;
  gap: clamp(1.5rem, 2vw, 2.25rem);
  padding: clamp(1.25rem, 1.8vw, 1.6rem);
}

.image-link__quote {
  max-width: 12ch;
  color: var(--color-white);
  font-size: clamp(2rem, 3vw, 3rem);
  line-height: 1.02;
  letter-spacing: 0.01em;
}

.image-link__cta {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 4.75rem;
  padding-inline: 1rem;
  border: 1px solid color-mix(in srgb, var(--color-white) 82%, transparent);
  background-color: color-mix(in srgb, var(--color-white) 6%, transparent);
  transition:
    background-color 180ms var(--ease-gentle),
    border-color 180ms var(--ease-gentle),
    transform 180ms var(--ease-gentle);
}

.image-link__label {
  color: var(--color-white);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

.image-link:hover .image-link__image,
.image-link:focus-visible .image-link__image {
  transform: scale(1.03);
  filter: grayscale(0.9);
}

.image-link:hover .image-link__cta,
.image-link:focus-visible .image-link__cta {
  background-color: color-mix(in srgb, var(--color-white) 12%, transparent);
  border-color: var(--color-white);
  transform: translateY(-2px);
}

.image-link:focus-visible {
  outline: 2px solid var(--ui-secondary);
  outline-offset: 4px;
}
</style>
