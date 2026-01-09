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
      <app-cta-a
        text="Building Without the Headaches"
        body="Construction shouldn’t be frustrating. Missed deadlines, cold communication, and unclear leadership make it harder than it should be."
        image="/IMG_1915.jpg"
        flip
      >
        Building Without the <span>Headaches</span>
      </app-cta-a>
      <app-card-group-a
        :cards="[{
                   title: 'Greater Tampa Realtors',
                   link: '/projects/business_corporate/greater-tampa-realtors',
                   image: '/UTMPB-LobbyCornerOut.jpg',
                   sector: 'Business/Corporate',
                   completed: '2024',
                 },
                 {
                   title: 'Greater Tampa Realtors',
                   link: '/projects/business_corporate/greater-tampa-realtors',
                   image: '/USFSPResidenceHall-Exteriors-DuskLandscapefromRamp.jpg',
                   sector: 'Business/Corporate',
                   completed: '2024',
                 },
        ]"
      />
      <app-cta-a
        image="rtm-auditorium.jpg"
        body="At Envision, we’ve led projects across Florida with heart, precision, and purpose. Our team knows what it takes to deliver results—without losing sight of people."
      >
        Building With <span>Heart</span> and <span>Precision</span>
      </app-cta-a>
      <app-parallax image="/usl-super-league-01.jpg" />
      <home-proven-process />
      <app-parallax image="/HomePageAllens.webp" mobile-image="/thegreens2.jpg" />
      <three-uniques />
      <quote
        quote="Don’t risk another over-budget, under-communicated build. Work with a team that values your success."
      />
    </div>
  </UPage>
</template>
