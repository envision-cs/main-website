<script setup lang="ts">
const { data } = await useAsyncData(
  'page-data',
  async () => {
    try {
      const [projects, sectors] = await Promise.all([
        $fetch('/api/projects'),
        $fetch('/api/sectors'),
      ]);

      return { projects, sectors };
    }
    catch (err) {
      console.error('API error:', err);
      return null;
    }
  },
  { default: () => ({ projects: null, sectors: null }) },
);

const route = useRoute();

const categories = computed<{ name: string; slug: string; image?: string }[]>(() => {
  const set = new Map<string, { name: string; slug: string; image?: string }>();

  if (!data.value?.sectors?.length)
    return Array.from(set.values());

  for (const sector of data.value.sectors) {
    set.set(sector.slug, { name: sector.name, slug: sector.slug, image: sector.image?.url });
  }

  return Array.from(set.values());
});

const activeCategory = computed<{ name: string; slug: string; image?: string } | undefined>(() => {
  return categories.value.find(
    category => category.slug === route.params.id,
  );
});

const activeProjects = computed(() => {
  if (!data.value?.projects) {
    return [];
  }

  if (!activeCategory.value?.slug) {
    return data.value.projects;
  }

  return data.value.projects.filter(project => project.sector?.slug === activeCategory.value?.slug);
});

const bannerImage = computed(() => activeCategory.value?.image || 'projects-all.jpg');

definePageMeta({
  layout: 'none',
});
</script>

<template>
  <layout-a>
    <template #header-slot>
      <app-banner-b class="header" :image="bannerImage">
        <template #title>
          Projects
        </template>
        {{ activeCategory?.name || 'All' }}
      </app-banner-b>
    </template>
    <template #aside-slot>
      <projects-categories-nav :categories="categories" />
    </template>
    <template #main-slot>
      <div class="projects">
        <div class="projects-grid">
          <projects-card
            v-for="project in activeProjects"
            :key="project.id"
            :image="project.mainImage.url"
            :title="project.title"
            :location="project.location"
            :area="project.area"
            :completed="project.completed"
            :sector="project.sector.name"
            :to="`${project.sector.slug}/${project.slug}`"
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
