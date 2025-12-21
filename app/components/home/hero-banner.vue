<script setup lang="ts">
const img = useImage();

const backgroundImg = computed(() => {
  const imgUrl = img('/USFSPResidenceHall-Exteriors-DuskLandscapefromRamp.jpg', { format: 'webp', resize: '100vw sm:50vw md:400px', fit: 'cover' });

  return `url('${imgUrl}')`;
});
</script>

<template>
  <section class="hero h-[100dvh] overflow-hidden grid" :style="{ '--backgroundImage': backgroundImg }">
    <div class="content site-max">
      <div class="title">
        <app-typography
          tag="h2"
          variant="heading-xl"
          class="uppercase font-bold"
        >
          You need a builder who sees the bigger picture.
        </app-typography>

        <app-typography
          tag="p"
          variant="text-lg"
          class="mt-4"
        >
          We manage construction projects with excellence, purpose, and people-first precision.
        </app-typography>
      </div>
      <div class="actions mt-auto">
        <app-button color="white">
          Open Video
        </app-button>
      </div>
    </div>

    <div class="overlay z-10" />
    <NuxtImg
      src="/USFSPResidenceHall-Exteriors-DuskLandscapefromRamp.jpg"
      alt="Hero Image"
      format="100vw sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
      fit="cover"
      preload
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
