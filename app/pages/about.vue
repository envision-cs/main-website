<script setup lang="ts"></script>

<template>
  <div class="mx-auto site-grid">
    <banner-b image="about/about03.jpg"> About Us </banner-b>
    <big-quote
      bgcolor="dark"
      eyebrow="Our Mission"
      title="Building Legacy & Serving Others Through Construction."
    />
    <section-a
      bgcolor="light"
      eyebrow="Our History"
      title="Built on faith, integrity, and relationships."
    >
      <div class="history-copy">
        <app-typography>
          Allen is the Managing Director on the Leadership Team for Envision, an MBE-certified
          construction management firm.
        </app-typography>

        <app-typography>
          In 2009, Allen and his son established Envision on the principles of integrity, building
          people, and relationships. This came just a year following the economic downturn of 2008,
          when Allen and his son suffered extreme financial hardship and lost their contracts,
          employees, and practically everything they owned.
        </app-typography>

        <app-typography>
          With a renewed mindset built on faith, the father-son duo set out to build a company
          bigger than themselves. Over a decade later, that "It's Bigger Than You" philosophy has
          shaped the company's culture internally, externally, and across every project team.
        </app-typography>
      </div>
    </section-a>
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

.history-copy {
  display: grid;
  gap: calc(var(--spacing) * 4);
  max-width: 70ch;
}
</style>
