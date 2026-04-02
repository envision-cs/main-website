<script setup lang="ts">
import useEmblaCarousel from "embla-carousel-vue";
interface TestimonialItem {
  quote: string;
  name: string;
  title: string;
  detail?: string;
}

const props = withDefaults(
  defineProps<{
    quote?: string;
    name?: string;
    title?: string;
    testimonials?: TestimonialItem[];
    eyebrow?: string;
    sectionTitle?: string;
    sectionBody?: string;
  }>(),
  {
    eyebrow: "Client Testimonials",
    sectionTitle: "Our clients who expect discipline, communication, and follow-through.",
  },
);

const normalizedTestimonials = computed(() => {
  return (props.testimonials ?? [])
    .filter((testimonial) => testimonial?.quote?.trim())
    .map((testimonial) => ({
      quote: testimonial.quote.trim(),
      name: testimonial.name?.trim() || "Envision Client",
      title: testimonial.title?.trim() || "Project Partner",
      detail: testimonial.detail?.trim(),
    }));
});

const hasTestimonials = computed(() => normalizedTestimonials.value.length > 0);
const showRailNavigation = computed(() => normalizedTestimonials.value.length > 1);

const [emblaRef, emblaApi] = useEmblaCarousel({
  align: "center",
  loop: false,
});

const selectedIndex = ref(0);
const scrollSnaps = ref<number[]>([]);
const canScrollPrevious = ref(false);
const canScrollNext = ref(false);

function syncCarouselState() {
  const api = emblaApi.value;
  if (!api) return;
  selectedIndex.value = api.selectedScrollSnap();
  scrollSnaps.value = api.scrollSnapList();
  canScrollPrevious.value = api.canScrollPrev();
  canScrollNext.value = api.canScrollNext();
}

const scrollPrevious = () => emblaApi.value?.scrollPrev();
const scrollNext = () => emblaApi.value?.scrollNext();
const scrollTo = (index: number) => emblaApi.value?.scrollTo(index);

function handleKeydown(event: KeyboardEvent) {
  if (event.key === "ArrowLeft") { event.preventDefault(); scrollPrevious(); }
  if (event.key === "ArrowRight") { event.preventDefault(); scrollNext(); }
}

watch(emblaApi, (api, previousApi) => {
  previousApi?.off("select", syncCarouselState);
  previousApi?.off("reInit", syncCarouselState);
  if (!api) return;
  syncCarouselState();
  api.on("select", syncCarouselState);
  api.on("reInit", syncCarouselState);
}, { immediate: true });

onUnmounted(() => {
  emblaApi.value?.off("select", syncCarouselState);
  emblaApi.value?.off("reInit", syncCarouselState);
});
</script>

