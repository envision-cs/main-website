<script setup lang="ts">
const core = [
  {
    title: 'Be the Soluion',
    description: 'Our success and fulfillment depends on our willingness to always seek and help provide solutions. Help first We are the easy button We pride ourselves on being the solution Clarity Breeds Confidence',
  },

  {
    title: 'It\'s Bigger Than You',
    description: 'No two projects are the same, and neither is our approach. Whether it’s a small renovation or a large-scale build, we move with precision, flexibility, and care—delivering the personal attention of a local partner with the expertise of a national leader.',
  },

  {
    title: 'Be The Light',
    description: 'We don’t just build—we leave a mark. Every project is an opportunity to create something lasting, from the spaces we shape to the relationships we forge. With heart, craftsmanship, and purpose, we build legacies that elevate communities for generations to come.',
  },
  {
    title: 'Find A Better Way',
  },
  {
    title: 'Be Humbly Confident',
  },
];
</script>

<template>
  <div>
    <app-banner-b>
      <template #title>
        Envision
      </template>
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

    <app-banner
      title="Our Core Values"
      description="Choosing the wrong partner can mean wasted budget, endless delays, and a space that never meets its potential. We protect your investment, your timeline, and your vision"
    />
    <div>
      <ul class="site-grid">
        <li
          v-for="item in core"
          :key="item.title"
          class="item"
        >
          <h3 class="mt-2 text-xl text-balance leading-5 sm:text-2xl sm:leading-8 font-semibold">
            {{ item.title }}
          </h3>
        </li>
      </ul>
    </div>
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
