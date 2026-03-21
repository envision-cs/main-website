<script setup lang="ts">defineProps<{
  noPadding?: boolean;
  noPaddingMain?: boolean;
  fill: boolean;
}>();
</script>

<template>
  <section class="section-a site-max">
    <div :class="{ 'h-full': fill }">
      <div class="sticky" :class="[noPaddingMain ? 'p-0 top-0' : 'px-4 pt-4 top-8 md:p-8', { 'h-full ': fill }]">
        <slot name="header" />
      </div>
    </div>
    <div>
      <div class=" space-y-4 h-full" :class="noPadding ? 'p-0' : 'px-4 pt-4 md:p-8 pb-8'">
        <slot name="body" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-a {
  display: grid;
  gap: 1px;
  border-top: 1px solid var(--ui-border);

  div:first-child {
    /*border-right: 1px solid var(--ui-border);*/
  }

  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: 1fr 1fr;

    div:first-child {
      /*border-right: 1px solid var(--ui-border);*/
    }
  }
}
</style>
