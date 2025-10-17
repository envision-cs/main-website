<!-- eslint-disable vue/html-indent -->
<script setup>
const { $posthog } = useNuxtApp();

if ($posthog) {
  $posthog().capture('$pageview');
}
</script>

<template>
  <UPage class="mt-0 ">
    <div class="grid">
      <home-hero-banner />
      <app-banner
        flip
        eyebrow="Clarity From Day One"
        title="Building Without the Headaches"
        description="We know how stressful construction can feel when deadlines are missed, communication is poor, and leadership is unclear. That’s why we’ve built a process that keeps your project on track and you in the loop—every step of the way."
        :links="[
          {
            label: 'Start Your Project',
            to: '#',
            color: 'primary',
          },
          {
            label: 'See Our Work',
            to: '#',
            variant: 'outline',
            color: 'neutral',
          },
        ]"
      />
      <app-banner
        eyebrow="Guided by Purpose"
        title="Building With Heart and Precision"
        description="At Envision, we’ve delivered projects across Florida with a balance of technical excellence and genuine care for the people we serve. Every decision we make is rooted in purpose—ensuring results that meet the highest standards without ever losing sight of the communities and clients at the center of it all."
        :links="[
          {
            label: 'Start Your Project',
            to: '#',
            color: 'primary',
          },
          {
            label: 'See Our Work',
            to: '#',
            variant: 'outline',
            color: 'neutral',
          },
        ]"
        :images="[
          {
            img: '/greater-tampa-realtors-01.jpg',
            alt: 'Airport image',

          },
          {
            img: '/airport.png',
            alt: 'Airport image',

          },
        ]"
      />
      <home-proven-process />
      <home-inspire />
      <home-news-feed />
      <app-banner
        eyebrow="Build with Confidence"
        title="Your Vision Shouldn’t Be Left to Chance"
        description="Choosing the wrong partner can mean wasted budget, endless delays, and a space that never meets its potential. We protect your investment, your timeline, and your vision"
        :links="[
          {
            label: 'Start Your Project',
            to: '#',
            color: 'primary',
          },
          {
            label: 'See Our Work',
            to: '#',
            variant: 'outline',
            color: 'neutral',
          },
        ]"
      />
      <three-uniques />

      <app-banner
        title="Building Without the Headaches"
        description="We know how stressful construction can feel when deadlines are missed, communication is poor, and leadership is unclear. That’s why we’ve built a process that keeps your project on track and you in the loop—every step of the way."
        :links="[
          {
            label: 'Start Your Project',
            to: '#',
            color: 'primary',
          },
        ]"
      />
    </div>
  </UPage>
</template>
