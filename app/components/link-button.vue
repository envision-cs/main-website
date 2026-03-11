<script setup lang="ts">
withDefaults(defineProps<{
  to: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary';
}>(), {
  size: 'md',
  variant: 'primary',
});
</script>

<template>
  <NuxtLink
    :to="to"
    class="btn"
    :class="`btn--${variant}`"
  >
    <div class="btn-main" :class="`btn-main--${size}`">
      <span class="btn-text">
        <slot />
      </span>
      <div class="btn-overlay" />
    </div>
  </NuxtLink>
</template>

<style scoped>
.btn {
  --color: #000;

  display: inline-flex;
  white-space: nowrap;
  isolation: isolate;
  overflow: hidden;
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
  transition: all 0.4s var(--ease-base);
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

.btn:hover .btn-main {
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

.btn--secondary:hover .btn-main {
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
  background-color: var(--color);
  border-radius: 0.2em;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: all 0.4s var(--ease-base);
  transition-delay: 10ms;
}

.btn:hover .btn-overlay {
  background-color: var(--color);
  width: 1em;
  top: 50%;
  height: 1em;
  transform: translate(0.5em, -0.5em);
  z-index: 1;
}

.btn--secondary:hover .btn-overlay {
  background-color: var(--ui-secondary);
  width: 1em;
  top: 50%;
  height: 1em;
  transform: translate(0.5em, -0.5em);
  z-index: 1;
}

.btn-text {
  padding-left: 0;
  transition: all 0.4s var(--ease-base);
  font-weight: 600;
  color: #fff;
  z-index: 2;
}

.btn:hover .btn-text {
  padding-left: 1.25em;
  color: var(--color-envision-green-950);
}

.btn--secondary:hover .btn-text {
  color: #fff;
}
</style>
