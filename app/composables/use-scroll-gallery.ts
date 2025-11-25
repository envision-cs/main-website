export function useScrollGallery(containerRef, itemsRef) {
  const currentIndex = ref(0);
  const itemWidth = ref(0);
  const visibleItems = ref(0);

  const { width: containerWidth } = useElementSize(containerRef);

  const calculateDimensions = () => {
    const firstItem = containerRef.value?.querySelector('.gallery-item');
    if (!firstItem)
      return;
    const cardSet = containerRef.value?.querySelector('.card-set');
    const gap = Number.parseFloat(window.getComputedStyle(cardSet).gap) || 20;
    itemWidth.value = firstItem.offsetWidth + gap;
    visibleItems.value = Math.floor(containerWidth.value / itemWidth.value);
  };

  const maxIndex = computed(() => Math.max(0, itemsRef.value.length - visibleItems.value));
  const canScrollPrevious = computed(() => currentIndex.value > 0);
  const canScrollNext = computed(() => currentIndex.value < maxIndex.value);

  const scrollToIndex = (index) => {
    const scrollPosition = index * itemWidth.value;
    containerRef.value?.scrollTo({ left: scrollPosition, behavior: 'smooth' });
  };

  const scrollPrevious = () => {
    if (!canScrollPrevious.value)
      return;
    currentIndex.value = Math.max(0, currentIndex.value - 1);
    scrollToIndex(currentIndex.value);
  };

  const scrollNext = () => {
    if (!canScrollNext.value)
      return;
    currentIndex.value = Math.min(maxIndex.value, currentIndex.value + 1);
    scrollToIndex(currentIndex.value);
  };

  const updateCurrentIndex = () => {
    currentIndex.value = Math.round(containerRef.value.scrollLeft / itemWidth.value);
  };

  const handleKeydown = (event) => {
    if (event.key === 'ArrowLeft')
      scrollPrevious();
    else if (event.key === 'ArrowRight')
      scrollNext();
  };

  onMounted(() => {
    itemsRef.value = Array.from(containerRef.value?.querySelectorAll('.gallery-item') || []);
    calculateDimensions();
  });

  useEventListener(containerRef, 'scroll', updateCurrentIndex);
  useEventListener(window, 'resize', calculateDimensions);

  return {
    currentIndex,
    canScrollPrevious,
    canScrollNext,
    scrollPrevious,
    scrollNext,
    handleKeydown,
  };
}
