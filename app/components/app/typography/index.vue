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
  <component :is="tag" :class="variantClasses">
    <slot />
  </component>
</template>

<style scoped>
.heading-huge {
  font-size: var(--font-size-huge);
}

.heading-xl {
  font-size: var(--font-size-h1);
}

.heading-lg {
  font-size: var(--font-size-h2);
}

.heading-md {
  font-size: var(--font-size-text-h3);
}

.heading-sm {
  font-size: var(--font-size-h4);
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
