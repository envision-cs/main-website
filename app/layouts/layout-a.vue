<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt';

const route = useRoute();

const { data: services } = await useAsyncData(
  'services-list',
  () => $fetch('/api/services'),
  { default: () => [] },
);

function resolveImage(image: unknown) {
  if (typeof image === 'string')
    return image;
  const img = image as { url?: string; data?: { attributes?: { url?: string } } } | undefined;
  return img?.url || img?.data?.attributes?.url;
}

const categories = computed(() =>
  (services.value ?? [])
    .filter(service => Boolean(service?.param || service?.title))
    .map(service => ({
      title: service.title,
      slug: service.param ?? service.slug,
      image: resolveImage(service.image),
    })),
);

const activeCategory = computed<{ title: string; slug: string; image?: string }>(() => {
  return (
    categories.value.find(category => category.slug === route.params.services) ?? {
      title: 'All Services',
      slug: 'all',
    }
  );
});
</script>

<template>
  <div>
    <app-header />
    <UMain class="main-layout site-grid">
      <div class="header">
        <app-banner-b :image="activeCategory?.image">
          <template #title>
            Envision Services
          </template>
          {{ activeCategory.title }}
        </app-banner-b>
      </div>

      <aside class="categories p-0 py-4 md:p-4 h-full">
        <ul class="flex flex-col gap-2 sticky top-0">
          <li>
            <ULink to="/services">
              All Services
            </ULink>
          </li>
          <li v-for="category in categories" :key="category?.title || category?.slug">
            <ULink
              :to="{
                name: 'services-services',
                params: { services: category.slug },
              }"
              class="text-left"
            >
              {{ category.title }}
            </ULink>
          </li>
        </ul>
      </aside>

      <section class="projects">
        <slot />
      </section>
    </UMain>
    <SpeedInsights />
    <app-footer />
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

.categories {
  grid-column: 1/-1;
  border-bottom: 1px solid var(--ui-border);
  padding-inline: calc(var(--spacing) * 4);
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

  .categories {
    grid-column: 1/4;
    border-right: 1px solid var(--ui-border);
  }

  .projects {
    grid-column: 4/-1;
  }
}

@media (min-width: 1024px) {
  .categories {
    grid-column: 1/6;
  }

  .projects {
    grid-column: 6/-1;
  }
}
</style>
