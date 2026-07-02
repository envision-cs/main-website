<script setup lang="ts">
import type { Project } from '~~/shared/types/content-types';

interface ProjectCardItem {
  id: Project['id'];
  image: string;
  title: string;
  to: string;
  location?: string;
  completed?: string;
  sector?: string;
}

const { formatMonthYear } = useFormatDate();
const { sectors: categories } = await useSectors();
const navCategories = computed(() => [
  ...categories.value,
  { name: 'Beck/Envision', slug: 'beck-envision' },
]);

const { data } = await useAsyncData<Project[]>(
  'beck-envision-page-data',
  async () => {
    try {
      return await $fetch<Project[]>('/api/projects');
    } catch (err) {
      console.error('Strapi error:', err);
      return [];
    }
  },
  { default: () => [] },
);
const activeProjects = computed(() => data.value.filter((p) => p.beck === true));
const projectCards = computed<ProjectCardItem[]>(() =>
  activeProjects.value.flatMap((project) => {
    const image = project.mainImage?.url;
    const primarySector = getPrimaryProjectSector(project);

    if (!image || !primarySector || !project.slug) {
      return [];
    }

    return [
      {
        id: project.id,
        image,
        title: project.title,
        to: `/projects/${primarySector.slug}/${project.slug}`,
        location: project.location,
        completed: project.completed ? formatMonthYear(project.completed) : undefined,
        sector: formatProjectSectorLabel(project),
      },
    ];
  }),
);
const bannerImage = computed(() => 'projects-all.jpg');
const socialImage = computed(() => toAbsoluteOptionalSiteUrl(bannerImage.value));
const bannerBody = computed(() => '');

definePageMeta({
  layout: 'none',
});

useSeoMeta({
  title: 'Beck/Envision Partnership | Joint-Venture Construction Projects',
  description:
    'The Beck/Envision partnership brings together two trusted builders to deliver complex, high-value construction across Tampa Bay and Central Florida, combining deep resources with local accountability.',
  ogTitle: 'Beck/Envision Partnership | Joint-Venture Construction Projects',
  ogDescription:
    'Two builders, one standard. Explore the projects delivered through the Beck/Envision joint venture, where combined expertise meets local commitment.',
  ogImage: socialImage.value,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Beck/Envision Partnership | Joint-Venture Construction Projects',
  twitterDescription:
    'Two builders, one standard. Explore the projects delivered through the Beck/Envision joint venture, where combined expertise meets local commitment.',
  twitterImage: socialImage.value,
});
</script>

<template>
  <layout-a>
    <template #header-slot>
      <banner-b class="header" :image="bannerImage" :body="bannerBody">
        <template #title> Projects </template>
        Beck/Envision
      </banner-b>
    </template>
    <template #main-slot>
      <div class="projects">
        <div class="projects-toolbar">
          <projects-categories-nav :categories="navCategories" />
        </div>
        <div class="projects-grid">
          <project-card
            v-for="project in projectCards"
            :key="project.id"
            :image="project.image"
            :alt="project.title"
            :aria-label="project.title"
            :to="project.to"
            aspect-ratio="3/4"
            image-densities="x1 x2"
            :outlined="false"
            :title="project.title"
            :location="project.location"
            :completed="project.completed"
            :sector="project.sector"
          />
        </div>
      </div>
    </template>
  </layout-a>
</template>

<style scoped>
.projects {
  container-type: inline-size;
  container-name: projects;
  position: relative;
  background: var(--color-envision-gray-800);
}

.projects-toolbar {
  width: 100%;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  container: projects;
  background: var(--color-envision-gray-800);
}

@container projects (width > 750px) {
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
