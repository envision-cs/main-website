<script setup lang="ts">
const { find } = useStrapi();
const { data } = await useAsyncData('page-data', async () => {
  try {
    const [projectRes, sectorsRes] = await Promise.all([
      find('projects', { populate: '*' }),
      find('sectors', { populate: '*' }),
    ]);

    return {
      projects: projectRes.data,
      sectors: sectorsRes.data,
    };
  }
  catch (err) {
    console.error('Strapi error:', err);
    return null;
  }
}, { default: () => ({ projects: null, sectors: null }) });

const route = useRoute();

const categories = computed<{ title: string; slug: string }[]>(() => {
  const set = new Map<string, { name: string; slug: string; image: string }>();

  // Always include “All”
  set.set('all', { name: 'All', slug: 'all', image: 'https://ik.imagekit.io/pnixsw7lg/strapi-uploads/celestar-headquarters-01.jpg' });

  if (!data.value.sectors.length)
    return Array.from(set.values());

  for (const sector of data.value.sectors) {
    set.set(sector.slug, { name: sector.name, slug: sector.slug, image: sector.image.url });
  }

  return Array.from(set.values());
});

const activeCategory = computed<{ title: string; slug: string; image: string } | undefined>(() => {
  return categories.value.find(
    category => category.slug === route.params.id,
  );
});

const activeProjects = computed(() => {
  if (activeCategory.value?.slug === 'all') {
    return data.value.projects;
  }

  return data.value.projects.filter(project => project.sector.slug === activeCategory.value?.slug);
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
            :key="catagory.name"
            :to="{
              name: 'projects-id',
              params: { id: catagory.slug },
            }"
            class="text-left"
          >
            {{ catagory.name }}
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
            :image="project.mainImage.url"
            :title="project.title"
            :location="project.location"
            :area="project.area"
            :completed="project.completed"
            :sector="project.sector.name"
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
