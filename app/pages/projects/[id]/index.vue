<script setup lang="ts">
const { data: projects } = useFetch('/api/projects', {
  key: 'projects',
});

const route = useRoute();

const categories = computed<{ title: string; slug: string }[]>(() => {
  const set = new Map<string, { title: string; slug: string }>();

  // Always include “All”
  set.set('all', { title: 'All', slug: 'all' });

  if (!projects.value)
    return Array.from(set.values());

  for (const project of projects.value) {
    if (project.sector && project.sectorSlug) {
      set.set(project.sectorSlug, {
        title: project.sector,
        slug: project.sectorSlug,
      });
    }
  }

  return Array.from(set.values());
});

const activeCategory = computed<{ title: string; slug: string } | undefined>(() => {
  return categories.value.find(
    category => category.slug === route.params.id,
  );
});

const activeProjects = computed(() => {
  if (activeCategory.value?.slug === 'all') {
    return projects.value;
  }
  return projects.value?.filter(project => project.sector === activeCategory.value?.title);
});

definePageMeta({
  layout: 'none',
});
</script>

<template>
  <layout-a>
    <template #header-slot>
      <app-banner-b class="header" image="projects-all.jpg">
        <template #title>
          Projects
        </template>
        {{ activeCategory?.title }}
      </app-banner-b>
    </template>
    <template #aside-slot>
      <div class="catagories px-4 py-4 md:p-4 h-full">
        <div class="flex flex-col gap-2 sticky top-0">
          <ULink
            v-for="catagory in categories"
            :key="catagory.title"
            :to="{
              name: 'projects-id',
              params: { id: catagory.slug },
            }"
            class="text-left"
          >
            {{ catagory.title }}
          </ULink>
        </div>
      </div>
    </template>
    <template #main-slot>
      <div class="projects">
        <div class="projects-grid">
          <projects-card
            v-for="project in activeProjects"
            :key="project.id"
            :image="project.main_image"
            :title="project.title"
            :location="project.location"
            :area="project.area"
            :completed="project.completed"
            :sector="project.sector"
            :to="`${project.sectorSlug}/${project.slug}`"
          />
        </div>
      </div>
    </template>
  </layout-a>
</template>

<style>
.projects {
  container-type: inline-size;
  container-name: projects;
}
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  container: projects;
}

@container projects (width > 700px) {
  .projects-grid {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}
</style>
