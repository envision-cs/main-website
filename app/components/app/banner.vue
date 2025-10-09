<script setup lang="ts">
import { animate, motion, scroll } from 'motion-v';

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

const partialImage = ref(
  'pl-6 col-span-full min-[700px]:col-span-full lg:col-span-16 row-span-3 w-full h-full',
);

const bannerRef = ref<HTMLElement | null>(null);
let anim: Animation | undefined;

onMounted(() => {
  const wrapper = bannerRef.value;
  const target = wrapper?.querySelector('.parallax-img') as HTMLElement | null;
  if (!wrapper || !target)
    return;

  // Move image up->down as the wrapper scrolls through the viewport
  anim = animate(target, { y: [-200, 200] }, {
    // use linear for true scroll mapping; or GSAP power2.out feel:
    easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  });

  if (!anim)
    return;

  scroll(anim, {
    target: wrapper,
    offset: ['start end', 'end start'], // start when banner enters; end when it leaves
  });
});

onBeforeUnmount(() => anim?.cancel());
</script>

<template>
  <section
    id="cta"
    class="grid gap-10 border-muted border-t border-b"
    :class="{ 'gap-y-0': !hasImages }"
  >
    <div v-if="hasImages" class="site-grid w-full col-start-1">
      <!-- Multiple images: keep original layout -->
      <template v-if="multipleImages">
        <figure :class="partialImage">
          <NuxtImg
            :src="images[0]?.img"
            :alt="images[0]?.alt"
            height="700"
            width="900"
            class="w-full"
            fit="cover"
          />
          <figcaption class="flex flex-wrap justify-between">
            <div>
              <p>Building Without the Headaches</p>
              <p class="font-semibold text-xl max-w-[20ch]">
                Building Without the Headaches
              </p>
            </div>
            <p>2025</p>
          </figcaption>
        </figure>
        <figure
          class="block lg:row-span-2 min-[700px]:hidden lg:block w-full h-full lg:col-start-17 col-span-full lg:-col-end-1"
        >
          <NuxtImg
            :src="images[1]?.img"
            :alt="images[1]?.alt"
            height="400"
            width="300"
            class="w-full"
            fit="cover"
          />
          <figcaption class="flex flex-wrap justify-between">
            <div>
              <p>Building Without the Headaches</p>
              <p class="font-semibold text-xl max-w-[20ch]">
                Building Without the Headaches
              </p>
            </div>
            <p>2025</p>
          </figcaption>
        </figure>
      </template>

      <!-- Single image: parallax wrapper (Motion) -->
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
          class="parallax-img absolute inset-0 w-full h-full object-cover will-change-transform"
          fit="cover"
        />
      </div>
    </div>
    <div class="site-grid gap-4">
      <motion.h2
        :initial="{ opacity: 0, y: 50 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }"
        :viewport="{ once: true, margin: '0px 0px -25% 0px' }"
        class="
          pt-10 text-3xl sm:text-5xl col-span-full font-semibold col-start-1 pl-4
          min-[700px]:py-10 min-[700px]:col-start-1 min-[700px]:col-end-6
          lg:col-end-13 text-balance max-w-[20ch]
        "
      >
        {{ title }}
      </motion.h2>

      <USeparator orientation="vertical" class="hidden min-[700px]:block min-[700px]:col-start-7 lg:col-start-15" />
      <motion.p
        v-if="description"
        :initial="{ opacity: 0, y: 50 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.9, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' }"
        :viewport="{ once: true, margin: '0px 0px -25% 0px' }"
        class="
          py-0 pb-10 px-4 h-full self-center text-lg max-w-3xl col-span-full flex items-center
          min-[700px]:col-start-8 min-[700px]:col-end-13 min-[700px]:p-0 min-[700px]:pr-4 min-[700px]:py-10
          lg:col-start-16 lg:col-end-24
        "
      >
        {{ description }}
      </motion.p>

      <div v-else class="col-span-full min-[700px]:col-start-8 min-[700px]:col-end-12 lg:col-start-15 lg:col-end-24">
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
