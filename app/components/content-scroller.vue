<script setup lang="ts">
import { Comment, Fragment, Text, useSlots } from "vue";
import useEmblaCarousel from "embla-carousel-vue";

const props = withDefaults(
  defineProps<{
    title: string;
    body: string;
    items: unknown[];
  }>(),
  {},
);

const slots = useSlots();

const [emblaRef, emblaApi] = useEmblaCarousel({
  align: "start",
  containScroll: "trimSnaps",
  dragFree: true,
  loop: false,
});

const selectedIndex = ref(0);
const scrollSnaps = ref<number[]>([]);
const canScrollBackward = ref(false);
const canScrollForward = ref(false);
const scrollProgress = ref(0);

const renderedSlides = computed(() => {
  return (slots.item?.() ?? []).filter((node) => {
    return node.type !== Comment && node.type !== Text && node.type !== Fragment;
  });
});

function syncCarouselState() {
  const api = emblaApi.value;

  if (!api) {
    return;
  }

  selectedIndex.value = api.selectedScrollSnap();
  scrollSnaps.value = api.scrollSnapList();
  canScrollBackward.value = api.canScrollPrev();
  canScrollForward.value = api.canScrollNext();

  const progress = api.scrollProgress();
  scrollProgress.value = Number.isFinite(progress) ? Math.max(progress, 0) : 0;
}

function scrollPrevious() {
  emblaApi.value?.scrollPrev();
}

function scrollNext() {
  emblaApi.value?.scrollNext();
}

watch(
  emblaApi,
  (api, previousApi) => {
    previousApi?.off("select", syncCarouselState);
    previousApi?.off("reInit", syncCarouselState);
    previousApi?.off("scroll", syncCarouselState);

    if (!api) {
      return;
    }

    syncCarouselState();
    api.on("select", syncCarouselState);
    api.on("reInit", syncCarouselState);
    api.on("scroll", syncCarouselState);
  },
  { immediate: true },
);

onUnmounted(() => {
  emblaApi.value?.off("select", syncCarouselState);
  emblaApi.value?.off("reInit", syncCarouselState);
  emblaApi.value?.off("scroll", syncCarouselState);
});
</script>

<template>
  <section class="content-scroller wrapper site-grid">
    <header class="content-scroller__intro">
      <app-typography tag="h2" variant="heading-huge">
        {{ title }}
      </app-typography>
      <app-typography tag="p" variant="text-lg">
        {{ body }}
      </app-typography>
    </header>

    <div class="content-scroller__viewport">
      <div v-if="props.items.length > 1" class="content-scroller__controls">
        <button
          type="button"
          class="content-scroller__control"
          :disabled="!canScrollBackward"
          aria-label="Scroll backward"
          @click="scrollPrevious"
        >
          <UIcon name="i-lucide-arrow-left" aria-hidden="true" />
        </button>
        <button
          type="button"
          class="content-scroller__control"
          :disabled="!canScrollForward"
          aria-label="Scroll forward"
          @click="scrollNext"
        >
          <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
        </button>
      </div>

      <div ref="emblaRef" class="content-scroller__embla">
        <div class="content-scroller__rail l-scroller-rail">
          <div
            v-for="(item, index) in props.items"
            :key="index"
            class="content-scroller__slide"
            :data-active="index === selectedIndex"
          >
            <slot name="item" :item="item" :index="index">
              <article class="content-scroller__card">
                <div class="content-scroller__card-body">
                  <app-typography
                    tag="h3"
                    variant="heading-md"
                    class="content-scroller__card-title"
                  >
                    Item {{ index + 1 }}
                  </app-typography>
                </div>
              </article>
            </slot>
          </div>
        </div>
      </div>

      <div v-if="props.items.length > 1" class="content-scroller__progress" aria-hidden="true">
        <span
          class="content-scroller__progress-bar"
          :style="{ transform: `scaleX(${Math.max(scrollProgress, 0.08)})` }"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.content-scroller__intro {
  grid-column: 1 / -1;
  padding-inline: calc(var(--spacing) * 3);
}

.content-scroller__intro-copy {
  display: grid;
  gap: calc(var(--spacing) * 3);
}

.content-scroller__title {
  max-width: 10ch;
  color: var(--color-envision-blue-950);
  line-height: 0.88;
  text-wrap: balance;
}

.content-scroller__body {
  max-width: 24ch;
  color: color-mix(in srgb, var(--color-envision-blue-950) 84%, white);
  line-height: 1.45;
}

.content-scroller__viewport {
  display: grid;
  gap: calc(var(--spacing) * 3);
  grid-column: 1 / -1;
  min-width: 0;
}

.content-scroller__controls {
  display: none;
  justify-content: flex-end;
  gap: calc(var(--spacing) * 2);
  padding-inline: calc(var(--spacing) * 3);
}

.content-scroller__control {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border: 0;
  border-radius: 999px;
  background: rgb(255 255 255 / 76%);
  color: var(--color-envision-blue-950);
  box-shadow: 0 1px 0 rgb(15 23 42 / 10%);
  backdrop-filter: blur(12px);
  cursor: pointer;
  transition:
    transform 160ms ease,
    opacity 160ms ease,
    background-color 160ms ease;
}

.content-scroller__control:hover:not(:disabled) {
  transform: translateY(-1px);
  background: rgb(255 255 255 / 88%);
}

.content-scroller__control:disabled {
  opacity: 0.35;
  cursor: default;
}

.content-scroller__control:focus-visible {
  outline: 2px solid var(--color-envision-blue-900);
  outline-offset: 2px;
}

.content-scroller__embla {
  overflow: hidden;
}

.l-scroller-rail {
  display: flex;
  gap: var(--content-scroller-gap);
  padding-inline: calc(var(--spacing) * 3);
  padding-block-end: calc(var(--spacing) * 2);
}

.content-scroller__slide {
  flex: 0 0 var(--content-scroller-card-width);
  min-width: 0;
}

.content-scroller__card {
  position: relative;
  display: grid;
  min-height: 30rem;
  overflow: hidden;
  background: var(--color-envision-blue-700);
  box-shadow: 0 0 0 1px rgb(15 23 42 / 8%);
}

.content-scroller__card-body {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 100%;
  padding: calc(var(--spacing) * 4);
  color: white;
}

.content-scroller__card-title {
  max-width: 14ch;
}

.content-scroller__progress {
  height: 1px;
  margin-inline: calc(var(--spacing) * 3);
  background: rgb(15 23 42 / 14%);
  overflow: hidden;
}

.content-scroller__progress-bar {
  display: block;
  width: 100%;
  height: 100%;
  transform-origin: left center;
  background: var(--color-envision-blue-950);
}

@media (min-width: 900px) {
  .content-scroller {
    --content-scroller-card-width: min(44vw, 27rem);
  }

  .l-scroller-layout {
    grid-template-columns: minmax(16rem, 0.52fr) minmax(0, 1fr);
    align-items: start;
    gap: calc(var(--spacing) * 4);
  }

  .content-scroller__intro {
    padding-inline: calc(var(--spacing) * 4);
    padding-block-start: calc(var(--spacing) * 4);
  }

  .content-scroller__viewport {
    gap: calc(var(--spacing) * 4);
  }

  .content-scroller__controls {
    display: flex;
    padding-inline: calc(var(--spacing) * 4);
  }

  .l-scroller-rail {
    padding-inline: calc(var(--spacing) * 4);
  }

  .content-scroller__progress {
    margin-inline: calc(var(--spacing) * 4);
  }
}
</style>
