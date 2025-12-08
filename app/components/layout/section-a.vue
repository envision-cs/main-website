<script setup lang="ts">
type Variant = 'small' | 'medium' | 'large'; ;

const { variant = 'medium' } = defineProps<{
  variant?: Variant;
}>();

const VARIANT_CLASSES: Record<Variant, string> = {
  small: 'small',
  medium: 'medium',
  large: 'large',
};

const variantClasses = computed(() => {
  return VARIANT_CLASSES[variant];
});
</script>

<template>
  <section :class="variantClasses">
    <slot />
  </section>
</template>

<style scoped>
:deep(section) {
  display: grid;
  gap: calc(var(--spacing) * 8);

  @media (min-width: 750px) {
    grid-template-columns: 1fr 2fr;
  }
}

.small {
}

.medium {
}

.large {
}
</style>
