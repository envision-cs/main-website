<script setup lang="ts">
defineProps<{
  eyebrow: string;
  title: string;
  icon: string;
  iconAlt?: string;
  logo?: string;
  link?: {
    label: string;
    to: string;
    color?: 'primary' | 'neutral';
  };
}>();
</script>

<template>
  <article>
    <NuxtLink :to="link?.to" class="news-feature-card">
      <div class="news-feature-card__meta">
        <div class="news-feature-card__logo">
          <UIcon
            :name="icon"
            class="news-feature-card__logo-icon"
            aria-hidden="true"
          />
        </div>

        <div class="news-feature-card__text">
          <p class="news-feature-card__eyebrow">
            {{ eyebrow }}
          </p>
          <h3 class="news-feature-card__title">
            {{ title }}
          </h3>
        </div>
      </div>

      <div class="news-feature-card__cta">
        <span>{{ link?.label }}</span>
        <UIcon name="i-lucide-arrow-up-right" aria-hidden="true" />
      </div>
    </NuxtLink>
  </article>
</template>

<style scoped>
.news-feature-card {
  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 32px 16px;
}

.news-feature-card__meta {
  display: flex;
  gap: 12px;
  width: 100%;
}

.news-feature-card__logo {
  display: grid;
  place-items: center;
  width: 46px;
  height: 46px;
  border-radius: 12px;
  background-color: #ffffff;
  overflow: hidden;
}

.news-feature-card__logo-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.news-feature-card__logo-icon {
  width: 40px;
  height: 40px;
  color: currentColor;
}

.news-feature-card__eyebrow {
  font-weight: 700;
  font-size: 16px;
  line-height: 1.5;
  margin: 0;
}

.news-feature-card__title {
  font-size: var(--text-2xl);
  font-weight: 500;
}

.news-feature-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  font-size: 20px;
  line-height: 1.5;
  color: inherit;
  text-decoration: none;
  transition:
    transform 0.2s ease,
    color 0.2s ease;
}

.news-feature-card__cta:hover {
  transform: translateX(4px);
  color: var(--ui-primary, #111827);
}

@media (max-width: 768px) {
  .news-feature-card__cta {
    margin-top: 16px;
  }
}
</style>
