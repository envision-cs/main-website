<script setup lang="ts">
defineProps<{
  index: number;
  title: string;
  text: string;
  image?: string;
  showNumber?: boolean;
}>();

const hovered = ref(false);
</script>

<template>
  <div
    class="group site-grid relative
    col-span-full gap-4 py-10 border-t border-accented w-full
    hover:bg-envision-green-100/50"
    @mouseenter="() => hovered = true"
    @mouseleave="() => hovered = false"
  >
    <div v-if="showNumber" class="col-span-full sm:col-span-1 text-7xl font-black text-primary-500 leading-[.9]">
      0{{ index + 1 }}
    </div>

    <div
      class="flex flex-col col-start-1 col-span-full min-[650px]:-col-end-1 lg:col-end-14 start-5 lg:col-end-13"
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

    <NuxtImg
      v-if="hovered"
      :src="image || '/community.png'"
      class=" z-10 absolute top-1/2 -translate-y-1/2 col-span-full w-full aspect-video lg:col-start-14"
    />
  </div>
</template>

<style scoped></style>
