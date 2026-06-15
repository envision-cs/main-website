<script setup>defineProps({
  canScrollPrevious: Boolean,
  canScrollNext: Boolean,
});
defineEmits(['previous', 'next']);
</script>

<template>
  <nav class="paddle-nav" aria-label="Gallery navigation">
    <MButton
      class="nav-arrow"
      :disabled="!canScrollPrevious"
      aria-label="Previous item"
      icon-only
      @click="$emit('previous')"
    >
      <template #icon>
        <svg viewBox="0 0 36 36">
          <path
            d="M20 25a1.5 1.5 0 0 1-1.06-.44l-5.5-5.5a1.5 1.5 0 0 1 0-2.12l5.5-5.5a1.5 1.5 0 1 1 2.12 2.12L16.12 18l4.44 4.44a1.5 1.5 0 0 1-1.06 2.56z"
          />
        </svg>
      </template>
    </MButton>
    <MButton
      class="nav-arrow"
      :disabled="!canScrollNext"
      aria-label="Next item"
      icon-only
      @click="$emit('next')"
    >
      <template #icon>
        <svg viewBox="0 0 36 36">
          <path
            d="M22.56 16.94l-5.51-5.5a1.5 1.5 0 0 0-2.12 2.12l4.44 4.44-4.44 4.44a1.5 1.5 0 1 0 2.12 2.12l5.51-5.5a1.5 1.5 0 0 0 0-2.12z"
          />
        </svg>
      </template>
    </MButton>
  </nav>
</template>

<style scoped>
.paddle-nav {
  top: 50%;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  padding: 0 20px;
}

.nav-arrow {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
}

svg {
  width: 20px;
  height: 20px;
  fill: #1d1d1f;
}
</style>
