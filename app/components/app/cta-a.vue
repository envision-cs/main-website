<script setup lang="ts">
withDefaults(defineProps<{
  body?: string;
  image?: string;
  flip?: boolean;
}>(), {
  body: 'At En<slvision, we’ve delivered projects across Florida with a balance of technical excellence and genuine care for the people we serve. Every decision we make is rooted in purpose—ensuring results that meet the highest standards without ever losing sight of the communities and clients at the center of it all.',
  image: '/process.jpg',
});
</script>

<template>
  <section class="cta" :class="{ flip }">
    <app-banner-content>
      <template #title>
        <slot />
      </template>
      <template #body>
        {{ body }}
      </template>
    </app-banner-content>

    <div class="image">
      <NuxtImg src="/process.jpg" />
    </div>
  </section>
</template>

<style scoped>
.cta {
  display: grid;

  @media (min-width: 800px) {
    display: grid;
    direction: rtl;
    grid-template-columns: 1fr 1fr;
  }

  > * {
    direction: ltr;
  }
}

.cta.flip {
  direction: ltr;
}

.image {
  width: 100%;
  height: 100%;
  display: grid;
  padding-inline: calc(var(--spacing) * 4);
  padding-block: calc(var(--spacing) * 10);
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    '. . .'
    'm m .'
    'm m .';

  img {
    max-inline-size: 100%;
    height: 100%;
    width: 100%;
    grid-area: m;
    object-fit: cover;
  }

  @media (min-width: 800px) {
    grid-template-areas:
      'tl tm tr'
      'ml mm mr'
      'bl bm br';

    img {
      grid-area: bl;
    }
  }
}

.cta.flip .image {
  grid-template-areas:
    '. . .'
    '. m m'
    '. m m';

  img {
    max-inline-size: 100%;
    height: 100%;
    width: 100%;
    grid-area: m;
    object-fit: cover;
  }

  @media (min-width: 800px) {
    grid-template-areas:
      'tl tm tr'
      'ml mm mr'
      'bl bm br';

    img {
      grid-area: br;
    }
  }
}
</style>
