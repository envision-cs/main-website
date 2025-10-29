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
  <UPage class="mt-0 ">
    <div class="grid">
      <app-hero-banner title="About Us" />

      <app-banner
        flip
        title="Our Orign Story"
        description="Founded in 2009 by Allen Greene Sr. and Allen Greene II, Envision was born from a simple conviction: build a construction firm where people come first—every time. Based in Tampa and family-owned, we’ve grown from humble beginnings into a trusted partner across Florida by holding fast to our faith, serving others, and refusing to settle for 'good enough.'"
      />
      <app-banner
        title="Mission & Purpose"
        description="Built on Faith. Driven by Purpose. Focused on Legacy.
We don’t just build structures—we elevate communities, mentor small businesses, and shape spaces that stand the test of time. Our mission is to build people while building projects.
"
      />
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
  </UPage>
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
