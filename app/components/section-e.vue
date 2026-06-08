<script setup lang="ts">withDefaults(
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
    class="section-a site-max"
    :class="{
      dark: bgcolor === 'dark',
      light: bgcolor === 'light',
      blue: bgcolor === 'blue',
    }"
  >
    <div :class="{ 'h-full': fill }">
      <div
        class="sticky"
        :class="[noPaddingMain ? 'p-0 top-0' : 'px-4 pt-4 top-8 md:p-8', { 'h-full ': fill }]"
      >
        <slot name="header" />
      </div>
    </div>
    <div>
      <div class="space-y-4 h-full" :class="noPadding ? 'p-0' : 'px-4 pt-4 md:p-8 pb-8'">
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
  background-color: var(--section-bg);
  color: var(--section-color);

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
