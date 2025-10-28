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

const subMenuItems = ref<NavigationMenuItem[]>();

function handleOpen(children: NavigationMenuItem[]) {
  if (isLaptop.value) {
    subDirection.value = 'top';
  }
  else {
    subDirection.value = 'bottom';
  }
  openSub();
  subMenuItems.value = children;
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
        name="logos:envision-white"
        size="32"
        alt="envision construction logo"
      />
    </NuxtLink>
    <UButton
      variant="outline"
      color="neutral"
      class="menu-btn"
      @click="openMain"
    >
      <Icon
        name="i-lucide-menu"
        size="24"
        class="fill-current"
      />
    </UButton>
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
          <app-navigation-menu-list :items="items" @open="({ children }) => handleOpen(children)" />
        </nav>
      </div>
      <div class="main-menu__close">
        <UButton
          variant="outline"
          color="neutral"
          class="menu-btn"
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
          secondary Items
        </div>
        <div class="main-menu__social">
          Social Icons
        </div>
      </div>
      <NuxtLink to="/contact" class="main-menu__contact">
        Contact
      </NuxtLink>
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
    <ul>
      <li v-for="item in subMenuItems" :key="item.label">
        <NuxtLink
          v-if="item.to"
          :to="item.to"
          class="h-full w-full"
        >
          {{ item.label }}
          <NuxtLink />
        </nuxtlink>
      </li>
    </ul>
  </dialog>
</template>

<style scoped>
header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
  justify-content: space-between;
  display: flex;
  padding: 0.5rem;
}

.logo {
  margin-inline: auto;
}

@keyframes growIn {
  from {
    transform: scale(0);
  }

  to {
    transform: scale(1);
  }
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
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  z-index: 1;

  height: min(70svh, 500px);
  max-width: 100dvi;
  width: 100dvi;

  @media (min-width: 1024px) {
    inset-block-start: 0.5rem;
    inset-inline-start: auto;
    inset-inline-end: 0.5rem;
    padding: 1.5rem 2rem;
    height: calc(100vh - 2rem);
    width: calc(50vw - 1rem);
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
}

/* show only when the BUTTON is hovered/focused */

.main-menu__items {
  /* primary nav links */
}

.main-menu__close {
  /* close button */
}

.main-menu__body {
  display: flex;
  flex-direction: column;
  margin-top: auto;
}

.main-menu__secondary {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
}

.main-menu__secondary-items {
  /* links or subcategories */
}

.main-menu__social {
  /* icons */
}

.main-menu__contact {
  /* contact info or button */
}

.sub-menu {
  display: none;
}

.sub-menu:open {
  display: flex;
  flex-direction: column;
  position: fixed;
  inset-block-start: auto;
  inset-inline-end: 0.5rem;
  inset-block-end: 0.5rem;
  transform-origin: bottom left;
  transition-behavior: allow-discrete;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  z-index: 1;

  height: max(70svh, 500px);
  max-width: 100dvi;
  width: 100dvi;

  @media (min-width: 1024px) {
    transform-origin: top left;
    inset-block-start: 0.5rem;
    inset-inline-end: auto;
    inset-inline-start: 0.5rem;
    padding: 1.5rem 2rem;
    height: calc(100vh - 2rem);
    width: calc(50vw - 1rem);
  }

  ul {
    height: 100%;
    display: grid;
    gap: 0.25rem;
    grid-auto-rows: 1fr;
    grid-template-columns: 1fr 1fr;
  }
}

.sub-menu::backdrop {
  background: black;
  opacity: 0.25;
}

.mobileClose {
  height: 0.5rem;
  width: 50%;
  margin-inline: auto;
  background: var(--color-neutral-500);
  border-radius: 0.25rem;
  margin-block: 1rem;

  @media (min-width: 1024px) {
    display: none;
  }
}
</style>
