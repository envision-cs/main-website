<script setup lang="ts">
defineProps<{
  noPadding?: boolean;
}>();
</script>

<template>
  <section class="section-a site-max">
    <div class="">
      <div class="sticky top-16 px-4 py-16">
        <slot name="header" />
      </div>
    </div>
    <div>
      <div
        class=" space-y-4 h-full"
        :class="noPadding ? 'p-0' : 'p-16'"
      >
        <slot name="body" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-a {
  display: grid;
  gap: 1px;

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
