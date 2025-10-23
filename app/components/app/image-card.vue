<script setup lang="ts">
import { motion } from 'motion-v';

defineProps<{
  image: string;
  alt: string;
  area: string;
  title: string;
  year: string;
  direction?: 'left' | 'right';
}>();

const { base } = useEasings();
</script>

<template>
  <figure class="flex flex-col">
    <motion.div
      :initial="{ x: direction === 'left' ? '-120%' : '120%' }"
      :animate="{ x: 0 }"
      :transition="{ duration: 0.6, easing: base }"
      class="img overflow-hidden inset-0"
    >
      <NuxtImg
        :src="image"
        :alt="alt"
        class="block w-full h-auto will-change-transform"
        height="700"
        width="900"
      />
    </motion.div>
    <figcaption class="flex flex-wrap justify-between">
      <div>
        <p>{{ area }}</p>
        <p class="font-semibold text-xl max-w-[20ch]">
          {{ title }}
        </p>
      </div>
      <p>{{ year }}</p>
    </figcaption>
  </figure>
</template>
