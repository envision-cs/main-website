<script setup lang="ts">
import type { Link } from '#shared/types/global';

type Images = {
  img: string;
  alt: string;
};

const { images } = defineProps<{
  eyebrow: string;
  title: string;
  description: string;
  links?: Link[];
  images?: Images[];
}>();

const hasImages = images && images?.length > 0;
const multipleImages = images && images?.length > 1;

const partialImage = ref('col-span-full min-[650px]:col-span-full lg:col-span-12 lg:col-span-17 row-span-3 w-full h-full');
const fullImage = ref('col-span-full w-full h-full aspect-video object-cover');
</script>

<template>
  <section id="cta" class="flex flex-col gap-8">
    <div class="site-grid w-full">
      <NuxtImg
        v-if="hasImages"
        :src="images[0]?.img"
        :alt="images[0]?.alt"
        height="700"
        width="900"
        :class="[multipleImages ? partialImage : fullImage]"
        fit="cover"
      />
      <NuxtImg
        v-if="hasImages && multipleImages"
        :src="images[1]?.img"
        :alt="images[1]?.alt"
        height="400"
        width="300"
        class="block  lg:row-span-2 min-[650px]:hidden lg:block w-full h-full lg:col-start-19 col-span-full lg:col-span-6"
        fit="cover"
      />
    </div>
    <div class="site-grid">
      <h2
        class="text-3xl sm:text-5xl col-span-full min-[650px]:col-start-1 min-[650px]:col-end-7 lg:col-start-2 lg:col-end-14 text-balance"
      >
        {{ title }}
      </h2>
      <p
        class="text-base max-w-3xl col-span-full min-[650px]:col-start-8 min-[650px]:col-end-13 lg:col-start-15 lg:col-end-24"
      >
        {{ description }}
      </p>
      <div v-if="links && links?.length > 3" class="flex flex-col sm:flex-row mt-2 gap-2 justify-start">
        <UButton
          v-for="link in links"
          :key="link.label"
          size="xl"
          :variant="link.variant"
          :to="link.to"
          :color="link.color"
          class=""
        >
          {{ link.label }}
        </UButton>
      </div>
    </div>
  </section>
</template>
