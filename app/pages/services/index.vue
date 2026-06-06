<script setup lang="ts">
const { services } = await useServicesList();
definePageMeta({
  layout: "layout-a",
});

useSeoMeta({
  title: "Construction Services | Envision Tampa Bay & Central Florida",
  description:
    "Explore Envision's construction services: construction management, design-build, enhanced preconstruction, tenant improvements, development and master planning, and specialty projects across Tampa Bay and Central Florida.",
  ogTitle: "Construction Services | Envision Tampa Bay & Central Florida",
  ogDescription:
    "Construction management, design-build, preconstruction, tenant improvements, master planning, and specialty projects across Tampa Bay and Central Florida.",
  ogImage: "https://ik.imagekit.io/pnixsw7lg/main-website/IMG_1915.jpg",
  ogType: "website",
  twitterCard: "summary_large_image",
  twitterTitle: "Construction Services | Envision Tampa Bay & Central Florida",
  twitterDescription:
    "Construction management, design-build, preconstruction, tenant improvements, master planning, and specialty projects across Tampa Bay and Central Florida.",
  twitterImage: "https://ik.imagekit.io/pnixsw7lg/main-website/IMG_1915.jpg",
});
</script>

<template>
  <app-team-member-list dense>
    <li v-for="service in services" :key="service.slug">
      <project-card
        :to="service.to"
        :aria-label="service.title"
        :image="service?.preview || service.image || ''"
        :alt="service.title"
        aspect-ratio="3/4"
      >
        <template #title>
          <app-typography class="h3 project-card-title" variant="heading-md">
            {{ service.title }}
          </app-typography>
        </template>
        <template #meta>
          <span class="submenu-reveal-card__meta">
            View service
            <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
          </span>
        </template>
      </project-card>
    </li>
  </app-team-member-list>
</template>

<style scoped>
.submenu-reveal-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
