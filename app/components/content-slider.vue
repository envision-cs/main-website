<script setup lang="ts">
import { animate, scroll, useReducedMotion } from "motion-v";

interface ContentSliderItem {
  id: number | string;
  eyebrow?: string;
  title: string;
  description: string;
  quote?: string;
  points?: string[];
  image?: string;
  imageAlt?: string;
  tone?: string;
}

const props = withDefaults(
  defineProps<{
    title: string;
    body: string;
    backgroundImage?: string;
    backgroundImageAlt?: string;
    slides: ContentSliderItem[];
  }>(),
  {
    backgroundImage: "",
    backgroundImageAlt: "",
  },
);

const containerRef = useTemplateRef<HTMLElement | null>("containerRef");
const trackRef = useTemplateRef<HTMLElement | null>("trackRef");

const shouldReduceMotion = useReducedMotion();
const totalSlides = computed(() => props.slides.length + 1);

let activeAnimation: Animation | null = null;
let detachScroll: VoidFunction | null = null;

function resolveTone(tone?: string) {
  return tone ? `var(${tone})` : "var(--color-envision-blue-600)";
}

function destroyScrollAnimation() {
  detachScroll?.();
  detachScroll = null;

  activeAnimation?.cancel();
  activeAnimation = null;
}

function initializeScrollAnimation() {
  destroyScrollAnimation();

  if (
    !import.meta.client ||
    shouldReduceMotion.value ||
    totalSlides.value <= 1 ||
    !containerRef.value ||
    !trackRef.value
  ) {
    return;
  }

  activeAnimation = animate(trackRef.value, {
    transform: ["translateX(0vw)", `translateX(-${totalSlides.value - 1}00vw)`],
  });

  detachScroll = scroll(activeAnimation, {
    target: containerRef.value,
  }) as VoidFunction;
}

watch([totalSlides, shouldReduceMotion], async () => {
  await nextTick();
  initializeScrollAnimation();
});

onMounted(() => {
  initializeScrollAnimation();
});

onUnmounted(() => {
  destroyScrollAnimation();
});
</script>

<template>
  <section class="content-slider wrapper site-grid">
    <div class="content-slider__gallery">
      <div ref="containerRef" class="content-slider__shell l-slider-shell">
        <div class="content-slider__frame l-slider-frame">
          <NuxtImg
            v-if="backgroundImage"
            :src="backgroundImage"
            :alt="backgroundImageAlt"
            provider="imagekit"
            fit="cover"
            class="content-slider__background"
          />

          <ul ref="trackRef" class="content-slider__track l-slider-track">
            <li class="content-slider__slide content-slider__slide--intro l-slider-slide">
              <div class="content-slider__intro">
                <app-typography tag="h2" variant="heading-huge" class="content-slider__intro-title">
                  {{ title }}
                </app-typography>
                <app-typography tag="p" class="content-slider__intro-body">
                  {{ body }}
                </app-typography>
              </div>
            </li>

            <li
              v-for="slide in slides"
              :key="slide.id"
              class="content-slider__slide l-slider-slide"
              :style="{ '--content-slider-tone': resolveTone(slide.tone) }"
            >
              <div class="content-slider__content">
                <app-typography
                  v-if="slide.eyebrow"
                  tag="p"
                  variant="eyebrow-md"
                  class="content-slider__eyebrow"
                >
                  {{ slide.eyebrow }}
                </app-typography>
                <app-typography
                  tag="h3"
                  variant="heading-lg"
                  class="content-slider__slide-title text-semibold"
                >
                  {{ slide.title }}
                </app-typography>
                <app-typography tag="p" variant="text-lg" class="content-slider__slide-body">
                  {{ slide.description }}
                </app-typography>
                <app-typography
                  v-if="slide.quote"
                  tag="p"
                  variant="text-md"
                  class="content-slider__quote"
                >
                  {{ slide.quote }}
                </app-typography>
                <ul v-if="slide.points?.length" class="content-slider__points">
                  <li v-for="point in slide.points" :key="point" class="content-slider__point">
                    {{ point }}
                  </li>
                </ul>
              </div>

              <NuxtImg
                v-if="slide.image"
                :src="slide.image"
                :alt="slide.imageAlt ?? ''"
                provider="imagekit"
                fit="cover"
                class="content-slider__image"
                loading="lazy"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.content-slider {
  --content-slider-shell-height: 270vh;
  --content-slider-panel-height: 75vh;
  --content-slider-padding: calc(var(--spacing) * 4);
  --content-slider-tone: var(--color-envision-blue-600);

  display: grid;
  grid-column: 1/-1;
  grid-template-columns: subgrid;
  gap: calc(var(--spacing) * 8);
  position: relative;
  overflow: clip;
}

.content-slider__gallery {
  display: grid;
  grid-column: 1/-1;
  grid-row: 1/-1;
  position: relative;
  overflow: clip;
}

.l-slider-shell {
  position: relative;
  height: var(--content-slider-shell-height);
}

.l-slider-frame {
  position: sticky;
  top: 0;
  overflow: hidden;
  height: fit-content;
  padding-block: 2%;
}

.l-slider-track {
  display: flex;
}

.l-slider-slide {
  display: grid;
  width: 100vw;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  overflow: hidden;
}

.content-slider__background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.1;
  filter: grayscale(1);
}

.content-slider__slide {
  min-height: var(--content-slider-panel-height);
  background-color: var(--content-slider-tone);
}

.content-slider__slide--intro {
  background: transparent;
  min-height: var(--content-slider-panel-height);
  place-content: center;
}

.content-slider__intro {
  display: grid;
  gap: calc(var(--spacing) * 2);
  align-content: center;
  justify-items: start;
  padding: calc(var(--spacing) * 8);
}

.content-slider__intro-title {
  font-weight: 600;
  text-transform: uppercase;
}

.content-slider__intro-body {
  max-width: 60ch;
  text-wrap: balance;
}

.content-slider__content {
  grid-column: 1/-1;
  grid-row: 1/-1;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);
  align-self: end;
  padding: var(--content-slider-padding);
  color: white;
}

.content-slider__eyebrow {
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.content-slider__slide-title {
  max-width: 20ch;
  text-wrap: balance;
}

.content-slider__slide-body {
  max-width: 65ch;
  text-wrap: balance;
}

.content-slider__quote {
  max-width: 60ch;
  font-style: italic;
  text-wrap: balance;
}

.content-slider__points {
  display: grid;
  gap: calc(var(--spacing) * 1.5);
  padding: 0;
  margin: 0;
  list-style: none;
}

.content-slider__point {
  position: relative;
  padding-left: calc(var(--spacing) * 4);
  font-size: var(--font-size-text-t3);
  line-height: 1.4;
}

.content-slider__point::before {
  content: "";
  position: absolute;
  top: 0.7em;
  left: 0;
  width: calc(var(--spacing) * 2);
  height: 1px;
  background: currentColor;
}

.content-slider__image {
  grid-column: 1/-1;
  grid-row: 1/-1;
  width: 100%;
  height: var(--content-slider-panel-height);
  object-fit: cover;
  filter: grayscale();
  mix-blend-mode: multiply;
}

@media (min-width: 700px) {
  .content-slider__intro,
  .content-slider__content {
    padding: calc(var(--spacing) * 6);
  }
}
</style>
