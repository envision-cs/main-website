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
      <app-cta-a text="Building Without the Headaches" flip>
        Building Without the <span>Headaches</span>
      </app-cta-a>
      <app-card-group-a
        :cards="[{
                   title: 'Greater Tampa Realtors',
                   link: '/projects/business_corporate/greater-tampa-realtors',
                   image: '/greater-tampa-realtors-01.jpg',
                   sector: 'Business/Corporate',
                   completed: '2024',
                 },
                 {
                   title: 'Greater Tampa Realtors',
                   link: '/projects/business_corporate/greater-tampa-realtors',
                   image: '/greater-tampa-realtors-01.jpg',
                   sector: 'Business/Corporate',
                   completed: '2024',
                 },
        ]"
      />
      <app-cta-a
        body="At Envision, we’ve delivered projects across Florida with a balance of technical excellence and genuine care for the people we serve. Every decision we make is rooted in purpose—ensuring results that meet the highest standards without ever losing sight of the communities and clients at the center of it all."
      >
        Building With <span>Heart</span> and <span>Precision</span>
      </app-cta-a>
      <app-parallax image="/usl-super-league-01.jpg" />
      <home-proven-process />
      <app-cta-a
        text="Our proven process brings structure and consistency to every project. We listen, plan, and execute to reduce risk, maintain alignment, and deliver on time, on budget, and with complete transparency."
      >
        Delivering Projects that <span>Inspire</span> and <span>Engage</span>
      </app-cta-a>
      <app-gallery />
      <home-news-feed />
      <app-cta-a
        body="At Envision, we’ve delivered projects across Florida with a balance of technical excellence and genuine care for the people we serve. Every decision we make is rooted in purpose—ensuring results that meet the highest standards without ever losing sight of the communities and clients at the center of it all."
      >
        Build with <span>Confidence</span>
      </app-cta-a>
      <app-parallax image="/usl-super-league-01.jpg" />
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
