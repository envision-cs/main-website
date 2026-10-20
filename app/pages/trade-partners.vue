<script setup lang="ts">useSeoMeta({
  title: 'Trade Partners Program | Build on the Right Partnerships | Envision',
  description:
    'Join Envision\'s Trade Partners Program. We work with trade partners who show up, communicate, and take pride in the work. Get prequalified to build with us across Tampa Bay and Central Florida.',
  ogTitle: 'Trade Partners Program | Build on the Right Partnerships | Envision',
  ogDescription:
    'Partners who show up and follow through. Clear scope, organized sites, and a team that keeps you in the loop. Get prequalified to work with Envision.',
  ogImage:
    'https://res.cloudinary.com/evocdaef/image/upload/f_auto,q_auto/envision-site/tp_hero_2026.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Trade Partners Program | Build on the Right Partnerships | Envision',
  twitterDescription:
    'Partners who show up and follow through. Clear scope, organized sites, and a team that keeps you in the loop. Get prequalified to work with Envision.',
  twitterImage:
    'https://res.cloudinary.com/evocdaef/image/upload/f_auto,q_auto/envision-site/tp_hero_2026.jpg',
});

const rotationBase =
  'https://res.cloudinary.com/evocdaef/image/upload/c_fill,ar_3:2,g_auto,f_auto,q_auto/envision-site/';

const rotationPhotos = [
  {
    src: `${rotationBase}tp_rot_1_readymix.jpg`,
    alt: 'Two workers in hard hats, one in a high-visibility vest, watch a ready-mix concrete truck on a sunny job site.',
  },
  {
    src: `${rotationBase}tp_rot_2_ryan_partner.jpg`,
    alt: 'Two men smile on a busy trade show floor, one pointing at a tote bag the other is holding, with exhibitor booths behind them.',
  },
  {
    src: `${rotationBase}tp_rot_3_peacesign.jpg`,
    alt: 'Two workers in hard hats pose behind a chain-link fence beside a turf athletic field, one flashing a peace sign.',
  },
  {
    src: `${rotationBase}tp_rot_4_emerson.jpg`,
    alt: 'Two men talk at a trade show booth, one holding a phone while the other gestures as he speaks.',
  },
  {
    src: `${rotationBase}tp_rot_5_briefing.jpg`,
    alt: 'A crew in hard hats and high-visibility shirts gathers for a job site briefing, with a crane truck behind them.',
  },
  {
    src: `${rotationBase}tp_rot_6_threeway.jpg`,
    alt: 'Three people talk and smile together on a busy trade show floor.',
  },
  {
    src: `${rotationBase}tp_rot_7_levelline.jpg`,
    alt: 'Workers in hard hats talk inside a building under construction, one in a high-visibility shirt with a logo on the back.',
  },
  {
    src: `${rotationBase}tp_rot_8_handshake.jpg`,
    alt: 'Two men shake hands across a booth table at a trade show.',
  },
  {
    src: `${rotationBase}tp_rot_9_container.jpg`,
    alt: 'Two workers in hard hats steady a blue shipping container as a crane lowers it into place.',
  },
];
</script>

<template>
  <div class="">
    <banner-b
      image="https://res.cloudinary.com/evocdaef/image/upload/f_auto,q_auto/envision-site/tp_hero_2026.jpg"
      image-alt="Two men smile with an arm around each other at the ABC Florida Gulf Coast GC Tabletop event, with exhibitor booths behind them."
      position="center"
    >
      <template #eyebrow> Trade Partners Program </template>

      Build on the right partnerships
    </banner-b>
    <main>
      <big-quote
        eyebrow="Our Commitment"
        bgcolor="dark"
        title="Partners who show up and follow through"
        body="We work with trade partners who show up, communicate, and take pride in the work. Clear scope. Organized sites. A team that keeps you in the loop. If that's how you operate, we want to hear from you."
      />
      <photo-rotation label="Trade partner photos" :photos="rotationPhotos" class="col-span-full" />
      <cta-c
        bgcolor="dark"
        flip
        eyebrow="Let's Connect."
        title="Ready to work together"
        href="https://forms.gle/V5ThrGDGapLmQDBi9"
        body="Fill out the trade partner form, and our team will be in touch."
        label="Join Our Network"
        image="/florida-aquarium-restroom-renovation-03.jpg"
      />
    </main>
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
