<script setup lang="ts">
import { useAnimate, useInView } from 'motion-v';

const props = defineProps<{
  image: string;
  alt: string;
  area: string;
  title: string;
  year: string;
  direction?: 'left' | 'right';
}>();

const { snappy } = useEasings();

const [scope, animate] = useAnimate();
const isInView = useInView(scope, { once: false });

watch(isInView, (inView) => {
  if (inView) {
    animate(
      scope.value,
      {
        transformOrigin: props.direction === 'left' ? 'bottom right' : 'bottom left',
        scale: [0, 1],
        x: props.direction === 'left' ? ['-100%', 0] : ['100%', 0],
      },
      {
        duration: 0.8,
        easing: snappy,
      },
    );
  }
});
</script>

<template>
  <figure class="flex flex-col">
    <NuxtImg
      ref="scope"
      :src="image"
      :alt="alt"
      class="block w-full h-auto will-change-transform"
      height="700"
      width="900"
    />
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
