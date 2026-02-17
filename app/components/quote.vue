<script setup lang="ts">
defineProps<{
  quote: string;
  name?: string;
  title?: string;
}>();
</script>

<template>
  <section class="site-grid bg-white z-10">
    <div class="divider" />
    <div class="quote">
      <app-typography
        variant="heading-md"
        tag="p"
        class="text-balance"
      >
        {{ quote }}
      </app-typography>
      <app-typography

        variant="heading-sm"
        tag="p"
        class="text-balance mt-4"
      >
        {{ name }}
      </app-typography>
      <app-typography
        variant="text-md"
        tag="p"
        class="text-balance"
      >
        {{ title }}
      </app-typography>
    </div>
  </section>
</template>

<style scoped>
section {
  border-bottom: 1px solid var(--ui-border);
}

.divider {
  height: 100%;
  width: 1px;
  background-color: var(--ui-border);
  grid-column: 5;
}

.quote {
  grid-column: 6/-1;
  padding-block: 4rem;
  padding-inline: 1rem;
  position: relative;

  &:before {
    content: '"';
    position: absolute;
    top: 0;
    left: 0;
    line-height: 1;
    font-size: 15em;
    opacity: 0.2;
    transform: translate(-25%, 0%);
  }

  @media (max-width: 768px) {
    grid-column: 1/-1;
    padding-block: 4rem;
  }
}
</style>
