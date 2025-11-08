<script setup lang="ts">
const { data: projects } = await useFetch('/api/projects');
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
</script>

<template>
  <div class="main-layout site-grid">
    <projects-banner class="header" :image="activeCategory?.slug">
      <template #title>
        Project Sectors
      </template>
      {{ activeCategory?.title }}
    </projects-banner>
    <div class="catagories p-0 py-4 md:p-4">
      <div class="flex flex-col gap-2">
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
    <div class="projects">
      <div class="flex flex-col">
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
  </div>
</template>

<style scoped>
.main-layout {
  margin-top: 0;
  min-height: 100dvb;
  grid-template-rows: min-content min-content auto;
}

.header {
  grid-column: 1/-1;
  border-bottom: 1px solid var(--ui-border);
}

.catagories {
  grid-column: 1/-1;
  border-bottom: 1px solid var(--ui-border);
}

.projects {
  grid-column: 1/-1;
  border-bottom: 1px solid var(--ui-border);
  padding-bottom: calc(var(--spacing) * 4);
}

@media (min-width: 700px) {
  .main-layout {
    grid-template-rows: min-content auto;
  }

  .catagories {
    grid-column: 1/4;
    border-right: 1px solid var(--ui-border);
  }

  .projects {
    grid-column: 4/-1;
  }
}

@media (min-width: 1024px) {
  .catagories {
    grid-column: 1/6;
  }

  .projects {
    grid-column: 6/-1;
  }
}
</style>
