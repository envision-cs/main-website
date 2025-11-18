<script setup lang="ts">
// const { $posthog } = useNuxtApp();

// function captureCustomEvent() {
//  $posthog().capture('home_button_clicked', {
//    user_name: 'Max the Hedgehog',
//  });
// }
</script>

<template>
  <section class="hero h-[100dvh] overflow-hidden grid">
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
    <div class="overlay" />
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  grid-template-columns: 1rem 1fr 1rem;
  grid-template-rows: 2rem 1fr 1fr 1fr 2rem;
  grid-template-areas:
    '. . .'
    '. . .'
    '. c .'
    '. b .'
    '. . .';
  isolation: isolate;
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
  height: 100%;
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
