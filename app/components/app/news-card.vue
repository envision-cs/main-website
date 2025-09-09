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
  <div class="color rounded-lg overflow-hidden h-full p-5 flex flex-col min-h-[325px]">
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
    <div class="relative z-10 self-end">
      <UIcon
        v-if="icon"
        :name="icon"
        class="size-14"
      />
      <p class="text-sm md:text-base font-semibold">
        {{ eyebrow }}
      </p>
      <h3 class="mt-2 text-xl text-balance leading-7 sm:text-2xl sm:leading-8 ">
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

<style scoped></style>
