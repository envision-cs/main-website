<script setup lang="ts">
type Link = {
  to: string;
  label: string;
  variant?: string;
  color?: 'primary' | 'neutral';
};

defineProps<{
  eyebrow?: string;
  title: string;
  description?: string;
  links?: Link[];
}>();
</script>

<template>
  <section :aria-labelledby="title" class="py-12 sm:py-16">
    <UContainer>
      <div class="flex items-left md:items-center flex-col md:flex-row justify-between">
        <div class="max-w-3xl">
          <p class="text-base font-semibold text-primary">
            {{ eyebrow }}
          </p>
          <h2 class="mt-2 text-2xl sm:text-3xl font-semibold text-balance">
            {{ title }}
          </h2>
          <p class="text-base md:text-lg text-muted max-w-3xl">
            {{ description }}
          </p>
        </div>
        <div
          class="mt-auto"
        >
          <UButton
            v-for="link in links"
            :key="link.label"
            :to="link.to"
            size="xl"
            :color="link.color"
          >
            Get in Touch
          </UButton>
        </div>
      </div>
      <slot />
    </UContainer>
  </section>
</template>
