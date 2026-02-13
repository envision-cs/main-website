<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

import { useBreakpoints, useEventListener } from '@vueuse/core';

const config = useAppConfig();
const { services } = await useServicesList();

const serviceMenuItems = computed<NavigationMenuItem[]>(() =>
  services.value.map(service => ({
    label: service.title,
    to: `/services/${service.slug}`,
    image: service.image,
  })),
);

const items = computed<NavigationMenuItem[]>(() =>
  config.navigationMenuItems.map((item) => {
    if (item.label !== 'Services')
      return item;

    return {
      ...item,
      to: '/services',
      children: serviceMenuItems.value,
    };
  }),
);

const mainMenuRef = ref<HTMLDialogElement | null>(null);
const subMenuRef = ref<HTMLDialogElement | null>(null);
const menuToggleRef = ref<HTMLButtonElement | null>(null);
const submenuCloseRef = ref<HTMLButtonElement | null>(null);
const firstMainLinkRef = ref<HTMLElement | null>(null);
const firstSubLinkRef = ref<HTMLElement | null>(null);

const {
  isOpen: isMainOpen,
  openMenu: openMain,
  closeMenu: closeMain,
} = useAnimatedDialog(mainMenuRef);

const {
  isOpen: isSubOpen,
  openMenu: openSub,
  direction: subDirection,
  closeMenu: closeSub,
} = useAnimatedDialog(subMenuRef);

const breakpoints = useBreakpoints({
  laptop: 1024,
});

const isLaptop = breakpoints.greater('laptop');

useEventListener(document, 'keydown', (e) => {
  if (e.key === 'Escape') {
    if (isSubOpen.value) {
      closeSub();
      submenuCloseRef.value?.focus();
      return;
    }
    if (isMainOpen.value) {
      closeMain();
      menuToggleRef.value?.focus();
    }
  }
});

useEventListener<MouseEvent>(mainMenuRef, 'click', (event) => {
  if (!event.target)
    return;

  if ((event.target as HTMLElement).nodeName === 'DIALOG') {
    closeMain();
  }
});

useEventListener<MouseEvent>(subMenuRef, 'click', (event) => {
  if (!event.target)
    return;

  if ((event.target as HTMLElement).nodeName === 'DIALOG') {
    closeSub();
  }
});

const subMenuItems = ref<NavigationMenuItem[]>([]);

function handleOpen(children: unknown) {
  if (isLaptop.value) {
    subDirection.value = 'top';
  }
  else {
    subDirection.value = 'bottom';
  }
  openSub();
  subMenuItems.value = children as NavigationMenuItem[];
  nextTick(() => {
    firstSubLinkRef.value = subMenuRef.value?.querySelector('a, button');
    firstSubLinkRef.value?.focus();
  });
}

function getSubMenuImage(item: NavigationMenuItem): string {
  if (typeof item.image === 'string' && item.image.length > 0)
    return item.image;

  return 'projects-all.jpg';
}

const route = useRoute();
watch(() => route.path, () => {
  closeMain();
  closeSub();
});

watch(isMainOpen, () => {
  if (isMainOpen.value)
    return;
  if (isSubOpen.value) {
    closeSub();
  }
}, { immediate: true });

watch(isMainOpen, (open) => {
  if (open) {
    nextTick(() => {
      firstMainLinkRef.value = mainMenuRef.value?.querySelector('a, button');
      firstMainLinkRef.value?.focus();
    });
  }
});

const { y } = useWindowScroll();
const { height } = useWindowSize();

const showHeader = ref(true);
const isFixed = ref(false);
const isWhite = ref(false);

watch(y, (newY, oldY) => {
  if (typeof oldY === 'undefined')
    return;

  const heroHeight = height.value || 0;
  const isScrollingUp = newY < oldY;
  const isPastHero = newY > heroHeight;

  if (isPastHero) {
    isFixed.value = true;
    isWhite.value = true;
    showHeader.value = isScrollingUp;
  }
  else {
    isFixed.value = false;
    isWhite.value = false;
    showHeader.value = true;
  }
});
</script>

