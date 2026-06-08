<script setup lang="ts">interface HomeHero {
  title?: string;
  subtitle?: string;
  image?: {
    url?: string;
  } | null;
}

const { data: hero } = useAsyncData<HomeHero>('home-hero', () => $fetch('/api/home-hero'));
</script>

<template>
  <section
    v-if="hero"
    class="hero"
    aria-labelledby="hero-title"
    aria-describedby="hero-summary"
    role="region"
  >
    <div class="hero__media">
      <NuxtImg
        v-if="hero.image?.url"
        provider="imagekit"
        :src="hero.image.url"
        alt="Exterior view of a residence hall at dusk"
        sizes="500px sm:700px md:800px lg:1200px xl:1400px 2xl:1920px"
        fit="cover"
        :preload="{ fetchPriority: 'high' }"
        format="avif,webp"
        loading="eager"
        class="hero__image"
      />
    </div>

    <div class="hero__overlay" aria-hidden="true" />

    <div class="hero__inner site-max mx-auto">
      <!-- <service-list class="services mb-auto" /> -->
      <div class="hero__copy mt-auto">
        <app-typography id="hero-title" tag="h1" variant="heading-huge" bold class="">
          {{ hero.title }}
        </app-typography>

        <app-typography id="hero-summary" tag="p" variant="text-xl" class="hero-summary">
          {{ hero.subtitle }}
        </app-typography>

        <div class="hero-actions">
          <my-button variant="primary" size="sm" to="/contact">Start your project</my-button>
          <my-button variant="secondary" size="sm" to="/projects">Explore Our Portfolio</my-button>
        </div>
      </div>

      <aside class="hero__rail" aria-label="Featured projects">
        <home-featured-projects-carousel />
      </aside>
    </div>
  </section>
</template>

<style scoped>
.hero {
  --section-bg: var(--color-envision-gray-900);
  --section-color: var(--color-white);

  display: grid;
  isolation: isolate;
  position: relative;
  min-height: clamp(600px, 85svh, 820px);
  grid-column: 1 / -1;
  color: var(--section-color);
  background: var(--section-bg);
  overflow: hidden;
}

.hero__media,
.hero__overlay {
  position: absolute;
  inset: 0;
}

.hero__media {
  z-index: 0;
  overflow: hidden;
}

.hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: hero-drift 22s ease-in-out infinite alternate;
  transform: scale(1.02);
  transform-origin: center center;
}

.hero__overlay {
  z-index: 1;
  background: rgba(6, 11, 18, 0.25);
}

.hero__inner {
  z-index: 3;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  gap: calc(var(--spacing) * 6);
  padding: calc(var(--spacing) * 12) calc(var(--spacing) * 4) calc(var(--spacing) * 5);
  align-content: end;
}

.hero__copy {
  display: grid;
  align-content: end;
  gap: calc(var(--spacing) * 4);
  z-index: 2;
}

.hero__rail {
  display: grid;
  grid-column: 1 / -1;
  z-index: 2;
  gap: calc(var(--spacing) * 3);
  align-self: center;
  min-width: 0;
  margin-top: auto;
}

.hero-logo {
  display: block;
  width: clamp(9.25rem, 7vw, 13rem);
  height: clamp(1.65rem, 2.86vw, 2.35rem);
  animation: hero-reveal 920ms cubic-bezier(0.19, 1, 0.22, 1) both;
}

.hero-title {
  color: var(--color-white);
  text-wrap: balance;
  letter-spacing: 0;
  line-height: 0.98;
  animation: hero-reveal 1040ms cubic-bezier(0.19, 1, 0.22, 1) both;
  font-weight: 300;

  span {
    color: var(--color-envision-blue-500);
    font-style: italic;
  }

  span:nth-of-type(2) {
    color: var(--color-envision-green-500);
    font-style: italic;
  }
}

.hero-summary {
  margin: 0;
  max-width: 35rem;
  color: var(--color-white);
  line-height: 1.28;
  text-wrap: pretty;
  animation: hero-reveal 1160ms cubic-bezier(0.19, 1, 0.22, 1) both;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--spacing) * 2.5);
  align-items: center;
  padding-top: calc(var(--spacing) * 2);
  animation: hero-reveal 1280ms cubic-bezier(0.19, 1, 0.22, 1) both;
}

.hero-actions :deep(.app-btn) {
  text-transform: none;
}

.hero-actions :deep(.btn) {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 3.15rem;
  border-radius: 14px;
  border-color: color-mix(in oklch, var(--color-white) 15%, transparent);
  background: color-mix(in oklch, var(--color-envision-gray-900) 74%, transparent);
  color: var(--color-white);
  backdrop-filter: blur(18px);
}

.hero-actions :deep(.btn[data-variant='outline']) {
  background: color-mix(in oklch, var(--color-white) 14%, transparent);
  color: var(--color-white);
}

.services {
  width: 100%;
  padding-top: calc(var(--spacing) * 2);
  animation: hero-reveal 1380ms cubic-bezier(0.19, 1, 0.22, 1) both;
}

.services :deep(ul) {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: calc(var(--spacing) * 2);
}

.services :deep(li) {
  min-width: 0;
}

.services :deep(.chip-link) {
  position: relative;
  justify-content: flex-start;
  min-height: 2.45rem;
  width: 100%;
  min-width: 0;
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 3);
  border-color: color-mix(in oklch, var(--color-white) 13%, transparent);
  border-radius: 10px;
  background: color-mix(in oklch, var(--color-envision-gray-900) 58%, transparent);
  color: color-mix(in oklch, var(--color-white) 88%, transparent);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}

.services :deep(.chip-link)::before {
  content: '';
  flex: 0 0 auto;
  width: 0.42rem;
  height: 0.42rem;
  background: var(--color-envision-green-500);
}

.services :deep(.chip-link:hover),
.services :deep(.chip-link:focus-visible) {
  border-color: color-mix(in oklch, var(--color-envision-green-500) 74%, var(--color-white));
  background: color-mix(in oklch, var(--color-envision-gray-900) 72%, transparent);
  color: var(--color-white);
}

.services :deep(.chip-link__label) {
  min-width: 0;
  max-inline-size: none;
  overflow-wrap: anywhere;
  font-size: 0.72rem;
  font-weight: 700;
  line-height: 1.05;
  letter-spacing: 0.02em;
  text-wrap: pretty;
}

@media (min-width: 700px) {
  .hero__inner {
    padding-bottom: clamp(4.5rem, 9vh, 7rem);
  }

  .hero__rail {
    grid-column: 8 / -1;
    justify-self: end;
  }

  .services :deep(ul) {
    display: flex;
    flex-wrap: wrap;
  }

  .services :deep(.chip-link) {
    width: auto;
    min-height: 2rem;
    border-radius: 999px;
    padding-block: calc(var(--spacing) * 1.5);
  }

  .services :deep(.chip-link__label) {
    white-space: nowrap;
  }
}

@media (min-width: 1024px) {
  .hero__inner {
    padding: calc(var(--spacing) * 20) calc(var(--spacing) * 12) calc(var(--spacing) * 5);
  }

  .hero__copy {
    margin-bottom: calc(var(--spacing) * 7);
  }

  .hero__rail {
    grid-column: 17 / -1;
    margin-bottom: calc(var(--spacing) * 4);
  }
}

@media (min-width: 1280px) {
  .hero__copy {
    grid-column: 2 / 10;
  }

  .hero__rail {
    grid-column: 18 / -1;
  }
}
</style>
