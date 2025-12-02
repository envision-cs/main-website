<script setup lang="ts">

</script>

<template>
  <section class="section-a">
    <div class="border-r border-muted">
      <div class="sticky top-16 px-4 py-8">
        <slot name="sticky" />
      </div>
    </div>
    <div>
      <div class="p-8 space-y-4">
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
    border-right: 1px solid var(--ui-border);
  }

  @media (min-width: 800px) {
    display: grid;
    grid-template-columns: 1fr 1fr;

    div:first-child {
      border-right: 1px solid var(--ui-border);
    }
  }
}
</style>
