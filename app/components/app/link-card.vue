<script setup lang="ts">
import type { Link } from '~~/types/global';

defineProps<{
  image?: string;
  icon?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  link?: Link;
}>();
</script>

<template>
  <div class="color relative aspect-[3/4] rounded-lg overflow-hidden p-5 flex flex-col">
    <NuxtImg
      :src="image"
      class="absolute inset-0 w-full h-full object-cover -z-1"
      alt="Construction site hero image"
      sizes="sm:100vw md:100vw lg:100vw"
      densities="x1 x2"
      format="webp"
      fit="cover"
    />
    <div>
      <UIcon
        v-if="icon"
        :name="icon"
        class="size-5"
      />
      <p>
        {{ eyebrow }}
      </p>
      <h3 class="mt-2 text-2xl sm:text-3xl font-semibold text-white">
        {{ title }}
      </h3>
      <p>
        {{ description }}
      </p>
    </div>
    <UButton
      v-if="link"
      :key="link.label"
      :to="link.to"
      size="xl"
      :color="link.color"
      class="mt-auto self-end"
      variant="outline"
    >
      {{ link.label }}
    </UButton>
  </div>
</template>

<style scoped>
</style>
