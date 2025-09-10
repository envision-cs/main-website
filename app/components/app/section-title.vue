<script setup lang="ts">
import type { Link } from '#shared/types/global';

defineProps<{
  eyebrow?: string;
  title: string;
  description?: string;
  links?: Link[];
}>();
</script>

<template>
  <section :aria-labelledby="title" class="">
    <UContainer>
      <div class="flex items-left md:items-center flex-col md:flex-row justify-between">
        <div class="max-w-3xl">
          <p class="text-base font-semibold text-primary">
            {{ eyebrow }}
          </p>
          <h2 class="mt-2 leading-tiny text-3xl sm:text-5xl font-semibold text-balance mb-4">
            {{ title }}
          </h2>
          <p class="text-base text-muted max-w-3xl">
            {{ description }}
          </p>
        </div>
        <div class="mt-auto">
          <UButton
            v-for="link in links"
            :key="link.label"
            :to="link.to"
            size="xl"
            :color="link.color"
          >
            {{ link.label }}
          </UButton>
        </div>
      </div>
      <slot />
    </UContainer>
  </section>
</template>
