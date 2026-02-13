<script setup lang="ts">
const props = withDefaults(defineProps<{
  link?: string;
  image?: string;
  alt?: string;
  sector?: string;
  title?: string;
  completed?: string;
  aspectRatio?: '5/3' | '4/3' | '16/9' | '3/4' | '1/1' | '3/1';
  heading?: 'heading-sm' | 'heading-md';
}>(), {
  aspectRatio: '16/9',
  heading: 'heading-md',
});

const linkTo = computed(() => props.link || '#');
const imageAlt = computed(() => props.alt || props.title || 'Display card image');
</script>

<template>
  <NuxtLink
    class="display-card"
    :to="linkTo"
    :aria-label="props.title || 'View details'"
    prefetch-on="interaction"
  >
    <figure class="display-card__figure">
      <NuxtImg
        class="display-card__image"
        format="webp"
        :src="props.image"
        :alt="imageAlt"
        loading="lazy"
        sizes="100vw sm:640px md:768px lg:1024px xl:1400px"
      />
      <figcaption class="display-card__content">
        <div v-if="props.sector || props.completed" class="display-card__stats">
          <app-typography
            v-if="props.sector"
            tag="p"
            variant="text-sm"
          >
            {{ props.sector }}
          </app-typography>
          <app-typography
            v-if="props.completed"
            tag="p"
            variant="text-sm"
          >
            {{ props.completed }}
          </app-typography>
        </div>
        <app-typography
          tag="h3"
          :variant="props.heading"
          class="display-card__title"
        >
          {{ props.title }}
        </app-typography>
        <span class="display-card__meta">
          View details
          <UIcon
            name="i-lucide-arrow-right"
            size="20"
            aria-hidden="true"
          />
        </span>
      </figcaption>
    </figure>
  </NuxtLink>
</template>

<style scoped>
.display-card {
  --display-title-height: 3.25rem;
  position: relative;
  display: block;
  text-decoration: none;
  overflow: hidden;
  border-radius: calc(var(--ui-radius));
  outline: 1px solid rgb(255 255 255 / 0.2);
}

.display-card__figure {
  margin: 0;
  position: relative;
  aspect-ratio: v-bind('props.aspectRatio');
  isolation: isolate;
}

.display-card__figure::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(to top, rgb(0 0 0 / 0.85) 0%, rgb(0 0 0 / 0.4) 50%, rgb(0 0 0 / 0) 100%);
}

.display-card__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: blur(0);
  transform: scale(1);
  z-index: 0;
  transition:
    transform 0.5s var(--ease-base),
    filter 0.5s var(--ease-base);
}

.display-card__content {
  position: absolute;
  inset: auto 0 0;
  z-index: 2;
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
  color: var(--ui-text-inverted);
  transform: translateY(calc(100% - var(--display-title-height)));
  transition: transform 0.5s var(--ease-base);
}

.display-card__stats {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  opacity: 0;
  transform: translateY(100%);
  transition: transform 0.5s var(--ease-base);
  transition-delay: 100ms;
}

.display-card__title {
  text-wrap: balance;
}

.display-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgb(255 255 255 / 0.3);
  padding-top: 0.75rem;
  opacity: 0;
  transform: translateY(100%);
  transition:
    transform 0.5s var(--ease-base),
    opacity 0.3s var(--ease-base);
  transition-delay: 140ms;
}

.display-card:hover .display-card__image,
.display-card:focus-visible .display-card__image {
  filter: blur(5px);
  transform: scale(1.1);
}

.display-card:hover .display-card__content,
.display-card:focus-visible .display-card__content,
.display-card:hover .display-card__stats,
.display-card:focus-visible .display-card__stats,
.display-card:hover .display-card__meta,
.display-card:focus-visible .display-card__meta {
  transform: translateY(0);
}

.display-card:hover .display-card__stats,
.display-card:focus-visible .display-card__stats,
.display-card:hover .display-card__meta,
.display-card:focus-visible .display-card__meta {
  opacity: 1;
}

.display-card:focus-visible {
  outline: 2px solid var(--ui-primary);
  outline-offset: 3px;
}

@media (prefers-reduced-motion: reduce) {
  .display-card,
  .display-card__image,
  .display-card__content,
  .display-card__stats,
  .display-card__meta {
    transition: none !important;
    animation: none !important;
  }
}
</style>
