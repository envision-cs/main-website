<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

const props = withDefaults(defineProps<{
  variant?: 'a' | 'b';
  contactImage?: string;
}>(), {
  variant: 'a',
  contactImage: 'https://ik.imagekit.io/pnixsw7lg/main-website/small_5000_acline_drive_office_01_20b859f5db.jpg?updatedAt=1770956670122',
});

const config = useAppConfig();
const items = computed<NavigationMenuItem[]>(() => {
  return (config.navigationMenuItems || []) as NavigationMenuItem[];
});

const isWhite = computed(() => props.variant === 'b');
const isMainOpen = ref(false);
const isSubOpen = ref(false);

watch(isMainOpen, (open) => {
  if (!open) {
    isSubOpen.value = false;
  }
});
</script>

<template>
  <header :class="{ 'header--white': isWhite }">
    <NuxtLink
      class="logo"
      to="/"
      aria-label="Envision home"
    >
      <Icon
        :name="isWhite ? 'logos:envision' : 'logos:envision'"
        size="30"
        alt="envision construction logo"
      />
    </NuxtLink>
    <div class="">
      <nav>
        <ul>
          <li v-for="item in items" :key="item.name">
            <NuxtLink :to="item.to || item.href || '/'">
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 100;
  justify-content: space-between;
  display: flex;
  flex-wrap: wrap;
  padding: calc(var(--spacing) * 2);
  background-color: transparent;
  transition: background-color 0.2s ease;
  color: #fff;
}

header.header--white {
  background-color: var(--color-white);
  border-bottom: 1px solid var(--ui-border);
}

.logo {
  margin-left: calc(var(--spacing) * 4);
}

ul {
  display: flex;
  text-transform: uppercase;
  gap: calc(var(--spacing) * 4);
}
</style>
