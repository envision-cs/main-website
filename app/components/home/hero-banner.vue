<script setup lang="ts">

</script>

<template>
  <section class="hero h-[100dvh] overflow-hidden grid">
    <div class="content site-max">
      <div class="title">
        <app-typography
          tag="h2"
          variant="heading-xl"
          class="capitalize"
        >
          You need a builder who sees the bigger picture.
        </app-typography>

        <app-typography
          tag="p"
          variant="heading-sm"
          class="mt-4"
        >
          We manage construction projects with excellence, purpose, and people-first precision.
        </app-typography>
      </div>
      <div class="actions">
        <app-button>
          Open Video
        </app-button>
      </div>
    </div>

    <div class="overlay" />
    <NuxtImg
      src="/hero.png"
      alt="Hero Image"
      class="image h-full w-full"
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
  grid-column: 1/-1;
  grid-row: 1/-1;
  margin: auto;
  width: 100%;
  z-index: 3;
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
}

.actions {
  grid-area: b;
  z-index: 2;
  align-self: end;

  button {
  }
}

.overlay {
  height: 100vh;
  width: 100%;
  grid-column: 1/-1;
  grid-row: 1/-1;
  background:
    linear-gradient(0deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%),
    linear-gradient(180deg, rgba(0, 0, 0, 0) 43.16%, rgba(0, 0, 0, 0.55) 64.7%, rgba(0, 0, 0, 0.6) 81.1%),
    url('/hero.png') lightgray 50% / cover no-repeat;
  z-index: 1;
}
</style>
