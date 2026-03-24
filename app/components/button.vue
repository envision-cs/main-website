<script setup lang="ts">
import { Comment, computed, Text, useAttrs, useSlots } from "vue";

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<{
    type?: "button" | "submit" | "reset";
    size?: "sm" | "md" | "lg";
    variant?: "primary" | "secondary" | "outline";
    href?: string;
    to?: string;
    target?: "_self" | "_blank" | "_parent" | "_top";
    rel?: string;
    disabled?: boolean;
    iconOnly?: boolean;
  }>(),
  {
    type: "button",
    size: "md",
    variant: "primary",
    href: undefined,
    to: undefined,
    target: undefined,
    rel: undefined,
    disabled: false,
    iconOnly: false,
  },
);

const attrs = useAttrs();
const slots = useSlots();

const hasLabel = computed(() => {
  const nodes = slots.default?.() ?? [];

  return nodes.some((node) => {
    if (node.type === Comment) return false;
    if (node.type === Text) return String(node.children ?? "").trim().length > 0;

    if (typeof node.children === "string") {
      return node.children.trim().length > 0;
    }

    return true;
  });
});

const hasIcon = computed(() => Boolean(slots.icon));
const isIconOnly = computed(() => props.iconOnly || (hasIcon.value && !hasLabel.value));
const destination = computed(() => props.to ?? props.href);
const isLink = computed(() => Boolean(destination.value));
const isRouterLink = computed(() => Boolean(props.to));
const isDisabledLink = computed(() => isLink.value && props.disabled);
const resolvedRel = computed(() => {
  if (props.rel) return props.rel;
  if (props.target === "_blank") return "noopener noreferrer";
  return undefined;
});

const classes = computed(() => [
  "btn",
  `btn-${props.variant}`,
  `btn-${props.size}`,
  {
    "btn-icon-only": isIconOnly.value,
    "is-disabled": props.disabled,
  },
]);
</script>

<template>
  <span v-if="isDisabledLink" v-bind="attrs" :class="classes" role="link" aria-disabled="true">
    <span v-if="hasLabel" class="btn__label">
      <slot />
    </span>
    <span v-if="hasIcon" class="btn__icon" aria-hidden="true">
      <slot name="icon" />
    </span>
  </span>

  <NuxtLink
    v-else-if="isRouterLink"
    v-bind="attrs"
    :to="to"
    :target="target"
    :rel="resolvedRel"
    :class="classes"
  >
    <span v-if="hasLabel" class="btn__label">
      <slot />
    </span>
    <span v-if="hasIcon" class="btn__icon" aria-hidden="true">
      <slot name="icon" />
    </span>
  </NuxtLink>

  <a
    v-else-if="isLink"
    v-bind="attrs"
    :href="href"
    :target="target"
    :rel="resolvedRel"
    :class="classes"
  >
    <span v-if="hasLabel" class="btn__label">
      <slot />
    </span>
    <span v-if="hasIcon" class="btn__icon" aria-hidden="true">
      <slot name="icon" />
    </span>
  </a>

  <button v-else v-bind="attrs" :type="type" :disabled="disabled" :class="classes">
    <span v-if="hasLabel" class="btn__label">
      <slot />
    </span>
    <span v-if="hasIcon" class="btn__icon" aria-hidden="true">
      <slot name="icon" />
    </span>
  </button>
</template>

<style scoped>
.btn {
  --btn-bg: var(--color-envision-blue-600);
  --btn-border: var(--color-envision-blue-800);
  --btn-text: var(--color-white);
  --btn-frame: var(--color-envision-blue-700);
  --btn-active-bg: var(--color-envision-blue-800);
  --btn-focus-frame: var(--color-envision-green-500);
  --btn-disabled-bg: var(--color-envision-gray-200);
  --btn-disabled-border: var(--color-envision-gray-200);
  --btn-disabled-text: var(--color-envision-gray-500);
  --btn-radius: 1px;
  --btn-frame-radius: 2px;
  --btn-frame-offset: 4px;
  --btn-gap: calc(var(--spacing) * 1);
  --btn-padding-block: calc(var(--spacing) * 2);
  --btn-padding-inline: calc(var(--spacing) * 4);
  --btn-font-size: 1rem;
  --btn-icon-size: 1rem;
  --btn-letter-spacing: 0.02em;

  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--btn-gap);
  padding: var(--btn-padding-block) var(--btn-padding-inline);
  border: 1px solid var(--btn-border);
  border-radius: var(--btn-radius);
  background: var(--btn-bg);
  color: var(--btn-text);
  font-family: "Proxima Nova", sans-serif;
  font-size: var(--btn-font-size);
  font-weight: 400;
  letter-spacing: var(--btn-letter-spacing);
  line-height: 1.2;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  white-space: nowrap;
  cursor: pointer;
  transition:
    background-color 180ms var(--ease-gentle),
    border-color 180ms var(--ease-gentle),
    color 180ms var(--ease-gentle),
    transform 180ms var(--ease-gentle);
}

