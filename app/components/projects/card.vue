<script setup lang="ts">
defineProps<{
  image: string;
  title: string;
  link: {
    to: string;
    title: string;
  };
}>();
</script>

<template>
  <div class="project-card">
    <NuxtLink
      :to="link.to"
      class="project-card__link"
      :aria-label="title"
    >
      <div class="project-card__media">
        <NuxtImg
          :src="image"
          :alt="title"
          class="project-card__img"
          format="webp"
          densities="x1 x2"
        />
        <div class="project-card__overlay" />
      </div>
      <div class="project-card__body">
        <h3 class="project-card__title">
          {{ title }}
        </h3>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
/*
  CUBE CSS
  - Composition: layout primitives
  - Block: .project-card and elements
  - Exceptions: state/interactive
*/

/* Composition */
.project-card {
  display: block;
}

.project-card__link {
  position: relative;
  display: block;
  width: 100%;
  aspect-ratio: 400 / 519; /* Matches Figma component ratio */
  overflow: hidden;
}

/* Block */
.project-card {
  & .project-card__media {
    position: absolute;
    inset: 0;
  }

  & .project-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 300ms ease;
    transform-origin: center center;
    display: block;
  }

  & .project-card__overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%);
    pointer-events: none;
  }

  & .project-card__body {
    position: absolute;
    inset: 0;
    padding: 24px;
    display: flex;
    align-items: flex-end;
  }

  & .project-card__title {
    margin: 0;
    font-family: 'Proxima Nova', var(--font-sans, sans-serif);
    font-weight: 600; /* Semibold */
    font-size: 49px;
    line-height: 49px;
    color: #fff;
  }
}

/* Exceptions */
.project-card__link:hover .project-card__img,
.project-card__link:focus-visible .project-card__img {
  transform: scale(1.05);
}

.project-card__link:focus-visible {
  outline: 2px solid var(--ui-primary, #3b82f6);
  outline-offset: 2px;
}
</style>
