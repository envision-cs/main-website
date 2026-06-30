<script setup lang="ts">
const { services } = await useServicesList();
definePageMeta({
  layout: 'layout-a',
});

useSeoMeta({
  title: 'Construction Services | Envision Tampa Bay & Central Florida',
  description:
    "Explore Envision's construction services: construction management, design-build, enhanced preconstruction, tenant improvements, development and master planning, and specialty projects across Tampa Bay and Central Florida.",
  ogTitle: 'Construction Services | Envision Tampa Bay & Central Florida',
  ogDescription:
    'Construction management, design-build, preconstruction, tenant improvements, master planning, and specialty projects across Tampa Bay and Central Florida.',
  ogImage: 'https://ik.imagekit.io/pnixsw7lg/main-website/IMG_1915.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Construction Services | Envision Tampa Bay & Central Florida',
  twitterDescription:
    'Construction management, design-build, preconstruction, tenant improvements, master planning, and specialty projects across Tampa Bay and Central Florida.',
  twitterImage: 'https://ik.imagekit.io/pnixsw7lg/main-website/IMG_1915.jpg',
});
</script>

<template>
  <div class="projects">
    <ul class="projects-grid" dense>
      <li v-for="service in services" :key="service.slug">
        <lazy-project-card
          :to="service.to"
          :aria-label="service.title"
          :image="service?.preview || service.image || ''"
          :alt="service.title"
          hydrate-on-visible
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
        </lazy-project-card>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.submenu-reveal-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.projects {
  container-type: inline-size;
  container-name: projects;
  position: relative;
  background: var(--color-envision-gray-800);
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  container: projects;
  background: var(--color-envision-gray-800);
}

@container projects (width > 550px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@container projects (width > 1000px) {
  .projects-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@container projects (width > 1400px) {
  .projects-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
