<script setup lang="ts">
const rootEl = ref<HTMLElement | null>(null);
const revealNodes = ref<HTMLElement[]>([]);
let observer: IntersectionObserver | null = null;

onMounted(() => {
  revealNodes.value = rootEl.value
    ? Array.from(rootEl.value.querySelectorAll('[data-reveal]'))
    : [];

  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting)
        continue;

      entry.target.classList.add('is-visible');
      observer?.unobserve(entry.target);
    }
  }, {
    root: null,
    rootMargin: '0px 0px -25% 0px',
    threshold: 0.01,
  });

  for (const node of revealNodes.value)
    observer.observe(node);
});

onBeforeUnmount(() => {
  observer?.disconnect();
  observer = null;
});
</script>

<template>
  <div ref="rootEl" class="content-wrapper">
    <div data-reveal class="reveal title mt-[calc(var(--spacing) * 8)]">
      <app-typography
        tag="h2"
        variant="heading-md"
        class="text"
      >
        <slot name="title" />
      </app-typography>
    </div>
    <div class="content">
      <div data-reveal class="reveal mt-[calc(var(--spacing) * 8)] reveal-delay-1">
        <app-typography variant="text-lg" class="max-w-[40ch]">
          <slot name="body" />
        </app-typography>
      </div>
      <div data-reveal class="reveal actions mt-[calc(var(--spacing) * 8)] reveal-delay-2">
        <slot name="action" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 4);
  background-color: #fff;
  height: 100%;
  justify-content: start;

  @media (min-width: 768px) {
  }
}

.text {
  text-wrap: balance;
  max-width: 20ch;
  text-transform: uppercase;
}

.content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: calc(var(--spacing) * 4);

  p {
    max-width: 45ch;
    text-wrap: balance;
  }

  .actions {
    place-self: end;
  }
}

.reveal {
  opacity: 0;
  transform: translateY(50px);
}

.reveal.is-visible {
  animation: slide-in-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--reveal-delay, 0ms);
}

.reveal-delay-1 {
  --reveal-delay: 80ms;
}

.reveal-delay-2 {
  --reveal-delay: 160ms;
}

@keyframes slide-in-up {
  from {
    opacity: 0;
    transform: translateY(50px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
