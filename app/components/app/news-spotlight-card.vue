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
        <div class="news-feature-card__text">
          <app-typography tag="p">
            {{ eyebrow }}
          </app-typography>
          <app-typography tag="h3" variant="heading-md">
            {{ title }}
          </app-typography>
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
  min-height: 280px;
  gap: calc(var(--spacing) * 4);
  border-top: 1px solid var(--ui-border);
  padding: calc(var(--spacing) * 8) calc(var(--spacing) * 4);
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

.news-feature-card__cta {
  display: inline-flex;
  align-items: center;
  font-size: var(--font-size-text-t3);
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
