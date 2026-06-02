<script setup lang="ts"></script>

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
      image="https://ik.imagekit.io/pnixsw7lg/main-website/IMG_5432.jpg?tr=c-maintain_ratio,w-1920,h-800"
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
