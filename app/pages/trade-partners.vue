<script setup lang="ts">
useSeoMeta({
  title: "Trade Partners Program | Build on the Right Partnerships | Envision",
  description:
    "Join Envision's Trade Partners Program. We work with trade partners who show up, communicate, and take pride in the work. Get prequalified to build with us across Tampa Bay and Central Florida.",
  ogTitle: "Trade Partners Program | Build on the Right Partnerships | Envision",
  ogDescription:
    "Partners who show up and follow through. Clear scope, organized sites, and a team that keeps you in the loop. Get prequalified to work with Envision.",
  ogImage:
    "https://ik.imagekit.io/pnixsw7lg/main-website/TP_Hero_291cf107fa.jpg?updatedAt=1780449597350",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: "Trade Partners Program | Build on the Right Partnerships | Envision",
  twitterDescription:
    "Partners who show up and follow through. Clear scope, organized sites, and a team that keeps you in the loop. Get prequalified to work with Envision.",
  twitterImage:
    "https://ik.imagekit.io/pnixsw7lg/main-website/TP_Hero_291cf107fa.jpg?updatedAt=1780449597350",
});
</script>

<template>
  <div class="">
    <banner-b
      image="https://ik.imagekit.io/pnixsw7lg/main-website/TP_Hero_291cf107fa.jpg?updatedAt=1780449597350"
      position="right"
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
      <app-parallax
        image="https://ik.imagekit.io/pnixsw7lg/main-website/Full_Team_417498b48b.jpg?updatedAt=1780450996672"
        class="col-span-full"
      />
      <cta-c
        bgcolor="dark"
        flip
        eyebrow="Featured project"
        title="Ready to work together"
        href="/contact"
        body="Fill out the prequalification form and we will be in touch"
        label="Get prequalified"
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
