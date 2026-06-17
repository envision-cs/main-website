<script setup lang="ts">
interface HomeHero {
  title?: string;
  subtitle?: string;
  image?: {
    url?: string;
  } | null;
}

const { data: hero } = useAsyncData<HomeHero>('home-hero', () => $fetch('/api/home-hero'));

const hasHeroTitle = computed(() => Boolean(hero.value?.title?.trim()));
const hasHeroSummary = computed(() => Boolean(hero.value?.subtitle?.trim()));
const hasHeroCopy = computed(() => hasHeroTitle.value || hasHeroSummary.value);

const FeatureProjects = defineLazyHydrationComponent(
  'idle',
  () => import('../components/home/featured-projects-carousel.vue'),
);

const heroImageSizes = '100vw sm:768px md:1024px lg:1280px xl:1530px 2xl:1536px';
</script>

<template>
  <section
    v-if="hero"
    class="hero"
    :aria-labelledby="hasHeroTitle ? 'hero-title' : undefined"
    :aria-describedby="hasHeroSummary ? 'hero-summary' : undefined"
    role="region"
  >
    <div class="hero__media">
      <NuxtImg
        v-if="hero.image?.url"
        provider="imagekit"
        :src="hero.image.url"
        alt="Exterior view of a residence hall at dusk"
        :sizes="heroImageSizes"
        fit="cover"
        fetchpriority="high"
        format="avif"
        loading="eager"
        class="hero__image"
      />
    </div>

    <div v-if="hasHeroCopy" class="hero__overlay" aria-hidden="true" />

    <div class="hero__inner site-max mx-auto">
      <!-- <service-list class="services mb-auto" /> -->
      <div v-if="hasHeroCopy" class="hero__copy">
        <app-typography
          v-if="hasHeroTitle"
          id="hero-title"
          tag="h1"
          variant="heading-xl"
          class="hero-title"
        >
          {{ hero.title }}
        </app-typography>

        <app-typography
          v-if="hasHeroSummary"
          id="hero-summary"
          tag="p"
          variant="text-md"
          class="hero-summary"
        >
          {{ hero.subtitle }}
        </app-typography>

        <div class="hero-actions">
          <m-button variant="primary" size="sm" to="/contact">
            Start your project
            <template #icon>
              <UIcon name="i-lucide-arrow-right" />
            </template>
          </m-button>
          <m-button variant="outline" size="sm" to="/projects">
            Explore Our Portfolio
            <template #icon>
              <UIcon name="i-lucide-arrow-right" />
            </template>
          </m-button>
        </div>
      </div>

      <aside class="hero__rail" aria-label="Featured projects">
        <FeatureProjects hydrate-on-interaction="mouseover" />
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
  min-height: 100svh;
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
  background:
    radial-gradient(
      ellipse at 22% 76%,
      rgb(7 12 18 / 0.82) 0%,
      rgb(7 12 18 / 0.6) 30%,
      rgb(7 12 18 / 0.2) 58%,
      transparent 78%
    ),
    linear-gradient(0deg, rgb(7 12 18 / 0.28) 0%, rgb(7 12 18 / 0.1) 40%, transparent 72%);
}

.hero__inner {
  z-index: 3;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  min-height: 100svh;
  gap: calc(var(--spacing) * 6);
  padding: calc(var(--spacing) * 28) calc(var(--spacing) * 4) calc(var(--spacing) * 5);
  align-content: end;
  align-items: end;
}

.hero__copy {
  display: grid;
  align-content: end;
  flex: 1 1 24rem;
  gap: calc(var(--spacing) * 3);
  z-index: 2;
  max-width: 36rem;
}

.hero__rail {
  display: grid;
  flex: 1 1 18rem;
  z-index: 2;
  gap: calc(var(--spacing) * 3);
  align-self: end;
  min-width: 0;
  max-width: 100%;
  margin-top: auto;
}

.hero-logo {
  display: block;
  width: clamp(9.25rem, 7vw, 13rem);
  height: clamp(1.65rem, 2.86vw, 2.35rem);
  animation: hero-reveal 920ms cubic-bezier(0.19, 1, 0.22, 1) both;
}

.hero-title {
  max-inline-size: 12ch;
  color: var(--color-white);
  text-wrap: balance;
  overflow-wrap: break-word;
  letter-spacing: 0;
  line-height: 1;
  animation: hero-reveal 1040ms cubic-bezier(0.19, 1, 0.22, 1) both;
  font-weight: 400;

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
  max-width: 32rem;
  color: var(--color-white);
  font-weight: 500;
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
  .hero {
    min-height: 680px;
  }

  .hero__inner {
    min-height: 680px;
    padding-bottom: clamp(4.5rem, 9vh, 7rem);
  }

  .hero__copy {
    max-width: 38rem;
  }

  .hero-title {
    max-inline-size: 13ch;
  }

  .hero__rail {
    justify-self: end;
    max-width: 28rem;
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
  .hero {
    min-height: 720px;
  }

  .hero__inner {
    min-height: 720px;
    padding: calc(var(--spacing) * 20) calc(var(--spacing) * 12) calc(var(--spacing) * 5);
  }

  .hero__copy {
    max-width: 42rem;
    margin-bottom: calc(var(--spacing) * 7);
  }

  .hero-title {
    max-inline-size: 14ch;
  }

  .hero__rail {
    flex: 0 1 20rem;
    margin-bottom: calc(var(--spacing) * 4);
  }
}

@media (min-width: 1280px) {
  .hero {
    min-height: 760px;
  }

  .hero__inner {
    min-height: 760px;
  }
}

@media (max-width: 699px) {
  .hero__image {
    object-position: center top;
  }

  .hero__overlay {
    background:
      radial-gradient(
        ellipse at 26% 70%,
        rgb(7 12 18 / 0.82) 0%,
        rgb(7 12 18 / 0.6) 34%,
        rgb(7 12 18 / 0.24) 64%,
        transparent 84%
      ),
      linear-gradient(0deg, rgb(7 12 18 / 0.3) 0%, rgb(7 12 18 / 0.1) 44%, transparent 74%);
  }

  .hero__copy {
    max-width: 30rem;
  }

  .hero-title {
    max-inline-size: 11ch;
  }

  .hero-summary {
    display: -webkit-box;
    overflow: hidden;
    max-width: 28rem;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }
}
</style>
