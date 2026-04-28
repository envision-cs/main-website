<script setup lang="ts">
interface ThreeUniqueSlide {
  id: number;
  title: string;
  description: string;
  image: string;
  tone: string;
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
  <content-slider
    title="Our Three Uniques"
    body="At Envision, every decision we make is guided by a clear philosophy, three core principles that define how we work, why we work, and the impact we strive to create. These Three Uniques are more than values; they are the driving force behind our approach, shaping every project, partnership, and interaction."
    background-image="https://ik.imagekit.io/pnixsw7lg/main-website/usl-super-league-01.jpg?updatedAt=1772192228801"
    :slides="slides"
  />
</template>