<template>
  <header
    :class="{
      'header--fixed': isFixed,
      'header--hidden': !showHeader,
      'header--white': isWhite,
    }"
  >
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
      <button
        ref="menuToggleRef"
        type="button"
        class="menu-toggle"
        :class="{ 'menu-toggle--dark': isWhite }"
        aria-haspopup="dialog"
        aria-controls="main-menu"
        :aria-expanded="isMainOpen"
        @click="openMain"
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
    </div>
  </header>

  <dialog
    id="main-menu"
    ref="mainMenuRef"
    role="dialog"
    aria-modal="true"
    aria-labelledby="main-menu-title"
    class="menu"
    @keydown.esc="closeMain"
  >
    <h2 id="main-menu-title" class="sr-only">
      Main navigation
    </h2>
    <div class="main-menu__header">
      <div class="main-menu__items">
        <nav aria-label="Primary">
          <app-navigation-menu-list :items="items" @open="(obj) => handleOpen(obj.children)" />
        </nav>
      </div>
      <div class="main-menu__close">
        <button
          type="button"
          class="close-btn"
          @click="closeMain"
        >
          <span class="sr-only">Close menu</span>
          <Icon
            name="i-lucide-x"
            size="24"
            class="fill-current"
            aria-hidden="true"
          />
        </button>
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
          image="/contact.jpg"
          aspect-ratio="3/1"
          heading="heading-sm"
        />
      </div>
    </div>
    <button
      ref="submenuCloseRef"
      type="button"
      class="mobileClose"
      @click="closeMain"
    >
      Close menu
    </button>
  </dialog>

  <dialog
    ref="subMenuRef"
    class="sub-menu"
    role="dialog"
    aria-modal="true"
    aria-label="Sub menu"
    @keydown.esc="closeSub"
  >
    <button
      type="button"
      class="mobileClose"
      @click="closeSub"
    >
      Close submenu
    </button>
    <ul class="sub-menu-grid" role="list">
      <li
        v-for="item in subMenuItems"
        :key="item.label"
        class="sub-menu-item"
      >
        <NuxtLink
          :to="item.to"
          class="submenu-card"
          :aria-label="item.label"
        >
          <NuxtImg
            :src="getSubMenuImage(item)"
            width="600"
            height="800"
            class="submenu-card__image"
            :alt="item.label"
          />
          <div class="submenu-card__content">
            <span class="submenu-card__title">{{ item.label }}</span>
            <span class="submenu-card__meta">
              View service
              <UIcon name="i-lucide-arrow-right" aria-hidden="true" />
            </span>
          </div>
        </NuxtLink>
      </li>
    </ul>
  </dialog>
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
  transition:
    transform 0.3s ease,
    background-color 0.3s ease;
}

header.header--fixed {
  position: fixed;
}

header.header--hidden {
  transform: translateY(-100%);
}

header.header--white {
  background-color: var(--color-white);
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

.close-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--ui-border);
  padding: 0.55rem 0.9rem;
  border-radius: calc(var(--ui-radius));
  background: color-mix(in srgb, var(--ui-surface) 90%, white);
  color: inherit;
}

.menu-toggle:focus-visible,
.close-btn:focus-visible,
.mobileClose:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 3px;
}

.menu {
  display: none;
}

.menu:open {
  display: flex;
  flex-direction: column;
  position: fixed;
  inset: 0;
  transform-origin: top right;
  transition-behavior: allow-discrete;
  z-index: 110;

  height: min(70svh, 500px);
  max-width: 100dvi;
  width: 100dvi;

  @media (min-width: 1024px) {
    inset-block-start: calc(var(--spacing) * 2);
    inset-inline-start: auto;
    inset-inline-end: calc(var(--spacing) * 2);
    height: calc(100vh - calc(var(--spacing) * 8));
    width: calc(50vw - calc(var(--spacing) * 4));
  }
}

.menu::backdrop {
  background: black;
  opacity: 0.25;
}

@keyframes open {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes close {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
  }
}

.main-menu__header {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  border-bottom: --_border;
}

