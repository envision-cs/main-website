<script setup lang="ts">
interface Category {
  name: string;
  slug: string;
  image?: string;
}

defineProps<{
  categories: Category[];
}>();

const route = useRoute();

const currentPath = computed(() => route.path.replace(/\/$/, "") || "/");
</script>

<template>
  <nav class="category-nav" aria-label="Project categories">
    <ul class="category-nav__list" role="list">
      <li class="category-nav__item">
        <NuxtLink
          to="/projects"
          class="category-nav__link"
          exact-active-class="is-active"
          :aria-current="currentPath === '/projects' ? 'page' : undefined"
        >
          All
        </NuxtLink>
      </li>
      <li v-for="category in categories" :key="category.slug" class="category-nav__item">
        <NuxtLink
          :to="`/projects/${category.slug}`"
          class="category-nav__link"
          exact-active-class="is-active"
          :aria-current="currentPath === `/projects/${category.slug}` ? 'page' : undefined"
        >
          {{ category.name }}
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.category-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  background: var(--color-envision-gray-900);
  border-bottom: 1px solid color-mix(in oklch, var(--color-envision-blue-900) 60%, transparent);
  overflow-x: auto;
  scrollbar-width: none;
}

.category-nav::-webkit-scrollbar {
  display: none;
}

.category-nav__list {
  display: flex;
  align-items: stretch;
  margin: 0;
  padding: 0;
  list-style: none;
  min-width: max-content;
}

.category-nav__item {
  display: flex;
}

.category-nav__link {
  display: inline-flex;
  align-items: center;
  padding-inline: 1.25rem;
  padding-block: 0.875rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  color: color-mix(in oklch, white 48%, transparent);
  border-bottom: 3px solid transparent;
  white-space: nowrap;
  transition:
    color 160ms ease,
    border-color 160ms ease;
}

.category-nav__link:hover {
  color: white;
}

.category-nav__link.is-active {
  color: white;
  border-bottom-color: var(--color-envision-green-500);
}

.category-nav__link:focus-visible {
  outline: 2px solid var(--color-envision-green-500);
  outline-offset: -2px;
  color: white;
}

@media (prefers-reduced-motion: reduce) {
  .category-nav__link {
    transition: none;
  }
}
</style>
