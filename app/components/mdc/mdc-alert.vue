<template>
  <div class="alert">
    <!-- Slot will render <p> tag around the text -->
    <slot />
  </div>
</template>

<style scoped>
.alert {
  padding: 1rem;
  border-radius: 0.25rem;
  background-color: #f8d7da;
  color: #721c24;
}
</style>