.main-menu__items {
  flex: 1;
  border-right: --_border;
  padding-left: calc(var(--spacing) * 2);

  :last-child {
    padding-bottom: calc(var(--spacing) * 2);
  }

  @media (min-width: 1024px) {
    padding-top: calc(var(--spacing) * 4);
    padding-left: calc(var(--spacing) * 4);
  }
}

.main-menu__close {
  flex-shrink: 0;
  padding: calc(var(--spacing) * 4);
}

.main-menu__body {
  display: flex;
  flex-direction: column;
  margin-top: auto;
  border-top: --_border;
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

  :first-child {
    margin-right: calc(var(--spacing) * 1);
  }
}

.main-menu__social {
  display: flex;
  gap: calc(var(--spacing) * 4);
}

.sub-menu {
  display: none;
}

.sub-menu:open {
  display: flex;
  flex-direction: column;
  position: fixed;
  inset-block-start: auto;
  inset-inline-end: calc(var(--spacing) * 2);
  inset-block-end: calc(var(--spacing) * 2);
  transform-origin: bottom left;
  transition-behavior: allow-discrete;
  border-radius: calc(var(--ui-radius));
  padding: calc(var(--spacing) * 2) calc(var(--spacing) * 2);
  z-index: 110;

  height: max(70svh, 500px);
  max-width: 100dvi;
  width: 100dvi;

  @media (min-width: 1024px) {
    transform-origin: top left;
    inset-block-start: calc(var(--spacing) * 2);
    inset-inline-end: auto;
    inset-inline-start: calc(var(--spacing) * 2);
    padding: calc(var(--spacing) * 2) calc(var(--spacing) * 2);
    height: calc(100vh - calc(var(--spacing) * 8));
    width: calc(50vw - calc(var(--spacing) * 4));
  }
}

.sub-menu-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: calc(var(--spacing) * 2);
}

.sub-menu-item {
  min-width: 0;
}

.submenu-card {
  --submenu-title-height: 3.5rem;
  position: relative;
  display: block;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  isolation: isolate;
  color: var(--ui-text-inverted);
  border-radius: calc(var(--ui-radius));
  outline: 1px solid rgb(255 255 255 / 0.2);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(to top, rgb(0 0 0 / 0.82) 0%, rgb(0 0 0 / 0.45) 45%, rgb(0 0 0 / 0.05) 100%);
  }
}

.submenu-card__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
  filter: blur(0);
  transform: scale(1);
  transition:
    transform 0.5s var(--ease-base),
    filter 0.5s var(--ease-base);
}

.submenu-card__content {
  position: absolute;
  inset: auto 0 0;
  z-index: 2;
  display: grid;
  gap: 0.75rem;
  padding: 1rem;
  transform: translateY(calc(100% - var(--submenu-title-height)));
  transition: transform 0.5s var(--ease-base);
}

.submenu-card__title {
  font-size: var(--text-lg);
  font-weight: 600;
  line-height: 1.2;
  text-wrap: balance;
}

.submenu-card__meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid rgb(255 255 255 / 0.35);
  padding-top: 0.75rem;
  opacity: 0;
  transform: translateY(100%);
  transition:
    transform 0.5s var(--ease-base),
    opacity 0.3s var(--ease-base);
  transition-delay: 140ms;
}

.submenu-card:hover .submenu-card__image,
.submenu-card:focus-visible .submenu-card__image {
  transform: scale(1.08);
  filter: blur(5px);
}

.submenu-card:hover .submenu-card__content,
.submenu-card:focus-visible .submenu-card__content {
  transform: translateY(0);
}

.submenu-card:hover .submenu-card__meta,
.submenu-card:focus-visible .submenu-card__meta {
  opacity: 1;
  transform: translateY(0);
}

.submenu-card:focus-visible {
  outline: 2px solid var(--ui-primary);
  outline-offset: 3px;
}

.sub-menu::backdrop {
  background: black;
  opacity: 0.25;
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
  .menu,
  .sub-menu,
  .menu-toggle,
  .close-btn,
  .mobileClose,
  .submenu-card,
  .submenu-card__image,
  .submenu-card__content,
  .submenu-card__meta {
    transition: none !important;
    animation: none !important;
  }
}
</style>
