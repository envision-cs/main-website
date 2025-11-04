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
      <app-typography
        v-else
        tag="p"
        variant="text-md"
      >
        {{ eyebrow }}
      </app-typography>
      <app-typography
        tag="h3"
        variant="heading-lg"
        class="mt-[calc(var(--spacing-2)*2)]"
      >
        {{ title }}
      </app-typography>
      <app-typography tag="p" variant="text-md">
        {{ description }}
      </app-typography>
    </div>
  </div>
</template>

<style scoped></style>
