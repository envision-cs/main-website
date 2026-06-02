<script setup lang="ts">
interface HomeHero {
  title?: string;
  subtitle?: string;
  image?: {
    url?: string;
  } | null;
}

const { data: hero } = useAsyncData<HomeHero>("home-hero", () => $fetch("/api/home-hero"));
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
        :src="hero.image.url"
        alt="Exterior view of a residence hall at dusk"
        sizes="100vw sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
        fit="cover"
        preload
        format="avif,webp"
        loading="eager"
        class="hero__image"
      />
    </div>

    <div class="hero__overlay" aria-hidden="true" />

    <div class="hero__inner site-grid">
      <div class="hero__copy">
        <Icon name="logos:envision" class="hero-logo" aria-hidden="true" />

        <app-typography id="hero-title" tag="h1" variant="heading-huge" bold class="hero-title">
          {{ hero.title }}
        </app-typography>

        <app-typography id="hero-summary" tag="p" variant="text-xl" class="hero-summary">
          {{ hero.subtitle }}
        </app-typography>

        <div class="hero-actions">
          <my-button variant="primary" size="md" to="/contact">Start your project</my-button>
          <my-button variant="outline" size="md" to="/projects">Explore Our Portfolio</my-button>
        </div>

        <service-list class="services" />
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
  height: 100svh;
  min-height: 620px;
  max-height: 920px;
  grid-column: 1 / -1;
  color: var(--section-color);
  background: var(--section-bg);
  overflow: hidden;

  @media (min-width: 700px) {
    min-height: 760px;
    max-height: 1000px;
  }
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
  background:
    linear-gradient(
      to right,
      rgba(7, 9, 12, 0.66) 0%,
      rgba(7, 9, 12, 0.3) 42%,
      rgba(7, 9, 12, 0.06) 72%
    ),
    linear-gradient(
      to top,
      rgba(7, 9, 12, 0.68) 0%,
      rgba(7, 9, 12, 0.2) 48%,
      rgba(7, 9, 12, 0.08) 100%
    );
}

.hero__inner {
  z-index: 3;
  position: relative;
  width: 100%;
  height: 100%;
  align-self: stretch;
  align-items: end;
  gap: calc(var(--spacing) * 6);
  padding: calc(var(--spacing) * 24) calc(var(--spacing) * 3) calc(var(--spacing) * 5);
}

.hero__copy {
  display: grid;
  grid-column: 1 / -1;
  align-content: end;
  gap: calc(var(--spacing) * 4);
  z-index: 2;
  max-width: min(100%, 38rem);
}

.hero__rail {
  display: grid;
  grid-column: 1 / -1;
  z-index: 2;
  gap: calc(var(--spacing) * 3);
  align-self: end;
  min-width: 0;
}

.hero-logo {
  display: block;
  width: clamp(9.25rem, 16vw, 13rem);
  height: clamp(1.65rem, 2.86vw, 2.35rem);
  animation: hero-reveal 920ms cubic-bezier(0.19, 1, 0.22, 1) both;
}

.hero-title {
  color: var(--color-white);
  text-wrap: balance;
  letter-spacing: 0;
  line-height: 0.98;
  animation: hero-reveal 1040ms cubic-bezier(0.19, 1, 0.22, 1) both;
  max-width: 13ch !important;
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
  color: color-mix(in srgb, var(--color-white) 82%, transparent);
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

.hero-actions :deep(.btn[data-variant="outline"]) {
  background: color-mix(in oklch, var(--color-white) 14%, transparent);
  color: var(--color-white);
}

.services {
  width: 100%;
  max-width: 42rem;
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
  content: "";
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
    padding-top: calc(var(--spacing) * 30);
    padding-inline: clamp(2rem, 5vw, 7.5rem);
    padding-bottom: clamp(4.5rem, 9vh, 7rem);
  }

  .hero__copy {
    grid-column: 1 / 8;
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
    align-items: end;
  }

  .hero__copy {
    grid-column: 2 / 11;
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

@media (prefers-reduced-motion: reduce) {
  .hero__image,
  .hero-logo,
  .hero-title,
  .hero-summary,
  .hero-actions,
  .services {
    animation: none;
    transform: none;
  }
}
</style>
