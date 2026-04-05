<script setup lang="ts">
interface ProvenProcessSlide {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  tone: string;
}

const slides: ProvenProcessSlide[] = [
  {
    id: 1,
    eyebrow: "01",
    title: "Listen",
    description:
      "Every project begins with thoughtful listening. We take time to understand your vision, goals, and constraints. Through discovery meetings, site reviews, and clear communication, we lay the foundation for a partnership built on trust and alignment.",
    tone: "--color-envision-blue-600",
  },
  {
    id: 2,
    eyebrow: "02",
    title: "Plan",
    description:
      "Before any work begins, we bring certainty to the process. From budget-aligned designs and permitting to early trade coordination and risk mitigation, we focus on eliminating surprises and protecting your timeline from day one.",
    tone: "--color-envision-green-500",
  },
  {
    id: 3,
    eyebrow: "03",
    title: "Execute",
    description:
      "With the plan in place, we deliver with precision. Using tools like Procore, we provide full visibility, weekly updates, and proactive oversight. Our team owns the outcome, communicates clearly, and protects your project through to the final walkthrough.",
    tone: "--color-envision-gray-700",
  },
  {
    id: 4,
    eyebrow: "04",
    title: "Cultivate",
    description:
      "Our work doesn’t end at closeout. We stay engaged with system training, 30-60-90 day check-ins, and a one-year walkthrough. The goal: ensure your space performs, your team is supported, and your trust in us grows long after the build is done.",
    tone: "--color-envision-blue-800",
  },
];
</script>

<template>
  <content-slider
    title="Our Proven Process"
    body="Our proven process brings structure and consistency to every project. We listen, plan, and execute to reduce risk, maintain alignment, and deliver on time, on budget, and with complete transparency."
    :slides="slides"
  />
</template>
