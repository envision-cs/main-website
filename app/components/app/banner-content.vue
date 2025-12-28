<script setup lang="ts">
import { domAnimation, LazyMotion, m } from 'motion-v';

const { gentle } = useEasings();
</script>

<template>
  <div class="content-wrapper">
    <LazyMotion :features="domAnimation">
      <m.div
        :initial="{ opacity: 0, y: 50 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, ease: gentle }"
        :in-view-options="{ once: true, margin: '0px 0px -25% 0px' }"
        class="title mt-[calc(var(--spacing) * 8)]"
      >
        <app-typography
          tag="h2"
          variant="heading-md"
          class="text"
        >
          <slot name="title" />
        </app-typography>
      </m.div>
      <div class="content">
        <m.div
          :initial="{ opacity: 0, y: 50 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, ease: gentle }"
          :in-view-options="{ once: true, margin: '0px 0px -25% 0px' }"
          class="mt-[calc(var(--spacing) * 8)]"
        >
          <app-typography variant="text-lg " class="max-w-[40ch]">
            <slot name="body" />
          </app-typography>
        </m.div>
        <m.div
          :initial="{ opacity: 0, y: 50 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, ease: gentle }"
          :in-view-options="{ once: true, margin: '0px 0px -25% 0px' }"
          class="actions mt-[calc(var(--spacing) * 8)]"
        >
          <slot name="action" />
        </m.div>
      </div>
    </LazyMotion>
  </div>
</template>

<style scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 4);
  background-color: #fff;
  height: 100%;
  justify-content: space-between;

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
</style>
