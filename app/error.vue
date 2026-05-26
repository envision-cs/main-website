<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps<{ error: NuxtError }>();

const statusCode = computed(() => props.error?.statusCode || 404);
const isNotFound = computed(() => statusCode.value === 404 || statusCode.value === 400);
const errorEyebrow = computed(() => (isNotFound.value ? "Page not found" : "Unexpected error"));
const errorSummary = computed(() =>
  isNotFound.value
    ? "Sorry, we couldn't find that page. Start from one of the paths below and keep moving."
    : "Something went wrong. Use one of the paths below or head back home.",
);
</script>

<template>
  <UApp>
    <NuxtLayout name="default">
      <main class="error-page" aria-labelledby="error-title">
        <section class="error-hero">
          <NuxtImg
            src="/projects-all.jpg"
            alt=""
            sizes="100vw sm:640px md:768px lg:1024px xl:1440px"
            fit="cover"
            format="webp"
            class="error-hero__image"
          />
          <div class="error-hero__shade" aria-hidden="true" />

          <div class="error-hero__content">
            <NuxtLink to="/" class="error-hero__back" aria-label="Back to home">
              <UIcon name="i-lucide-arrow-left" class="error-hero__back-icon" aria-hidden="true" />
              Back to Home
            </NuxtLink>

            <app-typography tag="p" variant="eyebrow-md" class="error-hero__eyebrow">
              {{ errorEyebrow }}
            </app-typography>

            <app-typography
              id="error-title"
              tag="h1"
              variant="heading-huge"
              class="error-hero__title"
            >
              {{ statusCode }} Error
            </app-typography>

            <app-typography tag="p" variant="text-xl" class="error-hero__summary">
              {{ errorSummary }}
            </app-typography>
          </div>
        </section>

        <section class="error-paths" aria-labelledby="error-paths-title">
          <div class="error-paths__header">
            <app-typography tag="p" variant="eyebrow-md" class="error-paths__eyebrow">
              Quick paths
            </app-typography>
            <app-typography
              id="error-paths-title"
              tag="h2"
              variant="heading-md"
              class="error-paths__title"
            >
              You might be looking for:
            </app-typography>
          </div>

          <div class="error-paths__grid">
            <project-card
              to="/services"
              aria-label="View Envision services"
              image="/design-build.jpg"
              alt="Interior construction detail from an Envision project."
              aspect-ratio="4/3"
              image-sizes="100vw sm:50vw lg:33vw"
              sector="Services"
              title="Services"
              overlay="linear-gradient(to top, rgb(0 0 0 / 0.88) 0%, rgb(0 0 0 / 0.48) 55%, rgb(0 0 0 / 0.08) 100%)"
            >
              <template #details>
                <app-typography tag="p" variant="text-sm" class="error-card__copy">
                  Construction management, preconstruction, design-build, and specialty work.
                </app-typography>
              </template>
              <template #meta>
                <span class="error-card__meta">
                  View services
                  <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
                </span>
              </template>
            </project-card>

            <project-card
              to="/projects"
              aria-label="View Envision projects"
              image="/5000-acline-drive-office-05.jpg"
              alt="Completed office build-out corridor."
              aspect-ratio="4/3"
              image-sizes="100vw sm:50vw lg:33vw"
              sector="Projects"
              title="Projects"
              overlay="linear-gradient(to top, rgb(0 0 0 / 0.88) 0%, rgb(0 0 0 / 0.48) 55%, rgb(0 0 0 / 0.08) 100%)"
            >
              <template #details>
                <app-typography tag="p" variant="text-sm" class="error-card__copy">
                  Explore selected work across education, aviation, healthcare, and commercial
                  sites.
                </app-typography>
              </template>
              <template #meta>
                <span class="error-card__meta">
                  See projects
                  <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
                </span>
              </template>
            </project-card>

            <project-card
              to="/contact"
              aria-label="Contact Envision"
              image="/contact.jpg"
              alt="Envision team member at a construction site."
              aspect-ratio="4/3"
              image-sizes="100vw sm:50vw lg:33vw"
              sector="Contact"
              title="Contact"
              overlay="linear-gradient(to top, rgb(0 0 0 / 0.88) 0%, rgb(0 0 0 / 0.48) 55%, rgb(0 0 0 / 0.08) 100%)"
            >
              <template #details>
                <app-typography tag="p" variant="text-sm" class="error-card__copy">
                  Reach the Envision team for project questions, scopes, and next steps.
                </app-typography>
              </template>
              <template #meta>
                <span class="error-card__meta">
                  Talk with us
                  <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
                </span>
              </template>
            </project-card>
          </div>
        </section>
      </main>
    </NuxtLayout>
  </UApp>
