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
    class="hero overflow-hidden grid"
    aria-labelledby="hero-title"
    aria-describedby="hero-summary"
    role="region"
  >
    <div class="col-span-full row-span-full">
      <NuxtImg
        v-if="hero.image?.url"
        :src="hero.image.url"
        alt="Exterior view of a residence hall at dusk"
        sizes="100vw sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
        fit="cover"
        preload
        format="avif"
        loading="eager"
        class="image"
      />
    </div>
    <div class="hero-vignette" aria-hidden="true" />
    <app-gradient-overlay direction="top" class="overlay" />

    <div class="content site-max">
      <div class="hero-frame">
        <app-typography id="hero-title" tag="h2" variant="heading-huge" bold class="hero-title">
          Complex <span>Projects.</span> <span>Simple</span> Accountability
        </app-typography>

        <app-typography id="hero-summary" tag="p" variant="text-xl" class="hero-summary">
          Local responsiveness. National-level expertise. Zero guesswork on your timeline or budget.
        </app-typography>

        <div class="hero-actions">
          <Button variant="primary" size="lg" to="/contact"> Start your project </Button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1rem 1fr 1rem;
  grid-template-rows: 1fr 1fr 1fr;
  isolation: isolate;
  height: 95dvh;
  background:
    linear-gradient(135deg, rgb(9 15 25 / 72%) 0%, rgb(9 15 25 / 14%) 45%, rgb(9 15 25 / 56%) 100%),
    oklch(0.2 0.03 245);
}

.content {
  display: flex;
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
  animation: hero-drift 18s ease-in-out infinite alternate;
  transform: scale(1.04);
  transform-origin: center center;
  height: 100%;
  width: 100%;
  object-fit: cover;
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
    radial-gradient(
      circle at 50% 72%,
      rgb(6 11 18 / 0%),
      rgb(6 11 18 / 40%) 70%,
      rgb(6 11 18 / 60%) 100%
    );
}

.hero-frame {
  display: grid;
  flex-direction: column;
  gap: clamp(0.75rem, 1vw, 1.2rem);
  align-self: end;
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

.hero-title {
  color: var(--color-white);
  text-wrap: balance;
  letter-spacing: 1%;
  line-height: 0.92;
  animation: hero-reveal 1040ms cubic-bezier(0.19, 1, 0.22, 1) both;
  max-width: 25ch;

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
    opacity: 0.01;
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
  }

  .hero-summary {
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
