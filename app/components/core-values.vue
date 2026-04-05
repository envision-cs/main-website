<script setup lang="ts">
interface CoreValueSlide {
  id: number;
  eyebrow: string;
  title: string;
  description: string;
  quote?: string;
  points?: string[];
  tone: string;
}

const slides: CoreValueSlide[] = [
  {
    id: 1,
    eyebrow: "01",
    title: "Be Humbly Confident",
    description:
      "Your gifts, talents, and resources aren’t only for you or about you. Without believing in something bigger than yourself, you’ll only seek to serve yourself.",
    quote: "Lead with conviction, then back it with service.",
    points: [
      "Always seek to give the advantage",
      "Do it as if it were your own",
      "Great leaders have a servant’s heart",
    ],
    tone: "--color-envision-blue-600",
  },
  {
    id: 2,
    eyebrow: "02",
    title: "It's Bigger Than You",
    description:
      "Your gifts, talents, and resources aren’t only for you or about you. Without believing in something bigger than yourself, you’ll only seek to serve yourself.",
    quote: "Purpose gets clearer when ego gets smaller.",
    points: [
      "Always seek to give the advantage",
      "Do it as if it were your own",
      "Great leaders have a servant’s heart",
    ],
    tone: "--color-envision-green-500",
  },
  {
    id: 3,
    eyebrow: "03",
    title: "Be the Light",
    description:
      "Being positive should never be based on circumstances, but based on an internal belief.",
    quote: "Optimism is a discipline, not a mood.",
    points: ["Optimism", "Always assume positive intent"],
    tone: "--color-envision-gray-700",
  },
  {
    id: 4,
    eyebrow: "04",
    title: "Be the Solution",
    description:
      "Our success and fulfillment depends on our willingness to always seek and help provide solutions.",
    points: [
      "Help first",
      "We are the easy button",
      "We pride ourselves on being the solution",
      "Clarity Breeds Confidence",
    ],
    tone: "--color-envision-blue-800",
  },
  {
    id: 5,
    eyebrow: "05",
    title: "Find a Better Way",
    description: "Impossible is for the unwilling.",
    quote: "Improvement is part of the job, not extra credit.",
    points: [
      "Adapt to change",
      "Impossible is never a fact, it’s a belief",
      "“I get to” vs. “I have to” attitude",
      "Don’t make excuses, make adjustments",
    ],
    tone: "--color-envision-blue-900",
  },
] as const;
</script>

<template>
  <content-slider
    title="Our Core Values"
    body="The way we lead projects is the way we lead people: with clarity, discipline, humility, and a commitment to leave every partnership stronger than we found it."
    background-image="https://ik.imagekit.io/pnixsw7lg/main-website/EH_USFSPDavisHall_Int_21.webp?updatedAt=1771413849873"
    :slides="slides"
  />
</template>
