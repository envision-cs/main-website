<script setup lang="ts">
defineOptions({ inheritAttrs: false });
const props = withDefaults(
  defineProps<{
    to?: string;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "outline";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    loading?: boolean;
    iconOnly?: boolean;
    target?: "_self" | "_blank";
    rel?: string;
  }>(),
  {
    type: "button",
    variant: "primary",
    size: "md",
    target: "_self",
    disabled: false,
    loading: false,
    iconOnly: false,
  },
);

const attrs = useAttrs();

const { componentProps, isDisabled, hasIcon, hasLabel, isIconOnly } = useButton(props);

const classes = computed(() => [
  "btn",
  `btn--${props.size}`,
  {
    "is-disabled": isDisabled.value,
    "is-loading": props.loading,
    "btn--icon-only": isIconOnly.value,
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
    <span v-if="hasIcon" class="btn__icon">
      <slot name="icon" />
    </span>
    <span v-if="hasLabel" class="btn__label">
      <slot />
    </span>
  </NuxtLink>

  <button v-else v-bind="{ ...attrs, ...componentProps }" :class="classes" :data-variant="variant">
    <span v-if="loading" class="btn__loader" aria-hidden="true" />
    <span v-if="hasIcon" class="btn__icon">
      <slot name="icon" />
    </span>
    <span v-if="hasLabel" class="btn__label">
      <slot />
    </span>
  </button>
</template>

<style>
/* =========================
   COMPOSITION
========================= */
.btn {
  display: inline-block;
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
  --btn-bg: var(--color-primary);
  --btn-text: white;
  --btn-border: transparent;

  background-color: var(--btn-bg);
  color: var(--btn-text);
  border: 1px solid var(--btn-border);
  border-radius: 4px;
  position: relative;
  outline: 1px solid var(--btn-border);
  outline-offset: 0;

  &:hover {
    --btn-border: var(--btn-bg);
    outline-offset: calc(var(--spacing));
  }

  transition:
    background-color 3000ms var(--ease-gentle),
    outline-color 180ms var(--ease-gentle),
    outline-offset 180ms var(--ease-gentle),
    color 180ms var(--ease-gentle),
    transform 180ms var(--ease-gentle);

  &::after {
    content: "";
    background: #fff;
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: opacity 180ms var(--ease-gentle);
  }

  &:hover::after {
    opacity: 0.1;
  }
}

/* =========================
   EXCEPTIONS (variants)
========================= */
.btn[data-variant="primary"] {
  --btn-bg: var(--color-primary);
}

.btn[data-variant="secondary"] {
  --btn-bg: var(--color-secondary-500);
}

.btn[data-variant="outline"] {
  --btn-bg: rgba(255, 255, 255, 0.2);
  --btn-border: currentColor;

  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);

  position: relative;
}

/* =========================
   SIZE
========================= */

.btn--sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.btn--md {
  padding: 0.5rem 1rem;
}

.btn--lg {
  padding: 0.75rem 1.5rem;
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

.btn__icon :deep(svg),
.btn__icon svg {
  display: block;
}

.btn__label {
  white-space: nowrap;
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
  outline: 2px solid var(--color-focus);
  outline-offset: 2px;
}
</style>
