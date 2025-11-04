<script setup lang="ts">
import { domAnimation, LazyMotion, m } from 'motion-v';

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
    class="grid"
    :class="{
      'gap-y-0': !hasImages,
      '': flip,
      'border-muted border-t': hasImages,
      'pt-10': images.length === 2,
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
      <LazyMotion :features="domAnimation">
        <m.div class="divider">
          <USeparator orientation="vertical" class="hidden items-end min-[700px]:flex " />
        </m.div>
      </LazyMotion>
      <div
        class="content flex flex-col justify-normal
        min-[700px]:justify-between h-full"
        :class="{
          'pl-0 min-[700px]:pl-8': !flip,
        }"
      >
        <LazyMotion :features="domAnimation">
          <m.div
            :initial="{ opacity: 0, y: 50 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :transition="{ duration: 0.8, ease: gentle }"
            :in-view-options="{ once: true, margin: '0px 0px -25% 0px' }"
            class="title mt-[calc(var(--spacing) * 8)]"
          >
            <app-typography tag="h2" variant="heading-xl">
              {{ title }}
            </app-typography>
          </m.div>
          <m.div
            v-if="description"
            :initial="{ opacity: 0, y: 50 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :in-view-options="{ once: true, margin: '0px 0px -25% 0px' }"
            :transition="{
              duration: 0.9,
              ease: gentle,
            }"
            :viewport="{ margin: '0px 0px -25% 0px' }"
            class=" description pb-8 max-w-3xl"
          >
            <app-typography tag="p" variant="text-lg">
              {{ description }}
            </app-typography>
          </m.div>
        </LazyMotion>
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

.title {
  margin-top: calc(var(--spacing) * 8);
}

.description {
  font-size: var(--font-size-text-t1);
}
</style>
