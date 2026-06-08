<script setup lang="ts">import type { Project } from '~~/shared/types/content-types';

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
  'projects-data',
  async () => {
    try {
      return await $fetch<Project[]>('/api/projects');
    }
    catch (err) {
      console.error('Strapi error:', err);
      return [];
    }
  },
  { default: () => [] },
);

function getProjectCompletedTime(project: Project): number {
  const time = project.completed ? new Date(project.completed).getTime() : 0;

  return Number.isNaN(time) ? 0 : time;
}

const activeProjects = computed(() =>
  [...(data.value ?? [])].sort(
    (left, right) => getProjectCompletedTime(right) - getProjectCompletedTime(left),
  ),
);
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
const bannerBody = computed(() => '');

definePageMeta({
  layout: 'none',
});

useSeoMeta({
  title: 'Projects | Envision Construction Tampa Bay & Central Florida',
  description:
    'Browse Envision\'s portfolio of completed construction projects across Tampa Bay and Central Florida, spanning K-12, higher education, sports, hospitality, and institutional sectors.',
  ogTitle: 'Projects | Envision Construction Tampa Bay & Central Florida',
  ogDescription:
    'Explore our portfolio of delivered construction projects across Tampa Bay and Central Florida, organized, high-quality, and on time.',
  ogImage: '/projects-all.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Projects | Envision Construction Tampa Bay & Central Florida',
  twitterDescription:
    'Explore our portfolio of delivered construction projects across Tampa Bay and Central Florida, organized, high-quality, and on time.',
  twitterImage: '/projects-all.jpg',
});
</script>

<template>
  <layout-a>
    <template #header-slot>
      <banner-b class="header" :image="bannerImage" :body="bannerBody">
        <template #title> Projects </template>
        All
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
