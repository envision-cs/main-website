<script setup lang="ts">
import type { Project } from '~~/shared/types/content-types';

definePageMeta({
  layout: 'none',
  // Re-run setup when only the param changes, so the 404 guard below stays honest.
  key: (route) => route.fullPath,
});

interface ProjectCard {
  id: Project['id'];
  image: string;
  title: string;
  to: string;
  location?: string;
  completed?: string;
  sector?: string;
}

const BECK_ENVISION = { name: 'Beck/Envision', slug: 'beck-envision' };

const route = useRoute();
const { formatMonthYear } = useFormatDate();
const { sectors } = await useSectors();

const slug = typeof route.params.id === 'string' ? route.params.id.trim() : '';
const sector = sectors.value.find((candidate) => candidate.slug === slug);

if (!sector) {
  throw createError({ statusCode: 404, statusMessage: 'Project category not found' });
}

const navSectors = computed(() => [...sectors.value, BECK_ENVISION]);

const {
  data: projects,
  error,
  refresh,
  status,
} = await useFetch<Project[]>('/api/projects', {
  key: 'projects',
  default: () => [],
});

function completedTime(project: Project): number {
  const time = project.completed ? Date.parse(project.completed) : 0;
  return Number.isNaN(time) ? 0 : time;
}

const projectCards = computed<ProjectCard[]>(() =>
  projects.value
    .filter((project) => projectBelongsToSector(project, sector.slug))
    .sort((left, right) => completedTime(right) - completedTime(left))
    .flatMap((project) => {
      const image = project.mainImage?.url;
      if (!image || !project.slug) return [];

      return [
        {
          id: project.id,
          image,
          title: project.title,
          to: `/projects/${sector.slug}/${project.slug}`,
          location: project.location,
          completed: project.completed ? formatMonthYear(project.completed) : undefined,
          sector: formatProjectSectorLabel(project),
        },
      ];
    }),
);

const bannerImage = sector.image || 'projects-all.jpg';
const socialImage = toAbsoluteOptionalSiteUrl(bannerImage);
const canonicalUrl = toAbsoluteSiteUrl(`/projects/${sector.slug}`);

const seoTitle = `${sector.name} Projects | Envision Construction`;
const seoDescription =
  sector.description ||
  `Explore Envision's ${sector.name.toLowerCase()} construction projects across Tampa Bay and Central Florida, delivered organized, high-quality, and on time.`;

useSeoMeta({
  title: seoTitle,
  description: seoDescription,
  ogTitle: seoTitle,
  ogDescription: seoDescription,
  ogImage: socialImage,
  ogType: 'website',
  ogUrl: canonicalUrl,
  twitterCard: 'summary_large_image',
  twitterTitle: seoTitle,
  twitterDescription: seoDescription,
  twitterImage: socialImage,
});

useHead({
  link: [{ rel: 'canonical', href: canonicalUrl }],
});
</script>

<template>
  <LayoutA>
    <template #header-slot>
      <BannerB class="header" :image="bannerImage" :body="sector.description">
        <template #title>Projects</template>
        {{ sector.name }}
      </BannerB>
    </template>

    <template #main-slot>
      <div class="projects">
        <div class="projects-toolbar">
          <ProjectsCategoriesNav :categories="navSectors" />
        </div>

        <section v-if="error" class="projects-error" role="alert">
          <AppTypography tag="h2" variant="heading-sm"> Projects could not load </AppTypography>
          <AppTypography tag="p" variant="text-md" class="projects-error__body">
            This project category is available, but the project list is temporarily unavailable.
            Please try again.
          </AppTypography>
          <MButton
            type="button"
            variant="outline"
            :disabled="status === 'pending'"
            @click="refresh"
          >
            <template #icon>
              <UIcon name="i-lucide-refresh-cw" aria-hidden="true" />
            </template>
            {{ status === 'pending' ? 'Retrying' : 'Try again' }}
          </MButton>
        </section>

        <section v-else class="projects-list" aria-labelledby="projects-list-title">
          <AppTypography
            id="projects-list-title"
            tag="h2"
            variant="heading-sm"
            class="u-visually-hidden"
          >
            {{ sector.name }} projects
          </AppTypography>

          <div class="projects-grid">
            <ProjectCard
              v-for="project in projectCards"
              :key="project.id"
              :image="project.image"
              :alt="project.title"
              :to="project.to"
              aspect-ratio="3/4"
              image-densities="x1"
              :image-quality="60"
              :outlined="false"
              :title="project.title"
              :location="project.location"
              :completed="project.completed"
              :sector="project.sector"
            />
          </div>
        </section>
      </div>
    </template>
  </LayoutA>
</template>

<style scoped>
.projects {
  container: projects / inline-size;
  position: relative;
}

.projects-toolbar {
  width: 100%;
}

.projects-error {
  display: grid;
  gap: calc(var(--spacing) * 4);
  max-width: 42rem;
  padding-block: calc(var(--spacing) * 8);
  color: var(--ui-text);
}

.projects-error__body {
  color: var(--text-color-muted);
}

.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  background-color: var(--color-envision-gray-800);
}

@container projects (width > 550px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
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
