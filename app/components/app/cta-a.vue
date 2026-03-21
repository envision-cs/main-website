<script setup lang="ts">type ContentPosition
  = | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'center-left'
    | 'center'
    | 'center-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';

const props = withDefaults(defineProps<{
  body?: string;
  image?: string;
  flip?: boolean;
  href?: string;
  contentPosition?: ContentPosition;
}>(), {
  body: 'At En<slvision, we’ve delivered projects across Florida with a balance of technical excellence and genuine care for the people we serve. Every decision we make is rooted in purpose—ensuring results that meet the highest standards without ever losing sight of the communities and clients at the center of it all.',
  image: 'https://placehold.co/100x75',
  contentPosition: 'bottom-left',
});
</script>

<template>
  <section class="cta" :class="{ flip }">
    <div class="cta-content" :class="`place-${props.contentPosition}`">
      <div class="content-wrapper">
        <div class="title">
          <app-typography
            tag="h2"
            variant="heading-lg"
            class="text"
          >
            <slot name="title">
              <slot />
            </slot>
          </app-typography>
        </div>
        <div class="content">
          <div>
            <app-typography variant="text-lg" class="max-w-[40ch]">
              {{ body }}
              <slot name="body" />
            </app-typography>
          </div>
          <div class="actions">
            <template v-if="href">
              <app-button
                :to="href"
                color="secondary"
                variant="solid"
              >
                Learn More
              </app-button>
            </template>
            <slot name="action" />
          </div>
        </div>
      </div>
    </div>
    <app-gradient-overlay direction="top" class="overlay" />
    <div class="image">
      <NuxtImg
        :src="image"
        provider="imagekit"
        :modifiers="{ focus: 'bottom', aspectRatio: '16/9' }"
        format="webp"
        loading="lazy"
        sizes="100vw sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
        class="inner"
        fit="exact"
        placeholder
      />
    </div>
  </section>
</template>

<style scoped>
.cta {
  display: grid;
  height: clamp(400px, 60vh, 800px);
  isolation: isolate;
  overflow: hidden;
  grid-template-rows: 1fr;

  @media (min-width: 800px) {
    display: grid;
    height: clamp(400px, 75vh, 800px);
    direction: rtl;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr;
  }

  > * {
    direction: ltr;
  }
}

.cta.flip {
  direction: ltr;
}

.overlay {
  position: relative;
  z-index: 2;
}

.image {
  position: relative;
  width: 100%;
  height: 100%;
  grid-column: 1/-1;
  grid-row: 1/-1;
  z-index: 1;
  overflow: hidden;

  .inner {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
}

.cta-content {
  position: relative;
  padding: calc(var(--spacing) * 4);
  grid-column: 1/-1;
  grid-row: 1/-1;
  width: min(100%, 80rem);
  max-width: 100%;
  max-height: 100%;
  min-height: 0;
  overflow: auto;
  color: #fff;
  z-index: 3;

  @media (min-width: 800px) {
    padding: calc(var(--spacing) * 8);
  }
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);
  justify-content: start;
  width: 100%;
}

.text {
  text-wrap: balance;
  max-width: 20ch;
  font-weight: 600;
  text-transform: uppercase;
}

.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: calc(var(--spacing) * 8);

  p {
    max-width: 45ch;
    text-wrap: balance;
  }
}

.actions {
  place-self: start;
}

.place-top-left {
  align-self: start;
  justify-self: start;
  text-align: left;
}

.place-top-center {
  align-self: start;
  justify-self: center;
  text-align: center;
}

.place-top-right {
  align-self: start;
  justify-self: end;
  text-align: right;
}

.place-center-left {
  align-self: center;
  justify-self: start;
  text-align: left;
}

.place-center {
  align-self: center;
  justify-self: center;
  text-align: center;
}

.place-center-right {
  align-self: center;
  justify-self: end;
  text-align: right;
}

.place-bottom-left {
  align-self: end;
  justify-self: start;
  text-align: left;
}

.place-bottom-center {
  align-self: end;
  justify-self: center;
  text-align: center;
}

.place-bottom-right {
  align-self: end;
  justify-self: end;
  text-align: right;
}
</style>
