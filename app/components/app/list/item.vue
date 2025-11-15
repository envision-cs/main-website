<script setup lang="ts">
import { motion } from 'motion-v';

defineProps<{
  index?: number;
  title: string;
  text: string;
  image?: string;
  showNumber?: boolean;
}>();

const { snappy } = useEasings();

const hovered = ref(false);
</script>

<template>
  <div
    class="group site-grid relative
    col-span-full border-t border-accented w-full
      h-96"
    :class="{ show: showNumber }"
    @mouseenter="() => hovered = true"
    @mouseleave="() => hovered = false"
  >
    <div
      v-if="showNumber"
      class="
      number
        self-center justify-end text-left
         text-7xl font-black text-primary-500 leading-[.9]
      min-[700px]:text-right
      "
    >
      0{{ (index ?? 0) + 1 }}
    </div>

    <div class="content flex flex-col col-span-full self-center pl-0 min-[700px]:pl-8">
      <app-typography tag="h3" variant="heading-md">
        {{ title }}
      </app-typography>
      <app-typography tag="p" variant="text-md">
        {{ text }}
      </app-typography>
    </div>
    <AnimatePresence>
      <motion.div
        v-if="hovered"
        :initial="{ scaleY: 0 }"
        :animate="{ scaleY: 1 }"
        :transition="{ duration: 0.6, ease: snappy }"
        class="origin-top"
      >
        <USeparator orientation="vertical" class="divider items-end" />
      </motion.div>
    </AnimatePresence>
    <AnimatePresence>
      <motion.div
        v-if="hovered"
        :key="index"
        :initial="{ x: '100%' }"
        :animate="{
          x: '0%',
        }"
        :transition="{
          duration: 0.5,
          delay: 0.2,
          ease: snappy,
        }"
        :exit="{ opacity: 0, x: '100%' }"
        class="hidden md:block h-96 overflow-hidden image"
      >
        <NuxtImg
          :src="image || '/community.png'"
          class="w-full h-full object-cover"
          fit="cover"
        />
      </motion.div>
    </AnimatePresence>
  </div>
</template>

<style scoped>
.site-grid {
  grid-template-areas: 'c c c c';

  &.show {
    grid-template-areas:
      'a a a a'
      'c c c c';
  }
}

@media (min-width: 700px) {
  .site-grid {
    grid-template-areas: 'c c c c c c c c c c c c ';

    &.show {
      grid-template-areas: 'a a a a b c c c c c c c ';
    }
  }
}

@media (min-width: 1024px) {
  .site-grid {
    gap: 0;
    grid-template-areas: 'c c c c c c c c c c c c c b i i i i i i i i i i';

    &.show {
      grid-template-areas: 'a a a c c c c c c c c c c b i i i i i i i i i i';
    }
  }
}

.number {
  grid-area: a;
}

.content {
  grid-area: c;
}

.divider {
  grid-area: b;
}

.image {
  grid-area: i;
}
</style>
