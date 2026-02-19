<script setup>
const { $posthog } = useNuxtApp();

const { data: featuredProjectCards } = await useAsyncData('homepage-featured-projects', async () => {
  try {
    return await $fetch('/api/homepage-featured-project-section');
  }
  catch (err) {
    console.error('Failed to fetch homepage featured projects:', err);
    return [];
  }
}, {
  default: () => [],
});

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
      <app-card-group-a :cards="featuredProjectCards" />
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
        quote="Envision has consistently impressed us with their commitment to timely project completion."
        name="Kelvin Mack"
        title="Maintenance Director of Central, HCPS"
      />
    </div>
  </UPage>
</template>
