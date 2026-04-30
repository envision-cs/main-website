<script setup lang="ts">
interface ThreeUniqueSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  tone: string;
}
function resolveTone(tone?: string) {
  return tone ? `var(${tone})` : "var(--color-envision-blue-600)";
}

const slides: ThreeUniqueSlide[] = [
  {
    id: 1,
    title: "Built on Faith, Driven by Purpose",
    description:
      "Our foundation is God, our work is built on integrity, and our mission is to serve with excellence.",
    image:
      "https://ik.imagekit.io/pnixsw7lg/main-website/20250519_134053.jpg?updatedAt=1771548280364",
    tone: "--color-envision-blue-600",
  },
  {
    id: 2,
    title: "Impact Beyond Construction",
    description:
      "We don’t just build—we leave a mark. Every project is an opportunity to create something lasting, from the spaces we shape to the relationships we forge. With heart, craftsmanship, and purpose, we build legacies that elevate communities for generations to come.",
    image:
      "https://ik.imagekit.io/pnixsw7lg/main-website/117812314_10158747995319553_8729798724554644994_o.jpg?updatedAt=1771547653476",
    tone: "--color-envision-green-500",
  },
  {
    id: 3,
    title: "Versatile. Adaptive. Enhanced Approach",
    description:
      "No two projects are the same, and neither is our approach. Whether it’s a small renovation or a large-scale build, we move with precision, flexibility, and care, delivering the personal attention of a local partner with the expertise of a national leader.",
    image:
      "https://ik.imagekit.io/pnixsw7lg/main-website/USFSP%20Residence%20Hall%20-%20Dusk%20Window%20View%20to%20Locker.jpg?updatedAt=1771547653634",
    tone: "--color-envision-gray-700",
  },
];
</script>

<template>
  <section-a title="Our Three Uniques">
    <template #body>
      <app-typography>
        At Envision, every decision we make is guided by a clear philosophy, three core principles
        that define how we work, why we work, and the impact we strive to create. These Three
        Uniques are more than values; they are the driving force behind our approach, shaping every
        project, partnership, and interaction.
      </app-typography>
    </template>
    <ul>
      <li
        v-for="slide in slides"
        :key="slide.id"
        class="slide"
        :style="{
          '--content-slider-tone': resolveTone(slide.tone),
          '--slide-bg-image': slide.image ? `url(${slide.image})` : 'none',
        }"
      >
        <div class="slider-content">
          <app-typography
            tag="h3"
            variant="heading-xl"
            class="content-slider__slide-title text-semibold"
          >
            {{ slide.title }}
          </app-typography>
          <app-typography tag="p" variant="text-lg" class="content-slider__slide-body">
            {{ slide.description }}
          </app-typography>
        </div>
      </li>
    </ul>
  </section-a>
</template>

<style scoped>
section {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: 1fr;
  gap: 0;
  align-items: center;
  overflow: clip;
}

ul {
  position: relative;
  height: calc(75vh * 3);
}

.slide {
  position: sticky;
  top: 0;
  transform-origin: center top;

  background-color: var(--content-slider-tone);
  background-blend-mode: multiply;

  display: grid;
  height: 75vh;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  isolation: isolate;
}

.slider-content,
.slider-image {
  grid-column: 1 / -1;
  grid-row: 1 / -1;
}

.slide::before {
  content: "";
  position: absolute;
  background-image: var(--slide-bg-image);
  inset: 0;
  background-size: cover;
  opacity: 0.8;
  background-position: center;
  filter: grayscale(1);
  mix-blend-mode: multiply;
  z-index: 0;
}

.slider-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale();
  z-index: 1;
  mix-blend-mode: multiply;
}

/* Text layer sits above the image */
.slider-content {
  position: relative;
  z-index: 2;
  padding: calc(var(--spacing) * 6);
  isolation: isolate;
  display: grid;
  place-content: center;
}

.background {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.1;
  filter: grayscale(1);
}
</style>
