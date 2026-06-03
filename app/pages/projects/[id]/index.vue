<script setup lang="ts">
import type { Project } from "~~/shared/types/content-types";

interface ProjectCardItem {
  id: Project["id"];
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
  { name: "Beck/Envision", slug: "beck-envision" },
]);
const route = useRoute();

const categorySlug = computed(() => {
  const param = route.params.id;

  if (typeof param !== "string") {
    return "";
  }

  return param.trim();
});

const activeCategory = computed(() => {
  return categories.value.find((category) => category.slug === categorySlug.value);
});

if (!categorySlug.value || !activeCategory.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Project category not found",
  });
}

const {
  data,
  error: projectsError,
  refresh: refreshProjects,
  status: projectsStatus,
} = await useAsyncData<Project[]>(
  "projects-by-sector-page-data",
  () => $fetch<Project[]>("/api/projects"),
  { default: () => [] },
);

const hasProjectsError = computed(() => Boolean(projectsError.value));
const isProjectsRefreshing = computed(() => projectsStatus.value === "pending");

const activeProjects = computed(() => {
  if (!data.value?.length) {
    return [];
  }

  return data.value.filter((project) => project.sector?.slug === activeCategory.value?.slug);
});

const projectCards = computed<ProjectCardItem[]>(() =>
  activeProjects.value.flatMap((project) => {
    const image = project.mainImage?.url;
    const sectorSlug = project.sector?.slug;

    if (!image || !sectorSlug || !project.slug) {
      return [];
    }

    return [
      {
        id: project.id,
        image,
        title: project.title,
        to: `${sectorSlug}/${project.slug}`,
        location: project.location,
        completed: project.completed ? formatMonthYear(project.completed) : undefined,
        sector: project.sector?.name,
      },
    ];
  }),
);

const bannerImage = computed(() => activeCategory.value?.image || "projects-all.jpg");
const bannerBody = computed(() => activeCategory.value?.description || "");
const projectListTitle = computed(() => `${activeCategory.value?.name || "Project"} projects`);

definePageMeta({
  layout: "none",
});
const canonicalPath = computed(() =>
  categorySlug.value ? `/projects/${categorySlug.value}` : route.path,
);

const seoTitle = computed(() =>
  activeCategory.value?.name
    ? `${activeCategory.value.name} Projects | Envision Construction`
    : "Projects | Envision Construction",
);

const seoDescription = computed(() => {
  const name = activeCategory.value?.name;
  return activeCategory.value?.description
    ? activeCategory.value.description
    : `Explore Envision's ${name ? `${name.toLowerCase()} ` : ""}construction projects across Tampa Bay and Central Florida, delivered organized, high-quality, and on time.`;
});

useSeoMeta(() => ({
  title: seoTitle.value,
  description: seoDescription.value,
  ogTitle: seoTitle.value,
  ogDescription: seoDescription.value,
  ogImage: bannerImage.value,
  ogType: "website",
  ogUrl: canonicalPath.value,
  twitterCard: "summary_large_image",
  twitterTitle: seoTitle.value,
  twitterDescription: seoDescription.value,
  twitterImage: bannerImage.value,
}));

useHead(() => ({
  link: [{ rel: "canonical", href: canonicalPath.value }],
}));
</script>

<template>
  <layout-a>
    <template #header-slot>
      <banner-b class="header" :image="bannerImage" :body="bannerBody">
        <template #title> Projects </template>
        {{ activeCategory?.name || "All" }}
        <template #body>
          {{ activeCategory?.description }}
        </template>
      </banner-b>
    </template>
    <template #main-slot>
      <div class="projects">
        <div class="projects-toolbar">
          <projects-categories-nav :categories="navCategories" />
        </div>
        <section
          v-if="hasProjectsError"
          class="projects-error"
          role="alert"
          aria-live="polite"
          aria-labelledby="projects-error-title"
        >
          <app-typography id="projects-error-title" tag="h2" variant="heading-sm">
            Projects could not load
          </app-typography>
          <app-typography tag="p" variant="text-md" class="projects-error__body">
            This project category is available, but the project list is temporarily unavailable.
            Please try again.
          </app-typography>
          <app-button
            type="button"
            variant="outline"
            icon="i-lucide-refresh-cw"
            :disabled="isProjectsRefreshing"
            @click="refreshProjects"
          >
            {{ isProjectsRefreshing ? "Retrying" : "Try again" }}
          </app-button>
        </section>
        <section v-else class="projects-list" aria-labelledby="projects-list-title">
          <app-typography
            id="projects-list-title"
            tag="h2"
            variant="heading-sm"
            class="u-visually-hidden"
          >
            {{ projectListTitle }}
          </app-typography>
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
        </section>
      </div>
    </template>
  </layout-a>
</template>

<style scoped>
.projects {
  container-type: inline-size;
  container-name: projects;
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
  grid-template-columns: repeat(2, 1fr);
  container: projects;
  background-color: var(--color-envision-gray-800);
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
