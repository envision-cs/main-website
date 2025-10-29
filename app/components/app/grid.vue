<template>
  <div class="site-max site-grid">
    <div class="item-grid col-span-full">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.item-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: calc(var(--spacing) * 3);
}
</style>
