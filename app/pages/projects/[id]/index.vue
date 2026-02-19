<script setup lang="ts">
const { formatMonthYear } = useFormatDate();

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
                  <app-typography tag="p" variant="eyebrow-md">
                    Location
                  </app-typography>
                  <app-typography tag="p">
                    {{ project.location }}
                  </app-typography>
                </li>
                <li v-if="project.area">
                  <app-typography tag="p" variant="eyebrow-md">
                    Area
                  </app-typography>
                  <app-typography tag="p">
                    {{ project.area }}
                  </app-typography>
                </li>
                <li v-if="project.completed">
                  <app-typography tag="p" variant="eyebrow-md">
                    Completed
                  </app-typography>
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
