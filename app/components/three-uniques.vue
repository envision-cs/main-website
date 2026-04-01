<script setup lang="ts">
import { ScrollTrigger } from "gsap/ScrollTrigger";
let ctx: unknown;
const galleryRef = ref<HTMLElement | null>(null);

const process = [
  {
    id: 1,
    title: "Built on Faith, Driven by Purpose",
    description:
      "Our foundation is God, our work is built on integrity, and our mission is to serve with excellence.",
    image:
      "https://ik.imagekit.io/pnixsw7lg/main-website/20250519_134053.jpg?updatedAt=1771548280364",
    color: "--color-envision-blue-600",
  },
  {
    id: 2,
    title: "Impact Beyond Construction",
    description:
      "We don’t just build—we leave a mark. Every project is an opportunity to create something lasting, from the spaces we shape to the relationships we forge. With heart, craftsmanship, and purpose, we build legacies that elevate communities for generations to come.",
    image:
      "https://ik.imagekit.io/pnixsw7lg/main-website/117812314_10158747995319553_8729798724554644994_o.jpg?updatedAt=1771547653476",
    color: "--color-envision-green-500",
  },
  {
    id: 3,
    title: "Versatile. Adaptive. Enhanced Approach",
    description:
      "No two projects are the same, and neither is our approach. Whether it’s a small renovation or a large-scale build, we move with precision, flexibility, and care—delivering the personal attention of a local partner with the expertise of a national leader.",
    image:
      "https://ik.imagekit.io/pnixsw7lg/main-website/USFSP%20Residence%20Hall%20-%20Dusk%20Window%20View%20to%20Locker.jpg?updatedAt=1771547653634",
    color: "--color-envision-gray-700",
  },
];
</script>

<template>
  <section class="wrapper site-grid">
    <div class="content-wrapper">
      <app-typography tag="h2" variant="heading-lg" bold="true">
        Our<span> Three </span><span class="text-envision-blue-500">Uniques</span>
      </app-typography>
      <app-typography tag="p">
        At Envision, every decision we make is guided by a clear philosophy—three core principles
        that define how we work, why we work, and the impact we strive to create. These<span>
          “Three Uniques”</span
        >
        are more than values; they are the driving force behind our approach, shaping every project,
        partnership, and interaction
      </app-typography>
    </div>
    <ul class="uniques-wrapper">
      <li v-for="p in process" :key="p.id" class="unique">
        <div class="content">
          <app-typography tag="h3" variant="heading-md" class="title text-semibold">
            {{ p.title }}
          </app-typography>
          <p>{{ p.description }}</p>
        </div>
        <NuxtImg :src="p.image" provider="imagekit" fit="cover" class="image" />
      </li>
    </ul>
  </section>
</template>

<style scoped>
section {
  display: grid;
  grid-column: 1/-1;
  grid-template-columns: subgrid;
  gap: calc(var(--spacing) * 8);
  padding-inline: calc(var(--spacing) * 4);
  padding-block: calc(var(--spacing) * 16);
}

.content-wrapper {
  grid-column: 1/-1;
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing) * 2);
}

.uniques-wrapper {
  display: grid;
  gap: calc(var(--spacing) * 4);
  grid-column: 1/-1;
  grid-template-columns: subgrid;
}

.unique {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  overflow: hidden;
  aspect-ratio: 3/4;

  grid-column: 1/-1;

  @media (min-width: 700px) {
    grid-column: span 4;
  }

  @media (min-width: 1024px) {
    grid-column: span 8;
  }

  .content {
    grid-column: 1/-1;
    grid-row: 1/-1;
    z-index: 1;
    color: #fff;

    place-self: end;
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 2);
    padding: calc(var(--spacing) * 4);
  }

  .image {
    grid-column: 1/-1;
    grid-row: 1/-1;
    height: 100%;
    width: 100%;
    filter: grayscale();
    mix-blend-mode: multiply;
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
