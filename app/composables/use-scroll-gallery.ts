export function useScrollGallery(
  containerRef: Ref<HTMLElement | null>,
  itemsRef: Ref<HTMLElement[]>,
) {
  const currentIndex = ref(0);
  const itemWidth = ref(0);
  const visibleItems = ref(0);

  const { width: containerWidth } = useElementSize(containerRef);

  const calculateDimensions = () => {
    const firstItem = containerRef.value?.querySelector<HTMLElement>(".gallery-item");
    if (!firstItem) return;

    const cardSet = containerRef.value?.querySelector<HTMLElement>(".card-set");
    if (!cardSet) return;

    const gap = Number.parseFloat(window.getComputedStyle(cardSet).gap) || 20;

    itemWidth.value = firstItem.offsetWidth + gap;
    visibleItems.value = Math.floor(containerWidth.value / itemWidth.value);
  };

  const maxIndex = computed(() => Math.max(0, itemsRef.value.length - visibleItems.value));
  const canScrollPrevious = computed(() => currentIndex.value > 0);
  const canScrollNext = computed(() => currentIndex.value < maxIndex.value);

  const scrollToIndex = (index: number) => {
    const scrollPosition = index * itemWidth.value;
    containerRef.value?.scrollTo({ left: scrollPosition, behavior: "smooth" });
  };

  const scrollPrevious = () => {
    if (!canScrollPrevious.value) return;
    currentIndex.value = Math.max(0, currentIndex.value - 1);
    scrollToIndex(currentIndex.value);
  };

  const scrollNext = () => {
    if (!canScrollNext.value) return;
    currentIndex.value = Math.min(maxIndex.value, currentIndex.value + 1);
    scrollToIndex(currentIndex.value);
  };

  const updateCurrentIndex = () => {
    if (!containerRef.value) return;
    currentIndex.value = Math.round(containerRef.value.scrollLeft / itemWidth.value);
  };

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") scrollPrevious();
    else if (event.key === "ArrowRight") scrollNext();
  };

  onMounted(() => {
    itemsRef.value = Array.from(containerRef.value?.querySelectorAll(".gallery-item") || []);
    calculateDimensions();
  });

  useEventListener(containerRef, "scroll", updateCurrentIndex);
  useEventListener(window, "resize", calculateDimensions);

  return {
    currentIndex,
    canScrollPrevious,
    canScrollNext,
    scrollPrevious,
    scrollNext,
    handleKeydown,
  };
}
