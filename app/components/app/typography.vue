<script setup lang="ts">
type Variant = 'heading-huge' | 'heading-xl' | 'heading-lg' | 'heading-md' | 'heading-sm' | 'text-xl' | 'text-lg' | 'text-md' | 'text-sm';

const { tag = 'p', variant = 'text-md' } = defineProps<{
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p';
  variant?: Variant;
}>();

const VARIANT_CLASSES: Record<Variant, string> = {
  'heading-huge': 'heading-huge',
  'heading-xl': 'heading-xl',
  'heading-lg': 'heading-lg',
  'heading-md': 'heading-md',
  'heading-sm': 'heading-sm',
  'text-xl': 'text-xl',
  'text-lg': 'text-lg',
  'text-md': 'text-md',
  'text-sm': 'text-sm',
};

const variantClasses = computed(() => {
  return VARIANT_CLASSES[variant];
});
</script>

<template>
  <component
    :is="tag"
    class="base"
    :class="variantClasses"
  >
    <slot />
  </component>
</template>

<style scoped>
.base {
  max-inline-size: 65ch;
}

.heading-huge {
  font-size: var(--font-size-huge);
  font-weight: 600;
  line-height: 1;
}

.heading-xl {
  font-size: var(--font-size-h1);
  line-height: 1;
}

.heading-lg {
  font-size: var(--font-size-h2);
  line-height: 1;
}

.heading-md {
  font-size: var(--font-size-h3);
  line-height: 1;
}

.heading-sm {
  font-size: var(--font-size-h4);
  line-height: 1.1;
}

.text-xl {
  font-size: var(--font-size-text-t1);
}

.text-lg {
  font-size: var(--font-size-text-t2);
}

.text-md {
  font-size: var(--font-size-text-t3);
}

.text-sm {
  font-size: var(--font-size-text-t4);
}
</style>
