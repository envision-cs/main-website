<script setup lang="ts">
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

defineProps<{
  title: string;
  body: string;
  backgroundImage?: string;
  backgroundImageAlt?: string;
  slides: ContentSliderItem[];
}>();

function resolveTone(tone?: string) {
  return tone ? `var(${tone})` : 'var(--color-envision-blue-600)';
}

const trackRef = useTemplateRef('trackRef');
const targetRef = useTemplateRef('targetRef');

let scrollTriggerInstance: { kill: () => void } | null = null;
let tweenInstance: { kill: () => void } | null = null;
let visibilityObserver: IntersectionObserver | null = null;
let isUnmounted = false;

async function initializeSlider() {
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]);

  if (isUnmounted) return;

  gsap.registerPlugin(ScrollTrigger);
  if (!trackRef.value) return;

  tweenInstance = gsap.to(trackRef.value, {
    x: getScrollAmount,
    duration: 3,
    ease: 'none',
  });

  scrollTriggerInstance = ScrollTrigger.create({
    trigger: targetRef.value,
    start: 'top top',
    end: () => `+=${getScrollAmount() * -1}`,
    pin: true,
    animation: tweenInstance,
    scrub: 1,
    invalidateOnRefresh: true,
  });

  function getScrollAmount() {
    const sw = trackRef.value?.scrollWidth ?? window.innerWidth;
    return -(sw - window.innerWidth);
  }
}

onMounted(() => {
  if (!targetRef.value) return;

  visibilityObserver = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return;

      visibilityObserver?.disconnect();
      visibilityObserver = null;
      void initializeSlider();
    },
    { rootMargin: '300px 0px' },
  );

  visibilityObserver.observe(targetRef.value);
});

onUnmounted(() => {
  isUnmounted = true;
  visibilityObserver?.disconnect();
  visibilityObserver = null;
  scrollTriggerInstance?.kill();
  scrollTriggerInstance = null;
  tweenInstance?.kill();
  tweenInstance = null;
});
</script>

<template>
  <section class="site-grid">
    <div ref="targetRef" class="scroller">
      <NuxtImg
        v-if="backgroundImage"
        :src="backgroundImage"
        :alt="backgroundImageAlt"
        provider="imagekit"
        fit="cover"
        class="background"
      />

      <ul ref="trackRef" class="track">
        <li class="slide">
          <div class="slide-intro">
            <app-typography tag="h2" variant="heading-huge">
              {{ title }}
            </app-typography>
            <app-typography tag="p" variant="text-lg">
              {{ body }}
            </app-typography>
          </div>
        </li>

        <li
          v-for="slide in slides"
          :key="slide.id"
          class="slide"
          :style="{
            '--content-slider-tone': resolveTone(slide.tone),
            '--slide-bg-image': slide.image ? `url(${slide.image})` : 'none',
          }"
        >
          <div class="slider-content">
            <app-typography
              tag="h3"
              variant="heading-xl"
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
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
section {
  display: grid;
  grid-column: 1/-1;
  grid-template-columns: subgrid;
  gap: calc(var(--spacing) * 8);
  position: relative;
  overflow: hidden;
}

.scroller {
  display: grid;
  grid-column: 1/-1;
  grid-row: 1/-1;
  position: relative;
  height: 100dvh;
  align-items: center;
}

.track {
  display: flex;
  gap: calc(var(--spacing) * 4);
  flex-shrink: 0;
}

.slide {
  width: 80dvi;
  background-color: var(--content-slider-tone);
  background-blend-mode: multiply;
  position: relative;

  display: grid;
  width: 90vw;
  height: 75vh;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  overflow: clip;
  isolation: isolate;

  @media (min-width: 700px) {
    width: 70vw;
  }
}

.slide-intro {
  display: grid;
  place-content: center;
}

.slider-content,
.slider-image {
  grid-column: 1 / -1;
  grid-row: 1 / -1;
}

.slide::before {
  content: '';
  position: absolute;
  background-image: var(--slide-bg-image);
  inset: 0;
  background-size: cover;
  opacity: 0.8;
  background-position: center;
  filter: grayscale(1);
  mix-blend-mode: multiply;
  z-index: 0;
}

.slider-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale();
  z-index: 1;
  mix-blend-mode: multiply;
}

/* Text layer sits above the image */
.slider-content {
  position: relative;
  z-index: 2;
  padding: calc(var(--spacing) * 6);
  isolation: isolate;
  display: grid;
  place-content: center;
}

.background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.1;
  filter: grayscale(1);
}
</style>
