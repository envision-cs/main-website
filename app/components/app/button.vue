<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    href?: string;
    to?: string;
    type?: 'button' | 'submit' | 'reset';
    size?: 'sm' | 'md' | 'lg';
    variant?: 'base' | 'outline' | 'secondary' | 'solid' | 'ghost' | 'soft' | 'link';
    fill?: 'primary' | 'secondary';
    color?: 'primary' | 'secondary' | 'white' | 'neutral';
    icon?: string;
    disabled?: boolean;
    ariaLabel?: string;
    target?: '_self' | '_blank' | '_parent' | '_top';
    rel?: string;
    block?: boolean;
  }>(),
  {
    type: 'button',
    size: 'md',
    variant: 'base',
    fill: 'primary',
    color: undefined,
    icon: undefined,
    disabled: false,
    ariaLabel: undefined,
    target: undefined,
    rel: undefined,
    block: false,
  },
);

const destination = computed(() => props.to ?? props.href);
const isLink = computed(() => Boolean(destination.value));
const isDisabledLink = computed(() => isLink.value && props.disabled);

const resolvedFill = computed(() => {
  if (props.color === 'secondary')
    return 'secondary';
  if (props.color === 'primary')
    return 'primary';
  return props.fill;
});

const resolvedVariant = computed(() => {
  if (props.color === 'white')
    return 'outline';
  if (props.variant === 'solid')
    return 'base';
  if (props.variant === 'link')
    return 'ghost';
  return props.variant;
});

const classes = computed(() => [
  'app-btn',
  `app-btn--size-${props.size}`,
  `app-btn--variant-${resolvedVariant.value}`,
  `app-btn--fill-${resolvedFill.value}`,
  { 'app-btn--legacy-white': props.color === 'white' },
  { 'app-btn--block': props.block, 'is-disabled': props.disabled },
]);

const computedRel = computed(() => {
  if (props.rel)
    return props.rel;
  return props.target === '_blank' ? 'noopener noreferrer' : undefined;
});
</script>

<template>
  <span
    v-if="isDisabledLink"
    :class="classes"
    role="link"
    aria-disabled="true"
    :aria-label="ariaLabel"
  >
    <UIcon
      v-if="icon"
      :name="icon"
      class="app-btn__icon"
      aria-hidden="true"
    />
    <span class="app-btn__label">
      <slot />
    </span>
  </span>

  <NuxtLink
    v-else-if="isLink"
    :to="destination"
    :target="target"
    :rel="computedRel"
    :class="classes"
    :aria-label="ariaLabel"
  >
    <UIcon
      v-if="icon"
      :name="icon"
      class="app-btn__icon"
      aria-hidden="true"
    />
    <span class="app-btn__label">
      <slot />
    </span>
  </NuxtLink>

  <button
    v-else
    :type="type"
    :disabled="disabled"
    :class="classes"
    :aria-label="ariaLabel"
  >
    <UIcon
      v-if="icon"
      :name="icon"
      class="app-btn__icon"
      aria-hidden="true"
    />
    <span class="app-btn__label">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.app-btn {
  --btn-bg: #fff;
  --btn-text: #111;
  --btn-border: #111;
  --btn-outline: var(--btn-border);
  --btn-fill: var(--ui-primary);
  --btn-hover-text: #fff;
  --btn-focus: var(--btn-fill);

  position: relative;
  isolation: isolate;
  overflow: hidden;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  border: 1px solid var(--btn-outline);
  border-radius: 0;
  background-color: var(--btn-bg);
  color: var(--btn-text);
  text-decoration: none;
  font: inherit;
  font-weight: 600;
  letter-spacing: 0.02em;
  line-height: 1.2;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;

  transition:
    color 220ms ease,
    border-color 220ms ease,
    background-color 220ms ease,
    transform 120ms ease;
}

.app-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background: var(--btn-fill);
  transform-origin: bottom center;
  transform: scaleY(0);
  transition: transform 260ms ease;
}

.app-btn__label {
  position: relative;
  z-index: 1;
}

.app-btn__icon {
  position: relative;
  z-index: 1;
  width: 1.1em;
  height: 1.1em;
}

.app-btn:hover:not(.is-disabled):not(:disabled)::before {
  transform: scaleY(1);
}

.app-btn:hover:not(.is-disabled):not(:disabled) {
  color: var(--btn-hover-text);
}

.app-btn:active:not(.is-disabled):not(:disabled) {
  transform: translateY(1px);
}

.app-btn:focus-visible {
  outline: 3px solid var(--btn-focus);
  outline-offset: 2px;
}

.app-btn.is-disabled,
.app-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.app-btn--block {
  width: 100%;
}

.app-btn--size-sm {
  min-height: 44px;
  padding: 0.6rem 0.9rem;
  font-size: 0.9rem;
}

.app-btn--size-md {
  min-height: 48px;
  padding: 0.75rem 1.1rem;
  font-size: 1rem;
}

.app-btn--size-lg {
  min-height: 52px;
  padding: 0.9rem 1.3rem;
  font-size: 1.05rem;
}

.app-btn--fill-primary {
  --btn-fill: var(--ui-primary);
  --btn-hover-text: #fff;
}

.app-btn--fill-secondary {
  --btn-fill: var(--ui-secondary);
}

.app-btn--variant-base {
  --btn-bg: #fff;
  --btn-text: #111;
  --btn-border: #111;
}

.app-btn--variant-outline {
  --btn-bg: transparent;
  --btn-text: #111;
  --btn-border: #111;
}

.app-btn--variant-ghost {
  --btn-bg: transparent;
  --btn-text: #111;
  --btn-border: transparent;
}

.app-btn--variant-soft {
  --btn-bg: color-mix(in srgb, var(--btn-fill) 10%, white);
  --btn-text: #111;
  --btn-border: color-mix(in srgb, var(--btn-fill) 30%, transparent);
}

.app-btn--variant-secondary {
  --btn-bg: var(--ui-secondary);
  --btn-text: #111;
  --btn-border: var(--ui-secondary);
  --btn-hover-text: #fff;
}

.app-btn--legacy-white {
  --btn-bg: transparent;
  --btn-text: #fff;
  --btn-border: #fff;
  --btn-hover-text: #fff;
}

@media (prefers-reduced-motion: reduce) {
  .app-btn,
  .app-btn::before {
    transition: none;
  }
}
</style>
