<script setup lang="ts">
const slides = [
  {
    id: 1,
    eyebrow: "01",
    title: "Be Humbly Confident",
    description:
      "Your gifts, talents, and resources are not only for you or about you. Without believing in something bigger than yourself, you will only seek to serve yourself. Lead with conviction, then back it with service.",
    tone: "--color-envision-blue-600",
  },
  {
    id: 2,
    eyebrow: "02",
    title: "It's Bigger Than You",
    description:
      "We build the company, the project, and the people around us with a bigger purpose in view. Purpose gets clearer when ego gets smaller.",
    tone: "--color-envision-green-500",
  },
  {
    id: 3,
    eyebrow: "03",
    title: "Be the Light",
    description:
      "Being positive should never be based on circumstances, but on an internal belief we choose to carry into every room. Optimism is a discipline, not a mood.",
    tone: "--color-envision-gray-700",
  },
  {
    id: 4,
    eyebrow: "04",
    title: "Be the Solution",
    description:
      "Our success and fulfillment depend on our willingness to seek and help provide solutions with clarity and urgency. Help first, be the easy button, and lead with the kind of clarity that breeds confidence.",
    tone: "--color-envision-blue-800",
  },
  {
    id: 5,
    eyebrow: "05",
    title: "Find a Better Way",
    description:
      "We keep improving the way we work, communicate, and solve problems because good enough is rarely the right stopping point. Improvement is part of the job, not extra credit.",
    tone: "--color-envision-blue-900",
  },
];
</script>

<template>
  <process-slider
    title="Our Core Values"
    body="The way we lead projects is the way we lead people: with clarity, discipline, humility, and a commitment to leave every partnership stronger than we found it."
    background-image="https://ik.imagekit.io/pnixsw7lg/main-website/UT%20MPB%20-%20Pods%20-%20Angle.webp?updatedAt=1771410372115"
    :slides="slides"
  />
</template>