<template>
  <section class="quotes-win-section">
    <div class="quotes-win-window" v-if="hasTestimonials">
      <!-- Title bar -->
      <div class="win-titlebar" role="presentation">
        <span>{{ eyebrow }}</span>
        <div class="win-titlebar-buttons" aria-hidden="true">
          <button class="win-titlebar-btn" tabindex="-1">_</button>
          <button class="win-titlebar-btn" tabindex="-1">&#9633;</button>
          <button class="win-titlebar-btn" tabindex="-1">&#x2715;</button>
        </div>
      </div>

      <!-- Header text -->
      <div class="quotes-win-header">
        <div class="quotes-win-header-inner">
          <p class="quotes-win-title">{{ sectionTitle }}</p>
          <p v-if="sectionBody" class="quotes-win-body">{{ sectionBody }}</p>
        </div>
      </div>

      <!-- Scrolling notepad area -->
      <div class="quotes-win-notepad">
        <div class="quotes-notepad-lines" aria-hidden="true">
          <div v-for="i in 16" :key="i" class="quotes-notepad-line" />
        </div>

        <div
          ref="emblaRef"
          class="quotes-win-viewport"
          :tabindex="showRailNavigation ? 0 : -1"
          aria-label="Client testimonials"
          @keydown="handleKeydown"
        >
          <ul class="quotes-win-rail" role="list">
            <li
              v-for="(testimonial, index) in normalizedTestimonials"
              :key="`${testimonial.name}-${index}`"
              class="quotes-win-slide"
            >
              <article class="testimonial-win">
                <p class="testimonial-win-quote">
                  <span aria-hidden="true" class="testimonial-win-mark">"</span>
                  <span dir="auto">{{ testimonial.quote }}</span>
                  <span aria-hidden="true" class="testimonial-win-mark">"</span>
                </p>
                <div class="testimonial-win-divider" />
                <div class="testimonial-win-meta">
                  <p class="testimonial-win-name">{{ testimonial.name }}</p>
                  <p class="testimonial-win-title">{{ testimonial.title }}</p>
                  <p v-if="testimonial.detail" class="testimonial-win-detail">
                    {{ testimonial.detail }}
                  </p>
                </div>
              </article>
            </li>
          </ul>
        </div>
      </div>

      <!-- Navigation row -->
      <div v-if="showRailNavigation" class="quotes-win-nav">
        <button
          class="win-button"
          :disabled="!canScrollPrevious"
          aria-label="Previous testimonial"
          @click="scrollPrevious"
        >&#9664; Prev</button>

        <div class="quotes-win-dots" aria-label="Testimonial pages">
          <button
            v-for="(_, index) in scrollSnaps"
            :key="index"
            class="quotes-win-dot"
            :class="{ 'is-active': index === selectedIndex }"
            :aria-label="`Show testimonial ${index + 1}`"
            :aria-pressed="index === selectedIndex"
            @click="scrollTo(index)"
          />
        </div>

        <button
          class="win-button"
          :disabled="!canScrollNext"
          aria-label="Next testimonial"
          @click="scrollNext"
        >Next &#9654;</button>
      </div>

      <div class="win-status-bar quotes-win-status">
        <span>&#9679;</span>
        <span>{{ normalizedTestimonials.length }} testimonial(s)</span>
        <div class="quotes-sep" />
        <span>Showing {{ selectedIndex + 1 }} of {{ normalizedTestimonials.length }}</span>
      </div>
    </div>

    <!-- Fallback -->
    <div v-else class="quotes-win-window">
      <div class="win-titlebar" role="presentation">
        <span>{{ eyebrow }}</span>
      </div>
      <div class="quotes-win-notepad">
        <p class="quotes-win-fallback-text">
          "{{ quote || 'Clients trust Envision to communicate clearly and follow through.' }}"
        </p>
        <p v-if="name" class="quotes-win-name">{{ name }}</p>
        <p v-if="title" class="quotes-win-attribution">{{ title }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.quotes-win-section {
  grid-column: 1 / -1;
  background: var(--color-win-gray-light);
  padding: 16px;
  display: flex;
  justify-content: center;
}

.quotes-win-window {
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-raised);
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
}

.win-titlebar {
  background: var(--win-titlebar);
  color: #fff;
  font-weight: bold;
  font-size: 11px;
  font-family: "Tahoma", sans-serif;
  padding: 3px 4px 3px 6px;
  display: flex;
  align-items: center;
  gap: 4px;
  user-select: none;
}

.win-titlebar-buttons {
  margin-left: auto;
  display: flex;
  gap: 2px;
}

.win-titlebar-btn {
  width: 16px;
  height: 14px;
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-button);
  font-size: 9px;
  font-weight: bold;
  color: var(--color-win-black);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 0;
  padding: 0;
}

.quotes-win-header {
  padding: 8px;
}

.quotes-win-header-inner {
  background: var(--color-win-white);
  box-shadow: var(--win-border-sunken);
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.quotes-win-title {
  font-size: 13px;
  font-weight: bold;
  font-family: "Tahoma", sans-serif;
  color: var(--color-win-navy);
  margin: 0;
  line-height: 1.35;
}

.quotes-win-body {
  font-size: 11px;
  font-family: "Tahoma", sans-serif;
  color: var(--color-win-black);
  margin: 0;
  line-height: 1.45;
}

/* Notepad area */
.quotes-win-notepad {
  position: relative;
  margin: 8px;
  background: #fffef5;
  box-shadow: var(--win-border-sunken);
  overflow: hidden;
  border-left: 4px solid #ffaaaa;
}

.quotes-notepad-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 20px 0;
}

