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
      <app-banner-b class="header" :image="bannerImage" :body="bannerBody">
        <template #title> Projects </template>
        {{ activeCategory?.name || "All" }}
      </app-banner-b>
    </template>
    <template #main-slot>
      <div class="projects">
        <div class="projects-toolbar">
          <projects-categories-nav :categories="categories" />
        </div>
        <div class="projects-grid">
          <app-reveal-card
            v-for="project in activeProjects"
            :key="project.id"
            :image="project.mainImage.url"
            :alt="project.title"
            :aria-label="project.title"
            :to="`${project.sector.slug}/${project.slug}`"
            aspect-ratio="3/4"
            image-densities="x1 x2"
            :container-type="true"
            :rounded="false"
            :outlined="false"
            :title-offset="8"
            details-delay="120ms"
            meta-delay="220ms"
          >
            <template #title>
              <app-typography class="h3 project-card-title" variant="heading-md">
                {{ project.title }}
              </app-typography>
            </template>
            <template #details>
              <ul class="project-card-stats">
                <li v-if="project.location">
                  <app-typography tag="p" variant="eyebrow-md"> Location </app-typography>
                  <app-typography tag="p">
                    {{ project.location }}
                  </app-typography>
                </li>
                <li v-if="project.area">
                  <app-typography tag="p" variant="eyebrow-md"> Area </app-typography>
                  <app-typography tag="p">
                    {{ project.area }}
                  </app-typography>
                </li>
                <li v-if="project.completed">
                  <app-typography tag="p" variant="eyebrow-md"> Completed </app-typography>
                  <app-typography tag="p">
                    {{ formatMonthYear(project.completed) }}
                  </app-typography>
                </li>
              </ul>
            </template>
            <template #meta>
              <div class="project-card-sector">
                {{ project.sector?.name }}
                <UIcon name="i-lucide-arrow-right" />
              </div>
            </template>
          </app-reveal-card>
        </div>
      </div>
    </template>
  </layout-a>
</template>

<style>
.projects {
  container-type: inline-size;
  container-name: projects;
  position: relative;
  padding: calc(var(--spacing) * 4);
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

.project-card-title {
  margin-bottom: 0.5rem;
  text-wrap: balance;
}

.project-card-stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem 1rem;
  margin-bottom: 1rem;
}

.project-card-sector {
  display: flex;
  align-items: center;
  justify-content: space-between;
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
