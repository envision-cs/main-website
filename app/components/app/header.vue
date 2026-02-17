<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

import { useMediaQuery } from '@vueuse/core';

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
const subMenuItems = ref<NavigationMenuItem[]>([]);
const subMenuTitle = ref('Menu');

const isLaptop = useMediaQuery('(min-width: 1024px)');

const menuSlide = computed<{ mainMenu: string; subMenu: string }>(() => {
  return {
    mainMenu: isLaptop.value ? 'right' : 'top',
    subMenu: isLaptop.value ? 'left' : 'bottom',
  };
});

const slideoverUi = {
  overlay: 'bg-black/25',
  content: '',
  wrapper: 'bg-red-500',
  body: 'bg-red-500',
};

const mainNavigationUi = {
  root: '',
  list: 'w-full gap-1',
  item: 'w-full',
  link: 'w-full justify-between rounded-none px-0 py-2 text-xl leading-tight lg:text-2xl',
  linkLabel: 'text-current',
  linkTrailing: 'ml-auto',
};

const mainMenuItems = computed<NavigationMenuItem[]>(() => {
  return items.value.map((item) => {
    if (item.children?.length) {
      return {
        ...item,
        type: 'trigger',
        to: undefined,
        children: undefined,
        trailingIcon: 'i-lucide-chevron-right',
        onSelect: (event: Event) => {
          event.preventDefault();
          openSubMenu(item);
        },
      } satisfies NavigationMenuItem;
    }

    return {
      ...item,
      onSelect: () => closeAllMenus(),
    } satisfies NavigationMenuItem;
  });
});

function getSubMenuImage(item: NavigationMenuItem): string {
  if (typeof item.image === 'string' && item.image.length > 0)
    return item.image;

  return 'projects-all.jpg';
}

function getItemTo(item: NavigationMenuItem): string {
  if (typeof item.to === 'string' && item.to.length > 0)
    return item.to;

  return '#';
}

function openSubMenu(item: NavigationMenuItem) {
  const children = Array.isArray(item.children)
    ? item.children
    : [];

  if (!children.length)
    return;

  subMenuItems.value = children as NavigationMenuItem[];
  subMenuTitle.value = item.label || 'Menu';
  isSubOpen.value = true;
}

function closeSubMenu() {
  isSubOpen.value = false;
}

function closeAllMenus() {
  isMainOpen.value = false;
  isSubOpen.value = false;
}

const route = useRoute();
watch(() => route.path, () => {
  closeAllMenus();
});

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
        :name="isWhite ? 'logos:envision' : 'logos:envision-white'"
        size="30"
        alt="envision construction logo"
      />
    </NuxtLink>
    <div class="flex items-center gap-2">
      <USlideover
        v-model:open="isMainOpen"
        :side="menuSlide.mainMenu"
        inset
        :close="false"
        :ui="slideoverUi"
      >
        <button
          type="button"
          class="menu-toggle"
          :class="{ 'menu-toggle--dark': isWhite }"
        >
          <span class="sr-only">Open main menu</span>
          <app-typography tag="p" variant="text-md">
            menu
          </app-typography>
          <Icon
            name="i-lucide-menu"
            size="24"
            class="menu-btn fill-current"
          />
        </button>

        <template #content>
          <div class="menu-panel">
            <div class="main-menu__header">
              <div class="main-menu__items">
                <UNavigationMenu
                  orientation="vertical"
                  variant="link"
                  :items="mainMenuItems"
                  :ui="mainNavigationUi"
                />
              </div>
              <div class="main-menu__close">
                <UButton
                  icon="i-lucide-x"
                  color="neutral"
                  variant="outline"
                  aria-label="Close menu"
                  @click="closeAllMenus"
                />
              </div>
            </div>

            <div class="main-menu__body">
              <div class="main-menu__secondary" aria-label="Quick links">
                <div class="main-menu__secondary-items">
                  <app-navigation-secondary-link to="#">
                    Locations
                  </app-navigation-secondary-link>
                </div>
                <div class="main-menu__social" aria-label="Social links">
                  <UButton
                    icon="i-lucide-instagram"
                    size="md"
                    to="https://www.instagram.com/envisioncs_/"
                    color="neutral"
                    variant="outline"
                    aria-label="Instagram"
                  />
                  <UButton
                    icon="i-lucide-linkedin"
                    size="md"
                    color="neutral"
                    to="https://www.linkedin.com/company/envision-cs/posts/?feedView=all"
                    variant="outline"
                    aria-label="LinkedIn"
                  />
                  <UButton
                    icon="i-lucide-facebook"
                    size="md"
                    to="https://www.facebook.com/envisioncstampa"
                    color="neutral"
                    variant="outline"
                    aria-label="Facebook"
                  />
                </div>
              </div>
              <div class="px-2 pb-2">
                <app-display-card
                  link="/contact"
                  title="Contact"
                  class="w-full"
                  :title-offset="-24"
                  :image="props.contactImage"
                  aspect-ratio="3/1"
                  heading="heading-sm"
                />
              </div>
            </div>

            <button
              type="button"
              class="mobileClose"
              aria-label="Close menu"
              @click="closeAllMenus"
            />
          </div>
        </template>
      </USlideover>
    </div>
  </header>

  <USlideover
    v-model:open="isSubOpen"
    :side="menuSlide.subMenu"
    inset
    :close="false"
    :ui="slideoverUi"
  >
    <template #content>
      <div class="sub-menu-panel">
        <div class="sub-menu__header">
          <UButton
            icon="i-lucide-chevron-left"
            color="neutral"
            variant="ghost"
            aria-label="Back to main menu"
            @click="closeSubMenu"
          />
          <app-typography
            tag="p"
            variant="text-sm"
            class="sub-menu__title"
          >
            {{ menuSlide.subMenu }}
            {{ subMenuTitle }}
          </app-typography>
          <UButton
            icon="i-lucide-x"
            color="neutral"
            variant="ghost"
            aria-label="Close menu"
            @click="closeAllMenus"
          />
        </div>

        <ul class="sub-menu-grid" role="list">
          <li
            v-for="item in subMenuItems"
            :key="item.label"
            class="sub-menu-item"
          >
            <app-reveal-card
              :to="getItemTo(item)"
              :aria-label="item.label"
              :image="getSubMenuImage(item)"
              :alt="item.label"
              aspect-ratio="16/9"
              :title-offset="-16"
              :meta-fade="true"
              class="submenu-reveal-card"
              @click="closeAllMenus"
            >
              <template #title>
                <app-typography tag="h3" variant="heading-sm">
                  {{ item.label }}
                </app-typography>
              </template>
              <template #meta>
                <span class="submenu-reveal-card__meta">
                  View service
                  <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
                </span>
              </template>
            </app-reveal-card>
          </li>
        </ul>
      </div>
    </template>
  </USlideover>
