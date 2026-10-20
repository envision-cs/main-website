<script setup lang="ts">
interface RotationPhoto {
  src: string;
  alt: string;
}

const props = withDefaults(
  defineProps<{
    photos: RotationPhoto[];
    label: string;
    intervalMs?: number;
  }>(),
  {
    intervalMs: 5500,
  },
);

const activeIndex = ref(0);
// Only photos that have been shown (or are next up) get a src, so the rest
// stay lazy until the rotation reaches them.
const loadedIndexes = ref(new Set<number>([0]));
const prefersReducedMotion = ref(false);
const isInView = ref(false);
const hasFocusWithin = ref(false);
const isPausedByUser = ref(false);
const isDocumentHidden = ref(false);

let autoplayTimer: ReturnType<typeof setInterval> | undefined;
let motionMediaQuery: MediaQueryList | undefined;
let viewObserver: IntersectionObserver | undefined;
const rootRef = ref<HTMLElement | null>(null);

const photoCount = computed(() => props.photos.length);
const autoplayAllowed = computed(() => photoCount.value > 1 && !prefersReducedMotion.value);
const isAutoplaying = computed(
  () =>
    autoplayAllowed.value &&
    !isPausedByUser.value &&
    isInView.value &&
    !hasFocusWithin.value &&
    !isDocumentHidden.value,
);

function markLoaded(index: number) {
  if (loadedIndexes.value.has(index)) return;
  loadedIndexes.value = new Set(loadedIndexes.value).add(index);
}

function goTo(index: number) {
  const count = photoCount.value;
  if (!count) return;
  activeIndex.value = (index + count) % count;
  markLoaded(activeIndex.value);
  markLoaded((activeIndex.value + 1) % count);
}

function stopAutoplay() {
  if (autoplayTimer) clearInterval(autoplayTimer);
  autoplayTimer = undefined;
}

function startAutoplay() {
  stopAutoplay();
  if (!isAutoplaying.value) return;
  autoplayTimer = setInterval(() => goTo(activeIndex.value + 1), props.intervalMs);
}

function showPrevious() {
  goTo(activeIndex.value - 1);
  startAutoplay();
}

function showNext() {
  goTo(activeIndex.value + 1);
  startAutoplay();
}

function updateReducedMotionPreference() {
  prefersReducedMotion.value = motionMediaQuery?.matches ?? false;
}

function onDocumentVisibilityChange() {
  isDocumentHidden.value = document.visibilityState === 'hidden';
}

// Pause only for keyboard focus. A mouse click on a control also focuses it,
// and pausing then would leave the rotation stopped after any click.
function onFocusIn(event: FocusEvent) {
  hasFocusWithin.value = (event.target as Element).matches(':focus-visible');
}

function onFocusOut(event: FocusEvent) {
  const next = event.relatedTarget as Node | null;
  if (!next || !(event.currentTarget as HTMLElement).contains(next)) hasFocusWithin.value = false;
}

watch(isAutoplaying, startAutoplay);

onMounted(() => {
  motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  updateReducedMotionPreference();
  motionMediaQuery.addEventListener('change', updateReducedMotionPreference);
  document.addEventListener('visibilitychange', onDocumentVisibilityChange);
  markLoaded(1 % Math.max(photoCount.value, 1));
  // Start the clock only once the rotation is on screen, so the first photo
  // gets a full interval when it is actually seen.
  if (rootRef.value) {
    viewObserver = new IntersectionObserver(
      ([entry]) => {
        isInView.value = Boolean(entry?.isIntersecting);
      },
      { threshold: 0.5 },
    );
    viewObserver.observe(rootRef.value);
  }
});

onUnmounted(() => {
  stopAutoplay();
  viewObserver?.disconnect();
  motionMediaQuery?.removeEventListener('change', updateReducedMotionPreference);
  document.removeEventListener('visibilitychange', onDocumentVisibilityChange);
});
</script>

