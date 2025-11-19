<script setup lang="ts">
import { domAnimation, LazyMotion, m } from 'motion-v';

withDefaults(defineProps<{
  body?: string;
  image?: string;
  flip?: boolean;
}>(), {
  body: 'At Envision, we’ve delivered projects across Florida with a balance of technical excellence and genuine care for the people we serve. Every decision we make is rooted in purpose—ensuring results that meet the highest standards without ever losing sight of the communities and clients at the center of it all.',
  image: '/process.jpg',
});

const { gentle } = useEasings();
</script>

<template>
  <section class="cta" :class="{ flip }">
    <div class="content-wrapper">
      <LazyMotion :features="domAnimation">
        <m.div
          :initial="{ opacity: 0, y: 50 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, ease: gentle }"
          :in-view-options="{ once: true, margin: '0px 0px -25% 0px' }"
          class="title mt-[calc(var(--spacing) * 8)]"
        >
          <app-typography
            tag="h2"
            variant="heading-lg"
            class="text"
          >
            <slot />
          </app-typography>
        </m.div>
        <div class="content">
          <m.div
            :initial="{ opacity: 0, y: 50 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, ease: gentle }"
            :in-view-options="{ once: true, margin: '0px 0px -25% 0px' }"
            class="title mt-[calc(var(--spacing) * 8)]"
          >
            <app-typography variant="text-lg">
              {{ body }}
            </app-typography>
          </m.div>
        </div>
      </LazyMotion>
    </div>

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

.content-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-block: calc(var(--spacing) * 10);
  padding-inline: calc(var(--spacing) * 4);
  border: 1px solid var(--ui-border);
  gap: calc(var(--spacing) * 20);
}

.text {
  text-wrap: balance;
  max-width: 20ch;
}

.content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  p {
    max-width: 60ch;
  }
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
