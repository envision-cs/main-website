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
        <app-typography tag="p" variant="text-md">
          {{ area }}
        </app-typography>
        <app-typography
          tag="h4"
          variant="heading-sm"
          class="max-w-[20ch]"
        >
          {{ title }}
        </app-typography>
      </div>
      <app-typography tag="p" variant="text-md">
        {{ year }}
      </app-typography>
    </figcaption>
  </figure>
</template>
