<script setup lang="ts">
import { useSlots } from "vue";

const props = withDefaults(
  defineProps<{
    href?: string;
    to?: string;
    type?: "button" | "submit" | "reset";
    size?: "sm" | "md" | "lg";
    variant?: "base" | "outline" | "secondary" | "solid" | "ghost" | "soft" | "link";
    fill?: "primary" | "secondary";
    color?: "primary" | "secondary" | "white" | "neutral";
    icon?: string;
    disabled?: boolean;
    ariaLabel?: string;
    target?: "_self" | "_blank" | "_parent" | "_top";
    rel?: string;
    block?: boolean;
  }>(),
  {
    type: "button",
    size: "md",
    variant: "base",
    fill: "primary",
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
  if (props.color === "secondary") return "secondary";
  if (props.color === "primary") return "primary";
  return props.fill;
});

const resolvedVariant = computed(() => {
  if (props.color === "white") return "outline";
  if (props.variant === "solid") return "base";
  if (props.variant === "link") return "ghost";
  return props.variant;
});

const slots = useSlots();

// Returns true if the default slot has content
const hasSlot = computed(() => !!slots.default);

const classes = computed(() => [
  "app-btn",
  `app-btn--size-${props.size}`,
  `app-btn--variant-${resolvedVariant.value}`,
  `app-btn--fill-${resolvedFill.value}`,
  { "app-btn--legacy-white": props.color === "white" },
  { "app-btn--block": props.block, "is-disabled": props.disabled },
  { "app-btn--icon-only": !!props.icon && !hasSlot.value },
]);
</script>

<template>
  <span
    v-if="isDisabledLink"
    :class="classes"
    role="link"
    aria-disabled="true"
    :aria-label="ariaLabel"
  >
    <UIcon v-if="icon" :name="icon" class="app-btn__icon" aria-hidden="true" />
    <span v-if="hasSlot" class="app-btn__label">
      <slot />
    </span>
  </span>

  <NuxtLink
    v-else-if="isLink"
    :to="destination"
    :target="target"
    :class="classes"
    :aria-label="ariaLabel"
  >
    <UIcon v-if="icon" :name="icon" class="app-btn__icon" aria-hidden="true" />
    <span v-if="hasSlot" class="app-btn__label">
      <slot />
    </span>
  </NuxtLink>

  <button v-else :type="type" :disabled="disabled" :class="classes" :aria-label="ariaLabel">
    <UIcon v-if="icon" :name="icon" class="app-btn__icon" aria-hidden="true" />
    <span v-if="hasSlot" class="app-btn__label">
      <slot />
    </span>
  </button>
</template>

<style scoped>
.app-btn {
  --btn-bg: var(--ui-primary);
  --btn-text: #fff;
  --btn-border: var(--ui-primary);
  --btn-outline: var(--btn-border);
  --btn-fill: var(--ui-primary);
  --btn-focus: var(--btn-fill);
  --btn-hover-bg: color-mix(in srgb, var(--btn-fill) 88%, black);

  position: relative;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.55rem;

  border: 1px solid var(--btn-outline);
  border-radius: 10px;
  background-color: var(--btn-bg);
  color: var(--btn-text);
  text-decoration: none;
  font: inherit;
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.02em;
  line-height: 1.2;
  white-space: nowrap;
  text-transform: uppercase;
  user-select: none;
  cursor: pointer;

  transition:
    color 180ms ease,
    border-color 180ms ease,
    background-color 180ms ease,
    box-shadow 180ms ease,
    transform 120ms ease;
}

.app-btn__label {
  position: relative;
  transition: transform 180ms ease;
}

.app-btn__icon {
  width: 1rem;
  height: 1rem;
  transition: transform 180ms ease;
}

.app-btn::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 0.7rem;
  width: 0.85rem;
  height: 0.85rem;
  border-radius: 999px;
  background-color: var(--btn-text);
  opacity: 0;
  transform: translateY(-50%) scale(0.7);
  transition:
    opacity 180ms ease,
    transform 180ms ease;
}

.app-btn:hover:not(.is-disabled):not(:disabled) {
  background-color: var(--btn-hover-bg);
  border-color: var(--btn-hover-bg);
  box-shadow: 0 2px 6px rgb(0 0 0 / 18%);
}

.app-btn:hover:not(.is-disabled):not(:disabled)::after {
  opacity: 1;
  transform: translateY(-50%) scale(1);
}

.app-btn:hover:not(.is-disabled):not(:disabled) .app-btn__label,
.app-btn:hover:not(.is-disabled):not(:disabled) .app-btn__icon {
  transform: translateX(0.45rem);
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

.app-btn--icon-only {
  gap: 0;
}

.app-btn--size-sm {
  min-height: 36px;
  padding: 0.45rem 0.9rem;
  font-size: 0.86rem;
}

.app-btn--size-md {
  min-height: 44px;
  padding: 0.65rem 1.15rem;
  font-size: 0.95rem;
}

.app-btn--size-lg {
  min-height: 48px;
  padding: 0.78rem 1.3rem;
  font-size: 1rem;
}

.app-btn--variant-base {
  --btn-bg: var(--btn-fill);
  --btn-text: #fff;
  --btn-border: var(--btn-fill);
  --btn-outline: var(--btn-fill);
}

.app-btn--variant-outline {
  --btn-bg: transparent;
  --btn-text: var(--btn-fill);
  --btn-border: var(--btn-fill);
  --btn-outline: var(--btn-fill);
  --btn-hover-bg: color-mix(in srgb, var(--btn-fill) 12%, white);
}

.app-btn--variant-ghost {
  --btn-bg: transparent;
  --btn-text: var(--btn-fill);
  --btn-border: transparent;
  --btn-outline: transparent;
  --btn-hover-bg: color-mix(in srgb, var(--btn-fill) 12%, white);
}

.app-btn--variant-soft {
  --btn-bg: color-mix(in srgb, var(--btn-fill) 16%, white);
  --btn-text: color-mix(in srgb, var(--btn-fill) 78%, black);
  --btn-border: color-mix(in srgb, var(--btn-fill) 26%, white);
  --btn-outline: var(--btn-border);
  --btn-hover-bg: color-mix(in srgb, var(--btn-fill) 26%, white);
}

.app-btn--variant-secondary {
  --btn-bg: var(--ui-secondary);
  --btn-text: #111;
  --btn-border: var(--ui-secondary);
  --btn-outline: var(--ui-secondary);
  --btn-hover-bg: color-mix(in srgb, var(--ui-secondary) 85%, black);
}

.app-btn--legacy-white {
  --btn-bg: #fff;
  --btn-text: #111;
  --btn-border: #fff;
  --btn-outline: #fff;
  --btn-hover-bg: #f3f3f3;
}

.app-btn--fill-primary {
  --btn-fill: var(--ui-primary);
}

.app-btn--fill-secondary {
  --btn-fill: var(--ui-secondary);
}

@media (prefers-reduced-motion: reduce) {
  .app-btn {
    transition: none;
  }
}
</style>
