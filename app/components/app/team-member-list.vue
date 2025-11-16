<template>
  <div class="members-section ">
    <slot />
  </div>
</template>

<style scoped>
.members-section {
  display: grid;
  grid-column: 1/-1;
  grid-template-columns: 1fr;
  gap: calc(var(--spacing) * 6);
  border-top: 1px solid var(--ui-border);
  padding-top: calc(var(--spacing) * 4);

  @media (min-width: 450px) {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
