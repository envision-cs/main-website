<script setup lang="ts">
import type { Link } from '#shared/types/global';

type Images = {
  img: string;
  alt: string;
};

const { images = [] } = defineProps<{
  eyebrow?: string;
  title: string;
  description?: string;
  links?: Link[];
  images?: Images[];
}>();

const hasImages = images && images?.length > 0;
const multipleImages = images && images?.length > 1;

const partialImage = ref('col-span-full min-[650px]:col-span-full  lg:col-span-16 row-span-3 w-full h-full');
// const fullImage = ref('col-span-full w-full h-full aspect-[13/8] object-cover');

// Parallax (single image only)
const bannerRef = ref<HTMLElement | null>(null);
const parallaxY = ref(0);

onMounted(() => {
  if (multipleImages)
    return;
  const onScroll = () => {
    if (!bannerRef.value)
      return;
    const rect = bannerRef.value.getBoundingClientRect();
    // Translate proportionally to how far the banner is from the top
    const translate = -rect.top * 0.90; // tweak intensity here
    // Clamp to avoid excessive movement
    parallaxY.value = Math.max(-80, Math.min(80, translate));
  };
  const onResize = () => onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onResize);
  // Initial position
  onScroll();
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll as EventListener);
    window.removeEventListener('resize', onResize);
  });
});
</script>

<template>
  <section id="cta" class="grid gap-22">
    <div v-if="hasImages" class="site-grid w-full">
      <!-- Multiple images: keep original layout -->
      <template v-if="multipleImages">
        <NuxtImg
          :src="images[0]?.img"
          :alt="images[0]?.alt"
          height="700"
          width="900"
          :class="partialImage"
          fit="cover"
        />
        <NuxtImg
          :src="images[1]?.img"
          :alt="images[1]?.alt"
          height="400"
          width="300"
          class="block lg:row-span-2 min-[650px]:hidden lg:block w-full h-full lg:col-start-17 col-span-full lg:-col-end-1"
          fit="cover"
        />
      </template>

      <!-- Single image: parallax wrapper -->
      <div
        v-else
        ref="bannerRef"
        class="col-span-full w-full h-full aspect-[13/6] overflow-hidden relative"
      >
        <NuxtImg
          :src="images[0]?.img"
          :alt="images[0]?.alt"
          height="700"
          width="900"
          class="absolute inset-0 w-full h-full object-cover will-change-transform"
          fit="cover"
          :style="{ transform: `translateY(${parallaxY}px)` }"
        />
      </div>
    </div>
    <div class="site-grid site-max">
      <h2
        class="text-3xl sm:text-5xl col-span-full min-[650px]:col-start-1 min-[650px]:col-end-7  lg:col-end-14 text-balance"
      >
        {{ title }}
      </h2>
      <p
        v-if="description"
        class="text-base max-w-3xl col-span-full min-[650px]:col-start-8 min-[650px]:col-end-13 lg:col-start-15 lg:col-end-24"
      >
        {{ description }}
      </p>

      <div v-else class="col-span-full min-[650px]:col-start-8 min-[650px]:col-end-13 lg:col-start-15 lg:col-end-24">
        <slot />
      </div>
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
