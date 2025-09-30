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
  <div class="color relative aspect-[3/4] rounded-lg overflow-hidden p-5 bg-primary grid">
    <NuxtImg
      v-if="image"
      :src="image"
      class="absolute inset-0 w-full h-full object-cover z-1"
      alt="Construction site hero image"
      sizes="sm:100vw md:100vw lg:100vw"
      densities="x1 x2"
      format="webp"
      fit="cover"
    />
    <div class="relative z-10 text-white self-end">
      <UIcon
        v-if="icon"
        :name="icon"
        class="size-14"
      />
      <p class="text-sm md:text-base">
        {{ eyebrow }}
      </p>
      <h3 class="mt-2 text-xl text-balance leading-5 sm:text-2xl sm:leading-8 font-semibold">
        {{ title }}
      </h3>
      <p>
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style scoped></style>
