<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset';
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}>(), {
  type: 'button',
  size: 'md',
  variant: 'primary',
  disabled: false,
});
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    class="btn"
    :class="`btn--${variant}`"
  >
    <div class="btn-main" :class="`btn-main--${size}`">
      <span class="btn-text">
        <slot />
      </span>
      <div class="btn-overlay" />
    </div>
  </button>
</template>

<style scoped>
.btn {
  --color: #000;

  display: inline-flex;
  white-space: nowrap;
  isolation: isolate;
  overflow: hidden;
  cursor: pointer;
  border: 0;
  padding: 0;
  background: none;
}

.btn-main {
  display: flex;
  position: relative;
  width: max-content;
  gap: calc(var(--spacing) * 2);
  align-items: center;
  border: 1px solid transparent;
  border-radius: 0.2em;
  text-transform: uppercase;
  background-color: var(--color);
  transition:
    background-color 0.4s var(--ease-base),
    border-color 0.4s var(--ease-base),
    backdrop-filter 0.4s var(--ease-base);
}

.btn-main--sm {
  padding: calc(var(--spacing) * 1.25) calc(var(--spacing) * 2.75);
  font-size: 0.9rem;
}

.btn-main--md {
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 4);
  font-size: 1.2rem;
}

.btn-main--lg {
  padding: calc(var(--spacing) * 2.5) calc(var(--spacing) * 5);
  font-size: 1.35rem;
}

.btn:hover:not(:disabled) .btn-main {
  background-color: #fff;
}

.btn--secondary .btn-main {
  backdrop-filter: blur(1px);
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 1);
}

.btn--secondary .btn-text {
  color: #fff;
}

.btn--secondary:hover:not(:disabled) .btn-main {
  color: #fff;
  backdrop-filter: blur(1px);
  background-color: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 1);
}

.btn--secondary .btn-overlay {
  background-color: transparent;
}

.btn-overlay {
  position: absolute;
  top: 50%;
  left: 0;
  width: 1em;
  height: 1em;
  background-color: var(--color);
  border-radius: 0.2em;
  opacity: 0;
  pointer-events: none;
  transform: translate(0.5em, -50%) scale(0.7);
  transition:
    opacity 0.4s var(--ease-base),
    transform 0.4s var(--ease-base),
    background-color 0.4s var(--ease-base);
  transition-delay: 10ms;
}

.btn:hover:not(:disabled) .btn-overlay {
  background-color: var(--color);
  opacity: 1;
  transform: translate(0.5em, -50%) scale(1);
  z-index: 1;
}

.btn--secondary:hover:not(:disabled) .btn-overlay {
  background-color: var(--ui-secondary);
  opacity: 1;
  transform: translate(0.5em, -50%) scale(1);
  z-index: 1;
}

.btn-text {
  transition:
    transform 0.4s var(--ease-base),
    color 0.4s var(--ease-base);
  font-weight: 600;
  color: #fff;
  z-index: 2;
}

.btn:hover:not(:disabled) .btn-text {
  transform: translateX(1.25em);
  color: var(--color-envision-green-950);
}

.btn--secondary:hover:not(:disabled) .btn-text {
  color: #fff;
}

.btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
</style>
