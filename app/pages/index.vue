<script setup lang="ts">
type FeaturedProjectCard = {
  title: string;
  link: string;
  image: string;
  sector: string;
  completed: string;
};

type HomepageFeaturedProjectsResponse = {
  sectionOne: FeaturedProjectCard[];
  sectionTwo: FeaturedProjectCard[];
};

const { $posthog } = useNuxtApp();

const { data: featuredProjectCards } = await useAsyncData <HomepageFeaturedProjectsResponse> ('homepage-featured-projects', async () => {
  try {
    return await $fetch('/api/homepage-featured-project-section');
  }
  catch (err) {
    console.error('Failed to fetch homepage featured projects:', err);
    return {
      sectionOne: [],
      sectionTwo: [],
    };
  }
}, {
  default: () => ({
    sectionOne: [],
    sectionTwo: [],
  }),
});

if ($posthog) {
  $posthog().capture('$pageview');
}
</script>

<template>
  <UPage class="mt-0 ">
    <div class="grid">
      <home-hero-banner />
      <app-card-group-a :cards="featuredProjectCards.sectionOne" />
      <app-cta-a
        text="Building Without the Headaches"
        body="Construction shouldn’t be frustrating. Missed deadlines, cold communication, and unclear leadership make it harder than it should be."
        image="https://ik.imagekit.io/pnixsw7lg/main-website/IMG_1915.jpg"
        flip
        content-position="bottom-left"
      >
        Building Without the <span>Headaches</span>
      </app-cta-a>
      <app-card-group-a :cards="featuredProjectCards.sectionTwo" />
      <app-cta-a
        text="Building Without the Headaches"
        body="At Envision, we’ve led projects across Florida with heart, precision, and purpose. Our team knows what it takes to deliver results—without losing sight of people."
        image="https://ik.imagekit.io/pnixsw7lg/main-website/rtm-auditorium.jpg"
        flip
        content-position="bottom-left"
      >
        Building
        With <span>Heart</span> and <span>Precision</span>
      </app-cta-a>
      <home-proven-process />
      <three-uniques />
      <quote
        quote="Envision has consistently impressed us with their commitment to timely project completion."
        name="Kelvin Mack"
        title="Maintenance Director of Central, HCPS"
      />
    </div>
  </UPage>
</template>
