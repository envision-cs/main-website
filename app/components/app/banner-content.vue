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
          variant="heading-lg"
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
          class="title mt-[calc(var(--spacing) * 8)]"
        >
          <app-typography variant="text-lg">
            <slot name="body" />
          </app-typography>
        </m.div>
      </div>
    </LazyMotion>
  </div>
</template>

<style scoped>
.content-wrapper {
  display: flex;
  flex-direction: column;
  padding-block: calc(var(--spacing) * 10);
  padding-inline: calc(var(--spacing) * 4);
  border: 1px solid var(--ui-border);
  gap: calc(var(--spacing) * 4);
  background-color: #fff;
}

.text {
  text-wrap: balance;
  max-width: 20ch;
}

.content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  p {
    max-width: 60ch;
  }
}
</style>
