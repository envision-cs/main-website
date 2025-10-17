<script setup lang="ts">
import { motion } from 'motion-v';

const { images = [] } = defineProps<{
  eyebrow?: string;
  title: string;
  description?: string;
  links?: Link[];
  images?: Images[];
  flip?: boolean;
}>();

const { gentle } = useEasings();

type Images = {
  img: string;
  alt: string;
};

const hasImages = images && images?.length > 0;
</script>

<template>
  <section
    id="cta"
    class="grid gap-10"
    :class="{
      'gap-y-0': !hasImages,
      '': flip,
      'border-muted border-t pt-10': hasImages,
    }"
  >
    <app-banner-images :images="images" />
    <div
      class="site-grid border-muted border-t border-b min-h-0 min-[700px]:min-h-[60lvh]"
      :class="{
        flip,
      }"
    >
      <NuxtImg
        src="/community.jpg"
        :alt="images[1]?.alt"
        class="hidden min-[700px]:block  self-end pb-8 image"
      />
      <motion.div class="divider">
        <USeparator orientation="vertical" class="hidden items-end min-[700px]:flex " />
      </motion.div>
      <div
        class="content flex flex-col justify-normal
        min-[700px]:justify-between h-full"
        :class="{
          'pl-0 min-[700px]:pl-8': !flip,
        }"
      >
        <motion.h2
          :initial="{ opacity: 0, y: 50 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, ease: gentle }"
          :viewport="{ once: true, margin: '0px 0px -25% 0px' }"
          class="
           mb-6 text-2xl pt-8 sm:text-4xl font-semibold text-balance max-w-[20ch]
        "
        >
          {{ title }}
        </motion.h2>
        <motion.p
          v-if="description"
          :initial="{ opacity: 0, y: 50 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{
            duration: 0.9,
            ease: gentle,
          }"
          :viewport="{ once: true, margin: '0px 0px -25% 0px' }"
          class="
          pb-8 text-base max-w-3xl

        "
        >
          {{ description }}
        </motion.p>
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

<style scoped>
.image {
  grid-area: a;
}

.divider {
  grid-area: b;
}

.content {
  grid-area: c;
}
</style>
