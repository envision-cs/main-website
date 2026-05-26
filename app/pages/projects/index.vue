<script setup lang="ts">
import type { Project } from "~~/shared/types/content-types";

const { formatMonthYear } = useFormatDate();
const { sectors: categories } = await useSectors();
const navCategories = computed(() => [
  ...categories.value,
  { name: "Beck/Envision", slug: "beck-envision" },
]);
const { data } = await useAsyncData<Project[]>(
  "projects-page-data",
  async () => {
    try {
      return await $fetch<Project[]>("/api/projects");
    } catch (err) {
      console.error("Strapi error:", err);
      return [];
    }
  },
  { default: () => [] },
);
const activeProjects = computed(() => data.value ?? []);
const bannerImage = computed(() => "projects-all.jpg");
const bannerBody = computed(() => "");

definePageMeta({
  layout: "none",
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
            v-for="project in activeProjects"
            :key="project.id"
            :image="project.mainImage?.url"
            :alt="project.title"
            :aria-label="project.title"
            :to="`projects/${project.sector?.slug}/${project.slug}`"
            aspect-ratio="3/4"
            image-densities="x1 x2"
            :outlined="false"
            :title="project.title"
            :location="project.location"
            :completed="project.completed ? formatMonthYear(project.completed) : undefined"
            :sector="project.sector?.name"
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
