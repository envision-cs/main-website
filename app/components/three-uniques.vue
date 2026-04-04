<script setup lang="ts">
import { animate, scroll } from "motion-v";

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

const imgGroupContainer = ref();

onMounted(() => {
  const items = document.querySelectorAll(".unique");

  scroll(
    animate(".img-group", {
      transform: ["none", `translateX(-${items.length - 1}00vw)`],
    }),
    {
      target: imgGroupContainer.value,
    },
  );
});
</script>

<template>
  <section class="wrapper site-grid">
    <div id="gallery">
      <div ref="imgGroupContainer" class="img-group-container">
        <div class="track">
          <NuxtImg
            src="https://ik.imagekit.io/pnixsw7lg/main-website/usl-super-league-01.jpg?updatedAt=1772192228801"
            provider="imagekit"
            fit="cover"
            class="background"
          />
          <ul ref="scope" class="img-group">
            <li class="unique">
              <div class="content-wrapper">
                <app-typography tag="h2" variant="heading-huge" bold="true">
                  Our Three Uniques
                </app-typography>
                <app-typography tag="p">
                  At Envision, every decision we make is guided by a clear philosophy—three core
                  principles that define how we work, why we work, and the impact we strive to
                  create. These “Three Uniques” are more than values; they are the driving force
                  behind our approach, shaping every project, partnership, and interaction
                </app-typography>
              </div>
            </li>
            <li v-for="p in process" :key="p.id" class="unique">
              <div class="content">
                <app-typography tag="h3" variant="heading-lg" class="title text-semibold">
                  {{ p.title }}
                </app-typography>
                <app-typography tag="p" variant="text-lg">{{ p.description }}</app-typography>
              </div>
              <NuxtImg :src="p.image" provider="imagekit" fit="cover" class="image" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  display: grid;
  grid-column: 1/-1;
  grid-template-columns: subgrid;
  gap: calc(var(--spacing) * 8);
  position: relative;
  overflow: clip;
}

#gallery {
  display: grid;
  grid-column: 1/-1;
  grid-row: 1/-1;
  anchor-name: --gallery;
  position: relative;
  overflow: clip;

  .background {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
    opacity: 0.1;
    filter: grayscale(1);
    top: 0;
  }
}

.content-wrapper {
  grid-column: 1/-1;
  grid-row: 1/-1;
  flex-direction: column;
  margin-top: calc(var(--spacing) * 8);
  margin-left: calc(var(--spacing) * 8);
  gap: calc(var(--spacing) * 2);
  place-self: center;
}

.img-group-container {
  height: 270vh;
  position: relative;

  .track {
    padding-top: 2%;
    padding-bottom: 2%;
    position: sticky;
    top: 0;
    overflow: hidden;
    height: fit-content;
  }
}

.img-group {
  display: flex;
}

.uniques-wrapper {
  display: grid;
  gap: calc(var(--spacing) * 4);
  grid-column: 1/-1;
  grid-template-columns: subgrid;
}

.unique {
  display: grid;
  width: 100vw;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  overflow: hidden;

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

    h3 {
      max-width: 20ch;
      text-wrap: balance;
    }

    p {
      max-width: 65ch;
      text-wrap: balance;
    }
  }

  .image {
    grid-column: 1/-1;
    grid-row: 1/-1;
    height: 75vh;
    object-fit: cover;
    width: 100%;
    filter: grayscale();
    mix-blend-mode: multiply;
  }
}

li:nth-child(1) {
  height: auto;
  place-content: center;
}

li:nth-child(2) {
  background-color: var(--color-envision-blue-600);
}

li:nth-child(3) {
  background-color: var(--color-envision-green-500);
}

li:nth-child(4) {
  background-color: var(--color-envision-gray-700);
}
</style>