</template>

<style scoped>
header {
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 100;
  justify-content: space-between;
  display: flex;
  padding: calc(var(--spacing) * 2);
  background-color: transparent;
  transition: background-color 0.2s ease;
}

header.header--white {
  background-color: var(--color-white);
  border-bottom: 1px solid var(--ui-border);
}

.logo {
  margin-left: calc(var(--spacing) * 4);
}

.menu-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
  color: white;
  background: transparent;
  border: 1px solid transparent;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background-color 0.2s ease;
}

.menu-toggle--dark {
  color: var(--color-neutral-900);
}

.menu-toggle:focus-visible,
.mobileClose:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}

.menu-panel,
.sub-menu-panel {
  display: flex;
  flex-direction: column;
  max-width: 100dvi;
  height: max(70svh, 500px);

  @media (min-width: 1024px) {
    max-width: calc(60vw - calc(var(--spacing) * 4));
    height: calc(100vh - calc(var(--spacing) * 8));
  }
}

.main-menu__header {
  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  align-items: stretch;
  border-bottom: 1px solid var(--ui-border);
}

.main-menu__header > button {
}

.main-menu__items {
  width: 100%;
  border-right: 1px solid var(--ui-border);
  padding-left: calc(var(--spacing) * 2);

  @media (min-width: 1024px) {
    padding-top: calc(var(--spacing) * 4);
    padding-left: calc(var(--spacing) * 4);
  }
}

.main-menu__close {
  padding: calc(var(--spacing) * 4);
}

.main-menu__body {
  display: flex;
  flex-direction: column;
  margin-top: auto;
  border-top: 1px solid var(--ui-border);
}

.main-menu__secondary {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  padding: calc(var(--spacing) * 4);
}

.main-menu__secondary-items {
  display: flex;
  gap: calc(var(--spacing) * 1);
  flex-wrap: wrap;
  line-height: 1;
}

.main-menu__social {
  display: flex;
  gap: calc(var(--spacing) * 4);
}

.sub-menu__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: calc(var(--spacing) * 2);
  border-bottom: 1px solid var(--ui-border);
}

.sub-menu__title {
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.sub-menu-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(var(--spacing) * 2);
  padding: calc(var(--spacing) * 2);

  @media (min-width: 900px) {
    grid-template-columns: 1fr 1fr;
  }
}

.sub-menu-item {
  min-width: 0;
}

.submenu-reveal-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.mobileClose {
  height: calc(var(--spacing) * 2);
  width: 50%;
  margin-inline: auto;
  background: var(--color-neutral-500);
  border-radius: calc(var(--ui-radius));
  margin-block: calc(var(--spacing) * 4);
  color: white;
  border: 1px solid transparent;
  padding: 0.5rem 0.75rem;
  text-align: center;

  @media (min-width: 1024px) {
    display: none;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

@media (prefers-reduced-motion: reduce) {
  header,
  .menu-toggle,
  .mobileClose {
    transition: none !important;
    animation: none !important;
  }
}
</style>
