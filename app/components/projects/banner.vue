<script setup lang="ts">
</script>

<template>
  <section class="banner">
    <h1>
      <slot />
    </h1>
  </section>
</template>

<style scoped>
.banner {
  min-height: 280px;
  margin-top: calc(var(--spacing) * 15);

  @media (min-width: 700px) {
    min-height: 450px;
  }
}

h1 {
  font-size: var(--font-size-huge);
  line-height: 1;
}
</style>
