<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: "button" | "submit" | "reset";
    size?: "sm" | "md" | "lg";
    variant?: "primary" | "secondary" | "outline";
    disabled?: boolean;
  }>(),
  {
    type: "button",
    size: "md",
    variant: "primary",
    disabled: false,
  },
);
</script>

<template>
  <button
    class="btn"
    :class="{
      'btn-primary': variant === 'primary',
      'btn-secondary': variant === 'secondary',
      'btn-outline': variant === 'outline',
      'btn-sm': size === 'sm',
      'btn-md': size === 'md',
      'btn-lg': size === 'lg',
    }"
  >
    <slot />
  </button>
</template>

<style scoped>
.btn {
  --_btnColor: var(--ui-primary);
  --_btnText: var(--ui-text-inverted);

  font: inherit;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing);

  cursor: pointer;

  padding: calc(var(--spacing) * 2) calc(var(--spacing));
  color: var(--_btnText);

  background-color: var(--_btnColor);
  border: var(--_btnColor);

  outline: 2px solid transparent;
  outline-offset: 0;
  will-change: outline-offset;

  transition:
    background-color 200ms var(--ease-gentle),
    outline-offset 200ms var(--ease-gentle),
    outline-color 200ms var(--ease-gentle),
    transform 200ms var(--ease-gentle);
}

.btn:where(:hover, :focus, :focus-visible) {
  outline-color: var(--_btnColor);
  outline-offset: 0.25em;
}

.btn:active {
  transform: translateY(1px);
}

.btn-lg {
  padding: calc(var(--spacing) * 3) calc(var(--spacing) * 4);
}

.btn-md {
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 3);
}

.btn-sm {
  padding: calc(var(--spacing)) calc(var(--spacing) * 2);
  outline-offset: 0.15em;
}

.btn-primary {
  --_btnColor: var(--color-envision-blue-800);
  --_btnText: var(--color-envision-blue-50);
}

.btn-secondary {
  --_btnColor: var(--color-envision-green-700);
  --_btnText: var(--ui-text-inverted);
}

.btn-outline {
  --_btnColor: rgba(255, 255, 255, 0.2);
  --_btnText: var(--ui-text-inverted);
  filter: blur(10);
  border: 1px solid white;
  outline: 2px solid white;
}
</style>
