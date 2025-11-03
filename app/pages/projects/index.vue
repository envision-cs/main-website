<script setup lang="ts">
const { data: projects } = await useFetch('/api/projects');

const catagories = computed(() => {
  const set = new Set();
  set.add('All');
  if (!projects.value)
    return ['All'];
  for (const project of projects.value) {
    set.add(project.sector);
  }
  return Array.from(set);
});
</script>

<template>
  <div class="main-layout site-grid">
    <projects-banner class="header">
      Project Sectors
    </projects-banner>
    <div class="catagories">
      Categories
      {{ catagories }}
    </div>
    <div class="projects">
      projects
      <div class="flex flex-col gap-4">
        <NuxtLink
          v-for="project in projects"
          :key="project.id"
          :to="project.path"
        >
          {{ project.title }}
        </NuxtLink>
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
