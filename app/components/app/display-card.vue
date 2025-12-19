<script setup lang="ts">
defineProps<{
  link?: string;
  image?: string;
  alt?: string;
  sector?: string;
  title?: string;
  completed?: string;
  aspectRatio?: '5/3' | '4/3' | '16/9' | '3/4' | '1/1' | '3/1';
  heading?: 'heading-sm' | 'heading-md';
}>();
</script>

<template>
  <NuxtLink class="project-card" :href="link">
    <figure class="project-card__figure">
      <NuxtImg
        class="project-card__image"
        format="webp"
        :src="image"
        alt="Renovated open-plan office with glass partitions and warm wood finishes"
        loading="lazy"
        sizes="100vw sm:640px md:768px lg:1024px xl:1400px"
      />
      <figcaption class="project-card__body">
        <div class="flex justify-between">
          <app-typography tag="p" variant="text-lg">
            {{ sector }}
          </app-typography>

          <app-typography tag="p" variant="text-lg">
            {{ completed }}
          </app-typography>
        </div>
        <div class="flex justify-between">
          <app-typography tag="h3" :variant="heading">
            {{ title }} Hello
          </app-typography>
          <UIcon
            name="i-lucide-arrow-right"
            size="32"
            class="arrow"
          />
        </div>

        <span class="project-card__cta">
          <span class="u-visually-hidden">
            View project : {{ title }}
          </span>
        </span>
      </figcaption>
    </figure>
  </NuxtLink>
</template>

<style scoped>
.project-card {
  display: block;
  text-decoration: none;
  overflow: hidden;
}

.project-card__figure {
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}

/* image is important content, not decorative */
.project-card__image {
  display: block;
  width: 100%;
  object-fit: cover;
  aspect-ratio: v-bind(aspectRatio);

  @media (min-width: 750px) {
    aspect-ratio: v-bind(aspectRatio);
  }
}

.project-card__body {
  padding: calc(var(--spacing) * 2);
  display: flex;
  flex-direction: column;
  row-gap: 0.35rem;
}

.project-card__kicker {
  margin: 0 0 0.1rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--project-card-muted);
}

.project-card__title {
  margin: 0;
  font-size: 1rem;
  line-height: 1.3;
}

.project-card__cta {
  margin-top: 0.75rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--project-card-accent);
}

.arrow {
  opacity: 0;
  transform: translateX(-50%);
  transition:
    opacity 0.2s ease-in-out,
    transform 0.2s ease-in-out;
}

/* **State: hover / focus** */
.project-card:hover,
.project-card:focus-visible {
  .arrow {
    transform: translateX(0);
    opacity: 1;
  }
}

.project-card:focus-visible {
  outline: 2px solid var(--project-card-accent);
  outline-offset: 2px;
}
</style>
