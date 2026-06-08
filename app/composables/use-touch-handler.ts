export function useTouchHandler(elementRef: Ref<HTMLElement | null>) {
  const startX = ref(0);
  const startY = ref(0);
  const isDragging = ref(false);

  function handleTouchStart(event: TouchEvent) {
    const touch = event.touches[0];
    if (!touch)
      return;

    startX.value = touch.clientX;
    startY.value = touch.clientY;
    isDragging.value = true;
  }

  function handleTouchMove(event: TouchEvent) {
    if (!isDragging.value)
      return;

    const touch = event.touches[0];
    if (!touch)
      return;

    const deltaX = Math.abs(touch.clientX - startX.value);
    const deltaY = Math.abs(touch.clientY - startY.value);

    if (deltaX > deltaY) {
      event.preventDefault();
    }
  }

  function handleTouchEnd() {
    isDragging.value = false;
  }

  onMounted(() => {
    const el = elementRef.value;
    el?.addEventListener('touchstart', handleTouchStart, { passive: true });
    el?.addEventListener('touchmove', handleTouchMove, { passive: false });
    el?.addEventListener('touchend', handleTouchEnd);
  });

  onUnmounted(() => {
    const el = elementRef.value;
    el?.removeEventListener('touchstart', handleTouchStart);
    el?.removeEventListener('touchmove', handleTouchMove);
    el?.removeEventListener('touchend', handleTouchEnd);
  });

  return { isDragging };
}
