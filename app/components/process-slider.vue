<script setup lang="ts">
import useEmblaCarousel from "embla-carousel-vue";

interface ProcessSliderPoint {
  icon?: string;
  text: string;
}

interface ProcessSliderSlide {
  id: number | string;
  eyebrow?: string;
  title: string;
  description: string;
  tone?: string;
  points?: ProcessSliderPoint[];
}

const props = withDefaults(
  defineProps<{
    title: string;
    body: string;
    backgroundImage?: string;
    backgroundImageAlt?: string;
    slides: ProcessSliderSlide[];
  }>(),
  {
    backgroundImage: "",
    backgroundImageAlt: "",
  },
);

const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

function goToPrev() {
  emblaApi.value?.scrollPrev();
}

function goToNext() {
  emblaApi.value?.scrollNext();
}

function resolveTone(tone?: string) {
  return tone ? `var(${tone})` : "var(--color-envision-blue-600)";
}
</script>

<template>
  <section class="process-slider l-process-slider">
    <header class="process-slider__intro">
      <app-typography tag="h2" variant="heading-huge">
        {{ title }}
      </app-typography>
      <app-typography tag="p" variant="text-lg">
        {{ body }}
      </app-typography>
    </header>

    <NuxtImg
      v-if="backgroundImage"
      :src="backgroundImage"
      :alt="backgroundImageAlt"
      provider="imagekit"
      fit="cover"
      class="process-slider__background"
    />

    <div class="process-slider__rail">
      <div ref="emblaRef" class="process-slider__viewport">
        <ul class="process-slider__track" role="list">
          <li
            v-for="slide in slides"
            :key="slide.id"
            class="process-slider__slide"
            :style="{ '--process-slider-tone': resolveTone(slide.tone) }"
          >
            <article class="process-slide">
              <div class="process-slide__body">
                <app-typography
                  v-if="slide.eyebrow"
                  tag="p"
                  variant="eyebrow-md"
                  class="process-slide__eyebrow"
                >
                  {{ slide.eyebrow }}
                </app-typography>
                <app-typography
                  tag="h3"
                  variant="heading-lg"
                  class="process-slide__title text-semibold"
                >
                  {{ slide.title }}
                </app-typography>
                <app-typography tag="p" variant="text-lg" class="process-slide__description">
                  {{ slide.description }}
                </app-typography>

                <ul v-if="slide.points?.length" class="process-slide__points" role="list">
                  <li v-for="point in slide.points" :key="point.text" class="process-slide__point">
                    <UIcon v-if="point.icon" :name="point.icon" class="process-slide__point-icon" />
                    <span>{{ point.text }}</span>
                  </li>
                </ul>
              </div>
            </article>
          </li>
        </ul>
      </div>

      <div class="process-slider__controls">
        <Button icon-only variant="outline" size="sm" @click="goToPrev">
          <Icon name="lucide:chevron-left" class="block" />
        </Button>
        <Button icon-only variant="outline" size="sm" @click="goToNext">
          <Icon name="lucide:chevron-right" size="1.2em" class="block" />
        </Button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.process-slider {
  --process-slider-tone: var(--color-envision-blue-600);
  --process-slider-slide-height: 20rem;
  --process-slider-slide-size: 18.75rem;

  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;
  gap: 0;
  min-height: 100vh;
  align-items: center;
  position: relative;
}

.process-slider ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.l-process-slider {
  overflow: clip;
}

.process-slider__intro {
  display: grid;
  gap: calc(var(--spacing) * 2);
  align-content: center;
  justify-items: start;
  padding: calc(var(--spacing) * 8);
  z-index: 1;
  grid-column: 1 / -1;
  text-wrap: balance;

  @media (min-width: 700px) {
    grid-column: 1 / 10;
  }
}

.process-slider__background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.1;
  filter: grayscale(1);
}

.process-slider__rail {
  grid-column: 1 / -1;

  @media (min-width: 700px) {
    grid-column: 11 / -1;
  }

  @media (min-width: 1024px) {
    grid-column: -16 / -1;
  }
}

.process-slider__viewport {
  overflow: hidden;
}

.process-slider__track {
  display: flex;
  gap: 1rem;
  touch-action: pan-y pinch-zoom;
  margin-left: calc(var(--spacing) * 4);
}

.process-slider__slide {
  flex: 0 0 var(--process-slider-slide-size);
  min-width: 0;
}

.process-slider__controls {
  display: flex;
  gap: calc(var(--spacing) * 4);
  padding: calc(var(--spacing) * 4);
}

.process-slide {
  display: flex;
  min-height: var(--process-slider-slide-height);
  height: 100%;
  align-items: end;
  background-color: var(--process-slider-tone);
}

.process-slide__body {
  display: grid;
  gap: calc(var(--spacing) * 2);
  width: 100%;
  padding: calc(var(--spacing) * 4);
  color: var(--color-white);
}

.process-slide__eyebrow,
.process-slide__title,
.process-slide__description {
  color: inherit;
}

.process-slide__points {
  display: grid;
  gap: calc(var(--spacing) * 1.5);
}

.process-slide__point {
  display: flex;
  gap: 0.65rem;
  align-items: flex-start;
}

.process-slide__point-icon {
  flex-shrink: 0;
  margin-top: 0.15rem;
  color: color-mix(in srgb, var(--color-white) 88%, var(--color-envision-green-200));
}

@media (min-width: 700px) {
  .process-slider {
    --process-slider-slide-height: 25rem;
    --process-slider-slide-size: 21.875rem;
  }
}

@media (min-width: 1024px) {
  .process-slider {
    --process-slider-slide-height: 30rem;
    --process-slider-slide-size: 31.25rem;
  }
}
</style>
