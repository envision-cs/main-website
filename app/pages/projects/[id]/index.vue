<script setup lang="ts">
import type { Project } from "~~/shared/types/content-types";

const { formatMonthYear } = useFormatDate();
const { sectors: categories } = await useSectors();

const { data } = await useAsyncData<Project[]>(
  "projects-by-sector-page-data",
  async () => {
    try {
      return await $fetch<Project[]>("/api/projects");
    } catch (err) {
      console.error("API error:", err);
      return [];
    }
  },
  { default: () => [] },
);

const route = useRoute();

const activeCategory = computed(() => {
  return categories.value.find((category) => category.slug === route.params.id);
});

const activeProjects = computed(() => {
  if (!data.value?.length) {
    return [];
  }

  if (!activeCategory.value?.slug) {
    return data.value;
  }

  return data.value.filter((project) => project.sector?.slug === activeCategory.value?.slug);
});

const bannerImage = computed(() => activeCategory.value?.image || "projects-all.jpg");
const bannerBody = computed(() => activeCategory.value?.description || "");

definePageMeta({
  layout: "none",
});
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
          <projects-categories-nav :categories="categories" />
        </div>
        <div class="projects-grid">
          <project-card
            v-for="project in activeProjects"
            :key="project.id"
            :image="project.mainImage.url"
            :alt="project.title"
            :aria-label="project.title"
            :to="`${project.sector.slug}/${project.slug}`"
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
}

.projects-toolbar {
  width: fit-content;
  margin-bottom: calc(var(--spacing) * 4);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  container: projects;
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
