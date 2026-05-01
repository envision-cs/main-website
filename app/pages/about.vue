<script setup lang="ts"></script>

<template>
  <div class="mx-auto site-grid">
    <banner-b image="about/about03.jpg"> About Us </banner-b>
    <big-quote
      eyebrow="Our Mission"
      title="Building Legacy & Serving Others Through Construction."
    />
    <three-uniques />
    <app-parallax image="/about/about01.jpg" class="col-span-full" />
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
</style>
