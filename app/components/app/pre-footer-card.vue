<script setup lang="ts">
import type { Link } from '#shared/types/global';

defineProps<{
  image?: string;
  icon?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  link?: Link;
}>();
</script>

<template>
  <div class="color relative rounded-lg overflow-hidden bg-accented p-5 grid border border-t border-muted">
    <div class="relative z-10 self-start">
      <UIcon
        v-if="icon"
        :name="icon"
        class="size-10"
      />
      <p class="text-sm md:text-base">
        {{ eyebrow }}
      </p>
      <h3 class="mt-2 text-xl text-balance leading-5 md:text-3xl sm:leading-8">
        {{ title }}
      </h3>
      <p class="">
        {{ description }}
      </p>
    </div>
    <UButton
      v-if="link"
      :key="link.label"
      :to="link.to"
      size="xl"
      :color="link.color"
      class="self-end z-10 justify-self-end"
      variant="outline"
    >
      {{ link.label }}
    </UButton>
  </div>
</template>

<style scoped></style>