.btn::after {
  content: "";
  position: absolute;
  inset: calc(var(--btn-frame-offset) * -1);
  border: 2px solid transparent;
  border-radius: var(--btn-frame-radius);
  opacity: 0;
  pointer-events: none;
  transition:
    border-color 180ms var(--ease-gentle),
    opacity 180ms var(--ease-gentle);
}

.btn__label,
.btn__icon {
  position: relative;
  z-index: 1;
}

.btn__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--btn-icon-size);
  height: var(--btn-icon-size);
  flex: 0 0 var(--btn-icon-size);
}

.btn__icon :deep(svg),
.btn__icon :deep(img) {
  width: 100%;
  height: 100%;
  display: block;
}

.btn-sm {
  --btn-padding-block: calc(var(--spacing) * 1);
  --btn-padding-inline: calc(var(--spacing) * 2);
  --btn-font-size: 0.875rem;
  --btn-icon-size: 1rem;
}

.btn-md {
  --btn-padding-block: calc(var(--spacing) * 2);
  --btn-padding-inline: calc(var(--spacing) * 4);
  --btn-font-size: 1rem;
  --btn-icon-size: 1rem;
}

.btn-lg {
  --btn-padding-block: calc(var(--spacing) * 3);
  --btn-padding-inline: calc(var(--spacing) * 6);
  --btn-font-size: 1.125rem;
  --btn-icon-size: 1.125rem;
}

.btn-icon-only {
  --btn-padding-inline: var(--btn-padding-block);
}

.btn-primary {
  --btn-bg: var(--color-envision-blue-600);
  --btn-border: var(--color-envision-blue-800);
  --btn-frame: var(--color-envision-blue-700);
  --btn-active-bg: var(--color-envision-blue-800);
  --btn-focus-frame: var(--color-envision-green-500);
  --btn-text: var(--color-white);
}

.btn-secondary {
  --btn-bg: color-mix(in srgb, var(--color-white) 10%, transparent);
  --btn-border: var(--color-white);
  --btn-frame: var(--color-white);
  --btn-active-bg: color-mix(in srgb, var(--color-white) 20%, transparent);
  --btn-focus-frame: var(--color-envision-green-500);
  --btn-text: var(--color-white);
  backdrop-filter: blur(2px);
}

.btn-outline {
  --btn-bg: var(--color-envision-green-600);
  --btn-border: var(--color-envision-green-800);
  --btn-frame: var(--color-envision-green-500);
  --btn-active-bg: var(--color-envision-green-700);
  --btn-focus-frame: var(--color-envision-green-500);
  --btn-text: var(--color-white);
}

.btn:hover:not(.is-disabled):not(:disabled)::after {
  opacity: 1;
  border-color: var(--btn-frame);
}

.btn:active:not(.is-disabled):not(:disabled) {
  background: var(--btn-active-bg);
  transform: translateY(1px);
}

.btn:active:not(.is-disabled):not(:disabled)::after {
  opacity: 1;
  border-color: var(--btn-frame);
}

.btn:focus-visible {
  outline: none;
}

.btn:focus-visible::after {
  opacity: 1;
  border-color: var(--btn-focus-frame);
}

.btn.is-disabled,
.btn:disabled {
  background: var(--btn-disabled-bg);
  border-color: var(--btn-disabled-border);
  color: var(--btn-disabled-text);
  cursor: not-allowed;
}

.btn.is-disabled::after,
.btn:disabled::after {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .btn,
  .btn::after {
    transition: none;
  }
}
</style>
