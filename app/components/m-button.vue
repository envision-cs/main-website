<script setup lang="ts">
defineOptions({ inheritAttrs: false });
const props = withDefaults(
  defineProps<{
    to?: string;
    type?: 'button' | 'submit' | 'reset';
    variant?: 'primary' | 'secondary' | 'outline' | 'icon';
    size?: 'sm' | 'md' | 'lg';
    disabled?: boolean;
    loading?: boolean;
    iconOnly?: boolean;
    target?: '_self' | '_blank';
    rel?: string;
  }>(),
  {
    type: 'button',
    variant: 'primary',
    size: 'md',
    target: '_self',
    disabled: false,
    loading: false,
    iconOnly: false,
  },
);

const attrs = useAttrs();

const { componentProps, isDisabled, hasIcon, hasLabel, isIconOnly } = useButton(props);

const classes = computed(() => [
  'btn',
  `btn--${props.size}`,
  {
    'is-disabled': isDisabled.value,
    'is-loading': props.loading,
    'btn--icon-only': isIconOnly.value,
  },
]);
</script>

<template>
  <NuxtLink
    v-if="props.to"
    v-bind="{ ...attrs, ...componentProps }"
    :class="classes"
    :data-variant="variant"
  >
    <span v-if="loading" class="btn__loader" aria-hidden="true" />
    <span v-if="hasLabel" class="btn__label">
      <slot />
    </span>
    <span v-if="hasIcon" class="btn__icon">
      <slot name="icon" />
    </span>
  </NuxtLink>

  <button v-else v-bind="{ ...attrs, ...componentProps }" :class="classes" :data-variant="variant">
    <span v-if="loading" class="btn__loader" aria-hidden="true" />
    <span v-if="hasLabel" class="btn__label">
      <slot />
    </span>
    <span v-if="hasIcon" class="btn__icon">
      <slot name="icon" />
    </span>
  </button>
</template>

<style>
/* =========================
   COMPOSITION
========================= */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--btn-gap, 0.5rem);
  font: inherit;
  cursor: pointer;
  text-decoration: none;
  border: none;
}

/* =========================
   BLOCK (core styles)
========================= */

.btn {
  --btn-ease: cubic-bezier(0.4, 0, 0.2, 1);
  --btn-bg: var(--ui-primary);
  --btn-bg-hover: var(--color-envision-blue-600);
  --btn-text: var(--color-white);
  --btn-border: transparent;
  --btn-focus: var(--color-envision-blue-500);

  background-color: var(--btn-bg);
  color: var(--btn-text);
  border: 1px solid var(--btn-border);
  border-radius: 0;
  position: relative;

  transition:
    background-color 180ms var(--btn-ease),
    border-color 180ms var(--btn-ease),
    color 180ms var(--btn-ease),
    transform 180ms var(--btn-ease),
    outline-color 180ms var(--btn-ease),
    outline-offset 180ms var(--btn-ease);
}

.btn:hover {
  background-color: var(--btn-bg-hover);
}

.btn:active {
  transform: translateY(1px);
}

/* =========================
   EXCEPTIONS (variants)
========================= */
.btn[data-variant='primary'] {
  --btn-bg: color-mix(in oklch, var(--color-envision-gray-900) 80%, transparent);
  --btn-bg-hover: color-mix(in oklch, var(--color-envision-gray-900) 62%, var(--color-white) 12%);
  --btn-border: color-mix(in oklch, var(--color-white) 12%, transparent);
  --btn-text: var(--color-white);
}

.btn[data-variant='secondary'] {
  --btn-bg: var(--color-envision-green-600);
  --btn-bg-hover: var(--color-envision-green-700);
  --btn-border: transparent;
  --btn-text: var(--color-white);
}

/* Outline: transparent fill, hairline border, inherits surface ink.
   currentColor adapts — white on the dark hero, dark on light pages. */
.btn[data-variant='outline'] {
  --btn-bg: transparent;
  --btn-text: currentColor;
  --btn-border: color-mix(in oklch, currentColor 28%, transparent);
  --btn-bg-hover: color-mix(in oklch, currentColor 10%, transparent);
}

.btn[data-variant='outline']:hover {
  --btn-border: color-mix(in oklch, currentColor 55%, transparent);
}

/* Icon: transparent fill, white ink, faint hover fill.
   Mirrors .featured-projects__control on the dark hero surface. */
.btn[data-variant='icon'] {
  --btn-bg: transparent;
  --btn-text: var(--color-white);
  --btn-border: transparent;
  --btn-bg-hover: color-mix(in oklch, var(--color-white) 12%, transparent);
}

/* Adjacent icon buttons join with a hairline divider (prev/next pairs) */
.btn[data-variant='icon'] + .btn[data-variant='icon'] {
  border-left: 1px solid color-mix(in oklch, var(--color-white) 12%, transparent);
}

/* =========================
   SIZE
========================= */

.btn--sm {
  min-height: 2.5rem;
  padding: 0 1rem;
  font-size: 0.78rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.btn--md {
  min-height: 3rem;
  padding: 0 1.5rem;
}

.btn--lg {
  min-height: 3.5rem;
  padding: 0 2rem;
}

/* =========================
   UTILITIES (state)
========================= */

.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}

.is-loading {
  cursor: progress;
}

/* =========================
   ELEMENTS
========================= */

.btn__icon {
  display: inline-flex;
}

.btn__icon svg {
  display: block;
}

.btn__label {
  white-space: nowrap;
  line-height: 1;
}

.btn--icon-only {
  padding: 0.5rem;
}

.btn--sm.btn--icon-only {
  inline-size: 2rem;
  block-size: 2rem;
}

.btn--md.btn--icon-only {
  inline-size: 2.5rem;
  block-size: 2.5rem;
}

.btn--lg.btn--icon-only {
  inline-size: 3rem;
  block-size: 3rem;
}

/* =========================
   ACCESSIBILITY
========================= */

.btn:focus-visible {
  outline: 3px solid var(--btn-focus, var(--color-envision-blue-500));
  outline-offset: -3px;
}
</style>
