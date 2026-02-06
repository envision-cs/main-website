<script setup lang="ts">
import type { NuxtError } from '#app';

import { clearError } from '#app';
import { computed } from 'vue';

const props = defineProps<{ error: NuxtError }>();

const isNotFound = computed(() => props.error?.statusCode === 404 || props.error?.statusCode === 400);

const title = computed(() => isNotFound.value ? 'This page is still under construction.' : 'Something went wrong.');

const description = computed(() => isNotFound.value
  ? 'We couldn\'t find the address you entered. Let\'s get you to a page that\'s ready for visitors.'
  : 'An unexpected error occurred. Please try again or head back to a safe spot.');

const goHome = () => clearError({ redirect: '/' });
</script>

<template>
  <UApp>
    <NuxtLayout name="default">
      <section class="not-found">
        <div class="hero">
          <NuxtImg
            src="/USFSPResidenceHall-Exteriors-DuskLandscapefromRamp.jpg"
            alt="Envision project exterior"
            class="hero__image"
            sizes="sm:100vw md:100vw lg:100vw"
            densities="x1 x2"
            preload
          />
          <div class="hero__overlay" />
          <div class="hero__content site-grid">
            <div class="hero__label">
              <span class="pill">{{ isNotFound ? '404' : props.error?.statusCode }}</span>
              <span class="pill pill--ghost">{{ isNotFound ? 'Page not found' : 'Unexpected error' }}</span>
            </div>
            <div class="hero__text">
              <app-typography
                tag="h1"
                variant="heading-lg"
                class="text-white"
              >
                {{ title }}
              </app-typography>
              <app-typography
                tag="p"
                variant="text-lg"
                class="hero__description"
              >
                {{ description }}
              </app-typography>
              <div class="hero__actions">
                <app-button color="primary" href="/">
                  Back to home
                </app-button>
                <app-button color="white" href="/contact">
                  Talk with our team
                </app-button>
                <UButton
                  variant="ghost"
                  color="neutral"
                  class="hero__retry"
                  @click="goHome"
                >
                  Clear error & reload
                </UButton>
              </div>
            </div>
          </div>
        </div>

        <div class="info site-grid">
          <div class="info__card">
            <app-typography tag="h2" variant="heading-sm">
              Quick paths
            </app-typography>
            <ul class="info__links">
              <li>
                <NuxtLink to="/services/construction-management">
                  Construction Management
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/projects/all">
                  Projects
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/team">
                  Meet the Team
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/about">
                  About Us
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/contact">
                  Contact
                </NuxtLink>
              </li>
            </ul>
          </div>

          <div class="info__card info__card--muted">
            <app-typography
              tag="h3"
              variant="heading-sm"
              class="uppercase"
            >
              Need a hand?
            </app-typography>
            <app-typography
              tag="p"
              variant="text-md"
              class="text-muted"
            >
              If you typed the address manually, double-check the spelling. Otherwise, use the links here or return home
              and we\'ll guide you.
            </app-typography>
            <div class="info__actions">
              <UButton
                size="lg"
                variant="soft"
                color="primary"
                icon="i-lucide-mail"
                href="mailto:info@envisioncs.com"
              >
                Email our team
              </UButton>
              <UButton
                size="lg"
                variant="ghost"
                color="neutral"
                icon="i-lucide-phone"
                href="tel:8137123070"
              >
                813-712-3070
              </UButton>
            </div>
          </div>
        </div>
      </section>
    </NuxtLayout>
  </UApp>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 12);
  padding-bottom: calc(var(--spacing) * 12);
}

.hero {
  position: relative;
  min-height: min(90vh, 960px);
  border-bottom: var(--border-main);
  overflow: clip;
}

.hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.05);
}

.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.35) 40%, rgba(0, 0, 0, 0.7) 100%);
}

.hero__content {
  position: absolute;
  inset: 0;
  display: grid;
  align-content: end;
  padding: calc(var(--spacing) * 6) calc(var(--spacing) * 4);

  @media (min-width: 700px) {
    padding: calc(var(--spacing) * 10) calc(var(--spacing) * 8);
  }
}

.hero__label {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--spacing) * 2);

  @media (min-width: 700px) {
    grid-column: 1 / span 6;
  }

  @media (min-width: 1024px) {
    grid-column: 1 / span 10;
  }
}

.pill {
  display: inline-flex;
  align-items: center;
  gap: 0.35em;
  padding: calc(var(--spacing) * 1) calc(var(--spacing) * 2);
  border-radius: calc(var(--ui-radius));
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: var(--font-size-text-t4);
}

.pill--ghost {
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.35);
}

.hero__text {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 4);
  color: #fff;

  @media (min-width: 700px) {
    grid-column: 1 / span 10;
  }

  @media (min-width: 1024px) {
    grid-column: 1 / span 12;
  }
}

.hero__description {
  color: rgba(255, 255, 255, 0.85);
  max-width: 36ch;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--spacing) * 3);
  align-items: center;
}

.hero__retry {
  color: #fff;
  border-color: rgba(255, 255, 255, 0.4);
}

.info {
  gap: calc(var(--spacing) * 4);
  padding-inline: calc(var(--spacing) * 4);

  @media (min-width: 700px) {
    padding-inline: calc(var(--spacing) * 8);
  }
}

.info__card {
  grid-column: 1 / -1;
  border: var(--border-main);
  border-radius: calc(var(--ui-radius));
  padding: calc(var(--spacing) * 6);
  background: #fff;
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.04);

  @media (min-width: 700px) {
    grid-column: span 12;
  }

  @media (min-width: 1024px) {
    grid-column: span 11;
  }
}

.info__card--muted {
  background: linear-gradient(135deg, rgba(6, 98, 164, 0.05), rgba(90, 184, 71, 0.05));
}

.info__links {
  margin-top: calc(var(--spacing) * 4);
  display: grid;
  gap: calc(var(--spacing) * 2);

  a {
    color: inherit;
    font-weight: 500;
    text-decoration: none;
    border-bottom: 1px solid transparent;
    padding-bottom: calc(var(--spacing) * 1);
  }

  a:hover {
    color: var(--ui-primary);
    border-color: var(--ui-primary);
  }
}

.info__actions {
  display: flex;
  flex-wrap: wrap;
  gap: calc(var(--spacing) * 3);
  margin-top: calc(var(--spacing) * 4);
}

.text-muted {
  color: var(--ui-color-neutral-600);
}
</style>
