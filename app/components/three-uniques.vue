<script setup lang="ts">
interface UniqueItem {
  id: number;
  title: string;
  description: string;
  image: string;
  color: string;
  label: string;
}

const process: UniqueItem[] = [
  {
    id: 1,
    label: "01",
    title: "Built on Faith, Driven by Purpose",
    description:
      "Our foundation is God, our work is built on integrity, and our mission is to serve with excellence.",
    image:
      "https://ik.imagekit.io/pnixsw7lg/main-website/20250519_134053.jpg?updatedAt=1771548280364",
    color: "--color-envision-blue-600",
  },
  {
    id: 2,
    label: "02",
    title: "Impact Beyond Construction",
    description:
      "We don’t just build—we leave a mark. Every project is an opportunity to create something lasting, from the spaces we shape to the relationships we forge. With heart, craftsmanship, and purpose, we build legacies that elevate communities for generations to come.",
    image:
      "https://ik.imagekit.io/pnixsw7lg/main-website/117812314_10158747995319553_8729798724554644994_o.jpg?updatedAt=1771547653476",
    color: "--color-envision-green-500",
  },
  {
    id: 3,
    label: "03",
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
  <section class="uniques-section wrapper site-grid">
    <div class="content-wrapper">
      <app-typography tag="h2" variant="heading-lg" bold="true">
        Our<span> Three </span><span class="text-envision-blue-500">Uniques</span>
      </app-typography>
      <app-typography tag="p">
        At Envision, every decision we make is guided by a clear philosophy, three core principles
        that define how we work, why we work, and the impact we strive to create. These
        <span>“Three Uniques”</span> are more than values; they are the driving force behind our
        approach, shaping every project, partnership, and interaction.
      </app-typography>
    </div>

    <div class="uniques-stack" :class="{ 'is-reduced-motion': prefersReducedMotion }">
      <ul class="uniques-wrapper">
        <li
          v-for="(p, index) in process"
          :key="p.id"
          :ref="(el) => setCardRef(el, index)"
          class="unique"
          :style="{ '--unique-tone': `var(${p.color})` }"
        >
          <span class="unique__wash" aria-hidden="true" />
          <div class="unique__content">
            <div class="unique__meta">
              <span class="unique__index">{{ p.label }}</span>
              <span class="unique__line" />
            </div>
            <app-typography tag="h3" variant="heading-md" class="unique__title text-semibold">
              {{ p.title }}
            </app-typography>
            <app-typography tag="p" class="unique__body">
              {{ p.description }}
            </app-typography>
          </div>
          <div class="image">
            <NuxtImg
              :src="p.image"
              provider="imagekit"
              fit="cover"
              sizes="sm:100vw md:100vw lg:1200px"
              class="unique__image"
              alt=""
            />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
section {
  display: grid;
  grid-column: 1/-1;
  grid-template-columns: subgrid;
}

.content-wrapper {
  grid-column: 1/8;
  display: flex;
  flex-direction: column;
  place-content: center;
  padding: calc(var(--spacing) * 8);
  grid-column: 1/-1;

  @media (min-width: 700px) {
    grid-column: 1/6;
  }

  @media (min-width: 1024px) {
    grid-column: 1/8;
  }
}

.uniques-stack {
  display: grid;
  grid-template-columns: subgrid;
  gap: 0;
  grid-column: 1/-1;

  @media (min-width: 700px) {
    grid-column: 7/-1;
  }

  @media (min-width: 1024px) {
    grid-column: 9/-1;
  }
}

ul {
  display: grid;
  grid-template-columns: subgrid;
  gap: 0;
  grid-column: 1/-1;
}

li {
  grid-column: 1/-1;
  width: 100%;
  aspect-ratio: 16/9;
  overflow: hidden;
  isolation: isolate;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  display: grid;

  .unique__content {
    grid-column: 1/-1;
    grid-row: 1/-1;
    z-index: 2;
    color: #fff;

    align-self: end;
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 2);
    padding: calc(var(--spacing) * 4);
  }

  .image {
    grid-column: 1/-1;
    grid-row: 1/-1;
    overflow: hidden;
    mix-blend-mode: multiply;

    img {
      height: 100%;
      width: 100%;
      z-index: 1;
      object-fit: cover;
      filter: grayscale();
    }
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
