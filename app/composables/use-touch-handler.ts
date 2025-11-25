export function useTouchHandler(elementRef) {
  const startX = ref(0);
  const startY = ref(0);
  const isDragging = ref(false);

  function handleTouchStart(event) {
    startX.value = event.touches[0].clientX;
    startY.value = event.touches[0].clientY;
    isDragging.value = true;
  }

  function handleTouchMove(event) {
    if (!isDragging.value)
      return;

    const deltaX = Math.abs(event.touches[0].clientX - startX.value);
    const deltaY = Math.abs(event.touches[0].clientY - startY.value);

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
