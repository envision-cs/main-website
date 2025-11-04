<script setup lang="ts">
import type { Link } from '#shared/types/global';

defineProps<{
  image?: string;
  icon?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  link?: Link;
  wide?: boolean;
}>();
</script>

<template>
  <div class="news-card" :class="image ? 'has-image' : ''">
    <!-- Image -->
    <div v-if="image" class="news-card__image">
      <NuxtImg
        :src="image"
        class="news-card__img"
        alt="News card image"
        densities="x1 x2"
        format="webp"
        fit="cover"
      />
    </div>

    <!-- Content -->
    <div class="news-card__content">
      <div class="news-card__inner">
        <div class="news-card__header">
          <UIcon
            v-if="icon"
            :name="icon"
            class="news-card__icon"
          />
          <div>
            <app-typography tag="p" variant="text-md">
              {{ eyebrow }}
            </app-typography>
            <app-typography
              v-if="title"
              tag="h3"
              variant="heading-md"
            >
              {{ title }}
            </app-typography>
          </div>
        </div>

        <app-typography
          v-if="description"
          tag="p"
          variant="text-md"
        >
          {{ description }}
        </app-typography>
      </div>

      <div class="news-card__actions">
        <UButton
          v-if="link"
          :key="link.label"
          :to="link.to"
          size="xl"
          :color="link.color"
          variant="solid"
          class="news-card__button"
        >
          {{ link.label }}
        </UButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Composition */
.news-card {
  container-type: inline-size;
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow: hidden;
  height: min-content;
}

/* Block */
.news-card {
  & .news-card__image {
    position: relative;
    flex: 0 0 auto;
    display: none;
  }

  & .news-card__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  & .news-card__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-width: 0;
    height: 100%;
  }

  & .news-card__inner {
    padding: 24px 16px;
    display: grid;
    gap: calc(vaj(--spacing) * 4);
    margin-bottom: 60px;
  }

  & .news-card__header {
    display: grid;
    gap: 16px;
  }

  & .news-card__icon {
    width: 46px;
    height: 46px;
    color: var(--ui-text);
  }

  & .news-card__actions {
    padding: 0 16px 24px 16px;
  }
}

/* Exceptions */
@container (min-width: 500px) {
  .news-card {
    &.has-image .news-card__image {
      display: block;
      width: 306.5px;
    }
  }
}
</style>
