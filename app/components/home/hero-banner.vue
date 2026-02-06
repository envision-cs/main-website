<script setup lang="ts">
import type { } from '~/types';

const { find } = useStrapi();
const { data } = await useAsyncData('hero', async () => {
  try {
    return await find('home-hero', { populate: '*' });
  }
  catch (err) {
    console.error('Strapi error:', err);
    return null;
  }
}, { default: () => null });
</script>

<template>
  <section
    class="hero h-dvh overflow-hidden grid"
    aria-labelledby="hero-title"
    aria-describedby="hero-summary"
    role="region"
  >
    <div class="content site-max">
      <div class="title">
        <app-typography
          id="hero-title"
          tag="h2"
          variant="heading-xl"
          class="uppercase font-bold"
        >
          {{ data.data.title }}
        </app-typography>

        <app-typography
          id="hero-summary"
          tag="p"
          variant="text-xl"
          class="mt-2"
        >
          {{ data.data.subtitle }}
        </app-typography>
        <UButton
          color="neutral"
          variant="solid"
          to="contact"
          size="lg"
          class="mt-4"
        >
          Start your project
        </UButton>
      </div>
      <div class="actions mt-auto">
        <!-- leave empty -->
      </div>
    </div>

    <div class="overlay z-10" aria-hidden="true" />
    <NuxtImg
      :src="data.data.image.url"
      alt="Exterior view of a residence hall at dusk"
      size="100vw sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
      fit="cover"
      preload
      format="avif"
      loading="eager"
      class="image h-full w-full z-0 object-cover"
    />
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1rem 1fr 1rem;
  grid-template-rows: 2rem 1fr 1fr 1fr 2rem;
  isolation: isolate;
}

.content {
  display: flex;
  flex-direction: column;
  grid-column: 1/-1;
  grid-row: 1/-1;
  margin: auto;
  width: 100%;
  z-index: 3;
  height: 100%;

  padding: calc(var(--spacing) * 4);

  @media (min-width: 800px) {
    padding: calc(var(--spacing) * 8);
  }
}

.image {
  grid-column: 1/-1;
  grid-row: 1/-1;
}

.title {
  grid-area: c;
  z-index: 2;
  color: white;
  text-wrap: balance;
  font-weight: 400;
  text-decoration: uppercase;
  max-width: 90ch;
  margin-top: auto;
}

.actions {
  grid-area: b;
  z-index: 2;
  margin-top: auto;
}

.overlay {
  height: 100vh;
  width: 100%;
  grid-column: 1/-1;
  grid-row: 1/-1;
  background:
    linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%),
    linear-gradient(180deg, rgba(0, 0, 0, 0) 43.16%, rgba(0, 0, 0, 0.55) 64.7%, rgba(0, 0, 0, 0.6) 81.1%);
  z-index: 1;
}
</style>
