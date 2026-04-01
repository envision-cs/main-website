<script setup lang="ts">
const route = useRoute();

const { services } = await useServicesList();
const currentServiceSlug = computed(() => route.path.match(/^\/services\/([^/]+)$/)?.[1] ?? "");

const categories = computed(() =>
  services.value
    .filter((service) => Boolean(service?.title))
    .map((service) => ({
      title: service.title,
      slug: service.slug,
      image: service.image,
    })),
);

const activeCategory = computed<{ title: string; slug: string; image?: string }>(() => {
  return (
    categories.value.find((category) => category.slug === currentServiceSlug.value) ?? {
      title: "All Services",
      slug: "all",
      image: "https://ik.imagekit.io/pnixsw7lg/main-website/IMG_1915-2.jpg?updatedAt=1771214685134",
    }
  );
});
</script>

<template>
  <div>
    <app-header />
    <div class="header">
      <app-banner-b :image="activeCategory?.image">
        <template #title> Envision Services </template>
        {{ activeCategory.title }}
      </app-banner-b>
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
