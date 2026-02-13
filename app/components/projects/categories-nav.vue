<script setup lang="ts">
type Category = {
  name: string;
  slug: string;
  image?: string;
};

const props = defineProps<{
  categories: Category[];
}>();

const route = useRoute();

function normalizePath(path: string): string {
  if (!path)
    return '/';

  if (path.length > 1 && path.endsWith('/'))
    return path.slice(0, -1);

  return path;
}

const currentPath = computed(() => normalizePath(route.path));

function isCurrentLink(path: string): boolean {
  return currentPath.value === normalizePath(path);
}
</script>

<template>
  <nav class="catagories px-4 py-4 md:p-4 h-full" aria-label="Project categories">
    <ul class="flex flex-col gap-2 sticky top-0" role="list">
      <li>
        <ULink
          to="/projects"
          class="text-left"
          :aria-current="isCurrentLink('/projects') ? 'page' : undefined"
        >
          All
        </ULink>
      </li>
      <li v-for="category in props.categories" :key="category.slug">
        <ULink
          :to="{
            name: 'projects-id',
            params: { id: category.slug },
          }"
          class="text-left"
          :aria-current="isCurrentLink(`/projects/${category.slug}`) ? 'page' : undefined"
        >
          {{ category.name }}
        </ULink>
      </li>
      <li>
        <ULink
          to="/projects/beck-envision"
          class="text-left"
          :aria-current="isCurrentLink('/projects/beck-envision') ? 'page' : undefined"
        >
          Beck/Envision
        </ULink>
      </li>
    </ul>
  </nav>
</template>
