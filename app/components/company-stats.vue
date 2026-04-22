<script setup lang="ts">
const slides = [
  {
    id: 1,
    eyebrow: "01",
    title: "2009",
    description: "Established",
    tone: "--color-envision-blue-600",
  },
  {
    id: 2,
    eyebrow: "02",
    title: "$180M+",
    description: "Project Delivery",
    tone: "--color-envision-green-500",
  },
  {
    id: 3,
    eyebrow: "03",
    title: "90%",
    description: "Repeat Clients",
    tone: "--color-envision-gray-700",
  },
  {
    id: 4,
    eyebrow: "04",
    title: "Greater Tampa Bay + Central Florida",
    description: "Regional Coverage",
    tone: "--color-envision-blue-800",
  },
];
</script>

<template>
  <process-slider
    title="Envision by the Numbers"
    body="The company has grown through repeat trust, disciplined delivery, and consistent work across Florida. These numbers give a quick picture of our history, scale, and regional footprint."
    background-image="https://ik.imagekit.io/pnixsw7lg/main-website/UT%20MPB%20-%20Pods%20-%20Angle.webp?updatedAt=1771410372115"
    :slides="slides"
  />
</template>
