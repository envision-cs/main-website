<script setup>
const scrollContainer = ref(null);
const items = ref([]);

const {
  canScrollPrevious,
  canScrollNext,
  scrollPrevious,
  scrollNext,
  handleKeydown,
} = useScrollGallery(scrollContainer, items);

useTouchHandler(scrollContainer);
</script>

<template>
  <section class="gallery grid gap-4 py-16">
    <div
      ref="scrollContainer"
      class="scroll-container"
      tabindex="-1"
      @keydown="handleKeydown"
    >
      <ul class="card-set flex gap-5 px-5 list-none">
        <slot />
      </ul>
    </div>

    <app-gallery-paddle-nav
      :can-scroll-previous="canScrollPrevious"
      :can-scroll-next="canScrollNext"
      @previous="scrollPrevious"
      @next="scrollNext"
    />
  </section>
</template>

<style scoped>
.gallery {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.scroll-container {
  overflow-x: auto;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.scroll-container::-webkit-scrollbar {
  display: none;
}

.card-set {
  display: flex;
  gap: calc(var(--spacing) * 5);
  padding: 0 20px;
  list-style: none;
  margin: 0;
}
</style>
