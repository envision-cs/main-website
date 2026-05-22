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
        <Icon name="logos:envision" size="30" aria-hidden="true" />

        <app-typography id="hero-title" tag="h2" variant="heading-huge" bold class="hero-title">
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
  --header-height: 3.5rem;

  display: grid;
  isolation: isolate;
  position: relative;
  height: calc(100dvh - var(--header-height));
  min-height: 620px;
  max-height: min(calc(100dvh - var(--header-height)), 850px);
  grid-column: 1 / -1;
  color: var(--section-color);
  background: var(--section-bg);
  overflow: hidden;

  @media (min-width: 700px) {
    min-height: 750px;
    max-height: min(calc(100dvh - var(--header-height)), 1000px);
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
  animation: hero-drift 18s ease-in-out infinite alternate;
  transform: scale(1.04);
  transform-origin: center center;
}

.hero__overlay {
  z-index: 1;
  background: 
    /* Subtle text backing overlay coming from the bottom-left */
    linear-gradient(
      to top right,
      rgba(6, 11, 18, 0.85) 0%,
      rgba(6, 11, 18, 0.4) 35%,
      rgba(6, 11, 18, 0) 70%
    ),
    /* Main bottom-to-top cinematic fade */
    linear-gradient(
        to top,
        rgba(6, 11, 18, 0.75) 0%,
        rgba(6, 11, 18, 0.3) 45%,
        rgba(6, 11, 18, 0) 80%
      );
}

.hero__inner {
  z-index: 3;
  position: relative;
  width: 100%;
  align-self: end;
  gap: calc(var(--spacing) * 8);
  padding: calc(var(--spacing) * 16) calc(var(--spacing) * 4) calc(var(--spacing) * 12);
}

.hero__copy {
  display: grid;
  grid-column: 1 / -1;
  align-content: end;
  gap: calc(var(--spacing) * 5);
  z-index: 2;
  max-width: 60rem;
}

.hero__rail {
  display: grid;
  grid-column: 1 / -1;
  gap: calc(var(--spacing) * 4);
  align-self: end;
  min-width: 0;
}

.hero-title {
  color: var(--color-white);
  text-wrap: balance;
  letter-spacing: 1%;
  line-height: 0.92;
  animation: hero-reveal 1040ms cubic-bezier(0.19, 1, 0.22, 1) both;
  max-width: 40ch !important;

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
  max-width: 60ch;
  color: color-mix(in srgb, var(--color-white) 84%, transparent);
  line-height: 1.35;
  text-wrap: balance;
  animation: hero-reveal 1160ms cubic-bezier(0.19, 1, 0.22, 1) both;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--spacing) * 3);
  align-items: center;
  padding-top: clamp(0.5rem, 1vw, 0.85rem);
  animation: hero-reveal 1280ms cubic-bezier(0.19, 1, 0.22, 1) both;
}

.hero-actions :deep(.app-btn) {
  border-radius: 4px;
  text-transform: none;
}

.services {
  width: 100%;
  animation: hero-reveal 1380ms cubic-bezier(0.19, 1, 0.22, 1) both;
}

@media (min-width: 700px) {
  .hero__inner {
    padding-top: calc(var(--spacing) * 28);
    padding-inline: calc(var(--spacing) * 8);
    padding-bottom: calc(var(--spacing) * 16);
  }

  .hero__copy {
    grid-column: 1 / 8;
  }

  .hero__rail {
    grid-column: 9 / -1;
  }
}

@media (min-width: 1024px) {
  .hero__inner {
    align-items: end;
  }

  .hero__copy {
    grid-column: 1 / 15;
  }

  .hero__rail {
    grid-column: 17 / -1;
  }
}

@media (min-width: 1280px) {
  .hero__copy {
    grid-column: 1 / 14;
  }

  .hero__rail {
    grid-column: 16 / -1;
  }
}

@keyframes hero-drift {
  from {
    transform: scale(1.04) translate3d(0, 0, 0);
  }

  to {
    transform: scale(1.1) translate3d(-1.5%, -1%, 0);
  }
}

@keyframes hero-reveal {
  from {
    opacity: 0.01;
    transform: translateY(28px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero__image,
  .hero-title,
  .hero-summary,
  .hero-actions,
  .services {
    animation: none;
    transform: none;
  }
}
</style>
