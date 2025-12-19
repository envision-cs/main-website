<script setup  lang="ts">
const route = useRoute();

const { data } = useFetch(`/api/services`, {
  key: 'services',
});

const categories = computed<{ title: string; slug: string }[]>(() => {
  const set = new Map<string, { title: string; slug: string }>();

  if (!data.value)
    return Array.from(set.values());

  for (const service of data.value) {
    set.set(service.param, {
      title: service.title,
      slug: service.param,
      image: service.image,
    });
  }

  return Array.from(set.values());
});

const activeCategory = computed<{ title: string; slug: string } | undefined>(() => {
  const title = categories.value.find(
    category => category.slug === route.params.services,
  );
  return title || { title: 'All Services', slug: '' };
});
</script>

<template>
  <div>
    <app-header />
    <UMain :style="mainStyle">
      <layout-a>
        <template #header-slot>
          <app-banner-b class="header" :image="activeCategory?.image">
            <template #title>
              Envision Services
            </template>
            {{ activeCategory.title }}
          </app-banner-b>
        </template>
        <template #aside-slot>
          <div class="catagories p-0 py-4 md:p-4 h-full">
            <ul class="flex flex-col gap-2 sticky top-0">
              <li>
                <ULink to="/services">
                  All Services
                </ULink>
              </li>
              <li
                v-for="catagory in categories"
                :key="catagory.title"
              >
                <ULink
                  :to="{
                    name: 'services-services',
                    params: { services: catagory.slug },
                  }"
                  class="text-left"
                >
                  {{ catagory.title }}
                </ULink>
              </li>
            </ul>
          </div>
        </template>
        <template #main-slot>
          <slot />
        </template>
      </layout-a>
    </UMain>
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