</template>

<style scoped>
.error-page {
  min-block-size: 100dvh;
  background: var(--color-envision-gray-900);
  color: var(--color-white);
}

.error-hero {
  position: relative;
  display: grid;
  min-block-size: clamp(36rem, 76dvh, 52rem);
  isolation: isolate;
  overflow: hidden;
  border-bottom: 1px solid color-mix(in oklch, var(--ui-primary) 22%, transparent);
}

.error-hero__image,
.error-hero__shade,
.error-hero__content {
  grid-area: 1 / 1;
}

.error-hero__image {
  block-size: 100%;
  inline-size: 100%;
  object-fit: cover;
  transform: scale(1.04);
}

.error-hero__shade {
  z-index: 1;
  background:
    linear-gradient(180deg, rgb(0 0 0 / 0.42), rgb(6 11 18 / 0.78)),
    radial-gradient(circle at 18% 64%, rgb(33 159 218 / 0.22), transparent 30rem),
    radial-gradient(circle at 55% 76%, rgb(51 144 32 / 0.18), transparent 28rem);
}

.error-hero__content {
  z-index: 2;
  align-self: end;
  display: grid;
  gap: clamp(0.85rem, 1.5vw, 1.25rem);
  inline-size: min(100% - clamp(2rem, 8vw, 8rem), 86rem);
  margin-inline: auto;
  padding-block: clamp(3rem, 8vw, 7rem);
}

.error-hero__back {
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: 0.55rem;
  color: var(--color-envision-gray-300);
  font-size: var(--font-size-text-t4);
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  transition:
    color 160ms ease,
    transform 160ms ease;
}

.error-hero__back:hover {
  color: var(--color-envision-green-500);
  transform: translateX(-0.15rem);
}

.error-hero__back:focus-visible {
  outline: 3px solid var(--color-envision-green-500);
  outline-offset: 4px;
}

.error-hero__back-icon {
  block-size: 1rem;
  inline-size: 1rem;
}

.error-hero__eyebrow,
.error-paths__eyebrow {
  color: var(--ui-primary);
  font-weight: 800;
  letter-spacing: 0.14em;
}

.error-hero__title {
  color: var(--color-white);
  font-weight: 800;
  max-inline-size: 10ch;
  text-wrap: balance;
}

.error-hero__summary {
  max-inline-size: 34rem;
  color: var(--color-envision-gray-300);
  line-height: 1.35;
}

.error-paths {
  inline-size: min(100% - clamp(2rem, 8vw, 8rem), 86rem);
  margin-inline: auto;
  padding-block: clamp(3rem, 6vw, 5rem);
}

.error-paths__header {
  display: grid;
  gap: calc(var(--spacing) * 3);
  margin-block-end: clamp(1.5rem, 3vw, 2.5rem);
}

.error-paths__title {
  color: var(--color-white);
  font-weight: 800;
}

.error-paths__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.error-paths__grid :deep(.reveal-card) {
  min-block-size: clamp(24rem, 35vw, 34rem);
  outline-color: color-mix(in oklch, var(--color-white) 18%, transparent);
}

.error-paths__grid :deep(.reveal-card__content) {
  inline-size: 100%;
}

.error-paths__grid :deep(.reveal-card__heading) {
  color: var(--color-white);
  font-weight: 600;
}

.error-card__copy {
  color: var(--color-envision-gray-300);
  line-height: 1.35;
}

.error-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-white);
}

:global(nuxt-error-overlay),
:global(#nuxt-devtools-container),
:global(nuxt-devtools-inspect-panel),
:global(#vue-tracer-overlay) {
  display: none !important;
}

@media (max-width: 900px) {
  .error-paths__grid {
    grid-template-columns: 1fr;
    gap: 1px;
  }

  .error-paths__grid :deep(.reveal-card) {
    min-block-size: 22rem;
  }
}

@media (max-width: 560px) {
  .error-hero {
    min-block-size: 34rem;
  }

  .error-hero__content,
  .error-paths {
    inline-size: min(100% - 2rem, 86rem);
  }

  .error-hero__content {
    padding-block: 2.5rem;
  }

  .error-paths {
    padding-block: 2.5rem;
  }

  .error-paths__grid :deep(.reveal-card) {
    min-block-size: 20rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .error-hero__image,
  .error-hero__back {
    transition: none;
    transform: none;
  }
}
</style>