<template>
  <section
    ref="rootRef"
    class="photo-rotation"
    :aria-label="label"
    aria-roledescription="carousel"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
  >
    <div class="photo-rotation__frame" :aria-live="isAutoplaying ? 'off' : 'polite'">
      <div
        v-for="(photo, index) in photos"
        :key="photo.src"
        class="photo-rotation__slide"
        :class="{ 'is-active': index === activeIndex }"
        role="group"
        aria-roledescription="slide"
        :aria-label="`${index + 1} of ${photoCount}`"
        :aria-hidden="index !== activeIndex"
      >
        <img
          v-if="loadedIndexes.has(index)"
          :src="photo.src"
          :alt="photo.alt"
          width="2200"
          height="1467"
          :loading="index === 0 ? 'eager' : 'lazy'"
          decoding="async"
          class="photo-rotation__image"
        >
      </div>
    </div>

    <div v-if="photoCount > 1" class="photo-rotation__controls">
      <button
        type="button"
        class="photo-rotation__button"
        :aria-label="isPausedByUser || !autoplayAllowed ? 'Play photo rotation' : 'Pause photo rotation'"
        :disabled="!autoplayAllowed"
        @click="isPausedByUser = !isPausedByUser"
      >
        <UIcon :name="isPausedByUser || !autoplayAllowed ? 'i-lucide-play' : 'i-lucide-pause'" aria-hidden="true" />
      </button>
      <button type="button" class="photo-rotation__button" aria-label="Previous photo" @click="showPrevious">
        <UIcon name="i-lucide-arrow-left" aria-hidden="true" />
      </button>
      <div class="photo-rotation__dots">
        <button
          v-for="(photo, index) in photos"
          :key="`dot-${photo.src}`"
          type="button"
          class="photo-rotation__dot"
          :class="{ 'is-active': index === activeIndex }"
          :aria-label="`Show photo ${index + 1} of ${photoCount}`"
          :aria-current="index === activeIndex ? 'true' : undefined"
          @click="goTo(index); startAutoplay()"
        />
      </div>
      <button type="button" class="photo-rotation__button" aria-label="Next photo" @click="showNext">
        <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
      </button>
    </div>
  </section>
</template>

<style scoped>
.photo-rotation {
  position: relative;
  grid-column: 1 / -1;
  background-color: var(--color-envision-gray-900);
}

/* Fixed 3:2 box (capped on tall screens) so advancing never shifts layout. */
.photo-rotation__frame {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 2;
  max-height: 80svh;
  overflow: hidden;
}

.photo-rotation__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 700ms ease;
}

.photo-rotation__slide.is-active {
  opacity: 1;
}

.photo-rotation__image {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-rotation__controls {
  position: absolute;
  right: calc(var(--spacing) * 4);
  bottom: calc(var(--spacing) * 4);
  display: flex;
  align-items: center;
  gap: calc(var(--spacing) * 2);
  padding: calc(var(--spacing) * 1);
  background-color: color-mix(in oklab, var(--color-envision-gray-900) 70%, transparent);
}

.photo-rotation__button {
  display: grid;
  place-items: center;
  width: 2.25rem;
  height: 2.25rem;
  color: var(--color-white);
  background: transparent;
  border: 1px solid color-mix(in oklab, var(--color-white) 30%, transparent);
  cursor: pointer;
  transition: border-color 180ms ease, color 180ms ease;
}

.photo-rotation__button:hover:not(:disabled) {
  color: var(--ui-secondary);
  border-color: var(--ui-secondary);
}

.photo-rotation__button:disabled {
  cursor: default;
  opacity: 0.4;
}

.photo-rotation__dots {
  display: flex;
  align-items: center;
}

/* 24px hit area around a small square marker. */
.photo-rotation__dot {
  display: grid;
  place-items: center;
  width: 1.5rem;
  height: 1.5rem;
  background: transparent;
  border: 0;
  cursor: pointer;
}

.photo-rotation__dot::before {
  content: '';
  width: 0.5rem;
  height: 0.5rem;
  background-color: color-mix(in oklab, var(--color-white) 45%, transparent);
  transition: background-color 180ms ease;
}

.photo-rotation__dot.is-active::before {
  background-color: var(--ui-secondary);
}

.photo-rotation__button:focus-visible,
.photo-rotation__dot:focus-visible {
  outline: 2px solid var(--ui-secondary);
  outline-offset: 2px;
}

/* On phones the controls sit in a strip below the photo instead of over it. */
@media (max-width: 699px) {
  .photo-rotation__controls {
    position: static;
    justify-content: center;
    gap: calc(var(--spacing) * 1);
    padding: calc(var(--spacing) * 2);
    background-color: var(--color-envision-gray-900);
  }

  .photo-rotation__dot {
    width: 1.25rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .photo-rotation__slide,
  .photo-rotation__button,
  .photo-rotation__dot::before {
    transition: none;
  }
}
</style>
