<script setup lang="ts">
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
    <core-values />
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
