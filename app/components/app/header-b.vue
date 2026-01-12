<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui';

import { useBreakpoints, useEventListener } from '@vueuse/core';

const config = useAppConfig();
const items: NavigationMenuItem[] = config.navigationMenuItems;

const mainMenuRef = ref<HTMLDialogElement | null>(null);
const {
  isOpen: isMainOpen,
  openMenu: openMain,
  closeMenu: closeMain,
} = useAnimatedDialog(mainMenuRef);

const subMenuRef = ref<HTMLDialogElement | null>(null);
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
    if (isMainOpen.value || isSubOpen.value) {
      closeMain();
      closeSub();
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
}

watch(isMainOpen, () => {
  if (isMainOpen.value)
    return;
  if (isSubOpen.value) {
    closeSub();
  }
}, { immediate: true });
</script>

<template>
  <header>
    <NuxtLink class="logo" to="/">
      <Icon
        name="logos:envision"
        size="30"
        alt="envision construction logo"
      />
    </NuxtLink>
    <div class="flex items-center gap-2">
      <button
        variant="ghost"
        color="white"
        size="sm"
        class="flex gap-2"
        @click="openMain"
      >
        <app-typography
          tag="p"
          variant="text-md"
        >
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
    class="menu"
    @keydown.esc="closeMain"
  >
    <div class="main-menu__header">
      <div class="main-menu__items">
        <nav>
          <app-navigation-menu-list :items="items" @open="(obj) => handleOpen(obj.children)" />
        </nav>
      </div>
      <div class="main-menu__close">
        <UButton
          variant="outline"
          color="neutral"
          class="close-btn"
          @click="closeMain"
        >
          close
          <Icon
            name="i-lucide-x"
            size="24"
            class="fill-current"
          />
        </UButton>
      </div>
    </div>

    <div class="main-menu__body">
      <div class="main-menu__secondary">
        <div class="main-menu__secondary-items">
          <app-navigation-secondary-link to="#">
            Locations
          </app-navigation-secondary-link>
        </div>
        <div class="main-menu__social">
          <UButton
            icon="i-lucide-instagram"
            size="md"
            to="https://www.instagram.com/envisioncs_/"
            color="neutral"
            variant="outline"
          />
          <UButton
            icon="i-lucide-linkedin"
            size="md"
            color="neutral"
            to="https://www.linkedin.com/company/envision-cs/posts/?feedView=all"
            variant="outline"
          />
          <UButton
            icon="i-lucide-facebook"
            size="md"
            to="https://www.facebook.com/envisioncstampa"
            color="neutral"
            variant="outline"
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
      class="mobileClose"
      @drag="closeSub"
      @click="closeSub"
    />
  </dialog>

  <dialog
    ref="subMenuRef"
    class="sub-menu"
    role="dialog"
    @keydown.esc="closeSub"
  >
    <button
      class="mobileClose"
      @drag="closeSub"
      @click="closeSub"
    />
    <ul class="columns-2">
      <li v-for="item in subMenuItems" :key="item.label">
        <NuxtLink
          :to="item.to"
          class="overflow-hidden"
          fit="cover"
        >
          <NuxtImg
            :src="item.image"
            class=" object-cover w-full h-full"
          />
          {{ item.label }}
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
  background-color: var(--color-white);
  border-bottom: 1px solid var(--ui-border);
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

  ul {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: calc(var(--spacing) * 2);

    li {
      flex: 0 0 calc(50% - var(--spacing) * 1);
    }
  }
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

  @media (min-width: 1024px) {
    display: none;
  }
}
</style>
