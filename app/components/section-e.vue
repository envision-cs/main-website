<script setup lang="ts">
withDefaults(
  defineProps<{
    noPadding?: boolean;
    noPaddingMain?: boolean;
    fill?: boolean;
    bgcolor?: 'light' | 'dark' | 'blue';
  }>(),
  {
    bgcolor: 'light',
  },
);
</script>

<template>
  <section
    class="section-e site-max"
    :class="{
      dark: bgcolor === 'dark',
      light: bgcolor === 'light',
      blue: bgcolor === 'blue',
    }"
  >
    <div class="section-e__col" :class="{ 'h-full': fill }">
      <div
        class="section-e__sticky"
        :class="[noPaddingMain ? 'p-0 top-0' : 'px-4 pt-4 top-8 md:p-8', { 'h-full': fill }]"
      >
        <slot name="header" />
      </div>
    </div>
    <div class="section-e__col section-e__col--body">
      <div class="space-y-4 h-full" :class="noPadding ? 'p-0' : 'px-4 pt-4 md:p-8 pb-8'">
        <slot name="body" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-e {
  --section-rule: color-mix(in oklab, var(--section-color) 14%, transparent);
  --section-mark: color-mix(in oklab, var(--section-color) 60%, transparent);
  --section-rail: var(--accent-color);

  position: relative;
  display: grid;
  padding-inline-start: 6px;
  border-block-start: 1px solid var(--section-rule);
  background-color: var(--section-bg);
  color: var(--section-color);
}

/* Datum rail: the accent line every section hangs from */
.section-e::before {
  content: '';
  position: absolute;
  inset-block: 0;
  inset-inline-start: 0;
  width: 6px;
  background: var(--section-rail);
  transform-origin: top;
}

.section-e__col {
  min-width: 0;
}

/* Header only sticks once the two-column layout exists;
   stacked mobile sections have no room to scroll past it */
.section-e__sticky {
  position: static;
}

@media (min-width: 800px) {
  .section-e__sticky {
    position: sticky;
  }
}

.section-e__col + .section-e__col {
  border-block-start: 1px solid var(--section-rule);
}

@media (min-width: 800px) {
  .section-e {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .section-e__col--body {
    position: relative;
    border-block-start: 0;
    border-inline-start: 1px solid var(--section-rule);
  }

  /* Register mark where the divider meets the top rule */
  .section-e__col--body::before,
  .section-e__col--body::after {
    content: '';
    position: absolute;
    z-index: 1;
    background: var(--section-mark);
    pointer-events: none;
  }

  .section-e__col--body::before {
    inset-block-start: 0;
    inset-inline-start: -1px;
    width: 1px;
    height: 14px;
  }

  .section-e__col--body::after {
    inset-block-start: 0;
    inset-inline-start: calc(-1px - 7px);
    width: 15px;
    height: 1px;
  }
}

@supports (animation-timeline: view()) {
  @media (prefers-reduced-motion: no-preference) {
    .section-e::before {
      animation: section-e-rail-draw linear both;
      animation-timeline: view();
      animation-range: entry 0% entry 80%;
    }
  }
}

@keyframes section-e-rail-draw {
  from {
    transform: scaleY(0);
  }

  to {
    transform: scaleY(1);
  }
}
</style>
