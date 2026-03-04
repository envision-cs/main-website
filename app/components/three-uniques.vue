<script setup lang="ts">
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// const { data: threeUniques } = await useAsyncData('three-uniques', () => $fetch('/api/threeUniques'), {
//  server: true,
//  lazy: true,
//  default: () => [],
// });
let ctx;
const gallaryRef = useTemplateRef('galleryRef');

onBeforeMount(() => {
  useGSAP().registerPlugin(ScrollTrigger);
});

const process = [
  {
    id: 1,
    title: 'Built on Faith, Driven by Purpose',
    description: 'Our foundation is God, our work is built on integrity, and our mission is to serve with excellence.',
  },
  {
    id: 2,
    title: 'Impact Beyond Construction',
    description: 'We don’t just build—we leave a mark. Every project is an opportunity to create something lasting, from the spaces we shape to the relationships we forge. With heart, craftsmanship, and purpose, we build legacies that elevate communities for generations to come.',
  },
  {
    id: 3,
    title: 'Versatile. Adaptive. Enhanced Approach',
    description: 'No two projects are the same, and neither is our approach. Whether it’s a small renovation or a large-scale build, we move with precision, flexibility, and care—delivering the personal attention of a local partner with the expertise of a national leader.',
  },
];

onMounted(() => {
  if (!gallaryRef.value)
    return;

  ctx = useGSAP().context((self) => {
    const gallery = self?.selector('.gallery')[0];
    const right = self?.selector('.right')[0];

    ScrollTrigger.create({
      trigger: gallery,
      start: 'top top',
      end: 'bottom bottom',
      pin: right,
    });
  }, gallaryRef.value);
});

onUnmounted(() => {
  ctx.revert();
});
</script>

<template>
  <section ref="galleryRef">
    <div class="gallery">
      <div class="left">
        <ul class="desktopContent">
          <li v-for="p in process" :key="p.id">
            <app-typography tag="h3" varient="heading-huge">
              {{ p.title }}
            </app-typography>
            <p>
              {{ p.description }}
            </p>
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="desktopPhotos">
          <NuxtImg
            provider="imagekit"
            src="https://ik.imagekit.io/pnixsw7lg/main-website/20250519_134053.jpg?updatedAt=1771548280364"
            class="image"
          />

          <NuxtImg
            provider="imagekit"
            src="https://ik.imagekit.io/pnixsw7lg/main-website/117812314_10158747995319553_8729798724554644994_o.jpg?updatedAt=1771547653476"
            class="image"
          />

          <NuxtImg
            provider="imagekit"
            src="https://ik.imagekit.io/pnixsw7lg/main-website/USFSP%20Residence%20Hall%20-%20Dusk%20Window%20View%20to%20Locker.jpg?updatedAt=1771547653634"
            class="image"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery {
  display: flex;
}

.left {
  width: 50%;
}

.right {
  height: 100vh;
  width: 50%;
}

.desktopPhotos {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.image {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

li {
  height: 100vh;
  padding: calc(var(--spacing) * 4);
  color: white;
  display: grid;
  place-content: center;

  @media (min-width: 768px) {
    padding-inline: calc(var(--spacing) * 8);
    padding-block: calc(var(--spacing) * 20);
  }
}

li:nth-child(1) {
  background-color: var(--color-envision-blue-600);
}

li:nth-child(2) {
  background-color: var(--color-envision-green-500);
}

li:nth-child(3) {
  background-color: var(--color-envision-gray-700);
}
</style>
