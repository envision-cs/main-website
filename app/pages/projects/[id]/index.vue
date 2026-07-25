<script setup lang="ts">
import type { Project } from '~~/shared/types/content-types';

definePageMeta({
  layout: 'none',
  // Re-run setup when only the param changes, so the 404 guard below stays honest.
  key: (route) => route.fullPath,
});

interface ProjectListItem {
  id: Project['id'];
  title: string;
  slug: string;
  location?: string;
  completed?: string;
  image?: string;
  sectors: { name: string; slug: string }[];
}

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
// Cards past the first grid row hydrate on scroll instead of at page load.
const EAGER_CARD_COUNT = 4;

const route = useRoute();
const { formatMonthYear } = useFormatDate();

const sectorsAsync = useSectors();
const projectsAsync = useFetch<Project[]>('/api/projects', {
  key: 'projects',
  default: () => [],
  // Runs server-side, so only this reduced shape is serialized into the payload.
  transform: (all): ProjectListItem[] =>
    all.map((project) => ({
      id: project.id,
      title: project.title,
      slug: project.slug,
      location: project.location,
      completed: project.completed,
      image: project.mainImage?.url,
      sectors: getProjectSectors(project).map((entry) => ({
        name: entry.name,
        slug: entry.slug,
      })),
    })),
});

const [{ sectors }, { data: projects, error, refresh, status }] = await Promise.all([
  sectorsAsync,
  projectsAsync,
]);

const slug = typeof route.params.id === 'string' ? route.params.id.trim() : '';
const sector = sectors.value.find((candidate) => candidate.slug === slug);

if (!sector) {
  throw createError({ statusCode: 404, statusMessage: 'Project category not found' });
}

const navSectors = computed(() => [...sectors.value, BECK_ENVISION]);

function completedTime(project: ProjectListItem): number {
  const time = project.completed ? Date.parse(project.completed) : 0;
  return Number.isNaN(time) ? 0 : time;
}

const projectCards = computed<ProjectCard[]>(() =>
  projects.value
    .filter((project) => project.sectors.some((entry) => entry.slug === sector.slug))
    .sort((left, right) => completedTime(right) - completedTime(left))
    .flatMap((project) => {
      if (!project.image || !project.slug) return [];

      return [
        {
          id: project.id,
          image: project.image,
          title: project.title,
          to: `/projects/${sector.slug}/${project.slug}`,
          location: project.location,
          completed: project.completed ? formatMonthYear(project.completed) : undefined,
          sector: project.sectors.map((entry) => entry.name).join(', ') || undefined,
        },
      ];
    }),
);

const eagerCards = computed(() => projectCards.value.slice(0, EAGER_CARD_COUNT));
const deferredCards = computed(() => projectCards.value.slice(EAGER_CARD_COUNT));

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
              v-for="project in eagerCards"
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
            <LazyProjectCard
              v-for="project in deferredCards"
              :key="project.id"
              hydrate-on-visible
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
