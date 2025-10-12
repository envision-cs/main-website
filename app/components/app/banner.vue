<script setup lang="ts">
import { animate, motion, scroll } from 'motion-v';

const { images = [] } = defineProps<{
  eyebrow?: string;
  title: string;
  description?: string;
  links?: Link[];
  images?: Images[];
}>();

const { gentle } = useEasings();

type Images = {
  img: string;
  alt: string;
};

const hasImages = images && images?.length > 0;
const multipleImages = images && images?.length > 1;

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
    ease: gentle,
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
    class="grid gap-10 "
    :class="{
      'gap-y-0': !hasImages,
      'border-muted border-t pt-10': hasImages,
    }"
  >
    <div v-if="hasImages" class="site-grid w-full col-start-1">
      <!-- Multiple images: keep original layout -->
      <template v-if="multipleImages">
        <app-image-card
          :image="images[0]?.img"
          :alt="images[0]?.alt"
          area="aviation"
          title="Building Without the Headaches"
          year="2025"
          direction="left"
          class="px-4 col-span-full row-span-3 w-full h-full
          min-[700px]:col-start-1 min-[700px]:col-end-17 min-[700px]:px-0"
        />
        <app-image-card
          :image="images[0]?.img"
          :alt="images[0]?.alt"
          area="aviation"
          direction="right"
          title="Building Without the Headaches"
          year="2025"
          class="block col-span-full
          min-[700px]:hidden
          lg:block w-full h-full lg:col-start-17  lg:col-end-25"
        />
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
    <div class="site-grid gap-4 border-muted border-t border-b min-h-[60lvh]">
      <NuxtImg
        src="/community.jpg"
        :alt="images[1]?.alt"
        class="hidden min-[700px]:block col-span-4 self-end pb-8"
      />
      <USeparator orientation="vertical" class="hidden min-[700px]:block min-[700px]:col-start-5 lg:col-start-13" />
      <div
        class="
        flex flex-col justify-between h-full col-span-full
        min-[700px]:col-start-6 min-[700px]:col-end-13 min-[700px]:p-0
        lg:col-start-14 lg:col-end-24
        "
      >
        <motion.h2
          :initial="{ opacity: 0, y: 50 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.8, ease: gentle }"
          :viewport="{ once: true, margin: '0px 0px -25% 0px' }"
          class="
           text-2xl pt-8 sm:text-4xl font-semibold text-balance max-w-[20ch]
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
