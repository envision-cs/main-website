<script setup lang="ts">
interface ServiceCategory {
  title: string;
  slug: string;
  image?: string;
  position?: string;
  headline: string;
  description: string;
  cta: string;
  link: string;
}

const route = useRoute();

const { services } = await useServicesList();
const currentServiceSlug = computed(() => route.path.match(/^\/services\/([^/]+)$/)?.[1] ?? '');

const categories = computed<ServiceCategory[]>(() =>
  services.value
    .filter((service) => Boolean(service?.title))
    .map((service) => ({
      headline: service.headline ?? service.title,
      description: service.description ?? '',
      title: service.title,
      slug: service.slug,
      image: service.image,
      position: service.imageposition,
      cta: service.cta ?? 'Start your project',
      link: service.link ?? '/contact',
    })),
);

const activeCategory = computed<ServiceCategory>(() => {
  return (
    categories.value.find((category) => category.slug === currentServiceSlug.value) ?? {
      headline: "Let's Build",
      description:
        'Construction services shaped for complex schedules, demanding coordination, and institution-grade execution.',
      title: 'Envision Services',
      cta: 'Lets get to work',
      link: '/contact',
      slug: 'all',
      image: '/main-website/AG_site_e29decc2a5.jpg?updatedAt=1780675889560',
    }
  );
});

function getImageKitPath(url?: string) {
  if (!url) return undefined;

  return url.replace('https://ik.imagekit.io/pnixsw7lg', '').split('?')[0];
}
</script>

<template>
  <div>
    <main-navigation />
    <div class="header">
      <banner-b
        :position="activeCategory.position"
        :image="getImageKitPath(activeCategory?.image)"
        :cta="activeCategory.cta"
        cta-to="/contact"
      >
        <template #eyebrow>
          {{ activeCategory.title }}
        </template>

        {{ activeCategory.headline }}

        <template #body>
          {{ activeCategory.description }}
        </template>
      </banner-b>
    </div>
    <main>
      <slot />
    </main>
    <app-footer />
  </div>
</template>

<style scoped>
.main-layout {
  margin-top: 0;
  min-height: 100dvb;
}

.header {
  grid-column: 1/-1;
}

.categories {
  grid-column: 1/-1;
  padding-inline: calc(var(--spacing) * 4);
}

.projects {
  grid-column: 1/-1;
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
