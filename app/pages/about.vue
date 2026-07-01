<script setup lang="ts">
import SectionG from '../components/section-g.vue';

const coreValues = [
  {
    id: 1,
    eyebrow: '01',
    label: 'Be Humbly Confident',
    description:
      'Your gifts, talents, and resources are not only for you or about you. Without believing in something bigger than yourself, you will only seek to serve yourself. Lead with conviction, then back it with service.',
  },
  {
    id: 2,
    eyebrow: '02',
    label: "It's Bigger Than You",
    description:
      'We build the company, the project, and the people around us with a bigger purpose in view. Purpose gets clearer when ego gets smaller.',
  },
  {
    id: 3,
    eyebrow: '03',
    label: 'Be the Light',
    description:
      'Being positive should never be based on circumstances, but on an internal belief we choose to carry into every room. Optimism is a discipline, not a mood.',
  },
  {
    id: 4,
    eyebrow: '04',
    label: 'Be the Solution',
    description:
      'Our success and fulfillment depend on our willingness to seek and help provide solutions with clarity and urgency. Help first, be the easy button, and lead with the kind of clarity that breeds confidence.',
  },
  {
    id: 5,
    eyebrow: '05',
    label: 'Find a Better Way',
    description:
      'We keep improving the way we work, communicate, and solve problems because good enough is rarely the right stopping point. Improvement is part of the job, not extra credit.',
  },
];

useSeoMeta({
  title: 'About Envision | Building Legacy & Serving Others Through Construction',
  description:
    "Learn about Envision's mission, core values, and proven process. A faith-informed, people-first construction partner building legacy across Tampa Bay and Central Florida.",
  ogTitle: 'About Envision | Building Legacy & Serving Others Through Construction',
  ogDescription:
    'Our mission, core values, and proven process. A people-first construction partner serving Greater Tampa Bay and Central Florida.',
  ogImage: 'https://ik.imagekit.io/pnixsw7lg/main-website/MeetTheTeam.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'About Envision | Building Legacy & Serving Others Through Construction',
  twitterDescription:
    'Our mission, core values, and proven process. A people-first construction partner serving Greater Tampa Bay and Central Florida.',
  twitterImage: 'https://ik.imagekit.io/pnixsw7lg/main-website/MeetTheTeam.jpg',
});
</script>

<template>
  <div class="mx-auto site-grid">
    <banner-b image="https://ik.imagekit.io/pnixsw7lg/main-website/MeetTheTeam.jpg">
      About Us
    </banner-b>
    <big-quote
      bgcolor="dark"
      eyebrow="Our Mission"
      title="Building Legacy & Serving Others Through Construction."
    />
    <three-uniques />
    <app-parallax
      image="https://ik.imagekit.io/pnixsw7lg/main-website/About_Us_5167d3d018.webp?updatedAt=1780676838187"
      class="col-span-full"
    />
    <SectionG
      eyebrow="Envision"
      title="Our Core Values"
      body="The way we lead projects is the way we lead people: with clarity, discipline, humility, and a commitment to leave every partnership stronger than we found it."
      :items="coreValues"
    />
    <proven-process />
  </div>
</template>

<style scoped>
.item {
  padding-block: calc(var(--spacing) * 4);
  padding-inline: calc(var(--spacing) * 6);

  grid-column: span 4;

  @media (min-width: 700px) {
    padding-block: calc(var(--spacing) * 8);
    padding-inline: calc(var(--spacing) * 12);
    grid-column: span 6;
  }

  @media (min-width: 1024px) {
    grid-column: span 12;
  }
}

.history-copy {
  display: grid;
  gap: calc(var(--spacing) * 4);
  max-width: 70ch;
}
</style>