.quotes-notepad-line {
  height: 1px;
  background: #add8e6;
  opacity: 0.5;
}

.quotes-win-viewport {
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.quotes-win-viewport:focus-visible {
  outline: 1px dotted #000;
  outline-offset: 2px;
}

.quotes-win-rail {
  display: flex;
  margin: 0;
  padding: 0;
  list-style: none;
  touch-action: pan-y pinch-zoom;
}

.quotes-win-slide {
  flex: 0 0 100%;
  min-width: 0;
}

.testimonial-win {
  padding: 24px 20px 20px 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.testimonial-win-quote {
  font-size: 14px;
  font-family: "Times New Roman", serif;
  font-style: italic;
  color: var(--color-win-black);
  line-height: 1.6;
  margin: 0;
}

.testimonial-win-mark {
  font-size: 18px;
  color: #808080;
  font-style: normal;
}

.testimonial-win-divider {
  height: 0;
  border-top: 1px solid #808080;
  border-bottom: 1px solid #ffffff;
}

.testimonial-win-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.testimonial-win-name {
  font-size: 11px;
  font-weight: bold;
  font-family: "Tahoma", sans-serif;
  color: var(--color-win-navy);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin: 0;
}

.testimonial-win-title {
  font-size: 10px;
  font-family: "Tahoma", sans-serif;
  color: #404040;
  margin: 0;
}

.testimonial-win-detail {
  font-size: 10px;
  font-family: "Tahoma", sans-serif;
  color: var(--color-win-black);
  margin: 0;
  padding: 2px 6px;
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-raised);
  display: inline-block;
  align-self: flex-start;
}

/* Nav row */
.quotes-win-nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 8px;
  gap: 8px;
  border-top: 2px solid #808080;
  box-shadow: inset 0 2px 0 #ffffff;
}

.win-button {
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-button);
  color: var(--color-win-black);
  font-family: "Tahoma", sans-serif;
  font-size: 11px;
  padding: 3px 12px 4px;
  cursor: pointer;
  border: 0;
  min-width: 70px;
  text-align: center;
}

.win-button:active {
  box-shadow: var(--win-border-sunken);
  padding: 4px 12px 3px;
}

.win-button:disabled {
  opacity: 0.4;
  cursor: default;
}

.quotes-win-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}

.quotes-win-dot {
  width: 12px;
  height: 12px;
  background: var(--color-win-gray-light);
  box-shadow: var(--win-border-button);
  border: 0;
  cursor: pointer;
  padding: 0;
}

.quotes-win-dot.is-active {
  background: var(--color-win-navy);
  box-shadow: var(--win-border-sunken);
}

.win-status-bar {
  background: var(--color-win-gray-light);
  border-top: 1px solid #808080;
  padding: 2px 8px;
  font-size: 10px;
  font-family: "Tahoma", sans-serif;
  display: flex;
  align-items: center;
  gap: 6px;
}

.quotes-sep {
  width: 1px;
  height: 12px;
  background: #808080;
  box-shadow: 1px 0 0 #ffffff;
}

.quotes-win-fallback-text {
  font-size: 14px;
  font-family: "Times New Roman", serif;
  font-style: italic;
  padding: 20px;
  margin: 0;
}

.quotes-win-name {
  font-size: 11px;
  font-weight: bold;
  font-family: "Tahoma", sans-serif;
  padding: 0 20px;
  margin: 0;
}

.quotes-win-attribution {
  font-size: 10px;
  font-family: "Tahoma", sans-serif;
  padding: 0 20px 16px;
  margin: 0;
  color: #404040;
}
</style>
