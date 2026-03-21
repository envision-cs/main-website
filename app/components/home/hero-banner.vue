<script setup lang="ts">const { find } = useStrapi();
const { data } = await useAsyncData('hero', async () => {
  try {
    return await find('home-hero', { populate: '*' });
  }
  catch (err) {
    console.error('Strapi error:', err);
    return null;
  }
}, { default: () => null });
const hero = computed(() => data.value?.data ?? null);
</script>

<template>
  <section
    v-if="hero"
    class="hero overflow-hidden grid"
    aria-labelledby="hero-title"
    aria-describedby="hero-summary"
    role="region"
  >
    <NuxtImg
      v-if="hero.image?.url"
      :src="hero.image.url"
      alt="Exterior view of a residence hall at dusk"
      sizes="100vw sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
      fit="cover"
      preload
      format="avif"
      loading="eager"
      class="image h-full w-full z-0 object-cover"
    />
    <div class="hero-vignette" aria-hidden="true" />
    <div class="hero-glow" aria-hidden="true" />
    <app-gradient-overlay direction="top" class="overlay" />

    <div class="content site-max">
      <div class="hero-frame">
        <p class="hero-eyebrow">
          Envision Construction
        </p>
        <div class="hero-rule" aria-hidden="true" />
        <app-typography
          id="hero-title"
          tag="h2"
          variant="heading-huge"
          class="hero-title"
        >
          {{ hero.title }}
        </app-typography>

        <app-typography
          id="hero-summary"
          tag="p"
          variant="text-xl"
          class="hero-summary"
        >
          {{ hero.subtitle }}
        </app-typography>

        <div class="hero-actions">
          <Button
            variant="primary"
            size="lg"
            to="/contact"
          >
            Start your project
          </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1rem 1fr 1rem;
  grid-template-rows: 1fr;
  isolation: isolate;
  min-height: 100dvh;
  background:
    linear-gradient(135deg, rgb(9 15 25 / 72%) 0%, rgb(9 15 25 / 14%) 45%, rgb(9 15 25 / 56%) 100%), oklch(0.2 0.03 245);
}

.content {
  display: grid;
  grid-column: 1/-1;
  grid-row: 1/-1;
  width: 100%;
  z-index: 3;
  align-items: center;

  padding: clamp(1.25rem, 2vw, 2.5rem);

  @media (min-width: 800px) {
    padding: clamp(2rem, 4vw, 4.5rem);
  }
}

.overlay {
  z-index: 2;
  opacity: 0.9;
}

.image {
  grid-column: 1/-1;
  grid-row: 1/-1;
  animation: hero-drift 18s ease-in-out infinite alternate;
  transform: scale(1.04);
  transform-origin: center center;
}

.hero-vignette,
.hero-glow,
.hero-gridline {
  grid-column: 1/-1;
  grid-row: 1/-1;
  pointer-events: none;
}

.hero-vignette {
  z-index: 1;
  background:
    radial-gradient(circle at 68% 34%, rgb(174 205 255 / 5%), transparent 20%),
    radial-gradient(circle at 50% 72%, rgb(6 11 18 / 0%), rgb(6 11 18 / 40%) 70%, rgb(6 11 18 / 60%) 100%);
}

.hero-glow {
  z-index: 1;
  background:
    linear-gradient(180deg, rgb(255 219 168 / 0%) 0%, rgb(255 219 168 / 9%) 40%, rgb(8 13 22 / 60%) 100%),
    linear-gradient(90deg, rgb(5 10 18 / 78%) 0%, rgb(5 10 18 / 32%) 38%, rgb(5 10 18 / 0%) 68%);
  mix-blend-mode: screen;
  opacity: 0.78;
}

.hero-gridline {
  z-index: 2;
  opacity: 0.42;
}

.hero-gridline--top {
  margin: clamp(1.25rem, 2vw, 2.5rem);
  align-self: start;
  height: 1px;
  width: min(32vw, 24rem);
  background: linear-gradient(90deg, rgb(245 241 233 / 0%), rgb(245 241 233 / 0.85), rgb(245 241 233 / 0%));
}

.hero-gridline--side {
  justify-self: end;
  margin: clamp(1.25rem, 2vw, 2.5rem);
  width: 1px;
  height: min(26vh, 14rem);
  background: linear-gradient(180deg, rgb(245 241 233 / 0%), rgb(245 241 233 / 0.7), rgb(245 241 233 / 0%));
}

.hero-frame {
  display: flex;
  flex-direction: column;
  gap: clamp(0.75rem, 1vw, 1.2rem);
  align-self: center;
  width: min(100%, 38rem);
  margin-block-end: clamp(1rem, 4vh, 3rem);
}

.hero-eyebrow {
  margin: 0;
  color: var(--color-envision-gray-300);
  font-size: clamp(0.72rem, 0.9vw, 0.82rem);
  letter-spacing: 0.22em;
  line-height: 1;
  text-transform: uppercase;
  animation: hero-reveal 800ms cubic-bezier(0.19, 1, 0.22, 1) both;
}

.hero-rule {
  width: min(8rem, 22vw);
  height: 1px;
  background: linear-gradient(90deg, var(--ui-secondary), rgb(255 255 255 / 0%));
  animation: hero-reveal 920ms cubic-bezier(0.19, 1, 0.22, 1) both;
}

.hero-title {
  color: var(--color-white);
  text-transform: uppercase;
  text-wrap: balance;
  letter-spacing: -0.03em;
  max-width: 12ch;
  font-size: clamp(3.5rem, 8vw, 4.6rem);
  line-height: 0.92;
  text-shadow: 0 18px 48px rgb(0 0 0 / 30%);
  animation: hero-reveal 1040ms cubic-bezier(0.19, 1, 0.22, 1) both;
}

.hero-summary {
  margin: 0;
  max-width: 40ch;
  color: var(--color-envision-gray-300);
  line-height: 1.35;
  text-wrap: balance;
  animation: hero-reveal 1160ms cubic-bezier(0.19, 1, 0.22, 1) both;
}

.hero-actions {
  padding-top: clamp(0.5rem, 1vw, 0.85rem);
  animation: hero-reveal 1280ms cubic-bezier(0.19, 1, 0.22, 1) both;
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
    opacity: 0;
    transform: translateY(28px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 799px) {
  .content {
    align-items: flex-start;
  }

  .hero-frame {
    width: 100%;
    margin-block-end: 0.5rem;
  }

  .hero-title {
    max-width: 9ch;
    font-size: clamp(2.8rem, 12vw, 4.5rem);
  }

  .hero-summary {
    max-width: 22ch;
  }
}

@media (prefers-reduced-motion: reduce) {
  .image,
  .hero-eyebrow,
  .hero-rule,
  .hero-title,
  .hero-summary,
  .hero-actions {
    animation: none;
    transform: none;
  }
}
</style>
