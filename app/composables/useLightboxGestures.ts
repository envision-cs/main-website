import {
  onKeyStroke,
  useEventListener,
  usePreferredReducedMotion,
  useRafFn,
  useScrollLock,
} from '@vueuse/core';
import type { MaybeRefOrGetter, Ref } from 'vue';

export type GalleryNavMethod = 'button' | 'keyboard' | 'swipe';
export type GalleryZoomMethod = 'pinch' | 'double_tap' | 'wheel' | 'keyboard';

type Gesture = 'none' | 'swipe' | 'pan' | 'pinch';

interface GestureSnapshot {
  x: number;
  y: number;
  time: number;
  panX: number;
  panY: number;
  scale: number;
  dist: number;
  midX: number;
  midY: number;
}

export interface UseLightboxGesturesOptions {
  /** Element that receives pointer/wheel input. */
  viewport: Ref<HTMLElement | null>;
  /** Dialog element — keyboard shortcuts are scoped to it. */
  dialog: Ref<HTMLDialogElement | null>;
  /** Whether the lightbox is currently open (drives body scroll lock). */
  isOpen: Ref<boolean>;
  /** Number of slides. */
  count: MaybeRefOrGetter<number>;
  /** Called when the user requests a close (tap outside image / Escape is native). */
  onClose: () => void;
  /** Analytics hook — fired after a slide change. */
  onNavigate?: (payload: { from: number; to: number; method: GalleryNavMethod }) => void;
  /** Analytics hook — fired when the user zooms in from resting scale. */
  onZoom?: (method: GalleryZoomMethod) => void;
}

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function useLightboxGestures(options: UseLightboxGesturesOptions) {
  const { viewport, dialog, isOpen, onClose, onNavigate, onZoom } = options;
  const count = toRef(options.count);

  const reducedMotion = usePreferredReducedMotion();
  const prefersReducedMotion = computed(() => reducedMotion.value === 'reduce');

  // ── Reactive gesture state ───────────────────────────────────────────────
  const activeIndex = ref(0);
  const scale = ref(1);
  const panX = ref(0);
  const panY = ref(0);
  const dragX = ref(0);
  const isDragging = ref(false);
  const zoomAnimated = ref(true);

  const isFirstImage = computed(() => activeIndex.value <= 0);
  const isLastImage = computed(() => activeIndex.value >= count.value - 1);

  // ── Non-reactive gesture bookkeeping (never rendered, so plain vars) ─────
  const activePointers = new Map<number, { x: number; y: number }>();
  let gesture: Gesture = 'none';
  let gestureStart: GestureSnapshot = {
    x: 0,
    y: 0,
    time: 0,
    panX: 0,
    panY: 0,
    scale: 1,
    dist: 1,
    midX: 0,
    midY: 0,
  };
  let lastTap = { time: 0, x: 0, y: 0 };
  let suppressTap = false;

  // Lock body scroll while the dialog is open (iOS rubber-banding, etc.).
  const bodyLock = useScrollLock(() => (import.meta.client ? document.body : null));
  watch(isOpen, (open) => {
    bodyLock.value = open;
  });

  // One rAF loop that runs only while a gesture is active — VueUse handles
  // cleanup on scope dispose, so no manual cancelAnimationFrame bookkeeping.
  const { resume: startFrameLoop, pause: stopFrameLoop } = useRafFn(applyGestureFrame, {
    immediate: false,
  });

  // ── Geometry helpers ─────────────────────────────────────────────────────
  function pointFromViewportCenter(clientX: number, clientY: number) {
    const rect = viewport.value?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };

    return {
      x: clientX - rect.left - rect.width / 2,
      y: clientY - rect.top - rect.height / 2,
    };
  }

  function clampPanToBounds() {
    const el = viewport.value;
    if (!el) return;

    const maxX = (el.clientWidth * (scale.value - 1)) / 2;
    const maxY = (el.clientHeight * (scale.value - 1)) / 2;
    panX.value = clamp(panX.value, -maxX, maxX);
    panY.value = clamp(panY.value, -maxY, maxY);
  }

  function resetZoom(animated = true) {
    zoomAnimated.value = animated && !prefersReducedMotion.value;
    scale.value = 1;
    panX.value = 0;
    panY.value = 0;
  }

  function zoomToPoint(targetScale: number, originX: number, originY: number) {
    const nextScale = clamp(targetScale, MIN_SCALE, MAX_SCALE);
    const ratio = nextScale / scale.value;
    panX.value = originX - (originX - panX.value) * ratio;
    panY.value = originY - (originY - panY.value) * ratio;
    scale.value = nextScale;
    clampPanToBounds();
  }

  function notifyZoomStart(method: GalleryZoomMethod) {
    if (scale.value <= 1.01) onZoom?.(method);
  }

  // ── Navigation ───────────────────────────────────────────────────────────
  function goToImage(index: number, method: GalleryNavMethod = 'button') {
    if (!count.value) return;

    dragX.value = 0;
    isDragging.value = false;
    const target = clamp(index, 0, count.value - 1);
    if (target === activeIndex.value) return;

    const from = activeIndex.value;
    activeIndex.value = target;
    resetZoom(true);
    onNavigate?.({ from, to: target, method });
  }

  const showPreviousImage = (method: GalleryNavMethod = 'button') =>
    !isFirstImage.value && goToImage(activeIndex.value - 1, method);
  const showNextImage = (method: GalleryNavMethod = 'button') =>
    !isLastImage.value && goToImage(activeIndex.value + 1, method);

  // ── Gesture lifecycle ────────────────────────────────────────────────────
  function startSinglePointerGesture(x: number, y: number) {
    gesture = scale.value > 1.01 ? 'pan' : 'swipe';
    gestureStart = {
      x,
      y,
      time: performance.now(),
      panX: panX.value,
      panY: panY.value,
      scale: scale.value,
      dist: 1,
      midX: 0,
      midY: 0,
    };

    if (gesture === 'pan') zoomAnimated.value = false;
    else isDragging.value = true;

    startFrameLoop();
  }

  function startPinchGesture() {
    const [first, second] = [...activePointers.values()];
    if (!first || !second) return;

    notifyZoomStart('pinch');

    dragX.value = 0;
    isDragging.value = false;
    zoomAnimated.value = false;
    gesture = 'pinch';

    const mid = pointFromViewportCenter((first.x + second.x) / 2, (first.y + second.y) / 2);
    gestureStart = {
      x: 0,
      y: 0,
      time: performance.now(),
      panX: panX.value,
      panY: panY.value,
      scale: scale.value,
      dist: Math.max(Math.hypot(second.x - first.x, second.y - first.y), 1),
      midX: mid.x,
      midY: mid.y,
    };

    startFrameLoop();
  }

  function rebaselineSinglePointer() {
    const [remaining] = [...activePointers.values()];
    if (!remaining) return;

    suppressTap = true;
    startSinglePointerGesture(remaining.x, remaining.y);
  }

  function applyGestureFrame() {
    if (gesture === 'pinch') {
      const [first, second] = [...activePointers.values()];
      if (!first || !second) return;

      const dist = Math.max(Math.hypot(second.x - first.x, second.y - first.y), 1);
      const nextScale = clamp(
        gestureStart.scale * (dist / gestureStart.dist),
        MIN_SCALE,
        MAX_SCALE,
      );
      const mid = pointFromViewportCenter((first.x + second.x) / 2, (first.y + second.y) / 2);
      const ratio = nextScale / gestureStart.scale;
      panX.value = mid.x - (gestureStart.midX - gestureStart.panX) * ratio;
      panY.value = mid.y - (gestureStart.midY - gestureStart.panY) * ratio;
      scale.value = nextScale;
      clampPanToBounds();
      return;
    }

    const [pointer] = [...activePointers.values()];
    if (!pointer) return;

    if (gesture === 'pan') {
      panX.value = gestureStart.panX + (pointer.x - gestureStart.x);
      panY.value = gestureStart.panY + (pointer.y - gestureStart.y);
      clampPanToBounds();
    } else if (gesture === 'swipe') {
      let delta = pointer.x - gestureStart.x;
      if ((isFirstImage.value && delta > 0) || (isLastImage.value && delta < 0)) delta *= 0.3;
      dragX.value = delta;
    }
  }

  function handleTap(event: PointerEvent) {
    const now = performance.now();
    const isDoubleTap =
      now - lastTap.time < 300 &&
      Math.hypot(event.clientX - lastTap.x, event.clientY - lastTap.y) < 32;

    if (isDoubleTap) {
      lastTap = { time: 0, x: 0, y: 0 };
      zoomAnimated.value = !prefersReducedMotion.value;
      if (scale.value > 1.01) {
        resetZoom(true);
      } else {
        notifyZoomStart('double_tap');
        const origin = pointFromViewportCenter(event.clientX, event.clientY);
        zoomToPoint(DOUBLE_TAP_SCALE, origin.x, origin.y);
      }
      return;
    }

    lastTap = { time: now, x: event.clientX, y: event.clientY };

    const target = document.elementFromPoint(event.clientX, event.clientY);
    if (target && !target.closest('img') && !target.closest('button')) onClose();
  }

  function endGesture() {
    gesture = 'none';
    isDragging.value = false;
    zoomAnimated.value = !prefersReducedMotion.value;
    stopFrameLoop();
    if (scale.value < 1.01) resetZoom(true);
  }

  // ── Pointer handlers (auto-removed by useEventListener on unmount) ───────
  useEventListener(viewport, 'pointerdown', (event: PointerEvent) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;

    const el = viewport.value;
    if (!el) return;

    el.setPointerCapture(event.pointerId);
    activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });

    if (activePointers.size === 2) {
      startPinchGesture();
    } else if (activePointers.size === 1) {
      suppressTap = false;
      startSinglePointerGesture(event.clientX, event.clientY);
    }
  });

  useEventListener(viewport, 'pointermove', (event: PointerEvent) => {
    const pointer = activePointers.get(event.pointerId);
    if (!pointer) return;

    pointer.x = event.clientX;
    pointer.y = event.clientY;
  });

  useEventListener(viewport, 'pointerup', (event: PointerEvent) => {
    if (!activePointers.has(event.pointerId)) return;

    activePointers.delete(event.pointerId);

    if (gesture === 'pinch') {
      if (activePointers.size === 1) rebaselineSinglePointer();
      else if (activePointers.size >= 2) startPinchGesture();
      else endGesture();
      return;
    }

    const elapsed = performance.now() - gestureStart.time;
    const moved = Math.hypot(event.clientX - gestureStart.x, event.clientY - gestureStart.y);
    const isTap = !suppressTap && moved < 8 && elapsed < 350;

    if (gesture === 'swipe') {
      if (isTap) handleTap(event);

      const viewportWidth = viewport.value?.clientWidth ?? 0;
      const threshold = Math.min(96, Math.max(viewportWidth * 0.2, 48));
      const isFlick = elapsed < 280 && Math.abs(dragX.value) > 32;

      if (dragX.value <= -threshold || (isFlick && dragX.value < 0)) showNextImage('swipe');
      else if (dragX.value >= threshold || (isFlick && dragX.value > 0)) showPreviousImage('swipe');

      dragX.value = 0;
    } else if (gesture === 'pan' && isTap) {
      handleTap(event);
    }

    if (activePointers.size === 0) endGesture();
  });

  useEventListener(viewport, 'pointercancel', (event: PointerEvent) => {
    if (!activePointers.has(event.pointerId)) return;

    activePointers.delete(event.pointerId);

    if (gesture === 'pinch' && activePointers.size === 1) {
      rebaselineSinglePointer();
      return;
    }

    if (activePointers.size === 0) {
      dragX.value = 0;
      endGesture();
    }
  });

  useEventListener(
    viewport,
    'wheel',
    (event: WheelEvent) => {
      event.preventDefault();
      zoomAnimated.value = false;
      const origin = pointFromViewportCenter(event.clientX, event.clientY);
      const factor = Math.exp(-event.deltaY * 0.002);
      if (factor > 1) notifyZoomStart('wheel');
      zoomToPoint(scale.value * factor, origin.x, origin.y);
    },
    { passive: false },
  );

  // ── Keyboard (scoped to the dialog, cleaned up automatically) ────────────
  function keyboardZoom(factor: number) {
    zoomAnimated.value = !prefersReducedMotion.value;
    if (factor > 1) notifyZoomStart('keyboard');
    zoomToPoint(scale.value * factor, 0, 0);
  }

  onKeyStroke(
    ['ArrowRight', 'ArrowLeft', 'Home', 'End', '+', '=', '-', '_', '0'],
    (event) => {
      switch (event.key) {
        case 'ArrowRight':
          showNextImage('keyboard');
          break;
        case 'ArrowLeft':
          showPreviousImage('keyboard');
          break;
        case 'Home':
          goToImage(0, 'keyboard');
          break;
        case 'End':
          goToImage(count.value - 1, 'keyboard');
          break;
        case '+':
        case '=':
          keyboardZoom(1.5);
          break;
        case '-':
        case '_':
          keyboardZoom(1 / 1.5);
          break;
        case '0':
          resetZoom(true);
          break;
      }
      event.preventDefault();
    },
    { target: dialog },
  );

  // ── Public API ───────────────────────────────────────────────────────────
  /** Prepare state for opening at a given slide. */
  function openAt(index: number) {
    activeIndex.value = clamp(index, 0, Math.max(count.value - 1, 0));
    resetZoom(false);
    dragX.value = 0;
  }

  /** Reset everything when the dialog closes. */
  function teardown() {
    activePointers.clear();
    gesture = 'none';
    isDragging.value = false;
    dragX.value = 0;
    stopFrameLoop();
    resetZoom(false);
  }

  function slideStyle(index: number) {
    return {
      transform: `translate3d(calc(${(index - activeIndex.value) * 100}% + ${dragX.value}px), 0, 0)`,
    };
  }

  function zoomStyle(index: number) {
    if (index !== activeIndex.value) return undefined;

    return {
      transform: `translate3d(${panX.value}px, ${panY.value}px, 0) scale(${scale.value})`,
    };
  }

  return {
    activeIndex: readonly(activeIndex),
    scale: readonly(scale),
    isDragging: readonly(isDragging),
    zoomAnimated: readonly(zoomAnimated),
    isFirstImage,
    isLastImage,
    goToImage,
    showPreviousImage,
    showNextImage,
    openAt,
    teardown,
    resetZoom,
    slideStyle,
    zoomStyle,
  };
}
