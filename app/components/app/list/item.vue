<script setup lang="ts">
import { motion } from 'motion-v';

defineProps<{
  index: number;
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
    col-span-full gap-4 border-t border-accented w-full
      h-96"
    @mouseenter="() => hovered = true"
    @mouseleave="() => hovered = false"
  >
    <div
      v-if="showNumber"
      class="
        self-center justify-end col-start-3
        col-span-2 text-7xl font-black text-primary-500 leading-[.9]
      "
    >
      0{{ index + 1 }}
    </div>

    <div
      class="
        flex flex-col col-start-1 col-span-full self-center
        min-[650px]:-col-end-1
        lg:col-start-5 lg:col-end-13
      "
      :class="[
        showNumber ? 'min-[650px]:col-start-3 lg:col-start-4' : '',
      ]"
    >
      <h3 class="text-2xl font-semibold">
        {{ title }}
      </h3>
      <p class="text-gray-600 leading-relaxed max-w-[60ch]">
        {{ text }}
      </p>
    </div>
    <AnimatePresence>
      <motion.div
        v-if="hovered"
        :initial="{ height: '0px' }"
        :animate="{ height: 'auto' }"
        :transition="{
          duration: 0.5,
          ease: snappy,
        }"
        class="hidden min-[700px]:block row-1 min-[700px]:col-5 lg:col-14"
      >
        <USeparator orientation="vertical" />
      </motion.div>
    </AnimatePresence>
    <AnimatePresence>
      <!--
      <motion.div
        v-if="hovered"
        :key="index"
        :initial="{ x: '100%' }"
        :animate="{
          x: '0%',
        }"
        :transition="{
          duration: 0.5,
          ease: snappy,
        }"
        :exit="{ opacity: 0, x: '100%' }"
        class="h-96 overflow-hidden col-14 -col-end-1 row-1"
      >
        <NuxtImg
          :src="image || '/community.png'"
          class="w-full h-full object-cover"
          fit="cover"
        />
      </motion.div>
      -->
    </AnimatePresence>
  </div>
</template>

<style scoped></style>
