<script setup lang="ts">import { ScrollTrigger } from 'gsap/ScrollTrigger';
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
    image: 'https://ik.imagekit.io/pnixsw7lg/main-website/20250519_134053.jpg?updatedAt=1771548280364',
    color: '--color-envision-blue-600',
  },
  {
    id: 2,
    title: 'Impact Beyond Construction',
    description: 'We don’t just build—we leave a mark. Every project is an opportunity to create something lasting, from the spaces we shape to the relationships we forge. With heart, craftsmanship, and purpose, we build legacies that elevate communities for generations to come.',
    image: 'https://ik.imagekit.io/pnixsw7lg/main-website/117812314_10158747995319553_8729798724554644994_o.jpg?updatedAt=1771547653476',
    color: '--color-envision-green-500',
  },
  {
    id: 3,
    title: 'Versatile. Adaptive. Enhanced Approach',
    description: 'No two projects are the same, and neither is our approach. Whether it’s a small renovation or a large-scale build, we move with precision, flexibility, and care—delivering the personal attention of a local partner with the expertise of a national leader.',
    image: 'https://ik.imagekit.io/pnixsw7lg/main-website/USFSP%20Residence%20Hall%20-%20Dusk%20Window%20View%20to%20Locker.jpg?updatedAt=1771547653634',
    color: '--color-envision-gray-700',
  },
];

onMounted(() => {
  if (!gallaryRef.value)
    return;

  ctx = useGSAP().context((self) => {
    const gallery = self?.selector('.gallery')[0];
    const right = self?.selector('.right')[0];
    const images = self?.selector('.item:not(:first-child)') ?? [];

    if (!gallery || !right || !images.length)
      return;

    const gsap = useGSAP();
    const mm = gsap.matchMedia();

    gsap.set(images, { yPercent: 100 });

    mm.add('(min-width: 850px)', () => {
      const desktopAnimation = gsap.to(images, { yPercent: 0, stagger: 0.5, ease: 'none' });

      ScrollTrigger.create({
        trigger: gallery,
        start: 'top top',
        end: 'bottom bottom',
        pin: right,
        animation: desktopAnimation,
        scrub: true,
      });
    });

    mm.add('(max-width: 849px)', () => {
      const mobileAnimation = gsap.to(images, { yPercent: 0, stagger: 0.5, ease: 'none' });

      ScrollTrigger.create({
        trigger: right,
        start: 'top top',
        end: () => `+=${images.length * 100}%`,
        pin: right,
        animation: mobileAnimation,
        scrub: true,
        anticipatePin: 1,
        pinSpacing: true,
        invalidateOnRefresh: true,
      });
    });
  }, gallaryRef.value);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <section ref="galleryRef">
    <div class="gallery">
      <div class="left">
        <div class="desktopContent">
          <div class="title-wrapper">
            <div class="title">
              <app-typography
                tag="h2"
                variant="heading-huge"
                bold="true"
              >
                Our<br><span> Three</span><br> <span class="text-envision-blue-500">Uniques</span>
              </app-typography>
              <app-typography
                v-gsap.splitText.words.mask.whenVisible.reversable.from="{ opacity: 0, stagger: 0.5 }"
                tag="p"
              >
                At Envision, every decision we make is guided by a clear philosophy—three core principles that define
                how
                we work, why we work, and the impact we strive to create. These<span> “Three Uniques”</span> are more
                than
                values; they are the driving force behind our approach, shaping every project, partnership, and
                interaction
              </app-typography>
            </div>
            <NuxtImg
              src="https://ik.imagekit.io/pnixsw7lg/main-website/EH_USFSPDavisHall_Int_21.webp?updatedAt=1771413849873"
              alt=""
              class="overlay-img"
            />
          </div>
        </div>
      </div>
      <div class="right">
        <div class="desktopPhotos">
          <div
            v-for="p in process"
            :key="p.id"
            class="item"
            :style="{ '--overlay-color': `var(${p.color})` }"
          >
            <div class="content">
              <app-typography
                tag="h3"
                variant="heading-lg"
                class="title"
              >
                {{ p.title }}
              </app-typography>
              <p>{{ p.description }}</p>
            </div>
            <NuxtImg
              :src="p.image"
              provider="imagekit"
              fit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.gallery {
  display: flex;
  flex-direction: column;
  min-height: 400vh;
  overflow-x: clip;

  @media (min-width: 850px) {
    flex-direction: row;
    min-height: auto;
  }
}

.left {
  width: 100%;
}

.right {
  height: 100vh;
  width: 100%;

  @media (min-width: 850px) {
    width: 50%;
  }
}

.left {
  @media (min-width: 850px) {
    width: 50%;
  }
}

.desktopPhotos {
  position: relative;
  overflow: hidden;
  height: 100%;
}

.item {
  position: absolute;
  max-height: 100vh;
  height: 100%;
  width: 100%;
  isolation: isolate;
  display: grid;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--overlay-color);
    mix-blend-mode: multiply;
    pointer-events: none;
  }

  img {
    grid-column: 1/-1;
    grid-row: 1/-1;
    height: 100%;
    width: 100%;
    filter: grayscale(1) contrast(0.4);
    object-fit: cover;
  }

  .content {
    max-height: 100vh;
    display: grid;
    place-content: center;
    grid-column: 1/-1;
    grid-row: 1/-1;
    z-index: 1;
    color: #fff;
    text-wrap: balance;
    max-width: 60ch;
    margin-inline: auto;
    text-align: center;
    padding-inline: calc(var(--spacing) * 4);

    h3 {
      font-weight: 600;
      margin-bottom: calc(var(--spacing) * 4);
    }

    p {
      opacity: 0.7;
    }
  }
}

.desktopContent {
  height: 100vh;
  position: relative;

  @media (min-width: 850px) {
    height: 300vh;
  }
}

.title-wrapper {
  position: sticky;
  top: 0;
  overflow: hidden;
  isolation: isolate;

  .title {
    display: grid;
    place-content: center;
    height: 100vh;
    max-width: 600px;
    margin-inline: auto;
    padding-inline: calc(var(--spacing) * 4);
    z-index: 5;

    h2 {
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: calc(var(--spacing) * 4);

      span:first-of-type {
        color: var(--color-envision-blue-500);
      }
    }

    p {
      font-size: 2rem;
      line-height: 1.1;
      text-wrap: wrap;
    }
  }
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

.overlay-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  object-fit: cover;
  mix-blend-mode: color;
  opacity: 0.1;
  filter: grayscale();
  z-index: 2;
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
