<script setup lang="ts">
type ImageItem = { img: string; alt?: string };

const { images = [] } = defineProps<{
  images?: ImageItem[];
}>();

const hasImages = computed(() => images && images.length > 0);
const multipleImages = computed(() => images && images.length > 1);
</script>

<template>
  <div v-if="hasImages" class="site-grid w-full col-start-1">
    <!-- Multiple images: keep original layout -->
    <template v-if="multipleImages">
      <app-image-card
        :image="images[0]?.img as string"
        :alt="images[0]?.alt ?? ''"
        area="aviation"
        title="Building Without the Headaches"
        year="2025"
        direction="left"
        class=" col-span-full row-span-3 w-full h-full pr-0
        min-[700px]:col-start-1 min-[700px]:col-end-17 lg:pr-8"
      />
      <app-image-card
        :image="images[1]?.img as string"
        :alt="images[1]?.alt ?? ''"
        area="aviation"
        direction="right"
        title="Building Without the Headaches"
        year="2025"
        class="block col-span-full
        min-[700px]:hidden
        lg:block w-full h-full lg:col-start-17  lg:col-end-25"
      />
    </template>

    <!-- Single image: simple wrapper -->
    <div v-else class="col-span-full w-full h-full aspect-[13/6] overflow-hidden relative">
      <NuxtImg
        :src="images[0]?.img"
        :alt="images[0]?.alt"
        height="700"
        width="900"
        class=" inset-0 w-full h-full object-cover will-change-transform"
        fit="cover"
      />
    </div>
  </div>
</template>
