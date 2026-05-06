<script setup lang="ts">
defineProps<{
  to: string;
  image: string;
  eyebrow: string;
  title: string;
  copy: string;
  linkLabel: string;
  tone?: "services" | "projects";
  dataTest?: string;
}>();
</script>

<template>
  <NuxtLink
    class="services-feature-panel"
    :class="`services-feature-panel--${tone ?? 'services'}`"
    :data-test="dataTest"
    :to="to"
  >
    <img :src="image" alt="" class="services-feature-panel__image" />
    <div class="services-feature-panel__overlay" />
    <div class="services-feature-panel__grid" />
    <div class="services-feature-panel__content">
      <span class="services-feature-panel__eyebrow">{{ eyebrow }}</span>
      <h2 class="services-feature-panel__title">{{ title }}</h2>
      <p class="services-feature-panel__copy">
        {{ copy }}
      </p>
      <div class="services-feature-panel__rule" />
      <span class="services-feature-panel__link">{{ linkLabel }}</span>
    </div>
  </NuxtLink>
</template>

<style scoped>
.services-feature-panel {
  position: relative;
  display: flex;
  align-items: flex-end;
  overflow: hidden;
  min-height: 350px;
  padding: clamp(1.5rem, 2vw, 2rem);
  color: white;
  text-decoration: none;
  isolation: isolate;
  background: var(--color-envision-blue-700);
}

.services-feature-panel--projects {
  background: var(--color-envision-green-600);
}

.services-feature-panel__image,
.services-feature-panel__overlay,
.services-feature-panel__grid {
  position: absolute;
  inset: 0;
}

.services-feature-panel__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.72;
  filter: grayscale(1) contrast(0.55);
  z-index: -2;
}

.services-feature-panel__overlay {
  background: var(--color-envision-blue-700);
  mix-blend-mode: multiply;
  z-index: -1;
}

.services-feature-panel--projects .services-feature-panel__overlay {
  background: var(--color-envision-green-600);
}

.services-feature-panel__grid {
  background:
    linear-gradient(rgb(255 255 255 / 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgb(255 255 255 / 0.12) 1px, transparent 1px);
  background-size: 3rem 3rem;
  mask-image: linear-gradient(180deg, rgb(0 0 0 / 0.2), transparent 85%);
  z-index: -1;
}

.services-feature-panel__content {
  display: grid;
  gap: 0.9rem;
  width: min(19rem, 100%);
  align-content: end;
}

.services-feature-panel__eyebrow {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgb(255 255 255 / 0.74);
}

.services-feature-panel__title {
  margin: 0;
  font-size: clamp(3rem, 5vw, 4.2rem);
  font-weight: 600;
  line-height: 0.9;
  letter-spacing: -0.045em;
  text-transform: uppercase;
}

.services-feature-panel__copy {
  margin: 0;
  max-width: 16rem;
  font-size: 0.98rem;
  line-height: 1.45;
  color: rgb(255 255 255 / 0.82);
}

.services-feature-panel__rule {
  width: min(10rem, 100%);
  height: 1px;
  background: rgb(255 255 255 / 0.62);
}

.services-feature-panel__link {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 0.88rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.services-feature-panel__link::after {
  content: "";
  width: 2rem;
  height: 1px;
  background: currentColor;
  transition: transform 240ms ease;
}

.services-feature-panel:hover .services-feature-panel__link::after,
.services-feature-panel:focus-visible .services-feature-panel__link::after {
  transform: translateX(0.35rem);
}

@media (prefers-reduced-motion: reduce) {
  .services-feature-panel__link::after {
    transition: none;
  }
}
</style>
