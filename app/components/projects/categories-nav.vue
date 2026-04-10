<script setup lang="ts">
import {
  SelectContent,
  SelectItem,
  SelectItemText,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectValue,
  SelectViewport,
} from "reka-ui";

interface Category {
  name: string;
  slug: string;
  image?: string;
}

const props = defineProps<{
  categories: Category[];
}>();

const route = useRoute();

function normalizePath(path: string): string {
  if (!path) {
    return "/";
  }

  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }

  return path;
}

const options = computed(() => {
  const categoryOptions = props.categories.map((category) => ({
    label: category.name,
    value: `/projects/${category.slug}`,
  }));

  return [
    { label: "All", value: "/projects" },
    ...categoryOptions,
    { label: "Beck/Envision", value: "/projects/beck-envision" },
  ];
});

const selectedPath = computed(() => normalizePath(route.path));

async function handleValueChange(value: string | undefined) {
  const nextPath = normalizePath(value ?? "");

  if (!nextPath || nextPath === selectedPath.value) {
    return;
  }

  await navigateTo(nextPath);
}
</script>

<template>
  <nav class="project-category-picker" aria-label="Project categories">
    <div class="project-category-picker__field">
      <span class="project-category-picker__label">Project category</span>
      <SelectRoot :model-value="selectedPath" @update:model-value="handleValueChange">
        <SelectTrigger class="project-category-picker__trigger" aria-label="Project category">
          <SelectValue class="project-category-picker__value" placeholder="Select a category" />
          <UIcon
            name="i-lucide-chevron-down"
            class="project-category-picker__icon"
            aria-hidden="true"
          />
        </SelectTrigger>

        <SelectPortal>
          <SelectContent
            class="project-category-picker__content"
            position="popper"
            :side-offset="8"
          >
            <SelectViewport class="project-category-picker__viewport">
              <SelectItem
                v-for="option in options"
                :key="option.value"
                :value="option.value"
                class="project-category-picker__item"
              >
                <SelectItemText>{{ option.label }}</SelectItemText>
              </SelectItem>
            </SelectViewport>
          </SelectContent>
        </SelectPortal>
      </SelectRoot>
    </div>
  </nav>
</template>

<style scoped>
.project-category-picker {
  position: relative;
  padding: 0;
}

.project-category-picker__field {
  display: inline-grid;
  gap: 0;
}

.project-category-picker__label {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  border: 0;
}

.project-category-picker__trigger {
  width: 100%;
  min-width: 5.25rem;
  min-height: 2.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding-inline: 0.875rem 0.625rem;
  border: 1px solid rgb(255 255 255 / 0.28);
  border-radius: 0.25rem;
  background: var(--color-envision-gray-900);
  color: var(--color-white);
  text-align: left;
  transition:
    border-color 160ms var(--ease-gentle),
    background-color 160ms var(--ease-gentle),
    box-shadow 160ms var(--ease-gentle);
}

.project-category-picker__trigger:hover,
.project-category-picker__trigger[data-state="open"] {
  border-color: rgb(255 255 255 / 0.48);
  background: color-mix(in srgb, var(--color-envision-gray-900) 88%, white);
}

.project-category-picker__trigger:focus-visible {
  outline: 2px solid var(--color-envision-green-300);
  outline-offset: 2px;
}

.project-category-picker__value {
  flex: 1;
  font-size: 0.95rem;
  line-height: 1.2;
}

.project-category-picker__icon {
  flex-shrink: 0;
  color: rgb(255 255 255 / 0.82);
}

.project-category-picker__content {
  min-width: var(--reka-select-trigger-width);
  margin-top: 0.5rem;
  border: 1px solid rgb(255 255 255 / 0.16);
  border-radius: 0.25rem;
  background: color-mix(in srgb, var(--color-envision-gray-900) 96%, black);
  color: var(--color-white);
  box-shadow: 0 12px 28px rgb(0 0 0 / 0.28);
  overflow: hidden;
}

.project-category-picker__viewport {
  padding-block: 0.375rem;
}

.project-category-picker__item {
  display: flex;
  align-items: center;
  min-height: 2.5rem;
  padding-inline: 1rem;
  cursor: default;
  font-size: 1rem;
  line-height: 1.2;
}

.project-category-picker__item[data-highlighted] {
  outline: none;
  background-color: color-mix(in srgb, var(--color-envision-blue-800) 82%, white);
}

.project-category-picker__item[data-state="checked"] {
  font-weight: 500;
  background-color: color-mix(in srgb, var(--color-envision-blue-700) 78%, black);
}
</style>
