<script setup lang="ts">
onMounted(() => {
  const scrollers = document.querySelectorAll(".scroller");
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    addAnimation();
  }

  function addAnimation() {
    scrollers.forEach((scroller) => {
      scroller.setAttribute("data-animated", "true");

      const scrollerInner = scroller.querySelector(".scroller__inner");
      if (!scrollerInner) return;
      const scrollerContent = Array.from(scrollerInner.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scrollerInner.appendChild(duplicatedItem);
      });
    });
  }
});
</script>

<template>
  <div class="scroller">
    <ul class="tag-list scroller__inner">
      <slot />
    </ul>
  </div>
</template>

<style scoped>
.scroller {
  grid-column: 1/-1;
  max-width: 1980px;

  &[data-animated="true"] {
    overflow: hidden;
  }
}

.scroller__inner {
  display: flex;
  gap: calc(var(--spacing) * 4);
}

[data-animated="true"] .scroller__inner {
  width: max-content;
  flex-wrap: nowrap;
  animation: scroll 40s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
}

@keyframes scroll {
  to {
    transform: translate(calc(-50% - 0.5rem));
  }
}
</style>
