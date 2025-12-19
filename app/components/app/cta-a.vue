<script setup lang="ts">
withDefaults(defineProps<{
  body?: string;
  image?: string;
  flip?: boolean;
}>(), {
  body: 'At En<slvision, we’ve delivered projects across Florida with a balance of technical excellence and genuine care for the people we serve. Every decision we make is rooted in purpose—ensuring results that meet the highest standards without ever losing sight of the communities and clients at the center of it all.',
  image: 'https://placehold.co/100x75',
});
</script>

<template>
  <section class="cta site-max" :class="{ flip }">
    <app-banner-content class="cta-content">
      <template #title>
        <slot />
      </template>
      <template #body>
        {{ body }}
      </template>

      <template #action>
        <app-button color="secondary">
          Learn More
        </app-button>
      </template>
    </app-banner-content>
    <div class="image">
      <NuxtImg
        :src="image"
        format="webp"
        height="300"
        width="400"
        fit="cover"
        sizes="100vw sm:50vw md:800px lg:500px"
        placeholder
      />
    </div>
  </section>
</template>

<style scoped>
.cta {
  display: grid;
  border-block: 1px solid var(--ui-border);

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
  padding: calc(var(--spacing) * 4);
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    'm m m'
    'm m m'
    'm m m';

  img {
    max-inline-size: 100%;
    height: 100%;
    width: 100%;
    grid-area: m;
    object-fit: cover;
  }

  @media (min-width: 800px) {
    padding: calc(var(--spacing) * 8);
    grid-template-areas:
      'tl tm tr'
      'bl bl mr'
      'bl bl br';

    img {
      grid-area: bl;
    }
  }
}

.cta.flip .image {
  grid-template-areas:
    'm m m'
    'm m m'
    'm m m';

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
      'ml br br'
      'bl br br';

    img {
      grid-area: br;
    }
  }
}

.cta-content {
  padding: calc(var(--spacing) * 4);

  @media (min-width: 800px) {
    padding: calc(var(--spacing) * 8);
  }
}
</style>
