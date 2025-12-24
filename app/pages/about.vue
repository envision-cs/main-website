<script setup lang="ts">

</script>

<template>
  <div>
    <app-banner-b>
      About Us
    </app-banner-b>
    <app-section-a flip>
      <template #sticky>
        <app-typography
          variant="heading-lg"
          tag="h2"
          class=""
        >
          Our <span>History</span>
        </app-typography>
      </template>
      <template #body>
        <app-typography variant="text-md" tag="p">
          Allen is the Managing Director on the Leadership Team for Envision, an MBE-certified construction management firm.
        </app-typography>

        <app-typography variant="text-md" tag="p">
          In 2009, Allen and his son established Envision on the principles of integrity, building people, and relationships. This came just a year following the economic downturn of 2008, when Allen and his son suffered extreme financial hardship and lost all of their contracts, employees, and practically everything they owned. A year later, with a renewed mindset built on faith, the father-son duo set out to build a company bigger than themselves. Over a decade later, the two have created a company where an “It’s Bigger Than You” philosophy has shaped the company’s culture both internally and externally—a culture that can be recognized on every project and throughout their team.
        </app-typography>

        <app-typography variant="text-md" tag="p">
          With over 30 years of experience in the construction industry, Allen has led project teams and worked across numerous building types, such as higher education, hospitals, hospitality, worship centers, and more.
        </app-typography>
      </template>
    </app-section-a>

    <three-uniques />
    <app-parallax image="/HomePageAllens.webp" />
    <core-values />
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
