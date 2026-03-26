<script setup lang="ts">
type ContentPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center-left"
  | "center"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

const props = withDefaults(
  defineProps<{
    body?: string;
    image?: string;
    flip?: boolean;
    href?: string;
    contentPosition?: ContentPosition;
  }>(),
  {
    body: "At Envision, we’ve delivered projects across Florida with a balance of technical excellence and genuine care for the people we serve. Every decision we make is rooted in purpose, ensuring results that meet the highest standards without losing sight of the communities and clients at the center of it all.",
    image: "https://placehold.co/100x75",
    contentPosition: "bottom-left",
  },
);
</script>

<template>
  <section class="cta-panel" :class="{ flip }">
    <div class="cta-panel__media">
      <NuxtImg
        :src="image"
        provider="imagekit"
        :modifiers="{ focus: 'bottom', aspectRatio: '16/9' }"
        format="webp"
        loading="lazy"
        sizes="100vw sm:640px md:768px lg:1024px xl:1280px 2xl:1536px"
        class="cta-panel__image"
        fit="exact"
        placeholder
      />
    </div>
    <div class="cta-panel__vignette" aria-hidden="true" />
    <app-gradient-overlay direction="top" class="cta-panel__overlay" />

    <div class="cta-panel__content" :class="`place-${props.contentPosition}`">
      <div class="l-wrapper">
        <div class="cta-panel__layout">
          <div class="cta-panel__frame">
            <app-typography tag="h2" variant="heading-lg" class="cta-panel__title">
              <slot name="title">
                <slot />
              </slot>
            </app-typography>

            <app-typography tag="p" variant="text-xl" class="cta-panel__body">
              {{ body }}
              <slot name="body" />
            </app-typography>

            <div class="cta-panel__actions">
              <template v-if="href">
                <app-button :to="href" color="secondary" variant="solid">Learn More</app-button>
              </template>
              <slot name="action" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Composition */
.l-wrapper {
  width: 100%;
  padding: clamp(1.25rem, 2vw, 2.5rem);

  @media (min-width: 800px) {
    padding: clamp(2rem, 4vw, 4.5rem);
  }
}

.cta-panel__layout {
  display: grid;
  align-items: end;
  min-height: 100%;
  width: 100%;
}

/* Block */
.cta-panel {
  display: grid;
  min-height: clamp(28rem, 76vh, 54rem);
  isolation: isolate;
  overflow: hidden;
  background:
    linear-gradient(135deg, rgb(9 15 25 / 74%) 0%, rgb(9 15 25 / 16%) 45%, rgb(9 15 25 / 58%) 100%),
    oklch(0.2 0.03 245);

  @media (min-width: 800px) {
    min-height: clamp(34rem, 92vh, 60rem);
    direction: rtl;
  }

  > * {
    direction: ltr;
  }
}

.cta-panel__media,
.cta-panel__vignette,
.cta-panel__overlay,
.cta-panel__content {
  grid-column: 1 / -1;
  grid-row: 1 / -1;
}

.cta-panel__media {
  z-index: 0;
}

.cta-panel__image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  transform: scale(1.04);
  transform-origin: center center;
}

.cta-panel__vignette {
  z-index: 1;
  background:
    radial-gradient(circle at 68% 34%, rgb(174 205 255 / 5%), transparent 20%),
    radial-gradient(
      circle at 50% 72%,
      rgb(6 11 18 / 0%),
      rgb(6 11 18 / 40%) 70%,
      rgb(6 11 18 / 60%) 100%
    );
  pointer-events: none;
}

.cta-panel__overlay {
  z-index: 2;
  opacity: 0.92;
}

.cta-panel__content {
  z-index: 3;
  display: flex;
  width: 100%;
  min-height: 100%;
  color: var(--color-white);

  @media (max-width: 799px) {
    align-items: flex-start;
  }
}

.cta-panel__frame {
  display: grid;
  gap: clamp(0.85rem, 1vw, 1.2rem);
  max-width: min(44rem, 100%);
}

.cta-panel__title {
  color: var(--color-white);
  text-wrap: balance;
  max-width: 16ch;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.01em;
  line-height: 0.94;
}

.cta-panel__body {
  margin: 0;
  max-width: 58ch;
  color: var(--color-envision-gray-300);
  line-height: 1.35;
  text-wrap: balance;
}

.cta-panel__actions {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 4);
  padding-top: clamp(0.5rem, 1vw, 0.85rem);

  @media (min-width: 600px) {
    flex-direction: row;
  }
}

/* Exceptions */
.cta-panel.flip {
  direction: ltr;
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

@media (prefers-reduced-motion: reduce) {
  .cta-panel__image {
    transform: none;
  }
}
</style>
